import { createFileRoute } from "@tanstack/react-router";
import { MusicVault } from "@/components/music/MusicVault";
import { diamondDre } from "@/lib/site-data";
import musicCss from "@/styles/music.css?url";

export const Route = createFileRoute("/music")({
  head: () => ({
    meta: [
      { title: "Music & Discography | Klondike Kat" },
      {
        name: "description",
        content: `Klondike Kat's discography: The Lyrical Lion (1993), Mobbin' Muzik Melodies (1997), Biography Of A Made Man and the Exclusive Diamond Dre album with ${diamondDre.tracks.length} exclusive tracks.`,
      },
      { property: "og:title", content: "Music & Discography | Klondike Kat" },
      {
        property: "og:description",
        content:
          "Three decades of Houston underground rap. Albums, EPs and the latest exclusive singles.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://klondikekat.lovable.app/music" },
      { rel: "stylesheet", href: musicCss },
    ],
  }),
  component: MusicVault,
});
