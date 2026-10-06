import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { isAdmin } from "@/lib/admin-auth";
import { getDb, isDbConfigured } from "@/lib/mongodb";
import { parseProjectInput } from "@/lib/project-input";
import { StoredProject } from "@/lib/projects-db";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Ctx) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json(
      { error: "MONGODB_URI is not configured" },
      { status: 500 }
    );
  }
  const { id } = await params;
  const parsed = parseProjectInput(await req.json().catch(() => null), id);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  const db = await getDb();
  const res = await db
    .collection<StoredProject>("projects")
    .updateOne({ id }, { $set: parsed.data });
  if (!res.matchedCount) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json(
      { error: "MONGODB_URI is not configured" },
      { status: 500 }
    );
  }
  const { id } = await params;
  const db = await getDb();
  await db.collection<StoredProject>("projects").deleteOne({ id });
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
