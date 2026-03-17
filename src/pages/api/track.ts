import type { APIRoute } from "astro";
import { insertEvent } from "../../lib/db/queries";
import { parseDeviceType, isValidEventType } from "../../lib/analytics/parse";

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const text = await request.text();
    const body = JSON.parse(text);

    const { session_id, visitor_id, event_type, event_data, url, referrer } = body;

    if (!session_id || !visitor_id || !event_type) {
      return new Response(null, { status: 400 });
    }

    if (!isValidEventType(event_type)) {
      return new Response(null, { status: 400 });
    }

    // Read variant from httpOnly cookie (server can access it)
    const variant = cookies.get("ab-variant")?.value || "a";

    // Parse device type from user agent
    const userAgent = request.headers.get("user-agent") || "";
    const deviceType = parseDeviceType(userAgent);

    // Get country from Vercel header
    const country = request.headers.get("x-vercel-ip-country") || null;

    await insertEvent({
      session_id,
      visitor_id,
      variant,
      event_type,
      event_data: event_data || {},
      url: url || null,
      referrer: referrer || null,
      user_agent: userAgent.slice(0, 512),
      device_type: deviceType,
      country,
    });

    return new Response(null, { status: 204 });
  } catch (err) {
    console.error("Track error:", err);
    return new Response(null, { status: 500 });
  }
};
