import type { APIRoute } from "astro";
import {
  getKPIs,
  getVariantStats,
  getPageviewsOverTime,
  getTopReferrers,
  getDeviceBreakdown,
  getRecentEvents,
} from "../../../lib/db/queries";

function checkAuth(request: Request, cookies: any): boolean {
  const token = import.meta.env.DASHBOARD_TOKEN;
  if (!token) return true; // No token set = open access (dev mode)

  // Check cookie
  const cookieToken = cookies.get("dashboard-auth")?.value;
  if (cookieToken === token) return true;

  // Check Authorization header
  const authHeader = request.headers.get("authorization");
  if (authHeader === `Bearer ${token}`) return true;

  return false;
}

export const GET: APIRoute = async ({ request, cookies, url }) => {
  if (!checkAuth(request, cookies)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const period = url.searchParams.get("period") || "7d";
  const days = period === "all" ? 0 : parseInt(period);

  try {
    const [kpis, variants, pageviewsOverTime, referrers, devices, recentEvents] =
      await Promise.all([
        getKPIs(days),
        getVariantStats(days),
        getPageviewsOverTime(days),
        getTopReferrers(days),
        getDeviceBreakdown(days),
        getRecentEvents(20),
      ]);

    return new Response(
      JSON.stringify({
        kpis,
        variants,
        pageviewsOverTime,
        referrers,
        devices,
        recentEvents,
        period,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Dashboard stats error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch stats" }), { status: 500 });
  }
};
