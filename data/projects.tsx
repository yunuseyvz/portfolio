import { ExternalLink, Award, Github, GamepadIcon, Figma, Book } from "lucide-react";
import { ReactNode } from "react";

export interface ProjectLink {
  type: string;
  href: string;
  icon?: ReactNode;
}

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
}

export const PROJECTS: Project[] = [
  {
    id: 2,
    title: "StravaViz - An Information Visualization Project",
    description: "For a university course, we developed an interactive information visualization project using Next.js. The project visualizes fitness data from our professor's Strava App.",
    year: 2025,
    slug: "stravaviz-an-information-visualization-project",
    image: "/projects/1745245379214-infovis.png",
    image_light: "/projects/1745245384069-infovis_light.png",
    tags: ["TypeScript", "Next.js", "CI/CD", "Tailwind CSS", "Recharts", "Python"],
    links: [
      {
        href: "https://stravaviz.yuemya.de/",
        icon: <ExternalLink className="h-4 w-4" />,
        type: "View"
      },
      {
        href: "/projects/excellence.jpg",
        icon: <Award className="h-4 w-4" />,
        type: "Certificate"
      }
    ],
    images: [
      "/projects/1745260872166-stravaviz_home.png",
      "/projects/1745260879390-stravaviz_bar.png",
      "/projects/1745260882596-stravaviz_pie.png"
    ],
    active: false
  },
  {
    id: 3,
    title: "dolphinmarket.de - Full Stack Web App",
    description: "A full-stack web application developed with Next.js for my family's local business. It serves as both a modern website for customers and an internal tool for employees. The platform features business information, a news section with optional web push notifications, dynamically updated opening hours that account for holidays, and a click & collect system where customers can order selected products online for in-store pickup on a chosen date. Built as a Progressive Web App (PWA), it also offers installability. To ensure privacy and full GDPR compliance, the entire system is 100% self-hosted on a Hetzner server. The tech stack includes Next.js (with API routes), Supabase for PostgreSQL, Resend for customer confirmation emails, and Coolify for easy deployment and management.",
    year: 2024,
    slug: "dolphinmarketde-full-stack-web-app",
    image: "/projects/1745258919240-dolphin_dark.png",
    image_light: "/projects/1745258964516-dolphin_light.png",
    tags: ["TypeScript", "Next.js", "CI/CD", "Tailwind CSS", "PostgreSQL", "Resend", "Web Push", "PWA", "Supabase", "Coolify", "Self-host"],
    links: [
      {
        href: "https://www.dolphinmarket.de/",
        icon: <ExternalLink className="h-4 w-4" />,
        type: "View"
      }
    ],
    images: [
      "/projects/1745258280416-dolphinmarket.de_(iPhone-14-Pro-Max).png",
      "/projects/1745258283467-admin.dolphinmarket.de_(iPhone-14-Pro-Max).png",
      "/projects/1745258546217-dolphin_bestellen.png",
      "/projects/1745259429870-admin_bestellungen.png"
    ],
    active: true
  },
  {
    id: 4,
    title: "Saturnalia - A React Quiz Game",
    description: "For a game night with friends, I developed a quiz and buzzer game using React. The game is forked from a popular open-source project and customized to fit our needs. Check it out!",
    year: 2024,
    slug: "saturnalia-a-react-quiz-game",
    image: "/projects/1745261197088-saturnalia_header.png",
    tags: ["JavaScript", "React", "Boardgame.io"],
    links: [
      {
        href: "https://github.com/yunuseyvz/saturnalia",
        icon: <Github className="h-4 w-4" />,
        type: "Source"
      },
      {
        href: "https://saturnalia.onrender.com/",
        icon: <GamepadIcon className="h-4 w-4" />,
        type: "Play"
      }
    ],
    images: [
      "/projects/1745261246209-saturnalia_home.png",
      "/projects/1745261257777-saturnalia_quizmc.png"
    ],
    active: false
  },
  {
    id: 5,
    title: "Bachelor Thesis Project",
    description: "This thesis addresses the enhancing of user detection and response to phishing through the design and implementation of visual warnings within email clients. Over a two-week period, a mixed-methods study involving 16 participants was conducted, integrating eye tracking technology and qualitative feedback to assess interactions with various phishing warning designs in Mozilla Thunderbird.\nEye tracking data revealed that immediate and prominently placed warnings are more effective, while peripheral warnings tend to be noticed later, potentially reducing their effectiveness in real-world scenarios. Qualitative feedback highlighted the importance of clarity, context, and educational content in warnings to enhance user understanding and prevent phishing attacks.\nThese findings suggest that the design of phishing warnings can have substantial implications for cybersecurity. By focusing on user-centric warning designs that are both noticeable and informative, phishing defense mechanisms can be significantly strengthened. This research contributes to the broader cybersecurity field by providing evidence-based recommendations for designing effective phishing warnings, aiming to reduce the prevalence and impact of phishing attacks across digital platforms.",
    year: 2024,
    slug: "bachelor-thesis-project",
    image: "/projects/1745245414078-bachelor.png",
    tags: ["JavaScript", "HTML/CSS", "User Studies", "Eye Tracking"],
    links: [
      {
        href: "https://github.com/yunuseyvz/Bachelorthesis_Phishing",
        icon: <Github className="h-4 w-4" />,
        type: "Source"
      },
      {
        href: "/bachelorthesis",
        icon: <Book className="h-4 w-4" />,
        type: "Read"
      }
    ],
    images: [
      "/projects/1745261441821-phishing_example1.png",
      "/projects/1745261519468-phishing_et.png"
    ],
    active: false
  },
  {
    id: 6,
    title: "MemeMuc - Full Stack Meme Generator",
    description: "As part of a course project, we developed a meme generator web application. I focused on frontend development using React, while the backend was built with Express.js + MongoDB.",
    year: 2023,
    slug: "mememuc-full-stack-meme-generator",
    image: "/projects/1745266626847-mememuc.png",
    tags: ["JavaScript", "React", "Express.js", "MongoDB"],
    links: [],
    images: [],
    active: false
  },
  {
    id: 7,
    title: "The Last Chicken - A Unity Minigame",
    description: "As part of a course project, we developed a small 2D sidescroller jump and run game using Unity. Try it out!",
    year: 2022,
    slug: "the-last-chicken-a-unity-minigame",
    image: "/projects/1745245510136-minigame.png",
    tags: ["Unity", "C#", "Game Dev"],
    links: [
      {
        href: "https://yuemya.de/game/",
        icon: <GamepadIcon className="h-4 w-4" />,
        type: "Play"
      }
    ],
    images: [],
    active: false
  },
  {
    id: 8,
    title: "Prototype: Car Pooling App",
    description: "Our team designed a prototype for a car pooling app. Through extensive user research and brainstorming sessions, we developed an interactive prototype using Figma.",
    year: 2021,
    slug: "prototype-car-pooling-app",
    image: "/projects/1745245548979-wecommuters.png",
    tags: ["Figma", "Prototyping", "User Research"],
    links: [
      {
        href: "https://www.figma.com/proto/Yeni4yv3NOmEcVuXCtPC9H/WeCommuters?node-id=6-2&starting-point-node-id=6%3A2&t=KQ80qou9GuY6kNgt-1",
        icon: <Figma className="h-4 w-4" />,
        type: "Demo"
      }
    ],
    images: [],
    active: false
  },
  {
    id: 9,
    title: "Prototype: Language Learning App",
    description: "A team project focused on practicing product prototyping through a mobile app for language learning.",
    year: 2021,
    slug: "prototype-language-learning-app",
    image: "/projects/1745245561627-walkietalkie.png",
    tags: ["Figma", "Prototyping"],
    links: [
      {
        href: "https://www.figma.com/proto/LskgvLIixXjYt6MTnyXXt2/AppPrototype?node-id=18-3&t=68zkrRk3OH4btXYn-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=18%3A3",
        icon: <Figma className="h-4 w-4" />,
        type: "Demo"
      }
    ],
    images: [],
    active: false
  },
  {
    id: 10,
    title: "RoboRally - Digital Board Game",
    description: "As part of my software development module, we developed a digital version of the board game 'RoboRally' using Java.",
    year: 2020,
    slug: "roborally-digital-board-game",
    image: "/projects/1745266715931-roborally.png",
    tags: ["Java", "JavaFX", "Agile Development", "Game Dev"],
    links: [],
    images: [],
    active: false
  },
  {
    id: 11,
    title: "yuemya.de - Personal Portfolio",
    description: "yuemya.de is my personal portfolio site, showcasing information about me and a selection of software projects I've worked on. Originally forked from a popular template, I've significantly expanded the project with features like dynamic content fetching from a PostgreSQL database and a secure admin dashboard for content management. Many more additions are planned as I continue to use the site as a playground for new technologies.",
    year: 2023,
    slug: "yuemyade-personal-portfolio",
    image: "/projects/1745262178283-portfolio.png",
    image_light: "/projects/1745262182230-portfolio_light.png",
    tags: ["TypeScript", "Next.js", "Tailwind CSS", "Auth.js", "PostgreSQL"],
    links: [
      {
        href: "https://github.com/yunuseyvz/portfolio",
        icon: <Github className="h-4 w-4" />,
        type: "Source"
      }
    ],
    images: [],
    active: true
  },
  {
    id: 12,
    title: "admin.dolphinmarket.de - Internal Admin Dashboard",
    description: "A client-side admin dashboard developed with React, TanStack, and Vite. It is used internally by my family's local business to manage orders, inventory, and website content. The application connects to a Supabase backend, which provides PostgreSQL, authentication, and file storage. Hosted on a private Hetzner server and deployed with Coolify, the system offers functionality for managing incoming orders, editing business data such as news posts, viewing statistics, and maintaining the product catalog. A planned feature includes AI-based tools to assist with accounting tasks such as automated invoice scanning and inventory updates.",
    year: 2024,
    slug: "admindolphinmarketde-internal-admin-dashboard",
    image: "/projects/1746965267365-admin_dark.png",
    image_light: "/projects/1746965270595-admin_light.png",
    tags: ["TypeScript", "React", "Tailwind CSS", "Tanstack", "Supabase", "Self-host", "Coolify"],
    links: [],
    images: [],
    active: true
  }
];

export function getProjects(): Project[] {
  return PROJECTS;
}

export function getProject(id: number): Project | undefined {
  return PROJECTS.find(project => project.id === id);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find(project => project.slug === slug);
}
