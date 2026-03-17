// ===== SITE CONFIGURATION =====
// Edit these values to update the landing page.
// Non-developers: just change the numbers and text below.

export const siteConfig = {
  // Stripe checkout URL
  stripeUrl: "https://buy.stripe.com/00w8wR0HCbBG4OfeNy3840F",

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
  price: 39.99,
  priceInterval: "month",

  // Bolt's socials
  tiktokUrl: "https://tiktok.com/@bolt.trades",
  discordInvite: "", // The Discord invite link (sent after payment)
};
