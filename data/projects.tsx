import { ExternalLink, Award, Github, GamepadIcon, Figma, Book, FileText } from "lucide-react";
import { ReactNode } from "react";

export interface ProjectLink {
  type: string;
  href: string;
  icon?: ReactNode;
}

export type ProjectCategory = "private" | "university";

export interface Project {
  id: number;
  title: string;
  description: string;
  slug: string;
  year?: number;
  tags: string[];
  image?: string;
  image_light?: string;
  images?: string[];
  content?: string;
  links?: ProjectLink[];
  active?: boolean;
  /** Hand-picked to appear in the "Selected Work" teaser on the home page. */
  featured?: boolean;
  category: ProjectCategory;
  subcategory: string;
}

export const PROJECTS: Project[] = [
  /* ═══════════════════════════════════════════════════════════════
     PRIVATE PROJECTS
     ═══════════════════════════════════════════════════════════════ */

  // ── Software Development ──────────────────────────────────────
  {
    id: 3,
    title: "dolphinmarket.de — Full Stack Web App",
    description:
      "A full-stack web application developed with Next.js for my family's local business. It serves as both a modern website for customers and an internal admin dashboard for employees. Features business information, a news section with optional web push notifications, dynamically updated opening hours that account for holidays, and a click & collect system. The admin dashboard, built with React, TanStack, and Vite, handles order & inventory management, news posts, and statistics. Built as a PWA with 100% self-hosting on Hetzner for full GDPR compliance.",
    year: 2024,
    slug: "dolphinmarketde-full-stack-web-app",
    image: "/projects/dolphin/dolphin_dark.png",
    image_light: "/projects/dolphin/dolphin_light.png",
    tags: ["TypeScript", "Next.js", "React", "CI/CD", "Tailwind CSS", "PostgreSQL", "Resend", "Web Push", "PWA", "Supabase", "Coolify", "Self-host"],
    links: [
      { href: "https://www.dolphinmarket.de/", icon: <ExternalLink className="h-4 w-4" />, type: "View" },
    ],
    images: [
      "/projects/dolphin/dolphin_dark.png",
      "/projects/dolphin/dolphin_light.png",
      "/projects/dolphin/dolphin_bestellen.png",
      "/projects/dolphin/admin_bestellungen.png",
    ],
    active: false,
    featured: true,
    category: "private",
    subcategory: "Software Development",
  },
  {
    id: 15,
    title: "amfelio.de — Recruiting Platform",
    description:
      "A custom recruiting platform built as a freelance project for a German recruitment firm. Features a public-facing website, an admin dashboard for applicant management and tracking, automated email notifications, and secure data pipelines — all running on self-hosted infrastructure with Next.js and PostgreSQL.",
    year: 2026,
    slug: "amfeliode-recruiting-platform",
    image: "/projects/amfelio/amfelio.webp",
    tags: ["TypeScript", "Next.js", "PostgreSQL", "Tailwind CSS", "Self-host", "Supabase"],
    links: [
      { href: "https://amfelio.de/", icon: <ExternalLink className="h-4 w-4" />, type: "View" },
    ],
    images: [
      "/projects/amfelio/amfelio1.webp",
      "/projects/amfelio/amfelio2.webp",
    ],
    active: false,
    featured: false,
    category: "private",
    subcategory: "Software Development",
  },
  {
    id: 11,
    title: "yuemya.de — Personal Portfolio",
    description:
      "My personal portfolio site, showcasing information about me and a selection of software projects I've worked on. Originally forked from a popular template, significantly expanded with dynamic content fetching from PostgreSQL and a secure admin dashboard for content management.",
    year: 2023,
    slug: "yuemyade-personal-portfolio",
    image: "/projects/portfolio/portfolio.png",
    image_light: "/projects/portfolio/portfolio_light.png",
    tags: ["TypeScript", "Next.js", "Tailwind CSS", "Auth.js", "PostgreSQL"],
    links: [
      { href: "https://github.com/yunuseyvz/portfolio", icon: <Github className="h-4 w-4" />, type: "Source" },
    ],
    images: [],
    active: false,
    category: "private",
    subcategory: "Software Development",
  },
  {
    id: 4,
    title: "Saturnalia — A React Quiz Game",
    description:
      "A quiz and buzzer game developed for a game night with friends. Forked from a popular open-source project and customized to fit our needs.",
    year: 2024,
    slug: "saturnalia-a-react-quiz-game",
    image: "/projects/saturnalia/saturnalia_header.png",
    tags: ["JavaScript", "React", "Boardgame.io"],
    links: [
      { href: "https://github.com/yunuseyvz/saturnalia", icon: <Github className="h-4 w-4" />, type: "Source" },
      { href: "https://saturnalia.onrender.com/", icon: <GamepadIcon className="h-4 w-4" />, type: "Play" },
    ],
    images: [
      "/projects/saturnalia/saturnalia_home.png",
      "/projects/saturnalia/saturnalia_quizmc.png",
    ],
    active: false,
    category: "private",
    subcategory: "Software Development",
  },

  // ── Experience Design & Prototyping ───────────────────────────
  {
    id: 17,
    title: "EAZI — Dynamic LED Floor Interface for Elevator Accessibility",
    description:
      "A physical interactive floor prototype that turns the area in front of an elevator cabin into a dynamic communication surface for priority accessibility. Developed as part of Design Workshop II at LMU Munich under the Intelligent Urban Machines topic, EAZI addresses elevator congestion during peak times by using subtle, non-coercive LED floor indicators to guide able-bodied passengers and reserve space for individuals in need (wheelchair users, strollers). Combines a retrofittable CNC-routed wooden floor mat with embedded WS2812B LED strips, custom ESP32 firmware and in-situ Guerrilla UX testing in a working university elevator.",
    year: 2026,
    slug: "eazi-dynamic-led-elevator-accessibility",
    image: "/projects/eazi/eazi_2.jpeg",
    tags: ["Hardware Prototyping", "ESP32", "Figma", "Design Workshop", "User Research", "Guerrilla UX Testing"],
    links: [
      { href: "https://github.com/yunuseyvz/dw2-testing", icon: <Github className="h-4 w-4" />, type: "Source" },
    ],
    images: [
      "/projects/eazi/eazi_1.jpeg",
      "/projects/eazi/eazi_2.jpeg",
      "/projects/eazi/eazi_3.jpeg",
      "/projects/eazi/eazi_4.jpeg",
      "/projects/eazi/eazi_5.png",
      "/projects/eazi/eazi_6.png",
      "/projects/eazi/demo.gif",
    ],
    active: false,
    featured: true,
    category: "university",
    subcategory: "Experience Design & Prototyping",
  },
  {
    id: 13,
    title: "TrashSjört — Smart Trash Separation",
    description:
      "A team design-workshop project reimagining household waste separation. Through user research we found that the mental load of correct recycling is a universal pain point, so we designed TrashSjört: an IKEA-inspired modular 'Smart Lid' that uses a camera and AI to detect waste types and a rotating mechanism to sort them automatically, paired with a companion app for tracking and feedback.",
    year: 2026,
    slug: "trashsjort-smart-trash-separation",
    image: "/projects/trashsjort/trashsjort.png",
    tags: ["Figma", "Prototyping", "User Research", "AI Concept", "Sustainability"],
    links: [],
    images: [
      "/projects/trashsjort/trashsjort1.png",
      "/projects/trashsjort/trashsjort2.png",
      "/projects/trashsjort/trashsjort3.png",
      "/projects/trashsjort/trashsjort4.png",
    ],
    active: false,
    featured: true,
    category: "university",
    subcategory: "Experience Design & Prototyping",
  },
  {
    id: 8,
    title: "WeCommuters — Car Pooling App Prototype",
    description:
      "A team-designed prototype for a car pooling app. Through extensive user research and brainstorming sessions, we developed an interactive high-fidelity prototype using Figma.",
    year: 2021,
    slug: "prototype-car-pooling-app",
    image: "/projects/wecommuters/wecommuters.png",
    tags: ["Figma", "Prototyping", "User Research"],
    links: [
      { href: "https://www.figma.com/proto/Yeni4yv3NOmEcVuXCtPC9H/WeCommuters?node-id=6-2&starting-point-node-id=6%3A2&t=KQ80qou9GuY6kNgt-1", icon: <Figma className="h-4 w-4" />, type: "Demo" },
    ],
    images: [],
    active: false,
    category: "university",
    subcategory: "Experience Design & Prototyping",
  },
  {
    id: 9,
    title: "WalkieTalkie — Language Learning App Prototype",
    description:
      "A team project focused on practicing product prototyping through a mobile app concept for language learning. Built as an interactive Figma prototype with multiple user flows.",
    year: 2021,
    slug: "prototype-language-learning-app",
    image: "/projects/walkietalkie/walkietalkie.png",
    tags: ["Figma", "Prototyping"],
    links: [
      { href: "https://www.figma.com/proto/LskgvLIixXjYt6MTnyXXt2/AppPrototype?node-id=18-3&t=68zkrRk3OH4btXYn-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=18%3A3", icon: <Figma className="h-4 w-4" />, type: "Demo" },
    ],
    images: [],
    active: false,
    category: "university",
    subcategory: "Experience Design & Prototyping",
  },

  // ── Software Development ────────────────────────────────────
  {
    id: 7,
    title: "The Last Chicken — Unity Minigame",
    description:
      "A small 2D sidescroller jump-and-run game developed as a course project using Unity. Features simple physics-based platforming and collectibles.",
    year: 2022,
    slug: "the-last-chicken-a-unity-minigame",
    image: "/projects/minigame/minigame.png",
    tags: ["Unity", "C#", "Game Dev"],
    links: [
      { href: "https://yuemya.de/game/", icon: <GamepadIcon className="h-4 w-4" />, type: "Play" },
    ],
    images: [],
    active: false,
    category: "university",
    subcategory: "Software Development",
  },

  /* ═══════════════════════════════════════════════════════════════
     UNIVERSITY PROJECTS
     ═══════════════════════════════════════════════════════════════ */

  // ── Software Development ────────────────────────────────────
  {
    id: 1,
    title: "Mila AR — AR Language Tutor",
    description:
      "A multilingual AR language tutor for Meta Quest, developed as part of Praktikum Augmented Reality at LMU Munich (WS25/26). Combines Speech-to-Text (STT), LLM-based dialogue, Text-to-Speech (TTS), and Vision/Object Detection for room-aware language learning. Features free conversation practice, object tagging with AR highlights, a Word Boxes spelling game, and role-play scenarios.",
    year: 2026,
    slug: "mila-ar-ar-language-tutor",
    image: "/projects/mila-ar/mila_ar.png",
    image_light: "/projects/mila-ar/mila_ar.png",
    tags: ["Unity", "C#", "LLM", "STT", "TTS", "Computer Vision", "AR", "Meta Quest"],
    links: [
      { href: "https://github.com/yunuseyvz/mila_par2526", icon: <Github className="h-4 w-4" />, type: "Source" },
    ],
    images: [
      "/projects/mila-ar/mila_ar1.png",
      "/projects/mila-ar/mila_ar2.png",
      "/projects/mila-ar/mila_ar3.png",
      "/projects/mila-ar/mila_ar4.png",
    ],
    active: false,
    featured: false,
    category: "university",
    subcategory: "Software Development",
  },
  {
    id: 16,
    title: "FlowQuest — Gamified JupyterLab Companion",
    description:
      "A gamified, context-aware JupyterLab extension that turns notebook authoring into a quest with XP, levels, ranks, missions, and quizzes. LLM-powered missions are dynamically generated from your code state. Features virtual activity cells (auto-generated quizzes, predictions, teach-backs etc.), a Flowy avatar companion, a difficulty selector and more. Built as a team of four for the Practical Intelligent Interactive Systems for Software Developers course at LMU Munich (SS26).",
    year: 2026,
    slug: "flowquest-gamified-jupyterlab-companion",
    image: "/projects/flowquest/flowquest_banner.gif",
    tags: ["TypeScript", "Python", "LLM", "JupyterLab", "React"],
    links: [
      { href: "https://github.com/yunuseyvz/piis_ss26", icon: <Github className="h-4 w-4" />, type: "Source" },
    ],
    images: [
      "/projects/flowquest/flowquest1.png",
      "/projects/flowquest/flowquest2.png",
      "/projects/flowquest/flowquest3.png",
    ],
    active: false,
    featured: false,
    category: "university",
    subcategory: "Software Development",
  },

  // ── Software Development ────────────────────────────────────
  {
    id: 2,
    title: "StravaViz — Information Visualization",
    description:
      "An interactive information visualization project developed for a university course using Next.js. Visualizes fitness data from our professor's Strava App with multiple chart types and filtering options.",
    year: 2025,
    slug: "stravaviz-an-information-visualization-project",
    image: "/projects/infovis/infovis.png",
    image_light: "/projects/infovis/infovis_light.png",
    tags: ["TypeScript", "Next.js", "CI/CD", "Tailwind CSS", "Recharts", "Python"],
    links: [
      { href: "https://stravaviz.yuemya.de/", icon: <ExternalLink className="h-4 w-4" />, type: "View" },
      { href: "/projects/infovis/excellence.jpg", icon: <Award className="h-4 w-4" />, type: "Certificate" },
    ],
    images: [
      "/projects/infovis/stravaviz_home.png",
      "/projects/infovis/stravaviz_bar.png",
    ],
    active: false,
    featured: false,
    category: "university",
    subcategory: "Software Development",
  },

  // ── Software Development ──────────────────────────────────────
  {
    id: 6,
    title: "MemeMuc — Full Stack Meme Generator",
    description:
      "A meme generator web application developed as part of a course project. I focused on frontend development using React, while the backend was built with Express.js and MongoDB.",
    year: 2023,
    slug: "mememuc-full-stack-meme-generator",
    image: "/projects/mememuc/mememuc_detail.png",
    tags: ["JavaScript", "React", "Express.js", "MongoDB"],
    links: [],
    images: [],
    active: false,
    category: "university",
    subcategory: "Software Development",
  },
  {
    id: 10,
    title: "RoboRally — Digital Board Game",
    description:
      "A digital version of the board game 'RoboRally' developed as part of a software development module using Java and JavaFX. Features turn-based movement, board elements, and multiplayer support.",
    year: 2020,
    slug: "roborally-digital-board-game",
    image: "/projects/roborally/roborally_detail.png",
    tags: ["Java", "JavaFX", "Agile Development", "Game Dev"],
    links: [],
    images: [],
    active: false,
    category: "university",
    subcategory: "Software Development",
  },

  // ── Research & Thesis ─────────────────────────────────────────
  {
    id: 5,
    title: "Bachelor Thesis — Phishing Warning Design",
    description:
      "A mixed-methods study on enhancing user detection and response to phishing through visual warning design in email clients. Involved 16 participants over two weeks, integrating eye tracking and qualitative feedback to assess interactions with various phishing warning designs in Mozilla Thunderbird.",
    year: 2024,
    slug: "bachelor-thesis-project",
    image: "/projects/bachelor-thesis/bachelor.png",
    tags: ["JavaScript", "HTML/CSS", "User Studies", "Eye Tracking"],
    links: [
      { href: "https://github.com/yunuseyvz/Bachelorthesis_Phishing", icon: <Github className="h-4 w-4" />, type: "Source" },
      { href: "/bachelorthesis", icon: <Book className="h-4 w-4" />, type: "Read" },
    ],
    images: [
      "/projects/bachelor-thesis/phishing_example1.png",
      "/projects/bachelor-thesis/phishing_et.png",
    ],
    active: false,
    featured: true,
    category: "university",
    subcategory: "Research & Thesis",
  },
  {
    id: 14,
    title: "Experimental Study on Short-Form Content",
    description:
      "An experimental study investigating the relationship between daily short-form content consumption (TikTok, Instagram Reels, YouTube Shorts) and attention span. Combined a self-developed online Stroop Test (25 trials measuring reaction time and accuracy for congruent/incongruent stimuli) with a follow-up survey on self-perceived concentration, mental fatigue, and stimulus overload. Analysis of N = 34 participants showed a moderate negative correlation between daily usage and Stroop accuracy (ρ = –0.313, p = 0.072), though not statistically significant. Conducted for the Scientific Work & Teaching module at LMU Munich.",
    year: 2025,
    slug: "wal-experimental-study-short-form-content",
    image: "/projects/wal/wal.png",
    tags: ["User Study", "Quantitative Research", "Stroop Test", "Survey Design", "Statistics"],
    links: [
      { href: "https://github.com/yunuseyvz/wal_stroop", icon: <Github className="h-4 w-4" />, type: "Source" },
      { href: "/wal-poster", icon: <FileText className="h-4 w-4" />, type: "Poster" },
    ],
    images: [
      "/projects/wal/wal1.png",
      "/projects/wal/wal2.png",
    ],
    active: false,
    featured: false,
    category: "university",
    subcategory: "Research & Thesis",
  },
];

