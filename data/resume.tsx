import { Icons } from "../components/icons";
import { BookIcon, CodeIcon, HomeIcon, LockKeyholeIcon, MailIcon, PartyPopper, VenetianMask } from "lucide-react";

export const DATA = {
  name: "Yunus Emre Yavuz",
  initials: "YY",
  url: "https://yuemya.de",
  location: "Munich, Germany",
  locationLink: "https://www.google.com/maps/place/munich",
  description:
    "HCI student passionate about frontend development, UI design, and building seamless user experiences.",
  summary:
   "My name is Yunus Emre Yavuz, and I am student with a strong focus on frontend development and UI design. Currently, I am pursuing a Master's degree in Human Computer Interaction at LMU Munich. Check out my projects and feel free to reach out!",
  avatarUrl: "/me.jpg",
  skills: [
    "React",
    "Next.js",
    "Javascript/Typescript",
    "HTML/CSS",
    "Node.js",
    "REST APIs",
    "Git",
    "CI/CD",
    "Tailwind CSS",
    "Figma",
    "Unity",	
    "C#",
    "Python",
    "Java",
    "C++",
    "PostgreSQL",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/projects", icon: CodeIcon, label: "Projects" },
    { href: "/contact", icon: MailIcon, label: "Contact" },
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
      company: "Rohde & Schwarz GmbH & Co. KG",
      href: "https://www.rohde-schwarz.com/",
      badges: [],
      location: "Munich, Germany",
      title: "Working Student in Software Development",
      logoUrl: "/rs.png",
      period: "since 2025",
      description:
        "Fullstack development of a customer-oriented automation system for end-to-end testing in the mobile communications domain.",
    },
    {
      company: "MTU Aero Engines AG",
      href: "https://www.mtu.de/de/",
      badges: [],
      location: "Munich, Germany",
      title: "Working Student in IT Quality & IT Governance",
      logoUrl: "/mtu.svg",
      period: "2022 - 2024",
      description:
        "Provided assistance in Software Asset Management by organizing, cataloging, and maintaining the company’s software inventory, including licenses, subscriptions, and usage data",
    },
    {
      company: "Münchener Hypothekenbank eG",
      badges: [],
      href: "https://www.mhb.de/de",
      location: "Munich, Germany",
      title: "Working Student in Private Client Real Estate Financing",
      logoUrl: "/mhb.svg",
      period: "2019 - 2020",
      description:
        "Reviewed documents, requested missing documentation, maintained data in SAP, and corresponded with customers, notaries, and banks.",
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
    },
    {
      school: "LMU Munich",
      href: "https://lmu.de",
      degree: "Media Informatics (B.Sc.)",
      logoUrl: "/lmu.svg",
      period: "2019 - 2024",
      description: "Thesis Topic: Evaluating the Effectiveness of Phishing Warnings in Email Clients",
      thesis: "https://raw.githubusercontent.com/yunuseyvz/bachelorthesis_phishing/refs/heads/main/thesis_files/final_thesis.pdf",
    },
  ], 
} as const;
