import { Link } from "@tanstack/react-router";
import { BookOpen, CalendarDays, Disc3, ShoppingBag, Video } from "lucide-react";

const destinations = [
  { to: "/music", label: "Music", icon: Disc3 },
  { to: "/videos", label: "Videos", icon: Video },
  { to: "/bio", label: "Story", icon: BookOpen },
  { to: "/shop", label: "Shop", icon: ShoppingBag },
  { to: "/booking", label: "Booking", icon: CalendarDays },
] as const;

export function MobileDestinationNav() {
  return (
    <nav aria-label="Featured destinations" className="hc-mobile-destinations">
      {destinations.map(({ to, label, icon: Icon }) => (
        <Link key={to} to={to} className="hc-mobile-destination">
          <Icon aria-hidden="true" />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}