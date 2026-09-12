import { motion, useReducedMotion, type MotionValue } from "motion/react";
import { useEffect, useState } from "react";

function useStableReducedMotion() {
  const prefersReducedMotion = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated && Boolean(prefersReducedMotion);
}

export function HaloRings({ rotation, className = "" }: { rotation?: MotionValue<number>; className?: string }) {
  const reduce = useStableReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 600 600"
      className={className}
      aria-hidden="true"
      style={reduce || !rotation ? {} : { rotate: rotation }}
    >
      <defs>
        <linearGradient id="halo-forged" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0" />
          <stop offset=".24" stopColor="currentColor" stopOpacity=".96" />
          <stop offset=".58" stopColor="currentColor" stopOpacity=".22" />
          <stop offset=".86" stopColor="currentColor" stopOpacity=".8" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx="300" cy="300" r="246" fill="none" stroke="url(#halo-forged)" strokeWidth="3" strokeDasharray="410 80 180 120" />
      <circle cx="300" cy="300" r="220" fill="none" stroke="currentColor" strokeOpacity=".22" strokeWidth="1" strokeDasharray="4 16" />
      <circle cx="300" cy="300" r="182" fill="none" stroke="currentColor" strokeOpacity=".12" strokeWidth="22" strokeDasharray="170 350" />
      <path d="M72 329a232 232 0 0 1 424-124" fill="none" stroke="currentColor" strokeOpacity=".42" strokeWidth="2" />
    </motion.svg>
  );
}

export function VintageMicrophone({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 420" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="mic-chrome" x1="0" x2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity=".18" />
          <stop offset=".22" stopColor="currentColor" stopOpacity=".92" />
          <stop offset=".5" stopColor="currentColor" stopOpacity=".28" />
          <stop offset=".78" stopColor="currentColor" stopOpacity=".88" />
          <stop offset="1" stopColor="currentColor" stopOpacity=".14" />
        </linearGradient>
      </defs>
      <rect x="48" y="18" width="164" height="232" rx="78" fill="url(#mic-chrome)" stroke="currentColor" strokeOpacity=".7" strokeWidth="3" />
      <g fill="none" stroke="currentColor" strokeOpacity=".58" strokeWidth="4">
        {Array.from({ length: 8 }).map((_, index) => <path key={index} d={`M65 ${58 + index * 22}h130`} />)}
        <path d="M88 25v214M130 20v228M172 25v214" strokeWidth="3" />
      </g>
      <path d="M38 144v59c0 57 41 94 92 94s92-37 92-94v-59" fill="none" stroke="currentColor" strokeWidth="8" />
      <path d="M130 297v78M78 397h104M99 375h62" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
      <circle cx="130" cy="203" r="13" fill="currentColor" opacity=".75" />
    </svg>
  );
}

const CHAPTERS = ["Enter", "Pillars", "Signal", "Redline", "Log", "Pride"] as const;

export function DragStageNav({ activeIndex }: { activeIndex: number }) {
  return (
    <nav className="podcast-stage-nav" aria-label="Podcast chapters">
      <span className="podcast-stage-label">Pre-stage</span>
      <ol>
        {CHAPTERS.map((chapter, index) => {
          const isActive = index === activeIndex;
          const isPassed = index < activeIndex;
          return (
            <li key={chapter}>
              <a href={`#podcast-${chapter.toLowerCase()}`} aria-current={isActive ? "step" : undefined} aria-label={`Go to ${chapter} chapter`}>
                <span className={`podcast-stage-bulb ${isActive ? "is-active" : ""} ${isPassed ? "is-passed" : ""}`} aria-hidden="true" />
                <span className="podcast-stage-name">{chapter}</span>
              </a>
            </li>
          );
        })}
      </ol>
      <span className="podcast-stage-label">Stage</span>
    </nav>
  );
}

export function MuscleCar({ className = "", wheelRotation }: { className?: string; wheelRotation?: MotionValue<number> }) {
  const reduce = useStableReducedMotion();
  const wheelStyle = reduce || !wheelRotation ? {} : { rotate: wheelRotation };
  return (
    <svg viewBox="0 0 1200 420" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="car-black-chrome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity=".86" />
          <stop offset=".46" stopColor="currentColor" stopOpacity=".28" />
          <stop offset="1" stopColor="currentColor" stopOpacity=".08" />
        </linearGradient>
        <linearGradient id="car-chrome-line" x1="0" x2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity=".08" />
          <stop offset=".45" stopColor="currentColor" stopOpacity=".95" />
          <stop offset="1" stopColor="currentColor" stopOpacity=".18" />
        </linearGradient>
        <filter id="headlight-bloom" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="12" /></filter>
      </defs>
      <path d="M84 300c25-58 78-82 178-92l116-11 111-108h283l127 104 156 26c37 6 63 31 69 74l-64 26H154Z" fill="url(#car-black-chrome)" stroke="currentColor" strokeOpacity=".5" strokeWidth="4" />
      <path d="M398 194 510 106h245l103 87Z" fill="currentColor" fillOpacity=".06" stroke="currentColor" strokeOpacity=".38" strokeWidth="3" />
      <path d="M571 105v88M780 122l-23 71M320 218h599M939 227h135l21 60H934" fill="none" stroke="url(#car-chrome-line)" strokeWidth="5" />
      <path d="M584 88h126l34 32H551Z" fill="currentColor" fillOpacity=".2" stroke="currentColor" strokeOpacity=".55" strokeWidth="3" />
      <path d="M930 248h154M946 267h143M958 286h123" stroke="currentColor" strokeOpacity=".55" strokeWidth="5" />
      <g className="podcast-headlights">
        <ellipse cx="1019" cy="247" rx="48" ry="25" fill="currentColor" opacity=".18" filter="url(#headlight-bloom)" />
        <ellipse cx="1019" cy="247" rx="28" ry="13" fill="currentColor" opacity=".92" />
      </g>
      {[310, 891].map((cx) => (
        <motion.g key={cx} style={{ ...wheelStyle, transformOrigin: `${cx}px 303px` }}>
          <circle cx={cx} cy="303" r="93" fill="var(--color-background)" stroke="currentColor" strokeOpacity=".45" strokeWidth="8" />
          <circle cx={cx} cy="303" r="62" fill="none" stroke="currentColor" strokeOpacity=".82" strokeWidth="5" />
          <circle cx={cx} cy="303" r="18" fill="currentColor" opacity=".7" />
          {Array.from({ length: 8 }).map((_, index) => <path key={index} d={`M${cx} 241v124`} transform={`rotate(${index * 45} ${cx} 303)`} stroke="currentColor" strokeOpacity=".52" strokeWidth="4" />)}
        </motion.g>
      ))}
      <path d="M125 328h951" stroke="currentColor" strokeOpacity=".22" strokeWidth="2" />
    </svg>
  );
}

