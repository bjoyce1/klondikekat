import { images, site } from "@/lib/site-data";

export function BioHero() {
  return (
    <section className="bio-hero grain relative isolate overflow-hidden border-b border-border">
      <div className="bio-hero-media" aria-hidden="true">
        <img
          src={images.bioPortrait}
          alt=""
          className="bio-hero-img"
          fetchPriority="high"
        />
        <div className="bio-hero-scrim" />
      </div>

      <div className="bio-hero-frame" aria-hidden="true">
        <span className="bio-hero-corner bio-hero-corner--tl" />
        <span className="bio-hero-corner bio-hero-corner--tr" />
        <span className="bio-hero-corner bio-hero-corner--bl" />
        <span className="bio-hero-corner bio-hero-corner--br" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-28">
        <div className="bio-hero-label">
          <span>Case File</span>
          <span aria-hidden="true">&middot;</span>
          <span>S.P.C. Archive</span>
          <span aria-hidden="true">&middot;</span>
          <span>{site.city}</span>
        </div>

        <p className="bio-hero-kicker">Klondike Kat presents</p>

        <h1 className="bio-hero-title">
          <span className="bio-hero-title-line">THE HISTORY</span>
          <span className="bio-hero-title-amp" aria-hidden="true">&amp;</span>
          <span className="bio-hero-title-line bio-hero-title-line--gold">MYSTERY</span>
        </h1>

        <div className="bio-hero-plate">
          <span className="bio-hero-plate-name">KLONDIKE KAT</span>
          <span className="bio-hero-plate-sub">South Park, Houston &mdash; The Lyrical Lion</span>
        </div>

        <p className="bio-hero-lead">{site.tagline} — a documentary record of a career built inside the South Park Coalition and the Killa Klan.</p>
      </div>
    </section>
  );
}
