# Rebuild klondikekat.com

A fresh, modern rebuild of the Klondike Kat site — Houston underground hip-hop legend, South Park Coalition — moving off Wix onto a fast custom site with a real store and checkout.

## Design direction

Fresh redesign, not a copy of the Wix layout. Bold, gritty Houston hip-hop aesthetic: deep near-black base, gold/amber accent pulled from the "Lyrical Lion" identity, heavy condensed display type for headlines against a clean readable body face, marquee-style name treatment, full-bleed photography, grain/texture over images. Mobile-first, fast, accessible.

I'll generate a few rendered design directions for you to pick from before building.

## Pages

- **Home** — full-bleed hero with the lion/artist imagery, animated name marquee, featured release, quick links into Music, Shop, Events, Booking.
- **Music** — releases and singles grid (Exclusive Diamond Dre Album, Hold You Down, Back On The Block, Sex Ed, Who Kat, Slippin', Don't Cha, Everything, plus the classic catalog: The Lyrical Lion, Mobbin' Muzik Melodies, Biography Of A Made Man). Each links out to Spotify / Apple Music / YouTube.
- **Videos** — video gallery, starting with "You Wrong (Main Edit)".
- **Shop** — full storefront: singles, albums, Signature Hoodie, Klondike Kat T-Shirt, Limited Edition Caps, Beats for Days, concert tickets, festival passes. Product pages, cart, and real Shopify checkout.
- **Events** — upcoming shows, including "Klondike Kat Live In Concert", with ticket links.
- **Bio** — the full artist history: South Park, S.P.C., Killa Klan, Wreckless Klan, DJ Screw, 20+ year career, discography narrative.
- **Booking / Services** — Custom Beat Production (from $200), Mixing & Mastering (from $150), Collaboration Session (from $200), plus a booking enquiry form routing to klondikekatbooking@gmail.com.

## Store and checkout

We'll set up a new Shopify store to power the shop. Notes on that:

- The store is free to build on while you develop.
- To keep it, claim it within 30 days of creation — Shopify removes unclaimed development stores after that window.
- Claiming starts a separate 120-day free trial on a Shopify subscription. A paid plan is only needed once that trial ends and you're ready to sell for real.

Products, prices, images, and variants (hoodie/tee/cap sizes) get loaded into Shopify, and the site's product pages, cart, and checkout read from it.

## Content and images

Reusing the existing photos and artwork from the current site — hero shots, studio photos, album art, merch images — copied over and served from our own CDN so nothing depends on Wix. Bio copy and product details carry over as-is; I'll tighten wording lightly but not invent any facts, dates, or claims.

## Technical notes

- TanStack Start (React 19 + Vite), Tailwind v4 design tokens; every color/typography value goes through the theme, no hardcoded colors.
- One route per page (`/`, `/music`, `/videos`, `/shop`, `/shop/$handle`, `/events`, `/bio`, `/booking`) with per-page SEO metadata, og/twitter tags, JSON-LD (`MusicGroup`, `MusicAlbum`, `Event`, `Product`), sitemap and robots.
- Shopify integration for catalog, cart, and checkout; images uploaded as Lovable assets.
- Booking form submission handled server-side.

## Build order

1. Pick a design direction.
2. Design system + shared layout (nav, footer, marquee, typography scale).
3. Home, Bio, Music, Videos, Events.
4. Shopify store creation + product load.
5. Shop, product pages, cart, checkout.
6. Booking form + services.
7. SEO pass, responsive/accessibility check, preview verification.

## Open items

- Confirm streaming profile URLs (Spotify / Apple Music / YouTube) so the Music page links land correctly.
- Confirm real upcoming event dates/venues, or the Events page will show only what's currently listed.
