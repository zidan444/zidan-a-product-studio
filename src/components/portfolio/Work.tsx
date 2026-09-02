import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { projects } from "@/data/portfolio";
import { MaskedLines, Reveal } from "./Reveal";
import { Section, SectionHeading } from "./SectionHeading";
import { ProjectMedia } from "./ProjectMedia";

const FILTERS = ["All", "React", "Angular", "Node.js", "Laravel"];

export function Work() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filterCounts = FILTERS.reduce((acc, filter) => {
    if (filter === "All") {
      acc[filter] = projects.length;
    } else {
      acc[filter] = projects.filter((p) => p.stack.includes(filter)).length;
    }
    return acc;
  }, {} as Record<string, number>);

  const filteredProjects = projects.filter(
    (p) => activeFilter === "All" || p.stack.includes(activeFilter)
  );

  const featured = filteredProjects.find((p) => p.kind === "professional");
  const others = filteredProjects.filter((p) => p.kind !== "professional");

  return (
    <Section id="work">
      <SectionHeading index="02" label="Selected Work" />

      <Reveal delay={100}>
        <div className="mt-8 flex flex-wrap gap-2">
          {FILTERS.map((filter) => {
            const count = filterCounts[filter] || 0;
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`meta inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-transparent border-border text-foreground hover:border-primary/50"
                }`}
              >
                <span>{filter}</span>
                <span
                  className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-mono font-medium transition-colors ${
                    isActive
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {filteredProjects.length === 0 && (
        <div className="mt-24 py-12 text-center meta text-muted-foreground">
          No projects found for {activeFilter}.
        </div>
      )}

      {featured && (
        <article className="work-item mt-14 md:mt-20">
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="meta text-primary">Professional product · {featured.year}</p>
              <MaskedLines
                className="display-lg mt-4 uppercase"
                lines={featured.title.split(" ")}
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
                style={{ viewTransitionName: `project-image-${featured.slug}` }}
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

          {/* Editorial metadata strip — Role / Stack / Platforms */}
          <Reveal className="mt-8 sm:mt-16 border-t border-border pt-6">
            <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:gap-0">
              <div className="sm:pr-6">
                <p className="meta text-muted-foreground">Role</p>
                <p className="mt-2 text-sm leading-snug text-foreground">
                  Full-Stack<br />Developer
                </p>
              </div>
              <div className="sm:border-l sm:border-border sm:px-6">
                <p className="meta text-muted-foreground">Stack</p>
                <p className="mt-2 text-sm leading-snug text-foreground">
                  {featured.stack.join(" · ")}
                </p>
              </div>
              <div className="sm:border-l sm:border-border sm:px-6">
                <p className="meta text-muted-foreground">Platforms</p>
                <p className="mt-2 text-sm leading-snug text-foreground">
                  Web · Android · Mobile
                </p>
              </div>
              <div className="sm:border-l sm:border-border sm:pl-6 sm:text-right">
                <p className="meta text-muted-foreground">Case Study</p>
                <Link
                  to="/work/$slug"
                  params={{ slug: featured.slug }}
                  className="mt-2 inline-flex items-center gap-1 text-sm text-foreground transition-colors hover:text-primary"
                >
                  View case study <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </article>
      )}

      {others.length > 0 && (
        <div className={`transition-all duration-500 ${featured ? "mt-24 md:mt-36 lg:mt-44" : "mt-14 md:mt-20"}`}>
          {featured && (
            <Reveal className="hairline-t pt-4">
              <p className="meta">Also built — personal projects</p>
            </Reveal>
          )}
          <ul className="mt-8 grid gap-12 sm:grid-cols-2 sm:gap-8 lg:gap-12">
            {others.map((project, i) => (
              <li key={project.slug} className="work-item">
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
                      style={{ viewTransitionName: `project-image-${project.slug}` }}
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
      )}
    </Section>
  );
}
