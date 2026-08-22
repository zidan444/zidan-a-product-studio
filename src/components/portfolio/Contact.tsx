import { contact } from "@/data/portfolio";
import { MaskedLines, Reveal } from "./Reveal";
import { Section, SectionHeading } from "./SectionHeading";

const links = [
  { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { label: "LinkedIn", value: "in/zidan-ahammed", href: contact.linkedin },
  { label: "GitHub", value: "@zidanahammed", href: contact.github },
  { label: "Resume", value: "Download PDF", href: contact.resume },
];

export function Contact() {
  return (
    <Section id="contact" className="pb-16 md:pb-24">
      <SectionHeading index="06" label="Contact" />
      <MaskedLines
        className="display-xl mt-12 uppercase md:mt-20"
        lines={["Let's build", "something", "useful."]}
      />
      <ul className="mt-16 grid border-t border-border md:mt-24">
        {links.map((link, i) => (
          <li key={link.label} className="border-b border-border">
            <Reveal delay={i * 80}>
              <a
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
                className="group grid min-h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-5 transition-colors hover:text-primary md:grid-cols-[10rem_minmax(0,1fr)_auto] md:py-7"
              >
                <span className="meta">{link.label}</span>
                <span className="hidden truncate text-2xl md:block">{link.value}</span>
                <span className="meta shrink-0 transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
