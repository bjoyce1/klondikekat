import { useEffect, useRef, useState } from "react";
import { LionDenWaveform } from "./LionDenMotifs";

const LIMIT = 60;
const time = (seconds: number) =>
  `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0")}:${Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0")}`;

export function BroadcastConsole({
  audioSrc,
  trackTitle,
}: {
  audioSrc: string;
  trackTitle: string;
}) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(LIMIT);
  const [error, setError] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const available = Boolean(audioSrc) && !error;
  useEffect(() => {
    const media = audio.current;
    return () => media?.pause();
  }, []);
  useEffect(() => {
    const media = audio.current;
    if (!media || !playing) return;
    // The media clock is authoritative; a short guard enforces the 60-second preview cap.
    const timer = window.setInterval(() => {
      if (media.currentTime >= duration) {
        media.pause();
        media.currentTime = duration;
        setElapsed(duration);
      }
    }, 50);
    return () => window.clearInterval(timer);
  }, [playing, duration]);
  const toggle = async () => {
    const media = audio.current;
    if (!media || !available) return;
    if (playing) media.pause();
    else {
      if (media.currentTime >= duration) media.currentTime = 0;
      try {
        await media.play();
      } catch {
        setPlaying(false);
        setError(true);
      }
    }
  };
  const onProgress = () => {
    const media = audio.current;
    if (!media) return;
    if (media.currentTime >= duration) {
      media.pause();
      media.currentTime = duration;
    }
    setElapsed(Math.min(duration, media.currentTime));
  };
  return (
    <div className={`ld-console ${playing ? "is-playing" : ""}`}>
      {["tl", "tr", "bl", "br"].map((p) => (
        <span className={`ld-screw ld-screw-${p}`} key={p} aria-hidden="true" />
      ))}
      {audioSrc && (
        <audio
          ref={audio}
          src={audioSrc}
          preload="metadata"
          onTimeUpdate={onProgress}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onError={() => {
            setError(true);
            setPlaying(false);
          }}
          onLoadedMetadata={() => {
            const media = audio.current;
            if (media) {
              media.volume = volume;
              setDuration(
                Number.isFinite(media.duration) ? Math.min(LIMIT, media.duration) : LIMIT,
              );
            }
          }}
        />
      )}
      <div className="ld-console-top">
        <span className="ld-engraving">LD–01 / BROADCAST RECEIVER</span>
        <span className="ld-console-status">
          <i className={playing ? "is-live" : ""} />
          {playing ? "ON AIR" : "STANDBY"}
        </span>
      </div>
      <div className="ld-console-face">
        <div className="ld-vu-pair" aria-hidden="true">
          {["L", "R"].map((side) => (
            <div className="ld-vu-meter" key={side}>
              <svg viewBox="0 0 230 120">
                <path d="M22 91Q114-12 208 91" fill="none" stroke="#665735" strokeWidth="1" />
                <path d="M156 50q29 9 47 33" fill="none" stroke="#9e3226" strokeWidth="4" />
                {Array.from({ length: 17 }, (_, i) => (
                  <path
                    key={i}
                    d="M115 21v9"
                    stroke={i > 12 ? "#9c3324" : "#4e452f"}
                    strokeWidth="1"
                    transform={`rotate(${-55 + i * 7} 115 137)`}
                  />
                ))}
                <text x="33" y="66">
                  −20
                </text>
                <text x="85" y="38">
                  −5
                </text>
                <text x="130" y="39">
                  0
                </text>
                <text x="175" y="63">
                  +3
                </text>
                <text x="104" y="85" fontSize="16">
                  VU
                </text>
                <g className={`ld-vu-needle ld-vu-needle-${side}`}>
                  <path d="M115 128 76 41" stroke="#70271c" strokeWidth="1.6" />
                </g>
              </svg>
              <span>{side} CHANNEL</span>
            </div>
          ))}
        </div>
        <div className="ld-console-signal">
          <div className="ld-signal-label">
            <span>THE LION’S DEN</span>
            <span>STEREO</span>
          </div>
          <LionDenWaveform />
          <div className="ld-signal-bottom">
            <span>
              {playing
                ? "PREVIEW IN PROGRESS"
                : available
                  ? "READY TO TRANSMIT"
                  : "SIGNAL COMING SOON"}
            </span>
            <span>01:00 MAX</span>
          </div>
        </div>
      </div>
      <div className="ld-console-controls">
        <button
          className="ld-play-button"
          type="button"
          onClick={toggle}
          disabled={!available}
          aria-label={
            playing
              ? "Pause music preview"
              : elapsed >= duration
                ? "Replay music preview"
                : "Play music preview"
          }
        >
          {playing ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 5h3v14H7ZM14 5h3v14h-3Z" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m8 5 11 7-11 7Z" fill="currentColor" />
            </svg>
          )}
        </button>
        <div className="ld-track">
          <div className="ld-track-name">
            <strong>{trackTitle}</strong>
            <span>
              {time(elapsed)} <b>/ {time(duration)}</b>
            </span>
          </div>
          <label className="ld-sr-only" htmlFor="ld-audio-progress">
            Preview playback position
          </label>
          <input
            id="ld-audio-progress"
            className="ld-progress"
            type="range"
            min="0"
            max={duration}
            step=".1"
            value={elapsed}
            disabled={!available}
            aria-valuetext={`${time(elapsed)} of ${time(duration)}`}
            onChange={(event) => {
              const next = Number(event.target.value);
              if (audio.current) {
                audio.current.currentTime = next;
                if (next >= duration) audio.current.pause();
              }
              setElapsed(next);
            }}
          />
        </div>
        <div className="ld-volume">
          <span
            className="ld-knob"
            aria-hidden="true"
            style={{ transform: `rotate(${-120 + volume * 240}deg)` }}
          />
          <label htmlFor="ld-volume">VOLUME</label>
          <input
            id="ld-volume"
            type="range"
            min="0"
            max="1"
            step=".05"
            value={volume}
            disabled={!available}
            onChange={(event) => {
              const value = Number(event.target.value);
              setVolume(value);
              if (audio.current) audio.current.volume = value;
            }}
          />
        </div>
      </div>
      <p className="ld-player-note" role="status">
        {error
          ? "The preview is unavailable right now. Please try again later."
          : available
            ? "60-second music-bed preview. Full podcast episodes are coming soon."
            : "The preview is coming soon. Stay tuned for the first transmission."}
      </p>
    </div>
  );
}
