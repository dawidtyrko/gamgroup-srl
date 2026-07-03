import type { Metadata } from "next";
import type { CSSProperties } from "react";

export const metadata: Metadata = {
  title: "Informativa Privacy — GAM Group Srl",
  description:
    "Informativa sul trattamento dei dati personali ai sensi del Regolamento (UE) 2016/679 (GDPR).",
};

const NAVY = "#1B2A4A";
const TEAL = "#3CC8BD";
const GREY = "#475569";
const MONO = "'Space Mono', monospace";
const GRO = "'Space Grotesk', sans-serif";

const h2: CSSProperties = {
  margin: "44px 0 14px",
  fontFamily: GRO,
  fontWeight: 700,
  fontSize: "clamp(19px,2vw,24px)",
  letterSpacing: "-.01em",
  color: NAVY,
};
const p: CSSProperties = {
  margin: "0 0 14px",
  fontWeight: 300,
  fontSize: 16,
  lineHeight: 1.7,
  color: GREY,
};

/*
 * NOTE: bozza di informativa da far validare a un consulente legale prima
 * della pubblicazione definitiva. Inserire la P.IVA dove indicato.
 */
export default function PrivacyPage() {
  return (
    <main style={{ background: "#fff", minHeight: "100vh", padding: "clamp(50px,8vw,90px) 6vw" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: MONO, fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: NAVY, textDecoration: "none", borderBottom: `1px solid ${TEAL}`, paddingBottom: 2 }}>
          ← Torna alla home
        </a>

        <p style={{ margin: "36px 0 10px", fontFamily: MONO, fontSize: 12, letterSpacing: ".26em", textTransform: "uppercase", color: TEAL }}>Privacy</p>
        <h1 style={{ margin: 0, fontFamily: GRO, fontWeight: 700, fontSize: "clamp(30px,4.4vw,48px)", letterSpacing: "-.02em", color: NAVY }}>
          Informativa sul trattamento dei dati personali
        </h1>
        <p style={{ ...p, marginTop: 18 }}>
          Ai sensi degli artt. 13 e 14 del Regolamento (UE) 2016/679 (&ldquo;GDPR&rdquo;), questa
          informativa descrive come vengono trattati i dati personali degli utenti di questo sito.
        </p>

        <h2 style={h2}>1. Titolare del trattamento</h2>
        <p style={p}>
          <strong style={{ fontWeight: 600, color: NAVY }}>GAM Group Srl</strong> — Via Callalta 31/E, 31100 Treviso (TV), Italia
          <br />
          P.IVA: [DA INSERIRE] · Email: <a href="mailto:info@gamgroup.it" style={{ color: NAVY, borderBottom: `1px solid ${TEAL}`, textDecoration: "none" }}>info@gamgroup.it</a> · Tel: +39 0422 583693
        </p>

        <h2 style={h2}>2. Dati trattati e finalità</h2>
        <p style={p}>
          <strong style={{ fontWeight: 600, color: NAVY }}>Modulo di contatto:</strong> nome, cognome, email aziendale, azienda e
          contenuto del messaggio, trattati al solo fine di rispondere alla richiesta (base giuridica:
          consenso dell&rsquo;interessato, art. 6.1.a GDPR, e misure precontrattuali, art. 6.1.b GDPR).
        </p>
        <p style={p}>
          <strong style={{ fontWeight: 600, color: NAVY }}>Dati di navigazione:</strong> il sito utilizza statistiche aggregate e
          anonime (Vercel Analytics, senza cookie di profilazione) per finalità di miglioramento del
          servizio (legittimo interesse, art. 6.1.f GDPR).
        </p>
        <p style={p}>
          <strong style={{ fontWeight: 600, color: NAVY }}>Candidature:</strong> i CV inviati via email a
          recruitment@gamgroup.it sono trattati per la selezione del personale.
        </p>

        <h2 style={h2}>3. Destinatari e trasferimenti</h2>
        <p style={p}>
          I dati sono trattati da fornitori tecnici che agiscono come responsabili del trattamento:
          Vercel Inc. (hosting del sito e della base dati) e Resend (invio delle notifiche email del
          modulo di contatto). Alcuni fornitori possono trattare dati al di fuori dell&rsquo;UE; in tal caso
          il trasferimento avviene sulla base di Clausole Contrattuali Standard approvate dalla
          Commissione Europea.
        </p>

        <h2 style={h2}>4. Conservazione</h2>
        <p style={p}>
          I dati del modulo di contatto sono conservati per il tempo necessario a gestire la richiesta
          e per eventuali obblighi di legge, dopodiché vengono cancellati.
        </p>

        <h2 style={h2}>5. Diritti dell&rsquo;interessato</h2>
        <p style={p}>
          In qualsiasi momento è possibile esercitare i diritti previsti dagli artt. 15&ndash;22 GDPR
          (accesso, rettifica, cancellazione, limitazione, portabilità, opposizione, revoca del
          consenso) scrivendo a info@gamgroup.it. È inoltre possibile proporre reclamo al Garante per
          la Protezione dei Dati Personali (www.garanteprivacy.it).
        </p>

        <h2 style={h2}>6. Aggiornamenti</h2>
        <p style={p}>
          La presente informativa può essere aggiornata; la versione pubblicata su questa pagina è
          quella vigente. Ultimo aggiornamento: luglio 2026.
        </p>
      </div>
    </main>
  );
}
