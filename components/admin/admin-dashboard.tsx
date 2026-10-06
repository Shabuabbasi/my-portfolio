"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { StoredProject } from "@/lib/projects-db";

const CATEGORIES = [
  "Full Stack",
  "Frontend",
  "Backend",
  "UI/UX",
  "Web Dev",
  "Mobile Dev",
  "3D Modeling",
];

interface FormState {
  id: string;
  editing: boolean;
  companyName: string;
  type: "Personal" | "Professional";
  category: string[];
  shortDescription: string;
  websiteLink: string;
  githubLink: string;
  coverImage: string;
  techStack: string;
  startDate: string;
  endDate: string;
  paragraphs: string;
  bullets: string;
}

const emptyForm: FormState = {
  id: "",
  editing: false,
  companyName: "",
  type: "Personal",
  category: [],
  shortDescription: "",
  websiteLink: "",
  githubLink: "",
  coverImage: "",
  techStack: "",
  startDate: "",
  endDate: "",
  paragraphs: "",
  bullets: "",
};

const toDateInput = (iso: string) => iso.slice(0, 10);
const lines = (v: string) =>
  v
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

function fromProject(p: StoredProject): FormState {
  return {
    id: p.id,
    editing: true,
    companyName: p.companyName,
    type: p.type,
    category: p.category,
    shortDescription: p.shortDescription,
    websiteLink: p.websiteLink ?? "",
    githubLink: p.githubLink ?? "",
    coverImage: p.coverImage ?? "",
    techStack: p.techStack.join(", "),
    startDate: toDateInput(p.startDate),
    endDate: toDateInput(p.endDate),
    paragraphs: p.descriptionDetails.paragraphs.join("\n"),
    bullets: p.descriptionDetails.bullets.join("\n"),
  };
}

