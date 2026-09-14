import { images } from "@/lib/site-data";

const STEPS = [
  {
    code: "01",
    label: "Brief",
    t: "Send the details",
    d: "Email the project, dates, budget and references. The more detail, the faster the quote.",
  },
  {
    code: "02",
    label: "Scope",
    t: "Lock the scope",
    d: "We agree on deliverables, revisions and timeline before any deposit.",
  },
  {
    code: "03",
    label: "Create",
    t: "Get to work",
    d: "Beats, mixes and features delivered in industry-standard formats, ready to release.",
  },
];

export function BookingProcess() {
  return (
    <section className="booking-process border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:gap-10 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="grain media-zoom card-elevated rounded-sm">
          <img
            src={images.collab}
            alt="Collaboration session in the studio"
            loading="lazy"
            className="aspect-4/3 w-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-4xl sm:text-5xl">
            <span className="text-gold">How it works</span>
          </h2>
          <p className="mt-2 text-xs font-bold tracking-[0.28em] text-muted-foreground uppercase">
            Signal chain
          </p>
          <ol className="booking-process__list mt-8 space-y-6">
            {STEPS.map((step) => (
              <li key={step.code} className="booking-process__step flex gap-5">
                <span className="booking-process__num relative flex shrink-0 flex-col items-center">
                  <span className="font-display text-3xl text-primary">{step.code}</span>
                  <span className="booking-process__fader" aria-hidden="true">
                    <i />
                  </span>
                </span>
                <span>
                  <span className="block text-[0.65rem] font-bold tracking-[0.24em] text-primary uppercase">
                    {step.label}
                  </span>
                  <span className="mt-0.5 block text-xl text-foreground">{step.t}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{step.d}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
