export const COLORS = {
  background: "#000008",
  purple: "#8B5CF6",
  cyan: "#06B6D4",
  pink: "#EC4899",
} as const;

export const FONT_URL =
  "https://cdn.jsdelivr.net/npm/@pmndrs/assets@0.0.8/fonts/inter-bold.woff";

export const SKILL_GROUPS = [
  {
    title: "Frontend",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "REST API",
      "Socket.IO",
      "JWT",
    ],
  },
  {
    title: "Mobil",
    skills: ["Flutter", "React Native"],
  },
  {
    title: "Araçlar & Entegrasyon",
    skills: ["Stripe", "Supabase", "Groq AI", "Three.js", "Vercel"],
  },
] as const;

/** @deprecated use SKILL_GROUPS */
export const SKILLS = [
  { name: "Next.js", level: 95, color: COLORS.purple },
  { name: "React", level: 95, color: COLORS.cyan },
  { name: "TypeScript", level: 90, color: COLORS.purple },
  { name: "Node.js", level: 88, color: COLORS.pink },
  { name: "Express.js", level: 85, color: COLORS.pink },
  { name: "MongoDB", level: 82, color: COLORS.purple },
  { name: "PostgreSQL", level: 82, color: COLORS.purple },
  { name: "Flutter", level: 85, color: COLORS.cyan },
  { name: "Stripe", level: 85, color: COLORS.pink },
] as const;

export type Project = {
  title: string;
  description: string;
  url: string;
  color: string;
  /** public/projects/ altına koy — örn. /projects/nexora.webp */
  thumbnail?: string;
  comingSoon?: boolean;
};

export const DEMO_PROJECTS: Project[] = [
  {
    title: "Nexora",
    description: "Full-stack e-ticaret · MongoDB, Stripe, NextAuth, Groq",
    url: "https://nexora-six-wheat.vercel.app",
    color: COLORS.purple,
    thumbnail: "/projects/nexora.png",
  },
  {
    title: "Atelier",
    description: "Full-stack moda mağazası · Supabase, Stripe, JWT",
    url: "https://giyim-store.vercel.app",
    color: COLORS.cyan,
    thumbnail: "/projects/atelier.png",
  },
  {
    title: "Matchora",
    description: "Full-stack · Node.js, MongoDB, Socket.IO, JWT",
    url: "#",
    color: COLORS.pink,
    comingSoon: true,
  },
  {
    title: "AI CV Analyzer",
    description: "Groq API ile özgeçmiş analizi",
    url: "https://cv-analyzer-kohl.vercel.app",
    color: COLORS.purple,
    thumbnail: "/projects/cv-analyzer.png",
  },
  {
    title: "ShopBot",
    description: "E-ticaret için AI chatbot",
    url: "https://chatbot-demo-seven-lovat.vercel.app",
    color: COLORS.cyan,
    thumbnail: "/projects/shopbot.png",
  },
  {
    title: "Sağlık Demo",
    description: "Ön çalışma · Landing page konsepti",
    url: "https://avil-saglik.vercel.app",
    color: COLORS.purple,
    thumbnail: "/projects/saglik-demo.png",
  },
  {
    title: "Sanatçı Portfolio",
    description: "Ön çalışma · Kişisel portfolio konsepti",
    url: "https://mustafa-bardakcioglu-portfolio.vercel.app",
    color: COLORS.pink,
    thumbnail: "/projects/sanatci-portfolio.png",
  },
];

export const CLIENT_PROJECTS: Project[] = [
  {
    title: "SRNoto",
    description: "Kurumsal web sitesi · Canlı müşteri projesi",
    url: "https://srnoto.com",
    color: COLORS.cyan,
    thumbnail: "/projects/srnoto.png",
  },
];

export const PROJECTS = [...DEMO_PROJECTS, ...CLIENT_PROJECTS] as const;
