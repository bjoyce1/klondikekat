import { bio, images } from "@/lib/site-data";

const chapterMeta = [
  { label: "Chapter I", tag: "The Sophomore Record" },
  { label: "Chapter II", tag: "Style & Company" },
  { label: "Chapter III", tag: "The Notorious Cuts" },
  { label: "Chapter IV", tag: "The Verdict" },
  { label: "Chapter V", tag: "Roots & Rank" },
];

export function LinerNoteChapters() {
  return (
    <section className="bio-chapters" aria-labelledby="bio-chapters-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <header className="bio-section-head">
          <p className="bio-eyebrow">Liner Notes</p>
          <h2 id="bio-chapters-heading" className="bio-section-title">
            The Long Read
          </h2>
          <p className="bio-section-lead">{bio.intro}</p>
        </header>

        <div className="bio-chapter-grid">
          {bio.paragraphs.map((p, i) => (
            <article className="bio-chapter" key={p.slice(0, 32)}>
              <div className="bio-chapter-head">
                <span className="bio-chapter-number">{chapterMeta[i]?.label ?? `Chapter ${i + 1}`}</span>
                <span className="bio-chapter-tag">{chapterMeta[i]?.tag}</span>
              </div>
              <p>{p}</p>
            </article>
          ))}
        </div>

        <figure className="bio-closing-frame grain">
          <img src={images.katAlt} alt="Klondike Kat" loading="lazy" />
          <figcaption>{bio.closing}</figcaption>
        </figure>
      </div>
    </section>
  );
}
