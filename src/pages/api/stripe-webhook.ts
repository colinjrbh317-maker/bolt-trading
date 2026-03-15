import type { APIRoute } from "astro";
import Stripe from "stripe";
import { google } from "googleapis";

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY);

const TRACKED_EVENTS = [
  "customer.subscription.created",
  "customer.subscription.deleted",
] as const;

function getEventLabel(type: string): string {
  if (type === "customer.subscription.created") return "new_subscription";
  if (type === "customer.subscription.deleted") return "cancellation";
  return type;
}

async function appendToSheet(row: string[]) {
  const serviceAccount = JSON.parse(import.meta.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  const auth = new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const sheetId = import.meta.env.GOOGLE_SHEET_ID;

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "Raw!A:F",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [row],
    },
  });
}

export const POST: APIRoute = async ({ request }) => {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      import.meta.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(`Webhook signature verification failed: ${message}`, {
      status: 400,
    });
  }

  // Only process subscription created/deleted events
  if (!TRACKED_EVENTS.includes(event.type as (typeof TRACKED_EVENTS)[number])) {
    return new Response(JSON.stringify({ received: true }), { status: 200 });
  }

  const subscription = event.data.object as Stripe.Subscription;

  // Extract variant from subscription metadata (set via Stripe payment link)
  const variant = subscription.metadata?.variant || "unknown";
  const amount = subscription.items.data[0]?.price?.unit_amount
    ? (subscription.items.data[0].price.unit_amount / 100).toFixed(2)
    : "0.00";
  const email = typeof subscription.customer === "string"
    ? subscription.customer
    : subscription.customer?.toString() || "unknown";

  // Try to get email from customer object
  let customerEmail = email;
  try {
    if (typeof subscription.customer === "string") {
      const customer = await stripe.customers.retrieve(subscription.customer);
      if (customer && !customer.deleted && customer.email) {
        customerEmail = customer.email;
      }
    }
  } catch {
    // Fall back to customer ID
  }

  const row = [
    new Date().toISOString(),                // Timestamp
    getEventLabel(event.type),               // Event
    variant,                                  // Variant
    amount,                                   // Amount
    customerEmail,                            // Email
    subscription.id,                          // Stripe Sub ID
  ];

  try {
    await appendToSheet(row);
  } catch (err) {
    console.error("Failed to append to Google Sheets:", err);
    return new Response("Logged event but failed to write to sheet", { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
};
