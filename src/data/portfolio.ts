import gscopePrimary from "@/assets/gscope-primary.jpg";
import gscopeSecondary from "@/assets/gscope-secondary.jpg";
import projectBlog from "@/assets/project-blog.jpg";
import projectChat from "@/assets/project-chat.jpg";

export type Project = {
  slug: string;
  index: string;
  title: string;
  kind: "professional" | "personal";
  year: string;
  context: string;
  summary: string;
  image: string;
  imageAlt: string;
  secondaryImage?: string;
  secondaryImageAlt?: string;
  stack: string[];
  product: string;
  role: string[];
  surfaces?: { name: string; note: string }[];
  features: string[];
};

export const projects: Project[] = [
  {
    slug: "gscope",
    index: "01",
    title: "GScope Healthcare Ecosystem",
    kind: "professional",
    year: "Dockcode Infotech",
    context: "Professional product work",
    summary:
      "A multi-application healthcare ecosystem connecting doctors, hospitals, pharmacies and ambulance services across mobile and web.",
    image: gscopePrimary,
    imageAlt:
      "Layered GScope healthcare mobile application interfaces floating in dark space",
    secondaryImage: gscopeSecondary,
    secondaryImageAlt: "Dark hospital administration dashboard interface with data tables",
    stack: ["Angular", "Ionic", "Laravel", "Firebase", "REST APIs"],
    product:
      "GScope is not a single app. It is a connected set of healthcare products, each serving a different role in the same care flow, sharing one backend and one design language.",
    role: [
      "Built and refined UI across the mobile applications using Angular and Ionic.",
      "Worked on admin platform interfaces backed by Laravel and REST APIs.",
      "Integrated Firebase services into the application flows.",
      "Handled responsiveness, bug fixing and interaction edge cases across devices.",
    ],
    surfaces: [
      { name: "Doctor", note: "Consultation and patient-facing flows" },
      { name: "Hospital", note: "Administrative and operational screens" },
      { name: "Pharmacy", note: "Order and inventory interfaces" },
      { name: "Ambulance", note: "Dispatch and request interfaces" },
    ],
    features: [
      "Cross-platform mobile applications built from a shared Ionic/Angular codebase",
      "Admin platform screens wired to Laravel REST endpoints",
      "Firebase integration inside production application flows",
      "Responsive interfaces tested across phone, tablet and desktop widths",
    ],
  },
  {
    slug: "blog-platform",
    index: "02",
    title: "Blog Platform",
    kind: "personal",
    year: "Personal",
    context: "Full-stack build",
    summary:
      "A full-stack publishing application built to work through API design, data modelling and authenticated content flows end to end.",
    image: projectBlog,
    imageAlt: "Abstract layered article interfaces connected to an API node diagram",
    stack: ["MongoDB", "Express.js", "Node.js", "React"],
    product:
      "A writing and publishing surface backed by a REST API — posts, authors and content state handled from database schema through to interface.",
    role: [
      "Designed the data model and REST endpoints in Express and MongoDB.",
      "Built the React client against the API, including content composition views.",
      "Handled authentication and protected routes across the stack.",
    ],
    features: [
      "REST API with CRUD across posts and users",
      "MongoDB schema and query layer",
      "React client with routing and form handling",
    ],
  },
  {
    slug: "realtime-chat",
    index: "03",
    title: "Real-Time Chat",
    kind: "personal",
    year: "Personal",
    context: "Realtime systems",
    summary:
      "A socket-driven messaging application focused on live connection state, authentication and secure credential handling.",
    image: projectChat,
    imageAlt: "Abstract network of glowing message bubbles connected by thin green lines",
    stack: ["React", "Node.js", "Socket.io", "JWT", "bcrypt", "MongoDB"],
    product:
      "Messaging where the interesting problem is not the UI but the connection: events, rooms, reconnects and identity across sockets.",
    role: [
      "Implemented the Socket.io event layer for live message delivery.",
      "Built JWT authentication with bcrypt-hashed credentials.",
      "Persisted conversations and users in MongoDB.",
    ],
    features: [
      "Live bidirectional messaging over WebSockets",
      "Token-based authentication across HTTP and socket layers",
      "Persisted message history",
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const sections = [
  { id: "intro", index: "01", label: "Intro" },
  { id: "work", index: "02", label: "Work" },
  { id: "experience", index: "03", label: "Experience" },
  { id: "stack", index: "04", label: "Stack" },
  { id: "process", index: "05", label: "Process" },
  { id: "contact", index: "06", label: "Contact" },
];

export const stackGroups = [
  { label: "Frontend", items: ["React", "Angular", "Ionic", "TypeScript", "Tailwind CSS"] },
  { label: "Backend", items: ["Node.js", "Express.js", "Laravel"] },
  { label: "Data", items: ["MongoDB", "Firebase", "MySQL"] },
  { label: "Other", items: ["REST APIs", "Socket.io", "JWT", "Git"] },
];

export const contact = {
  email: "zidanahammed@gmail.com",
  linkedin: "https://www.linkedin.com/in/zidan-ahammed",
  github: "https://github.com/zidanahammed",
  resume: "/resume.pdf",
};
