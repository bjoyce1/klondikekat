import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Marquee } from "@/components/site/Marquee";
import { affiliations, bio, images, releases } from "@/lib/site-data";

export const Route = createFileRoute("/bio")({
  head: () => ({
    meta: [
      { title: "Artist Bio — The History & Mystery | Klondike Kat" },
      {
        name: "description",
        content:
          "The story of Klondike Kat: South Park Houston lyricist, producer and singer, S.P.C. member since 1992, from The Lyrical Lion to Mobbin' Muzik Melodies and beyond.",
      },
      { property: "og:title", content: "Artist Bio — The History & Mystery of Klondike Kat" },
      {
        property: "og:description",
        content:
          "Thirty years of Houston underground rap: S.P.C., Killa Klan, Wreckless Klan, DJ Screw and a catalog of classics.",
      },
      { property: "og:type", content: "profile" },
    ],
  }),
  component: BioPage,
});

function BioPage() {
  return (
    <>
      <PageHero
        eyebrow="Artist bio"
        title="The History & Mystery"
        lead={bio.intro}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-16">
          <div className="max-w-prose space-y-6 text-lg leading-relaxed text-muted-foreground">
            {bio.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
            <p className="border-l-2 border-primary pl-6 text-foreground italic">{bio.closing}</p>
          </div>

          <aside className="space-y-8">
            <div className="grain media-zoom card-elevated rounded-sm">
              <img
                src={images.bioPortrait}
                alt="Portrait of Klondike Kat"
                loading="lazy"
                className="w-full object-cover"
              />
            </div>
            <div className="card-elevated rounded-sm p-6">
              <h2 className="text-2xl text-foreground">Crews & affiliations</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {affiliations.map((a) => (
                  <li
                    key={a}
                    className="border border-border px-3 py-1.5 text-xs font-bold tracking-[0.12em] text-primary uppercase"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-elevated rounded-sm p-6">
              <h2 className="text-2xl text-foreground">Selected discography</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {releases.map((r) => (
                  <li key={r.title} className="flex justify-between gap-4 border-b border-border pb-3">
                    <span className="text-foreground">{r.title}</span>
                    <span className="shrink-0 text-muted-foreground">{r.year ?? r.kind}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/music"
                className="link-sweep mt-5 inline-flex min-h-11 cursor-pointer items-center text-sm font-bold tracking-[0.14em] text-primary uppercase"
              >
                Hear it all
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <Marquee />
    </>
  );
}
