import { ProjectInterface, Projects as staticProjects } from "@/config/projects";
import { isDbConfigured, getDb } from "@/lib/mongodb";

// Shape stored in MongoDB (dates as ISO strings so it is JSON-friendly).
export interface StoredProject
  extends Omit<ProjectInterface, "startDate" | "endDate"> {
  startDate: string;
  endDate: string;
  createdAt?: string;
}

function toProject(doc: StoredProject): ProjectInterface {
  return {
    ...doc,
    startDate: new Date(doc.startDate),
    endDate: new Date(doc.endDate),
    pagesInfoArr: doc.pagesInfoArr ?? [],
  };
}

export async function getStoredProjects(): Promise<StoredProject[]> {
  if (!isDbConfigured()) return [];
  try {
    const db = await getDb();
    const docs = await db
      .collection<StoredProject>("projects")
      .find({}, { projection: { _id: 0 } })
      .sort({ createdAt: -1 })
      .toArray();
    return docs;
  } catch (error) {
    console.error("Failed to load projects from MongoDB", error);
    return [];
  }
}

// Projects added from /admin come first, then the ones from config/projects.ts.
export async function getAllProjects(): Promise<ProjectInterface[]> {
  const stored = (await getStoredProjects()).map(toProject);
  const ids = new Set(stored.map((p) => p.id));
  return [...stored, ...staticProjects.filter((p) => !ids.has(p.id))];
}

export async function getFeaturedProjects() {
  return (await getAllProjects()).slice(0, 3);
}

export async function getProjectById(id: string) {
  return (await getAllProjects()).find((p) => p.id === id);
}
