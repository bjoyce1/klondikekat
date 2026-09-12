import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, ChevronDown, Pause, Play, Volume2 } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import podcastArtwork from "@/assets/lions-den-podcast.jpg.asset.json";
import {
  DragStageNav,
  HaloRings,
  HoustonSkyline,
  MuscleCar,
  Tachometer,
  VintageMicrophone,
  VuMeter,
  Waveform,
} from "@/components/site/PodcastMachinery";
import { Button } from "@/components/ui/button";

const PAGE_URL = "https://klondikekat.lovable.app/podcast";
const PREVIEW_LIMIT = 60;

const pillars = [
  { number: "01", title: "Music", motif: "Frequency / 808", copy: "Records, sessions and the stories behind a three-decade Houston catalog." },
  { number: "02", title: "Wisdom", motif: "Mind / Mane", copy: "Real lessons on longevity, independence, craft and moving with purpose." },
  { number: "03", title: "Horsepower", motif: "Torque / Legacy", copy: "Car culture, performance and the machines that keep the city moving." },
] as const;

const transmissions = [
  { number: "001", title: "The doors are opening", label: "Series trailer", copy: "The first transmission from The Lion’s Den is being tuned now." },
  { number: "002", title: "Stories behind the records", label: "Coming soon", copy: "Studio stories, collaborators and the records that shaped the journey." },
  { number: "003", title: "Built for the long road", label: "Coming soon", copy: "Independent game, hard-earned perspective and horsepower culture." },
] as const;

const CHAPTER_IDS = ["podcast-enter", "podcast-pillars", "podcast-signal", "podcast-redline", "podcast-log", "podcast-pride"];

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

function EmberField({ count = 18 }: { count?: number }) {
  return (
    <div className="podcast-embers pointer-events-none absolute inset-0" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <i key={index} style={{ "--ember-x": `${(index * 37) % 100}%`, "--ember-delay": `${(index % 7) * -0.8}s`, "--ember-duration": `${5 + (index % 5)}s` } as CSSProperties} />
      ))}
    </div>
  );
}

function RedSignal({ active = true }: { active?: boolean }) {
  return <div className="podcast-red-signal" aria-hidden="true"><Waveform className="h-9" active={active} /></div>;
}

