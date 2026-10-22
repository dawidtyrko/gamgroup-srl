import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { addJob, getJobs, parseJobInput } from "@/lib/jobs";
import { adminGuard } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

/** GET /api/jobs — list current job openings (used by the admin UI). */
export async function GET() {
  const jobs = await getJobs();
  return NextResponse.json({ jobs });
}

/**
 * POST /api/jobs — add a new opening.
 * Auth via the `x-admin-password` header. Revalidates
 * both localized homepages so the change appears without a redeploy.
 */
export async function POST(req: Request) {
  const denied = await adminGuard(req);
  if (denied) return denied;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = parseJobInput(body);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const job = await addJob(parsed.input);
    revalidatePath("/");
    revalidatePath("/en");
    return NextResponse.json({ ok: true, job });
  } catch (err) {
    console.error("[api/jobs] add failed:", err);
    const message = err instanceof Error ? err.message : "Errore interno.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
