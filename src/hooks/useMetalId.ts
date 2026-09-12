import { useId } from "react";

/** Stable, instance-specific SVG paint IDs across server rendering and hydration. */
export function useMetalId() {
  return `den-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
}
