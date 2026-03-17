# The Market Matchup -- Complete Design System & Component Specifications

All design tokens live in `/src/styles/global.css` via Tailwind v4's `@theme` directive.
No `tailwind.config.mjs` is needed -- Tailwind v4 is CSS-native.

---

## 1. TAILWIND CONFIG (via @theme in global.css)

All custom tokens are defined in the `@theme {}` block of `global.css`. Summary:

| Token Category | Examples | Usage |
|---|---|---|
| `--color-navy-*` | 950, 900, 800, 700, 600 | Background layers |
| `--color-gold-*` | 600, 500, 400, 300 | Accent / CTAs |
| `--color-bull` / `--color-bear` | green #22C55E / red #EF4444 | Profit/Loss signals |
| `--color-bg-*` | primary, secondary, card | Semantic backgrounds |
| `--color-text-*` | primary, secondary, muted | Semantic text |
| `--font-sans` | Inter | All body text |
| `--font-mono` | JetBrains Mono | Numbers, code, ticker |
| `--shadow-gold-glow` | soft gold glow | CTA buttons |
| `--shadow-gold-glow-lg` | intense gold glow | CTA hover state |
| `--animate-*` | fade-in-up, pulse-gold, etc. | Scroll/interaction animations |

Use these in Tailwind classes like: `bg-navy-900`, `text-gold-500`, `text-slate-400`, `shadow-gold-glow`, `font-mono`, `animate-fade-in-up`.

---

## 2. GLOBAL CSS -- Key Utilities Reference

All utilities are defined in `global.css`. Quick reference:

### Gold Glow Button
Class: `btn-cta` (also: `btn-cta-lg`, `btn-cta-sm`)
- Gradient gold background with shine-through hover animation
- `box-shadow` glow that intensifies on hover
- Lifts 2px on hover, returns on active
- Shimmer sweep on hover via `::before` pseudo-element

### Secondary Button
Class: `btn-outline`
- Transparent with 2px gold border
- Background tints gold on hover

### Ghost Button
Class: `btn-ghost`
- No border, text-only
- Subtle gold tint on hover

### Candlestick Pattern
Class: `bg-candlestick`
- CSS-only repeating green/red candlestick shapes via `::before`
- Very subtle opacity (~5%) so it reads as texture not content
- Apply to any section wrapper; content needs `relative z-10`

### Scroll Animations
Classes: `fade-in`, `fade-in-left`, `fade-in-right`
- Start invisible + offset, add `.visible` class to trigger
- Pair with `stagger-1` through `stagger-6` for cascading children

### Scarcity
- `counter-pulse` -- pulsing scale animation for countdown numbers
- `pulse-dot` -- green live indicator dot
- `progress-bar` + `progress-bar-fill` -- spots remaining bar

### Text Gradients
- `text-gold-gradient` -- gold shimmer text
- `text-bull-gradient` -- green gradient text

### Visual Polish
- `gradient-hero` -- radial gold/green/red ambient glow for hero
- `gradient-section-divider` -- faded horizontal rule between sections
- `noise-overlay` -- subtle film grain texture via SVG
- `ticker-tape` -- infinite scrolling horizontal strip
- `shimmer-text` -- animated shimmer for highlight text
- `border-glow` -- subtle gold border with outer glow
- `card-hover-glow` -- hover state: gold glow + lift

### Badges
- `badge badge-gold` -- gold accent tag
- `badge badge-bull` -- green success tag
- `badge badge-bear` -- red urgency tag

---

## 3. COMPONENT SPECS -- All 10 Sections

### IntersectionObserver Script (required for all sections)
Add this to your layout or at the bottom of the page:

```html
<script>
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
    observer.observe(el);
  });
</script>
```

---

### SECTION 1: HERO

**Purpose:** Immediate hook. Communicate value prop in <3 seconds. Primary CTA.

**Layout:**
- Full viewport height on mobile, auto on desktop
- Centered single column, text-centered
- Candlestick background pattern + hero gradient overlay

**Container classes:**
```
<section class="relative min-h-screen flex items-center justify-center bg-candlestick gradient-hero noise-overlay overflow-hidden">
  <div class="section-container relative z-10 py-20 sm:py-28 lg:py-32 text-center flex flex-col items-center gap-6">
```

