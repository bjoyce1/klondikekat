import { Pause, Play, RotateCcw, X } from "lucide-react";
import type { NewSingle } from "@/lib/site-data";
import { SINGLE_PRICE, previewTime } from "@/lib/music-catalog";

type DockProps = {
  active: NewSingle;
  playing: boolean;
  pending: boolean;
  error: boolean;
  elapsed: number;
  duration: number;
  onToggle: () => void;
  onSeek: (value: number) => void;
  onClose: () => void;
};

export function ListeningDock({
  active,
  playing,
  pending,
  error,
  elapsed,
  duration,
  onToggle,
  onSeek,
  onClose,
}: DockProps) {
  const ended = elapsed >= duration;
  const status = error
    ? "PREVIEW UNAVAILABLE — TRY AGAIN"
    : pending
      ? "TUNING IN…"
      : playing
        ? "NOW PLAYING"
        : ended
          ? "PREVIEW COMPLETE"
          : "PAUSED";
  return (
    <section className={`mv-dock ${playing ? "is-playing" : ""}`} aria-label="Music preview player">
      <div
        className="mv-dock-progress"
        role="progressbar"
        aria-label={`${active.title} preview progress`}
        aria-valuemin={0}
        aria-valuemax={duration}
        aria-valuenow={Number(elapsed.toFixed(1))}
        aria-valuetext={`${previewTime(elapsed)} of ${previewTime(duration)}`}
      >
        <i style={{ width: `${(elapsed / duration) * 100}%` }} />
      </div>
      <img className="mv-dock-cover" src={active.image} alt="" width="64" height="64" />
      <div className="mv-dock-track">
        <p className="mv-dock-status" role="status">
          <i aria-hidden="true" />
          {status}
        </p>
        <strong>{active.title}</strong>
        <span>
          {active.credit ?? "Klondike Kat"}
          <span className="mv-dock-compact-price"> · ${SINGLE_PRICE.toFixed(2)} DIGITAL</span>
        </span>
      </div>
      <div className="mv-dock-transport">
        <label htmlFor="music-preview-position">
          <span>60-SECOND PREVIEW</span>
          <span>
            {previewTime(elapsed)} <b>/ {previewTime(duration)}</b>
          </span>
        </label>
        <input
          id="music-preview-position"
          type="range"
          min="0"
          max={duration}
          step="0.1"
          value={elapsed}
          aria-label="Seek within the music preview"
          aria-valuetext={previewTime(elapsed)}
          disabled={error || pending}
          onChange={(event) => onSeek(Number(event.target.value))}
        />
      </div>
      <div className="mv-dock-price">
        <strong>${SINGLE_PRICE.toFixed(2)}</strong>
        <span>DIGITAL SINGLE</span>
      </div>
      <button
        className="mv-dock-play"
        type="button"
        onClick={onToggle}
        aria-label={
          error
            ? "Retry preview"
            : pending
              ? "Cancel loading preview"
              : playing
                ? "Pause preview"
                : ended
                  ? "Replay preview"
                  : "Play preview"
        }
      >
        {error || ended ? (
          <RotateCcw size={19} aria-hidden="true" />
        ) : playing || pending ? (
          <Pause size={19} aria-hidden="true" />
        ) : (
          <Play size={19} aria-hidden="true" />
        )}
      </button>
      <button
        className="mv-dock-close"
        type="button"
        onClick={onClose}
        aria-label="Close preview player"
      >
        <X size={18} aria-hidden="true" />
      </button>
    </section>
  );
}
