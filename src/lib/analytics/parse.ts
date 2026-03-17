export function parseDeviceType(ua: string): string {
  if (!ua) return "unknown";
  if (/tablet|ipad/i.test(ua)) return "tablet";
  if (/mobile|android|iphone/i.test(ua)) return "mobile";
  return "desktop";
}

export function parseUtmParams(url: string): Record<string, string> {
  try {
    const u = new URL(url);
    const utms: Record<string, string> = {};
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
      const val = u.searchParams.get(key);
      if (val) utms[key] = val;
    }
    return utms;
  } catch {
    return {};
  }
}

const VALID_EVENT_TYPES = new Set([
  "pageview",
  "cta_click",
  "scroll",
  "time_on_page",
  "section_view",
]);

export function isValidEventType(type: string): boolean {
  return VALID_EVENT_TYPES.has(type);
}
