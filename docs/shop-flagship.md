# Official Shop flagship

The Shop now leads with a staged display of the actual Signature Hoodie and Lyrical
Lion CD artwork. Four distinct collection displays lead into dedicated product
showrooms and the existing external checkout. Warm metal frames, near-black surfaces,
cream typography, and restrained gold connect the Shop to the artist's wider site.

## Implementation

- `src/routes/shop.tsx` loads the Shop stylesheet and provides its scope.
- `src/routes/shop.index.tsx` retains the existing metadata and adds validated,
  shareable collection search parameters. All Goods uses the plain `/shop` URL.
- `src/routes/shop.$handle.tsx` retains product metadata, aliases, and not-found
  behavior while selecting the new showroom. Alias lookup checks own properties,
  so names such as `constructor` cannot become accidental redirects.
- `src/components/shop/ShopFlagship.tsx` supplies the hero, collection navigation,
  category displays, and connection to the Music archive.
- `src/components/shop/ShopProductTile.tsx` renders original artwork, complete
  product names, original descriptions, and prices. Album sleeves, merchandise,
  tickets, and production have different display treatments.
- `src/components/shop/ShopProductShowroom.tsx` supplies image staging, product
  information, accessible options, related goods, mobile purchasing, and not-found UI.
- `src/components/shop/DiamondDreShowroom.tsx` keeps the CD, album download, and
  individual-song experience. `src/components/site/DiamondDreBundle.tsx` preserves
  the former export as a compatibility entry point.
- `src/components/shop/ShopDetails.tsx` centralizes price, checkout, label, and signal
  presentation. Sale pricing appears only when a real compare-at price exceeds it.
- `src/lib/shop-catalog.ts` derives counts, collection groupings, featured goods,
  and product context from the existing catalog.
- `src/hooks/useShopMotion.ts` provides restrained scroll depth and one-time reveals
  with cleanup and reduced-motion support. Content is available before JavaScript.
- `src/styles/shop.css` contains the scoped responsive design.
- `scripts/verify-shop.mjs` runs the repeatable browser verification described below.

The shared ProductCard, Header, Footer, MobileTabBar, root layout, global stylesheet,
Music page, Podcast page, and all source catalog data remain unchanged.

## Catalog and purchasing

Counts come from `site-data.ts`: 10 goods across Albums (4), Merch (3), Tickets (2),
and Production (1). Filters update the URL, support browser back/forward navigation,
and announce result counts. Selecting a collection brings its results back into view,
including when changing collections from deep in the page. Invalid category values
fall back to All Goods.

All product handles, prices, descriptions, photos, available sizes, and external URLs
are retained. Images use containment rather than cropping or stretching. Product
discovery links lead to internal detail pages; checkout links use the original external
destination with `target="_blank"` and `rel="noopener noreferrer"`.

The existing integration does not transmit a selected size. Size buttons support
pointer and keyboard activation with `aria-pressed`; adjacent copy and the mobile buy
bar explicitly say the final size is selected in the external store. No undocumented
URL parameters or simulated cart were added.

Diamond Dre preserves the CD at $23.99 (originally $29.99), album download at $19.99,
and seven individual songs at $1.99 each. Format selection updates the purchase
destination and mobile bar. The existing unusual CD and song slugs are retained
verbatim. All ten legacy aliases continue to resolve to `/shop/diamond-dre`.

No Diamond Dre tracks currently have a supplied audio URL, so their preview controls
remain unavailable. If an audio URL is supplied later, the component uses the existing
60-second Music preview hook with pause, error recovery, and route cleanup.

The mobile buy bar is shown below 1024px, above the shared bottom navigation, and
accounts for the safe area. It displays the product, current price, and a minimum
44px purchase target. Invalid product handles show “ITEM NOT FOUND.” and retain
404/noindex behavior.

## Verification

Run the browser script with an existing Chromium CDP connection and an installed
Playwright runtime supplied through `PLAYWRIGHT_MODULE`. `BUN_EXE` can identify a
local Bun executable for reading the source catalog. No production dependency was added.

```text
node scripts/verify-shop.mjs <CDP URL> http://127.0.0.1:5174 ../artifacts/shop
```

The script covers 1440×1000, 1280×900, 390×844, 320×740, 768×1024, and 1000×900;
image decoding and proportions, heading and page overflow, shared layout counts,
collection counts and URL history, every product route and related collection,
keyboard size selection, exact checkout URLs and security attributes, Diamond Dre
formats and song links, all aliases, invalid routes, reduced motion, and mobile buy-bar
clearance and navigation hit targets. It saves screenshots and a JSON report.

For development, `LOVABLE_PREVIEW_HOST=klondikekat.lovable.app` enables the repository's
existing Vite catalog-asset proxy. A plain built Cloudflare worker has no such proxy.
For production-bundle QA only, `SHOP_QA_REMOTE_ASSETS=1` makes the test browser fetch
those exact assets from their original Lovable host, without changing application URLs.
`SHOP_QA_CHECK_EXTERNAL=1` also performs read-only HTTP checks of the current external
product destinations; it never submits an order.

The independent Home page's existing Reveal component emits a hydration warning when
loaded with reduced motion enabled. Shop reduced motion passed without this warning;
shared Home code was not changed by this redesign.

Completed September 12, 2026: TypeScript, scoped ESLint, production build, and the
production browser suite passed. All six responsive layouts, ten product pages,
ten aliases, format and size controls, and invalid routes passed with zero Shop
console/runtime/hydration errors. Production screenshots and the report are in the
parent workspace's `artifacts/shop-production/` directory.
The final navigation refinement was rebuilt and separately verified at 1440, 768,
390, and 320 pixels. All ten product titles and buy bars were additionally checked
at both phone widths (20 product checks); `followup.json` records those passing results.

The external audit verified that every rendered checkout href matches its original
catalog destination. Fifteen of the eighteen distinct destinations returned HTTP 200
with the expected product title. Three pre-existing physical CD destinations return
HTTP 404: `the-lyrical-lion-cd`, `mobbin-muzik-melodies-cd`, and
`biography-of-a-made-man-cd`. The official store's current product sitemap contains no
replacement listings for these CDs. Their original URLs were preserved; they require
valid product listings or redirects in the external store. No purchase was submitted.
