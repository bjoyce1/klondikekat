import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="tap-none focus-ring fixed right-4 bottom-24 z-40 hidden size-11 cursor-pointer items-center justify-center rounded-full border border-border bg-background/85 text-primary shadow-[var(--shadow-elevated)] backdrop-blur-md transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground lg:bottom-8 lg:flex"
    >
      <ArrowUp className="size-5" aria-hidden="true" />
    </button>
  );
}
