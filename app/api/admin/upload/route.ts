import { createHash } from "crypto";
import { NextResponse } from "next/server";

import { isAdmin } from "@/lib/admin-auth";

const MAX_BYTES = 8 * 1024 * 1024;

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "Cloudinary env variables are not configured" },
      { status: 500 }
    );
  }

  const file = (await req.formData()).get("file");
  if (!(file instanceof File) || !file.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "An image file is required" },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Image must be under 8MB" },
      { status: 400 }
    );
  }

  const timestamp = String(Math.floor(Date.now() / 1000));
  const folder = "portfolio-projects";
  const signature = createHash("sha1")
    .update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`)
    .digest("hex");

  const form = new FormData();
  form.append("file", file);
  form.append("api_key", apiKey);
  form.append("timestamp", timestamp);
  form.append("folder", folder);
  form.append("signature", signature);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: form }
  );
  const json = await res.json();
  if (!res.ok) {
    return NextResponse.json(
      { error: json?.error?.message || "Upload failed" },
      { status: 502 }
    );
  }
  return NextResponse.json({ url: json.secure_url as string });
}
