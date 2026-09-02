import { useRef, useState, useEffect, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

/**
 * Image surface with optional ambient blur backdrop, interactive lightbox expand,
 * and a cursor-following marker.
 */
export function ProjectMedia({
  src,
  alt,
  width,
  height,
  className,
  imgClassName,
  objectFit = "contain",
  cursorLabel = "View",
  ambientBlur = true,
  allowExpand = false,
  style,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string | undefined;
  imgClassName?: string | undefined;
  objectFit?: "cover" | "contain" | "fill" | undefined;
  cursorLabel?: string | undefined;
  ambientBlur?: boolean | undefined;
  allowExpand?: boolean | undefined;
  style?: React.CSSProperties | undefined;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen]);

  const handleContainerClick = (e: MouseEvent) => {
    if (allowExpand) {
      e.preventDefault();
      e.stopPropagation();
      setIsLightboxOpen(true);
    }
  };

  return (
    <>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onClick={handleContainerClick}
        className={cn(
          "project-media group/media relative overflow-hidden bg-black/50 flex items-center justify-center border border-border/40 rounded-lg p-1.5 sm:p-2",
          allowExpand && "cursor-zoom-in",
          className,
        )}
        style={style}
      >
        {/* Ambient Blur Backdrop for non-widescreen images */}
        {ambientBlur && objectFit === "contain" && (
          <img
            src={src}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover blur-3xl opacity-35 scale-125 select-none pointer-events-none brightness-90 transition-opacity duration-700"
          />
        )}

        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className={cn(
            "relative z-10 max-h-full max-w-full h-full w-full transition-transform duration-500 ease-out group-hover/media:scale-[1.02]",
            objectFit === "contain" ? "object-contain" : "object-cover",
            imgClassName,
          )}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 bg-background/20 transition-opacity duration-700 group-hover/media:opacity-0"
        />
        {cursorLabel && (
          <span
            aria-hidden="true"
            className={cn(
              "meta pointer-events-none absolute z-30 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 border border-primary bg-primary px-3 py-2 text-primary-foreground transition-opacity duration-300 md:flex shadow-lg",
              active ? "opacity-100" : "opacity-0",
            )}
            style={{ left: pos.x, top: pos.y }}
          >
            {allowExpand ? "Expand ↗" : `${cursorLabel} →`}
          </span>
        )}
      </div>

      {/* Fullscreen Lightbox Portal */}
      {isLightboxOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/95 backdrop-blur-xl p-4 sm:p-8 animate-in fade-in duration-200"
            onClick={() => setIsLightboxOpen(false)}
          >
            <div className="w-full max-w-6xl flex items-center justify-between py-2 text-white/80">
              <span className="meta truncate max-w-md text-xs sm:text-sm">{alt}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLightboxOpen(false);
                }}
                className="meta inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-mono text-white transition-all hover:bg-white hover:text-black"
              >
                Close ✕ <span className="hidden sm:inline text-[10px] opacity-60">(ESC)</span>
              </button>
            </div>

            <div
              className="relative flex flex-1 items-center justify-center py-4 w-full h-full max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={src}
                alt={alt}
                className="max-h-[82vh] max-w-[92vw] object-contain rounded-lg border border-white/10 shadow-2xl transition-transform duration-300 hover:scale-[1.01]"
              />
            </div>

            <div className="py-2 text-center text-xs meta text-white/50">
              Click anywhere outside or press ESC to exit fullscreen view
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

