import { videos } from "@/lib/site-data";

export function ScreeningRoomHero() {
  const reel = videos[0];

  return (
    <section className="video-hero grain" aria-labelledby="videos-title">
      <div className="video-hero-frame">
        <div className="video-hero-sprockets video-hero-sprockets--left" aria-hidden="true" />
        <div className="video-hero-sprockets video-hero-sprockets--right" aria-hidden="true" />

        <div className="video-hero-still">
          {reel && (
            <img
              src={reel.image}
              alt=""
              aria-hidden="true"
              loading="eager"
              decoding="async"
              className="video-hero-still-img"
            />
          )}
          <div className="video-hero-vignette" aria-hidden="true" />
        </div>

        <div className="video-hero-copy">
          <p className="video-tally">
            <span className="video-tally-dot" aria-hidden="true" />
            ON AIR
          </p>
          <p className="video-hero-eyebrow">
            <span className="video-hero-eyebrow-line" aria-hidden="true" />
            Screening Room
          </p>
          <h1 id="videos-title" className="video-hero-title">
            <span className="text-gold">VIDEOS</span>
          </h1>
          <p className="video-hero-lead">The Visual Archive.</p>
          <p className="video-hero-sub">
            Official visuals and behind-the-scenes footage from Houston's Lyrical Lion, projected
            one reel at a time.
          </p>
        </div>

        <div className="video-hero-timecode" aria-hidden="true">
          <span>REEL 01</span>
          <span>00:00:00:00</span>
          <span>KLONDIKE KAT</span>
        </div>
      </div>
    </section>
  );
}
