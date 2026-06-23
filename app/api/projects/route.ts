import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { addProject, getProjects, type ProjectInput } from "@/lib/projects";

// Always run dynamically (reads request headers / writes KV).
export const dynamic = "force-dynamic";

/** GET /api/projects — list current case studies (used by the admin preview). */
export async function GET() {
  const projects = await getProjects();
  return NextResponse.json({ projects });
}

/**
 * POST /api/projects — add a new case study.
 * Auth: `x-admin-password` header (or `password` in the body) must equal
 * ADMIN_CMS_PASSWORD. On success the homepage ISR cache is revalidated so the
 * new project appears without a redeploy.
 */
export async function POST(req: Request) {
  const expected = process.env.ADMIN_CMS_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { error: "ADMIN_CMS_PASSWORD is not configured on the server." },
      { status: 500 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const provided = req.headers.get("x-admin-password") ?? (body.password as string | undefined);
  if (provided !== expected) {
    return NextResponse.json({ error: "Password non valida." }, { status: 401 });
  }

  // Normalise: benefits may arrive as an array or a newline/comma string.
  const rawBenefits = body.benefits;
  const benefits = Array.isArray(rawBenefits)
    ? rawBenefits.map(String)
    : typeof rawBenefits === "string"
      ? rawBenefits.split(/[\n,]/)
      : [];

  const input: ProjectInput = {
    sector: String(body.sector ?? ""),
    img: String(body.img ?? ""),
    title: String(body.title ?? ""),
    challenge: String(body.challenge ?? ""),
    description: String(body.description ?? ""),
    benefits: benefits.map((b) => b.trim()).filter(Boolean),
  };

  const missing = (["sector", "title", "challenge", "description"] as const).filter(
    (k) => !input[k].trim()
  );
  if (missing.length) {
    return NextResponse.json(
      { error: `Campi obbligatori mancanti: ${missing.join(", ")}.` },
      { status: 400 }
    );
  }
  if (input.benefits.length === 0) {
    return NextResponse.json(
      { error: "Inserisci almeno un beneficio." },
      { status: 400 }
    );
  }

  try {
    const project = await addProject(input);
    revalidatePath("/"); // refresh the ISR-cached homepage
    return NextResponse.json({ ok: true, project });
  } catch (err) {
    console.error("[api/projects] add failed:", err);
    const message = err instanceof Error ? err.message : "Errore interno.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
