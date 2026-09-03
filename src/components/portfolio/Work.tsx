import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { projects, Project } from "@/data/portfolio";
import { ProjectMedia } from "./ProjectMedia";
import { Reveal } from "./Reveal";
import { Section, SectionHeading } from "./SectionHeading";

const FILTERS = ["All", "React", "Node", "Design", "Mobile", "Angular", "Web3"];

export function Work() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filterCounts = FILTERS.reduce(
    (acc, filter) => {
      acc[filter] =
        filter === "All"
          ? projects.length
          : projects.filter((p) => p.stack.some((s) => s.includes(filter))).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.stack.some((s) => s.includes(activeFilter)));

  const featured = filteredProjects.find((p) => p.kind === "professional");
  const others = filteredProjects.filter((p) => p !== featured);

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
                className={`meta inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-transparent border-border text-foreground hover:border-primary/50"
                  }`}
              >
                <span>{filter}</span>
                <span
                  className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-mono font-medium transition-colors ${isActive
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

      {filteredProjects.length === 0 ? (
        <div className="mt-24 py-12 text-center meta text-muted-foreground">
          No projects found for {activeFilter}.
        </div>
      ) : (
        <div key={activeFilter} style={{ animation: "fade-in 0.6s cubic-bezier(0.87, 0, 0.13, 1)" }}>
          {featured && (
            <article className="work-item mt-14 md:mt-20">
              <div className="grid gap-4 md:grid-cols-12 md:items-end">
                <div className="md:col-span-7">
                  <p className="meta text-primary">Professional product · {featured.year}</p>
                  <h3 className="display-lg mt-4">{featured.title}</h3>
                </div>
                <div className="md:col-span-4 md:col-start-9 md:pb-3">
                  <p className="text-balance text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {featured.summary}
                  </p>
                </div>
              </div>

              <Reveal className="mt-10 md:mt-16">
                <Link to="/work/$slug" params={{ slug: featured.slug }} className="group block">
                  <div className="relative">
                    <ProjectMedia
                      src={featured.image}
                      alt={featured.imageAlt}
                      width={2400}
                      height={1350}
                      className="aspect-[16/10] w-full"
                      style={{ viewTransitionName: `project-image-${featured.slug}` }}
                    />
                    {featured.secondaryImage && (
                      <div className="secondary-media-float absolute -bottom-12 -right-6 hidden w-[45%] shadow-2xl transition-transform duration-700 ease-out group-hover:-translate-y-4 group-hover:-translate-x-4 md:block lg:-right-12">
                        <ProjectMedia
                          src={featured.secondaryImage}
                          alt="Platform preview"
                          width={1200}
                          height={900}
                          className="aspect-[4/3] w-full rounded-lg ring-1 ring-white/10"
                        />
                      </div>
                    )}
                  </div>
                </Link>
              </Reveal>

              <Reveal className="mt-8 sm:mt-20 border-t border-border pt-6">
                <div className="grid grid-cols-1 gap-y-5 min-[420px]:grid-cols-2 min-[420px]:gap-y-6 sm:grid-cols-4 sm:gap-0">
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
                  <p className="meta">Also built — other projects</p>
                </Reveal>
              )}
              <ul className="mt-8 grid gap-10 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:gap-12">
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
                          className="aspect-[16/10] w-full"
                          style={{ viewTransitionName: `project-image-${project.slug}` }}
                        />
                        <div className="mt-4 flex items-baseline justify-between gap-3">
                          <h3 className="display-md min-w-0 truncate transition-colors group-hover:text-primary">
                            {project.title}
                          </h3>
                          <span className="meta shrink-0">{project.index}</span>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
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
        </div>
      )}
    </Section>
  );
}
