import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { images } from "@/lib/site-data";

const marks = [
  { year: "1992", label: "Joined the South Park Coalition" },
  { year: "1993", label: "Debut EP \u201cThe Lyrical Lion\u201d" },
];

export function LegacyPreview() {
  return (
    <section className="border-y border-border bg-surface">
      <Reveal className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 sm:py-20 lg:grid-cols-[1fr_minmax(0,460px)] lg:items-center lg:gap-16">
        <div>
          <SectionHeading eyebrow="The history" title="Thirty years deep" />
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Klondike Kat debuted in 1993 with "The Lyrical Lion," home of the classic S.P.C. click
            record "Murder Script." He joined the South Park Coalition in 1992 and has been one of
            H-Town's most respected lyricists and producers ever since.
          </p>
          <div className="hc-legacy-marks mt-8">
            {marks.map((m) => (
              <div key={m.year} className="hc-legacy-mark">
                <p className="font-display text-4xl text-gold">{m.year}</p>
                <p className="mt-1 text-sm text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>
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
            src={images.bioPortrait}
            alt="Portrait of Klondike Kat"
            loading="lazy"
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
      </Reveal>
    </section>
  );
}
