import { useEffect, useState } from "react";
import heroAtmosphere from "@/assets/hero-atmosphere.jpg";
import { useLightMotion } from "@/hooks/use-light-motion";

/**
 * Load-time per-letter entrance for the hero headline. Letters rise from
 * behind an overflow mask with a stagger; tighter stagger on light-motion
 * devices. Renders a real <h1> for document outline / SEO.
 */
function HeroTitle({
  lines,
  className,
  lightMotion,
}: {
  lines: string[];
  className?: string | undefined;
  lightMotion: boolean;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  let letterIndex = 0;
  const step = lightMotion ? 12 : 34;

  return (
    <h1 data-visible={visible ? "true" : "false"} className={className}>
      {lines.map((line, li) => (
        <span key={li} className="hero-line">
          {Array.from(line).map((ch, ci) => (
            <span
              key={ci}
              aria-hidden="true"
              className="hero-letter"
              style={{ transitionDelay: `${120 + letterIndex++ * step}ms` }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
          <span className="sr-only">{line} </span>
        </span>
      ))}
    </h1>
  );
}

export function Hero() {
  const [offset, setOffset] = useState(0);
  const lightMotion = useLightMotion();

  useEffect(() => {
    // Phones / coarse pointers: skip the scroll-driven parallax entirely.
    if (lightMotion) {
      setOffset(0);
      return;
    }
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setOffset(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [lightMotion]);

  return (
    <header className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={heroAtmosphere}
          alt=""
          width={1920}
          height={1200}
          fetchPriority="high"
          className="atmosphere h-full w-full object-cover opacity-70"
          style={
            lightMotion
              ? undefined
              : { transform: `translate3d(0, ${offset * 0.14}px, 0)` }
          }
        />
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_20%,transparent,var(--background)_78%)]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="shell relative z-10 flex flex-1 flex-col pt-7 pb-24 md:pt-10">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
          <span className="meta text-foreground">Zidan Ahammed</span>
          <span className="meta flex items-center gap-2">
            <span className="tick inline-block size-1.5 rounded-full bg-primary" />
            Open to work
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-center py-16 md:py-20">
          <HeroTitle
            className="display-xl uppercase"
            lines={["I build", "digital", "products."]}
            lightMotion={lightMotion}
          />
          <div className="mt-8 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end">
            <p className="max-w-md text-balance text-base leading-relaxed text-muted-foreground md:col-span-5 md:col-start-1">
              Full-stack developer working across interfaces, APIs and mobile
              applications — shipped in production healthcare software.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 md:col-span-5 md:col-start-8 md:justify-end">
              {["React", "Node", "Angular", "Ionic"].map((t) => (
                <span key={t} className="meta">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="hairline-t grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 pt-4">
          <span className="meta">Full-Stack Developer · Web & Mobile</span>
          <a href="#intro" className="meta transition-colors hover:text-foreground">
            Scroll ↓
          </a>
        </div>
      </div>
    </header>
  );
}