**Content structure:**
1. **Badge** (top) -- "LIVE TRADING COMMUNITY"
   ```
   <span class="badge badge-bull">
     <span class="pulse-dot"></span>
     LIVE TRADING COMMUNITY
   </span>
   ```

2. **Headline** -- large display text
   ```
   <h1 class="text-[length:var(--font-size-display)] leading-[var(--line-height-display)] font-black tracking-[var(--letter-spacing-tight)] max-w-4xl">
     Stop Trading Alone.<br>
     <span class="text-gold-gradient">Start Trading With Edge.</span>
   </h1>
   ```

3. **Subheadline** -- supporting copy
   ```
   <p class="text-[length:var(--font-size-body-lg)] text-slate-400 max-w-2xl leading-relaxed">
     Join the Discord where traders share real-time alerts, live analysis, and proven strategies daily.
   </p>
   ```

4. **CTA Button**
   ```
   <a href="#pricing" class="btn-cta btn-cta-lg">
     Join The Market Matchup
     <svg><!-- arrow icon --></svg>
   </a>
   ```

5. **Social proof line** (below CTA)
   ```
   <p class="text-sm text-slate-500 font-medium">
     <span class="text-bull font-bold">500+</span> traders already inside
   </p>
   ```

**Mobile vs Desktop:**
- Mobile: `min-h-screen`, `py-20`, `text-[2.25rem]` (auto via CSS var override)
- Desktop: `py-32`, full display size `text-[3.5rem]`
- Logo images sit above the headline on mobile, to the left on desktop (optional)

---

### SECTION 2: PROBLEM

**Purpose:** Agitate the pain. Make them feel the cost of trading alone.

**Layout:**
- Dark background (navy-950) to create contrast from hero
- Centered narrow container for readability
- Staggered fade-in list items

**Container classes:**
```
<section class="relative bg-navy-950 py-[var(--spacing-section-y)] lg:py-[var(--spacing-section-y-lg)]">
  <div class="section-container max-w-[var(--size-container-md)]">
```

**Content structure:**
1. **Section badge**
   ```
   <span class="badge badge-bear">THE PROBLEM</span>
   ```

2. **Headline**
   ```
   <h2 class="text-[length:var(--font-size-h1)] font-extrabold leading-[var(--line-height-heading)] tracking-[var(--letter-spacing-tight)] mt-4">
     Most Retail Traders <span class="text-bear">Lose Money</span> Trading Alone
   </h2>
   ```

3. **Pain points** -- 3-4 items with bear-red accents
   ```
   <div class="mt-10 space-y-6">
     <div class="fade-in stagger-1 flex items-start gap-4 p-5 rounded-xl bg-navy-900/50 border border-navy-700">
       <span class="flex-shrink-0 w-10 h-10 rounded-lg bg-bear/10 flex items-center justify-center text-bear text-xl">X</span>
       <div>
         <p class="font-semibold text-slate-50">No edge, no plan, no community</p>
         <p class="text-sm text-slate-400 mt-1">You're guessing entries and exits based on emotions, not data.</p>
       </div>
     </div>
     <!-- repeat for each pain point -->
   </div>
   ```

4. **Transition line**
   ```
   <p class="mt-10 text-center text-lg text-slate-400 font-medium">
     Sound familiar? <span class="text-gold-500 font-bold">There's a better way.</span>
   </p>
   ```

**Mobile vs Desktop:**
- Identical layout, single column
- Font sizes auto-scale via CSS vars
- More padding on desktop via `lg:py-[var(--spacing-section-y-lg)]`

---

### SECTION 3: SOLUTION

**Purpose:** Position The Market Matchup as the answer.

**Layout:**
- Back to navy-900 background
- Two columns on desktop: text left, visual right
- Single column stacked on mobile

**Container classes:**
```
<section class="relative bg-navy-900 py-[var(--spacing-section-y)] lg:py-[var(--spacing-section-y-lg)]">
  <div class="gradient-section-divider absolute top-0 left-0 right-0"></div>
  <div class="section-container">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
```

**Content structure:**

