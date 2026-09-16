import { createFileRoute } from "@tanstack/react-router";
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

function VideosPage() {
  return (
    <>
      <PageHero
        eyebrow="Visuals"
        title="Videos"
        lead="Official visuals and studio footage from the Kat."
      />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-20">
        <div className="grid items-start gap-5 sm:gap-8 lg:grid-cols-2">

          {videos.map((v) => (
            <article key={v.title} className="card-elevated overflow-hidden rounded-sm">
              <div className="grain relative aspect-video bg-black">
                <video
                  src={v.videoUrl}
                  poster={v.image}
                  controls
                  playsInline
                  preload="metadata"
                  aria-label={v.title}
                  className="size-full object-contain"
                />
              </div>
              <div className="p-5">
                <h2 className="text-2xl text-foreground">{v.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{v.description}</p>
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
