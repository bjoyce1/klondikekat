import { Link } from "@tanstack/react-router";
import { releases } from "@/lib/site-data";

export function CatalogLedger() {
  return (
    <section className="bio-ledger" aria-labelledby="bio-ledger-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <header className="bio-section-head">
          <p className="bio-eyebrow">Selected Catalog</p>
          <h2 id="bio-ledger-heading" className="bio-section-title">
            The Ledger
          </h2>
        </header>

        <div className="bio-ledger-table" role="table" aria-label="Selected discography">
          <div className="bio-ledger-row bio-ledger-row--head" role="row">
            <span role="columnheader">Entry</span>
            <span role="columnheader">Title</span>
            <span role="columnheader">Filed</span>
          </div>
          {releases.map((r, i) => (
            <div className="bio-ledger-row" role="row" key={r.title}>
              <span role="cell" className="bio-ledger-num">{String(i + 1).padStart(2, "0")}</span>
              <span role="cell" className="bio-ledger-media">
                <img src={r.image} alt="" loading="lazy" />
                <span>
                  <strong>{r.title}</strong>
                  <em>{r.note}</em>
                </span>
              </span>
              <span role="cell" className="bio-ledger-year">{r.year ?? r.kind}</span>
            </div>
          ))}
        </div>

        <div className="bio-ledger-links">
          <Link to="/music" className="bio-ledger-cta">
            Open the full discography
          </Link>
          <Link to="/videos" className="bio-ledger-cta bio-ledger-cta--ghost">
            Watch the visuals
          </Link>
        </div>
      </div>
    </section>
  );
}
