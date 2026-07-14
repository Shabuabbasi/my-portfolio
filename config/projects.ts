import { ValidCategory, ValidExpType, ValidSkills } from "./constants";

interface PagesInfoInterface {
  title: string;
  imgArr?: string[];
  description?: string;
}

interface DescriptionDetailsInterface {
  paragraphs: string[];
  bullets: string[];
}

export interface ProjectInterface {
  id: string;
  type: ValidExpType;
  companyName: string;
  category: ValidCategory[];
  shortDescription: string;
  websiteLink?: string;
  githubLink?: string;
  techStack: ValidSkills[];
  startDate: Date;
  endDate: Date;
  companyLogoImg?: any;
  descriptionDetails: DescriptionDetailsInterface;
  pagesInfoArr: PagesInfoInterface[];
}

export const Projects: ProjectInterface[] = [
  {
    id: "iot-waste",
    companyName: "Smart IoT Waste Management System",
    type: "Personal",
    category: ["Full Stack", "Backend", "Web Dev"],
    shortDescription:
      "An IoT-based waste monitoring platform developed as my Final Year Project.",
    websiteLink: "https://iotwaste.netlify.app",
    techStack: [
      "React",
      "Node.js",
      "express.js",
      "MongoDB",
      "Cloudinary",
      "ESP32-CAM",
      "Arduino",
      "Railway",
      "Netlify",
    ],
    startDate: new Date("2023-01-01"),
    endDate: new Date("2023-12-01"),
    descriptionDetails: {
      paragraphs: [
        "An IoT-based waste monitoring platform developed as my Final Year Project.",
        "The system monitors garbage bins using ESP32-CAM and ultrasonic sensors. Sensor data and images are uploaded to the cloud, allowing administrators to monitor waste levels remotely.",
      ],
      bullets: [
        "ESP32-CAM integration",
        "Ultrasonic sensors",
        "Real-time monitoring",
        "Image uploads",
        "Admin Dashboard",
        "Collector Dashboard",
        "Route Optimization",
        "Authentication",
        "Cloudinary Integration",
        "Responsive Dashboard",
      ],
    },
    pagesInfoArr: [],
  },
  {
    id: "visa-booking",
    companyName: "Visa Booking Management System",
    type: "Personal",
    category: ["Full Stack", "Backend", "Web Dev"],
    shortDescription:
      "A visa appointment booking platform that allows users to manage applications, upload documents, schedule appointments, and track application status.",
    websiteLink: "https://visa-booking.netlify.app",
    techStack: ["React", "Node.js", "express.js", "MongoDB", "Tailwind CSS"],
    startDate: new Date("2023-01-01"),
    endDate: new Date("2023-06-01"),
    descriptionDetails: {
      paragraphs: [
        "A visa appointment booking platform that allows users to manage applications, upload documents, schedule appointments, and track application status.",
      ],
      bullets: [
        "Authentication",
        "Appointment Scheduling",
        "Dashboard",
        "Document Upload",
        "Status Tracking",
        "Form Validation",
      ],
    },
    pagesInfoArr: [],
  },
  {
    id: "ai-image-generator",
    companyName: "AI Image Generator",
    type: "Personal",
    category: ["Full Stack", "Backend", "Web Dev"],
    shortDescription:
      "An AI-powered web application that converts user prompts into images using AI APIs.",
    websiteLink: "https://imagegenerator-client.onrender.com",
    techStack: ["React", "Node.js", "express.js", "MongoDB", "AI APIs"],
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-01"),
    descriptionDetails: {
      paragraphs: [
        "An AI-powered web application that converts user prompts into images using AI APIs.",
      ],
      bullets: [
        "Text-to-image generation",
        "AI prompt processing",
        "Image history",
        "Image download",
        "Responsive interface",
      ],
    },
    pagesInfoArr: [],
  },
  {
    id: "eshop",
    companyName: "eShop",
    type: "Personal",
    category: ["Frontend", "Web Dev"],
    shortDescription: "A responsive e-commerce storefront developed using React.",
    websiteLink: "https://eshopon.netlify.app",
    techStack: ["React", "Vite", "Tailwind CSS"],
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-06-01"),
    descriptionDetails: {
      paragraphs: [
        "A responsive e-commerce storefront developed using React.",
      ],
      bullets: [
        "Product catalog",
        "Shopping cart",
        "Categories",
        "Search",
        "Responsive UI",
      ],
    },
    pagesInfoArr: [],
  },
  {
    id: "company-website",
    companyName: "Company Website",
    type: "Professional",
    category: ["Frontend", "Web Dev"],
    shortDescription:
      "A corporate website showcasing company services, products, and contact information.",
    websiteLink: "https://albarkatdev.netlify.app",
    techStack: ["React"],
    startDate: new Date("2023-06-01"),
    endDate: new Date("2023-08-01"),
    descriptionDetails: {
      paragraphs: [
        "A corporate website showcasing company services, products, and contact information.",
      ],
      bullets: [
        "Modern responsive design",
        "SEO optimization",
        "Contact forms",
        "Service pages",
      ],
    },
    pagesInfoArr: [],
  },
  {
    id: "client-business-website",
    companyName: "Client Business Website",
    type: "Professional",
    category: ["Frontend", "Web Dev"],
    shortDescription: "A responsive business website developed for a freelance client.",
    websiteLink: "https://effulgent-concha-f9e138.netlify.app",
    techStack: ["React"],
    startDate: new Date("2023-08-01"),
    endDate: new Date("2023-10-01"),
    descriptionDetails: {
      paragraphs: [
        "A responsive business website developed for a freelance client.",
      ],
      bullets: [
        "Responsive design",
        "Landing pages",
        "Service showcase",
        "Contact forms",
      ],
    },
    pagesInfoArr: [],
  },
  {
    id: "fire-relay",
    companyName: "FireRelay Platform",
    type: "Professional",
    category: ["Backend", "Full Stack"],
    shortDescription:
      "Enterprise backend platform for audio monitoring workflows with real-time services and background jobs.",
    techStack: [
      "Nest.js",
      "Node.js",
      "Typescript",
      "MySQL",
      "Redis",
      "Docker",
    ],
    startDate: new Date("2022-01-01"),
    endDate: new Date("2023-01-01"),
    descriptionDetails: {
      paragraphs: [
        "Developed APIs for processing audio monitoring workflows and delivering notifications.",
        "Built background workers using queues and caching to improve throughput and responsiveness.",
      ],
      bullets: [
        "Built NestJS APIs and service modules.",
        "Implemented background processing with Redis queues.",
        "Improved API performance and handled production issues.",
        "Supported deployments with containerization.",
      ],
    },
    pagesInfoArr: [
      {
        title: "Workflow APIs",
        description: "Backend endpoints for monitoring and notification flows.",
      },
    ],
  },
  {
    id: "unified-chat",
    companyName: "Unified Chat Platform",
    type: "Professional",
    category: ["Backend", "Full Stack"],
    shortDescription:
      "Real-time unified messaging platform with multi-channel conversations, Socket.IO, and mobile support.",
    techStack: [
      "React",
      "Node.js",
      "express.js",
      "MongoDB",
      "Socket.io",
      "Typescript",
      "Firebase",
    ],
    startDate: new Date("2023-01-01"),
    endDate: new Date("2024-01-01"),
    descriptionDetails: {
      paragraphs: [
        "Developed frontend and backend for a real-time chat system that unifies conversations across channels.",
        "Implemented Socket.IO message synchronization and integrated authentication and notifications.",
      ],
      bullets: [
        "Built Socket.IO real-time messaging modules.",
        "Developed APIs and integrated authentication.",
        "Optimized message synchronization and UI performance.",
        "Assisted with production deployment.",
      ],
    },
    pagesInfoArr: [
      {
        title: "Real-time Messaging",
        description: "Socket-based message updates and conversation management.",
      },
    ],
  },
];

export const featuredProjects = Projects.slice(0, 3);

