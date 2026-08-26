import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./SectionHeading";

const steps = [
  { n: "01", title: "Understand", body: "Read the product and the user flow before writing anything." },
  { n: "02", title: "Build", body: "Turn requirements into working interfaces and systems." },
  { n: "03", title: "Refine", body: "Fix edge cases, responsiveness and interaction detail." },
  { n: "04", title: "Ship", body: "Build, test and deliver something production-ready." },
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
              <h3 className="display-md mt-4 uppercase">{step.title}</h3>
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
