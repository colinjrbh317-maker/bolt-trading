import type { APIRoute } from "astro";
import { aggregateDailyStats } from "../../../lib/db/queries";

export const GET: APIRoute = async ({ request }) => {
  // Verify cron secret or dashboard token
  const authHeader = request.headers.get("authorization");
  const cronSecret = import.meta.env.CRON_SECRET;
  const dashToken = import.meta.env.DASHBOARD_TOKEN;

  const token = authHeader?.replace("Bearer ", "");
  if (token !== cronSecret && token !== dashToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    // Aggregate yesterday's stats
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateStr = yesterday.toISOString().split("T")[0];

    await aggregateDailyStats(dateStr);

    return new Response(JSON.stringify({ aggregated: dateStr }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Aggregation error:", err);
    return new Response(JSON.stringify({ error: "Aggregation failed" }), { status: 500 });
  }
};
