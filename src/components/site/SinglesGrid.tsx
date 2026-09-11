import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import type { NewSingle } from "@/lib/site-data";

const PREVIEW_SECONDS = 60;
export const SINGLE_PRICE = 1.29;

export function SinglesGrid({ singles }: { singles: NewSingle[] }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const active = singles.find((s) => s.title === activeTitle) ?? null;

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onTime = () => {
      if (el.currentTime >= PREVIEW_SECONDS) {
        el.pause();
        el.currentTime = 0;
        setPlaying(false);
        setProgress(0);
        return;
      }
      setProgress(Math.min(100, (el.currentTime / PREVIEW_SECONDS) * 100));
    };
    const onEnd = () => {
      setPlaying(false);
      setProgress(0);
    };
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("ended", onEnd);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("ended", onEnd);
    };
  }, [activeTitle]);

  function toggle(single: NewSingle) {
    const el = audioRef.current;
    if (!el || !single.audioUrl) return;
    if (activeTitle === single.title) {
      if (playing) {
        el.pause();
        setPlaying(false);
      } else {
        void el.play();
        setPlaying(true);
      }
      return;
    }
    setActiveTitle(single.title);
    setProgress(0);
    el.src = single.audioUrl;
    el.currentTime = 0;
    void el.play();
    setPlaying(true);
  }

  return (
    <>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-8 lg:grid-cols-4">
        {singles.map((s) => {
          const isActive = activeTitle === s.title;
          const isPlaying = isActive && playing;
          return (
            <article key={s.title} className="flex flex-col">
              <div className="grain media-zoom card-elevated relative rounded-sm">
                <img
                  src={s.image}
                  alt={`Cover art for the single ${s.title}`}
                  loading="lazy"
                  decoding="async"
                  className="aspect-square w-full object-cover"
                />
                {s.audioUrl && (
                  <>
                    <span className="absolute top-0 left-0 bg-primary px-2 py-0.5 font-display text-[10px] tracking-[0.2em] text-primary-foreground">
                      PREVIEW
                    </span>
                    <button
                      type="button"
                      onClick={() => toggle(s)}
                      aria-label={`${isPlaying ? "Pause" : "Play"} a 60 second preview of ${s.title}`}
                      className="focus-ring absolute inset-0 flex cursor-pointer items-end justify-start bg-gradient-to-t from-background/80 via-background/10 to-transparent p-2 sm:p-3"
                    >
                      <span
                        className={`inline-flex size-10 items-center justify-center rounded-full border-2 shadow-[0_0_20px_color-mix(in_oklch,var(--primary)_40%,transparent)] transition-all duration-300 hover:scale-105 sm:size-12 ${
                          isPlaying
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-primary bg-background/80 text-primary hover:bg-primary hover:text-primary-foreground"
                        }`}
                      >
                        {isPlaying ? (
                          <Pause className="size-4 sm:size-5" aria-hidden="true" />
                        ) : (
                          <Play className="size-4 translate-x-[1px] sm:size-5" aria-hidden="true" />
                        )}
                      </span>
                    </button>
                  </>
                )}
              </div>
              <h3 className="mt-3 text-base leading-tight text-foreground sm:mt-4 sm:text-2xl">
                {s.title}
              </h3>
              {s.credit && (
                <p className="mt-1 text-[0.65rem] font-bold tracking-[0.14em] text-primary uppercase sm:text-xs">
                  {s.credit}
                </p>
              )}
              {s.audioUrl ? (
                <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
                  ${SINGLE_PRICE.toFixed(2)} download
                  <span className="text-muted-foreground/70"> · 60 sec preview</span>
                </p>
              ) : (
                <p className="mt-2 text-xs text-muted-foreground sm:text-sm">Coming soon</p>
              )}
            </article>
          );
        })}
      </div>

      <audio ref={audioRef} preload="none" className="hidden" />

      {active && (
        <div
          className="fixed inset-x-0 bottom-16 z-50 border-t-2 border-primary/60 bg-background/95 shadow-[0_10px_40px_rgba(0,0,0,0.9)] backdrop-blur sm:bottom-0"
          role="region"
          aria-label="Preview player"
        >
          {/* Glowing progress line pinned to the top edge, with position tick */}
          <div className="absolute inset-x-0 top-[-2px] h-[3px] bg-border/60">
            <div
              className="h-full bg-primary shadow-[0_0_10px_color-mix(in_oklch,var(--primary)_70%,transparent)] transition-[width] duration-200"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 h-3 w-1 -translate-y-1/2 bg-primary transition-[left] duration-200"
              style={{ left: `${progress}%` }}
            />
          </div>

          <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 sm:gap-6 sm:px-6 sm:py-3">
            <img
              src={active.image}
              alt=""
              className="size-10 shrink-0 rounded-[1px] border border-primary/25 object-cover sm:size-12"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-lg leading-none tracking-wide text-primary uppercase sm:text-2xl">
                {active.title}
              </p>
              <p className="mt-1 truncate text-[9px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                {active.credit ?? "Klondike Kat"} · Single preview
              </p>
            </div>

            <div className="hidden text-right leading-none sm:block">
              <p className="font-display text-lg text-primary">${SINGLE_PRICE.toFixed(2)}</p>
              <p className="mt-0.5 text-[8px] font-bold tracking-tighter text-muted-foreground uppercase">
                Digital single
              </p>
            </div>

            <button
              type="button"
              onClick={() => toggle(active)}
              aria-label={playing ? "Pause preview" : "Play preview"}
              className={`focus-ring inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 transition-all duration-300 sm:size-11 ${
                playing
                  ? "border-primary bg-primary text-primary-foreground shadow-[0_0_20px_color-mix(in_oklch,var(--primary)_50%,transparent)]"
                  : "border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              {playing ? (
                <Pause className="size-4" aria-hidden="true" />
              ) : (
                <Play className="size-4 translate-x-[1px]" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
