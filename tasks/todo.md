# The Market Matchup - Design System & Component Specifications

## Plan

### Goal
Generate a complete Tailwind CSS v4 design system and component specifications for a high-converting day trading Discord landing page.

### Tasks
- [x] Audit existing project structure (Astro + Tailwind v4, fresh project)
- [x] Write plan to tasks/todo.md
- [x] Create global.css with full design system (CSS custom properties, fonts, animations, utilities)
- [x] Output structured component specs as a reference document
- [x] Build verification (passes with zero errors)

### Architecture Notes
- Tailwind v4 uses CSS-native configuration via `@theme` directive (no tailwind.config.mjs)
- All custom tokens (colors, fonts, spacing) go into global.css via `@theme {}`
- Astro project with component-based architecture
- Mobile-first for TikTok audience

## Review

### Files Created/Modified
1. **`/src/styles/global.css`** -- Complete design system (770 lines)
2. **`/tasks/design-system.md`** -- Full component specification reference

### What Was Delivered
- Complete `@theme` config with 60+ design tokens (colors, fonts, spacing, shadows, animations)
- 13 keyframe animations (fade, pulse, shimmer, float, ticker, etc.)
- 6 component classes (btn-cta, btn-outline, btn-ghost, card-feature, card-testimonial, card-pricing)
- 3 badge variants (gold, bull, bear)
- FAQ accordion component
- Progress bar component
- 15+ utility classes (candlestick pattern, gradients, scroll animations, etc.)
- Responsive type scale with mobile overrides
- Detailed specs for all 10 landing page sections + footer
- Build verified: zero errors
