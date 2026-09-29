"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import type { Dict } from "@/lib/i18n/types";

/** Contact form — posts to /api/contact (Resend), same contract as before. */
export default function ContactForm({ t, privacyHref }: { t: Dict["contact"]; privacyHref: string }) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      nome: fd.get("nome"),
      cognome: fd.get("cognome"),
      email: fd.get("email"),
      azienda: fd.get("azienda"),
      messaggio: fd.get("messaggio"),
      privacy: fd.get("privacy") === "on",
    };
    setSending(true);
    setErr(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const codeMap: Record<string, string> = {
          missing_fields: t.errors.missingFields,
          invalid_email: t.errors.invalidEmail,
          privacy_required: t.errors.privacyRequired,
          send_failed: t.errors.sendFailed,
        };
        setErr((data.code && codeMap[data.code]) || t.errors.sendFailed);
        return;
      }
      setSent(true);
    } catch {
      setErr(t.netError);
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="form-card form-done" role="status">
        <div className="form-done-mark">✓</div>
        <h3>{t.successTitle}</h3>
        <p>{t.successBody}</p>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={submit}>
      <label>
        {t.nome}
        <input name="nome" type="text" required autoComplete="given-name" />
      </label>
      <label>
        {t.cognome}
        <input name="cognome" type="text" autoComplete="family-name" />
      </label>
      <label>
        {t.email}
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label>
        {t.azienda}
        <input name="azienda" type="text" autoComplete="organization" />
      </label>
      <label className="full">
        {t.messaggio}
        <textarea name="messaggio" rows={5} required placeholder={t.msgPlaceholder} />
      </label>
      <label className="full check">
        <input type="checkbox" name="privacy" required />
        <span>
          {t.privacyPre}
          <Link href={privacyHref} target="_blank">
            {t.privacyLink}
          </Link>
          {t.privacyPost}
        </span>
      </label>
      {err && (
        <p className="full form-err" role="alert">
          {err}
        </p>
      )}
      <div className="full">
        <button type="submit" className="btn p" disabled={sending}>
          {sending ? t.sending : t.send}
        </button>
      </div>
    </form>
  );
}
