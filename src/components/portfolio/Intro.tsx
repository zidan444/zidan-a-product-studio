import { MaskedLines, Reveal } from "./Reveal";
import { Section, SectionHeading } from "./SectionHeading";

export function Intro() {
  return (
    <Section id="intro">
      <SectionHeading index="01" label="Intro" />
      <div className="mt-12 grid gap-10 md:mt-20 md:grid-cols-12 lg:gap-12">
        <MaskedLines
          className="display-lg uppercase md:col-span-7 lg:col-span-8"
          lines={["Full-stack", "developer.", "Production", "focused."]}
        />
        <div className="space-y-6 md:col-span-5 md:pt-3 lg:col-span-4">
          <Reveal delay={120}>
            <p className="text-base leading-relaxed text-muted-foreground">
              At Dockcode Infotech, I shipped GScope — a connected healthcare platform
              serving doctors, hospitals, pharmacies and ambulance services — built on
              Angular, Ionic and Laravel, and deployed to real users on Android.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <p className="text-base leading-relaxed text-muted-foreground">
              I work on both sides of the stack: interfaces that handle edge cases and
              device sizes, and the API and data layers that power them. Correctness
              and responsiveness over novelty.
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
