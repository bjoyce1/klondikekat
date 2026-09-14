import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { newSingles } from "@/lib/site-data";
import { useMusicMotion } from "@/hooks/useMusicMotion";
import { MusicVaultHero } from "./MusicVaultHero";
import { CatalogArchive } from "./CatalogArchive";
import { DiamondDreFeature } from "./DiamondDreFeature";
import { MusicSingles } from "./MusicSingles";
import { ArchiveArrow, MusicWaveform, StreamingLinks } from "./MusicDetails";

export function MusicVault() {
  const root = useRef<HTMLDivElement>(null);
  useMusicMotion(root);
  return (
    <div className="mv-page" ref={root}>
      <MusicVaultHero />
      <CatalogArchive />
      <DiamondDreFeature />
      <MusicSingles singles={newSingles} />
      <section className="mv-closing mv-section" aria-labelledby="music-closing-title">
        <MusicWaveform />
        <p className="mv-eyebrow">THE ARCHIVE STAYS OPEN</p>
        <h2 id="music-closing-title">
          KEEP THE RECORDS
          <br />
          <span>IN ROTATION.</span>
        </h2>
        <p>Stream the sound. Hold a piece of the history.</p>
        <StreamingLinks />
        <Link className="mv-text-link" to="/shop">
          EXPLORE PHYSICAL RELEASES
          <ArchiveArrow />
        </Link>
      </section>
    </div>
  );
}
