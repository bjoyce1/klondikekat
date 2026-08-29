import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mail, Play } from "lucide-react";
import { Marquee } from "@/components/site/Marquee";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ProductCard, formatPrice } from "@/components/site/ProductCard";
import heroBg from "@/assets/hero-lowrider.png.asset.json";
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
      <section className="relative isolate overflow-hidden border-b border-border">
        <img
          src={heroBg.url}
          alt="Klondike Kat standing beside a blue Cadillac lowrider at sunset"
          fetchPriority="high"
          className="block h-auto w-full sm:absolute sm:inset-0 sm:-z-10 sm:size-full sm:object-cover sm:object-[center_15%]"
        />
        <div
          className="absolute inset-0 -z-10 hidden bg-gradient-to-t from-background via-background/70 to-background/20 sm:block"
          aria-hidden="true"
        />
        <div className="grain relative mx-auto flex max-w-7xl flex-col justify-end px-4 py-10 sm:min-h-[78svh] sm:px-6 sm:py-20 lg:min-h-[85vh] lg:py-24">
          <p className="text-[0.65rem] font-bold tracking-[0.26em] text-primary uppercase sm:text-xs sm:tracking-[0.3em]">
            South Park · Houston, Texas
          </p>
          <h1 className="sr-only">Klondike Kat — The Lyrical Lion</h1>
          <p
            aria-hidden="true"
            className="mt-3 font-display text-[2rem] leading-none tracking-[0.16em] text-foreground sm:mt-4 sm:text-5xl sm:tracking-[0.22em]"
          >
            The Lyrical Lion
          </p>
          <p className="mt-4 max-w-lg text-base text-muted-foreground sm:mt-5 sm:text-lg">
            Thirty years of Houston underground rap. Lyricist, producer, singer. South Park
            Coalition, Killa Klan, Wreckless Klan.
          </p>
          <div className="mt-7 grid grid-cols-1 gap-3 sm:mt-9 sm:flex sm:flex-wrap">
            <Link
              to="/music"
              className="tap-none inline-flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold tracking-[0.12em] uppercase text-primary-foreground transition-colors duration-200 hover:bg-primary/85 sm:rounded-sm"
            >
              <Play className="size-4" aria-hidden="true" />
              Hear the catalog
            </Link>
            <Link
              to="/shop"
              className="tap-none inline-flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-background/40 px-6 text-sm font-bold tracking-[0.12em] uppercase text-foreground backdrop-blur-sm transition-colors duration-200 hover:border-primary hover:text-primary sm:rounded-sm"
            >
              Shop the store
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>


      <Marquee />

      {/* Featured release */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <Reveal className="grid gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16">
          <div className="grain media-zoom card-elevated rounded-sm">

            <img
              src={featured.image}
              alt={`Cover artwork for ${featured.title}`}
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <SectionHeading eyebrow="Featured release" title={featured.title} />
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
        </Reveal>
      </section>


      {/* Bio strip */}
      <section className="border-y border-border bg-surface">
        <Reveal className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_minmax(0,460px)] lg:items-center lg:gap-16">
          <div>
            <SectionHeading eyebrow="The history" title="Thirty years deep" />
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
          <div className="grain media-zoom card-elevated rounded-sm">
            <img
              src={images.bioSquare}
              alt="Portrait of Klondike Kat"
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          </div>
        </Reveal>
      </section>


      {/* Shop preview */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHeading
          eyebrow="The store"
          title="Merch & music"
          action={
            <Link
              to="/shop"
              className="link-sweep min-h-11 cursor-pointer text-sm font-bold tracking-[0.14em] text-primary uppercase"
            >
              Shop all
            </Link>
          }
        />
        <div className="snap-rail -mx-4 mt-8 px-4 sm:mx-0 sm:mt-10 sm:grid sm:gap-5 sm:px-0 sm:grid-cols-2 lg:grid-cols-4">
          {shopPreview.map((p) => (
            <ProductCard key={p.handle} product={p} />
          ))}
        </div>
      </section>

      {/* Events + services */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="On stage" title="Upcoming shows" />
            <ul className="mt-8 space-y-4">
              {events.map((e) => (
                <li key={e.title} className="card-elevated hover-lift rounded-sm bg-background p-5">
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
            <SectionHeading eyebrow="In the lab" title="Work with Kat" />
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
