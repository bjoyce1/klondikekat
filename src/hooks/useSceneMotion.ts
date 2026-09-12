import { useEffect, type RefObject } from "react";

/** One event-driven animation frame updates all scenes without React renders. */
export function useSceneMotion(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const page = root.current;
    if (!page) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scenes = Array.from(page.querySelectorAll<HTMLElement>("[data-scene]"));
    const links = Array.from(page.querySelectorAll<HTMLAnchorElement>(".ld-chapters a"));
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = scenes[0]?.id;
      for (const scene of scenes) {
        const rect = scene.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.5) current = scene.id;
        if (rect.top > window.innerHeight || rect.bottom < 0) continue;
        const p = Math.max(
          0,
          Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)),
        );
        const travel = reduced.matches ? 1 : Math.min(1, p * 1.65);
        scene.style.setProperty("--scene-progress", reduced.matches ? "0" : String(p));
        scene.style.setProperty("--car-x", `${(1 - travel) * 100}px`);
        scene.style.setProperty("--wheel-turn", `${travel * 140}deg`);
        scene.style.setProperty("--needle-turn", `${reduced.matches ? -65 : -125 + p * 280}deg`);
        scene.style.setProperty("--smoke-scale", String(reduced.matches ? 1 : 0.75 + p * 0.7));
        scene.style.setProperty("--smoke-opacity", String(reduced.matches ? 0.2 : 0.1 + p * 0.25));
        scene.style.setProperty("--road-light", String(0.15 + travel * 0.18));
      }
      for (const link of links) {
        if (link.hash === `#${current}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset["entered"] = "true";
            observer.unobserve(entry.target);
          }
      },
      { threshold: 0.12 },
    );
    scenes.forEach((scene) => observer.observe(scene));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", schedule);
    };
  }, [root]);
}
