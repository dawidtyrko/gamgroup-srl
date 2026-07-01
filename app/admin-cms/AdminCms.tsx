"use client";

import { CSSProperties, FormEvent, useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";

const NAVY = "#1B2A4A";
const TEAL = "#3CC8BD";
const MONO = "'Space Mono', monospace";
const GRO = "'Space Grotesk', sans-serif";

const labelStyle: CSSProperties = {
  fontFamily: MONO,
  fontSize: 11,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "#6B7686",
};
const inputStyle: CSSProperties = {
  background: "#fff",
  border: "1px solid #d3dae4",
  borderRadius: 12,
  color: NAVY,
  padding: "12px 14px",
  fontSize: 15,
  outline: "none",
  width: "100%",
};

type Status =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "ok"; message: string }
  | { state: "error"; message: string };

const emptyForm = {
  sector: "",
  img: "",
  title: "",
  challenge: "",
  description: "",
  benefits: "",
};

export default function AdminCms() {
  const [password, setPassword] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [projects, setProjects] = useState<Project[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const set = (k: keyof typeof emptyForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const refreshList = useCallback(async () => {
    try {
      const res = await fetch("/api/projects", { cache: "no-store" });
      const data = await res.json();
      setProjects(data.projects ?? []);
    } catch {
      /* list stays as-is */
    }
  }, []);

  useEffect(() => {
    refreshList();
  }, [refreshList]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!password) {
      setStatus({ state: "error", message: "Inserisci la password." });
      return;
    }
    setStatus({ state: "loading" });
    const isEdit = editingId != null;
    try {
      const res = await fetch(isEdit ? `/api/projects/${editingId}` : "/api/projects", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ state: "error", message: data.error || "Errore." });
        return;
      }
      setStatus({
        state: "ok",
        message: isEdit
          ? `Aggiornato: ${data.project.title}.`
          : `Pubblicato: ${data.project.title}.`,
      });
      resetForm();
      await refreshList();
    } catch {
      setStatus({ state: "error", message: "Rete non raggiungibile." });
    }
  };

  const startEdit = (p: Project) => {
    setEditingId(p.id);
    setForm({
      sector: p.sector,
      img: p.img,
      title: p.title,
      challenge: p.challenge,
      description: p.description,
      benefits: p.benefits.join("\n"),
    });
    setStatus({ state: "idle" });
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const remove = async (p: Project) => {
    if (!password) {
      setStatus({ state: "error", message: "Inserisci la password per eliminare." });
      return;
    }
    if (!window.confirm(`Eliminare definitivamente "${p.title}"?`)) return;
    setBusyId(p.id);
    setStatus({ state: "loading" });
    try {
      const res = await fetch(`/api/projects/${p.id}`, {
        method: "DELETE",
        headers: { "x-admin-password": password },
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ state: "error", message: data.error || "Errore." });
        return;
      }
      if (editingId === p.id) resetForm();
      setStatus({ state: "ok", message: `Eliminato: ${p.title}.` });
      await refreshList();
    } catch {
      setStatus({ state: "error", message: "Rete non raggiungibile." });
    } finally {
      setBusyId(null);
    }
  };

  const isEdit = editingId != null;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#F6F7F9",
        padding: "clamp(40px,8vw,90px) 6vw",
        fontFamily: "'Manrope', sans-serif",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/gam-logo-blue.svg" alt="GAM Group" width={67} height={40} style={{ display: "block", height: 40, width: "auto", marginBottom: 24 }} />
        <p style={{ ...labelStyle, color: TEAL, margin: "0 0 10px" }}>Admin CMS</p>
        <h1 style={{ margin: 0, fontFamily: GRO, fontWeight: 700, fontSize: "clamp(28px,4vw,46px)", letterSpacing: "-.02em", color: NAVY }}>
          Gestione case study
        </h1>
        <p style={{ marginTop: 14, color: "#6B7686", fontWeight: 300, fontSize: 16, lineHeight: 1.6 }}>
          Aggiungi, modifica o elimina i progetti. I dati sono salvati su Vercel
          KV e la home si aggiorna automaticamente (ISR) dopo ogni operazione.
        </p>

        {/* Password (used for every write) */}
        <div style={{ marginTop: 30, maxWidth: 360 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={labelStyle}>Password</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} placeholder="ADMIN_CMS_PASSWORD" autoComplete="current-password" />
          </label>
        </div>

        {/* Form: add or edit */}
        <form ref={formRef} onSubmit={submit} style={{ marginTop: 34, display: "flex", flexDirection: "column", gap: 22, scrollMarginTop: 24 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
            <h2 style={{ margin: 0, fontFamily: GRO, fontWeight: 700, fontSize: 22, color: NAVY }}>
              {isEdit ? "Modifica progetto" : "Nuovo progetto"}
            </h2>
            {isEdit && (
              <button type="button" onClick={resetForm} style={{ background: "none", border: "none", color: TEAL, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                Annulla modifica
              </button>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
            <Row label="Settore (pill)">
              <input type="text" required value={form.sector} onChange={set("sector")} style={inputStyle} placeholder="es. Retail" />
            </Row>
            <Row label="Etichetta immagine">
              <input type="text" value={form.img} onChange={set("img")} style={inputStyle} placeholder="es. [ punto vendita ]" />
            </Row>
          </div>

          <Row label="Titolo">
            <input type="text" required value={form.title} onChange={set("title")} style={inputStyle} placeholder="Titolo del case study" />
          </Row>
          <Row label="La sfida">
            <textarea required value={form.challenge} onChange={set("challenge")} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
          </Row>
          <Row label="Il progetto">
            <textarea required value={form.description} onChange={set("description")} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
          </Row>
          <Row label="Benefici (uno per riga)">
            <textarea required value={form.benefits} onChange={set("benefits")} rows={4} style={{ ...inputStyle, resize: "vertical" }} placeholder={"Riduzione dei tempi di fermo\nSLA rispettati con costanza\n..."} />
          </Row>

          <button
            type="submit"
            disabled={status.state === "loading"}
            style={{
              alignSelf: "flex-start",
              background: NAVY,
              color: "#fff",
              border: "none",
              borderRadius: 999,
              padding: "15px 40px",
              fontSize: 15,
              fontWeight: 600,
              cursor: status.state === "loading" ? "wait" : "pointer",
              opacity: status.state === "loading" ? 0.7 : 1,
            }}
          >
            {status.state === "loading" ? "Salvataggio…" : isEdit ? "Salva modifiche" : "Pubblica progetto"}
          </button>
        </form>

        {status.state === "ok" && (
          <div style={{ marginTop: 24, border: "1px solid rgba(60,200,189,.4)", background: "rgba(60,200,189,.1)", borderRadius: 14, padding: "18px 20px", color: NAVY }}>
            ✓ {status.message} La home è stata rivalidata.
          </div>
        )}
        {status.state === "error" && (
          <div style={{ marginTop: 24, border: "1px solid rgba(214,69,69,.4)", background: "rgba(214,69,69,.08)", borderRadius: 14, padding: "18px 20px", color: "#b3261e" }}>
            {status.message}
          </div>
        )}

        {/* Existing projects */}
        <div style={{ marginTop: 56 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 18 }}>
            <h2 style={{ margin: 0, fontFamily: GRO, fontWeight: 700, fontSize: 22, color: NAVY }}>Progetti pubblicati</h2>
            <span style={{ ...labelStyle }}>{projects.length}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {projects.map((p) => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, background: "#fff", border: "1px solid #e5e9f0", borderRadius: 14, padding: "16px 18px" }}>
                <div style={{ minWidth: 0 }}>
                  <span style={{ ...labelStyle, color: TEAL }}>{p.sector}</span>
                  <p style={{ margin: "6px 0 0", fontFamily: GRO, fontWeight: 500, fontSize: 16, color: NAVY, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title}</p>
                </div>
                <div style={{ display: "flex", gap: 8, flex: "none" }}>
                  <button type="button" onClick={() => startEdit(p)} style={btnSmall(NAVY)}>Modifica</button>
                  <button type="button" onClick={() => remove(p)} disabled={busyId === p.id} style={btnSmall("#b3261e", busyId === p.id)}>
                    {busyId === p.id ? "…" : "Elimina"}
                  </button>
                </div>
              </div>
            ))}
            {projects.length === 0 && (
              <p style={{ color: "#6B7686", fontWeight: 300 }}>Nessun progetto.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function btnSmall(color: string, disabled = false): CSSProperties {
  return {
    background: "transparent",
    border: `1px solid ${color}`,
    color,
    borderRadius: 999,
    padding: "8px 16px",
    fontSize: 13,
    fontWeight: 600,
    cursor: disabled ? "wait" : "pointer",
    opacity: disabled ? 0.6 : 1,
  };
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={labelStyle}>{label}</span>
      {children}
    </label>
  );
}
