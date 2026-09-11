import { useEffect, useRef, useState } from "react";
import { Disc3, Download, ExternalLink, Pause, Play } from "lucide-react";
import { diamondDre } from "@/lib/site-data";
import { formatPrice } from "@/components/site/ProductCard";

const PREVIEW_SECONDS = 60;

export function DiamondDreBundle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const active = diamondDre.tracks.find((t) => t.title === activeTitle) ?? null;

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

  function toggle(track: { title: string; audioUrl?: string }) {
    const el = audioRef.current;
    if (!el || !track.audioUrl) return;
    if (activeTitle === track.title) {
      if (playing) {
        el.pause();
        setPlaying(false);
      } else {
        void el.play();
        setPlaying(true);
      }
      return;
    }
    setActiveTitle(track.title);
    setProgress(0);
    el.src = track.audioUrl;
    el.currentTime = 0;
    void el.play();
    setPlaying(true);
  }

  const buyClass =
    "tap-none inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-sm px-5 text-xs font-bold tracking-[0.12em] uppercase transition-colors duration-200 sm:text-sm";

  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-14">
        <div className="grain media-zoom card-elevated h-fit rounded-sm">
          <img
            src={diamondDre.image}
            alt={`Cover artwork for ${diamondDre.title}`}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-xs font-bold tracking-[0.3em] text-primary uppercase">
            Album · Bundle
          </p>
          <h1 className="mt-3 text-3xl sm:text-6xl">
            <span className="text-gold">{diamondDre.title}</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
            {diamondDre.blurb}
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <div className="card-elevated flex flex-col rounded-sm border border-primary/30 p-4">
              <Disc3 className="size-5 text-primary" aria-hidden="true" />
              <p className="mt-3 text-xs font-bold tracking-[0.16em] text-muted-foreground uppercase">
                Physical CD
              </p>
              <p className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-2xl text-primary">
                  {formatPrice(diamondDre.cdPrice)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(diamondDre.cdCompareAt)}
                </span>
              </p>
              <a
                href={diamondDre.cdUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${buyClass} mt-4 bg-primary text-primary-foreground hover:bg-primary/85`}
              >
                Buy CD
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </div>

            <div className="card-elevated flex flex-col rounded-sm border border-border p-4">
              <Download className="size-5 text-primary" aria-hidden="true" />
              <p className="mt-3 text-xs font-bold tracking-[0.16em] text-muted-foreground uppercase">
                Full album download
              </p>
              <p className="mt-1 font-display text-2xl text-primary">
                {formatPrice(diamondDre.albumPrice)}
              </p>
              <a
                href={diamondDre.albumUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${buyClass} mt-4 border border-primary text-primary hover:bg-primary hover:text-primary-foreground`}
              >
                Download
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </div>

            <div className="card-elevated flex flex-col rounded-sm border border-border p-4">
              <Play className="size-5 text-primary" aria-hidden="true" />
              <p className="mt-3 text-xs font-bold tracking-[0.16em] text-muted-foreground uppercase">
                Individual songs
              </p>
              <p className="mt-1 font-display text-2xl text-primary">
                {formatPrice(diamondDre.singlePrice)}
                <span className="ml-1 font-sans text-xs text-muted-foreground">each</span>
              </p>
              <a
                href="#tracklist"
                className={`${buyClass} mt-4 border border-border text-foreground hover:border-primary hover:text-primary`}
              >
                See tracklist
              </a>
            </div>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Checkout is handled on the secure Klondike Kat store.
          </p>
        </div>
      </section>

      <section id="tracklist" className="mx-auto max-w-7xl px-4 pb-32 sm:px-6 sm:pb-24">
        <h2 className="text-2xl sm:text-4xl">
          <span className="text-gold">Tracklist</span>
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Buy any song on its own for {formatPrice(diamondDre.singlePrice)}, or take the whole
          project above.
        </p>

        <ul className="mt-5 divide-y divide-border border-y border-border sm:mt-8">
          {diamondDre.tracks.map((t, i) => {
            const isPlaying = activeTitle === t.title && playing;
            return (
              <li
                key={t.title}
                className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 py-3 sm:gap-x-5 sm:py-4"
              >
                <span className="font-display text-xl text-primary sm:text-2xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold text-foreground sm:text-lg">
                    {t.title}
                  </p>
                  {!t.audioUrl && (
                    <p className="mt-0.5 text-[0.65rem] font-bold tracking-[0.14em] text-muted-foreground uppercase">
                      Preview coming soon
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {t.audioUrl && (
                    <button
                      type="button"
                      onClick={() => toggle(t)}
                      aria-label={`${isPlaying ? "Pause" : "Play"} a 60 second preview of ${t.title}`}
                      className={`focus-ring inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-primary transition-all duration-300 ${
                        isPlaying
                          ? "bg-primary text-primary-foreground shadow-[0_0_20px_color-mix(in_oklch,var(--primary)_50%,transparent)]"
                          : "bg-transparent text-primary hover:bg-primary hover:text-primary-foreground"
                      }`}
                    >
                      {isPlaying ? (
                        <Pause className="size-4" aria-hidden="true" />
                      ) : (
                        <Play className="size-4 translate-x-[1px]" aria-hidden="true" />
                      )}
                    </button>
                  )}
                  <span className="font-display text-lg whitespace-nowrap text-primary sm:text-xl">
                    {formatPrice(diamondDre.singlePrice)}
                  </span>
                </div>
                <a
                  href={t.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap-none col-start-2 col-end-4 inline-flex min-h-10 w-fit cursor-pointer items-center gap-2 rounded-full border border-border px-4 text-[0.7rem] font-bold tracking-[0.14em] uppercase text-foreground transition-colors duration-200 hover:border-primary hover:text-primary sm:col-auto sm:min-h-11 sm:rounded-sm sm:text-xs"
                >
                  Buy song
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      <audio ref={audioRef} preload="none" className="hidden" />

      {active && (
        <div
          className="fixed inset-x-0 bottom-16 z-50 border-t-2 border-primary/60 bg-background/95 shadow-[0_10px_40px_rgba(0,0,0,0.9)] backdrop-blur sm:bottom-0"
          role="region"
          aria-label="Preview player"
        >
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
              src={diamondDre.image}
              alt=""
              className="size-10 shrink-0 rounded-[1px] border border-primary/25 object-cover sm:size-12"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-lg leading-none tracking-wide text-primary uppercase sm:text-2xl">
                {active.title}
              </p>
              <p className="mt-1 truncate text-[9px] font-bold tracking-[0.15em] text-muted-foreground uppercase">
                Diamond Dre · Single preview
              </p>
            </div>
            <button
              type="button"
              onClick={() => toggle(active)}
              aria-label={playing ? "Pause preview" : "Play preview"}
              className={`focus-ring inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-primary transition-all duration-300 sm:size-11 ${
                playing
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_color-mix(in_oklch,var(--primary)_50%,transparent)]"
                  : "bg-transparent text-primary hover:bg-primary hover:text-primary-foreground"
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
