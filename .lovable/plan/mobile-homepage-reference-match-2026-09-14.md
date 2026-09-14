# Mobile homepage reference match

## Goal
Bring the phone homepage closer to the supplied black-and-gold reference while preserving the existing premium desktop experience. Feature **Mob Manuscript** prominently in the mobile hero.

## Changes
- Recompose the mobile masthead and hero into the same compact sequence as the reference: crest/wordmark, portrait-led feature area, bold headline, and one primary action.
- Replace the generic mobile hero action with a **Mob Manuscript** feature treatment using the supplied official album artwork and a direct path into the album section.
- Tighten the five-item destination strip, framed Legacy panel, two-column Latest Music grid, three portal tiles, and booking banner to match the reference’s density, borders, hierarchy, and spacing.
- Keep all desktop presentation and page functionality unchanged.
- Verify the production build and all homepage links; preserve 44px touch targets, reduced-motion behavior, and no horizontal overflow at phone widths.

## Technical details
- Limit changes to the homepage/header presentation files and semantic style tokens.
- Use the uploaded Mob Manuscript artwork as a CDN-backed project asset, not the reference mockup.
- Maintain a true two-column release grid around 390px, increasing only on wider screens.
