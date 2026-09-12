import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDown,
  BookOpen,
  Gauge,
  Headphones,
  Lightbulb,
  Mic2,
  Pause,
  Play,
  Radio,
  Volume2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { images, newSingles } from "@/lib/site-data";

const PAGE_URL = "https://klondikekat.lovable.app/podcast";
const PREVIEW_LIMIT = 60;

const pillars = [
  {
    icon: Headphones,
    number: "01",
    title: "Music",
    copy: "Records, sessions and the stories behind a three-decade Houston catalog.",
  },
  {
    icon: Lightbulb,
    number: "02",
    title: "Wisdom",
    copy: "Real lessons on longevity, independence, craft and moving with purpose.",
  },
  {
    icon: Gauge,
    number: "03",
    title: "Horsepower",
    copy: "Car culture, performance and the machines that keep the city moving.",
  },
] as const;

const transmissions = [
  {
    number: "001",
    title: "The doors are opening",
    label: "Series trailer",
    copy: "The first transmission from The Lion’s Den is being tuned now.",
  },
  {
    number: "002",
    title: "Stories behind the records",
    label: "Coming soon",
    copy: "Studio stories, collaborators and the records that shaped the journey.",
  },
  {
    number: "003",
    title: "Built for the long road",
    label: "Coming soon",
    copy: "Independent game, hard-earned perspective and horsepower culture.",
  },
] as const;

export const Route = createFileRoute("/podcast")({
  head: () => ({
    meta: [
      { title: "The Lion’s Den Podcast | Klondike Kat" },
      {
        name: "description",
        content:
          "Enter The Lion’s Den Podcast with Klondike Kat for music, wisdom, Houston stories and horsepower culture.",
      },
      { property: "og:title", content: "The Lion’s Den Podcast | Klondike Kat" },
      {
        property: "og:description",
        content: "Music. Wisdom. Horsepower. A new podcast from Klondike Kat.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "PodcastSeries",
          name: "The Lion’s Den Podcast",
          description: "Music, wisdom and horsepower with Klondike Kat.",
          url: PAGE_URL,
          author: { "@type": "Person", name: "Klondike Kat" },
        }),
      },
    ],
  }),
  component: PodcastPage,
});

