import { Link } from "@tanstack/react-router";
import { projects } from "@/data/portfolio";
import { MaskedLines, Reveal } from "./Reveal";
import { Section, SectionHeading } from "./SectionHeading";
import { ProjectMedia } from "./ProjectMedia";

export function Work() {
  const featured = projects.find((p) => p.kind === "professional");
  const others = projects.filter((p) => p.kind !== "professional");

  return (
    <Section id="work" className="pt-0 md:pt-0">
      <SectionHeading index="02" label="Selected Work" />

      {featured && (
        <article className="mt-14 md:mt-20">
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="meta text-primary">Professional product · {featured.year}</p>
              <MaskedLines
                className="display-lg mt-4 uppercase"
                lines={["GScope", "Healthcare", "Ecosystem"]}
              />
            </div>
            <Reveal className="md:col-span-4 md:col-start-9" delay={150}>
              <p className="text-base leading-relaxed text-muted-foreground">
                {featured.summary}
              </p>
            </Reveal>
          </div>

          <Reveal className="relative mt-10 md:mt-16" delay={80}>
            <Link
              to="/work/$slug"
              params={{ slug: featured.slug }}
              aria-label={`Open case study: ${featured.title}`}
              className="block"
            >
              <ProjectMedia
                src={featured.image}
                alt={featured.imageAlt}
                width={1440}
                height={1088}
                className="aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[16/8]"
                cursorLabel="Case study"
              />
              {featured.secondaryImage && (
                <div className="mt-4 w-2/3 max-w-md sm:absolute sm:-bottom-14 sm:right-6 sm:mt-0 sm:w-2/5 lg:right-16 lg:w-[30%]">
                  <ProjectMedia
                    src={featured.secondaryImage}
                    alt={featured.secondaryImageAlt ?? ""}
                    width={1200}
                    height={900}
                    className="aspect-[4/3] border border-border shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]"
                    cursorLabel="Case study"
                  />
                </div>
              )}
            </Link>
          </Reveal>

          <div className="mt-8 grid gap-8 sm:mt-24 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {featured.stack.map((s) => (
                  <li key={s} className="meta">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="md:col-span-4" delay={100}>
              <p className="meta">Doctor · Hospital · Pharmacy · Ambulance</p>
            </Reveal>
            <Reveal className="md:col-span-3 md:text-right" delay={160}>
              <Link
                to="/work/$slug"
                params={{ slug: featured.slug }}
                className="meta inline-flex min-h-11 items-center text-foreground transition-colors hover:text-primary"
              >
                Read case study →
              </Link>
            </Reveal>
          </div>
        </article>
      )}

      <div className="mt-24 md:mt-36 lg:mt-44">
        <Reveal className="hairline-t pt-4">
          <p className="meta">Also built — personal projects</p>
        </Reveal>
        <ul className="mt-8 grid gap-12 sm:grid-cols-2 sm:gap-8 lg:gap-12">
          {others.map((project, i) => (
            <li key={project.slug}>
              <Reveal delay={i * 120}>
                <Link
                  to="/work/$slug"
                  params={{ slug: project.slug }}
                  className="group block"
                >
                  <ProjectMedia
                    src={project.image}
                    alt={project.imageAlt}
                    width={1200}
                    height={900}
                    className="aspect-[5/3] w-full"
                  />
                  <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4">
                    <h3 className="display-md truncate transition-colors group-hover:text-primary">
                      {project.title}
                    </h3>
                    <span className="meta shrink-0">{project.index}</span>
                  </div>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                    {project.stack.map((s) => (
                      <li key={s} className="meta">
                        {s}
                      </li>
                    ))}
                  </ul>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
