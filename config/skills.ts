import { Icons } from "@/components/common/icons";

export interface skillsInterface {
  name: string;
  description: string;
  rating: number;
  icon: any;
}

export const skillsUnsorted: skillsInterface[] = [
  {
    name: "Node.js",
    description: "Build scalable backend services with Node.js.",
    rating: 5,
    icon: Icons.nodejs,
  },
  {
    name: "Nest.js",
    description: "Modular, production-ready APIs and backend architecture.",
    rating: 5,
    icon: Icons.nestjs,
  },
  {
    name: "express.js",
    description: "Fast and flexible REST APIs using Express.",
    rating: 4,
    icon: Icons.express,
  },
  {
    name: "Typescript",
    description: "Type-safe codebases for maintainability and reliability.",
    rating: 5,
    icon: Icons.typescript,
  },
  {
    name: "MongoDB",
    description: "Schema design and data modeling for scalable apps.",
    rating: 5,
    icon: Icons.mongodb,
  },
  {
    name: "MySQL",
    description: "Relational modeling using SQL for production systems.",
    rating: 4,
    icon: Icons.mysql,
  },
  {
    name: "Redis",
    description: "Caching and fast data structures for performance.",
    rating: 4,
    icon: Icons.netlify,
  },

  {
    name: "Socket.io",
    description: "Real-time messaging and bidirectional communication.",
    rating: 4,
    icon: Icons.socketio,
  },
  {
    name: "React",
    description: "Component-based frontends and production UI engineering.",
    rating: 4,
    icon: Icons.react,
  },
  {
    name: "Next.js",
    description: "SEO-friendly and performance-focused React applications.",
    rating: 4,
    icon: Icons.nextjs,
  },
  {
    name: "Tailwind CSS",
    description: "Modern, responsive UI development with Tailwind.",
    rating: 5,
    icon: Icons.tailwindcss,
  },
  {
    name: "AWS",
    description: "Deployment, environment management, and scalable infrastructure.",
    rating: 4,
    icon: Icons.amazonaws,
  },
  {
    name: "Framer Motion",
    description: "Smooth UI animations for a premium experience.",
    rating: 4,
    icon: Icons.sun,
  },
  {
    name: "Firebase",
    description: "Authentication and realtime services integration.",
    rating: 3,
    icon: Icons.mui,
  },
  {
    name: "Docker",
    description: "Containerized services for consistent deployments.",
    rating: 4,
    icon: Icons.laptop,
  },

  {
    name: "Netlify",
    description: "Production frontend hosting and continuous deployment.",
    rating: 4,
    icon: Icons.netlify,
  },
];



export const skills = skillsUnsorted
  .slice()
  .sort((a, b) => b.rating - a.rating);

export const featuredSkills = skills.slice(0, 6);
