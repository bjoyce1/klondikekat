import { createFileRoute } from "@tanstack/react-router";
import { PodcastExperience } from "@/components/podcast/PodcastExperience";
import podcastCss from "@/styles/podcast.css?url";

const PAGE_URL = "https://klondikekat.lovable.app/podcast";

export const Route = createFileRoute("/podcast")({
  head: () => ({
    meta: [
      { title: "The Lion’s Den Podcast | Klondike Kat" },
      {
        name: "description",
        content:
          "Enter The Lion’s Den Podcast with Klondike Kat for music, wisdom, Houston stories and horsepower culture.",
      },
      { property: "og:title", content: "The Lion’s Den Podcast | Klondike Kat" },
      {
        property: "og:description",
        content: "Music. Wisdom. Horsepower. A new podcast from Klondike Kat.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: PAGE_URL },
      { rel: "stylesheet", href: "/fonts/podcast/fonts.css" },
      { rel: "stylesheet", href: podcastCss },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "PodcastSeries",
          name: "The Lion’s Den Podcast",
          description: "Music, wisdom and horsepower with Klondike Kat.",
          url: PAGE_URL,
          author: { "@type": "Person", name: "Klondike Kat" },
        }),
      },
    ],
  }),
  component: PodcastExperience,
});
