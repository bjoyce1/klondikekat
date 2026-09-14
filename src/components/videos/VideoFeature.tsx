import { ExternalLink, Play } from "lucide-react";
import type { VideoItem } from "@/lib/site-data";

const YT_SEARCH = "https://www.youtube.com/results?search_query=Klondike+Kat";

export function VideoFeature({ video }: { video: VideoItem }) {
  return (
    <section className="video-feature" aria-labelledby="feature-title">
      <p className="video-section-eyebrow">
        <span className="video-hero-eyebrow-line" aria-hidden="true" />
        Now Screening
      </p>

      <div className="video-feature-grid">
        <a
          href={YT_SEARCH}
          target="_blank"
          rel="noopener noreferrer"
          className="video-feature-frame grain"
          aria-label={`Find Klondike Kat on YouTube — search results for "${video.title}"`}
        >
          <img
            src={video.image}
            alt={`Still from the video ${video.title}`}
            loading="eager"
            decoding="async"
            className="video-feature-img"
          />
          <span className="video-feature-scanlines" aria-hidden="true" />

          <span className="video-feature-frameline video-feature-frameline--top" aria-hidden="true">
            <span className="video-tally">
              <span className="video-tally-dot" aria-hidden="true" />
              REC
            </span>
            <span className="video-feature-ratio">16:9</span>
          </span>

          <span className="video-transport" aria-hidden="true">
            <span className="video-transport-ring">
              <Play className="video-transport-icon" aria-hidden="true" />
            </span>
          </span>

          <span className="video-feature-frameline video-feature-frameline--bottom" aria-hidden="true">
            <span>00:00:00</span>
            <span>MAIN EDIT</span>
            <span>00:03:XX</span>
          </span>
        </a>

        <div className="video-feature-copy">
          <h2 id="feature-title" className="video-feature-title">
            {video.title}
          </h2>
          <p className="video-feature-desc">{video.description}</p>

          <a
            href={YT_SEARCH}
            target="_blank"
            rel="noopener noreferrer"
            className="video-feature-cta link-sweep"
          >
            Find on YouTube
            <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>
          <p className="video-feature-note">
            View Klondike Kat on YouTube — this link opens a search for the artist, not a direct
            embed of this video.
          </p>
        </div>
      </div>
    </section>
  );
}
