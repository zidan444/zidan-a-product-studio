import { stackGroups } from "@/data/portfolio";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./SectionHeading";

export function Stack() {
  return (
    <Section id="stack">
      <SectionHeading index="04" label="Stack" />

      <div className="mt-14 space-y-14 md:mt-24 md:space-y-20">
        {stackGroups.map((group, gi) => (
          <Reveal key={group.label} delay={gi * 80}>
            <div className="grid gap-5 border-t border-border pt-5 md:grid-cols-12">
              <p className="meta md:col-span-3">{group.label}</p>
              <ul className="flex flex-wrap items-baseline gap-x-8 gap-y-2 md:col-span-9">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="display-md cursor-default text-muted-foreground transition-all duration-500 hover:text-foreground hover:[text-shadow:0_0_28px_color-mix(in_oklab,var(--color-primary)_45%,transparent)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
