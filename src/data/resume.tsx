import { Icons } from "@/components/icons";
import { BookIcon, CodeIcon, HomeIcon, MailIcon, NotebookIcon } from "lucide-react";

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
      company: "MTU Aero Engines AG",
      href: "https://www.mtu.de/de/",
      badges: [],
      location: "Munich, Germany",
      title: "Working Student in IT Quality & IT Governance",
      logoUrl: "/mtu.svg",
      start: "2022",
      end: "2023",
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
      start: "2019",
      end: "2020",
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
      start: "2025",
      end: "2027",
      description: "Pursuing a Master's degree in Human Computer Interaction.",
      thesis: "",
    },
    {
      school: "LMU Munich",
      href: "https://lmu.de",
      degree: "Media Informatics (B.Sc.)",
      logoUrl: "/lmu.svg",
      start: "2019",
      end: "2024",
      description: "Thesis Topic: Evaluating the Effectiveness of Phishing Warnings in Email Clients",
      thesis: "/bachelorthesis.pdf",
    },
  ], 
  projects: [
    {
      title: "Information Visualization Project",
      href: "https://www.infovis07.vercel.app/",
      dates: "2025",
      active: true,
      description:
      "For a university course, we developed an interactive information visualization project using Next.js. The project visualizes fitness data from our professor's Strava App.",
      technologies: [
        "TypeScript",
        "Next.js",
        "Vercel",
        "Tailwind CSS",
        "Recharts",
        "Python",
      ],
      links: [
        {
          type: "View",
          href: "https://infovis07.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/infovis.png",
      imageLight: "/infovis_light.png",
      video: "",
    },
    {
      title: "Next.js Business Website",
      href: "https://www.dolphinmarket.de/",
      dates: "2024",
      active: true,
      description:
        "For my family's small business, I designed and developed a modern website using Next.js, Tailwind CSS and Shadcn. The website showcases business information, services, and contact details. Check it out!",
      technologies: [
        "TypeScript",
        "Next.js",
        "Vercel",
        "Tailwind CSS",
        "PostgreSQL",
      ],
      links: [
        {
          type: "View",
          href: "https://www.dolphinmarket.de/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/dolphin.png",
      imageLight: "/dolphin_light.png",
      video: "",
    },
    {
      title: "Saturnalia - A React Quiz Game",
      href: "https://saturnalia.onrender.com/",
      dates: "2024",
      active: true,
      description:
        "For a game night with friends, I developed a quiz and buzzer game using React. The game is forked from a popular open-source project and customized to fit our needs. Check it out!",
      technologies: [
        "JavaScript",
        "React",
        "Boardgame.io",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/yunuseyvz/saturnalia",
          icon: <Icons.github className="size-3" />,
        },  
        {
          type: "Play",
          href: "https://saturnalia.onrender.com/",
          icon: <Icons.game className="size-3" />,
        },  
      ],
      image: "/saturnalia.png",
      imageLight: "/saturnalia.png",
      video: "",
    },
    {
      title: "Bachelor Thesis Project",
      href: "https://github.com/yunuseyvz/Bachelorthesis_Phishing",
      dates: "2024",
      active: true,
      description:
        "My bachelor’s thesis evaluated the effectiveness of different phishing warnings in email clients, using eye-tracking technology and feedback from participants.",
      technologies: [
        "JavaScript",
        "HTML",
        "User Studies",
        "Eye Tracking",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/yunuseyvz/Bachelorthesis_Phishing",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Read",
          href: "/bachelorthesis",
          icon: <BookIcon className="size-3" />,
        },
      ],
      image: "/bachelor.png",
      imageLight: "/bachelor.png",
      video:
        "",
    },
    {
      title: "Meme Generator",
      dates: "2023",
      active: true,
      description:
        "As part of a course project, we developed a meme generator web application. I focused on frontend development using React, while the backend was built with Express.js.",
      technologies: [
        "JavaScript",
        "React",
        "Express.js",
      ],
      links: [
        {
          type: "Demo",
          href: "",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/mememuc.png",
      imageLight: "/mememuc.png",
      video:
        "",
    },
    {
      title: "2D Sidescroller Minigame",
      href: "/game",
      dates: "2022",
      active: true,
      description:
        "As part of a course project, we developed a small 2D sidescroller jump and run game using Unity.",
      technologies: [
        "Unity",
        "C#",
        "Game Development",
      ],
      links: [
        {
          type: "Play",
          href: "/game",
          icon: <Icons.game className="size-3" />,
        },
      ],
      image: "/minigame.png",
      imageLight: "/minigame.png",
      video:
        "",
    },
    {
      title: "Prototype: Car Pooling App",
      href: "https://www.figma.com/proto/Yeni4yv3NOmEcVuXCtPC9H/WeCommuters?node-id=6-2&starting-point-node-id=6%3A2&t=KQ80qou9GuY6kNgt-1",
      dates: "2021",
      active: true,
      description:
        "Our team designed a prototype for a car pooling app. Through extensive user research and brainstorming sessions, we developed an interactive prototype using Figma.",
      technologies: [
        "Figma",
        "Prototyping",
        "User Research",
      ],
      links: [
        {
          type: "Demo",
          href: "https://www.figma.com/proto/Yeni4yv3NOmEcVuXCtPC9H/WeCommuters?node-id=6-2&starting-point-node-id=6%3A2&t=KQ80qou9GuY6kNgt-1",
          icon: <Icons.figma className="size-3" />,
        },
      ],
      image: "/wecommuters.png",
      imageLight: "/wecommuters.png",
      video: "",
    },
    {
      title: "Prototype: Language Learning App",
      href: "https://www.figma.com/proto/LskgvLIixXjYt6MTnyXXt2/AppPrototype?node-id=18-3&t=68zkrRk3OH4btXYn-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=18%3A3",
      dates: "2021",
      active: true,
      description:
        "A team project focused on practicing product prototyping through a mobile app for language learning.",
      technologies: [
        "Figma",
        "Prototyping",
      ],
      links: [
        {
          type: "Demo",
          href: "https://www.figma.com/proto/LskgvLIixXjYt6MTnyXXt2/AppPrototype?node-id=18-3&t=68zkrRk3OH4btXYn-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=18%3A3",
          icon: <Icons.figma className="size-3" />,
        },
      ],
      image: "/walkietalkie.png",
      imageLight: "/walkietalkie.png",
      video: "",
    },
    {
      title: "RoboRally - Digital Board Game",
      dates: "2021",
      active: true,
      description:
        "As part of my software development module, we developed a digital version of the board game 'RoboRally' using Java.",
      technologies: [
        "Java",
        "Agile Development",
        "Game Development",
      ],
      links: [
        {
          type: "Demo",
          href: "",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/roborally.png",
      imageLight: "/roborally.png",
      video:
        "",
    },
  ],
} as const;
