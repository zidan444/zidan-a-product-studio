import { createFileRoute } from "@tanstack/react-router";
import { IndexNav } from "@/components/portfolio/IndexNav";
import { Hero } from "@/components/portfolio/Hero";
import { Intro } from "@/components/portfolio/Intro";
import { Work } from "@/components/portfolio/Work";
import { Experience } from "@/components/portfolio/Experience";
import { Stack } from "@/components/portfolio/Stack";
import { Process } from "@/components/portfolio/Process";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

const title = "Zidan Ahammed — Full-Stack Developer";
const description =
  "Full-stack developer building production web and mobile products with React, Angular, Ionic, Node and Laravel.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <a
        href="#intro"
        className="meta sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <IndexNav />
      <Hero />
      <main>
        <Intro />
        <Work />
        <Experience />
        <Stack />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
