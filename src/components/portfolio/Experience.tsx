import { experiences } from "@/data/portfolio";
import { MaskedLines, Reveal } from "./Reveal";
import { Section, SectionHeading } from "./SectionHeading";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading index="03" label="Experience" />

      <div className="mt-14 flex flex-col gap-24 md:mt-24">
        {experiences.map((exp, expIdx) => (
          <div key={exp.company} className="flex flex-col">
            <div className="grid gap-8 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <p className="meta text-primary">{exp.company}</p>
                <MaskedLines
                  className="display-lg mt-4 uppercase"
                  lines={exp.role}
                />
              </div>
              <Reveal className="md:col-span-4 md:col-start-9" delay={120}>
                <p className="meta">{exp.date}</p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {exp.description}
                </p>
              </Reveal>
            </div>

            <ul className="mt-14 grid border-t border-border md:mt-20">
              {exp.responsibilities.map((item, i) => (
                <li key={i} className="border-b border-border">
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
        ))}
      </div>
    </Section>
  );
}

