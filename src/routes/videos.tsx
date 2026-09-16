import { createFileRoute } from "@tanstack/react-router";
import { VideosExperience } from "@/components/videos/VideosExperience";
import podcastCss from "@/styles/podcast.css?url";
import videosCss from "@/styles/videos.css?url";

const PAGE_URL = "https://klondikekat.lovable.app/videos";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Videos | Klondike Kat" },
      {
        name: "description",
        content:
          "Official Klondike Kat music videos and studio visuals, including the main edit of \u201cYou Wrong.\u201d",
      },
      { property: "og:title", content: "Videos | Klondike Kat" },
      {
        property: "og:description",
        content: "Music videos and studio visuals from Houston's Lyrical Lion.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: PAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: PAGE_URL },
      { rel: "stylesheet", href: "/fonts/podcast/fonts.css" },
      { rel: "stylesheet", href: podcastCss },
      { rel: "stylesheet", href: videosCss },
    ],
  }),
  component: VideosExperience,
});