export function HoustonSkyline({ className = "" }: { className?: string }) {
  const buildings = [84, 140, 104, 205, 155, 245, 122, 180, 272, 146, 224, 116, 192, 148, 94];
  return (
    <svg viewBox="0 0 1200 360" preserveAspectRatio="none" className={className} aria-hidden="true">
      <g fill="currentColor" opacity=".72">
        {buildings.map((height, index) => {
          const width = 54 + (index % 3) * 12;
          const x = index * 82;
          return <rect key={index} x={x} y={300 - height} width={width} height={height} />;
        })}
        <path d="M625 300V34h14v266m-36-181h86l-18 181h-50Z" />
      </g>
      <g fill="var(--color-primary)" opacity=".36">
        {Array.from({ length: 42 }).map((_, index) => <rect key={index} x={24 + (index * 83) % 1130} y={112 + (index * 47) % 154} width="4" height="7" />)}
      </g>
      <path d="M0 306h1200" stroke="var(--color-primary)" strokeOpacity=".28" />
      <g opacity=".14" transform="translate(0 618) scale(1 -1)"><path d="M0 300h1200v60H0z" fill="currentColor" /></g>
    </svg>
  );
}

export function Tachometer({ needle, className = "" }: { needle?: MotionValue<number>; className?: string }) {
  const reduce = useStableReducedMotion();
  return (
    <div className={`podcast-tachometer ${className}`} aria-label="Redline gauge">
      <svg viewBox="0 0 240 150" aria-hidden="true">
        <path d="M30 128a92 92 0 0 1 180 0" fill="none" stroke="currentColor" strokeOpacity=".18" strokeWidth="16" />
        <path d="M30 128a92 92 0 0 1 180 0" fill="none" stroke="currentColor" strokeOpacity=".7" strokeWidth="3" strokeDasharray="5 13" />
        <path d="M178 63a92 92 0 0 1 32 65" fill="none" stroke="var(--color-ember)" strokeWidth="7" />
        <motion.path d="M120 128 120 48" stroke="var(--color-ember)" strokeWidth="3" style={reduce || !needle ? { transformOrigin: "120px 128px", rotate: -62 } : { transformOrigin: "120px 128px", rotate: needle }} />
        <circle cx="120" cy="128" r="9" fill="currentColor" />
      </svg>
      <span>RPM × 1000</span>
    </div>
  );
}

export function Waveform({ className = "", active = true }: { className?: string; active?: boolean }) {
  const reduce = useStableReducedMotion();
  const bars = [18, 38, 24, 54, 76, 32, 64, 90, 44, 70, 28, 58, 84, 42, 68, 22, 50, 34, 72, 30, 58, 82, 40, 64, 31, 74, 46, 88];
  return (
    <div className={`flex h-20 items-center justify-center gap-1 ${className}`} aria-hidden="true">
      {bars.map((height, index) => (
        <motion.span key={`${height}-${index}`} className="w-0.5 bg-ember sm:w-1" style={{ height: `${height}%` }} animate={reduce || !active ? { scaleY: 0.28, opacity: 0.45 } : { scaleY: [0.34, 1, 0.48], opacity: [0.48, 1, 0.62] }} transition={{ duration: 0.68 + (index % 5) * 0.12, delay: index * 0.02, repeat: Infinity, repeatType: "mirror" }} />
      ))}
    </div>
  );
}

export function VuMeter({ active, label }: { active: boolean; label: string }) {
  const reduce = useStableReducedMotion();
  return (
    <div className="podcast-vu">
      <div className="flex justify-between text-[0.55rem] font-bold tracking-[0.2em] text-muted-foreground uppercase"><span>{label}</span><span>+3</span></div>
      <div className="relative mt-2 h-20 overflow-hidden border border-primary/25 bg-background/75">
        <div className="absolute inset-x-2 bottom-2 flex justify-between text-[0.5rem] text-primary/45"><span>-20</span><span>-10</span><span>0</span></div>
        <motion.div className="absolute bottom-1 left-1/2 h-16 w-px origin-bottom bg-ember shadow-[0_0_9px_currentColor]" animate={reduce || !active ? { rotate: -42 } : { rotate: [-38, 16, -9, 29, -31] }} transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }} />
      </div>
    </div>
  );
}