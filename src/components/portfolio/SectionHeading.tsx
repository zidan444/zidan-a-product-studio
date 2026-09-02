import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { DecodeText } from "./DecodeText";

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
      <DecodeText text={index} className="meta text-primary min-w-[2ch] inline-block" />
      <span className="h-px w-8 shrink-0 bg-border sm:w-14" aria-hidden="true" />
      <DecodeText text={label} className="meta" />
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
      className={cn("shell section-y scroll-mt-20", className)}
    >
      {children}
    </section>
  );
}
