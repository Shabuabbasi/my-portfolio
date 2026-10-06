import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { isAdmin } from "@/lib/admin-auth";
import { getDb, isDbConfigured } from "@/lib/mongodb";
import { parseProjectInput } from "@/lib/project-input";
import { getStoredProjects, StoredProject } from "@/lib/projects-db";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await getStoredProjects());
}

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json(
      { error: "MONGODB_URI is not configured" },
      { status: 500 }
    );
  }
  const parsed = parseProjectInput(await req.json().catch(() => null));
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  const db = await getDb();
  const col = db.collection<StoredProject>("projects");
  if (await col.findOne({ id: parsed.data.id })) {
    return NextResponse.json(
      { error: `A project with id "${parsed.data.id}" already exists` },
      { status: 409 }
    );
  }
  await col.insertOne({ ...parsed.data, createdAt: new Date().toISOString() });
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true, id: parsed.data.id });
}
