// ===== SITE CONFIGURATION =====
// Edit these values to update the landing page.
// Non-developers: just change the numbers and text below.

export const siteConfig = {
  // Stripe checkout URL
  stripeUrl: "https://buy.stripe.com/28E28t61WfRW94v9te3840x",

  // Scarcity — Rolling cohort
  spots: {
    total: 10,
    claimed: 7, // Change this number as spots fill up
  },

  // When spots.claimed >= spots.total, the CTA changes to waitlist mode
  waitlistUrl: "", // Optional: link to a waitlist form

  // Social proof
  memberCount: 400, // "X+ active traders"

  // Pricing
  price: 0,
  priceInterval: "day",

  // Bolt's socials
  tiktokUrl: "https://tiktok.com/@bolt.trades",
  discordInvite: "", // The Discord invite link (sent after payment)
};
