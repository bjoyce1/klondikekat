import { Link } from "@tanstack/react-router";
import { archiveReleases, releaseAnchor } from "@/lib/music-catalog";
import { formatPrice } from "@/components/site/ProductCard";
import { ArchiveArrow, SectionMark } from "./MusicDetails";

export function CatalogArchive() {
  return (
    <section className="mv-catalog mv-section" id="music-catalog" aria-labelledby="catalog-title">
      <SectionMark number="01">THE ALBUM ARCHIVE</SectionMark>
      <div className="mv-section-heading">
        <h2 id="catalog-title">
          EVERY RECORD.
          <br />
          <span>A CHAPTER.</span>
        </h2>
        <p>
          Start at the beginning. Follow the sound.
          <br />A collection rooted in Houston, made to last.
        </p>
      </div>
      <div className="mv-catalog-layout">
        <nav className="mv-year-rail" aria-label="Catalog chronology">
          <span className="mv-micro">THE INDEX</span>
          <ol>
            {archiveReleases.map((release, index) => (
              <li key={release.shopHandle}>
                <a href={`#${releaseAnchor(release.shopHandle)}`}>
                  <i aria-hidden="true" />
                  <span className="mv-year">{release.year ?? "ARCHIVE"}</span>
                  <span className="mv-rail-title">{release.title}</span>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                </a>
              </li>
            ))}
          </ol>
          <a className="mv-index-next" href="#music-diamond">
            FEATURED PROJECT
            <ArchiveArrow down />
          </a>
        </nav>
        <div className="mv-archive-entries">
          {archiveReleases.map((release, index) => (
            <article
              className="mv-release"
              id={releaseAnchor(release.shopHandle)}
              key={release.shopHandle}
              data-archive-entry
              data-reveal
              aria-labelledby={`${releaseAnchor(release.shopHandle)}-title`}
            >
              <figure className="mv-release-art">
                <div className="mv-sleeve">
                  <div className="mv-case-spine" aria-hidden="true" />
                  <img
                    src={release.image}
                    alt={`Original artwork for ${release.title}`}
                    width="600"
                    height="600"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <figcaption>
                  <span>KLONDIKE KAT</span>
                  <span>
                    {release.kind} / {release.year ?? "UNDATED"}
                  </span>
                </figcaption>
              </figure>
              <div className="mv-release-copy">
                <div className="mv-release-meta">
                  <span>{release.year ?? "FROM THE COLLECTION"}</span>
                  <i aria-hidden="true" />
                  {release.kind}
                  <small>{String(index + 1).padStart(2, "0")}</small>
                </div>
                <h3 id={`${releaseAnchor(release.shopHandle)}-title`}>{release.title}</h3>
                <p className="mv-release-note">{release.note}</p>
                <div className="mv-physical">
                  <div>
                    <span className="mv-micro">PHYSICAL ARCHIVE</span>
                    <p>
                      Compact disc <b>{formatPrice(release.cdPrice)}</b>
                    </p>
                  </div>
                  <Link
                    className="mv-outline-link"
                    to="/shop/$handle"
                    params={{ handle: release.shopHandle }}
                    aria-label={`Buy ${release.title} on CD`}
                  >
                    BUY CD
                    <ArchiveArrow />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
