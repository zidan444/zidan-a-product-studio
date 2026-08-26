import { useEffect, useState } from "react";
import { sections } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function IndexNav() {
  const [active, setActive] = useState(sections[0]?.id ?? "intro");

  useEffect(() => {
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (!nodes.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 1] },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Desktop: vertical edge index */}
      <nav
        aria-label="Section index"
        className="fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 lg:block xl:right-7"
      >
        <ul className="group/nav flex flex-col items-end gap-3">
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className="group/item flex items-center justify-end gap-3 py-1"
                >
                  <span
                    className={cn(
                      "meta translate-x-1 opacity-0 transition-all duration-500 group-hover/nav:translate-x-0 group-hover/nav:opacity-100",
                      isActive && "translate-x-0 text-foreground opacity-100",
                    )}
                  >
                    {s.label}
                  </span>
                  <span className="meta w-6 text-right transition-colors duration-300 group-hover/item:text-foreground">
                    {s.index}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-px bg-border transition-all duration-500 group-hover/item:bg-foreground",
                      isActive ? "w-10 bg-primary group-hover/item:bg-primary" : "w-4",
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile / tablet: compact floating control */}
      <MobileIndex active={active} />
    </>
  );
}

function MobileIndex({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const current = sections.find((s) => s.id === active) ??
    sections[0] ?? { id: "intro", index: "01", label: "Intro" };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Tap-away backdrop */}
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-30 bg-background/70 transition-opacity duration-200 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <div className="fixed inset-x-0 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-40 flex justify-center px-3 sm:px-4 lg:hidden">
        <div className="w-full max-w-md border border-border bg-background/90 backdrop-blur-xl">
          <div
            id="mobile-index-panel"
            className={cn(
              "grid overflow-hidden transition-[grid-template-rows] duration-200 ease-out",
              open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
            )}
          >
            <ul
              className={cn(
                "grid min-h-0 grid-cols-2 border-b border-border sm:grid-cols-3",
                !open && "invisible",
              )}
            >
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    tabIndex={open ? undefined : -1}
                    onClick={() => setOpen(false)}
                    aria-current={active === s.id ? "true" : undefined}
                    className={cn(
                      "flex min-h-14 touch-manipulation items-center gap-2 px-4 py-3 select-none active:bg-foreground/10",
                      active === s.id ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    <span className="meta text-primary">{s.index}</span>
                    <span className="meta truncate text-current">{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-index-panel"
            aria-label={open ? "Close section index" : "Open section index"}
            className="flex min-h-14 w-full touch-manipulation items-center justify-between gap-3 px-4 select-none active:bg-foreground/10"
          >
            <span className="flex min-w-0 items-center gap-2">
              <span className="meta text-primary">{current.index}</span>
              <span className="meta truncate text-foreground">{current.label}</span>
            </span>
            <span className="meta flex shrink-0 items-center gap-2">
              {open ? "Close" : "Index"}
              <span
                aria-hidden="true"
                className={cn(
                  "inline-block transition-transform duration-200",
                  open ? "rotate-180" : "rotate-0",
                )}
              >
                ↑
              </span>
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

