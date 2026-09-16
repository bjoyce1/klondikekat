import { createFileRoute } from "@tanstack/react-router";
import { HomeExperience } from "@/components/home/HomeExperience";
import { site } from "@/lib/site-data";
import podcastCss from "@/styles/podcast.css?url";
import homeCss from "@/styles/home.css?url";

const PAGE_URL = "https://klondikekat.lovable.app/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Klondike Kat — The Lyrical Lion | Houston Rap Legend" },
      {
        name: "description",
        content:
          "Official home of Klondike Kat, the Lyrical Lion out of South Park, Houston. New album Mob Manuscript, the full catalog, merch, shows and booking.",
      },
      { property: "og:title", content: "Klondike Kat — The Lyrical Lion" },
      {
        property: "og:description",
        content:
          "Houston underground rap pioneer. New album Mob Manuscript, plus music, merch, shows and booking.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: PAGE_URL },
      { rel: "stylesheet", href: "/fonts/podcast/fonts.css" },
      { rel: "stylesheet", href: podcastCss },
      { rel: "stylesheet", href: homeCss },
    ],
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
  component: HomeExperience,
});
