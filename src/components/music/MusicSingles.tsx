import { useLayoutEffect, useRef } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import type { NewSingle } from "@/lib/site-data";
import { SINGLE_PRICE } from "@/lib/music-catalog";
import { useMusicPreview } from "@/hooks/useMusicPreview";
import { ListeningDock } from "./ListeningDock";
import { SectionMark } from "./MusicDetails";

export function MusicSingles({ singles }: { singles: NewSingle[] }) {
  const player = useMusicPreview();
  const trigger = useRef<HTMLButtonElement | null>(null);
  const section = useRef<HTMLElement>(null);
  // Reserve space within Music while the fixed transport is present.
  useLayoutEffect(() => {
    const page = section.current?.closest(".mv-page");
    page?.toggleAttribute("data-player-open", Boolean(player.active));
    return () => page?.removeAttribute("data-player-open");
  }, [player.active]);
  return (
    <section
      ref={section}
      className="mv-singles mv-section"
      id="music-singles"
      aria-labelledby="singles-title"
    >
      <SectionMark number="03">NEW SINGLES / THE NEXT CHAPTER</SectionMark>
      <div className="mv-section-heading">
        <h2 id="singles-title">
          NEW
          <br />
          <span>SINGLES.</span>
          <i className="mv-signal-led" aria-hidden="true" />
        </h2>
        <div>
          <p>
            The catalog keeps moving.
            <br />
            Tap a cover. Find your next record.
          </p>
          <p className="mv-singles-note">
            60-second previews · ${SINGLE_PRICE.toFixed(2)} digital singles
            <br />
            Downloads coming soon.
          </p>
        </div>
      </div>
      <div className="mv-singles-grid">
        {singles.map((single, index) => {
          const active = player.active?.title === single.title;
          const playing = active && player.playing;
          const pending = active && player.pending;
          const failed = active && player.error;
          return (
            <article
              key={single.title}
              className={`mv-single ${active ? "is-active" : ""}`}
              data-reveal
            >
              <div className="mv-single-art">
                <img
                  src={single.image}
                  alt={`Cover art for ${single.title}`}
                  width="500"
                  height="500"
                  loading="lazy"
                  decoding="async"
                />
                {single.audioUrl && (
                  <button
                    type="button"
                    onClick={(event) => {
                      trigger.current = event.currentTarget;
                      void player.toggle(single);
                    }}
                    aria-label={`${playing ? "Pause" : pending ? "Cancel" : failed ? "Retry" : "Play"} a 60 second preview of ${single.title}`}
                    aria-pressed={active && (playing || pending)}
                  >
                    <span className="mv-cover-control">
                      {failed ? (
                        <RotateCcw size={14} aria-hidden="true" />
                      ) : playing || pending ? (
                        <Pause size={14} aria-hidden="true" />
                      ) : (
                        <Play size={14} aria-hidden="true" />
                      )}
                      <span>
                        {failed ? "RETRY" : pending ? "LOADING" : playing ? "PAUSE" : "PLAY"}
                      </span>
                      <small>01:00</small>
                    </span>
                  </button>
                )}
                {active && (
                  <span className="mv-single-progress" aria-hidden="true">
                    <i style={{ width: `${(player.elapsed / player.duration) * 100}%` }} />
                  </span>
                )}
              </div>
              <div className="mv-single-meta">
                <span>
                  <i className={playing ? "is-playing" : ""} aria-hidden="true" />
                  {single.audioUrl ? "DIGITAL SINGLE" : "PREVIEW COMING SOON"}
                </span>
                <small>{String(index + 1).padStart(2, "0")}</small>
              </div>
              <h3>{single.title}</h3>
              <p className="mv-single-credit">{single.credit ?? "Klondike Kat"}</p>
              <p className="mv-single-price">
                ${SINGLE_PRICE.toFixed(2)} <span>DOWNLOAD · COMING SOON</span>
              </p>
            </article>
          );
        })}
      </div>
      <audio ref={player.audioRef} preload="none" hidden />
      {player.active && (
        <ListeningDock
          active={player.active}
          playing={player.playing}
          pending={player.pending}
          error={player.error}
          elapsed={player.elapsed}
          duration={player.duration}
          onToggle={() => {
            if (player.active) void player.toggle(player.active);
          }}
          onSeek={player.seek}
          onClose={() => {
            player.close();
            trigger.current?.focus({ preventScroll: true });
          }}
        />
      )}
    </section>
  );
}
