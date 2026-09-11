# Diamond Dre: one bundle page with all buying options

Right now the seven Diamond Dre singles, the digital album, the physical CD and the "Albums & Singles Bundle" are four separate listings scattered across the shop. This merges them into a single Diamond Dre listing that holds every option.

## What changes

**Shop grid**
- One Diamond Dre card instead of the current nine. It shows the album cover, the title, and "From $1.99".
- The seven single listings, the separate digital album listing, the separate physical CD listing and the bundle listing no longer appear as their own cards.
- Old links to any of those handles still land on the new Diamond Dre page instead of breaking.

**Diamond Dre page**
- Cover art, title, short description at the top.
- A buying panel with three choices:
  - Physical CD — $19.99
  - Full album download — $1.99
  - Individual songs — $1.99 each
- A tracklist below, one row per song: number, title, a play button for a preview, the price, and a Buy button for that song. Same look as the New Singles player already on the Music page (gold hairline strip, mini player docked at the bottom while a track plays).
- Songs with no audio file yet show "Coming soon" in place of the play button and still keep their Buy button.
- Each Buy button goes to that song's existing store checkout link, exactly as it does today.

**Music page**
- The "Exclusive singles" list keeps showing the eight songs, but each row now links to the single Diamond Dre page rather than to its own product page.
- The Diamond Dre card in Albums & EPs points at the same page.

## Notes

- No audio files have been supplied for the Diamond Dre songs yet, so previews will read "Coming soon" until you send them. Everything else works immediately.
- Purchases keep going to the existing store links; no card payments are added here.

## Technical outline

- `src/lib/site-data.ts`: add a `diamondDre` bundle object (cover, blurb, CD price, album price, single price, tracks with `title`, `externalUrl`, optional `audioUrl`). Drop the seven Singles entries, the digital album, the CD and the bundle entry from `products`, replacing them with one `Albums` product `diamond-dre` whose page renders the bundle view.
- `src/routes/shop.$handle.tsx`: when the loader resolves the `diamond-dre` handle, render a bundle layout (options panel + tracklist) instead of the standard single-product layout; add a handle alias map so the retired handles redirect to `diamond-dre`.
- Reuse `SinglesGrid`'s preview/mini-player logic by extracting the shared audio controller into a list-shaped variant, keeping the existing gold industrial styling.
- `src/routes/music.tsx`: repoint the exclusive-singles list and the Diamond Dre release card to `/shop/diamond-dre`.
- Update head meta for the new page; verify build and mobile/desktop layouts.
