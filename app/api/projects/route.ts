import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { addProject, getProjects, parseProjectInput } from "@/lib/projects";
import { adminGuard } from "@/lib/adminAuth";

// Always run dynamically (reads request headers / writes KV).
export const dynamic = "force-dynamic";

/** GET /api/projects — list current case studies (used by the admin UI). */
export async function GET() {
  const projects = await getProjects();
  return NextResponse.json({ projects });
}

/**
 * POST /api/projects — add a new case study.
 * Auth: `x-admin-password` header (or `password` in the body) === ADMIN_CMS_PASSWORD.
 * On success the homepage ISR cache is revalidated so the new project appears
 * without a redeploy.
 */
export async function POST(req: Request) {
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
    const project = await addProject(parsed.input);
    revalidatePath("/");
    return NextResponse.json({ ok: true, project });
  } catch (err) {
    console.error("[api/projects] add failed:", err);
    const message = err instanceof Error ? err.message : "Errore interno.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
