import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProject, projects } from "@/data/portfolio";
import { Reveal, MaskedLines } from "@/components/portfolio/Reveal";
import { ProjectMedia } from "@/components/portfolio/ProjectMedia";
import { Footer } from "@/components/portfolio/Footer";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Case study unavailable" }, { name: "robots", content: "noindex" }],
      };
    }
    const { project } = loaderData;
    const title = `${project.title} — Case Study | Zidan Ahammed`;
    return {
      meta: [
        { title },
        { name: "description", content: project.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: project.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: CaseStudyMissing,
  component: CaseStudy,
});

function CaseStudyMissing() {
  return (
    <main className="shell flex min-h-screen flex-col justify-center py-24">
      <p className="meta text-primary">404</p>
      <h1 className="display-lg mt-4 uppercase">Case study not found</h1>
      <Link to="/" className="meta mt-8 inline-flex min-h-11 items-center text-foreground">
        ← Back to index
      </Link>
    </main>
  );
}

function CaseStudy() {
  const { project } = Route.useLoaderData();
  const next = projects[(projects.findIndex((p) => p.slug === project.slug) + 1) % projects.length];

  return (
    <>
      <main className="pb-24">
        <div className="shell pt-7 md:pt-10">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <Link to="/" className="meta min-h-11 leading-[2.75rem] text-foreground">
              ← Zidan Ahammed
            </Link>
            <span className="meta">{project.index} / Case study</span>
          </div>
        </div>

        <header className="shell pt-20 pb-14 md:pt-32 md:pb-24">
          <p className="meta text-primary">
            {project.context} · {project.year}
          </p>
          <MaskedLines className="display-lg mt-5 uppercase" lines={[project.title]} />
          <div className="mt-10 grid gap-8 md:grid-cols-12">
            <Reveal className="md:col-span-6">
              <p className="text-lg leading-relaxed text-foreground/90">{project.summary}</p>
            </Reveal>
            <Reveal className="md:col-span-4 md:col-start-9" delay={120}>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {project.stack.map((s) => (
                  <li key={s} className="meta">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </header>

        <Reveal className="shell">
          <ProjectMedia
            src={project.image}
            alt={project.imageAlt}
            width={1440}
            height={1088}
            className="aspect-[4/3] w-full sm:aspect-[16/9]"
            cursorLabel=""
          />
        </Reveal>

        <div className="shell mt-24 grid gap-16 md:mt-36 md:grid-cols-12">
          <Chapter step="01" label="Product" className="md:col-span-12">
            <p className="max-w-2xl text-lg leading-relaxed text-foreground/90">
              {project.product}
            </p>
          </Chapter>

          {project.surfaces && (
            <Chapter step="02" label="Applications" className="md:col-span-12">
              <ul className="grid gap-px border-t border-border">
                {project.surfaces.map((s) => (
                  <li
                    key={s.name}
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 border-b border-border py-5 sm:flex sm:justify-between"
                  >
                    <span className="display-md">{s.name}</span>
                    <span className="meta">{s.note}</span>
                  </li>
                ))}
              </ul>
            </Chapter>
          )}

          <Chapter step={project.surfaces ? "03" : "02"} label="Role" className="md:col-span-7">
            <ul className="space-y-5">
              {project.role.map((r) => (
                <li key={r} className="flex gap-4 text-base leading-relaxed text-muted-foreground">
                  <span className="mt-2.5 h-px w-6 shrink-0 bg-primary" aria-hidden="true" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </Chapter>

          <Chapter
            step={project.surfaces ? "04" : "03"}
            label="What it involved"
            className="md:col-span-4 md:col-start-9"
          >
            <ul className="space-y-5">
              {project.features.map((f) => (
                <li key={f} className="text-base leading-relaxed text-muted-foreground">
                  {f}
                </li>
              ))}
            </ul>
          </Chapter>
        </div>

        {project.secondaryImage && (
          <Reveal className="shell mt-24 md:mt-36">
            <ProjectMedia
              src={project.secondaryImage}
              alt={project.secondaryImageAlt ?? ""}
              width={1200}
              height={900}
              className="aspect-[4/3] w-full sm:aspect-[16/9]"
              cursorLabel=""
            />
          </Reveal>
        )}

        {next && (
          <Reveal className="shell mt-28 md:mt-40">
            <Link to="/work/$slug" params={{ slug: next.slug }} className="group block hairline-t pt-6">
              <span className="meta">Next project</span>
              <span className="display-lg mt-3 block uppercase transition-colors group-hover:text-primary">
                {next.title}
              </span>
            </Link>
          </Reveal>
        )}
      </main>
      <Footer />
    </>
  );
}

function Chapter({
  step,
  label,
  children,
  className,
}: {
  step: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <div className="flex items-center gap-4">
        <span className="meta text-primary">{step}</span>
        <span className="h-px w-8 bg-border" aria-hidden="true" />
        <span className="meta">{label}</span>
      </div>
      <div className="mt-8">{children}</div>
    </Reveal>
  );
}
