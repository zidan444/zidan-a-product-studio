import { useState } from "react";
import { toast } from "sonner";
import { contact } from "@/data/portfolio";
import { MaskedLines, Reveal } from "./Reveal";
import { Section, SectionHeading } from "./SectionHeading";

const linkedinHandle = contact.linkedin.split("/").pop() ?? "";
const githubHandle = contact.github.split("/").pop() ?? "";

const externalLinks = [
  { label: "LinkedIn", value: `in/${linkedinHandle}`, href: contact.linkedin },
  { label: "GitHub", value: `@${githubHandle}`, href: contact.github },
  { label: "Resume", value: "Download PDF", href: contact.resume, download: "zidan-ahammed-resume.pdf" },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      toast.success("Email copied to clipboard", {
        description: contact.email,
      });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (permissions) — fall back to the mail client.
      window.location.href = `mailto:${contact.email}`;
    }
  };

  return (
    <Section id="contact" className="pb-16 md:pb-24">
      <SectionHeading index="06" label="Contact" />
      <MaskedLines
        className="display-xl mt-12 uppercase md:mt-20"
        lines={["Let's build", "something", "useful."]}
      />
      <ul className="mt-16 grid border-t border-border md:mt-24">
        <li className="border-b border-border">
          <Reveal>
            <button
              type="button"
              onClick={copyEmail}
              className="group grid min-h-16 w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-5 text-left transition-colors hover:text-primary md:grid-cols-[10rem_minmax(0,1fr)_auto] md:py-7"
            >
              <span className="meta">Email</span>
              <span className="hidden truncate text-2xl md:block">
                {contact.email}
              </span>
              <span className="meta shrink-0 transition-transform duration-500 group-hover:translate-x-1">
                {copied ? "Copied ✓" : "Copy →"}
              </span>
            </button>
          </Reveal>
        </li>
        {externalLinks.map((link, i) => (
          <li key={link.label} className="border-b border-border">
            <Reveal delay={(i + 1) * 80}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                download={"download" in link ? link.download : undefined}
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
