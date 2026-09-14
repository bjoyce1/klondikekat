import { affiliations } from "@/lib/site-data";

export function AffiliationArchive() {
  return (
    <section className="bio-affiliations" aria-labelledby="bio-affiliations-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <header className="bio-section-head">
          <p className="bio-eyebrow">Verified Connections</p>
          <h2 id="bio-affiliations-heading" className="bio-section-title">
            Crews &amp; Affiliations
          </h2>
          <p className="bio-section-lead">
            Membership stamps and studio credits pulled from the file. Every laminate below is a real
            crew or collaborator in the Klondike Kat record.
          </p>
        </header>

        <ul className="bio-stamp-grid">
          {affiliations.map((a, i) => (
            <li className="bio-stamp" key={a} style={{ ["--bio-tilt" as string]: `${(i % 2 === 0 ? -1 : 1) * (2 + (i % 3))}deg` }}>
              <span className="bio-stamp-ring" aria-hidden="true" />
              <span className="bio-stamp-code">EXHIBIT {String(i + 1).padStart(2, "0")}</span>
              <span className="bio-stamp-name">{a}</span>
              <span className="bio-stamp-foot">VERIFIED &middot; ON FILE</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
