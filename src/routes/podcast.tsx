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
  Volume2,
} from "lucide-react";
import podcastArtwork from "@/assets/lions-den-podcast.jpg.asset.json";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Gear, Motorcycle, RacingLights, Waveform } from "@/components/site/PodcastMachinery";
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
  const heroRef = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(heroProgress, [0, 1], [1, reduce ? 1 : 1.1]);
  const heroY = useTransform(heroProgress, [0, 1], [0, reduce ? 0 : 90]);
  const heroOpacity = useTransform(heroProgress, [0, 0.84], [1, 0.2]);
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
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  return (
    <div className="podcast-page overflow-clip bg-background">
      <section ref={heroRef} className="grain relative min-h-[calc(100svh-3.5rem)] overflow-hidden border-b border-primary/25 bg-background sm:min-h-[calc(100svh-4rem)]">
        <h1 className="sr-only">The Lion’s Den Podcast</h1>
        <motion.div style={{ scale: heroScale, y: heroY, opacity: heroOpacity }} className="absolute inset-0 flex items-start justify-center sm:items-center">
          <img
            src={podcastArtwork.url}
            alt="The Lion’s Den Podcast artwork featuring a roaring lion, vintage microphone, drag racing lights and a black muscle car"
            className="h-auto w-full object-contain sm:h-full sm:w-full"
          />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/5 via-transparent to-background" />
        <motion.div
          aria-hidden="true"
          className="absolute top-[23%] left-1/2 h-16 w-48 -translate-x-1/2 bg-ember/15 blur-2xl"
          animate={reduce ? false : { opacity: [0.15, 0.48, 0.15], scale: [0.88, 1.08, 0.88] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <div className="absolute inset-x-0 bottom-20 z-10 flex flex-col items-center gap-2 text-center sm:bottom-8">
          <span className="text-[0.65rem] font-bold tracking-[0.28em] text-primary uppercase">Scroll to enter</span>
          <motion.div animate={reduce ? false : { y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
            <ArrowDown className="size-5 text-primary" aria-hidden="true" />
          </motion.div>
        </div>
      </section>

      <section className="relative isolate border-b border-border bg-background py-16 sm:py-28 lg:py-36">
        <Gear className="absolute -top-16 -left-20 -z-10 size-64 text-primary/10 sm:size-96" duration={24} />
        <Gear className="absolute -right-14 bottom-0 -z-10 size-44 text-ember/10 sm:size-72" reverse duration={18} />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div initial={reduce ? false : { opacity: 0, x: -48 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
            <p className="text-xs font-bold tracking-[0.3em] text-primary uppercase">Inside the den</p>
            <h2 className="mt-5 max-w-xl font-podcast text-5xl normal-case text-gold sm:text-7xl lg:text-8xl">Three lanes.<br />One voice.</h2>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-xl">
              Music, hard-earned wisdom and horsepower culture—broadcast from Houston with Klondike Kat behind the mic.
            </p>
          </motion.div>
          <div className="grid gap-px bg-border md:grid-cols-3 lg:grid-cols-1">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.article key={pillar.title} initial={reduce ? false : { opacity: 0, x: 48 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.65, delay: index * 0.1 }} className="group grid bg-surface p-6 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-6 sm:p-7">
                <Icon className="size-7 text-primary" aria-hidden="true" />
                <div>
                  <h3 className="mt-5 font-podcast text-4xl normal-case text-foreground sm:mt-0">{pillar.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground sm:text-base">{pillar.copy}</p>
                </div>
                <span className="mt-6 font-display text-4xl text-primary/25 sm:mt-0">{pillar.number}</span>
              </motion.article>
            );
          })}
          </div>
        </div>
      </section>

      <section id="listen" className="relative border-b border-border bg-surface py-16 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <motion.div initial={reduce ? false : { opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-bold tracking-[0.3em] text-primary uppercase">Sound check</p>
              <h2 className="mt-4 font-podcast text-5xl normal-case text-foreground sm:text-7xl">Hear the engine turn over.</h2>
              <p className="mt-5 max-w-md text-muted-foreground">A 60-second music-bed preview while the first full podcast transmission is prepared.</p>
            </motion.div>
            <motion.div initial={reduce ? false : { opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 }} className="relative border border-primary/45 bg-background p-5 shadow-[var(--glow-gold)] sm:p-8">
              <audio ref={audioRef} src={featuredTrack?.audioUrl} preload="metadata" />
              <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
                <span className="text-xs font-bold tracking-[0.24em] text-primary uppercase">Control room · live preview</span>
                <Volume2 className="size-5 text-primary" aria-hidden="true" />
              </div>
              <div className="flex items-center gap-4 sm:gap-6">
                <Button type="button" size="icon" onClick={togglePreview} disabled={!featuredTrack?.audioUrl} aria-label={playing ? "Pause music preview" : "Play music preview"} className="size-16 shrink-0 rounded-full border border-primary/50">
                  {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
                </Button>
                <div className="min-w-0 flex-1">
                  <p className="font-podcast text-xl leading-tight normal-case text-foreground sm:text-4xl">Mob Manuscript: The Return</p>
                  <p className="mt-1 text-[0.65rem] font-bold tracking-[0.16em] text-muted-foreground uppercase">Featured music bed · 60 sec</p>
                  <div className="mt-5 h-1 bg-surface-2" aria-hidden="true">
                    <div className="h-full bg-primary transition-[width] duration-100" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </div>
              <Waveform className="mt-4 opacity-50" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative min-h-[42rem] overflow-hidden border-b border-border bg-background sm:min-h-[52rem]">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/40 to-background" />
        <div className="absolute top-12 left-[7%] text-primary/20"><Gear className="size-40 sm:size-72" duration={20} /></div>
        <div className="absolute top-32 left-[27%] text-primary/10"><Gear className="size-28 sm:size-48" reverse duration={14} /></div>
        <div className="absolute top-12 right-[8%]"><RacingLights /></div>
        <motion.div initial={reduce ? false : { x: "-25%" }} whileInView={{ x: "4%" }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-x-0 bottom-8 text-primary/70 sm:bottom-0">
          <Motorcycle className="w-[34rem] max-w-[92vw]" />
        </motion.div>
        <div className="relative z-10 mx-auto flex min-h-[42rem] max-w-7xl items-center justify-end px-4 py-20 sm:min-h-[52rem] sm:px-6">
          <motion.div initial={reduce ? false : { opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.45 }} className="max-w-xl border-l-4 border-ember bg-background/80 p-6 backdrop-blur-sm sm:p-10">
            <p className="text-xs font-bold tracking-[0.3em] text-ember uppercase">Horsepower chapter</p>
            <h2 className="mt-5 font-podcast text-5xl normal-case text-gold sm:text-7xl">Built for the long road.</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">Machines, movement and the culture around them. Every mechanical detail turns with the story, not over it.</p>
          </motion.div>
        </div>
      </section>

      <section id="transmissions" className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-28">
          <p className="text-xs font-bold tracking-[0.3em] text-primary uppercase">From the control room</p>
          <h2 className="mt-4 font-podcast text-5xl normal-case text-gold sm:text-7xl">Upcoming transmissions</h2>
          <ol className="mt-10 divide-y divide-border border-y border-border sm:mt-14">
            {transmissions.map((item, index) => (
              <motion.li key={item.number} initial={reduce ? false : { opacity: 0, x: index % 2 ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.6 }} className="group grid gap-3 py-7 sm:grid-cols-[5rem_minmax(0,1fr)_auto] sm:items-center sm:gap-6 sm:py-9">
                <span className="font-display text-3xl text-primary">{item.number}</span>
                <div>
                  <h3 className="font-podcast text-3xl normal-case text-foreground transition-colors group-hover:text-primary sm:text-4xl">{item.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{item.copy}</p>
                </div>
                <span className="w-fit border border-border px-3 py-1 text-[0.65rem] font-bold tracking-[0.16em] text-muted-foreground uppercase">
                  {item.label}
                </span>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="grain relative isolate overflow-hidden py-20 sm:py-36">
        <motion.img initial={reduce ? false : { scale: 1.08 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.4 }} src={images.studioSession} alt="Klondike Kat in the studio" loading="lazy" className="absolute inset-0 -z-20 size-full object-cover opacity-25" />
        <div className="absolute inset-0 -z-10 bg-background/80" />
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <Mic2 className="mx-auto size-9 text-primary" aria-hidden="true" />
          <h2 className="mx-auto mt-6 max-w-3xl font-podcast text-5xl normal-case text-gold sm:text-8xl">Join the pride.</h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">Episodes and listening destinations will be announced here. Until then, explore the catalog that built the voice behind the show.</p>
          <Button asChild variant="outline" size="lg" className="mt-7 min-h-12 rounded-sm px-6 font-bold tracking-[0.12em] uppercase">
            <Link to="/music">
              <BookOpen aria-hidden="true" />
              Explore the music
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}