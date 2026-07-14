import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Salahudin | Full Stack MERN & NestJS Developer",
    short_name: "Salahudin",
    description:
      "Salahudin Abbasi - Full Stack MERN & NestJS Developer building scalable web apps, real-time systems, and cloud-deployed solutions.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "64x64",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: [
      "portfolio",
      "ai",
      "software engineering",
      "Full Stack MERN & NestJS",
      "developer",
      "web development",
    ],
    lang: "en",
    dir: "ltr",
    scope: "/",
  };
}
