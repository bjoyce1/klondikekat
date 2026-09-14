import { Link } from "@tanstack/react-router";
import { Disc3 } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { mobManuscript } from "@/lib/site-data";

export function FeaturedRelease() {
  return (
    <section className="hc-mob-feature" aria-labelledby="hc-mob-title">
      <Reveal className="hc-mob-inner mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,460px)_1fr] lg:gap-20">
        <div className="hc-mob-art grain">
          <img
            src={mobManuscript.image}
            alt="Mob Manuscript album artwork featuring a gold crowned lion crest"
            loading="lazy"
            className="h-auto w-full object-contain"
          />
          <span aria-hidden="true">MM</span>
        </div>
        <div className="flex flex-col justify-center">
          <SectionHeading eyebrow="Featured full album" title={mobManuscript.title} />
          <p id="hc-mob-title" className="sr-only">Mob Manuscript featured album</p>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">{mobManuscript.note}</p>
          <div className="hc-mob-ledger mt-8">
            <span>ARTIST</span>
            <strong>{mobManuscript.artist}</strong>
            <span>FIRST SIGNAL</span>
            <strong>{mobManuscript.leadSingle}</strong>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/music"
              hash="music-mob-manuscript"
              className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-sm bg-primary px-6 text-sm font-bold tracking-[0.12em] uppercase text-primary-foreground transition-colors duration-200 hover:bg-primary/85"
            >
              <Disc3 className="size-4" aria-hidden="true" />
              Enter the album
            </Link>
            <Link
              to="/music"
              hash="music-singles"
              className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-sm border border-border px-6 text-sm font-bold tracking-[0.12em] uppercase text-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              Preview The Return
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
