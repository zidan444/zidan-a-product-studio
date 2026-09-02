import { contact } from "@/data/portfolio";
import { MaskedLines } from "./Reveal";

export function CallToAction() {
  return (
    <section className="shell section-y">
      <div className="hairline-t pt-12 md:pt-20">
        <MaskedLines
          className="display-lg uppercase"
          lines={["Open to new roles.", "Let's talk."]}
        />
        <div className="mt-10 flex flex-wrap items-center gap-6 md:mt-14">
          <a
            href={`mailto:${contact.email}`}
            className="group inline-flex items-center gap-3 border border-primary bg-primary px-7 py-4 text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary meta"
          >
            Send an email
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="meta inline-flex items-center gap-2 border border-border px-7 py-4 text-foreground transition-all duration-300 hover:border-primary/60 hover:text-primary"
          >
            LinkedIn ↗
          </a>
        </div>
        <p className="meta mt-8 text-muted-foreground">
          Based in India · Available for remote and on-site work
        </p>
      </div>
    </section>
  );
}
