import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { images } from "@/lib/site-data";

export function MobileBookingBanner() {
  return (
    <section className="hc-mobile-booking">
      <img src={images.katAlt} alt="Klondike Kat" loading="lazy" />
      <div className="hc-mobile-booking-scrim" aria-hidden="true" />
      <div className="hc-mobile-booking-copy">
        <p>Bookings &amp; studio</p>
        <h2>Book Klondike Kat</h2>
        <span>Features · Performances · Production</span>
        <Link to="/booking">
          Start a booking <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}