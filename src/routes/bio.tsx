import { createFileRoute } from "@tanstack/react-router";
import { Marquee } from "@/components/site/Marquee";
import { BioHero } from "@/components/bio/BioHero";
import { LinerNoteChapters } from "@/components/bio/LinerNoteChapters";
import { LegacyTimeline } from "@/components/bio/LegacyTimeline";
import { AffiliationArchive } from "@/components/bio/AffiliationArchive";
import { CatalogLedger } from "@/components/bio/CatalogLedger";
import bioCss from "@/styles/bio.css?url";

export const Route = createFileRoute("/bio")({
  head: () => ({
    meta: [
      { title: "The History & Mystery — Artist Bio | Klondike Kat" },
      {
        name: "description",
        content:
          "The History & Mystery: a documentary archive of Klondike Kat — South Park Houston lyricist, producer and singer, S.P.C. member since 1992, from The Lyrical Lion to Mobbin' Muzik Melodies and beyond.",
      },
      { property: "og:title", content: "The History & Mystery — Klondike Kat" },
      {
        property: "og:description",
        content:
          "Thirty years of Houston underground rap: S.P.C., Killa Klan, Wreckless Klan, DJ Screw and a catalog of classics.",
      },
      { property: "og:type", content: "profile" },
    ],
    links: [{ rel: "stylesheet", href: bioCss }],
  }),
  component: BioPage,
});

function BioPage() {
  return (
    <div className="bio-page">
      <BioHero />
      <LinerNoteChapters />
      <LegacyTimeline />
      <AffiliationArchive />
      <CatalogLedger />
      <Marquee />
    </div>
  );
}
