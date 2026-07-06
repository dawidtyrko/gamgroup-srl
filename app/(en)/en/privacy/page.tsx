import type { Metadata } from "next";
import type { CSSProperties } from "react";

export const metadata: Metadata = {
  title: "Privacy Policy — GAM Group Srl",
  description:
    "Privacy policy on the processing of personal data pursuant to Regulation (EU) 2016/679 (GDPR).",
  alternates: {
    canonical: "/en/privacy",
    languages: { it: "/privacy", en: "/en/privacy", "x-default": "/privacy" },
  },
};

const NAVY = "#1E333B";
const TEAL = "#35707E";
const GREY = "#536F83";
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
 * NOTE: draft policy — have legal counsel validate before final publication
 * (same reviewer as the Italian informativa).
 */
export default function PrivacyPageEn() {
  return (
    <main style={{ background: "#fff", minHeight: "100vh", padding: "clamp(50px,8vw,90px) 6vw" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <a href="/en" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: MONO, fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: NAVY, textDecoration: "none", borderBottom: `1px solid ${TEAL}`, paddingBottom: 2 }}>
          ← Back to home
        </a>

        <p style={{ margin: "36px 0 10px", fontFamily: MONO, fontSize: 12, letterSpacing: ".26em", textTransform: "uppercase", color: TEAL }}>Privacy</p>
        <h1 style={{ margin: 0, fontFamily: GRO, fontWeight: 700, fontSize: "clamp(30px,4.4vw,48px)", letterSpacing: "-.02em", color: NAVY }}>
          Privacy policy — personal data processing
        </h1>
        <p style={{ ...p, marginTop: 18 }}>
          Pursuant to Articles 13 and 14 of Regulation (EU) 2016/679 (&ldquo;GDPR&rdquo;), this
          notice describes how the personal data of this website&rsquo;s users are processed.
        </p>

        <h2 style={h2}>1. Data controller</h2>
        <p style={p}>
          <strong style={{ fontWeight: 600, color: NAVY }}>GAM Group Srl</strong> — Via Callalta 31/E, 31100 Treviso (TV), Italy
          <br />
          VAT no. 03641560267 · Email: <a href="mailto:info@gamgroup.it" style={{ color: NAVY, borderBottom: `1px solid ${TEAL}`, textDecoration: "none" }}>info@gamgroup.it</a> · Tel: +39 0422 583693
        </p>

        <h2 style={h2}>2. Data processed and purposes</h2>
        <p style={p}>
          <strong style={{ fontWeight: 600, color: NAVY }}>Contact form:</strong> first name, last name, business email,
          company and message content, processed solely to respond to the request (legal basis:
          the data subject&rsquo;s consent, Art. 6.1.a GDPR, and pre-contractual measures, Art. 6.1.b GDPR).
        </p>
        <p style={p}>
          <strong style={{ fontWeight: 600, color: NAVY }}>Browsing data:</strong> the site uses aggregate, anonymous
          statistics (Vercel Analytics, no profiling cookies) to improve the service
          (legitimate interest, Art. 6.1.f GDPR).
        </p>
        <p style={p}>
          <strong style={{ fontWeight: 600, color: NAVY }}>Job applications:</strong> CVs sent by email to
          recruitment@gamgroup.it are processed for personnel selection.
        </p>

        <h2 style={h2}>3. Recipients and transfers</h2>
        <p style={p}>
          Data are processed by technical providers acting as data processors:
          Vercel Inc. (website and database hosting) and Resend (delivery of contact-form email
          notifications). Some providers may process data outside the EU; in that case the
          transfer takes place on the basis of Standard Contractual Clauses approved by the
          European Commission.
        </p>

        <h2 style={h2}>4. Retention</h2>
        <p style={p}>
          Contact-form data are kept for the time needed to handle the request and for any legal
          obligations, after which they are deleted.
        </p>

        <h2 style={h2}>5. Data subject rights</h2>
        <p style={p}>
          At any time you may exercise the rights provided by Articles 15&ndash;22 GDPR (access,
          rectification, erasure, restriction, portability, objection, withdrawal of consent) by
          writing to info@gamgroup.it. You may also lodge a complaint with the Italian Data
          Protection Authority (www.garanteprivacy.it).
        </p>

        <h2 style={h2}>6. Updates</h2>
        <p style={p}>
          This notice may be updated; the version published on this page is the one in force.
          Last updated: July 2026.
        </p>
      </div>
    </main>
  );
}
