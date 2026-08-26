import { MaskedLines, Reveal } from "./Reveal";
import { Section, SectionHeading } from "./SectionHeading";

const responsibilities = [
  "Mobile application development with Angular and Ionic",
  "Admin platform development against Laravel REST APIs",
  "UI development and responsive interface work",
  "Firebase integration inside production flows",
  "Bug fixing and interaction edge cases",
];

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading index="03" label="Experience" />

      <div className="mt-14 md:mt-24">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="meta text-primary">Dockcode Infotech</p>
            <MaskedLines
              className="display-lg mt-4 uppercase"
              lines={["MEAN Stack", "Developer"]}
            />
          </div>
          <Reveal className="md:col-span-4 md:col-start-9" delay={120}>
            <p className="meta">Internship → Probation</p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Production work on the GScope healthcare ecosystem — the mobile
              applications and the admin platform behind them.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid border-t border-border md:mt-20">
          {responsibilities.map((item, i) => (
            <li key={item} className="border-b border-border">
              <Reveal
                delay={i * 70}
                className="group grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-4 py-5 transition-colors hover:text-primary md:grid-cols-[4rem_minmax(0,1fr)] md:py-7"
              >
                <span className="meta text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-base leading-snug sm:text-lg md:text-2xl">{item}</span>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
