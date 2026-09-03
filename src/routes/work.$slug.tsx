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
  const isGscope = project.slug === "gscope";

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

        <header className="shell pt-16 pb-12 md:pt-32 md:pb-24">
          <p className="meta text-primary">
            {project.context} · {project.year}
          </p>
          <MaskedLines className="display-lg mt-4 uppercase" lines={[project.title]} />
          <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">{project.summary}</p>
            </Reveal>
            <Reveal className="md:col-span-4 md:col-start-9" delay={120}>
              <ul className="flex flex-wrap gap-x-4 gap-y-2 sm:gap-x-5">
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
            width={1672}
            height={941}
            className="aspect-[4/3] w-full sm:aspect-[16/9]"
            cursorLabel="Expand"
            allowExpand
            style={{ viewTransitionName: `project-image-${project.slug}` }}
          />
        </Reveal>

        <div className="shell mt-16 grid gap-12 md:mt-28 md:grid-cols-12 md:gap-16">
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

          <Chapter
            step={project.surfaces ? "03" : "02"}
            label={isGscope ? "My Contribution" : "Role"}
            className="md:col-span-7"
          >
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
              width={1920}
              height={1080}
              className="aspect-[4/3] w-full sm:aspect-[16/9]"
              cursorLabel="Expand"
              allowExpand
            />
          </Reveal>
        )}

        {/* GScope-only deep dive — My Contribution detail + technical case study */}
        {isGscope && <GscopeDeepDive />}

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

function GscopeDeepDive() {
  const flowSteps = [
    "Authentication",
    "reCAPTCHA",
    "Android lifecycle",
    "Keyboard / input",
    "Angular state",
    "Recovery",
  ];

  const contributions = [
    "Built and maintained Ionic/Angular mobile applications",
    "Implemented appointment and consultation workflows",
    "Worked on prescription workflows and product integrations",
    "Integrated Laravel APIs and Firebase services",
    "Investigated and fixed Android-specific production issues",
    "Prepared and tested production Android builds",
  ];

  return (
    <div className="shell mt-24 md:mt-36 space-y-20 md:space-y-28">

      {/* My Contribution — detailed */}
      <Reveal>
        <div className="flex items-center gap-4">
          <span className="meta text-primary">05</span>
          <span className="h-px w-8 bg-border" aria-hidden="true" />
          <span className="meta">My Contribution</span>
        </div>
        <ul className="mt-8 grid border-t border-border">
          {contributions.map((item, i) => (
            <li
              key={i}
              className="grid grid-cols-[3rem_minmax(0,1fr)] items-baseline gap-4 border-b border-border py-5 md:py-6"
            >
              <span className="meta text-primary">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-base leading-snug text-foreground/85 md:text-lg">{item}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Technical case study */}
      <div>
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="meta text-primary">06</span>
            <span className="h-px w-8 bg-border" aria-hidden="true" />
            <span className="meta">A Real Production Problem</span>
          </div>
        </Reveal>

        {/* Flow sequence */}
        <Reveal className="mt-10" delay={60}>
          <div className="flex flex-wrap items-center gap-y-3">
            {flowSteps.map((step, i) => (
              <div key={step} className="flex items-center">
                <span className="meta rounded border border-border px-3 py-2 text-foreground/90">
                  {step}
                </span>
                {i < flowSteps.length - 1 && (
                  <span className="meta mx-2 text-muted-foreground" aria-hidden="true">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Three columns */}
        <div className="mt-8 grid grid-cols-1 gap-0 border-t border-border sm:grid-cols-3">
          {[
            {
              label: "Problem",
              body: "Authentication and OTP input behaved inconsistently across Android devices after the reCAPTCHA flow. The issue surfaced in production, not in the development environment.",
            },
            {
              label: "Investigation",
              body: "The issue involved Android activity lifecycle behavior, keyboard state changes affecting the native WebView, native input handling differences, and Angular's change detection falling out of sync after native events.",
            },
            {
              label: "Solution",
              body: "Implemented recovery and cleanup logic across the authentication flow. Added native-to-Angular input bridging, explicit change detection triggers, polling and fallback behavior for OTP state, and Android-specific configuration adjustments.",
            },
          ].map((block, i) => (
            <Reveal
              key={block.label}
              delay={i * 80}
              className="border-b border-border py-8 md:border-b-0 md:border-r md:border-border md:pr-8 md:last:border-r-0 md:last:pl-8 md:[&:nth-child(2)]:px-8"
            >
              <p className="meta text-primary">{block.label}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{block.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
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
  className?: string | undefined;
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
