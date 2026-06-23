"use client";

import { CSSProperties, FormEvent, useState } from "react";

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
  | { state: "ok"; title: string }
  | { state: "error"; message: string };

export default function AdminCms() {
  const [password, setPassword] = useState("");
  const [sector, setSector] = useState("");
  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [challenge, setChallenge] = useState("");
  const [description, setDescription] = useState("");
  const [benefits, setBenefits] = useState("");
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus({ state: "loading" });
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          sector,
          img,
          title,
          challenge,
          description,
          benefits, // newline/comma separated; the API splits it
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ state: "error", message: data.error || "Errore." });
        return;
      }
      setStatus({ state: "ok", title: data.project.title });
      // Reset content fields, keep the password for the next entry.
      setSector("");
      setImg("");
      setTitle("");
      setChallenge("");
      setDescription("");
      setBenefits("");
    } catch {
      setStatus({ state: "error", message: "Rete non raggiungibile." });
    }
  };

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
        <p style={{ ...labelStyle, color: TEAL, margin: "0 0 10px" }}>Admin CMS</p>
        <h1 style={{ margin: 0, fontFamily: GRO, fontWeight: 700, fontSize: "clamp(28px,4vw,46px)", letterSpacing: "-.02em", color: NAVY }}>
          Aggiungi un case study
        </h1>
        <p style={{ marginTop: 14, color: "#6B7686", fontWeight: 300, fontSize: 16, lineHeight: 1.6 }}>
          I progetti vengono salvati su Vercel KV e pubblicati nella sezione
          &laquo;I progetti&raquo;. La home si aggiorna automaticamente (ISR)
          dopo l&rsquo;invio.
        </p>

        <form onSubmit={submit} style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 22 }}>
          <Row label="Password">
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} placeholder="ADMIN_CMS_PASSWORD" />
          </Row>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
            <Row label="Settore (pill)">
              <input type="text" required value={sector} onChange={(e) => setSector(e.target.value)} style={inputStyle} placeholder="es. Retail" />
            </Row>
            <Row label="Etichetta immagine">
              <input type="text" value={img} onChange={(e) => setImg(e.target.value)} style={inputStyle} placeholder="es. [ punto vendita ]" />
            </Row>
          </div>

          <Row label="Titolo">
            <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} placeholder="Titolo del case study" />
          </Row>

          <Row label="La sfida">
            <textarea required value={challenge} onChange={(e) => setChallenge(e.target.value)} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
          </Row>

          <Row label="Il progetto">
            <textarea required value={description} onChange={(e) => setDescription(e.target.value)} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
          </Row>

          <Row label="Benefici (uno per riga)">
            <textarea required value={benefits} onChange={(e) => setBenefits(e.target.value)} rows={4} style={{ ...inputStyle, resize: "vertical" }} placeholder={"Riduzione dei tempi di fermo\nSLA rispettati con costanza\n..."} />
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
            {status.state === "loading" ? "Salvataggio…" : "Pubblica progetto"}
          </button>
        </form>

        {status.state === "ok" && (
          <div style={{ marginTop: 24, border: "1px solid rgba(60,200,189,.4)", background: "rgba(60,200,189,.1)", borderRadius: 14, padding: "18px 20px", color: NAVY }}>
            ✓ Pubblicato: <strong>{status.title}</strong>. La home è stata rivalidata.
          </div>
        )}
        {status.state === "error" && (
          <div style={{ marginTop: 24, border: "1px solid rgba(214,69,69,.4)", background: "rgba(214,69,69,.08)", borderRadius: 14, padding: "18px 20px", color: "#b3261e" }}>
            {status.message}
          </div>
        )}
      </div>
    </main>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={labelStyle}>{label}</span>
      {children}
    </label>
  );
}
