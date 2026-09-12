# The Lion’s Den artwork system

The `/podcast` page uses the supplied poster as its visual reference: black enamel, bronze and gold edges, warm headlights, red signals, vintage broadcast hardware, and forged plaque geometry. The original poster remains intact in the hero.

## Implementation

- `src/routes/podcast.tsx` keeps the original canonical URL, page metadata, and PodcastSeries structured data, and loads the podcast styles.
- `src/components/podcast/PodcastExperience.tsx` composes six chapters using the original section IDs. `content.ts` preserves the three pillar descriptions and all three upcoming transmission entries.
- `LionDenMotifs.tsx` provides the microphone, halo, drag tree, skyline, waveform, tachometer, crown, and plaque. `materials.tsx` gives the SVG objects shared metal, grille, and lamp treatments. `useMetalId.ts` supplies unique IDs that remain stable during server rendering.
- `LionDenMuscleCar.tsx` replaces the old car with an illustrated body composited inside SVG. Separate rim, lighting, shadow, reflection, and smoke layers animate independently. A custom vector fallback handles a failed illustration request. The primary car is a raster/SVG composite, not an entirely vector drawing.
- `BroadcastConsole.tsx` plays the unchanged `/audio/lions-den-preview.mp3` music-bed preview, titled “Mob Manuscript: The Return.” It supports play/pause, seeking, volume, a 60-second cap, keyboard replay, an unavailable state, and cleanup when leaving the page. VU meters and waveform motion are decorative, not audio analysis.
- `useSceneMotion.ts` updates all scene variables through one event-driven animation frame. Wheels, entry, smoke, road light, and tachometers respond to scroll. The drag-light sequence runs once per page visit. Reduced motion keeps scenes still and information visible.
- `src/styles/podcast.css` contains the page’s namespaced layout and responsive rules. The obsolete podcast block in `src/styles.css` and `PodcastMachinery.tsx` were removed. Existing header, footer, mobile tabs, root layout, dependencies, and build configuration are unchanged.

## Assets

- `public/images/podcast/lions-den-poster.jpg` is an unchanged copy of the supplied `IMG_5794.jpg`. SHA-256: `1c8a25e4fae4e10f70b87d81076a2ceef18f96e0506398689c0824b2000247d7`.
- `public/images/podcast/lions-den-muscle-car.png` was generated with the supplied poster as the style reference. A corrective image edit replaced a baked checkerboard with a dark background. The SVG mask blends this image into the road scene. The illustration was requested without logos or license-plate lettering.
- `public/fonts/podcast/` contains Latin subsets of Barlow, Barlow Condensed, and Cinzel from Google Fonts, with their OFL licenses. Private family names keep the podcast typography separate from the application’s existing fonts. Fonts are served locally.
- All other new graphic elements use custom SVG and CSS.
- The original audio is unchanged. SHA-256: `97e0626434de88d0609a04957e463218c5157bcf20f0411c29f27630b8904a65`.

## Run and verify

Use the repository’s frozen Bun lockfile, then start Vite:

```sh
bun install --frozen-lockfile
bun run dev --host 127.0.0.1 --port 5174 --strictPort
```

For existing album covers on other routes, set `LOVABLE_PREVIEW_HOST=klondikekat.lovable.app` in the development process environment. The bundled Lovable Vite plugin already supports this proxy. The new podcast artwork and fonts do not depend on that proxy.

Validation performed:

- TypeScript: `tsc --noEmit`.
- ESLint and Prettier checks for all added or changed podcast source files.
- `bun run build`, including client, SSR, and the existing Cloudflare worker target.
- Browser checks at 1440×1000, 768×1024, 390×844, and 320×740: headings, artwork loading, horizontal overflow, shared landmarks, mobile tab clearance, navigation, original metadata, and font isolation.
- Scroll-driven wheels, smoke and tachometer, headlight activation, drag-light completion, and static reduced-motion presentation.
- Actual audio playback, pause, seek, volume, 60-second cutoff, keyboard replay, unavailable-source feedback, and pause on route departure.

`scripts/verify-podcast.mjs` repeats the browser checks and saves screenshots and a JSON report. It connects to an existing Chromium CDP session and needs Playwright available to Node (or an absolute `PLAYWRIGHT_MODULE` environment variable); it adds no production dependency.

```sh
node scripts/verify-podcast.mjs <cdp-url> http://127.0.0.1:5174 <artifact-directory>
```

The existing production target is Cloudflare. To serve the built output locally, use Wrangler against `.output/server/wrangler.json`. The repository’s `vite preview` command currently looks for a Node build under `dist/server`, while this target builds into `.output`; the shared configuration has been preserved.

The complete browser suite also passed against the built worker served by Wrangler. No podcast runtime or hydration errors were reported. Other routes’ Lovable image-proxy requests require the host environment described above; their local 404s are recorded separately in the QA report.

The build retains existing configuration advisories about Vite path resolution, a shared application chunk larger than 500 kB, and Nitro’s ignored `inlineDynamicImports` option. The podcast client chunk is about 15 kB gzipped and its stylesheet about 8.5 kB gzipped.