Left column (text):
```
<div class="fade-in-left">
  <span class="badge badge-gold">THE SOLUTION</span>
  <h2 class="text-[length:var(--font-size-h1)] font-extrabold leading-[var(--line-height-heading)] tracking-[var(--letter-spacing-tight)] mt-4">
    Your <span class="text-gold-gradient">Unfair Advantage</span> in the Market
  </h2>
  <p class="text-slate-400 text-[length:var(--font-size-body-lg)] mt-4 leading-relaxed">
    The Market Matchup gives you everything retail traders are missing...
  </p>
  <ul class="mt-8 space-y-4">
    <li class="flex items-center gap-3 text-slate-300">
      <span class="w-6 h-6 rounded-full bg-bull/20 flex items-center justify-center text-bull text-sm">✓</span>
      Real-time trade alerts from verified profitable traders
    </li>
    <!-- more items -->
  </ul>
  <a href="#pricing" class="btn-cta mt-8">Get Started Now</a>
</div>
```

Right column (visual):
```
<div class="fade-in-right">
  <!-- Discord screenshot mockup, or The Market Matchup logo -->
  <div class="rounded-2xl border border-navy-700 bg-navy-800 p-6 shadow-card">
    <img src="/market-matchup-logo.png" alt="The Market Matchup" class="w-full rounded-xl" />
  </div>
</div>
```

**Mobile vs Desktop:**
- Mobile: stacked (`grid-cols-1`), text above visual
- Desktop: side by side (`lg:grid-cols-2`), text left, visual right

---

### SECTION 4: FEATURES

**Purpose:** Detail what members get. Build desire with specifics.

**Layout:**
- 3-column grid on desktop, 1-column on mobile
- Each feature in a `card-feature` component
- Slight bg variation (navy-950) for contrast

**Container classes:**
```
<section class="relative bg-navy-950 bg-candlestick py-[var(--spacing-section-y)] lg:py-[var(--spacing-section-y-lg)]">
  <div class="section-container relative z-10">
```

**Content structure:**

Heading:
```
<div class="text-center max-w-2xl mx-auto fade-in">
  <span class="badge badge-gold">WHAT YOU GET</span>
  <h2 class="text-[length:var(--font-size-h1)] font-extrabold leading-[var(--line-height-heading)] tracking-[var(--letter-spacing-tight)] mt-4">
    Everything You Need to <span class="text-gold-gradient">Trade With Confidence</span>
  </h2>
</div>
```

Feature grid:
```
<div class="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="card-feature fade-in stagger-1">
    <div class="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center mb-5">
      <!-- icon (use inline SVG or Lucide/Heroicons) -->
      <svg class="w-6 h-6 text-gold-500">...</svg>
    </div>
    <h3 class="text-lg font-bold text-slate-50">Real-Time Trade Alerts</h3>
    <p class="text-slate-400 mt-2 text-sm leading-relaxed">
      Get notified the moment we enter and exit trades. Every alert includes entry, stop, and target.
    </p>
  </div>
  <!-- repeat for each feature (6-8 total) -->
</div>
```

**Suggested features (6):**
1. Real-Time Trade Alerts (icon: bell/zap)
2. Daily Market Analysis (icon: chart-bar)
3. Live Trading Sessions (icon: video/monitor)
4. Educational Resources (icon: book-open)
5. Community & Mentorship (icon: users)
6. Options Flow & Scanners (icon: activity/filter)

**Mobile vs Desktop:**
- Mobile: `grid-cols-1`, cards stack vertically
- Tablet: `md:grid-cols-2`
- Desktop: `lg:grid-cols-3`

---

### SECTION 5: TESTIMONIALS

**Purpose:** Social proof. Real results from real members.

**Layout:**
- 2-column grid on desktop, 1-column on mobile
- Testimonial cards with quote marks
- Optional: scrolling ticker of screenshots

**Container classes:**
```
<section class="relative bg-navy-900 py-[var(--spacing-section-y)] lg:py-[var(--spacing-section-y-lg)]">
  <div class="section-container">
```

**Content structure:**

Heading:
```
<div class="text-center max-w-2xl mx-auto fade-in">
  <span class="badge badge-bull">REAL RESULTS</span>
  <h2 class="text-[length:var(--font-size-h1)] font-extrabold leading-[var(--line-height-heading)] tracking-[var(--letter-spacing-tight)] mt-4">
    What Our Members Are <span class="text-bull-gradient">Saying</span>
  </h2>
</div>
```

