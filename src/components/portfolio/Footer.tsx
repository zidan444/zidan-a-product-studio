import { contact } from "@/data/portfolio";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="shell hairline-t py-8 pb-[calc(6.5rem+env(safe-area-inset-bottom))] lg:pb-10">
      <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div className="min-w-0">
          <p className="meta text-foreground">Zidan Ahammed</p>
          <p className="meta mt-1">Full-Stack Developer</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            className="meta transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="meta transition-colors hover:text-foreground"
          >
            LinkedIn
          </a>
          <span className="meta">© {year}</span>
        </div>
      </div>
    </footer>
  );
}
