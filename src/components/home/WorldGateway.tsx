import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import lionsDenPodcast from "@/assets/lions-den-podcast.jpg.asset.json";
import merchHoodie from "@/assets/merch-hoodie.jpg.asset.json";
import festival from "@/assets/festival.jpg.asset.json";
import bioPortrait from "@/assets/bio-portrait.jpg.asset.json";
import { mobManuscript } from "@/lib/site-data";

type Gate = {
  key: string;
  to: string;
  eyebrow: string;
  title: string;
  copy: string;
  image: string;
  alt: string;
};

const gates: Gate[] = [
  {
    key: "music",
    to: "/music",
    eyebrow: "The Vault",
    title: "Music",
    copy: "Three decades of catalog — now featuring the Mob Manuscript full album.",
    image: mobManuscript.image,
    alt: "Gold lion artwork for the Mob Manuscript album by Klondike Kat",
  },
  {
    key: "podcast",
    to: "/podcast",
    eyebrow: "The Lion's Den",
    title: "Podcast",
    copy: "Unfiltered conversation straight from South Park.",
    image: lionsDenPodcast.url,
    alt: "The Lion's Den podcast artwork",
  },
  {
    key: "shop",
    to: "/shop",
    eyebrow: "Official Store",
    title: "Shop",
    copy: "Merch, physical CDs and production, straight from the source.",
    image: merchHoodie.url,
    alt: "Klondike Kat signature hoodie",
  },
  {
    key: "live",
    to: "#live",
    eyebrow: "Shows",
    title: "Live",
    copy: "Catch Klondike Kat on stage. Registration open now.",
    image: festival.url,
    alt: "Festival pass artwork",
  },
  {
    key: "legacy",
    to: "/bio",
    eyebrow: "The Story",
    title: "Legacy",
    copy: "S.P.C. since 1992. Debut album since 1993. Still building.",
    image: bioPortrait.url,
    alt: "Portrait of Klondike Kat",
  },
];

export function WorldGateway() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-24">
      <SectionHeading eyebrow="The world" title="Five doors in" />
      <Reveal className="hc-gate-grid mt-8 sm:mt-10">
        {gates.map((g) => {
          const body = (
            <>
              <img src={g.image} alt={g.alt} loading="lazy" className="hc-gate-img" />
              <div className="hc-gate-scrim" aria-hidden="true" />
              <div className="hc-gate-body">
                <p className="text-[0.65rem] font-bold tracking-[0.26em] text-primary uppercase sm:text-xs">
                  {g.eyebrow}
                </p>
                <h3 className="mt-2 font-display text-3xl text-foreground sm:text-4xl">
                  {g.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm text-muted-foreground">{g.copy}</p>
                <span className="link-sweep mt-3 inline-flex min-h-6 w-fit items-center gap-1.5 text-xs font-bold tracking-[0.14em] text-primary uppercase">
                  Enter
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </span>
              </div>
            </>
          );
          const className = `hc-gate hover-lift grain hc-gate--${g.key} card-elevated`;
          if (g.to.startsWith("#")) {
            return (
              <a key={g.key} href={g.to} className={className}>
                {body}
              </a>
            );
          }
          return (
            <Link key={g.key} to={g.to} className={className}>
              {body}
            </Link>
          );
        })}
      </Reveal>
    </section>
  );
}