Testimonial grid:
```
<div class="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
  <div class="card-testimonial fade-in stagger-1">
    <div class="relative z-10 pt-4">
      <p class="text-slate-300 leading-relaxed">
        "Joined two months ago. Already consistently profitable. The alerts alone are worth 10x the price."
      </p>
      <div class="mt-5 flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-navy-700 flex items-center justify-center text-gold-500 font-bold text-sm">JD</div>
        <div>
          <p class="text-sm font-semibold text-slate-50">@JasonD</p>
          <p class="text-xs text-slate-500">Member since Jan 2026</p>
        </div>
        <span class="ml-auto badge badge-bull text-xs">+$12,400</span>
      </div>
    </div>
  </div>
  <!-- repeat for 4-6 testimonials -->
</div>
```

**Optional: Screenshot ticker below testimonials**
```
<div class="mt-12 overflow-hidden">
  <div class="ticker-tape">
    <img src="/screenshots/win-1.png" class="h-48 rounded-lg border border-navy-700" />
    <img src="/screenshots/win-2.png" class="h-48 rounded-lg border border-navy-700" />
    <!-- duplicate set for seamless loop -->
  </div>
</div>
```

**Mobile vs Desktop:**
- Mobile: `grid-cols-1`, stacked
- Desktop: `md:grid-cols-2`

---

### SECTION 6: SCARCITY

**Purpose:** Create urgency. Limited spots, ticking clock.

**Layout:**
- Centered narrow container
- Dark background with gold accent glow
- Counter / progress bar as focal point

**Container classes:**
```
<section class="relative bg-navy-950 py-[var(--spacing-section-y)] lg:py-[var(--spacing-section-y-lg)]">
  <div class="section-container max-w-[var(--size-container-sm)] text-center">
```

**Content structure:**
```
<div class="fade-in p-8 sm:p-10 rounded-2xl bg-navy-800 border border-navy-700 border-glow">
  <span class="badge badge-bear">
    <span class="pulse-dot"></span>
    LIMITED SPOTS
  </span>

  <h2 class="text-[length:var(--font-size-h2)] font-extrabold leading-[var(--line-height-heading)] mt-6">
    Only <span class="text-bear counter-pulse font-mono text-[length:var(--font-size-h1)]" id="spots-count">23</span> Spots Left This Month
  </h2>

  <p class="text-slate-400 mt-3 max-w-md mx-auto">
    We cap membership to maintain quality. When spots fill, enrollment closes until next month.
  </p>

  <!-- Progress bar -->
  <div class="mt-8 max-w-sm mx-auto">
    <div class="flex justify-between text-xs text-slate-500 mb-2 font-mono">
      <span>77 / 100 claimed</span>
      <span class="text-bear font-semibold">23 remaining</span>
    </div>
    <div class="progress-bar">
      <div class="progress-bar-fill" style="--progress-width: 77%;"></div>
    </div>
  </div>

  <a href="#pricing" class="btn-cta mt-8">
    Claim Your Spot Now
  </a>
</div>
```

**Mobile vs Desktop:**
- Same layout on both, padding adjusts `p-8 sm:p-10`
- Counter uses `font-mono` for tabular number alignment

---

### SECTION 7: PRICING

**Purpose:** Present the offer. One plan, clear value. Or tiered if needed.

**Layout:**
- Centered pricing card(s)
- If single plan: one large card centered
- If tiered: 2-3 column grid, middle one featured

**Container classes (single plan):**
```
<section id="pricing" class="relative bg-navy-900 py-[var(--spacing-section-y)] lg:py-[var(--spacing-section-y-lg)]">
  <div class="section-container max-w-[var(--size-container-sm)] text-center">
```

**Container classes (tiered):**
```
<section id="pricing" class="relative bg-navy-900 py-[var(--spacing-section-y)] lg:py-[var(--spacing-section-y-lg)]">
  <div class="section-container">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
```

