import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import lionsDen from "@/assets/lions-den-podcast.jpg.asset.json";
import merchCaps from "@/assets/merch-caps.jpg.asset.json";
import { images } from "@/lib/site-data";

const portals = [
  {
    to: "/podcast",
    title: "The Lion's Den",
    subtitle: "Podcast",
    image: lionsDen.url,
    alt: "The Lion's Den podcast artwork",
  },
  {
    to: "/videos",
    title: "In the lanes",
    subtitle: "With the Lion",
    image: images.videoYouWrong,
    alt: "Klondike Kat video artwork",
  },
  {
    to: "/shop",
    title: "Shop",
    subtitle: "Merch & more",
    image: merchCaps.url,
    alt: "Official Klondike Kat caps",
  },
] as const;

export function MobilePortals() {
  return (
    <section className="hc-mobile-portals" aria-label="Explore Klondike Kat">
      {portals.map((portal) => (
        <Link key={portal.to} to={portal.to} className="hc-mobile-portal">
          <img src={portal.image} alt={portal.alt} loading="lazy" />
          <span className="hc-mobile-portal-scrim" aria-hidden="true" />
          <span className="hc-mobile-portal-copy">
            <strong>{portal.title}</strong>
            <span>{portal.subtitle}</span>
          </span>
          <ArrowRight aria-hidden="true" />
        </Link>
      ))}
    </section>
  );
}