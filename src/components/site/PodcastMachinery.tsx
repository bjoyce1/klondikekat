import { motion, useReducedMotion, type MotionValue } from "motion/react";
import { useEffect, useState } from "react";

function useStableReducedMotion() {
  const prefersReducedMotion = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated && Boolean(prefersReducedMotion);
}

type GearProps = {
  className?: string;
  rotation?: MotionValue<number>;
  reverse?: boolean;
};

export function Gear({ className = "", rotation, reverse = false }: GearProps) {
  const reduce = useStableReducedMotion();
  const motionStyle = reduce || !rotation ? {} : { rotate: rotation };

  return (
    <motion.svg
      viewBox="0 0 120 120"
      className={className}
      aria-hidden="true"
      style={motionStyle}
    >
      <defs>
        <radialGradient id="gear-metal" cx="36%" cy="28%">
          <stop offset="0" stopColor="currentColor" stopOpacity=".95" />
          <stop offset=".46" stopColor="currentColor" stopOpacity=".5" />
          <stop offset="1" stopColor="currentColor" stopOpacity=".18" />
        </radialGradient>
      </defs>
      <g fill="url(#gear-metal)">
        {Array.from({ length: 12 }).map((_, index) => (
          <rect
            key={index}
            x="53"
            y="0"
            width="14"
            height="21"
            rx="1.5"
            transform={`rotate(${(reverse ? -1 : 1) * index * 30} 60 60)`}
          />
        ))}
        <path
          fillRule="evenodd"
          d="M60 13a47 47 0 1 0 0 94 47 47 0 0 0 0-94Zm0 16a31 31 0 1 1 0 62 31 31 0 0 1 0-62Zm0 15a16 16 0 1 0 0 32 16 16 0 0 0 0-32Z"
          clipRule="evenodd"
        />
      </g>
      <circle cx="60" cy="60" r="44" fill="none" stroke="currentColor" strokeOpacity=".22" />
    </motion.svg>
  );
}

export function DragTree({ active = false }: { active?: boolean }) {
  const reduce = useStableReducedMotion();
  const lights = ["bg-primary/25", "bg-primary/25", "bg-primary/25", "bg-signal-green/25"];

  return (
    <div className="podcast-metal-panel relative w-20 px-3 py-5" aria-label="Drag racing start sequence">
      <div className="mx-auto mb-3 h-8 w-1 bg-primary/35" />
      <div className="grid grid-cols-2 gap-2" aria-hidden="true">
        {lights.map((base, index) => (
          <motion.span
            key={index}
            className={`block aspect-square rounded-full border border-primary/35 ${base}`}
            animate={
              reduce || !active
                ? false
                : { opacity: [0.28, 1, 0.45], boxShadow: ["0 0 0 transparent", "0 0 22px currentColor", "0 0 5px currentColor"] }
            }
            transition={{ duration: 0.7, delay: index * 0.34, times: [0, 0.45, 1] }}
          />
        ))}
      </div>
      <div className="mx-auto mt-3 h-10 w-1 bg-primary/25" />
    </div>
  );
}

export function Motorcycle({ className = "", wheelRotation }: { className?: string; wheelRotation?: MotionValue<number> }) {
  const reduce = useStableReducedMotion();
  const wheelStyle = reduce || !wheelRotation ? undefined : { rotate: wheelRotation };

  return (
    <svg viewBox="0 0 520 210" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="bike-metal" x1="0" x2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity=".35" />
          <stop offset=".48" stopColor="currentColor" />
          <stop offset="1" stopColor="currentColor" stopOpacity=".28" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#bike-metal)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
        <motion.g style={{ ...wheelStyle, transformOrigin: "110px 145px" }}>
          <circle cx="110" cy="145" r="55" />
          <circle cx="110" cy="145" r="43" strokeWidth="2" />
          <path d="M110 90v110M55 145h110M71 106l78 78M149 106l-78 78" opacity=".55" />
        </motion.g>
        <motion.g style={{ ...wheelStyle, transformOrigin: "414px 145px" }}>
          <circle cx="414" cy="145" r="55" />
          <circle cx="414" cy="145" r="43" strokeWidth="2" />
          <path d="M414 90v110M359 145h110M375 106l78 78M453 106l-78 78" opacity=".55" />
        </motion.g>
        <path d="M110 145l80-74 76 74H110Zm80-74 70-20 66 94m-136-74 21 74m55 0 60-94 88 94M242 48h47M321 43l36-17" />
        <path d="M170 67c19-28 67-29 91-11l-42 19Z" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

export function Waveform({ className = "", active = true }: { className?: string; active?: boolean }) {
  const reduce = useStableReducedMotion();
  const bars = [18, 38, 24, 54, 76, 32, 64, 90, 44, 70, 28, 58, 84, 42, 68, 22, 50, 34, 72, 30, 58, 82, 40, 64];

  return (
    <div className={`flex h-20 items-center justify-center gap-1 ${className}`} aria-hidden="true">
      {bars.map((height, index) => (
        <motion.span
          key={`${height}-${index}`}
          className="w-0.5 bg-ember sm:w-1"
          style={{ height: `${height}%` }}
          animate={reduce || !active ? { scaleY: 0.28, opacity: 0.45 } : { scaleY: [0.34, 1, 0.48], opacity: [0.5, 1, 0.65] }}
          transition={{ duration: 0.72 + (index % 4) * 0.14, delay: index * 0.025, repeat: Infinity, repeatType: "mirror" }}
        />
      ))}
    </div>
  );
}

export function VuMeter({ active, label }: { active: boolean; label: string }) {
  const reduce = useStableReducedMotion();
  return (
    <div className="podcast-vu">
      <div className="flex justify-between text-[0.55rem] font-bold tracking-[0.2em] text-muted-foreground uppercase">
        <span>{label}</span><span>+3</span>
      </div>
      <div className="relative mt-2 h-16 overflow-hidden border border-primary/25 bg-background/75">
        <div className="absolute inset-x-2 bottom-2 flex justify-between text-[0.5rem] text-primary/45"><span>-20</span><span>-10</span><span>0</span></div>
        <motion.div
          className="absolute bottom-1 left-1/2 h-14 w-px origin-bottom bg-ember shadow-[0_0_9px_currentColor]"
          animate={reduce || !active ? { rotate: -42 } : { rotate: [-38, 16, -9, 29, -31] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}