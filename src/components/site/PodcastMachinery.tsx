import { motion, useReducedMotion } from "motion/react";

type GearProps = {
  className?: string;
  reverse?: boolean;
  duration?: number;
};

export function Gear({ className = "", reverse = false, duration = 18 }: GearProps) {
  const reduce = useReducedMotion();

  return (
    <motion.svg
      viewBox="0 0 120 120"
      className={className}
      aria-hidden="true"
      animate={reduce ? false : { rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <g fill="currentColor">
        {Array.from({ length: 12 }).map((_, index) => (
          <rect
            key={index}
            x="54"
            y="1"
            width="12"
            height="19"
            rx="2"
            transform={`rotate(${index * 30} 60 60)`}
          />
        ))}
        <path
          fillRule="evenodd"
          d="M60 14a46 46 0 1 0 0 92 46 46 0 0 0 0-92Zm0 17a29 29 0 1 1 0 58 29 29 0 0 1 0-58Zm0 13a16 16 0 1 0 0 32 16 16 0 0 0 0-32Z"
          clipRule="evenodd"
        />
      </g>
    </motion.svg>
  );
}

export function RacingLights() {
  return (
    <div className="grid w-20 grid-cols-2 gap-2 border border-primary/35 bg-background/80 p-3 shadow-[var(--glow-gold)]" aria-hidden="true">
      {[0, 1, 2, 3, 4, 5].map((light) => (
        <motion.span
          key={light}
          className={`block aspect-square rounded-full border border-primary/40 ${light > 3 ? "bg-ember" : "bg-primary"}`}
          animate={{ opacity: [0.3, 1, 0.3], boxShadow: ["0 0 0 transparent", "0 0 18px currentColor", "0 0 0 transparent"] }}
          transition={{ duration: 2.2, delay: light * 0.16, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

export function Motorcycle({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const wheelMotion = reduce ? false : { rotate: 360 };

  return (
    <svg viewBox="0 0 520 210" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
        <motion.g
          style={{ transformOrigin: "110px 145px" }}
          animate={wheelMotion}
          transition={{ duration: 1.8, ease: "linear", repeat: Infinity }}
        >
          <circle cx="110" cy="145" r="55" />
          <path d="M110 90v110M55 145h110M71 106l78 78M149 106l-78 78" opacity=".55" />
        </motion.g>
        <motion.g
          style={{ transformOrigin: "414px 145px" }}
          animate={wheelMotion}
          transition={{ duration: 1.8, ease: "linear", repeat: Infinity }}
        >
          <circle cx="414" cy="145" r="55" />
          <path d="M414 90v110M359 145h110M375 106l78 78M453 106l-78 78" opacity=".55" />
        </motion.g>
        <path d="M110 145l80-74 76 74H110Zm80-74 70-20 66 94m-136-74 21 74m55 0 60-94 88 94M242 48h47M321 43l36-17" />
        <path d="M170 67c19-28 67-29 91-11l-42 19Z" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

export function Waveform({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const bars = [18, 38, 24, 54, 76, 32, 64, 90, 44, 70, 28, 58, 84, 42, 68, 22, 50, 34];

  return (
    <div className={`flex h-20 items-center justify-center gap-1 ${className}`} aria-hidden="true">
      {bars.map((height, index) => (
        <motion.span
          key={`${height}-${index}`}
          className="w-1 bg-ember"
          style={{ height: `${height}%` }}
          animate={reduce ? false : { scaleY: [0.45, 1, 0.55] }}
          transition={{ duration: 0.9, delay: index * 0.05, repeat: Infinity, repeatType: "mirror" }}
        />
      ))}
    </div>
  );
}