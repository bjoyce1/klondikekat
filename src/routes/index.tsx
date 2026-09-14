import { createFileRoute } from "@tanstack/react-router";
import { Marquee } from "@/components/site/Marquee";
import { HomeHero } from "@/components/home/HomeHero";
import { WorldGateway } from "@/components/home/WorldGateway";
import { FeaturedRelease } from "@/components/home/FeaturedRelease";
import { LegacyPreview } from "@/components/home/LegacyPreview";
import { HomeStore } from "@/components/home/HomeStore";
import { LiveAndWork } from "@/components/home/LiveAndWork";
import { MobileDestinationNav } from "@/components/home/MobileDestinationNav";
import { MobileLatestMusic } from "@/components/home/MobileLatestMusic";
import { MobileBookingBanner } from "@/components/home/MobileBookingBanner";
import { site } from "@/lib/site-data";
import homeCss from "@/styles/home.css?url";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Klondike Kat — The Lyrical Lion | Houston Rap Legend" },
      {
        name: "description",
        content:
          "Official home of Klondike Kat, the Lyrical Lion out of South Park, Houston. Stream the catalog, tune into the Lion's Den podcast, shop music and merch, catch a show and book studio time.",
      },
      { property: "og:title", content: "Klondike Kat — The Lyrical Lion" },
      {
        property: "og:description",
        content:
          "Houston underground rap pioneer. S.P.C., Killa Klan and Wreckless Klan. Music, podcast, merch, shows and booking.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: homeCss }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MusicGroup",
          name: "Klondike Kat",
          alternateName: "The Lyrical Lion",
          genre: ["Hip Hop", "Southern Rap", "Underground Rap"],
          foundingLocation: "South Park, Houston, TX",
          email: site.bookingEmail,
          memberOf: [
            { "@type": "MusicGroup", name: "South Park Coalition" },
            { "@type": "MusicGroup", name: "Killa Klan" },
            { "@type": "MusicGroup", name: "Wreckless Klan" },
          ],
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="hc-page">
      <HomeHero />
      <MobileDestinationNav />
      <Marquee />
      <LegacyPreview />
      <MobileLatestMusic />
      <WorldGateway />
      <FeaturedRelease />
      <HomeStore />
      <LiveAndWork />
      <MobileBookingBanner />
    </div>
  );
}
