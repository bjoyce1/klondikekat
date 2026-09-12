import { useEffect, type RefObject } from "react";

export function useMusicMotion(root: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const page = root.current;
    if (!page) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const hero = page.querySelector<HTMLElement>(".mv-hero");
    const entries = [...page.querySelectorAll<HTMLElement>("[data-archive-entry]")];
    const rail = page.querySelector<HTMLElement>(".mv-year-rail");
    const links = [...page.querySelectorAll<HTMLAnchorElement>(".mv-year-rail a")];
    let frame = 0;
    const update = () => {
      frame = 0;
      if (hero) {
        const rect = hero.getBoundingClientRect();
        if (rect.bottom >= 0) {
          const progress = reduced.matches ? 0 : Math.min(1, Math.max(0, -rect.top / rect.height));
          hero.style.setProperty("--vault-depth", progress.toFixed(3));
        }
      }
      let active = entries[0]?.id;
      let index = 0;
      entries.forEach((entry, i) => {
        if (entry.getBoundingClientRect().top <= innerHeight * 0.48) {
          active = entry.id;
          index = i;
        }
      });
      rail?.style.setProperty(
        "--archive-progress",
        String(index / Math.max(1, entries.length - 1)),
      );
      for (const link of links) {
        if (link.hash === `#${active}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      }
      entries.forEach((entry) => entry.toggleAttribute("data-active", entry.id === active));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const reveal = new IntersectionObserver(
      (items) => {
        for (const item of items)
          if (item.isIntersecting) {
            item.target.setAttribute("data-revealed", "true");
            reveal.unobserve(item.target);
          }
      },
      { threshold: 0.08 },
    );
    page.querySelectorAll("[data-reveal]").forEach((entry) => reveal.observe(entry));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      reveal.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", schedule);
    };
  }, [root]);
}
