import type { APIRoute } from "astro";
import { query } from "../../../lib/db/index";

export const POST: APIRoute = async ({ request, cookies }) => {
  // Check dashboard token
  const token = import.meta.env.DASHBOARD_TOKEN;
  const authHeader = request.headers.get("authorization");
  const cookieToken = cookies.get("dashboard-auth")?.value;

  if (token && authHeader !== `Bearer ${token}` && cookieToken !== token) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    // Create tables
    await query(`
      CREATE TABLE IF NOT EXISTS events (
        id          SERIAL PRIMARY KEY,
        session_id  VARCHAR(64) NOT NULL,
        visitor_id  VARCHAR(64) NOT NULL,
        variant     CHAR(1) NOT NULL,
        event_type  VARCHAR(32) NOT NULL,
        event_data  JSONB DEFAULT '{}',
        url         VARCHAR(512),
        referrer    VARCHAR(512),
        user_agent  VARCHAR(512),
        device_type VARCHAR(16),
        country     VARCHAR(2),
        created_at  TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    await query(`CREATE INDEX IF NOT EXISTS idx_events_created_at ON events (created_at)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_events_variant ON events (variant)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_events_type ON events (event_type)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_events_session ON events (session_id)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_events_visitor ON events (visitor_id)`);

    await query(`
      CREATE TABLE IF NOT EXISTS conversions (
        id              SERIAL PRIMARY KEY,
        stripe_event_id VARCHAR(128) UNIQUE NOT NULL,
        event_type      VARCHAR(64) NOT NULL,
        variant         CHAR(1),
        amount          NUMERIC(10,2),
        customer_email  VARCHAR(256),
        subscription_id VARCHAR(128),
        visitor_id      VARCHAR(64),
        created_at      TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    await query(`CREATE INDEX IF NOT EXISTS idx_conversions_created_at ON conversions (created_at)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_conversions_variant ON conversions (variant)`);

    await query(`
      CREATE TABLE IF NOT EXISTS daily_stats (
        id                SERIAL PRIMARY KEY,
        date              DATE NOT NULL,
        variant           CHAR(1) NOT NULL,
        pageviews         INTEGER DEFAULT 0,
        unique_visitors   INTEGER DEFAULT 0,
        cta_clicks        INTEGER DEFAULT 0,
        avg_scroll_depth  NUMERIC(5,2) DEFAULT 0,
        avg_time_on_page  INTEGER DEFAULT 0,
        conversions       INTEGER DEFAULT 0,
        UNIQUE(date, variant)
      )
    `);

    return new Response(JSON.stringify({ success: true, message: "Database tables created" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Setup error:", err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
};
