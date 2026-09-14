import { createFileRoute } from "@tanstack/react-router";
import { ScreeningRoom } from "@/components/videos/ScreeningRoom";
import videosCss from "@/styles/videos.css?url";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Videos | Klondike Kat" },
      {
        name: "description",
        content:
          "The Screening Room: Klondike Kat's visual archive, including the main edit of \u201cYou Wrong\u201d and behind-the-boards photography.",
      },
      { property: "og:title", content: "Videos | Klondike Kat" },
      {
        property: "og:description",
        content: "The Visual Archive — official visuals from Houston's Lyrical Lion.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://klondikekat.lovable.app/videos" },
      { rel: "stylesheet", href: videosCss },
    ],
  }),
  component: ScreeningRoom,
});
