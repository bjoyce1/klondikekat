type MarqueeProps = {
  items?: string[];
  className?: string;
};

const DEFAULT_ITEMS = [
  "KLONDIKE KAT",
  "THE LYRICAL LION",
  "SOUTH PARK COALITION",
  "HOUSTON, TEXAS",
  "KILLA KLAN",
];

export function Marquee({ items = DEFAULT_ITEMS, className = "" }: MarqueeProps) {
  const track = (
    <div className="marquee-track" aria-hidden="true">
      {[...items, ...items].map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center whitespace-nowrap">
          <span className="font-display text-2xl tracking-wide sm:text-3xl">{item}</span>
          <span className="mx-6 inline-block size-2 rotate-45 bg-primary sm:mx-8" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`flex overflow-hidden border-y border-border bg-surface py-3 text-primary select-none ${className}`}
    >
      <span className="sr-only">{items.join(" · ")}</span>
      {track}
      {track}
    </div>
  );
}
