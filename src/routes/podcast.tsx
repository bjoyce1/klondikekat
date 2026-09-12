import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, BookOpen, Gauge, Headphones, Lightbulb, Mic2, Pause, Play, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import podcastArtwork from "@/assets/lions-den-podcast.jpg.asset.json";
import { DragTree, Gear, Motorcycle, VuMeter, Waveform } from "@/components/site/PodcastMachinery";
import { Button } from "@/components/ui/button";
import { images, newSingles } from "@/lib/site-data";

const PAGE_URL = "https://klondikekat.lovable.app/podcast";
const PREVIEW_LIMIT = 60;

const pillars = [
  { icon: Headphones, number: "01", title: "Music", copy: "Records, sessions and the stories behind a three-decade Houston catalog." },
  { icon: Lightbulb, number: "02", title: "Wisdom", copy: "Real lessons on longevity, independence, craft and moving with purpose." },
  { icon: Gauge, number: "03", title: "Horsepower", copy: "Car culture, performance and the machines that keep the city moving." },
] as const;

const transmissions = [
  { number: "001", title: "The doors are opening", label: "Series trailer", copy: "The first transmission from The Lion’s Den is being tuned now." },
  { number: "002", title: "Stories behind the records", label: "Coming soon", copy: "Studio stories, collaborators and the records that shaped the journey." },
  { number: "003", title: "Built for the long road", label: "Coming soon", copy: "Independent game, hard-earned perspective and horsepower culture." },
] as const;

export const Route = createFileRoute("/podcast")({
  head: () => ({
    meta: [
      { title: "The Lion’s Den Podcast | Klondike Kat" },
      { name: "description", content: "Enter The Lion’s Den Podcast with Klondike Kat for music, wisdom, Houston stories and horsepower culture." },
      { property: "og:title", content: "The Lion’s Den Podcast | Klondike Kat" },
      { property: "og:description", content: "Music. Wisdom. Horsepower. A new podcast from Klondike Kat." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "PodcastSeries",
        name: "The Lion’s Den Podcast",
        description: "Music, wisdom and horsepower with Klondike Kat.",
        url: PAGE_URL,
        author: { "@type": "Person", name: "Klondike Kat" },
      }),
    }],
  }),
  component: PodcastPage,
});

