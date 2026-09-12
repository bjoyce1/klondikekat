import { Link } from "@tanstack/react-router";
import { diamondDre } from "@/lib/site-data";
import { formatPrice } from "@/components/site/ProductCard";
import { ArchiveArrow, SectionMark } from "./MusicDetails";

export function DiamondDreFeature() {
  return (
    <section className="mv-diamond" id="music-diamond" aria-labelledby="diamond-title">
      <div className="mv-diamond-inner">
        <div className="mv-diamond-art" data-reveal>
          <SectionMark number="02">FEATURED PROJECT</SectionMark>
          <div className="mv-diamond-sleeve">
            <img
              src={diamondDre.image}
              alt={diamondDre.title}
              width="600"
              height="600"
              loading="lazy"
            />
            <span className="mv-case-hinge" aria-hidden="true" />
          </div>
          <div className="mv-feature-caption">
            <span className="mv-micro">FROM THE KLONDIKE KAT COLLECTION</span>
            <strong>{diamondDre.title}</strong>
          </div>
        </div>
        <div className="mv-diamond-copy">
          <p className="mv-eyebrow">
            <i aria-hidden="true" />
            THE EXCLUSIVE SESSIONS
          </p>
          <h2 id="diamond-title">
            {diamondDre.title.replace(/^Exclusive | Album$/g, "")}
            <span>.</span>
          </h2>
          <p className="mv-diamond-lead">
            {diamondDre.tracks.length} tracks. One project.
            <br />
            Explore the record, then choose your format.
          </p>
          <div className="mv-track-sheet">
            <div className="mv-track-sheet-label mv-micro">
              <span>TRACK / TITLE</span>
              <span>DIGITAL SINGLE</span>
            </div>
            <ol>
              {diamondDre.tracks.map((track, index) => (
                <li key={track.title}>
                  <span className="mv-track-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="mv-track-title">{track.title}</span>
                  <span className="mv-track-price">{formatPrice(diamondDre.singlePrice)}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="mv-format-options">
            <span>
              COMPACT DISC <b>{formatPrice(diamondDre.cdPrice)}</b>
            </span>
            <span>
              ALBUM DOWNLOAD <b>{formatPrice(diamondDre.albumPrice)}</b>
            </span>
          </div>
          <Link className="mv-button" to="/shop/$handle" params={{ handle: diamondDre.handle }}>
            EXPLORE CD, ALBUM & SINGLES
            <ArchiveArrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
