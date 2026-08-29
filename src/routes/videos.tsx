import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Play } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { images, videos } from "@/lib/site-data";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Videos | Klondike Kat" },
      {
        name: "description",
        content:
          "Official Klondike Kat music videos and visuals, including the main edit of \u201cYou Wrong.\u201d",
      },
      { property: "og:title", content: "Videos | Klondike Kat" },
      {
        property: "og:description",
        content: "Music videos and visuals from Houston's Lyrical Lion.",
      },
    ],
  }),
  component: VideosPage,
});

const YT_SEARCH = "https://www.youtube.com/results?search_query=Klondike+Kat";

function VideosPage() {
  return (
    <>
      <PageHero
        eyebrow="Visuals"
        title="Videos"
        lead="Official visuals and studio footage from the Kat."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          {videos.map((v) => (
            <article key={v.title} className="card-elevated hover-lift overflow-hidden rounded-sm">
              <a
                href={YT_SEARCH}
                target="_blank"
                rel="noopener noreferrer"
                className="grain group relative block aspect-video cursor-pointer overflow-hidden"
              >
                <img
                  src={v.image}
                  alt={`Still from the video ${v.title}`}
                  loading="lazy"
                  className="size-full object-cover transition-opacity duration-300 group-hover:opacity-80"
                />
                <span className="absolute inset-0 z-10 flex items-center justify-center">
                  <span className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors duration-200 group-hover:bg-primary/85">
                    <Play className="size-6" aria-hidden="true" />
                  </span>
                </span>
              </a>
              <div className="p-5">
                <h2 className="text-2xl text-foreground">{v.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{v.description}</p>
                <a
                  href={YT_SEARCH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-sweep mt-4 inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm font-bold tracking-[0.14em] text-primary uppercase"
                >
                  Watch on YouTube
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}

          <article className="card-elevated hover-lift overflow-hidden rounded-sm">
            <div className="grain media-zoom relative aspect-video">
              <img
                src={images.studioSession}
                alt="Klondike Kat during a studio session"
                loading="lazy"
                decoding="async"
                className="size-full object-cover"
              />
            </div>
            <div className="p-5">
              <h2 className="text-2xl text-foreground">In the studio</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Behind the boards on the Ties That Bind Us sessions.
              </p>
            </div>
          </article>

        </div>
      </section>
    </>
  );
}