function PodcastPage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const horsepowerRef = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  const reduce = hydrated && Boolean(prefersReducedMotion);
  const horsepowerActive = useInView(horsepowerRef, { amount: 0.28 });
  const { scrollYProgress: pageProgress } = useScroll();
  const smoothPageProgress = useSpring(pageProgress, { stiffness: 100, damping: 24, mass: 0.3 });
  const gaugeNeedle = useTransform(smoothPageProgress, [0, 1], [-112, 112]);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(heroProgress, [0, 1], [1, reduce ? 1 : 1.16]);
  const heroY = useTransform(heroProgress, [0, 1], [0, reduce ? 0 : 110]);
  const heroOpacity = useTransform(heroProgress, [0.55, 0.96], [1, 0.12]);
  const heroLine = useTransform(heroProgress, [0, 0.78], [0.08, 1]);
  const { scrollYProgress: machineProgress } = useScroll({ target: horsepowerRef, offset: ["start end", "end start"] });
  const gearLarge = useTransform(machineProgress, [0, 1], [-30, 420]);
  const gearSmall = useTransform(machineProgress, [0, 1], [40, -620]);
  const wheelRotation = useTransform(machineProgress, [0, 1], [0, 1320]);
  const bikeX = useTransform(machineProgress, [0, 1], [reduce ? 0 : -160, reduce ? 0 : 180]);
  const featuredTrack = newSingles.find((single) => single.title === "Mob Manuscript: The Return");

  useEffect(() => {
    setHydrated(true);
  }, []);

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
    const stop = () => setPlaying(false);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", stop);
    audio.addEventListener("error", stop);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", stop);
      audio.removeEventListener("error", stop);
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
      <aside className="podcast-gauge fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 lg:block" aria-label="Page scroll progress">
        <div className="relative h-36 w-9 border-y border-primary/35">
          <span className="absolute left-1/2 top-1/2 h-24 w-px -translate-x-1/2 -translate-y-1/2 bg-primary/20" />
          <motion.span className="absolute left-1/2 top-1/2 h-12 w-px origin-bottom bg-primary shadow-[0_0_8px_currentColor]" style={{ rotate: gaugeNeedle }} />
          <span className="absolute inset-x-0 bottom-1 text-center text-[0.45rem] font-bold tracking-[0.12em] text-primary uppercase">RPM</span>
        </div>
      </aside>

      <section ref={heroRef} className="relative h-[112svh] border-b border-primary/20 bg-background sm:h-[135svh]">
        <h1 className="sr-only">The Lion’s Den Podcast</h1>
        <div className="sticky top-14 h-[calc(100svh-3.5rem)] overflow-hidden sm:top-16 sm:h-[calc(100svh-4rem)]">
          <motion.div style={{ scale: heroScale, y: heroY, opacity: heroOpacity }} className="absolute inset-0 flex items-start justify-center sm:items-center">
            <img src={podcastArtwork.url} alt="The Lion’s Den Podcast artwork featuring a roaring lion, vintage microphone, drag racing lights and a black muscle car" className="h-full w-full object-contain" />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_29%,transparent_0%,var(--background)_78%)] opacity-45" />
          <motion.div aria-hidden="true" className="podcast-eye-glow absolute left-1/2 top-[24%] h-12 w-36 -translate-x-1/2" animate={reduce ? false : { opacity: [0.2, 0.72, 0.2], scale: [0.94, 1.04, 0.94] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }} />
          <div className="podcast-smoke pointer-events-none absolute inset-x-0 bottom-0 h-2/5" aria-hidden="true" />
          <div className="podcast-embers pointer-events-none absolute inset-0" aria-hidden="true">
            {Array.from({ length: 18 }).map((_, index) => <i key={index} style={{ "--ember-x": `${(index * 37) % 100}%`, "--ember-delay": `${(index % 7) * -0.8}s`, "--ember-duration": `${5 + (index % 5)}s` } as CSSProperties} />)}
          </div>
          <div className="absolute inset-x-0 bottom-12 z-10 mx-auto max-w-6xl px-5 sm:bottom-8 sm:px-8">
            <div className="mx-auto flex max-w-2xl items-end gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-4 text-[0.6rem] font-bold tracking-[0.28em] text-primary uppercase">
                  <span>Enter the den</span><span>Scroll</span>
                </div>
                <div className="mt-3 h-px overflow-hidden bg-primary/25"><motion.div className="h-full origin-left bg-primary shadow-[0_0_12px_currentColor]" style={{ scaleX: heroLine }} /></div>
              </div>
              <motion.div animate={reduce ? false : { y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}><ArrowDown className="size-5 text-primary" aria-hidden="true" /></motion.div>
            </div>
            <Waveform className="mx-auto mt-4 h-8 max-w-sm opacity-60" active={!reduce} />
          </div>
        </div>
      </section>

      <section className="podcast-manifesto relative isolate border-b border-border py-20 sm:py-32 lg:py-44">
        <div className="podcast-smoke pointer-events-none absolute inset-x-0 top-0 h-72 opacity-45" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.header initial={reduce ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} className="mb-14 sm:mb-24">
            <p className="podcast-kicker">Inside the den · three frequencies</p>
            <h2 className="mt-5 max-w-4xl font-podcast text-5xl text-gold sm:text-7xl lg:text-8xl">One voice. Three forces.</h2>
          </motion.header>
          <div className="border-t border-primary/25">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.article key={pillar.title} initial={reduce ? false : { opacity: 0, y: 55, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.75, delay: index * 0.08 }} className="group grid gap-5 border-b border-primary/25 py-10 sm:grid-cols-[5rem_minmax(0,1fr)_minmax(16rem,0.6fr)] sm:items-center sm:gap-8 sm:py-16">
                  <div className="flex items-center gap-4 sm:block"><span className="font-display text-2xl text-primary/45">{pillar.number}</span><Icon className="mt-0 size-6 text-primary sm:mt-5" aria-hidden="true" /></div>
                  <h3 className="font-podcast text-5xl normal-case text-foreground transition-colors duration-300 group-hover:text-primary sm:text-7xl lg:text-8xl">{pillar.title}</h3>
                  <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">{pillar.copy}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="listen" className="relative overflow-hidden border-b border-border bg-surface py-20 sm:py-32">
        <div className="podcast-light-sweep pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div initial={reduce ? false : { opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 max-w-3xl">
            <p className="podcast-kicker">Control room · signal one</p>
            <h2 className="mt-4 font-podcast text-5xl normal-case text-gold sm:text-7xl">Hear the engine turn over.</h2>
            <p className="mt-5 max-w-xl text-muted-foreground">A 60-second music-bed preview while the first full podcast transmission is prepared.</p>
          </motion.div>
          <div className="podcast-console p-4 sm:p-8 lg:p-10">
            <audio ref={audioRef} src="/audio/lions-den-preview.mp3" preload="metadata" />
            <div className="mb-7 flex items-center justify-between border-b border-primary/25 pb-4">
              <span className="podcast-kicker">Broadcast console · LX–001</span>
              <div className="flex items-center gap-2 text-[0.6rem] font-bold tracking-[0.2em] text-muted-foreground uppercase"><span className={`size-2 rounded-full ${playing ? "bg-ember shadow-[0_0_12px_currentColor]" : "bg-primary/25"}`} /> {playing ? "On air" : "Standby"}</div>
            </div>
            <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
              <div className="grid grid-cols-2 gap-3"><VuMeter active={playing} label="Left" /><VuMeter active={playing} label="Right" /></div>
              <div className="flex flex-col items-center text-center">
                <Button type="button" size="icon" onClick={togglePreview} disabled={!featuredTrack?.audioUrl} aria-label={playing ? "Pause music preview" : "Play music preview"} className="podcast-play size-20 rounded-full border border-primary/60 sm:size-24">
                  {playing ? <Pause className="size-7" aria-hidden="true" /> : <Play className="size-7" aria-hidden="true" />}
                </Button>
                <span className="mt-4 text-[0.55rem] font-bold tracking-[0.28em] text-primary uppercase">60 sec preview</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-start justify-between gap-4"><div><p className="text-[0.6rem] font-bold tracking-[0.22em] text-primary uppercase">Featured music bed</p><p className="mt-2 font-podcast text-2xl normal-case text-foreground sm:text-4xl">Mob Manuscript: The Return</p></div><Volume2 className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" /></div>
                <Waveform className="mt-5" active={playing} />
              </div>
            </div>
            <div className="mt-7">
              <div className="flex justify-between text-[0.55rem] font-bold tracking-[0.18em] text-muted-foreground uppercase"><span>Program</span><span>{Math.min(60, Math.round(progress * 0.6)).toString().padStart(2, "0")} / 60</span></div>
              <div className="mt-2 h-1 bg-background" role="progressbar" aria-label="Preview playback progress" aria-valuemin={0} aria-valuemax={60} aria-valuenow={Math.min(60, Math.round(progress * 0.6))}><div className="h-full bg-primary shadow-[0_0_10px_currentColor] transition-[width] duration-100" style={{ width: `${progress}%` }} /></div>
            </div>
          </div>
        </div>
      </section>

      <section ref={horsepowerRef} className="relative min-h-[58rem] overflow-hidden border-b border-border bg-background sm:min-h-[72rem]">
        <div className="podcast-heat absolute inset-0" aria-hidden="true" />
        <Gear className="absolute -left-24 top-14 size-80 text-primary/20 sm:size-[30rem]" rotation={gearLarge} />
        <Gear className="absolute left-[27%] top-24 size-40 text-primary/10 sm:size-64" rotation={gearSmall} reverse />
        <div className="absolute right-[6%] top-16 z-10"><DragTree active={horsepowerActive} /></div>
        <div className="podcast-smoke pointer-events-none absolute inset-x-0 bottom-0 h-1/2" aria-hidden="true" />
        <motion.div style={{ x: bikeX }} className="absolute inset-x-0 bottom-10 text-primary/65 sm:bottom-4"><Motorcycle className="w-[36rem] max-w-[94vw]" wheelRotation={wheelRotation} /></motion.div>
        <div className="relative z-20 mx-auto flex min-h-[58rem] max-w-7xl items-center justify-end px-4 py-24 sm:min-h-[72rem] sm:px-6">
          <motion.div initial={reduce ? false : { opacity: 0, x: 70, clipPath: "inset(0 0 0 35%)" }} whileInView={{ opacity: 1, x: 0, clipPath: "inset(0 0 0 0%)" }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.9 }} className="max-w-xl border-l-2 border-ember bg-background/90 p-6 shadow-[var(--shadow-elevated)] sm:p-10">
            <p className="podcast-kicker text-ember">Horsepower chapter · redline</p>
            <h2 className="mt-5 font-podcast text-5xl normal-case text-gold sm:text-7xl">Built for the long road.</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">Machines, movement and the culture around them. Every mechanical detail turns with the story, never over it.</p>
            <div className="mt-8 grid grid-cols-3 border-y border-primary/20 py-4 text-center text-[0.55rem] font-bold tracking-[0.2em] text-primary uppercase"><span>Torque</span><span>Motion</span><span>Legacy</span></div>
          </motion.div>
        </div>
      </section>

      <section id="transmissions" className="relative border-b border-border bg-surface py-20 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="podcast-kicker">Broadcast log · incoming</p>
          <h2 className="mt-4 font-podcast text-5xl normal-case text-gold sm:text-7xl">Upcoming transmissions</h2>
          <ol className="podcast-ledger mt-12 border-y border-primary/30">
            {transmissions.map((item, index) => (
              <motion.li key={item.number} initial={reduce ? false : { opacity: 0, x: index % 2 ? 32 : -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.65 }} className="group grid gap-4 border-b border-primary/20 px-3 py-8 last:border-b-0 sm:grid-cols-[6rem_minmax(0,1fr)_auto] sm:items-center sm:gap-8 sm:px-6 sm:py-10">
                <div><span className="font-display text-3xl text-primary">{item.number}</span><div className="mt-2 flex gap-1" aria-hidden="true"><i className="size-1.5 rounded-full bg-ember" /><i className="size-1.5 rounded-full bg-primary/20" /><i className="size-1.5 rounded-full bg-primary/20" /></div></div>
                <div><p className="text-[0.55rem] font-bold tracking-[0.22em] text-muted-foreground uppercase">Transmission record</p><h3 className="mt-2 font-podcast text-3xl normal-case text-foreground transition-colors group-hover:text-primary sm:text-4xl">{item.title}</h3><p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">{item.copy}</p></div>
                <span className="w-fit border border-primary/30 px-3 py-2 text-[0.55rem] font-bold tracking-[0.18em] text-primary uppercase">{item.label}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="grain relative isolate min-h-[46rem] overflow-hidden py-24 sm:min-h-[54rem] sm:py-36">
        <motion.img initial={reduce ? false : { scale: 1.1, opacity: 0.12 }} whileInView={{ scale: 1, opacity: 0.28 }} viewport={{ once: true }} transition={{ duration: 1.5 }} src={images.studioSession} alt="" loading="lazy" className="absolute inset-0 -z-30 size-full object-cover" />
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_44%,transparent,var(--background)_72%)]" />
        <img src={podcastArtwork.url} alt="" loading="lazy" className="absolute left-1/2 top-1/2 -z-10 h-[85%] w-auto -translate-x-1/2 -translate-y-1/2 object-contain opacity-15" />
        <div className="relative mx-auto flex min-h-[30rem] max-w-5xl flex-col items-center justify-center px-4 text-center sm:px-6">
          <div className="podcast-emblem"><Mic2 className="size-8 text-primary" aria-hidden="true" /></div>
          <p className="podcast-kicker mt-7">The signal returns to its source</p>
          <h2 className="mx-auto mt-5 max-w-3xl font-podcast text-6xl normal-case text-gold sm:text-8xl">Join the pride.</h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">Episodes and listening destinations will be announced here. Until then, explore the catalog that built the voice behind the show.</p>
          <Button asChild variant="outline" size="lg" className="mt-9 min-h-12 rounded-sm border-primary/50 px-7 font-bold tracking-[0.12em] uppercase shadow-[var(--glow-gold)]">
            <Link to="/music"><BookOpen aria-hidden="true" />Explore the music</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}