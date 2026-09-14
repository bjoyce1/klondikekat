import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { releases, singles } from "@/lib/site-data";

export function FeaturedRelease() {
  const featured = releases[0]!;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-24">
      <Reveal className="grid gap-6 sm:gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16">
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
  );
}
