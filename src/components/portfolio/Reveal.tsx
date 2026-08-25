import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function useInView<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

type RevealProps = {
  children: ReactNode;
  className?: string | undefined;
  delay?: number | undefined;
  as?: ElementType | undefined;
};

export function Reveal({ children, className, delay = 0, as: Tag = "div" }: RevealProps) {
  const { ref, visible } = useInView<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      data-visible={visible ? "true" : "false"}
      className={cn("reveal", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

export function MaskedLines({
  lines,
  className,
  lineClassName,
}: {
  lines: string[];
  className?: string | undefined;
  lineClassName?: string | undefined;
}) {
  const { ref, visible } = useInView<HTMLDivElement>(0.25);

  return (
    <div ref={ref} data-visible={visible ? "true" : "false"} className={className}>
      {lines.map((line, i) => (
        <span key={line + i} className={cn("mask-line", lineClassName)}>
          <span style={{ transitionDelay: `${i * 90}ms` }}>{line}</span>
        </span>
      ))}
    </div>
  );
}
