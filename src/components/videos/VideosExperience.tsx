import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import {
  Crown,
  LionDenHalo,
  LionDenMicrophone,
  LionDenPlaque,
  LionDenWaveform,
} from "@/components/podcast/LionDenMotifs";
import { useSceneMotion } from "@/hooks/useSceneMotion";
import { images, videos } from "@/lib/site-data";

const chapters = [
  ["videos-enter", "The reel"],
  ["videos-feature", "Main edit"],
  ["videos-studio", "In the studio"],
  ["videos-pride", "The pride"],
];

const featured = videos[0]!;

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

export function VideosExperience() {
  const root = useRef<HTMLDivElement>(null);
  useSceneMotion(root);

  return (
    <div className="ld-page kv-page" ref={root}>
      <nav className="ld-chapters" aria-label="Video chapters">
        {chapters.map(([id, label], i) => (
          <a key={id} href={`#${id}`} aria-label={`${String(i + 1).padStart(2, "0")} ${label}`}>
            <span>{label}</span>
            <i />
          </a>
        ))}
      </nav>

      <section id="videos-enter" data-scene className="ld-hero" aria-labelledby="videos-title">
        <div className="ld-hero-atmosphere" aria-hidden="true" />
        <div className="ld-hero-copy">
          <div className="ld-eyebrow">
            <span /> SHOT IN HOUSTON. CUT FOR THE STREETS.
          </div>
          <h1 id="videos-title">
            <span className="ld-title-intro">OFFICIAL</span>
            <span className="ld-metal-title">
              VISUALS
              <span className="ld-title-period">.</span>
            </span>
            <span className="ld-title-sub">MUSIC VIDEOS BY KLONDIKE KAT</span>
          </h1>
          <div className="ld-manifesto">
            <span>PICTURE</span>
            <i />
            SOUND
            <i />
            <span>STORY</span>
          </div>
          <p>
            Every frame carries the record.
            <br />
            Roll the tape and ride with it.
          </p>
          <div className="ld-hero-actions">
            <a className="ld-button" href="#videos-feature">
              <span className="ld-mini-play" /> PLAY THE MAIN EDIT <Arrow />
            </a>
            <a className="ld-text-link" href="#videos-studio">
              BEHIND THE BOARDS <Arrow down />
            </a>
          </div>
          <div className="ld-hero-footnote">
            <span className="ld-signal-dot" /> ONE RELEASED VISUAL. MORE IN THE CAN.
          </div>
        </div>
        <div className="ld-hero-art kv-hero-art">
          <LionDenHalo className="ld-hero-halo" />
          <div className="kv-hero-frame">
            <img
              src={featured.image}
              width="1920"
              height="1080"
              fetchPriority="high"
              alt={`Still frame from the Klondike Kat video ${featured.title}`}
            />
            <span className="kv-scanline" aria-hidden="true" />
            <span className="kv-frame-tag">REEL 01 / MAIN EDIT</span>
          </div>
          <div className="ld-embers" aria-hidden="true">
            {Array.from({ length: 14 }, (_, i) => (
              <i
                key={i}
                style={{
                  left: `${8 + ((i * 31) % 86)}%`,
                  top: `${6 + ((i * 19) % 82)}%`,
                  opacity: 0.2 + (i % 4) * 0.16,
                }}
              />
            ))}
          </div>
        </div>
        <div className="ld-hero-bottom">
          <span>
            HOUSTON, TEXAS <b>·</b> SOUTH PARK COALITION
          </span>
          <a href="#videos-feature">
            SCROLL TO WATCH <Arrow down />
          </a>
          <span>SHOT ON LOCATION</span>
        </div>
      </section>

      <div className="ld-wave-divider" aria-hidden="true">
        <span />
        <LionDenWaveform />
        <span />
      </div>

      <section
        id="videos-feature"
        data-scene
        className="ld-section kv-feature"
        aria-labelledby="feature-title"
      >
        <ChapterLabel number="01">NOW PLAYING</ChapterLabel>
        <div className="ld-section-heading">
          <h2 id="feature-title">
            YOU WRONG.
            <br />
            <span className="ld-metal-text">THE MAIN EDIT.</span>
          </h2>
          <p>{featured.description}</p>
        </div>
        <LionDenPlaque className="kv-theater">
          <div className="kv-theater-rail" aria-hidden="true">
            <span className="ld-signal-dot" /> REC
            <i />
            <span>1080p</span>
            <i />
            <span>STEREO</span>
          </div>
          <div className="kv-screen">
            <video
              src={featured.videoUrl}
              poster={featured.image}
              controls
              playsInline
              preload="metadata"
              aria-label={featured.title}
            />
          </div>
          <div className="kv-theater-foot">
            <span className="ld-engraving">{featured.title}</span>
            <LionDenWaveform />
          </div>
        </LionDenPlaque>
      </section>

      <section
        id="videos-studio"
        data-scene
        className="ld-section kv-studio"
        aria-labelledby="studio-title"
      >
        <ChapterLabel number="02">BEHIND THE BOARDS</ChapterLabel>
        <div className="ld-section-heading">
          <h2 id="studio-title">
            WHERE THE
            <br />
            <span className="ld-metal-text">RECORDS GET MADE.</span>
          </h2>
          <p>Studio footage and session stills from the sessions that feed the visuals.</p>
        </div>
        <div className="kv-studio-grid">
          <LionDenPlaque className="kv-still">
            <div className="kv-still-media">
              <img
                src={images.studioSession}
                alt="Klondike Kat during a studio session"
                loading="lazy"
                decoding="async"
              />
            </div>
            <span className="ld-engraving">SESSION / THE BOARDS</span>
            <h3>In the studio</h3>
            <p>Behind the boards on the Ties That Bind Us sessions.</p>
          </LionDenPlaque>
          <LionDenPlaque className="kv-still">
            <div className="kv-still-media">
              <img
                src={images.cookingUp}
                alt="Klondike Kat building a beat in the studio"
                loading="lazy"
                decoding="async"
              />
            </div>
            <span className="ld-engraving">SESSION / THE SOUND</span>
            <h3>Cooking up</h3>
            <p>Twangy guitars, heavy bass and forceful synths — the house sound taking shape.</p>
          </LionDenPlaque>
        </div>
      </section>

      <section id="videos-pride" data-scene className="ld-pride" aria-labelledby="videos-cta-title">
        <LionDenHalo />
        <div className="ld-pride-content">
          <Crown />
          <span className="ld-eyebrow">MORE VISUALS ON THE WAY</span>
          <h2 id="videos-cta-title">
            RIDE WITH <span>THE PRIDE.</span>
          </h2>
          <p>
            New visuals land here as they drop. Until then, run the catalog that the cameras were
            built around.
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