**Single pricing card:**
```
<div class="card-pricing card-pricing-featured fade-in max-w-lg mx-auto text-center">
  <span class="badge badge-gold">MOST POPULAR</span>

  <h3 class="text-[length:var(--font-size-h2)] font-extrabold mt-6 text-slate-50">
    Monthly Membership
  </h3>

  <div class="mt-4 flex items-baseline justify-center gap-2">
    <span class="text-slate-500 line-through text-lg">$149</span>
    <span class="text-[length:var(--font-size-display)] font-black text-gold-gradient font-mono">$49</span>
    <span class="text-slate-400 text-sm">/mo</span>
  </div>

  <p class="text-slate-400 mt-2 text-sm">Lock in the founder's rate before it goes up.</p>

  <div class="mt-8 border-t border-navy-700 pt-6">
    <ul class="space-y-3 text-left">
      <li class="flex items-center gap-3 text-slate-300 text-sm">
        <span class="text-bull">&#10003;</span>
        All real-time trade alerts
      </li>
      <li class="flex items-center gap-3 text-slate-300 text-sm">
        <span class="text-bull">&#10003;</span>
        Daily market breakdowns
      </li>
      <li class="flex items-center gap-3 text-slate-300 text-sm">
        <span class="text-bull">&#10003;</span>
        Live trading sessions
      </li>
      <li class="flex items-center gap-3 text-slate-300 text-sm">
        <span class="text-bull">&#10003;</span>
        Educational library access
      </li>
      <li class="flex items-center gap-3 text-slate-300 text-sm">
        <span class="text-bull">&#10003;</span>
        Private community chat
      </li>
      <li class="flex items-center gap-3 text-slate-300 text-sm">
        <span class="text-bull">&#10003;</span>
        Options flow scanner
      </li>
    </ul>
  </div>

  <a href="https://discord.gg/YOUR_LINK" class="btn-cta btn-cta-lg w-full mt-8">
    Join Now -- $49/mo
  </a>

  <p class="text-xs text-slate-500 mt-3">Cancel anytime. No contracts.</p>
</div>
```

**Tiered pricing: non-featured card:**
```
<div class="card-pricing fade-in text-center">
  <!-- Same structure but without card-pricing-featured class -->
  <!-- Uses btn-outline instead of btn-cta for non-primary tier -->
</div>
```

**Mobile vs Desktop:**
- Single plan: identical, centered
- Tiered: `grid-cols-1` stacked on mobile, `lg:grid-cols-3` on desktop
- Featured card can be slightly larger: add `lg:scale-105` for emphasis

---

### SECTION 8: RISK REVERSAL

**Purpose:** Remove objections. Money-back guarantee.

**Layout:**
- Centered narrow container with visual emphasis
- "Shield" or "guarantee" iconography
- Different background treatment (navy-950 with gold accent)

**Container classes:**
```
<section class="relative bg-navy-950 py-[var(--spacing-section-y)] lg:py-[var(--spacing-section-y-lg)]">
  <div class="section-container max-w-[var(--size-container-sm)] text-center">
```

**Content structure:**
```
<div class="fade-in">
  <!-- Guarantee icon -->
  <div class="w-20 h-20 mx-auto rounded-full bg-gold-500/10 border-2 border-gold-500/30 flex items-center justify-center">
    <svg class="w-10 h-10 text-gold-500"><!-- shield-check icon --></svg>
  </div>

  <h2 class="text-[length:var(--font-size-h2)] font-extrabold leading-[var(--line-height-heading)] mt-6">
    <span class="text-gold-gradient">7-Day Money-Back</span> Guarantee
  </h2>

  <p class="text-slate-400 mt-4 text-[length:var(--font-size-body-lg)] leading-relaxed max-w-md mx-auto">
    Try The Market Matchup risk-free. If you don't see the value within 7 days, we'll refund every penny. No questions asked.
  </p>

  <div class="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-navy-800 border border-navy-700">
    <span class="text-bull text-lg">&#10003;</span>
    <span class="text-slate-300 font-medium">Zero risk. Full refund. Your call.</span>
  </div>
</div>
```

**Mobile vs Desktop:**
- Same layout, fully centered
- Icon + text scale with responsive font vars

---

### SECTION 9: FAQ

**Purpose:** Overcome remaining objections. Answer common questions.

**Layout:**
- Centered narrow container
- Accordion-style FAQ items
- No-JS fallback: content visible by default, JS adds toggle

**Container classes:**
```
<section class="relative bg-navy-900 py-[var(--spacing-section-y)] lg:py-[var(--spacing-section-y-lg)]">
  <div class="section-container max-w-[var(--size-container-sm)]">
```

**Content structure:**

Heading:
```
<div class="text-center fade-in">
  <span class="badge badge-gold">FAQ</span>
  <h2 class="text-[length:var(--font-size-h1)] font-extrabold leading-[var(--line-height-heading)] tracking-[var(--letter-spacing-tight)] mt-4">
    Frequently Asked <span class="text-gold-gradient">Questions</span>
  </h2>
</div>
```

