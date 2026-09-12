# Music — The Klondike Kat Vault

The Music page is a cover-led career archive. Its record sleeves, restrained brass edges,
studio labels, and signal lights connect to the Lion's Den palette while giving Music a
distinct visual identity. Physical purchases sit below the editorial release information.

## Structure

- `src/routes/music.tsx` retains the route and SEO title, loads the scoped Music stylesheet,
  and renders `MusicVault`.
- `src/components/music/MusicVaultHero.tsx` uses three existing covers in a layered record
  display. Small screens bring the artwork ahead of the introductory copy and actions.
- `CatalogArchive.tsx` displays the dated releases chronologically with an active year rail,
  followed by the undated Biography entry. Every archive cover has a quiet CD purchase link.
- `DiamondDreFeature.tsx` pairs the actual cover with the seven-track list, existing prices,
  and one link to the existing Diamond Dre format selector.
- `MusicSingles.tsx` shows all eleven supplied singles and ten real previews.
  `ListeningDock.tsx` provides one shared transport above mobile navigation through 1023px.
- `src/hooks/useMusicPreview.ts` owns one audio element, handles switching, a 60-second
  limit, seeking, retry, close, and route cleanup.
- `src/hooks/useMusicMotion.ts` owns the subtle scroll depth and chronology state.
  Reduced motion disables visual movement.
- `src/lib/music-catalog.ts` centralizes the preview constants, unchanged streaming URLs,
  derived archive order, and label helpers.
- `src/styles/music.css` scopes the design to Music. Shared navigation, footer, and
  unrelated page components remain intact.
- `src/components/site/SinglesGrid.tsx` preserves its former export names as a compatibility
  entry point.

## Catalog integrity

The release images, notes, available years, credits, audio source URLs, prices, and shop
handles come from the existing catalog. No covers or audio files were replaced.
1993 and 1997 are the only supplied release years; undated records remain undated.
Diamond Dre is featured separately without assigning a date.

The old Diamond Dre note incorrectly said eight singles. That note and the route description
now derive the number from `diamondDre.tracks.length` (seven).
All other catalog data is unchanged.

Ride Like The Wind has no supplied audio and therefore has no play button. Modern singles
remain $1.29 with downloads marked coming soon. No inactive purchase links were invented.
The existing Diamond Dre CD ($23.99), album download ($19.99), and track ($1.99) pricing
remains distinct from the modern singles.

## Verification

`scripts/verify-music.mjs` runs against a Chromium CDP session, using an installed
Playwright runtime supplied through `PLAYWRIGHT_MODULE`. It creates screenshots and a JSON
report in the chosen artifact directory without adding a production dependency.

The checks cover 1440×1000, 390×844, 320×740, 768×1024, and 1000×900; image decoding,
square covers, heading/viewport overflow, player placement, mobile navigation hit targets,
all ten audio sources, no autoplay, pause, seek, progress, the 60-second cutoff, keyboard
replay, switching, error recovery, close/focus restoration, route cleanup, four album
destinations, exact streaming URLs, and reduced motion.

TypeScript, scoped ESLint, and the production build must pass. The repository's existing
Vite chunk-size and tsconfig-paths advisories are unrelated to the Music redesign.

Completed on September 12, 2026: TypeScript, scoped ESLint, build, and the browser
verification passed against both Vite development and the built Cloudflare worker.
The production run confirmed all four expected product headings, all ten playable audio
sources, five responsive layouts, and zero browser console/runtime/hydration errors.
Screenshots and the final report are in the parent workspace's
`artifacts/music-production/` directory.

For local development, set `LOVABLE_PREVIEW_HOST=klondikekat.lovable.app` so the existing
Vite asset proxy serves the supplied catalog images and audio. A plain Cloudflare worker
preview lacks that Lovable proxy. For production-bundle QA only,
`MUSIC_QA_REMOTE_ASSETS=1` makes the test browser fetch those same assets from their original
Lovable host. It does not alter the build or application asset URLs.

Example:

```text
node scripts/verify-music.mjs <CDP URL> http://127.0.0.1:5174 ../artifacts/music
```
