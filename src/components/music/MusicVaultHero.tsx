import { archiveReleases, earliestYear, releaseAnchor } from "@/lib/music-catalog";
import { newSingles, releases, site } from "@/lib/site-data";
import { ArchiveArrow, MusicWaveform, StreamingLinks } from "./MusicDetails";

export function MusicVaultHero() {
  const center = archiveReleases[1] ?? archiveReleases[0];
  return (
    <section className="mv-hero" id="music-vault" aria-labelledby="music-title">
      <div className="mv-hero-grid">
        <div className="mv-hero-copy">
          <p className="mv-eyebrow">
            <i aria-hidden="true" />
            KLONDIKE KAT / THE MUSIC ARCHIVE
          </p>
          <h1 id="music-title">
            THE VAULT<span>.</span>
          </h1>
          <p className="mv-hero-statement">
            THREE DECADES.
            <br />
            STILL IN ROTATION.
          </p>
          <p className="mv-hero-lead">
            The records. The stories. The sound of South Park.
            <br className="mv-desktop-break" /> Step inside a catalog built from the underground up.
          </p>
          <div className="mv-hero-actions">
            <a className="mv-button" href="#music-catalog">
              EXPLORE THE ARCHIVE
              <ArchiveArrow down />
            </a>
            <a className="mv-text-link" href="#music-singles">
              HEAR THE NEW SINGLES
              <ArchiveArrow />
            </a>
          </div>
          <StreamingLinks />
        </div>
        <div className="mv-art-stage">
          <span className="mv-stage-label mv-micro">ORIGINAL RECORDS. ENDURING VOICE.</span>
          <div className="mv-record-disc" aria-hidden="true">
            <i />
            <span>
              KLONDIKE KAT
              <br />
              THE ARCHIVE
            </span>
          </div>
          {archiveReleases.slice(0, 3).map((release, index) => (
            <div className={`mv-hero-sleeve mv-hero-sleeve-${index}`} key={release.shopHandle}>
              <img
                src={release.image}
                alt={`${release.title} cover`}
                width="600"
                height="600"
                fetchPriority={index === 1 ? "high" : "auto"}
              />
            </div>
          ))}
          {center && (
            <a className="mv-art-caption" href={`#${releaseAnchor(center.shopHandle)}`}>
              <span className="mv-micro">IN THE COLLECTION / {center.year ?? center.kind}</span>
              <strong>{center.title}</strong>
              <ArchiveArrow />
            </a>
          )}
          <div className="mv-stage-floor" aria-hidden="true" />
        </div>
      </div>
      <div className="mv-hero-register">
        <span>
          <i aria-hidden="true" />
          {site.city}
        </span>
        <span>{earliestYear ? `EST. ${earliestYear}` : "THE ARCHIVE"}</span>
        <span>{String(releases.length).padStart(2, "0")} ALBUMS & EPs</span>
        <span>{String(newSingles.length).padStart(2, "0")} MODERN SINGLES</span>
        <MusicWaveform />
      </div>
    </section>
  );
}
