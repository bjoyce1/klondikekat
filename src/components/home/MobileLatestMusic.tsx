import { Link } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";
import { mobManuscript, releases } from "@/lib/site-data";

const music = [
  { title: mobManuscript.title, image: mobManuscript.image },
  ...releases.slice(1, 4).map(({ title, image }) => ({ title, image })),
];

export function MobileLatestMusic() {
  return (
    <section className="hc-mobile-music" aria-labelledby="hc-mobile-music-title">
      <div className="hc-mobile-section-head">
        <h2 id="hc-mobile-music-title">Latest music</h2>
        <Link to="/music">
          View all <ArrowRight aria-hidden="true" />
        </Link>
      </div>
      <div className="hc-mobile-music-grid">
        {music.map((release) => (
          <Link key={release.title} to="/music" className="hc-mobile-release">
            <span className="hc-mobile-release-art">
              <img src={release.image} alt={`${release.title} cover artwork`} loading="lazy" />
              <span className="hc-mobile-play" aria-hidden="true">
                <Play />
              </span>
            </span>
            <strong>{release.title}</strong>
          </Link>
        ))}
      </div>
    </section>
  );
}