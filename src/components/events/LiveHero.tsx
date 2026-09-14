import { images } from "@/lib/site-data";

export function LiveHero() {
  return (
    <section className="live-hero grain" aria-labelledby="live-hero-title">
      <div className="live-hero-media">
        <img
          src={images.hero}
          alt="Klondike Kat performing live on stage"
          className="live-hero-img"
        />
        <div className="live-hero-fog" aria-hidden="true" />
        <div className="live-hero-beams" aria-hidden="true" />
        <div className="live-hero-vignette" aria-hidden="true" />
      </div>

      <div className="live-hero-content">
        <p className="live-eyebrow">
          <span className="live-tally" aria-hidden="true" />
          On stage
        </p>
        <h1 id="live-hero-title" className="live-hero-title">
          LIVE
        </h1>
        <p className="live-hero-lead">
          Klondike Kat, live. Real shows, real tickets — details confirmed on the official event
          page as they're announced.
        </p>
      </div>
    </section>
  );
}
