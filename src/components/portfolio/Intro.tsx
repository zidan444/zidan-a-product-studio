import { MaskedLines, Reveal } from "./Reveal";
import { Section, SectionHeading } from "./SectionHeading";

export function Intro() {
  return (
    <Section id="intro">
      <SectionHeading index="01" label="Intro" />
      <div className="mt-12 grid gap-10 md:mt-20 md:grid-cols-12 lg:gap-12">
        <MaskedLines
          className="display-lg uppercase md:col-span-7 lg:col-span-8"
          lines={["Full-stack", "developer building", "real products", "across web & mobile."]}
        />
        <div className="space-y-6 md:col-span-5 md:pt-3 lg:col-span-4">
          <Reveal delay={120}>
            <p className="text-base leading-relaxed text-muted-foreground">
              I work on both sides of the product — building interfaces that feel
              considered, and the APIs and data layers underneath them.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <p className="text-base leading-relaxed text-muted-foreground">
              Most of that experience comes from professional work on a healthcare
              product ecosystem, where correctness, edge cases and responsiveness
              matter more than novelty.
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
