import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./SectionHeading";

const steps = [
  {
    n: "01",
    title: "Understand",
    body: "I read the requirements and map the user flow before writing a single component. No guessing what the product should do.",
  },
  {
    n: "02",
    title: "Build",
    body: "I build feature-by-feature with live state wired in from the start — no static mockups that throw away work.",
  },
  {
    n: "03",
    title: "Refine",
    body: "I hunt edge cases: empty states, error boundaries, every device width. The 80% build is never the finished product.",
  },
  {
    n: "04",
    title: "Ship",
    body: "I test on real Android devices before handoff. Production means working in the field, not just in the browser.",
  },
];

export function Process() {
  return (
    <Section id="process">
      <SectionHeading index="05" label="How I Work" />
      <ol className="mt-12 grid gap-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 md:mt-20 lg:grid-cols-4 lg:gap-x-6">
        {steps.map((step, i) => (
          <li key={step.n}>
            <Reveal
              delay={i * 100}
              className="h-full border-t border-border pt-5 lg:pr-8"
            >
              <p className="meta text-primary">{step.n}</p>
              <h3 className="mt-4 font-display text-[clamp(1.3rem,0.85rem+1.6vw,2.4rem)] leading-[1.05] font-medium tracking-[-0.03em] uppercase">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
