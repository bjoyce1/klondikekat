import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger index — multiplies the base delay. */
  index?: number;
  as?: "div" | "section" | "li";
};

/**
 * Scroll-triggered fade/rise. Honours prefers-reduced-motion by rendering static content.
 */
export function Reveal({ children, className, index = 0, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.07, 0.35), ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
