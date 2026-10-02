import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { resetProjects } from "@/lib/projects";
import { adminGuard } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

/** POST /api/projects/reset — replace the list with the 4 built-in defaults. */
export async function POST(req: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    /* header auth still works */
  }
  const denied = adminGuard(req, body);
  if (denied) return denied;

  try {
    const projects = await resetProjects();
    revalidatePath("/");
    revalidatePath("/en");
    return NextResponse.json({ ok: true, count: projects.length });
  } catch (err) {
    console.error("[api/projects/reset] failed:", err);
    const message = err instanceof Error ? err.message : "Errore interno.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