function PodcastPage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const featuredTrack = newSingles.find((single) => single.title === "Mob Manuscript: The Return");

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      if (audio.currentTime >= PREVIEW_LIMIT) {
        audio.pause();
        audio.currentTime = 0;
        setPlaying(false);
        setProgress(0);
        return;
      }
      setProgress((audio.currentTime / PREVIEW_LIMIT) * 100);
    };
    const onEnded = () => setPlaying(false);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePreview = async () => {
    const audio = audioRef.current;
    if (!audio || !featuredTrack?.audioUrl) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    await audio.play();
    setPlaying(true);
  };

  return (
    <>
      <section className="grain relative isolate min-h-[calc(100svh-3.5rem)] overflow-hidden border-b border-border bg-background sm:min-h-[46rem]">
        <img
          src={images.bioPortrait}
          alt="Klondike Kat, host of The Lion’s Den Podcast"
          className="absolute inset-0 -z-20 size-full object-cover object-[58%_center] opacity-45 sm:object-[72%_center] sm:opacity-55"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,var(--color-background)_0%,color-mix(in_oklch,var(--color-background)_88%,transparent)_42%,color-mix(in_oklch,var(--color-background)_28%,transparent)_78%,var(--color-background)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-2/5 bg-[linear-gradient(to_top,var(--color-background),transparent)]" />

        <div className="mx-auto grid min-h-[calc(100svh-3.5rem)] max-w-7xl content-end px-4 pt-24 pb-12 sm:min-h-[46rem] sm:grid-cols-[minmax(0,1fr)_18rem] sm:items-end sm:gap-12 sm:px-6 sm:pt-32 sm:pb-16 lg:grid-cols-[minmax(0,1fr)_24rem]">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 text-[0.65rem] font-bold tracking-[0.28em] text-primary uppercase sm:text-xs">
              <Radio className="size-4" aria-hidden="true" />
              A new transmission from Klondike Kat
            </div>
            <h1 className="mt-5 max-w-4xl text-[clamp(4rem,13vw,9.5rem)] leading-[0.78] sm:mt-7">
              <span className="block text-foreground">The Lion’s</span>
              <span className="block text-gold">Den</span>
              <span className="mt-3 block text-[0.34em] leading-none text-foreground">Podcast</span>
            </h1>
            <p className="mt-6 font-display text-lg tracking-[0.18em] text-primary uppercase sm:text-2xl">
              Music <span className="text-destructive">•</span> Wisdom{" "}
              <span className="text-destructive">•</span> Horsepower
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" className="min-h-12 rounded-sm px-6 font-bold tracking-[0.12em] uppercase">
                <a href="#listen">
                  <Headphones aria-hidden="true" />
                  Enter the Den
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-h-12 rounded-sm px-6 font-bold tracking-[0.12em] uppercase">
                <a href="#transmissions">
                  Latest transmissions
                  <ArrowDown aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>

          <div className="mt-10 border-l-2 border-destructive pl-4 sm:mt-0 sm:mb-2">
            <p className="text-[0.65rem] font-bold tracking-[0.2em] text-destructive uppercase">Signal status</p>
            <p className="mt-1 font-display text-2xl text-foreground">Pre-stage</p>
            <p className="mt-2 text-sm text-muted-foreground">The show is being tuned. First episode details coming soon.</p>
          </div>
        </div>
      </section>

      <section id="listen" className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-[1fr_1.5fr] lg:items-center">
          <Reveal>
            <p className="text-[0.65rem] font-bold tracking-[0.28em] text-primary uppercase sm:text-xs">Sound check</p>
            <h2 className="mt-3 text-4xl text-foreground sm:text-6xl">Hear the energy</h2>
            <p className="mt-4 max-w-md text-sm text-muted-foreground sm:text-base">
              A 60-second music-bed preview while the first full podcast transmission is prepared.
            </p>
          </Reveal>

          <Reveal index={1}>
            <div className="border border-primary/45 bg-background p-4 shadow-[var(--glow-gold)] sm:p-6">
              <audio ref={audioRef} src={featuredTrack?.audioUrl} preload="metadata" />
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  size="icon"
                  onClick={togglePreview}
                  disabled={!featuredTrack?.audioUrl}
                  aria-label={playing ? "Pause music preview" : "Play music preview"}
                  className="size-14 shrink-0 rounded-full"
                >
                  {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
                </Button>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-display text-xl text-foreground sm:text-2xl">Mob Manuscript: The Return</p>
                      <p className="text-xs font-bold tracking-[0.14em] text-muted-foreground uppercase">Featured music bed · 60 sec</p>
                    </div>
                    <Volume2 className="hidden size-5 shrink-0 text-primary sm:block" aria-hidden="true" />
                  </div>
                  <div className="mt-4 h-1 bg-surface-2" aria-hidden="true">
                    <div className="h-full bg-primary transition-[width] duration-100" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-24">
        <SectionHeading eyebrow="Inside the show" title="Three lanes. One voice." />
        <div className="mt-8 grid gap-px bg-border sm:mt-12 md:grid-cols-3">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.title} index={index} className="bg-background p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <Icon className="size-7 text-primary" aria-hidden="true" />
                  <span className="font-display text-3xl text-border">{pillar.number}</span>
                </div>
                <h3 className="mt-10 text-4xl text-foreground">{pillar.title}</h3>
                <p className="mt-4 text-sm text-muted-foreground sm:text-base">{pillar.copy}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section id="transmissions" className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-24">
          <SectionHeading eyebrow="From the control room" title="Upcoming transmissions" />
          <ol className="mt-8 divide-y divide-border border-y border-border sm:mt-12">
            {transmissions.map((item, index) => (
              <Reveal key={item.number} as="li" index={index} className="grid gap-3 py-6 sm:grid-cols-[5rem_minmax(0,1fr)_auto] sm:items-center sm:gap-6 sm:py-8">
                <span className="font-display text-3xl text-primary">{item.number}</span>
                <div>
                  <h3 className="text-2xl text-foreground sm:text-3xl">{item.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{item.copy}</p>
                </div>
                <span className="w-fit border border-border px-3 py-1 text-[0.65rem] font-bold tracking-[0.16em] text-muted-foreground uppercase">
                  {item.label}
                </span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <img src={images.studioSession} alt="Klondike Kat in the studio" loading="lazy" className="absolute inset-0 -z-20 size-full object-cover opacity-20" />
        <div className="absolute inset-0 -z-10 bg-background/85" />
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 sm:py-24">
          <Mic2 className="mx-auto size-9 text-primary" aria-hidden="true" />
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl text-foreground sm:text-7xl">The mic is warming up</h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">Episodes and listening destinations will be announced here. Until then, explore the catalog that built the voice behind the show.</p>
          <Button asChild variant="outline" size="lg" className="mt-7 min-h-12 rounded-sm px-6 font-bold tracking-[0.12em] uppercase">
            <Link to="/music">
              <BookOpen aria-hidden="true" />
              Explore the music
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}