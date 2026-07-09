import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { resetJobs } from "@/lib/jobs";
import { adminGuard } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

/** POST /api/jobs/reset — replace the list with the built-in default openings. */
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
    const jobs = await resetJobs();
    revalidatePath("/");
    revalidatePath("/en");
    return NextResponse.json({ ok: true, count: jobs.length });
  } catch (err) {
    console.error("[api/jobs/reset] failed:", err);
    const message = err instanceof Error ? err.message : "Errore interno.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
