import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { pillars, transmissions } from "./content";
import { BroadcastConsole } from "./BroadcastConsole";
import { LionDenMuscleCar } from "./LionDenMuscleCar";
import {
  Crown,
  LionDenDragTree,
  LionDenHalo,
  LionDenMicrophone,
  LionDenPlaque,
  LionDenSkyline,
  LionDenTachometer,
  LionDenWaveform,
} from "./LionDenMotifs";
import { useSceneMotion } from "../../hooks/useSceneMotion";

const chapters = [
  ["podcast-enter", "The den"],
  ["podcast-pillars", "The code"],
  ["podcast-signal", "The broadcast"],
  ["podcast-redline", "Horsepower"],
  ["podcast-log", "Up next"],
  ["podcast-pride", "The pride"],
];
function ChapterLabel({ number, children }: { number: string; children: string }) {
  return (
    <div className="ld-chapter-label">
      <span>{number}</span>
      <i />
      {children}
    </div>
  );
}
function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={down ? "ld-arrow-down" : ""}>
      <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function PodcastExperience() {
  const root = useRef<HTMLDivElement>(null);
  useSceneMotion(root);
  return (
    <div className="ld-page" ref={root}>
      <nav className="ld-chapters" aria-label="Podcast chapters">
        {chapters.map(([id, label], i) => (
          <a key={id} href={`#${id}`} aria-label={`${String(i + 1).padStart(2, "0")} ${label}`}>
            <span>{label}</span>
            <i />
          </a>
        ))}
      </nav>

      <section id="podcast-enter" data-scene className="ld-hero" aria-labelledby="hero-title">
        <div className="ld-hero-atmosphere" aria-hidden="true" />
        <div className="ld-hero-copy">
          <div className="ld-eyebrow">
            <span /> FROM HOUSTON. WITH SOUL.
          </div>
          <h1 id="hero-title">
            <span className="ld-title-intro">WELCOME TO</span>
            <span className="ld-metal-title">
              THE LION’S
              <br />
              DEN<span className="ld-title-period">.</span>
            </span>
            <span className="ld-title-sub">THE PODCAST BY KLONDIKE KAT</span>
          </h1>
          <div className="ld-manifesto">
            <span>MUSIC</span>
            <i />
            WISDOM
            <i />
            <span>HORSEPOWER</span>
          </div>
          <p>
            Real stories. Hard-earned wisdom.
            <br />
            And a little fuel for the soul.
          </p>
          <div className="ld-hero-actions">
            <a className="ld-button" href="#podcast-signal">
              <span className="ld-mini-play" /> EXPLORE THE BROADCAST <Arrow />
            </a>
            <a className="ld-text-link" href="#podcast-pillars">
              ENTER THE DEN <Arrow down />
            </a>
          </div>
          <div className="ld-hero-footnote">
            <span className="ld-signal-dot" /> INDEPENDENT VOICES. UNFILTERED CONVERSATIONS.
          </div>
        </div>
        <div className="ld-hero-art">
          <LionDenHalo className="ld-hero-halo" />
          <img
            className="ld-poster"
            src="/images/podcast/lions-den-poster.jpg"
            width="1179"
            height="1798"
            fetchPriority="high"
            alt="The Lion’s Den Podcast artwork: a roaring gold lion, fiery halo, vintage microphone, drag racing tree, and black muscle car above a forged title plaque."
          />
          <div className="ld-embers" aria-hidden="true">
            {Array.from({ length: 15 }, (_, i) => (
              <i
                key={i}
                style={{
                  left: `${10 + ((i * 29) % 85)}%`,
                  top: `${5 + ((i * 17) % 84)}%`,
                  opacity: 0.2 + (i % 4) * 0.16,
                }}
              />
            ))}
          </div>
        </div>
        <div className="ld-hero-bottom">
          <span>
            HOUSTON, TEXAS <b>·</b> ROOTED IN THE CULTURE
          </span>
          <a href="#podcast-pillars">
            SCROLL TO TUNE IN <Arrow down />
          </a>
          <span>EST. IN THE STREETS</span>
        </div>
      </section>

      <div className="ld-wave-divider" aria-hidden="true">
        <span />
        <LionDenWaveform />
        <span />
      </div>

      <section
        id="podcast-pillars"
        data-scene
        className="ld-section ld-pillars"
        aria-labelledby="pillars-title"
      >
        <ChapterLabel number="01">THE CODE WE LIVE BY</ChapterLabel>
        <div className="ld-section-heading">
          <h2 id="pillars-title">
            THREE LANES.
            <br />
            <span className="ld-metal-text">ONE WAY OF LIFE.</span>
          </h2>
          <p>
            From the records that raised us to the roads that shaped us. This is what drives the
            den.
          </p>
        </div>
        <div className="ld-pillar-grid">
          <LionDenPlaque className="ld-pillar ld-pillar-music">
            <div className="ld-pillar-visual">
              <div className="ld-grille-disc" />
              <LionDenMicrophone />
              <LionDenWaveform />
            </div>
            <span className="ld-engraving">01 / THE SOUND</span>
            <h3>MUSIC</h3>
            <p>{pillars[0].copy}</p>
            <span className="ld-pillar-rule" />
          </LionDenPlaque>
          <LionDenPlaque className="ld-pillar ld-pillar-wisdom">
            <div className="ld-pillar-visual">
              <LionDenHalo />
              <div className="ld-lion-medallion">
                <img src="/images/podcast/lions-den-poster.jpg" alt="" loading="lazy" />
              </div>
              <Crown className="ld-crest-crown" />
            </div>
            <span className="ld-engraving">02 / THE SUBSTANCE</span>
            <h3>WISDOM</h3>
            <p>{pillars[1].copy}</p>
            <span className="ld-pillar-rule" />
          </LionDenPlaque>
          <LionDenPlaque className="ld-pillar ld-pillar-horsepower">
            <div className="ld-pillar-visual">
              <LionDenTachometer />
              <span className="ld-gauge-flank ld-gauge-flank-left" />
              <span className="ld-gauge-flank ld-gauge-flank-right" />
            </div>
            <span className="ld-engraving">03 / THE DRIVE</span>
            <h3>HORSEPOWER</h3>
            <p>{pillars[2].copy}</p>
            <span className="ld-pillar-rule" />
          </LionDenPlaque>
        </div>
      </section>

      <section
        id="podcast-signal"
        data-scene
        className="ld-section ld-broadcast"
        aria-labelledby="broadcast-title"
      >
        <div className="ld-broadcast-intro">
          <ChapterLabel number="02">LIVE FROM THE DEN</ChapterLabel>
          <h2 id="broadcast-title">
            PULL UP.
            <br />
            <span className="ld-metal-text">TUNE IN.</span>
          </h2>
          <p>
            A 60-second music-bed preview while the first full podcast transmission is prepared.
          </p>
          <div className="ld-broadcast-signature">
            <LionDenMicrophone />
            <span>
              THE VOICE.
              <br />
              THE CULTURE.
              <br />
              <strong>THE DEN.</strong>
            </span>
          </div>
        </div>
        <BroadcastConsole
          audioSrc="/audio/lions-den-preview.mp3"
          trackTitle="Mob Manuscript: The Return"
        />
      </section>

      <section
        id="podcast-redline"
        data-scene
        className="ld-horsepower"
        aria-labelledby="horsepower-title"
      >
        <div className="ld-horsepower-top">
          <ChapterLabel number="03">BUILT FOR THE LONG ROAD</ChapterLabel>
          <h2 id="horsepower-title">
            SOUL IN THE SOUND.
            <br />
            <span className="ld-metal-text">FIRE UNDER THE HOOD.</span>
          </h2>
          <p>Some things you don’t explain. You feel.</p>
        </div>
        <div className="ld-road-scene">
          <div className="ld-city-haze" />
          <LionDenSkyline />
          <div className="ld-road" />
          <div className="ld-starting-line" />
          <LionDenDragTree />
          <LionDenMuscleCar />
          <div className="ld-road-instrument">
            <LionDenTachometer />
            <span>BUILT. NEVER BOUGHT.</span>
          </div>
          <div className="ld-road-caption">
            <span>BLACK CHROME / GOLD SOUL</span>
            <span>HOUSTON AFTER DARK</span>
          </div>
        </div>
        <div className="ld-spec-strip">
          <span>
            <i>01</i> TORQUE
          </span>
          <b />
          <span>
            <i>02</i> MOTION
          </span>
          <b />
          <span>
            <i>03</i> LEGACY
          </span>
        </div>
      </section>

      <section
        id="podcast-log"
        data-scene
        className="ld-section ld-transmissions"
        aria-labelledby="transmissions-title"
      >
        <ChapterLabel number="04">ON THE FREQUENCY</ChapterLabel>
        <div className="ld-section-heading">
          <h2 id="transmissions-title">
            UPCOMING
            <br />
            <span className="ld-metal-text">TRANSMISSIONS.</span>
          </h2>
          <p>
            Good conversations take a little time.
            <br />
            The den is getting ready.
          </p>
        </div>
        <ol className="ld-transmission-list">
          {transmissions.map((item) => (
            <li key={item.number}>
              <LionDenPlaque className="ld-transmission-log">
                <div className="ld-log-id">
                  <span>{item.number}</span>
                  <small>TRANSMISSION LOG</small>
                </div>
                <div className="ld-log-copy">
                  <span className="ld-engraving">{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
                <span className="ld-coming-soon">
                  <i /> COMING SOON
                </span>
              </LionDenPlaque>
            </li>
          ))}
        </ol>
      </section>

      <section id="podcast-pride" data-scene className="ld-pride" aria-labelledby="pride-title">
        <LionDenHalo />
        <div className="ld-pride-lion" aria-hidden="true">
          <img src="/images/podcast/lions-den-poster.jpg" alt="" loading="lazy" />
        </div>
        <div className="ld-pride-content">
          <Crown />
          <span className="ld-eyebrow">YOU’RE IN GOOD COMPANY</span>
          <h2 id="pride-title">
            JOIN <span>THE PRIDE.</span>
          </h2>
          <p>
            Episodes and listening destinations will be announced here. Until then, explore the
            catalog that built the voice behind the show.
          </p>
          <Link className="ld-button" to="/music">
            EXPLORE THE MUSIC <Arrow />
          </Link>
          <div className="ld-pride-signature">
            <LionDenWaveform />
            <LionDenMicrophone />
            <LionDenWaveform />
          </div>
        </div>
      </section>
    </div>
  );
}
