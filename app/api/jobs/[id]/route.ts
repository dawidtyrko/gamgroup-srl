import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { deleteJob, updateJob, parseJobInput } from "@/lib/jobs";
import { adminGuard } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

type Ctx = { params: { id: string } };

/** PUT /api/jobs/:id — update an opening. */
export async function PUT(req: Request, { params }: Ctx) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const denied = adminGuard(req, body);
  if (denied) return denied;

  const parsed = parseJobInput(body);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const job = await updateJob(params.id, parsed.input);
    if (!job) return NextResponse.json({ error: "Offerta non trovata." }, { status: 404 });
    revalidatePath("/");
    revalidatePath("/en");
    return NextResponse.json({ ok: true, job });
  } catch (err) {
    console.error("[api/jobs/:id] update failed:", err);
    const message = err instanceof Error ? err.message : "Errore interno.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/** DELETE /api/jobs/:id — remove an opening. */
export async function DELETE(req: Request, { params }: Ctx) {
  const denied = adminGuard(req, {});
  if (denied) return denied;

  try {
    const ok = await deleteJob(params.id);
    if (!ok) return NextResponse.json({ error: "Offerta non trovata." }, { status: 404 });
    revalidatePath("/");
    revalidatePath("/en");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/jobs/:id] delete failed:", err);
    const message = err instanceof Error ? err.message : "Errore interno.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
