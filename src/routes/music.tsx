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
        content: `Klondike Kat's discography featuring the Mob Manuscript full album, The Lyrical Lion, Mobbin' Muzik Melodies, Biography Of A Made Man and the Exclusive Diamond Dre album with ${diamondDre.tracks.length} exclusive tracks.`,
      },
      { property: "og:title", content: "Music & Discography | Klondike Kat" },
      {
        property: "og:description",
        content:
          "Mob Manuscript and three decades of Houston underground rap. Albums, EPs and exclusive singles.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://klondikekat.lovable.app/music" },
      { rel: "stylesheet", href: musicCss },
    ],
  }),
  component: MusicVault,
});
