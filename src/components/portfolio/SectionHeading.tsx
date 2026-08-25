import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  index,
  label,
  className,
}: {
  index: string;
  label: string;
  className?: string | undefined;
}) {
  return (
    <Reveal className={cn("flex items-center gap-4", className)}>
      <span className="meta text-primary">{index}</span>
      <span className="h-px w-8 shrink-0 bg-border sm:w-14" aria-hidden="true" />
      <span className="meta">{label}</span>
    </Reveal>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string | undefined;
}) {
  return (
    <section
      id={id}
      className={cn("shell scroll-mt-16 py-24 md:py-36 lg:py-44", className)}
    >
      {children}
    </section>
  );
}
