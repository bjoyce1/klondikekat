# Mobile Editorial Redesign

## Goal
Translate the supplied mobile reference into an intentional black-and-gold Klondike Kat experience while preserving the existing premium desktop site.

## Build
- Refine the mobile masthead and full-screen menu around the existing wordmark, with a compact gold/black treatment and safe-area support.
- Recompose Home most closely to the reference: portrait-led editorial hero, five-icon destination strip, framed South Park legacy feature, two-column music shelf, visual portal modules, and booking banner.
- Adapt Music, Podcast, Shop, Videos, Bio, Events, and Booking for denser mobile reading, strong imagery, square-edged framed modules, compact uppercase actions, and route-specific identities.
- Keep album art two columns at phone width, introducing more columns only when space allows.
- Reuse only existing official artwork and photography; do not fabricate a crest, wordmark, lowrider graphic, products, dates, or content.
- Resolve fixed-control stacking among the mobile tab bar, music player, shop buy bar, and podcast controls.

## Technical details
- Limit the redesign to responsive styles and focused presentation components; desktop behavior remains unchanged above mobile/tablet breakpoints.
- Add shared mobile design tokens and utilities for gold rules, compact spacing, framed modules, buttons, and safe areas.
- Preserve semantic headings, accessible labels, 44px touch targets, reduced-motion behavior, image focal positioning, and lazy loading.
- Verify all main routes plus product and Diamond Dre pages at phone/tablet widths, then run TypeScript and production builds.