FAQ items:
```
<div class="mt-10 divide-y divide-navy-700">
  <div class="faq-item fade-in stagger-1">
    <button class="faq-trigger" aria-expanded="false">
      <span>What markets do you trade?</span>
      <svg class="w-5 h-5 text-slate-500 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <div class="faq-content">
      <p>We primarily trade US equities and options (SPY, QQQ, individual stocks). We also cover some crypto and futures setups.</p>
    </div>
  </div>
  <!-- repeat for 5-8 questions -->
</div>
```

**FAQ toggle script:**
```html
<script>
  document.querySelectorAll('.faq-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
      content.classList.toggle('open');
      btn.querySelector('svg').style.transform = expanded ? '' : 'rotate(180deg)';
    });
  });
</script>
```

**Suggested FAQ questions:**
1. What markets do you trade?
2. Do I need trading experience to join?
3. What platform/broker do you recommend?
4. How are alerts delivered?
5. Can I cancel anytime?
6. Is this financial advice?
7. What are the community hours?

**Mobile vs Desktop:**
- Same layout, single column
- Touch targets sized appropriately (44px+ tap area)

---

### SECTION 10: FINAL CTA + FOOTER

**Purpose:** Last chance conversion. Repeat the offer with urgency.

**Layout:**
- CTA block: full-width dark section with gold accent gradient
- Footer: minimal, below CTA

**Container classes (CTA):**
```
<section class="relative bg-navy-950 bg-candlestick py-[var(--spacing-section-y)] lg:py-[var(--spacing-section-y-lg)]">
  <div class="section-container relative z-10 max-w-[var(--size-container-md)] text-center">
```

**CTA Content:**
```
<div class="fade-in">
  <h2 class="text-[length:var(--font-size-h1)] font-extrabold leading-[var(--line-height-heading)] tracking-[var(--letter-spacing-tight)]">
    Ready to Trade With <span class="text-gold-gradient">An Edge?</span>
  </h2>

  <p class="text-slate-400 mt-4 text-[length:var(--font-size-body-lg)] max-w-lg mx-auto">
    Join hundreds of traders who stopped guessing and started profiting. Your seat is waiting.
  </p>

  <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
    <a href="https://discord.gg/YOUR_LINK" class="btn-cta btn-cta-lg animate-pulse-gold">
      Join The Market Matchup
    </a>
    <a href="#pricing" class="btn-outline">
      View Pricing
    </a>
  </div>

  <p class="mt-6 text-sm text-slate-500">
    <span class="pulse-dot mr-2"></span>
    <span class="text-bear font-semibold counter-pulse font-mono">23</span> spots remaining this month
  </p>
</div>
```

**Footer:**
```
<footer class="bg-navy-950 border-t border-navy-700 py-8">
  <div class="section-container">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
      <div class="flex items-center gap-3">
        <img src="/bolt-trades-logo.png" alt="Bolt Trades" class="h-8 w-auto" />
        <span>&copy; 2026 Bolt Trades. All rights reserved.</span>
      </div>
      <div class="flex items-center gap-6">
        <a href="/terms" class="hover:text-slate-300 transition-colors">Terms</a>
        <a href="/privacy" class="hover:text-slate-300 transition-colors">Privacy</a>
        <a href="/disclaimer" class="hover:text-slate-300 transition-colors">Disclaimer</a>
      </div>
    </div>

    <p class="mt-6 text-xs text-slate-600 text-center max-w-2xl mx-auto">
      Trading involves substantial risk of loss. Past performance does not guarantee future results. This is not financial advice. Trade at your own risk.
    </p>
  </div>
</footer>
```

**Mobile vs Desktop:**
- CTA: identical centered layout
- Footer: stacks vertically on mobile (`flex-col`), side-by-side on desktop (`sm:flex-row`)

---

## 4. BUTTON COMPONENT -- Class Reference

### Primary CTA (Gold, Large, Glow)
```
class="btn-cta btn-cta-lg"
```
Full class breakdown if not using the component class:
```
class="inline-flex items-center justify-center gap-2 px-10 py-4 bg-gradient-to-br from-gold-500 to-gold-600 text-navy-950 font-extrabold text-xl rounded-xl shadow-gold-glow hover:from-gold-400 hover:to-gold-500 hover:shadow-gold-glow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer relative overflow-hidden"
```

