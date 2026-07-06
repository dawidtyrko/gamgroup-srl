import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const TO = process.env.CONTACT_TO || "info@gamgroup.it";
// Must be an address on a domain verified in Resend. `onboarding@resend.dev`
// works out of the box but only delivers to the Resend account owner (test mode).
const FROM = process.env.CONTACT_FROM || "GAM Group <onboarding@resend.dev>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "RESEND_API_KEY non configurata sul server.", code: "send_failed" },
      { status: 500 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Corpo della richiesta non valido.", code: "send_failed" }, { status: 400 });
  }

  const nome = String(body.nome ?? "").trim();
  const cognome = String(body.cognome ?? "").trim();
  const email = String(body.email ?? "").trim();
  const azienda = String(body.azienda ?? "").trim();
  const messaggio = String(body.messaggio ?? "").trim();

  if (!nome || !email || !messaggio) {
    return NextResponse.json(
      { error: "Compila nome, email e messaggio.", code: "missing_fields" },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Email non valida.", code: "invalid_email" }, { status: 400 });
  }
  if (body.privacy !== true) {
    return NextResponse.json(
      { error: "Devi accettare l'informativa privacy.", code: "privacy_required" },
      { status: 400 }
    );
  }

  const fullName = [nome, cognome].filter(Boolean).join(" ");
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email, // reply goes straight to the visitor
      subject: `Nuovo messaggio dal sito — ${fullName}${azienda ? ` (${azienda})` : ""}`,
      text: `Nome: ${fullName}\nEmail: ${email}\nAzienda: ${azienda || "—"}\n\nMessaggio:\n${messaggio}`,
      html: `
        <div style="font-family:Arial,sans-serif;font-size:15px;color:#1B2A4A;line-height:1.6">
          <h2 style="margin:0 0 16px;color:#1B2A4A">Nuovo messaggio dal sito</h2>
          <p style="margin:0 0 6px"><strong>Nome:</strong> ${escapeHtml(fullName)}</p>
          <p style="margin:0 0 6px"><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p style="margin:0 0 6px"><strong>Azienda:</strong> ${escapeHtml(azienda || "—")}</p>
          <p style="margin:16px 0 6px"><strong>Messaggio:</strong></p>
          <p style="margin:0;white-space:pre-wrap">${escapeHtml(messaggio)}</p>
        </div>`,
    });

    if (error) {
      console.error("[api/contact] Resend error:", error);
      return NextResponse.json(
        { error: "Invio non riuscito. Riprova più tardi.", code: "send_failed" },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/contact] send failed:", err);
    return NextResponse.json({ error: "Errore interno.", code: "send_failed" }, { status: 500 });
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
