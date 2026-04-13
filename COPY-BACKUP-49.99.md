# Market Matchup — Original $49.99/mo Copy Backup
> Saved 2026-04-12 so we can revert from the free trial test.

---

## config.ts
```ts
export const siteConfig = {
  stripeUrl: "https://buy.stripe.com/3cI4gBbmgbBG1C3cFq3840G",
  spots: { total: 10, claimed: 7 },
  waitlistUrl: "",
  memberCount: 400,
  price: 49.99,
  priceInterval: "month",
  tiktokUrl: "https://tiktok.com/@bolt.trades",
  discordInvite: "",
};
```

---

## Hero.astro — CTA text
```
ctaText = `Join The Market Matchup — $${price}/mo`
spotsLine = `Only <span>X spots</span> remaining — Cancel anytime`
```

---

## Pricing.astro
- Price display: `$${price}` + `/month`
- Subtext: `Cancel anytime — no contracts`
- Benefits list:
  1. Stock alerts and options callouts — plus Bullseye bot setups
  2. Options education channel and trading strategy breakdowns
  3. Options education, market structure, and risk management channels
  4. Ask-anything Q&A channel — no question too basic
  5. 400+ active members, daily recaps, giveaways, and real community
  6. No contracts — cancel anytime, instant Discord access on signup
- CTA: `Join The Market Matchup — $${price}/mo`
- Footer: `No hidden fees. Cancel with one click, anytime. You're in control.`

---

## FinalCTA.astro
- Headline: `The Next Alert Drops Tomorrow Morning. Be in the Room.`
- Body: `X Spots left. One community. The traders inside are already positioned. The only question is whether you'll keep watching the recap — or start trading the setup.`
- CTA: `Join The Market Matchup Now — $${price}/mo`
- Footer: `Only X spots remaining — Cancel anytime`

---

## SolutionSection.astro — CTA
```
"Get Inside — $49.99/mo"
```

---

## Features.astro — CTA
```
"Get All of This — $49.99/mo"
```

---

## Testimonials.astro — CTA
```
"Join These Traders — $49.99/mo"
```

---

## RiskReversal.astro
- Headline: `Zero Risk. Full Control. Cancel Anytime.`
- Body: `There are no contracts, no annual commitments, and no hoops to jump through. If The Market Matchup isn't for you, cancel with one click and you won't be charged again. You have nothing to lock in and nothing to lose.`

---

## FAQ.astro
All original FAQ answers preserved:
1. "What exactly is The Market Matchup?" — trading floor description
2. "Do I need trading experience to join?" — basic understanding needed
3. "What kind of trades does Bolt alert?" — day trades, equities and options
4. "Is this financial advice?" — No, educational community
5. "Why are spots limited?" — quality over quantity
6. "Can I really cancel anytime?" — Yes, one click
7. "When do I get access after I join?" — Immediately

---

## ScarcityCounter.astro
- Badge: `Now Accepting Members`
- Headline: `Only X Spots Left This Round.`
- Body: community quality explanation
- CTA: `Claim Your Spot Now`
