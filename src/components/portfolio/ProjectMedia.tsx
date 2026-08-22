import { useRef, useState, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * Image surface with a cursor-following "VIEW" marker and subtle displacement.
 * Pointer-only enhancement; keyboard and touch users get the plain image.
 */
export function ProjectMedia({
  src,
  alt,
  width,
  height,
  className,
  imgClassName,
  cursorLabel = "View",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imgClassName?: string;
  cursorLabel?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={cn("group/media relative overflow-hidden bg-surface", className)}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className={cn(
          "h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/media:scale-[1.04]",
          imgClassName,
        )}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-background/20 transition-opacity duration-700 group-hover/media:opacity-0"
      />
      <span
        aria-hidden="true"
        className={cn(
          "meta pointer-events-none absolute z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 border border-primary bg-primary px-3 py-2 text-primary-foreground transition-opacity duration-300 md:flex",
          active ? "opacity-100" : "opacity-0",
        )}
        style={{ left: pos.x, top: pos.y }}
      >
        {cursorLabel} →
      </span>
    </div>
  );
}
