import { diamondDre, releases } from "./site-data";

export const SINGLE_PRICE = 1.29;
export const PREVIEW_SECONDS = 60;
export const streamingDestinations = [
  { label: "Spotify", url: "https://open.spotify.com/search/Klondike%20Kat" },
  { label: "Apple Music", url: "https://music.apple.com/us/search?term=Klondike%20Kat" },
  { label: "YouTube", url: "https://www.youtube.com/results?search_query=Klondike+Kat" },
] as const;

// Undated works follow the dated archive without implying a release date.
export const archiveReleases = releases
  .filter((release) => release.shopHandle !== diamondDre.handle)
  .sort((a, b) => {
    const yearA = a.year && /^\d{4}$/.test(a.year) ? Number(a.year) : Infinity;
    const yearB = b.year && /^\d{4}$/.test(b.year) ? Number(b.year) : Infinity;
    return yearA === yearB ? 0 : yearA - yearB;
  });
export const earliestYear = archiveReleases.find((release) => release.year)?.year;
export const releaseAnchor = (handle: string) => `music-release-${handle}`;

export function previewTime(seconds: number) {
  return `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0")}:${Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0")}`;
}
