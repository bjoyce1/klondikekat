import { Link } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";
import heroBg from "@/assets/hero-lowrider.png.asset.json";
import { images, mobManuscript } from "@/lib/site-data";

export function HomeHero() {
  return (
    <section className="hc-hero border-b border-border">
      <img
        src={heroBg.url}
        alt="Klondike Kat standing beside a blue Cadillac lowrider at sunset"
        fetchPriority="high"
        className="hc-hero-media"
      />
      <img
        src={images.hero}
        alt="Portrait of Klondike Kat in the studio"
        fetchPriority="high"
        className="hc-hero-mobile-portrait"
      />
      <div className="hc-hero-scrim" aria-hidden="true" />
      <div className="hc-hero-glow" aria-hidden="true" />

      <div className="hc-hero-content grain relative mx-auto flex max-w-7xl flex-col justify-end px-4 py-10 sm:min-h-[600px] sm:px-6 sm:py-20 lg:min-h-[720px] lg:py-24">
        <span className="hc-signal-line mb-4 sm:mb-6" aria-hidden="true" />
        <p className="text-[0.65rem] font-bold tracking-[0.26em] text-primary uppercase sm:text-xs sm:tracking-[0.3em]">
          South Park · Houston, Texas
        </p>
        <h1 className="hc-desktop-hero-title mt-3 font-display text-[2.5rem] leading-[0.95] tracking-[0.02em] text-foreground sm:mt-4 sm:text-7xl lg:text-8xl">
          Klondike Kat
        </h1>
        <div className="hc-mobile-feature">
          <p>Featured project</p>
          <h2>
            Mob
            <span>Manuscript.</span>
          </h2>
          <span className="hc-mobile-feature-line">The new full album</span>
          <Link
            to="/music"
            hash="music-mob-manuscript"
            className="tap-none hc-mobile-feature-action"
          >
            Explore album
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <Link
          to="/music"
          hash="music-mob-manuscript"
          className="hc-mobile-album-art"
          aria-label="Explore the Mob Manuscript album"
        >
          <img src={mobManuscript.image} alt="Mob Manuscript album cover" fetchPriority="high" />
        </Link>
        <p className="hc-mobile-hero-tagline" aria-hidden="true">
          The voice. The legacy. <span>The lion.</span>
        </p>
        <p className="mt-2 font-display text-lg tracking-[0.3em] text-gold uppercase sm:mt-3 sm:text-2xl sm:tracking-[0.4em]">
          The Lyrical Lion
        </p>
        <p className="hc-hero-description mt-5 max-w-lg text-base text-muted-foreground sm:mt-6 sm:text-lg">
          Thirty years of Houston underground rap. Lyricist, producer, singer. South Park
          Coalition, Killa Klan, Wreckless Klan.
        </p>
        <div className="hc-hero-actions mt-7 grid grid-cols-1 gap-3 sm:mt-9 sm:flex sm:flex-wrap">
          <Link
            to="/music"
            className="tap-none inline-flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold tracking-[0.12em] uppercase text-primary-foreground transition-colors duration-200 hover:bg-primary/85 sm:rounded-sm"
          >
            <Play className="size-4" aria-hidden="true" />
            <span className="hc-desktop-cta-label">Hear the music</span>
            <span className="hc-mobile-cta-label">Listen now</span>
          </Link>
          <Link
            to="/podcast"
            className="tap-none inline-flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-background/40 px-6 text-sm font-bold tracking-[0.12em] uppercase text-foreground backdrop-blur-sm transition-colors duration-200 hover:border-primary hover:text-primary sm:rounded-sm"
          >
            Enter the Lion's Den
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
