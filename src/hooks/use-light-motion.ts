import { useEffect, useState } from "react";

/**
 * True when the device should run a reduced motion budget:
 * small viewports, coarse pointers, or an explicit reduced-motion preference.
 * Keeps scroll/transition work cheap on phones.
 */
export function useLightMotion() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const queries = [
      window.matchMedia("(prefers-reduced-motion: reduce)"),
      window.matchMedia("(max-width: 767px)"),
      window.matchMedia("(hover: none) and (pointer: coarse)"),
    ];
    const update = () => setLight(queries.some((q) => q.matches));
    update();
    queries.forEach((q) => q.addEventListener("change", update));
    return () => queries.forEach((q) => q.removeEventListener("change", update));
  }, []);

  return light;
}
