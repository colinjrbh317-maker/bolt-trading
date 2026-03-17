import { query } from "./index";

// --- Event Tracking ---

interface TrackEvent {
  session_id: string;
  visitor_id: string;
  variant: string;
  event_type: string;
  event_data?: Record<string, unknown>;
  url?: string;
  referrer?: string;
  user_agent?: string;
  device_type?: string;
  country?: string;
}

export async function insertEvent(event: TrackEvent) {
  return query(
    `INSERT INTO events (session_id, visitor_id, variant, event_type, event_data, url, referrer, user_agent, device_type, country)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    [
      event.session_id,
      event.visitor_id,
      event.variant,
      event.event_type,
      JSON.stringify(event.event_data || {}),
      event.url || null,
      event.referrer || null,
      event.user_agent || null,
      event.device_type || null,
      event.country || null,
    ]
  );
}

// --- Conversions ---

interface ConversionEvent {
  stripe_event_id: string;
  event_type: string;
  variant?: string;
  amount?: number;
  customer_email?: string;
  subscription_id?: string;
  visitor_id?: string;
}

export async function insertConversion(conv: ConversionEvent) {
  return query(
    `INSERT INTO conversions (stripe_event_id, event_type, variant, amount, customer_email, subscription_id, visitor_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     ON CONFLICT (stripe_event_id) DO NOTHING`,
    [
      conv.stripe_event_id,
      conv.event_type,
      conv.variant || null,
      conv.amount || null,
      conv.customer_email || null,
      conv.subscription_id || null,
      conv.visitor_id || null,
    ]
  );
}

// --- Dashboard Queries ---

export async function getKPIs(days: number) {
  const interval = days > 0 ? `AND created_at >= NOW() - INTERVAL '${days} days'` : "";

  const [pageviews] = await query(
    `SELECT COUNT(*) as total FROM events WHERE event_type = 'pageview' ${interval}`
  );
  const [visitors] = await query(
    `SELECT COUNT(DISTINCT visitor_id) as total FROM events WHERE event_type = 'pageview' ${interval}`
  );
  const [ctaClicks] = await query(
    `SELECT COUNT(*) as total FROM events WHERE event_type = 'cta_click' ${interval}`
  );
  const [conversionCount] = await query(
    `SELECT COUNT(*) as total FROM conversions WHERE event_type = 'new_subscription' ${interval.replace("created_at", "created_at")}`
  );

  return {
    pageviews: Number(pageviews.total),
    visitors: Number(visitors.total),
    ctaClicks: Number(ctaClicks.total),
    conversions: Number(conversionCount.total),
    ctaRate: Number(pageviews.total) > 0 ? (Number(ctaClicks.total) / Number(pageviews.total) * 100) : 0,
    conversionRate: Number(pageviews.total) > 0 ? (Number(conversionCount.total) / Number(pageviews.total) * 100) : 0,
  };
}

export async function getVariantStats(days: number) {
  const interval = days > 0 ? `AND e.created_at >= NOW() - INTERVAL '${days} days'` : "";
  const convInterval = days > 0 ? `AND created_at >= NOW() - INTERVAL '${days} days'` : "";

  const rows = await query(`
    SELECT
      e.variant,
      COUNT(*) FILTER (WHERE e.event_type = 'pageview') as pageviews,
      COUNT(DISTINCT e.visitor_id) FILTER (WHERE e.event_type = 'pageview') as unique_visitors,
      COUNT(*) FILTER (WHERE e.event_type = 'cta_click') as cta_clicks,
      ROUND(AVG((e.event_data->>'max_depth')::numeric) FILTER (WHERE e.event_type = 'scroll'), 1) as avg_scroll,
      ROUND(AVG((e.event_data->>'seconds')::numeric) FILTER (WHERE e.event_type = 'time_on_page'), 0) as avg_time
    FROM events e
    WHERE 1=1 ${interval}
    GROUP BY e.variant
    ORDER BY e.variant
  `);

  const convRows = await query(`
    SELECT variant, COUNT(*) as conversions
    FROM conversions
    WHERE event_type = 'new_subscription' ${convInterval}
    GROUP BY variant
  `);

  const convMap = new Map(convRows.map((r: any) => [r.variant, Number(r.conversions)]));

  return rows.map((r: any) => ({
    variant: r.variant,
    pageviews: Number(r.pageviews),
    uniqueVisitors: Number(r.unique_visitors),
    ctaClicks: Number(r.cta_clicks),
    ctr: Number(r.pageviews) > 0 ? (Number(r.cta_clicks) / Number(r.pageviews) * 100) : 0,
    avgScroll: Number(r.avg_scroll) || 0,
    avgTime: Number(r.avg_time) || 0,
    conversions: convMap.get(r.variant) || 0,
    convRate: Number(r.pageviews) > 0 ? ((convMap.get(r.variant) || 0) / Number(r.pageviews) * 100) : 0,
  }));
}

export async function getPageviewsOverTime(days: number) {
  const interval = days > 0 ? `AND created_at >= NOW() - INTERVAL '${days} days'` : "";
  return query(`
    SELECT
      DATE(created_at) as date,
      variant,
      COUNT(*) as count
    FROM events
    WHERE event_type = 'pageview' ${interval}
    GROUP BY DATE(created_at), variant
    ORDER BY date
  `);
}

export async function getTopReferrers(days: number, limit = 10) {
  const interval = days > 0 ? `AND created_at >= NOW() - INTERVAL '${days} days'` : "";
  return query(`
    SELECT
      COALESCE(referrer, 'Direct') as referrer,
      COUNT(*) as count
    FROM events
    WHERE event_type = 'pageview' ${interval}
    GROUP BY referrer
    ORDER BY count DESC
    LIMIT $1
  `, [limit]);
}

export async function getDeviceBreakdown(days: number) {
  const interval = days > 0 ? `AND created_at >= NOW() - INTERVAL '${days} days'` : "";
  return query(`
    SELECT
      COALESCE(device_type, 'unknown') as device_type,
      COUNT(*) as count
    FROM events
    WHERE event_type = 'pageview' ${interval}
    GROUP BY device_type
    ORDER BY count DESC
  `);
}

export async function getRecentEvents(limit = 20) {
  return query(`
    SELECT id, session_id, visitor_id, variant, event_type, event_data, url, device_type, country, created_at
    FROM events
    ORDER BY created_at DESC
    LIMIT $1
  `, [limit]);
}

export async function aggregateDailyStats(dateStr: string) {
  return query(`
    INSERT INTO daily_stats (date, variant, pageviews, unique_visitors, cta_clicks, avg_scroll_depth, avg_time_on_page, conversions)
    SELECT
      $1::date as date,
      e.variant,
      COUNT(*) FILTER (WHERE e.event_type = 'pageview'),
      COUNT(DISTINCT e.visitor_id) FILTER (WHERE e.event_type = 'pageview'),
      COUNT(*) FILTER (WHERE e.event_type = 'cta_click'),
      COALESCE(ROUND(AVG((e.event_data->>'max_depth')::numeric) FILTER (WHERE e.event_type = 'scroll'), 2), 0),
      COALESCE(ROUND(AVG((e.event_data->>'seconds')::numeric) FILTER (WHERE e.event_type = 'time_on_page'), 0), 0),
      (SELECT COUNT(*) FROM conversions c WHERE c.variant = e.variant AND DATE(c.created_at) = $1::date AND c.event_type = 'new_subscription')
    FROM events e
    WHERE DATE(e.created_at) = $1::date
    GROUP BY e.variant
    ON CONFLICT (date, variant) DO UPDATE SET
      pageviews = EXCLUDED.pageviews,
      unique_visitors = EXCLUDED.unique_visitors,
      cta_clicks = EXCLUDED.cta_clicks,
      avg_scroll_depth = EXCLUDED.avg_scroll_depth,
      avg_time_on_page = EXCLUDED.avg_time_on_page,
      conversions = EXCLUDED.conversions
  `, [dateStr]);
}
