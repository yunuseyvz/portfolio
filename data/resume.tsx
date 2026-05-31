import { FaJava } from "react-icons/fa";
import { Icons } from "../components/icons";
import { BookIcon, CodeIcon, HomeIcon, LockKeyholeIcon, PartyPopper, VenetianMask, ServerIcon, DatabaseIcon, Container, NetworkIcon, TerminalIcon, GitBranchIcon, Code2Icon, BracesIcon, Brain, Bot, Cpu, Sparkles, Zap, Plug, Eye, ScanEye } from "lucide-react";

export const DATA = {
  name: "Yunus Emre Yavuz",
  initials: "YY",
  url: "https://yuemya.de",
  location: "Munich, Germany",
  locationLink: "https://www.google.com/maps/place/munich",
  description:
    "i design, i build, i ship",
  summary:
   "Currently working as a software developer while pursuing my Master's in Human Computer Interaction at LMU Munich. I live in the overlap between two worlds — the human side of research and interaction design, and the machine side of writing and shipping software. I'm happiest turning fuzzy ideas into things people can actually use, and I spend my spare time exploring new tools, frameworks, and self-hosting rabbit holes.",
  avatarUrl: "/me.jpg",
  // The two sides of HCI I work between — mirrored on the home page hero.
  duality: {
    human: {
      id: "human",
      kicker: "the human side",
      label: "Design & Research",
      tagline: "Understanding people, then designing interfaces they actually enjoy.",
      verbs: ["research", "sketch", "prototype", "test"],
      accent: "text-pink-600 dark:text-pink-400",
      dot: "bg-pink-500 dark:bg-pink-400",
      border: "border-pink-500/25 dark:border-pink-400/25",
      surface: "bg-pink-500/[0.05] dark:bg-pink-400/[0.06]",
      glow: "group-hover:shadow-pink-500/20",
    },
    computer: {
      id: "computer",
      kicker: "the machine side",
      label: "Software Engineering",
      tagline: "Turning those ideas into fast, self-hosted, shipped software.",
      verbs: ["architect", "build", "deploy", "ship"],
      accent: "text-cyan-600 dark:text-cyan-400",
      dot: "bg-cyan-500 dark:bg-cyan-400",
      border: "border-cyan-500/25 dark:border-cyan-400/25",
      surface: "bg-cyan-500/[0.05] dark:bg-cyan-400/[0.06]",
      glow: "group-hover:shadow-cyan-500/20",
    },
  },
  skills: {
    "Frontend Development": [
      { name: "React", icon: Icons.react },
      { name: "Next.js", icon: Icons.nextjs },
      { name: "HTML/CSS", icon: Icons.htmlcss },
      { name: "Tailwind CSS", icon: Icons.tailwindcss },
      { name: "Redux", icon: Icons.redux },
    ],
    "Backend Development": [
      { name: "Node.js", icon: Icons.nodejs },
      { name: "REST APIs", icon: NetworkIcon },
      { name: "PostgreSQL", icon: Icons.postgresql },
      { name: "Supabase", icon: Icons.supabase },
      { name: "Auth.js", icon: LockKeyholeIcon },
    ],
    "DevOps & Infrastructure": [
      { name: "Docker", icon: Icons.docker },
      { name: "Self-Hosting", icon: Container },
      { name: "VPS Management", icon: ServerIcon },
      { name: "CI/CD", icon: GitBranchIcon },
      { name: "Nginx", icon: Icons.nginx }
    ],
    "Programming Languages": [
      { name: "TypeScript", icon: Icons.typescript },
      { name: "Python", icon: Icons.python },
      { name: "C#", icon: Icons.csharp },
      { name: "Java", icon: Icons.java },
      { name: "C/C++", icon: Icons.cplusplus }
    ],
    "Large Language Models": [
      { name: "LLM APIs", icon: Zap },
      { name: "Local LLMs", icon: Cpu },
      { name: "MCPs", icon: Plug }
    ],
    "Tools & Technologies": [
      { name: "Git", icon: Icons.git },
      { name: "Cursor", icon: Code2Icon },
      { name: "Copilot", icon: TerminalIcon },
      { name: "Figma", icon: Icons.figma },
      { name: "Unity", icon: Icons.unity }
    ]
  },
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/projects", icon: CodeIcon, label: "Projects" },
  ],
  contact: {
    email: "yunus@yuemya.de",
    tel: "",
    social: {
      GitHub: {
        name: "GitHub",
        userName: "yunuseyvz",
        url: "https://github.com/yunuseyvz",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/yunuseyvz/",
        icon: Icons.linkedin,

        navbar: true,
      },
    },
  },
  work: [
    {
      company: "Rohde & Schwarz",
      href: "https://www.rohde-schwarz.com/",
      badges: [],
      location: "Munich, Germany",
      title: "Working Student in Software Development",
      logoUrl: "/rs.png",
      period: "since 2025",
      description:
        "Fullstack development of a customer-oriented automation system for end-to-end testing in the mobile communications domain.",
      skills: ["React", "Next.js", "TypeScript", "Node.js", "Docker", "Automation"],
    },
    {
      company: "MTU Aero Engines",
      href: "https://www.mtu.de/de/",
      badges: [],
      location: "Munich, Germany",
      title: "Working Student in IT Quality & IT Governance",
      logoUrl: "/mtu.svg",
      period: "2022 - 2024",
      description:
        "Provided assistance in Software Asset Management by organizing, cataloging, and maintaining the company’s software inventory, including licenses, subscriptions, and usage data",      skills: ["Software Asset Management", "Data Management", "Compliance"],    },
    {
      company: "Münchener Hypothekenbank",
      badges: [],
      href: "https://www.mhb.de/de",
      location: "Munich, Germany",
      title: "Working Student in Private Client Real Estate Financing",
      logoUrl: "/mhb.svg",
      period: "2019 - 2020",
      description:
        "Reviewed documents, requested missing documentation, maintained data in SAP, and corresponded with customers, notaries, and banks.",
      skills: ["SAP", "Document Management", "Client Communication"],
    },
  ],
  education: [
    {
      school: "LMU Munich ",
      href: "https://lmu.de",
      degree: "Human Computer Interaction (M.Sc.)",
      logoUrl: "/lmu.svg",
      period: "since 2024",
      description: "Pursuing a Master's degree in Human Computer Interaction.",
      thesis: "",
      coursework: ["Advanced Web Tech", "Design Workshops", "Intelligent User Interfaces"],
    },
    {
      school: "LMU Munich",
      href: "https://lmu.de",
      degree: "Media Informatics (B.Sc.)",
      logoUrl: "/lmu.svg",
      period: "2019 - 2024",
      description: "Thesis Topic: Evaluating the Effectiveness of Phishing Warnings in Email Clients",
      thesis: "/bachelorthesis",
      coursework: ["Software Engineering", "Algorithms & Data Structures", "Database Systems", "Computer Graphics", "User Experience Design"],
    },
  ], 
} as const;
