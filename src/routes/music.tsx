import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Marquee } from "@/components/site/Marquee";
import { diamondDre, newSingles, releases, singles } from "@/lib/site-data";
import { formatPrice } from "@/components/site/ProductCard";
import { SINGLE_PRICE, SinglesGrid } from "@/components/site/SinglesGrid";

export const Route = createFileRoute("/music")({
  head: () => ({
    meta: [
      { title: "Music & Discography | Klondike Kat" },
      {
        name: "description",
        content:
          "Klondike Kat's discography: The Lyrical Lion (1993), Mobbin' Muzik Melodies (1997), Biography Of A Made Man and the Exclusive Diamond Dre album with eight singles.",
      },
      { property: "og:title", content: "Music & Discography | Klondike Kat" },
      {
        property: "og:description",
        content:
          "Three decades of Houston underground rap. Albums, EPs and the latest exclusive singles.",
      },
    ],
  }),
  component: MusicPage,
});

const STREAMING = [
  { label: "Spotify", url: "https://open.spotify.com/search/Klondike%20Kat" },
  { label: "Apple Music", url: "https://music.apple.com/us/search?term=Klondike%20Kat" },
  { label: "YouTube", url: "https://www.youtube.com/results?search_query=Klondike+Kat" },
];

function MusicPage() {
  return (

  return (
    <>
      <PageHero
        eyebrow="Discography"
        title="The Music"
        lead="From the 1993 debut to the newest exclusives — a catalog built on twangy guitars, heavy bass and forceful synths."
      >
        <div className="mt-5 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
          {STREAMING.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="tap-none inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-border bg-background px-4 text-xs font-bold tracking-[0.12em] uppercase text-foreground transition-colors duration-200 hover:border-primary hover:text-primary sm:rounded-sm sm:px-5 sm:text-sm"
            >
              {s.label}
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          ))}
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-20">
        <h2 className="text-2xl sm:text-5xl">
          <span className="text-gold">Albums & EPs</span>
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:mt-4 sm:text-base">
          Physical CDs available for every release. Ships from the Klondike Kat store.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-8 lg:grid-cols-4">
          {releases.map((r) => (
            <article key={r.title} className="card-elevated hover-lift flex flex-col overflow-hidden rounded-sm">
              <div className="grain media-zoom relative">
                <img
                  src={r.image}
                  alt={`Artwork for ${r.title}`}
                  loading="lazy"
                  decoding="async"
                  className="aspect-square w-full object-cover"
                />
                <span className="absolute top-2.5 left-2.5 z-10 rounded-full bg-background/80 px-2.5 py-1 text-[0.6rem] font-bold tracking-[0.14em] text-primary uppercase backdrop-blur-sm sm:top-3 sm:left-3 sm:rounded-none sm:text-[0.65rem]">
                  CD
                </span>
              </div>
              <div className="flex flex-1 flex-col p-3 sm:p-4">
                <p className="text-[0.6rem] font-bold tracking-[0.18em] text-primary uppercase sm:text-xs">
                  {r.kind}
                  {r.year ? ` · ${r.year}` : ""}
                </p>
                <h3 className="mt-1.5 text-lg leading-tight text-foreground sm:mt-2 sm:text-2xl">
                  {r.title}
                </h3>
                <p className="mt-1.5 flex-1 text-xs text-muted-foreground sm:mt-2 sm:text-sm">
                  {r.note}
                </p>
                <p className="mt-3 flex items-baseline gap-2 sm:mt-4">
                  <span className="font-display text-xl text-primary sm:text-2xl">
                    {formatPrice(r.cdPrice)}
                  </span>
                  <span className="text-[0.65rem] font-bold tracking-[0.12em] text-muted-foreground uppercase sm:text-xs">
                    CD
                  </span>
                </p>
                <Link
                  to="/shop/$handle"
                  params={{ handle: r.shopHandle }}
                  className="tap-none mt-3 inline-flex min-h-11 cursor-pointer items-center justify-center rounded-sm border border-primary bg-primary px-4 text-xs font-bold tracking-[0.12em] uppercase text-primary-foreground transition-colors duration-200 hover:bg-primary/85 sm:mt-4 sm:text-sm"
                >
                  Buy CD
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Marquee items={singles} />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-20">
        <h2 className="text-2xl sm:text-5xl">
          <span className="text-gold">Exclusive singles</span>
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:mt-4 sm:text-base">
          Seven exclusives from the Diamond Dre album. Buy them one at a time, download the full
          album, or grab the physical CD — all on one page.
        </p>
        <ul className="mt-5 divide-y divide-border border-y border-border sm:mt-10">
          {diamondDre.tracks.map((t, i) => (
            <li
              key={t.title}
              className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 py-3 sm:gap-x-4 sm:py-4"
            >
              <span className="font-display text-xl text-primary sm:text-2xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 text-base font-semibold text-foreground sm:text-lg">
                {t.title}
              </span>
              <span className="font-display text-lg whitespace-nowrap text-primary sm:text-xl">
                {formatPrice(diamondDre.singlePrice)}
              </span>
            </li>
          ))}
        </ul>
        <Link
          to="/shop/$handle"
          params={{ handle: diamondDre.handle }}
          className="tap-none mt-5 inline-flex min-h-12 cursor-pointer items-center justify-center rounded-sm bg-primary px-6 text-xs font-bold tracking-[0.12em] uppercase text-primary-foreground transition-colors duration-200 hover:bg-primary/85 sm:text-sm"
        >
          Get Diamond Dre — CD, album or singles
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 sm:pb-24">
        <h2 className="text-2xl sm:text-5xl">
          <span className="text-gold">New singles</span>
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:mt-4 sm:text-base">
          Tap any cover for a 60-second preview. Each single is ${SINGLE_PRICE.toFixed(2)} to
          download — purchases go live soon.
        </p>
        <SinglesGrid singles={newSingles} />
      </section>
    </>
  );
}
