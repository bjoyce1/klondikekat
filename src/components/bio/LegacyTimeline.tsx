import { images } from "@/lib/site-data";

type TimelineEntry = {
  year: string;
  label: string;
  title: string;
  copy: string;
  image: string;
};

const entries: TimelineEntry[] = [
  {
    year: "1992",
    label: "Induction",
    title: "Joins the South Park Coalition",
    copy: "Already a well-respected artist in H-Town, Klondike Kat is inducted into the legendary South Park Coalition — the crew that would anchor his career.",
    image: images.bioSquare,
  },
  {
    year: "1993",
    label: "Debut",
    title: "\u201CThe Lyrical Lion\u201D",
    copy: "The debut release. Home of the classic S.P.C. click record \u201CMurder Script.\u201D",
    image: images.katAlt,
  },
  {
    year: "1997",
    label: "Sophomore LP",
    title: "\u201CMobbin' Muzik Melodies\u201D",
    copy: "Released on Beatbox Records, produced with Icey Hott of Street Military, Mo' Dangerous, Stro and Richard Johnson. Twangy guitars, heavy bass, forceful synths — mixed to carry the record. Features the eight-minute Killa Klan anthem \u201CLoc'ed Out Drop Top\u201D and a nine-minute S.P.C. tribute, the next installment of \u201CMurder Script.\u201D",
    image: images.studioSession,
  },
  {
    year: "Present",
    label: "Current chapter",
    title: "Fourth member of the Wreckless Klan",
    copy: "Kat recently became the fourth member of the almighty Wreckless Klan, with the Exclusive Diamond Dre album carrying the catalog forward today.",
    image: images.collab,
  },
];

export function LegacyTimeline() {
  return (
    <section className="bio-timeline" aria-labelledby="bio-timeline-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <header className="bio-section-head">
          <p className="bio-eyebrow">The Ledger of Years</p>
          <h2 id="bio-timeline-heading" className="bio-section-title">
            Legacy Timeline
          </h2>
        </header>

        <ol className="bio-timeline-list">
          {entries.map((entry) => (
            <li className="bio-timeline-row" key={entry.year + entry.title}>
              <div className="bio-timeline-year-col">
                <span className="bio-timeline-year">{entry.year}</span>
                <span className="bio-timeline-label">{entry.label}</span>
              </div>

              <div className="bio-timeline-rule" aria-hidden="true">
                <span className="bio-timeline-dot" />
              </div>

              <div className="bio-timeline-card">
                <div className="bio-timeline-media grain">
                  <img src={entry.image} alt="" loading="lazy" />
                </div>
                <div className="bio-timeline-copy">
                  <h3>{entry.title}</h3>
                  <p>{entry.copy}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
