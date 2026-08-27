import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor: a small dot that tracks the pointer exactly, trailed by a
 * ring that eases behind it. The ring expands over interactive elements.
 * Pointer-fine desktops only — never rendered on touch or reduced-motion.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    setEnabled(true);

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let hovering = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as HTMLElement | null;
      hovering = !!t?.closest("a, button, [data-cursor]");
    };

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${hovering ? 2 : 1})`;
        ringRef.current.style.opacity = hovering ? "1" : "0.45";
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70]">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 size-1.5 rounded-full bg-primary"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 size-8 rounded-full border border-primary/70 will-change-transform"
      />
    </div>
  );
}
