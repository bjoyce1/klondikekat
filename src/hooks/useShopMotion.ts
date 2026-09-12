import { useEffect, type RefObject } from "react";

export function useShopMotion(root: RefObject<HTMLDivElement | null>, contentKey: string) {
  useEffect(() => {
    const page = root.current;
    if (!page) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const depth = reduced.matches
        ? 0
        : Math.min(1, Math.max(0, -page.getBoundingClientRect().top / 650));
      page.style.setProperty("--shop-depth", depth.toFixed(3));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-shop-revealed", "");
            observer.unobserve(entry.target);
          }
      },
      { threshold: 0.08 },
    );
    page.querySelectorAll(".shop-reveal").forEach((element) => observer.observe(element));
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      reduced.removeEventListener("change", schedule);
    };
  }, [root, contentKey]);
}
