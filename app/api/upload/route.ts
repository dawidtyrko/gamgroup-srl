import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { adminGuard } from "@/lib/adminAuth";

// Always run dynamically (reads request headers, writes to Blob storage).
export const dynamic = "force-dynamic";

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];

/**
 * POST /api/upload — upload an image file and get back a public URL.
 * The returned URL is stored in a project's `image` field exactly like a
 * manually-pasted link, so the rest of the site needs no changes.
 * Auth: `x-admin-password` header === ADMIN_CMS_PASSWORD.
 * Requires a Vercel Blob store (BLOB_READ_WRITE_TOKEN in the environment).
 */
// The Blob store is connected with the `blob_gam` env-var prefix in Vercel,
// so the token lands as `blob_gam_READ_WRITE_TOKEN`; fall back to the default
// name in case the connection is ever recreated with the standard prefix.
const blobToken = () =>
  process.env.blob_gam_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN;

/**
 * Build a safe blob key from a client-supplied filename. The name reaches us
 * straight from the browser, so strip any directory component and keep only
 * characters that cannot reshape the key path.
 */
function safeName(name: string): string {
  const base = name.split(/[\\/]/).pop() ?? "";
  const cleaned = base
    .replace(/[^a-zA-Z0-9._-]/g, "-") // anything exotic becomes a dash
    .replace(/^\.+/, "") // no leading dots -> no ".." and no hidden files
    .slice(0, 100);
  return cleaned || "image";
}

export async function POST(req: Request) {
  const denied = await adminGuard(req);
  if (denied) return denied;

  const token = blobToken();
  if (!token) {
    return NextResponse.json(
      { error: "Storage non configurato: manca il token Blob (abilita/collega Vercel Blob)." },
      { status: 500 }
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Nessun file caricato." }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json(
      { error: "Formato non supportato (usa JPG, PNG, WebP, AVIF o GIF)." },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Immagine troppo grande (max 8 MB)." }, { status: 400 });
  }

  try {
    const blob = await put(`projects/${safeName(file.name)}`, file, {
      access: "public",
      addRandomSuffix: true,
      contentType: file.type,
      token,
    });
    return NextResponse.json({ ok: true, url: blob.url });
  } catch (err) {
    console.error("[api/upload] failed:", err);
    return NextResponse.json({ error: "Upload non riuscito." }, { status: 500 });
  }
}
