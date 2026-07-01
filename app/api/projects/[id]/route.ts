import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { deleteProject, updateProject, parseProjectInput } from "@/lib/projects";
import { adminGuard } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

type Ctx = { params: { id: string } };

/**
 * PUT /api/projects/:id — update an existing case study.
 * Auth: `x-admin-password` header (or `password` in the body).
 */
export async function PUT(req: Request, { params }: Ctx) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const denied = adminGuard(req, body);
  if (denied) return denied;

  const parsed = parseProjectInput(body);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const project = await updateProject(params.id, parsed.input);
    if (!project) {
      return NextResponse.json({ error: "Progetto non trovato." }, { status: 404 });
    }
    revalidatePath("/");
    return NextResponse.json({ ok: true, project });
  } catch (err) {
    console.error("[api/projects/:id] update failed:", err);
    const message = err instanceof Error ? err.message : "Errore interno.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * DELETE /api/projects/:id — remove a case study.
 * Auth: `x-admin-password` header. (DELETE has no body, so header is required.)
 */
export async function DELETE(req: Request, { params }: Ctx) {
  const denied = adminGuard(req, {});
  if (denied) return denied;

  try {
    const ok = await deleteProject(params.id);
    if (!ok) {
      return NextResponse.json({ error: "Progetto non trovato." }, { status: 404 });
    }
    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/projects/:id] delete failed:", err);
    const message = err instanceof Error ? err.message : "Errore interno.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
