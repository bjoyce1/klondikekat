import { ExternalLink } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { VideoItem } from "@/lib/site-data";
import { images } from "@/lib/site-data";

const YT_SEARCH = "https://www.youtube.com/results?search_query=Klondike+Kat";

export function VisualArchive({ videos }: { videos: VideoItem[] }) {
  const rest = videos.slice(1);

  return (
    <section className="video-archive" aria-labelledby="archive-title">
      <p className="video-section-eyebrow">
        <span className="video-hero-eyebrow-line" aria-hidden="true" />
        The Archive
      </p>
      <h2 id="archive-title" className="video-archive-title">More reels are logged as they land</h2>

      {rest.length > 0 && (
        <div className="video-archive-grid">
          {rest.map((v) => (
            <a
              key={v.title}
              href={YT_SEARCH}
              target="_blank"
              rel="noopener noreferrer"
              className="video-archive-card card-elevated hover-lift"
            >
              <div className="video-archive-thumb grain">
                <img
                  src={v.image}
                  alt={`Still from the video ${v.title}`}
                  loading="lazy"
                  decoding="async"
                  className="video-archive-thumb-img"
                />
                <span className="video-archive-play" aria-hidden="true">
                  <span className="video-transport-ring video-transport-ring--sm" />
                </span>
              </div>
              <div className="video-archive-card-copy">
                <h3>{v.title}</h3>
                <p>{v.description}</p>
              </div>
            </a>
          ))}
        </div>
      )}

      <article className="video-boards card-elevated">
        <div className="video-boards-media media-zoom grain">
          <img
            src={images.studioSession}
            alt="Klondike Kat during a studio session"
            loading="lazy"
            decoding="async"
            className="video-boards-img"
          />
          <span className="video-boards-tag">Photography — Not a Video</span>
        </div>
        <div className="video-boards-copy">
          <h3>Behind the Boards</h3>
          <p>Photography from the Ties That Bind Us sessions — a still frame, not a playable clip.</p>
        </div>
      </article>

      <div className="video-onward">
        <p>The visuals are the trailer. The catalog is the feature.</p>
        <Link to="/music" className="video-onward-cta link-sweep">
          Hear the Music
          <ExternalLink className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