export function getProjects(): Project[] {
  return PROJECTS;
}

/** Hand-picked projects for the home-page "Selected Work" teaser. */
export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured);
}

export function getProject(id: number): Project | undefined {
  return PROJECTS.find(project => project.id === id);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find(project => project.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return PROJECTS.filter((p) => p.category === category);
}

export function getSubcategories(category: ProjectCategory): string[] {
  const subs = new Set<string>();
  PROJECTS.filter((p) => p.category === category).forEach((p) => subs.add(p.subcategory));
  return Array.from(subs);
}

export function getAllSubcategories(): string[] {
  const subs = new Set<string>();
  PROJECTS.forEach((p) => subs.add(p.subcategory));
  return Array.from(subs);
}

export const SUBCATEGORY_META: Record<string, { icon: string; color: string; bg: string; border: string }> = {
  "Software Development": {
    icon: "code",
    color: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-500/5 dark:bg-sky-400/5",
    border: "border-sky-500/20 dark:border-sky-400/20",
  },
  "Experience Design & Prototyping": {
    icon: "pen",
    color: "text-pink-600 dark:text-pink-400",
    bg: "bg-pink-500/5 dark:bg-pink-400/5",
    border: "border-pink-500/20 dark:border-pink-400/20",
  },
  "Research & Thesis": {
    icon: "book",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/5 dark:bg-amber-400/5",
    border: "border-amber-500/20 dark:border-amber-400/20",
  },
};

/* ═══════════════════════════════════════════════════════════════
   DISCIPLINES — the two worlds I work between: design & code.
   Each subcategory maps onto one discipline so the projects page
   can tell the HCI ↔ software engineering story.
   ═══════════════════════════════════════════════════════════════ */

export type Discipline = "design" | "engineering";

/** Which world each subcategory belongs to. */
export const DISCIPLINE_OF_SUBCATEGORY: Record<string, Discipline> = {
  "Software Development": "engineering",
  "Experience Design & Prototyping": "design",
  "Research & Thesis": "design",
};

export function getDiscipline(subcategory: string): Discipline {
  return DISCIPLINE_OF_SUBCATEGORY[subcategory] ?? "engineering";
}

export interface DisciplineMeta {
  id: Discipline;
  /** small uppercase eyebrow */
  kicker: string;
  /** human-readable title */
  label: string;
  /** one-line description / voice */
  tagline: string;
  /** path-style label used in the engineering "terminal" header */
  path: string;
  icon: "pen" | "code";
  accent: string;
  accentSoft: string;
  dot: string;
  ring: string;
  border: string;
  surface: string;
  glow: string;
  /** ordered subcategories shown inside this world */
  order: string[];
}

export const DISCIPLINE_META: Record<Discipline, DisciplineMeta> = {
  design: {
    id: "design",
    kicker: "the human side",
    label: "Design & Prototyping",
    tagline: "Research, interaction design, and high-fidelity prototypes — where I figure out what to build and why.",
    path: "~/craft",
    icon: "pen",
    accent: "text-pink-600 dark:text-pink-400",
    accentSoft: "text-pink-600/70 dark:text-pink-400/70",
    dot: "bg-pink-500 dark:bg-pink-400",
    ring: "ring-pink-500/30 dark:ring-pink-400/30",
    border: "border-pink-500/25 dark:border-pink-400/25",
    surface: "bg-pink-500/[0.04] dark:bg-pink-400/[0.05]",
    glow: "group-hover/card:shadow-pink-500/10",
    order: ["Experience Design & Prototyping", "Research & Thesis"],
  },
  engineering: {
    id: "engineering",
    kicker: "the machine side",
    label: "Software Development",
    tagline: "Full-stack apps, tools, and games — where I turn ideas into shipped, self-hosted software.",
    path: "~/code",
    icon: "code",
    accent: "text-cyan-600 dark:text-cyan-400",
    accentSoft: "text-cyan-600/70 dark:text-cyan-400/70",
    dot: "bg-cyan-500 dark:bg-cyan-400",
    ring: "ring-cyan-500/30 dark:ring-cyan-400/30",
    border: "border-cyan-500/25 dark:border-cyan-400/25",
    surface: "bg-cyan-500/[0.04] dark:bg-cyan-400/[0.05]",
    glow: "group-hover/card:shadow-cyan-500/10",
    order: ["Software Development"],
  },
};

export function getProjectsByDiscipline(discipline: Discipline): Project[] {
  return PROJECTS.filter((p) => getDiscipline(p.subcategory) === discipline);
}

/**
 * Pick a source-file extension that fits a project's primary technology,
 * used for the "code window" title bar on engineering cards.
 * Order matters: earlier matches win.
 */
const EXTENSION_RULES: { match: string[]; ext: string }[] = [
  { match: ["C#", "Unity"], ext: "cs" },
  { match: ["Java", "JavaFX"], ext: "java" },
  { match: ["C/C++", "C++"], ext: "cpp" },
  { match: ["Python"], ext: "py" },
  { match: ["Next.js", "TypeScript", "React Native"], ext: "tsx" },
  { match: ["TypeScript"], ext: "ts" },
  { match: ["React", "JavaScript", "Express.js", "Boardgame.io"], ext: "jsx" },
  { match: ["HTML/CSS"], ext: "html" },
];

export function getFileExtension(project: Pick<Project, "tags">): string {
  const tags = project.tags ?? [];
  for (const rule of EXTENSION_RULES) {
    if (rule.match.some((m) => tags.includes(m))) return rule.ext;
  }
  return "tsx";
}

/** Slug-like base filename derived from a project title (part before a dash). */
export function getFileBaseName(title: string): string {
  const base = title.split(/[—–-]/)[0].trim() || title;
  return base
    .toLowerCase()
    .replace(/\.[a-z]{2,}$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Full "filename.ext" used in the engineering window/card title bars. */
export function getProjectFileName(project: Pick<Project, "title" | "tags">): string {
  return `${getFileBaseName(project.title)}.${getFileExtension(project)}`;
}
