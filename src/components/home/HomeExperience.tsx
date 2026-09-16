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
import { featuredAlbum, events, products, releases, services } from "@/lib/site-data";

const chapters = [
  ["home-enter", "The lion"],
  ["home-featured", "Featured release"],
  ["home-catalog", "The catalog"],
  ["home-floor", "Store & stage"],
  ["home-pride", "The pride"],
];

const formatPrice = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

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

export function HomeExperience() {
  const root = useRef<HTMLDivElement>(null);
  useSceneMotion(root);

  const catalog = releases.filter((r) => r.title !== "Exclusive Diamond Dre Album");
  const storePreview = products
    .filter((p) =>
      ["signature-hoodie", "klondike-kat-t-shirt", "limited-edition-cap", "beats-for-days"].includes(
        p.handle,
      ),
    )
    .slice(0, 4);

  return (
    <div className="ld-page kh-page" ref={root}>
      <nav className="ld-chapters" aria-label="Page chapters">
        {chapters.map(([id, label], i) => (
          <a key={id} href={`#${id}`} aria-label={`${String(i + 1).padStart(2, "0")} ${label}`}>
            <span>{label}</span>
            <i />
          </a>
        ))}
      </nav>

      <section id="home-enter" data-scene className="ld-hero" aria-labelledby="home-title">
        <div className="ld-hero-atmosphere" aria-hidden="true" />
        <div className="ld-hero-copy">
          <div className="ld-eyebrow">
            <span /> SOUTH PARK · HOUSTON, TEXAS
          </div>
          <h1 id="home-title">
            <span className="ld-title-intro">KLONDIKE KAT</span>
            <span className="ld-metal-title">
              THE LYRICAL LION
              <span className="ld-title-period">.</span>
            </span>
            <span className="ld-title-sub">
              THIRTY YEARS OF HOUSTON UNDERGROUND RAP
            </span>
          </h1>
          <div className="ld-manifesto">
            <span>LYRICIST</span>
            <i />
            PRODUCER
            <i />
            <span>SINGER</span>
          </div>
          <p>
            South Park Coalition. Killa Klan. Wreckless Klan.
            <br />
            The catalog runs deep and the pen never dulled.
          </p>
          <div className="ld-hero-actions">
            <a className="ld-button" href="#home-featured">
              <span className="ld-mini-play" /> THE NEW ALBUM <Arrow />
            </a>
            <Link className="ld-text-link" to="/music">
              HEAR THE CATALOG <Arrow />
            </Link>
          </div>
          <div className="ld-hero-footnote">
            <span className="ld-signal-dot" /> FEATURED RELEASE: {featuredAlbum.title.toUpperCase()}
          </div>
        </div>
        <div className="ld-hero-art kh-hero-art">
          <LionDenHalo className="ld-hero-halo" />
          <div className="kh-cover-frame">
            <img
              src={featuredAlbum.image}
              width="1240"
              height="1240"
              fetchPriority="high"
              alt={`Album cover for ${featuredAlbum.title} by Klondike Kat`}
            />
            <span className="kh-frame-tag">NEW ALBUM</span>
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
            EST. 1993 <b>·</b> SOUTH PARK COALITION
          </span>
          <a href="#home-featured">
            SCROLL TO THE RELEASE <Arrow down />
          </a>
          <span>H-TOWN FOREVER</span>
        </div>
      </section>

      <div className="ld-wave-divider" aria-hidden="true">
        <span />
        <LionDenWaveform />
        <span />
      </div>

      <section
        id="home-featured"
        data-scene
        className="ld-section kh-featured"
        aria-labelledby="featured-title"
      >
        <ChapterLabel number="01">FEATURED RELEASE</ChapterLabel>
        <div className="ld-section-heading">
          <h2 id="featured-title">
            MOB
            <br />
            <span className="ld-metal-text">MANUSCRIPT.</span>
          </h2>
          <p>{featuredAlbum.note}</p>
        </div>
        <LionDenPlaque className="kh-feature-plaque">
          <div className="kh-feature-grid">
            <div className="kh-feature-art">
              <img
                src={featuredAlbum.image}
                alt={`Album cover for ${featuredAlbum.title}`}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="kh-feature-copy">
              <span className="ld-engraving">KLONDIKE KAT / FULL LENGTH</span>
              <h3>{featuredAlbum.title}</h3>
              <p>
                The gold-leaf manuscript of the mob. Tracklist and audio are being finalized — the
                full run lands on this page first.
              </p>
              <div className="kh-status">
                <span className="ld-signal-dot" /> TRACKLIST COMING SOON
              </div>
              <div className="kh-feature-actions">
                <Link className="ld-button" to="/music">
                  HEAR THE SINGLES <Arrow />
                </Link>
                <Link className="ld-text-link" to="/shop">
                  VISIT THE STORE <Arrow />
                </Link>
              </div>
              <LionDenWaveform />
            </div>
          </div>
        </LionDenPlaque>
      </section>

      <section
        id="home-catalog"
        data-scene
        className="ld-section kh-catalog"
        aria-labelledby="catalog-title"
      >
        <ChapterLabel number="02">THE CATALOG</ChapterLabel>
        <div className="ld-section-heading">
          <h2 id="catalog-title">
            THREE DECADES
            <br />
            <span className="ld-metal-text">ON RECORD.</span>
          </h2>
          <p>Albums and EPs pressed on physical CD, straight from the Lyrical Lion's own shelf.</p>
        </div>
        <div className="kh-catalog-grid">
          {catalog.map((release) => (
            <LionDenPlaque key={release.shopHandle} className="kh-card">
              <div className="kh-card-media">
                <img
                  src={release.image}
                  alt={`Cover artwork for ${release.title}`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span className="ld-engraving">
                {release.kind}
                {release.year ? ` / ${release.year}` : ""}
              </span>
              <h3>{release.title}</h3>
              <p>{release.note}</p>
              <Link className="ld-text-link" to="/music">
                MORE IN THE MUSIC ROOM <Arrow />
              </Link>
            </LionDenPlaque>
          ))}
        </div>
      </section>

      <section
        id="home-floor"
        data-scene
        className="ld-section kh-floor"
        aria-labelledby="floor-title"
      >
        <ChapterLabel number="03">STORE & STAGE</ChapterLabel>
        <div className="ld-section-heading">
          <h2 id="floor-title">
            MERCH, SHOWS
            <br />
            <span className="ld-metal-text">AND STUDIO TIME.</span>
          </h2>
          <p>Wear the crest, catch a show, or book the lab.</p>
        </div>

        <div className="kh-store-grid">
          {storePreview.map((product) => (
            <Link
              key={product.handle}
              to="/shop/$handle"
              params={{ handle: product.handle }}
              className="kh-store-card"
            >
              <img src={product.image} alt={product.title} loading="lazy" decoding="async" />
              <span className="kh-store-title">{product.title}</span>
              <span className="kh-store-price">{formatPrice(product.price)}</span>
            </Link>
          ))}
        </div>

        <div className="kh-floor-grid">
          <LionDenPlaque className="kh-card">
            <span className="ld-engraving">ON STAGE</span>
            <h3>Upcoming shows</h3>
            <ul className="ld-transmission-list kh-list">
              {events.map((e) => (
                <li key={e.title}>
                  <strong>{e.title}</strong>
                  <span>{e.detail}</span>
                </li>
              ))}
            </ul>
          </LionDenPlaque>
          <LionDenPlaque className="kh-card">
            <span className="ld-engraving">IN THE LAB</span>
            <h3>Work with Kat</h3>
            <ul className="ld-transmission-list kh-list">
              {services.map((s) => (
                <li key={s.title}>
                  <strong>{s.title}</strong>
                  <span>From {formatPrice(s.from)}</span>
                </li>
              ))}
            </ul>
            <Link className="ld-button" to="/booking">
              START A BOOKING <Arrow />
            </Link>
          </LionDenPlaque>
        </div>
      </section>

      <section id="home-pride" data-scene className="ld-pride" aria-labelledby="home-cta-title">
        <LionDenHalo />
        <div className="ld-pride-content">
          <Crown />
          <span className="ld-eyebrow">THE STORY CONTINUES</span>
          <h2 id="home-cta-title">
            RUN WITH <span>THE PRIDE.</span>
          </h2>
          <p>
            Thirty years in and still writing. Read the history, run the catalog, and watch the new
            chapter unfold.
          </p>
          <Link className="ld-button" to="/bio">
            READ THE FULL STORY <Arrow />
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