function PodcastPage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const automotiveRef = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  const reduce = hydrated && Boolean(prefersReducedMotion);
  const automotiveActive = useInView(automotiveRef, { amount: 0.2 });

  const { scrollYProgress: pageProgress } = useScroll();
  const smoothPageProgress = useSpring(pageProgress, { stiffness: 90, damping: 24, mass: 0.3 });
  const haloRotation = useTransform(smoothPageProgress, [0, 1], [0, reduce ? 0 : 115]);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(heroProgress, [0, 1], [1, reduce ? 1 : 1.12]);
  const heroY = useTransform(heroProgress, [0, 1], [0, reduce ? 0 : 84]);
  const heroOpacity = useTransform(heroProgress, [0.62, 1], [1, 0.15]);
  const scrollCue = useTransform(heroProgress, [0, 0.72], [0.08, 1]);
  const { scrollYProgress: automotiveProgress } = useScroll({ target: automotiveRef, offset: ["start end", "end start"] });
  const carX = useTransform(automotiveProgress, [0, 1], [reduce ? 0 : -110, reduce ? 0 : 72]);
  const wheelRotation = useTransform(automotiveProgress, [0, 1], [0, reduce ? 0 : 820]);
  const tachNeedle = useTransform(automotiveProgress, [0.08, 0.85], [-64, reduce ? -8 : 63]);

  useEffect(() => setHydrated(true), []);

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

  useEffect(() => {
    const sections = CHAPTER_IDS.map((id) => document.getElementById(id)).filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveChapter(Math.max(0, CHAPTER_IDS.indexOf(visible.target.id)));
    }, { rootMargin: "-28% 0px -46% 0px", threshold: [0, 0.2, 0.45, 0.7] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const togglePreview = async () => {
    const audio = audioRef.current;
    if (!audio) return;
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
      <DragStageNav activeIndex={activeChapter} />

      <section id="podcast-enter" ref={heroRef} className="podcast-hero relative h-[112svh] border-b border-primary/20 sm:h-[138svh]">
        <h1 className="sr-only">The Lion’s Den Podcast</h1>
        <div className="sticky top-14 h-[calc(100svh-3.5rem)] overflow-hidden bg-background sm:top-16 sm:h-[calc(100svh-4rem)]">
          <motion.div className="absolute left-1/2 top-[43%] size-[min(104vw,54rem)] -translate-x-1/2 -translate-y-1/2 text-primary/65 sm:top-1/2" style={{ rotate: haloRotation }}><HaloRings className="size-full" /></motion.div>
          <div className="podcast-hero-halo pointer-events-none absolute inset-0" aria-hidden="true" />
          <motion.div style={{ scale: heroScale, y: heroY, opacity: heroOpacity }} className="absolute inset-0 flex items-start justify-center sm:items-center">
            <img src={podcastArtwork.url} alt="The Lion’s Den Podcast artwork featuring a roaring lion, vintage microphone, drag racing lights, Houston skyline and a black muscle car" className="h-full w-full object-contain" />
          </motion.div>
          <div className="podcast-hero-vignette pointer-events-none absolute inset-0" aria-hidden="true" />
          <motion.div aria-hidden="true" className="podcast-eye-glow absolute left-1/2 top-[23.5%] h-10 w-32 -translate-x-1/2 sm:top-[27%]" animate={reduce ? false : { opacity: [0.18, 0.62, 0.18], scale: [0.95, 1.035, 0.95] }} transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }} />
          <div className="podcast-smoke pointer-events-none absolute inset-x-0 bottom-0 h-2/5" aria-hidden="true" />
          <EmberField />
          <div className="absolute inset-x-0 bottom-8 z-20 mx-auto max-w-5xl px-5 sm:bottom-7 sm:px-8">
            <RedSignal active={!reduce} />
            <div className="mx-auto mt-4 flex max-w-xl items-end gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-4 font-display text-[0.6rem] tracking-[0.28em] text-primary uppercase"><span>Enter the den</span><span>Scroll</span></div>
                <div className="mt-3 h-px overflow-hidden bg-primary/25"><motion.div className="h-full origin-left bg-primary shadow-[0_0_12px_currentColor]" style={{ scaleX: scrollCue }} /></div>
              </div>
              <motion.div animate={reduce ? false : { y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}><ChevronDown className="size-5 text-primary" aria-hidden="true" /></motion.div>
            </div>
          </div>
        </div>
      </section>

      <section id="podcast-pillars" className="podcast-manifesto relative isolate overflow-hidden border-b border-primary/20 py-24 sm:py-36 lg:py-44">
        <div className="absolute left-1/2 top-16 size-[46rem] -translate-x-1/2 text-primary/10" aria-hidden="true"><HaloRings className="size-full" rotation={haloRotation} /></div>
        <div className="podcast-smoke pointer-events-none absolute inset-x-0 top-0 h-80 opacity-40" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <motion.header initial={reduce ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} className="mx-auto mb-14 max-w-4xl text-center sm:mb-24">
            <p className="podcast-kicker">Three frequencies · one den</p>
            <h2 className="podcast-forged-title mt-5 text-5xl sm:text-7xl lg:text-8xl">Music · Wisdom · Horsepower</h2>
          </motion.header>
          <div className="grid gap-8 lg:grid-cols-3 lg:gap-5">
            {pillars.map((pillar, index) => (
              <motion.article key={pillar.title} initial={reduce ? false : { opacity: 0, y: 46, clipPath: "inset(12% 12% 12% 12%)" }} whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.75, delay: index * 0.1 }} className="podcast-badge-panel group relative min-h-[30rem] overflow-hidden p-7 sm:p-9">
                <span className="font-display text-xs tracking-[0.28em] text-primary/60">{pillar.number}</span>
                {index === 0 && <VintageMicrophone className="absolute -right-6 top-14 h-72 text-primary/18" />}
                {index === 1 && <><HaloRings className="absolute -right-24 top-12 size-80 text-primary/18" /><img src={podcastArtwork.url} alt="" loading="lazy" className="absolute inset-x-0 bottom-0 h-[72%] w-full object-cover object-top opacity-15 mix-blend-luminosity" /></>}
                {index === 2 && <Tachometer className="absolute right-4 top-16 w-64 text-primary/24" needle={tachNeedle} />}
                <div className="absolute inset-x-7 bottom-9 z-10">
                  <p className="font-display text-[0.58rem] tracking-[0.26em] text-ember uppercase">{pillar.motif}</p>
                  <h3 className="podcast-forged-title mt-3 text-5xl sm:text-6xl">{pillar.title}</h3>
                  <div className="my-5 h-px bg-primary/30" />
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{pillar.copy}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="podcast-signal" className="relative overflow-hidden border-b border-primary/20 bg-surface py-24 sm:py-36">
        <div className="podcast-light-sweep pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <motion.header initial={reduce ? false : { opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="max-w-3xl">
              <p className="podcast-kicker">Vintage broadcast control · signal one</p>
              <h2 className="podcast-forged-title mt-5 text-5xl sm:text-7xl">The voice behind the grille.</h2>
              <p className="mt-5 max-w-xl text-muted-foreground">A 60-second music-bed preview while the first full podcast transmission is prepared.</p>
            </motion.header>
            <VintageMicrophone className="mx-auto hidden h-64 text-primary/65 lg:block" />
          </div>

          <motion.div initial={reduce ? false : { opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} className="podcast-console mt-12 p-5 sm:p-8 lg:p-10">
            <audio ref={audioRef} src="/audio/lions-den-preview.mp3" preload="metadata" />
            <div className="podcast-console-top flex flex-wrap items-center justify-between gap-4 pb-5">
              <span className="podcast-kicker">Lion’s Den Broadcast Works · LX–001</span>
              <div className="flex items-center gap-2 font-display text-[0.58rem] tracking-[0.22em] text-muted-foreground uppercase"><span className={`podcast-status-lamp ${playing ? "is-live" : ""}`} />{playing ? "On air" : "Standby"}</div>
            </div>
            <div className="podcast-mic-grille my-6 h-14" aria-hidden="true" />
            <div className="grid gap-9 lg:grid-cols-[1fr_auto_1.1fr] lg:items-center">
              <div className="grid grid-cols-2 gap-3"><VuMeter active={playing} label="Input L" /><VuMeter active={playing} label="Input R" /></div>
              <div className="flex flex-col items-center text-center">
                <Button type="button" size="icon" onClick={togglePreview} aria-label={playing ? "Pause music preview" : "Play music preview"} className="podcast-play size-24 rounded-full border border-primary/60 sm:size-28">
                  {playing ? <Pause className="size-8" aria-hidden="true" /> : <Play className="size-8" aria-hidden="true" />}
                </Button>
                <span className="mt-5 font-display text-[0.58rem] tracking-[0.28em] text-primary uppercase">60 sec preview</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-start justify-between gap-4"><div><p className="font-display text-[0.58rem] tracking-[0.22em] text-primary uppercase">Featured music bed</p><p className="mt-2 font-display text-2xl text-foreground uppercase sm:text-3xl">Mob Manuscript: The Return</p></div><Volume2 className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" /></div>
                <Waveform className="mt-4" active={playing} />
                <div className="flex justify-center gap-5" aria-hidden="true"><span className="podcast-knob" /><span className="podcast-knob" /><span className="podcast-knob" /></div>
              </div>
            </div>
            <div className="mt-8">
              <div className="flex justify-between font-display text-[0.55rem] tracking-[0.18em] text-muted-foreground uppercase"><span>Program</span><span>{Math.min(60, Math.round(progress * 0.6)).toString().padStart(2, "0")} / 60</span></div>
              <div className="mt-2 h-1 bg-background" role="progressbar" aria-label="Preview playback progress" aria-valuemin={0} aria-valuemax={60} aria-valuenow={Math.min(60, Math.round(progress * 0.6))}><div className="h-full bg-ember shadow-[0_0_12px_currentColor] transition-[width] duration-100" style={{ width: `${progress}%` }} /></div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="podcast-redline" ref={automotiveRef} className="podcast-automotive relative min-h-[62rem] overflow-hidden border-b border-primary/20 bg-background sm:min-h-[76rem]">
        <div className="podcast-heat pointer-events-none absolute inset-0" aria-hidden="true" />
        <HoustonSkyline className="absolute inset-x-0 top-0 h-[24rem] w-full text-surface-2" />
        <div className="podcast-city-reflection absolute inset-x-0 top-[23rem] h-40" aria-hidden="true" />
        <RedSignal active={automotiveActive && !reduce} />
        <div className="absolute right-[5%] top-24 z-20 hidden sm:block"><div className={`podcast-art-tree ${automotiveActive ? "is-running" : ""}`} aria-label="Drag racing stage sequence"><span>Pre-stage</span>{Array.from({ length: 5 }).map((_, index) => <i key={index} />)}<span>Stage</span></div></div>
        <div className={`podcast-headlight-field ${automotiveActive ? "is-lit" : ""}`} aria-hidden="true" />
        <div className="podcast-speed-lines pointer-events-none absolute inset-x-0 bottom-28 h-48" aria-hidden="true" />
        <div className="podcast-smoke pointer-events-none absolute inset-x-0 bottom-0 h-2/5" aria-hidden="true" />
        <motion.div style={{ x: carX }} className={`absolute inset-x-0 bottom-20 z-10 text-primary/85 sm:bottom-12 ${automotiveActive ? "car-awake" : ""}`}><MuscleCar className="mx-auto w-[74rem] max-w-[112vw]" wheelRotation={wheelRotation} /></motion.div>
        <div className="podcast-asphalt absolute inset-x-0 bottom-0 h-36" aria-hidden="true" />
        <div className="relative z-20 mx-auto flex min-h-[62rem] max-w-7xl items-center px-4 py-24 sm:min-h-[76rem] sm:px-6">
          <motion.div initial={reduce ? false : { opacity: 0, x: -60, clipPath: "inset(0 30% 0 0)" }} whileInView={{ opacity: 1, x: 0, clipPath: "inset(0 0 0 0)" }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.9 }} className="podcast-badge-panel relative max-w-xl p-7 sm:p-10">
            <p className="podcast-kicker text-ember">Houston horsepower · redline</p>
            <h2 className="podcast-forged-title mt-5 text-5xl sm:text-7xl">Built low. Running long.</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">Black chrome, hot asphalt and Southside motion. The machines carry the same independence, discipline and presence as the music.</p>
            <Tachometer className="mt-8 max-w-sm text-primary" needle={tachNeedle} />
            <div className="mt-7 grid grid-cols-3 border-y border-primary/25 py-4 text-center font-display text-[0.55rem] tracking-[0.2em] text-primary uppercase"><span>Torque</span><span>Motion</span><span>Legacy</span></div>
          </motion.div>
        </div>
      </section>

      <section id="podcast-log" className="relative overflow-hidden border-b border-primary/20 bg-surface py-24 sm:py-36">
        <div className="absolute left-1/2 top-0 size-[44rem] -translate-x-1/2 -translate-y-1/2 text-primary/8" aria-hidden="true"><HaloRings className="size-full" /></div>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <p className="podcast-kicker">Broadcast ledger · incoming</p>
          <h2 className="podcast-forged-title mt-5 text-5xl sm:text-7xl">Upcoming transmissions</h2>
          <ol className="mt-12 grid gap-6">
            {transmissions.map((item, index) => (
              <motion.li key={item.number} initial={reduce ? false : { opacity: 0, y: 28, clipPath: "inset(8% 4% 8% 4%)" }} whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7, delay: index * 0.08 }} className="podcast-transmission group grid gap-5 p-6 sm:grid-cols-[6rem_minmax(0,1fr)_auto] sm:items-center sm:gap-8 sm:p-9">
                <div><span className="font-display text-3xl text-primary">{item.number}</span><div className="mt-3 flex gap-1.5" aria-hidden="true"><i className="podcast-mini-bulb is-amber" /><i className="podcast-mini-bulb" /><i className="podcast-mini-bulb" /></div></div>
                <div><p className="font-display text-[0.55rem] tracking-[0.22em] text-muted-foreground uppercase">Transmission record</p><h3 className="mt-2 font-display text-3xl text-foreground uppercase transition-colors group-hover:text-primary sm:text-4xl">{item.title}</h3><p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">{item.copy}</p></div>
                <span className="podcast-status-plate">{item.label}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section id="podcast-pride" className="grain relative isolate min-h-[50rem] overflow-hidden py-28 sm:min-h-[60rem] sm:py-40">
        <img src={podcastArtwork.url} alt="" loading="lazy" className="absolute left-1/2 top-1/2 -z-30 h-[110%] w-full -translate-x-1/2 -translate-y-1/2 object-contain opacity-24" />
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_38%,transparent_0%,var(--background)_68%)]" />
        <div className="absolute left-1/2 top-1/2 -z-10 size-[min(92vw,46rem)] -translate-x-1/2 -translate-y-1/2 text-primary/40"><HaloRings className="size-full" rotation={haloRotation} /></div>
        <EmberField count={12} />
        <div className="relative mx-auto flex min-h-[34rem] max-w-5xl flex-col items-center justify-center px-4 text-center sm:px-6">
          <div className="podcast-crest"><VintageMicrophone className="h-20 text-primary" /></div>
          <p className="podcast-kicker mt-9">The signal returns to the source</p>
          <h2 className="podcast-forged-title mx-auto mt-6 max-w-4xl text-6xl sm:text-8xl lg:text-9xl">Join the Pride</h2>
          <p className="mx-auto mt-7 max-w-xl text-muted-foreground">Episodes and listening destinations will be announced here. Until then, explore the catalog that built the voice behind the show.</p>
          <Button asChild variant="outline" size="lg" className="podcast-cta mt-10 min-h-12 rounded-none border-primary/60 px-8 font-display tracking-[0.14em] uppercase shadow-[var(--glow-gold)]">
            <Link to="/music"><BookOpen aria-hidden="true" />Explore the music</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}