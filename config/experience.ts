import { ValidSkills } from "./constants";

export interface ExperienceInterface {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: Date;
  endDate: Date | "Present";
  description: string[];
  achievements: string[];
  skills: ValidSkills[];
  companyUrl?: string;
  logo?: string;
}

export const experiences: ExperienceInterface[] = [
  {
    id: "sterlings-tech",
    position: "Full Stack MERN & NestJS Developer",
    company: "Sterlings Tech",
    location: "Onsite",
    startDate: new Date("2025-09-01"),
    endDate: "Present",
    description: [
      "Built scalable web applications using React, Next.js, and backend services with Node.js, Express.js, and NestJS.",
      "Designed secure REST APIs with JWT authentication and Role-Based Access Control (RBAC).",
      "Implemented real-time features using Socket.IO and background job processing with Redis and BullMQ.",
      "Integrated third-party services including Cloudinary, Firebase, Twilio, and AI APIs.",
      "Collaborated with designers and developers to deliver production-ready applications.",
    ],
    achievements: [
      "Delivered multiple production applications for clients.",
      "Improved backend performance and API reliability.",
      "Successfully deployed applications to AWS, Railway, Render, and Netlify.",
      "Resolved production issues and optimized application performance.",
    ],
    skills: [
      "Typescript",
      "React",
      "Next.js",
      "Node.js",
      "express.js",
      "Nest.js",
      "MongoDB",
      "MySQL",
      "Redis",
      "Socket.io",
      "AWS",
      "Docker",
    ],
    companyUrl: "https://sterlingstech.com",
  },

  {
    id: "fire-relay",
    position: "Backend Developer",
    company: "FS Programmers",
    location: "Onsite",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-07-01"),
    description: [
      "Developed enterprise backend services using NestJS and TypeScript.",
      "Implemented BullMQ workers for background processing.",
      "Used Redis for queues, caching, and job management.",
      "Worked with MySQL and TypeORM to build scalable APIs.",
      "Developed notification workflows and optimized backend performance.",
    ],
    achievements: [
      "Built scalable background job processing using BullMQ.",
      "Improved API response times and backend stability.",
      "Resolved production issues and enhanced system reliability.",
    ],
    skills: [
      "Typescript",
      "Node.js",
      "Nest.js",
      "MySQL",
      "Redis",
      "Docker",
    ],
    companyUrl: "https://www.fsprogrammers.com",
  },

  {
    id: "unified-chat",
    position: "Full Stack Developer",
    company: "Developers Hub",
    location: "Remote",
    startDate: new Date("2024-11-01"),
    endDate: new Date("2025-02-01"),
    description: [
      "Developed a real-time unified messaging platform using React, React Native, and Node.js.",
      "Implemented Socket.IO for real-time messaging and synchronization.",
      "Integrated secure authentication, push notifications, and media sharing.",
      "Worked on scalable backend APIs and message synchronization.",
    ],
    achievements: [
      "Built real-time messaging modules using Socket.IO.",
      "Optimized message synchronization and frontend performance.",
      "Improved user experience across web and mobile platforms.",
    ],
    skills: [
      "React",
      "Node.js",
      "express.js",
      "MongoDB",
      "Socket.io",
      "Typescript",
    ],
    companyUrl: "https://developershubcorp.com",
  },
];