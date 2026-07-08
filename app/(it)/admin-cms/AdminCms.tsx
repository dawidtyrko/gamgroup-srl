"use client";

import { CSSProperties, FormEvent, useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";
import type { Job, ReqGroup } from "@/lib/jobs";

const NAVY = "#1E333B";
const TEAL = "#35707E";
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
  border: "1px solid #DDE6E8",
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

/* =========================================================================
   Parent: shared password + tab switch between Projects and Job Board panels
   ========================================================================= */
export default function AdminCms() {
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<"projects" | "jobs">("projects");

  return (
    <main style={{ minHeight: "100vh", background: "#F1F5F6", padding: "clamp(40px,8vw,90px) 6vw", fontFamily: "'Manrope', sans-serif" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/gam-logo.svg" alt="GAM Group" width={67} height={40} style={{ display: "block", height: 40, width: "auto", marginBottom: 24 }} />
        <p style={{ ...labelStyle, color: TEAL, margin: "0 0 10px" }}>Admin CMS</p>
        <h1 style={{ margin: 0, fontFamily: GRO, fontWeight: 700, fontSize: "clamp(28px,4vw,46px)", letterSpacing: "-.02em", color: NAVY }}>
          Gestione contenuti
        </h1>
        <p style={{ marginTop: 14, color: "#6B7686", fontWeight: 300, fontSize: 16, lineHeight: 1.6 }}>
          Dati salvati su Vercel KV; le pagine si aggiornano automaticamente (ISR) dopo ogni operazione.
        </p>

        {/* Shared password */}
        <div style={{ marginTop: 30, maxWidth: 360 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={labelStyle}>Password</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} placeholder="ADMIN_CMS_PASSWORD" autoComplete="current-password" />
          </label>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 10, marginTop: 30, borderBottom: "1px solid #DDE6E8" }}>
          {([["projects", "Progetti"], ["jobs", "Job Board"]] as const).map(([k, label]) => (
            <button
              key={k}
              type="button"
              onClick={() => setTab(k)}
              style={{
                background: "none",
                border: "none",
                borderBottom: tab === k ? `2px solid ${TEAL}` : "2px solid transparent",
                color: tab === k ? NAVY : "#6B7686",
                fontFamily: GRO,
                fontWeight: 700,
                fontSize: 16,
                padding: "10px 6px",
                marginBottom: -1,
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "projects" ? <ProjectsPanel password={password} /> : <JobsPanel password={password} />}
      </div>
    </main>
  );
}

/* =========================================================================
   Projects panel (case studies)
   ========================================================================= */
const emptyProject = {
  sector: "", img: "", title: "", challenge: "", description: "", benefits: "", area: "", image: "",
  enSector: "", enArea: "", enTitle: "", enChallenge: "", enDescription: "", enBenefits: "",
};

function ProjectsPanel({ password }: { password: string }) {
  const [form, setForm] = useState(emptyProject);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [projects, setProjects] = useState<Project[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const set = (k: keyof typeof emptyProject) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const refreshList = useCallback(async () => {
    try {
      const res = await fetch("/api/projects", { cache: "no-store" });
      const data = await res.json();
      setProjects(data.projects ?? []);
    } catch {
      /* keep */
    }
  }, []);
  useEffect(() => { refreshList(); }, [refreshList]);

  const resetForm = () => { setForm(emptyProject); setEditingId(null); };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!password) { setStatus({ state: "error", message: "Inserisci la password." }); return; }
    setStatus({ state: "loading" });
    const isEdit = editingId != null;
    try {
      const res = await fetch(isEdit ? `/api/projects/${editingId}` : "/api/projects", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify({
          ...form,
          en: { sector: form.enSector, area: form.enArea, title: form.enTitle, challenge: form.enChallenge, description: form.enDescription, benefits: form.enBenefits },
        }),
      });
      const data = await res.json();
      if (!res.ok) { setStatus({ state: "error", message: data.error || "Errore." }); return; }
      setStatus({ state: "ok", message: isEdit ? `Aggiornato: ${data.project.title}.` : `Pubblicato: ${data.project.title}.` });
      resetForm();
      await refreshList();
    } catch {
      setStatus({ state: "error", message: "Rete non raggiungibile." });
    }
  };

  const startEdit = (p: Project) => {
    setEditingId(p.id);
    setForm({
      sector: p.sector, img: p.img, title: p.title, challenge: p.challenge, description: p.description,
      benefits: p.benefits.join("\n"), area: p.area ?? "", image: p.image ?? "",
      enSector: p.en?.sector ?? "", enArea: p.en?.area ?? "", enTitle: p.en?.title ?? "",
      enChallenge: p.en?.challenge ?? "", enDescription: p.en?.description ?? "", enBenefits: p.en?.benefits?.join("\n") ?? "",
    });
    setStatus({ state: "idle" });
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const remove = async (p: Project) => {
    if (!password) { setStatus({ state: "error", message: "Inserisci la password per eliminare." }); return; }
    if (!window.confirm(`Eliminare definitivamente "${p.title}"?`)) return;
    setBusyId(p.id);
    setStatus({ state: "loading" });
    try {
      const res = await fetch(`/api/projects/${p.id}`, { method: "DELETE", headers: { "x-admin-password": password } });
      const data = await res.json();
      if (!res.ok) { setStatus({ state: "error", message: data.error || "Errore." }); return; }
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
    <>
      <form ref={formRef} onSubmit={submit} style={{ marginTop: 34, display: "flex", flexDirection: "column", gap: 22, scrollMarginTop: 24 }}>
        <PanelHeading title={isEdit ? "Modifica progetto" : "Nuovo progetto"} onCancel={isEdit ? resetForm : undefined} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
          <Row label="Settore (pill)"><input type="text" required value={form.sector} onChange={set("sector")} style={inputStyle} placeholder="es. Retail" /></Row>
          <Row label="Area tecnica (opzionale)"><input type="text" value={form.area} onChange={set("area")} style={inputStyle} placeholder="es. AMS, EDI, AS400" /></Row>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
          <Row label="URL immagine (opzionale)"><input type="text" value={form.image} onChange={set("image")} style={inputStyle} placeholder="https://... oppure /photos/nome.jpg" /></Row>
          <Row label="Etichetta immagine (se manca la foto)"><input type="text" value={form.img} onChange={set("img")} style={inputStyle} placeholder="es. [ punto vendita ]" /></Row>
        </div>
        <Row label="Titolo"><input type="text" required value={form.title} onChange={set("title")} style={inputStyle} placeholder="Titolo del case study" /></Row>
        <Row label="La sfida"><textarea required value={form.challenge} onChange={set("challenge")} rows={3} style={{ ...inputStyle, resize: "vertical" }} /></Row>
        <Row label="Il progetto"><textarea required value={form.description} onChange={set("description")} rows={3} style={{ ...inputStyle, resize: "vertical" }} /></Row>
        <Row label="Benefici (uno per riga)"><textarea required value={form.benefits} onChange={set("benefits")} rows={4} style={{ ...inputStyle, resize: "vertical" }} placeholder={"Riduzione dei tempi di fermo\nSLA rispettati con costanza"} /></Row>

        <details style={{ border: "1px solid #DDE6E8", borderRadius: 14, padding: "16px 18px", background: "#fff" }}>
          <summary style={{ cursor: "pointer", fontFamily: GRO, fontWeight: 700, fontSize: 16, color: NAVY }}>
            English (opzionale) {form.enTitle ? "· EN ✓" : ""}
          </summary>
          <p style={{ margin: "10px 0 16px", color: "#6B7686", fontWeight: 300, fontSize: 14 }}>Traduzione mostrata su /en. I campi vuoti usano il testo italiano.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Row label="Sector (EN)"><input type="text" value={form.enSector} onChange={set("enSector")} style={inputStyle} /></Row>
              <Row label="Technical area (EN)"><input type="text" value={form.enArea} onChange={set("enArea")} style={inputStyle} /></Row>
            </div>
            <Row label="Title (EN)"><input type="text" value={form.enTitle} onChange={set("enTitle")} style={inputStyle} /></Row>
            <Row label="The challenge (EN)"><textarea value={form.enChallenge} onChange={set("enChallenge")} rows={3} style={{ ...inputStyle, resize: "vertical" }} /></Row>
            <Row label="The project (EN)"><textarea value={form.enDescription} onChange={set("enDescription")} rows={3} style={{ ...inputStyle, resize: "vertical" }} /></Row>
            <Row label="Benefits (EN — one per line)"><textarea value={form.enBenefits} onChange={set("enBenefits")} rows={4} style={{ ...inputStyle, resize: "vertical" }} /></Row>
          </div>
        </details>

        <SubmitButton loading={status.state === "loading"} label={isEdit ? "Salva modifiche" : "Pubblica progetto"} />
      </form>

      <StatusBox status={status} />

      <ListSection title="Progetti pubblicati" count={projects.length} empty="Nessun progetto.">
        {projects.map((p) => (
          <ListRow
            key={p.id}
            eyebrow={`${p.sector}${p.en?.title ? " · EN ✓" : ""}`}
            title={p.title}
            busy={busyId === p.id}
            onEdit={() => startEdit(p)}
            onDelete={() => remove(p)}
          />
        ))}
      </ListSection>
    </>
  );
}

/* =========================================================================
   Job Board panel
   ========================================================================= */
const emptyJob = {
  title: "", sede: "", type: "", tags: "", description: "", requirements: "",
  enTitle: "", enSede: "", enType: "", enTags: "", enDescription: "", enRequirements: "",
};

const serializeGroups = (groups: ReqGroup[]): string =>
  groups.map((g) => `# ${g.label}\n${g.items.join("\n")}`).join("\n\n");

const REQ_PLACEHOLDER = "# Requisiti\nPrimo requisito\nSecondo requisito\n\n# Requisiti preferenziali\nAltro requisito";

function JobsPanel({ password }: { password: string }) {
  const [form, setForm] = useState(emptyJob);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [jobs, setJobs] = useState<Job[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const set = (k: keyof typeof emptyJob) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const refreshList = useCallback(async () => {
    try {
      const res = await fetch("/api/jobs", { cache: "no-store" });
      const data = await res.json();
      setJobs(data.jobs ?? []);
    } catch {
      /* keep */
    }
  }, []);
  useEffect(() => { refreshList(); }, [refreshList]);

  const resetForm = () => { setForm(emptyJob); setEditingId(null); };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!password) { setStatus({ state: "error", message: "Inserisci la password." }); return; }
    setStatus({ state: "loading" });
    const isEdit = editingId != null;
    try {
      const res = await fetch(isEdit ? `/api/jobs/${editingId}` : "/api/jobs", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify({
          it: { title: form.title, sede: form.sede, type: form.type, tags: form.tags, description: form.description, requirements: form.requirements },
          en: { title: form.enTitle, sede: form.enSede, type: form.enType, tags: form.enTags, description: form.enDescription, requirements: form.enRequirements },
        }),
      });
      const data = await res.json();
      if (!res.ok) { setStatus({ state: "error", message: data.error || "Errore." }); return; }
      setStatus({ state: "ok", message: isEdit ? `Aggiornato: ${data.job.it.title}.` : `Pubblicato: ${data.job.it.title}.` });
      resetForm();
      await refreshList();
    } catch {
      setStatus({ state: "error", message: "Rete non raggiungibile." });
    }
  };

  const startEdit = (j: Job) => {
    setEditingId(j.id);
    setForm({
      title: j.it.title, sede: j.it.sede, type: j.it.type, tags: j.it.tags.join(", "),
      description: j.it.description.join("\n"), requirements: serializeGroups(j.it.requirementGroups),
      enTitle: j.en?.title ?? "", enSede: j.en?.sede ?? "", enType: j.en?.type ?? "",
      enTags: j.en?.tags?.join(", ") ?? "", enDescription: j.en?.description?.join("\n") ?? "",
      enRequirements: j.en?.requirementGroups ? serializeGroups(j.en.requirementGroups) : "",
    });
    setStatus({ state: "idle" });
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const remove = async (j: Job) => {
    if (!password) { setStatus({ state: "error", message: "Inserisci la password per eliminare." }); return; }
    if (!window.confirm(`Eliminare definitivamente "${j.it.title}"?`)) return;
    setBusyId(j.id);
    setStatus({ state: "loading" });
    try {
      const res = await fetch(`/api/jobs/${j.id}`, { method: "DELETE", headers: { "x-admin-password": password } });
      const data = await res.json();
      if (!res.ok) { setStatus({ state: "error", message: data.error || "Errore." }); return; }
      if (editingId === j.id) resetForm();
      setStatus({ state: "ok", message: `Eliminato: ${j.it.title}.` });
      await refreshList();
    } catch {
      setStatus({ state: "error", message: "Rete non raggiungibile." });
    } finally {
      setBusyId(null);
    }
  };

  const isEdit = editingId != null;

  return (
    <>
      <form ref={formRef} onSubmit={submit} style={{ marginTop: 34, display: "flex", flexDirection: "column", gap: 22, scrollMarginTop: 24 }}>
        <PanelHeading title={isEdit ? "Modifica offerta" : "Nuova offerta"} onCancel={isEdit ? resetForm : undefined} />
        <Row label="Titolo"><input type="text" required value={form.title} onChange={set("title")} style={inputStyle} placeholder="es. Consulente SAP S/4HANA" /></Row>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
          <Row label="Sede di lavoro"><input type="text" required value={form.sede} onChange={set("sede")} style={inputStyle} placeholder="es. Remoto / Treviso / Padova" /></Row>
          <Row label="Tipo di contratto"><input type="text" required value={form.type} onChange={set("type")} style={inputStyle} placeholder="es. Tempo indeterminato / Full-time" /></Row>
        </div>
        <Row label="Tag (separati da virgola)"><input type="text" value={form.tags} onChange={set("tags")} style={inputStyle} placeholder="SAP S/4HANA, FI/CO, 3+ anni" /></Row>
        <Row label="Il ruolo (un paragrafo per riga)"><textarea required value={form.description} onChange={set("description")} rows={4} style={{ ...inputStyle, resize: "vertical" }} /></Row>
        <Row label="Requisiti (usa # per i gruppi)">
          <textarea required value={form.requirements} onChange={set("requirements")} rows={7} style={{ ...inputStyle, resize: "vertical", fontFamily: MONO, fontSize: 13 }} placeholder={REQ_PLACEHOLDER} />
        </Row>
        <p style={{ margin: "-10px 0 0", color: "#6B7686", fontWeight: 300, fontSize: 13 }}>
          Suggerimento: una riga che inizia con <code>#</code> è il titolo di un gruppo (es. <code># Requisiti essenziali</code>); le altre righe sono i punti.
        </p>

        <details style={{ border: "1px solid #DDE6E8", borderRadius: 14, padding: "16px 18px", background: "#fff" }}>
          <summary style={{ cursor: "pointer", fontFamily: GRO, fontWeight: 700, fontSize: 16, color: NAVY }}>
            English (opzionale) {form.enTitle ? "· EN ✓" : ""}
          </summary>
          <p style={{ margin: "10px 0 16px", color: "#6B7686", fontWeight: 300, fontSize: 14 }}>Traduzione mostrata su /en. I campi vuoti usano il testo italiano.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Row label="Title (EN)"><input type="text" value={form.enTitle} onChange={set("enTitle")} style={inputStyle} /></Row>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Row label="Location (EN)"><input type="text" value={form.enSede} onChange={set("enSede")} style={inputStyle} /></Row>
              <Row label="Contract (EN)"><input type="text" value={form.enType} onChange={set("enType")} style={inputStyle} /></Row>
            </div>
            <Row label="Tags (EN)"><input type="text" value={form.enTags} onChange={set("enTags")} style={inputStyle} /></Row>
            <Row label="The role (EN — one paragraph per line)"><textarea value={form.enDescription} onChange={set("enDescription")} rows={4} style={{ ...inputStyle, resize: "vertical" }} /></Row>
            <Row label="Requirements (EN — use # for groups)"><textarea value={form.enRequirements} onChange={set("enRequirements")} rows={7} style={{ ...inputStyle, resize: "vertical", fontFamily: MONO, fontSize: 13 }} /></Row>
          </div>
        </details>

        <SubmitButton loading={status.state === "loading"} label={isEdit ? "Salva modifiche" : "Pubblica offerta"} />
      </form>

      <StatusBox status={status} />

      <ListSection title="Offerte pubblicate" count={jobs.length} empty="Nessuna offerta.">
        {jobs.map((j) => (
          <ListRow
            key={j.id}
            eyebrow={`${j.it.sede}${j.en?.title ? " · EN ✓" : ""}`}
            title={j.it.title}
            busy={busyId === j.id}
            onEdit={() => startEdit(j)}
            onDelete={() => remove(j)}
          />
        ))}
      </ListSection>
    </>
  );
}

/* =========================================================================
   Shared bits
   ========================================================================= */
function PanelHeading({ title, onCancel }: { title: string; onCancel?: () => void }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
      <h2 style={{ margin: 0, fontFamily: GRO, fontWeight: 700, fontSize: 22, color: NAVY }}>{title}</h2>
      {onCancel && (
        <button type="button" onClick={onCancel} style={{ background: "none", border: "none", color: TEAL, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
          Annulla modifica
        </button>
      )}
    </div>
  );
}

function SubmitButton({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button type="submit" disabled={loading} style={{ alignSelf: "flex-start", background: NAVY, color: "#fff", border: "none", borderRadius: 999, padding: "15px 40px", fontSize: 15, fontWeight: 600, cursor: loading ? "wait" : "pointer", opacity: loading ? 0.7 : 1 }}>
      {loading ? "Salvataggio…" : label}
    </button>
  );
}

function StatusBox({ status }: { status: Status }) {
  if (status.state === "ok")
    return <div style={{ marginTop: 24, border: "1px solid rgba(77,147,162,.45)", background: "rgba(77,147,162,.1)", borderRadius: 14, padding: "18px 20px", color: NAVY }}>✓ {status.message} Le pagine sono state rivalidate.</div>;
  if (status.state === "error")
    return <div style={{ marginTop: 24, border: "1px solid rgba(214,69,69,.4)", background: "rgba(214,69,69,.08)", borderRadius: 14, padding: "18px 20px", color: "#b3261e" }}>{status.message}</div>;
  return null;
}

function ListSection({ title, count, empty, children }: { title: string; count: number; empty: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 56 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 18 }}>
        <h2 style={{ margin: 0, fontFamily: GRO, fontWeight: 700, fontSize: 22, color: NAVY }}>{title}</h2>
        <span style={labelStyle}>{count}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {children}
        {count === 0 && <p style={{ color: "#6B7686", fontWeight: 300 }}>{empty}</p>}
      </div>
    </div>
  );
}

function ListRow({ eyebrow, title, busy, onEdit, onDelete }: { eyebrow: string; title: string; busy: boolean; onEdit: () => void; onDelete: () => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, background: "#fff", border: "1px solid #e5e9f0", borderRadius: 14, padding: "16px 18px" }}>
      <div style={{ minWidth: 0 }}>
        <span style={{ ...labelStyle, color: TEAL }}>{eyebrow}</span>
        <p style={{ margin: "6px 0 0", fontFamily: GRO, fontWeight: 500, fontSize: 16, color: NAVY, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</p>
      </div>
      <div style={{ display: "flex", gap: 8, flex: "none" }}>
        <button type="button" onClick={onEdit} style={btnSmall(NAVY)}>Modifica</button>
        <button type="button" onClick={onDelete} disabled={busy} style={btnSmall("#b3261e", busy)}>{busy ? "…" : "Elimina"}</button>
      </div>
    </div>
  );
}

function btnSmall(color: string, disabled = false): CSSProperties {
  return { background: "transparent", border: `1px solid ${color}`, color, borderRadius: 999, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: disabled ? "wait" : "pointer", opacity: disabled ? 0.6 : 1 };
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={labelStyle}>{label}</span>
      {children}
    </label>
  );
}
