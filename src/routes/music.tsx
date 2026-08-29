import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Marquee } from "@/components/site/Marquee";
import { products, releases, singles } from "@/lib/site-data";
import { formatPrice } from "@/components/site/ProductCard";

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
  const singleProducts = products.filter((p) => p.category === "Singles");

  return (
    <>
      <PageHero
        eyebrow="Discography"
        title="The Music"
        lead="From the 1993 debut to the newest exclusives — a catalog built on twangy guitars, heavy bass and forceful synths."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          {STREAMING.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-sm border border-border bg-background px-5 text-sm font-bold tracking-[0.12em] uppercase text-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              {s.label}
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          ))}
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="text-3xl sm:text-5xl">
          <span className="text-gold">Albums & EPs</span>
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {releases.map((r) => (
            <article key={r.title} className="flex flex-col">
              <div className="grain media-zoom card-elevated rounded-sm">
                <img
                  src={r.image}
                  alt={`Artwork for ${r.title}`}
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
              </div>
              <p className="mt-4 text-xs font-bold tracking-[0.18em] text-primary uppercase">
                {r.kind}
                {r.year ? ` · ${r.year}` : ""}
              </p>
              <h3 className="mt-2 text-2xl leading-tight text-foreground">{r.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{r.note}</p>
              {r.shopHandle && (
                <Link
                  to="/shop/$handle"
                  params={{ handle: r.shopHandle }}
                  className="link-sweep mt-4 inline-flex min-h-11 cursor-pointer items-center text-sm font-bold tracking-[0.14em] text-primary uppercase"
                >
                  Buy
                </Link>
              )}
            </article>
          ))}
        </div>
      </section>

      <Marquee items={singles} />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="text-3xl sm:text-5xl">
          <span className="text-gold">Exclusive singles</span>
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Eight exclusives from the Diamond Dre album, available one at a time.
        </p>
        <ul className="mt-10 divide-y divide-border border-y border-border">
          {singleProducts.map((p, i) => (
            <li key={p.handle} className="flex flex-wrap items-center gap-4 py-4">
              <span className="font-display text-2xl text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-lg font-semibold text-foreground">{p.title}</span>
              <span className="font-display text-xl text-primary">{formatPrice(p.price)}</span>
              <Link
                to="/shop/$handle"
                params={{ handle: p.handle }}
                className="inline-flex min-h-11 cursor-pointer items-center rounded-sm border border-border px-4 text-xs font-bold tracking-[0.14em] uppercase text-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
              >
                Buy
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
