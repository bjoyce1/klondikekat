import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mail, Play } from "lucide-react";
import { Marquee } from "@/components/site/Marquee";
import { ProductCard, formatPrice } from "@/components/site/ProductCard";
import { events, images, products, releases, services, site, singles } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Klondike Kat — The Lyrical Lion | Houston Rap Legend" },
      {
        name: "description",
        content:
          "Official home of Klondike Kat, the Lyrical Lion out of South Park, Houston. Stream the catalog, shop music and merch, catch a show and book studio time.",
      },
      { property: "og:title", content: "Klondike Kat — The Lyrical Lion" },
      {
        property: "og:description",
        content:
          "Houston underground rap pioneer. S.P.C., Killa Klan and Wreckless Klan. Music, merch, shows and booking.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MusicGroup",
          name: "Klondike Kat",
          alternateName: "The Lyrical Lion",
          genre: ["Hip Hop", "Southern Rap", "Underground Rap"],
          foundingLocation: "South Park, Houston, TX",
          email: site.bookingEmail,
          memberOf: [
            { "@type": "MusicGroup", name: "South Park Coalition" },
            { "@type": "MusicGroup", name: "Killa Klan" },
            { "@type": "MusicGroup", name: "Wreckless Klan" },
          ],
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = releases[0]!;
  const shopPreview = products.filter((p) =>
    ["signature-hoodie", "klondike-kat-t-shirt", "limited-edition-cap", "beats-for-days"].includes(
      p.handle,
    ),
  );

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] text-primary uppercase">
              South Park · Houston, Texas
            </p>
            <h1 className="mt-5 text-6xl leading-[0.85] sm:text-8xl lg:text-[7.5rem]">
              <span className="text-gold">Klondike</span>
              <br />
              <span className="text-gold">Kat</span>
            </h1>
            <p className="mt-4 font-display text-2xl tracking-[0.22em] text-foreground sm:text-3xl">
              The Lyrical Lion
            </p>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Thirty years of Houston underground rap. Lyricist, producer, singer. South Park
              Coalition, Killa Klan, Wreckless Klan.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/music"
                className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-sm bg-primary px-6 text-sm font-bold tracking-[0.12em] uppercase text-primary-foreground transition-colors duration-200 hover:bg-primary/85"
              >
                <Play className="size-4" aria-hidden="true" />
                Hear the catalog
              </Link>
              <Link
                to="/shop"
                className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-sm border border-border px-6 text-sm font-bold tracking-[0.12em] uppercase text-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
              >
                Shop the store
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="grain relative overflow-hidden border border-border">
            <img
              src={images.hero}
              alt="Klondike Kat performing live, holding a microphone under stage lights"
              width={1200}
              height={1440}
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>

      <Marquee />

      {/* Featured release */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16">
          <div className="grain overflow-hidden border border-border bg-surface">
            <img
              src={featured.image}
              alt={`Cover artwork for ${featured.title}`}
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold tracking-[0.3em] text-primary uppercase">
              Featured release
            </p>
            <h2 className="mt-4 text-4xl sm:text-6xl">
              <span className="text-gold">{featured.title}</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">{featured.note}</p>
            <ul className="mt-8 grid gap-x-8 gap-y-1 sm:grid-cols-2">
              {singles.map((s, i) => (
                <li
                  key={s}
                  className="flex items-baseline gap-3 border-b border-border py-2 text-sm"
                >
                  <span className="font-display text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-foreground">{s}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop/$handle"
                params={{ handle: featured.shopHandle ?? "exclusive-diamond-dre-album" }}
                className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-sm bg-primary px-6 text-sm font-bold tracking-[0.12em] uppercase text-primary-foreground transition-colors duration-200 hover:bg-primary/85"
              >
                Get the album
              </Link>
              <Link
                to="/music"
                className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-sm border border-border px-6 text-sm font-bold tracking-[0.12em] uppercase text-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
              >
                Full discography
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bio strip */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_minmax(0,460px)] lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] text-primary uppercase">The history</p>
            <h2 className="mt-4 text-4xl sm:text-6xl">
              <span className="text-gold">Thirty years deep</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Klondike Kat debuted in 1993 with “The Lyrical Lion,” home of the classic S.P.C. click
              record “Murder Script.” He joined the South Park Coalition in 1992 and has been one of
              H-Town's most respected lyricists and producers ever since.
            </p>
            <Link
              to="/bio"
              className="link-sweep mt-8 inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm font-bold tracking-[0.14em] text-primary uppercase"
            >
              Read the full story
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grain overflow-hidden border border-border">
            <img
              src={images.bioSquare}
              alt="Portrait of Klondike Kat"
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Shop preview */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] text-primary uppercase">The store</p>
            <h2 className="mt-3 text-4xl sm:text-6xl">
              <span className="text-gold">Merch & music</span>
            </h2>
          </div>
          <Link
            to="/shop"
            className="link-sweep min-h-11 cursor-pointer text-sm font-bold tracking-[0.14em] text-primary uppercase"
          >
            Shop all
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {shopPreview.map((p) => (
            <ProductCard key={p.handle} product={p} />
          ))}
        </div>
      </section>

      {/* Events + services */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] text-primary uppercase">On stage</p>
            <h2 className="mt-3 text-4xl sm:text-5xl">
              <span className="text-gold">Upcoming shows</span>
            </h2>
            <ul className="mt-8 space-y-4">
              {events.map((e) => (
                <li key={e.title} className="border border-border bg-background p-5">
                  <h3 className="text-2xl text-foreground">{e.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{e.detail}</p>
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-sweep mt-4 inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm font-bold tracking-[0.14em] text-primary uppercase"
                  >
                    Register
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold tracking-[0.3em] text-primary uppercase">In the lab</p>
            <h2 className="mt-3 text-4xl sm:text-5xl">
              <span className="text-gold">Work with Kat</span>
            </h2>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {services.map((s) => (
                <li key={s.title} className="flex items-center justify-between gap-4 py-4">
                  <span className="text-lg font-semibold text-foreground">{s.title}</span>
                  <span className="font-display text-xl whitespace-nowrap text-primary">
                    From {formatPrice(s.from)}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              to="/booking"
              className="mt-8 inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-sm bg-primary px-6 text-sm font-bold tracking-[0.12em] uppercase text-primary-foreground transition-colors duration-200 hover:bg-primary/85"
            >
              <Mail className="size-4" aria-hidden="true" />
              Start a booking
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
