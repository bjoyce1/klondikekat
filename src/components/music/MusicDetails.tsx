import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { streamingDestinations } from "@/lib/music-catalog";

export function MusicWaveform({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`mv-waveform ${className}`}
      viewBox="0 0 600 64"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M0 32h600" stroke="currentColor" strokeOpacity=".3" />
      {Array.from({ length: 100 }, (_, index) => {
        const height = 3 + ((index * 13) % 25) * (1 - Math.abs(50 - index) / 50);
        return (
          <path
            key={index}
            d={`M${index * 6 + 2} ${(32 - height).toFixed(2)}v${(height * 2).toFixed(2)}`}
            stroke="currentColor"
            strokeWidth="1.5"
          />
        );
      })}
    </svg>
  );
}

export function StreamingLinks() {
  return (
    <div className="mv-streaming">
      <span className="mv-micro">LISTEN ON</span>
      <div>
        {streamingDestinations.map((destination) => (
          <a
            key={destination.label}
            href={destination.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {destination.label}
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  );
}

export function SectionMark({ number, children }: { number: string; children: string }) {
  return (
    <p className="mv-section-mark">
      <span>{number}</span>
      <i aria-hidden="true" />
      {children}
    </p>
  );
}

export function ArchiveArrow({ down = false }: { down?: boolean }) {
  return down ? (
    <ArrowDownRight size={19} aria-hidden="true" />
  ) : (
    <ArrowUpRight size={19} aria-hidden="true" />
  );
}
