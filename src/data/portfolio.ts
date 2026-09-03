import gscopePrimary from "@/assets/resize platform.png";
import gscopeSecondary from "@/assets/secondary resize.png";
import projectBlog from "@/assets/blog app .png";
import projectChat from "@/assets/chatapp.png";
import resumeAsset from "@/assets/resume.pdf.asset.json";

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
      "GScope Healthcare Ecosystem interface displaying hospital command dashboard, patient appointments, pharmacy inventory, and ambulance dispatch map",
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
    slug: "gscope-admin",
    index: "02",
    title: "GScope Admin Platform",
    kind: "professional",
    year: "Dockcode Infotech",
    context: "Operational Dashboard",
    summary:
      "Operational intelligence and command dashboard for healthcare administration.",
    image: gscopeSecondary,
    imageAlt:
      "GScope Admin operational intelligence dashboard showing revenue analytics, active orders, and patient registrations",
    stack: ["Laravel", "Angular", "REST APIs"],
    product:
      "The central nervous system of the GScope ecosystem, allowing administrators to monitor hospital intake, ambulance dispatch, and pharmacy inventory in real-time.",
    role: [
      "Developed web-based operational dashboards and data tables.",
      "Integrated complex Laravel backend APIs for real-time monitoring.",
    ],
    features: [
      "Real-time operational metrics and charts",
      "Role-based access control for different healthcare providers",
    ],
  },
  {
    slug: "blog-platform",
    index: "03",
    title: "Blog Platform",
    kind: "personal",
    year: "Personal",
    context: "Full-stack build",
    summary:
      "A full-stack publishing application built to work through API design, data modelling and authenticated content flows end to end.",
    image: projectBlog,
    imageAlt: "Full-stack blog application interface showing articles, post editor, and publishing dashboard",
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
    index: "04",
    title: "Real-Time Chat",
    kind: "personal",
    year: "Personal",
    context: "Realtime systems",
    summary:
      "A socket-driven messaging application focused on live connection state, authentication and secure credential handling.",
    image: projectChat,
    imageAlt: "Real-time chat application interface featuring live messaging, conversation list, and online status",
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

export const experiences = [
  {
    company: "Dockcode Infotech",
    role: ["MEAN Stack", "Developer", "Intern"],
    date: "Mar 2026 – Jun 2026",
    description: "Production work on the GScope healthcare ecosystem — the mobile applications and the admin platform behind them.",
    responsibilities: [
      "Built Ionic/Angular mobile applications across the GScope healthcare platform",
      "Implemented appointment, consultation and prescription UI workflows",
      "Integrated Laravel REST APIs into mobile and web application flows",
      "Integrated Firebase authentication (OTP) and real-time services",
      "Investigated and resolved Android-specific production bugs",
      "Prepared and tested production Android builds",
    ]
  },
  {
    company: "Avodha",
    role: ["MERN Stack", "Developer", "Trainee"],
    date: "May 2025 – Nov 2025",
    description: "Full-stack development building robust web applications and real-time platforms.",
    responsibilities: [
      "Built full-stack web applications using React, Node.js, Express and MongoDB",
      "Built a real-time messaging platform with Socket.io and JWT/bcrypt authentication",
      "Developed a role-based content management system",
      "Implemented REST API design and protected route patterns",
    ]
  }
];

export const stackGroups = [
  { label: "Frontend", items: ["Angular", "React", "Ionic", "TypeScript"] },
  { label: "Backend", items: ["Node.js", "Express", "Laravel"] },
  { label: "Data & Services", items: ["MongoDB", "Firebase", "AWS"] },
  { label: "Mobile & Delivery", items: ["Capacitor", "Android", "Render", "Git"] },
];

export const contact = {
  email: "zidanahammed444@gmail.com",
  linkedin: "https://www.linkedin.com/in/zidan-ahammed-6730a930b",
  github: "https://github.com/zidan444",
  resume: resumeAsset.url,
};
