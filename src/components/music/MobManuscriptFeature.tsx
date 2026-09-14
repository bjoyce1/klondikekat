import { Link } from "@tanstack/react-router";
import { ArchiveArrow, SectionMark } from "./MusicDetails";
import { mobManuscript } from "@/lib/site-data";

export function MobManuscriptFeature() {
  return (
    <section
      className="mv-mob mv-section"
      id="music-mob-manuscript"
      aria-labelledby="mob-manuscript-title"
    >
      <SectionMark number="01">FEATURED FULL ALBUM</SectionMark>
      <div className="mv-mob-grid">
        <figure className="mv-mob-art" data-reveal>
          <img
            src={mobManuscript.image}
            alt="Mob Manuscript album artwork featuring a gold crowned lion crest"
            width="1024"
            height="1536"
            decoding="async"
          />
          <figcaption>OFFICIAL ALBUM ARTWORK / KLONDIKE KAT</figcaption>
        </figure>
        <div className="mv-mob-copy" data-reveal>
          <p className="mv-eyebrow"><i aria-hidden="true" />THE NEXT MANUSCRIPT</p>
          <h2 id="mob-manuscript-title">MOB<br /><span>MANUSCRIPT.</span></h2>
          <p>{mobManuscript.note}</p>
          <div className="mv-mob-signal">
            <span className="mv-micro">FIRST SIGNAL</span>
            <strong>{mobManuscript.leadSingle}</strong>
          </div>
          <Link className="mv-button" to="/music" hash="music-singles">
            HEAR THE PREVIEW
            <ArchiveArrow down />
          </Link>
        </div>
      </div>
    </section>
  );
}