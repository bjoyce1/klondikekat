import { Ticket } from "lucide-react";
import type { EventItem } from "@/lib/site-data";

export function ShowBill({ events }: { events: EventItem[] }) {
  return (
    <section className="live-bill" aria-labelledby="live-bill-title">
      <div className="live-bill-head">
        <p className="live-eyebrow">
          <span className="live-tally" aria-hidden="true" />
          Tour board
        </p>
        <h2 id="live-bill-title" className="live-bill-title">
          Upcoming <span className="live-gold">shows</span>
        </h2>
      </div>

      <ol className="live-bill-list">
        {events.map((event) => (
          <li key={event.title} className="live-ticket-row">
            <div className="live-ticket-stub">
              <span className="live-tag">Live</span>
              <span className="live-ticket-serial">ADMIT ONE</span>
            </div>
            <div className="live-ticket-main">
              <h3 className="live-ticket-title">{event.title}</h3>
              <p className="live-ticket-meta">
                {event.venue ? <span>{event.venue}</span> : null}
                {event.city ? <span>{event.city}</span> : null}
              </p>
              <p className="live-ticket-detail">{event.detail}</p>
            </div>
            <div className="live-ticket-action">
              <a
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="live-register-btn"
              >
                <Ticket className="size-4" aria-hidden="true" />
                Register
              </a>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
