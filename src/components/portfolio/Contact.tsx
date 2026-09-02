import { contact } from "@/data/portfolio";
import { MaskedLines, Reveal } from "./Reveal";
import { Section, SectionHeading } from "./SectionHeading";

const linkedinHandle = contact.linkedin.split("/").filter(Boolean).pop() ?? "";
const githubHandle = contact.github.split("/").filter(Boolean).pop() ?? "";

type Channel = {
  key: string;
  label: string;
  value: string;
  href: string;
  copyValue: string;
};

const channels: Channel[] = [
  {
    key: "email",
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
    copyValue: contact.email,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    value: `in/${linkedinHandle}`,
    href: contact.linkedin,
    copyValue: contact.linkedin,
  },
  {
    key: "github",
    label: "GitHub",
    value: `@${githubHandle}`,
    href: contact.github,
    copyValue: contact.github,
  },
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
        {channels.map((channel, i) => (
          <li key={channel.key} className="border-b border-border">
            <Reveal delay={i * 80}>
              <a
                href={channel.href}
                target={channel.key === "email" ? undefined : "_blank"}
                rel="noreferrer"
                className="group grid gap-4 py-5 transition-colors hover:bg-foreground/5 md:grid-cols-[10rem_minmax(0,1fr)_auto] md:items-center md:py-7 px-4 -mx-4 rounded-lg"
              >
                <span className="meta">{channel.label}</span>
                <span className="truncate text-xl md:text-2xl">{channel.value}</span>
                <span className="meta flex items-center justify-end">
                  <span className="opacity-0 transition-all duration-300 group-hover:-translate-x-2 group-hover:opacity-100">
                    Open ↗
                  </span>
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
