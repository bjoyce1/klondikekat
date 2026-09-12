import { useEffect, useRef, useState } from "react";
import type { NewSingle } from "@/lib/site-data";
import { PREVIEW_SECONDS } from "@/lib/music-catalog";

/** A single media element owns playback, including rapid track changes and route cleanup. */
export function useMusicPreview() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const source = useRef<string | null>(null);
  const request = useRef(0);
  const loading = useRef(false);
  const limit = useRef(PREVIEW_SECONDS);
  const [active, setActive] = useState<NewSingle | null>(null);
  const [playing, setPlaying] = useState(false);
  const [pending, setPending] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(PREVIEW_SECONDS);
  const [error, setError] = useState(false);

  useEffect(() => {
    const media = audioRef.current;
    if (!media) return;
    let guard: ReturnType<typeof setInterval> | undefined;
    const clearGuard = () => {
      clearInterval(guard);
      guard = undefined;
    };
    const onTime = () => {
      if (!source.current) return;
      if (media.currentTime >= limit.current) {
        media.pause();
        if (media.currentTime > limit.current) media.currentTime = limit.current;
      }
      setElapsed(Math.min(media.currentTime, limit.current));
    };
    const onPlay = () => {
      loading.current = false;
      setPending(false);
      setPlaying(true);
      clearGuard();
      guard = setInterval(onTime, 50);
    };
    const onPause = () => {
      setPlaying(false);
      clearGuard();
    };
    const onMetadata = () => {
      limit.current =
        Number.isFinite(media.duration) && media.duration > 0
          ? Math.min(PREVIEW_SECONDS, media.duration)
          : PREVIEW_SECONDS;
      setDuration(limit.current);
    };
    const onEnded = () => {
      onPause();
      setElapsed(limit.current);
    };
    const onError = () => {
      if (!source.current) return;
      loading.current = false;
      setPending(false);
      setPlaying(false);
      setError(true);
      clearGuard();
    };
    media.addEventListener("timeupdate", onTime);
    media.addEventListener("playing", onPlay);
    media.addEventListener("pause", onPause);
    media.addEventListener("loadedmetadata", onMetadata);
    media.addEventListener("ended", onEnded);
    media.addEventListener("error", onError);
    return () => {
      request.current += 1;
      clearGuard();
      media.removeEventListener("timeupdate", onTime);
      media.removeEventListener("playing", onPlay);
      media.removeEventListener("pause", onPause);
      media.removeEventListener("loadedmetadata", onMetadata);
      media.removeEventListener("ended", onEnded);
      media.removeEventListener("error", onError);
      media.pause();
      media.removeAttribute("src");
      media.load();
    };
  }, []);

  const toggle = async (single: NewSingle) => {
    const media = audioRef.current;
    if (!media || !single.audioUrl) return;
    const attempt = ++request.current;
    if (source.current === single.audioUrl && (!media.paused || loading.current)) {
      media.pause();
      loading.current = false;
      setPending(false);
      return;
    }
    if (source.current !== single.audioUrl || error) {
      media.pause();
      source.current = single.audioUrl;
      media.src = single.audioUrl;
      limit.current = PREVIEW_SECONDS;
      setDuration(PREVIEW_SECONDS);
      setElapsed(0);
      setActive(single);
    }
    if (media.currentTime >= limit.current) {
      media.currentTime = 0;
      setElapsed(0);
    }
    setError(false);
    loading.current = true;
    setPending(true);
    try {
      await media.play();
    } catch (reason) {
      if (attempt !== request.current) return;
      loading.current = false;
      setPending(false);
      setPlaying(false);
      if (!(reason instanceof DOMException && reason.name === "AbortError")) setError(true);
    }
  };
  const seek = (value: number) => {
    const media = audioRef.current;
    if (!media || media.readyState < 1) return;
    media.currentTime = Math.max(0, Math.min(limit.current, value));
    setElapsed(media.currentTime);
    if (media.currentTime >= limit.current) media.pause();
  };
  const close = () => {
    request.current += 1;
    source.current = null;
    loading.current = false;
    audioRef.current?.pause();
    audioRef.current?.removeAttribute("src");
    audioRef.current?.load();
    setActive(null);
    setPlaying(false);
    setPending(false);
    setElapsed(0);
    setError(false);
  };
  return { audioRef, active, playing, pending, elapsed, duration, error, toggle, seek, close };
}
