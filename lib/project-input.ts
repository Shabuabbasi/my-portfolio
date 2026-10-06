import type { StoredProject } from "@/lib/projects-db";

const slugify = (v: string) =>
  v
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const strArr = (v: unknown) =>
  Array.isArray(v) ? v.map(str).filter(Boolean) : [];

// Validates and normalises the admin form payload. Returns an error string on failure.
export function parseProjectInput(
  body: any,
  existingId?: string
): { data: StoredProject } | { error: string } {
  const companyName = str(body?.companyName);
  const shortDescription = str(body?.shortDescription);
  if (!companyName) return { error: "Title is required" };
  if (!shortDescription) return { error: "Short description is required" };

  const id = existingId ?? (slugify(str(body?.id)) || slugify(companyName));
  if (!id) return { error: "Could not generate an id" };

  const type = body?.type === "Professional" ? "Professional" : "Personal";
  const start = new Date(str(body?.startDate));
  const end = new Date(str(body?.endDate));
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return { error: "Start and end dates are required" };
  }

  const websiteLink = str(body?.websiteLink);
  const githubLink = str(body?.githubLink);
  const coverImage = str(body?.coverImage);
  for (const link of [websiteLink, githubLink, coverImage]) {
    if (link && !/^https?:\/\//.test(link)) {
      return { error: "Links must start with http:// or https://" };
    }
  }

  return {
    data: {
      id,
      type,
      companyName,
      category: strArr(body?.category) as StoredProject["category"],
      shortDescription,
      websiteLink: websiteLink || undefined,
      githubLink: githubLink || undefined,
      coverImage: coverImage || undefined,
      techStack: strArr(body?.techStack) as StoredProject["techStack"],
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      descriptionDetails: {
        paragraphs: strArr(body?.paragraphs),
        bullets: strArr(body?.bullets),
      },
      pagesInfoArr: [],
    },
  };
}