const selectClass =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium">{label}</span>
      {children}
      {hint && <span className="block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

export default function AdminDashboard({
  projects,
  dbConfigured,
  builtInProjects,
}: {
  projects: StoredProject[];
  dbConfigured: boolean;
  builtInProjects: string[];
}) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(
    null
  );
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  function toggleCategory(cat: string) {
    set(
      "category",
      form.category.includes(cat)
        ? form.category.filter((c) => c !== cat)
        : [...form.category, cat]
    );
  }

  async function onUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setMessage(null);
    const data = new FormData();
    data.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: data });
    const json = await res.json().catch(() => null);
    setUploading(false);
    if (res.ok) {
      set("coverImage", json.url);
    } else {
      setMessage({ ok: false, text: json?.error || "Upload failed" });
    }
    e.target.value = "";
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    const payload = {
      ...form,
      techStack: form.techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      paragraphs: lines(form.paragraphs),
      bullets: lines(form.bullets),
    };
    const res = await fetch(
      form.editing ? `/api/admin/projects/${form.id}` : "/api/admin/projects",
      {
        method: form.editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const json = await res.json().catch(() => null);
    setSaving(false);
    if (res.ok) {
      setMessage({ ok: true, text: form.editing ? "Project updated." : "Project added." });
      setForm(emptyForm);
      router.refresh();
    } else {
      setMessage({ ok: false, text: json?.error || "Save failed" });
    }
  }

  async function onDelete(p: StoredProject) {
    if (!confirm(`Delete "${p.companyName}"?`)) return;
    const res = await fetch(`/api/admin/projects/${p.id}`, { method: "DELETE" });
    if (res.ok) {
      if (form.id === p.id) setForm(emptyForm);
      router.refresh();
    } else {
      setMessage({ ok: false, text: "Delete failed" });
    }
  }

  async function onLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <main className="mx-auto max-w-5xl space-y-8 px-4 py-8">
      <header className="flex items-center justify-between">
        <h1 className="font-heading text-3xl">Manage projects</h1>
        <div className="flex gap-2">
          <Link href="/projects">
            <Button variant="outline">View site</Button>
          </Link>
          <Button variant="ghost" onClick={onLogout}>
            Log out
          </Button>
        </div>
      </header>

      {!dbConfigured && (
        <p className="rounded-md border border-destructive p-3 text-sm text-destructive">
          MONGODB_URI is not set, so projects can&apos;t be saved yet.
        </p>
      )}

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <form onSubmit={onSubmit} className="space-y-4">
          <h2 className="font-heading text-xl">
            {form.editing ? `Edit: ${form.companyName}` : "Add new project"}
          </h2>

          <Field label="Title *">
            <Input
              value={form.companyName}
              onChange={(e) => set("companyName", e.target.value)}
              required
            />
          </Field>

          <Field label="Short description *" hint="Shown on the project card.">
            <Textarea
              value={form.shortDescription}
              onChange={(e) => set("shortDescription", e.target.value)}
              required
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Type">
              <select
                className={selectClass}
                value={form.type}
                onChange={(e) =>
                  set("type", e.target.value as FormState["type"])
                }
              >
                <option>Personal</option>
                <option>Professional</option>
              </select>
            </Field>
            <Field label="Tech stack" hint="Comma separated, e.g. React, Node.js">
              <Input
                value={form.techStack}
                onChange={(e) => set("techStack", e.target.value)}
              />
            </Field>
            <Field label="Start date *">
              <Input
                type="date"
                value={form.startDate}
                onChange={(e) => set("startDate", e.target.value)}
                required
              />
            </Field>
            <Field label="End date *">
              <Input
                type="date"
                value={form.endDate}
                onChange={(e) => set("endDate", e.target.value)}
                required
              />
            </Field>
            <Field label="Live link">
              <Input
                type="url"
                placeholder="https://"
                value={form.websiteLink}
                onChange={(e) => set("websiteLink", e.target.value)}
              />
            </Field>
            <Field label="GitHub link">
              <Input
                type="url"
                placeholder="https://"
                value={form.githubLink}
                onChange={(e) => set("githubLink", e.target.value)}
              />
            </Field>
          </div>

          <div className="space-y-1">
            <span className="text-sm font-medium">Categories</span>
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map((cat) => (
                <label key={cat} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.category.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          <Field
            label="Cover image"
            hint="Optional. Without it, a screenshot of the live link is used."
          >
            <div className="space-y-2">
              <input type="file" accept="image/*" onChange={onUpload} />
              {uploading && <p className="text-xs">Uploading...</p>}
              <Input
                type="url"
                placeholder="or paste an image URL"
                value={form.coverImage}
                onChange={(e) => set("coverImage", e.target.value)}
              />
              {form.coverImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={form.coverImage}
                  alt="Cover preview"
                  className="h-32 rounded-md border object-cover"
                />
              )}
            </div>
          </Field>

          <Field label="Description paragraphs" hint="One paragraph per line.">
            <Textarea
              rows={4}
              value={form.paragraphs}
              onChange={(e) => set("paragraphs", e.target.value)}
            />
          </Field>

          <Field label="Feature bullets" hint="One bullet per line.">
            <Textarea
              rows={4}
              value={form.bullets}
              onChange={(e) => set("bullets", e.target.value)}
            />
          </Field>

          {message && (
            <p
              className={`text-sm ${
                message.ok ? "text-green-600" : "text-destructive"
              }`}
            >
              {message.text}
            </p>
          )}

          <div className="flex gap-2">
            <Button type="submit" disabled={saving || uploading || !dbConfigured}>
              {saving ? "Saving..." : form.editing ? "Save changes" : "Add project"}
            </Button>
            {form.editing && (
              <Button type="button" variant="outline" onClick={() => setForm(emptyForm)}>
                Cancel
              </Button>
            )}
          </div>
        </form>

        <aside className="space-y-4">
          <h2 className="font-heading text-xl">Your projects ({projects.length})</h2>
          {projects.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Nothing added from here yet.
            </p>
          )}
          <ul className="space-y-2">
            {projects.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between gap-2 rounded-md border p-3"
              >
                <span className="truncate text-sm">{p.companyName}</span>
                <span className="flex shrink-0 gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setForm(fromProject(p));
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Edit
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => onDelete(p)}>
                    Delete
                  </Button>
                </span>
              </li>
            ))}
          </ul>

          <div>
            <h3 className="text-sm font-medium">Built-in projects</h3>
            <p className="mb-1 text-xs text-muted-foreground">
              Defined in config/projects.ts (edit in code).
            </p>
            <ul className="list-inside list-disc text-xs text-muted-foreground">
              {builtInProjects.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
