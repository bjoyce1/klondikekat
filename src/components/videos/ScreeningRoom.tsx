import { videos } from "@/lib/site-data";
import { ScreeningRoomHero } from "./ScreeningRoomHero";
import { VideoFeature } from "./VideoFeature";
import { VisualArchive } from "./VisualArchive";

export function ScreeningRoom() {
  const [feature] = videos;

  return (
    <div className="video-page">
      <ScreeningRoomHero />
      {feature && <VideoFeature video={feature} />}
      <VisualArchive videos={videos} />
    </div>
  );
}