### Primary CTA (Standard size)
```
class="btn-cta"
```

### Primary CTA (Small)
```
class="btn-cta btn-cta-sm"
```

### Secondary (Outline)
```
class="btn-outline"
```
Full class breakdown:
```
class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent text-gold-500 font-semibold text-base border-2 border-gold-500 rounded-xl hover:bg-gold-500/10 hover:border-gold-400 hover:text-gold-400 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
```

### Ghost (Text-only)
```
class="btn-ghost"
```

### States (all buttons):
- **Hover:** lift + glow intensify (CTA) or tint (outline/ghost)
- **Active:** return to baseline position
- **Focus-visible:** `outline-2 outline-gold-400 outline-offset-[3px]`
- **Disabled:** `opacity-50 cursor-not-allowed pointer-events-none`

---

## 5. CARD COMPONENT -- Class Reference

### Feature Card
```
class="card-feature"
```
Full class breakdown:
```
class="bg-bg-card border border-border rounded-xl p-8 transition-all duration-300 relative hover:border-gold-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.08)] hover:-translate-y-0.5"
```
Gold top border variant (add to card):
```
class="card-feature border-t-gold"
```

### Testimonial Card
```
class="card-testimonial"
```
Full class breakdown:
```
class="bg-bg-card border border-border rounded-xl p-6 relative"
```
Note: The `::before` pseudo-element adds the opening quotation mark automatically.

### Pricing Card (Standard)
```
class="card-pricing"
```
Full class breakdown:
```
class="bg-bg-card border border-border rounded-2xl px-8 py-10 relative overflow-hidden transition-all duration-300"
```

### Pricing Card (Featured/Highlighted)
```
class="card-pricing card-pricing-featured"
```
Additional styling from `card-pricing-featured`:
- Gold border color
- Gold glow shadow
- Gold gradient top bar (3px `::before`)
- Subtle gold gradient wash at top (`::after`)

---

## 6. SECTION BACKGROUND PATTERN

Alternate between `bg-navy-900` and `bg-navy-950` for visual rhythm:

| Section | Background | Pattern |
|---|---|---|
| Hero | `bg-navy-900` | `bg-candlestick gradient-hero noise-overlay` |
| Problem | `bg-navy-950` | clean |
| Solution | `bg-navy-900` | `gradient-section-divider` at top |
| Features | `bg-navy-950` | `bg-candlestick` |
| Testimonials | `bg-navy-900` | clean |
| Scarcity | `bg-navy-950` | clean |
| Pricing | `bg-navy-900` | clean |
| Risk Reversal | `bg-navy-950` | clean |
| FAQ | `bg-navy-900` | clean |
| Final CTA | `bg-navy-950` | `bg-candlestick` |
| Footer | `bg-navy-950` | `border-t border-navy-700` |

---

## 7. RESPONSIVE BREAKPOINTS

| Breakpoint | Width | Usage |
|---|---|---|
| Default | 0-639px | Mobile (primary target -- TikTok audience) |
| `sm:` | 640px+ | Large phones, minor adjustments |
| `md:` | 768px+ | Tablets, 2-column grids |
| `lg:` | 1024px+ | Desktop, full layouts, 3-column grids |
| `xl:` | 1280px+ | Large desktop, max-width hits |

Mobile-first rule: **All base classes target mobile.** Desktop overrides use `sm:`, `md:`, `lg:` prefixes.

---

## Review

### Files Created/Modified
- `/src/styles/global.css` -- Complete design system with all tokens, components, utilities, and animations
- `/tasks/design-system.md` -- This specification document

### Key Decisions
- **Tailwind v4 native config** via `@theme {}` in CSS (no JS config file)
- **Component classes** (`btn-cta`, `card-feature`, etc.) defined in `@layer components` for reusability across Astro files
- **Utility classes** (`fade-in`, `bg-candlestick`, `text-gold-gradient`, etc.) in `@layer utilities`
- **Responsive type scaling** uses CSS custom property overrides at the `max-width: 639px` breakpoint
- **Animation approach** uses CSS transitions + IntersectionObserver (no JS animation library dependency)
- **Color system** provides both specific tokens (`--color-navy-900`) and semantic aliases (`--color-bg-primary`) for flexibility
