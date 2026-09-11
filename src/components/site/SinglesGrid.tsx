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
                  <button
                    type="button"
                    onClick={() => toggle(s)}
                    aria-label={`${isPlaying ? "Pause" : "Play"} a 60 second preview of ${s.title}`}
                    className="focus-ring absolute inset-0 flex cursor-pointer items-end justify-start bg-gradient-to-t from-background/80 via-background/10 to-transparent p-2 sm:p-3"
                  >
                    <span className="inline-flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-200 hover:scale-105 sm:size-12">
                      {isPlaying ? (
                        <Pause className="size-4 sm:size-5" aria-hidden="true" />
                      ) : (
                        <Play className="size-4 translate-x-[1px] sm:size-5" aria-hidden="true" />
                      )}
                    </span>
                  </button>
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
          className="fixed inset-x-0 bottom-16 z-50 border-t border-border bg-background/95 backdrop-blur sm:bottom-0"
          role="region"
          aria-label="Preview player"
        >
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 sm:px-6 sm:py-3">
            <img
              src={active.image}
              alt=""
              className="size-10 rounded-sm object-cover sm:size-12"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-foreground">{active.title}</p>
              <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-border">
                <div
                  className="h-full bg-primary transition-[width] duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggle(active)}
              aria-label={playing ? "Pause preview" : "Play preview"}
              className="focus-ring inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground"
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
