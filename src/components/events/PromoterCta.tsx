import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { images } from "@/lib/site-data";

export function PromoterCta() {
  return (
    <section className="live-promo" aria-labelledby="live-promo-title">
      <div className="live-promo-copy">
        <p className="live-eyebrow">
          <span className="live-tally" aria-hidden="true" />
          Promoters &amp; buyers
        </p>
        <h2 id="live-promo-title" className="live-bill-title">
          Book the <span className="live-gold">show</span>
        </h2>
        <p className="live-promo-lead">
          Running a festival, a club night or a private event? Send the details and we'll get
          back to you directly — no invented rates or availability here, just a real
          conversation.
        </p>
        <Link to="/booking" className="live-register-btn live-promo-btn">
          Booking enquiry
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="live-promo-media grain">
        <img
          src={images.katAlt}
          alt="Klondike Kat on stage"
          loading="lazy"
          className="live-promo-img"
        />
        <span className="live-promo-laminate" aria-hidden="true">
          <span className="live-tally" />
          ALL ACCESS
        </span>
      </div>
    </section>
  );
}
