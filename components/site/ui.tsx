import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Dict, FaqId, Locale, Marked } from "@/lib/i18n/types";
import { href, SERVICE_KEYS, type PageKey, type ServiceKey } from "@/lib/routes";
import { pickFaq } from "@/lib/faqSelect";
import { clientLogos, photos, type PhotoKey } from "@/lib/siteData";
import Header from "./Header";
import Footer from "./Footer";

/** Header + page + footer: every public page is wrapped in this. */
export function Shell({ dict, locale, page, children }: { dict: Dict; locale: Locale; page: PageKey; children: ReactNode }) {
  return (
    <>
      <Header dict={{ nav: dict.nav, langSwitch: dict.langSwitch }} locale={locale} page={page} />
      <main className="wrap">{children}</main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}

export function MarkedText({ t }: { t: Marked }) {
  return (
    <>
      {t.pre}
      <u>{t.mark}</u>
      {t.post}
    </>
  );
}

/** Turns e-mail addresses inside plain copy into mailto links. */
export function linkify(text: string): ReactNode[] {
  return text.split(/([\w.+-]+@[\w-]+\.[\w.]+)/g).map((part, i) =>
    i % 2 ? (
      <a key={i} href={`mailto:${part}`} className="inline-link">
        {part}
      </a>
    ) : (
      part
    )
  );
}

export function Breadcrumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav className="crumb" aria-label="Breadcrumb">
      {items.map((it, i) => (
        <span key={i}>
          {i > 0 && " / "}
          {it.to ? <Link href={it.to}>{it.label}</Link> : <b>{it.label}</b>}
        </span>
      ))}
    </nav>
  );
}

export function PageHero({ lbl, title, children }: { lbl: string; title: Marked; children: ReactNode }) {
  return (
    <section className="phero">
      <div>
        <span className="lbl">{lbl}</span>
        <h1>
          <MarkedText t={title} />
        </h1>
      </div>
      <div className="phero-text">{children}</div>
    </section>
  );
}

/**
 * Office photo. The sources are 2000px wide but `.photo` renders them inside
 * fixed-height grid cells (300–460px tall), so next/image is what keeps the
 * payload honest: it emits a WebP srcset and `sizes` tells the browser which
 * width to actually fetch. Always pass the `sizes` that matches the container —
 * the 100vw default only suits full-width photos.
 */
export function Photo({
  k,
  dict,
  className,
  priority,
  eager,
  sizes = "100vw",
}: {
  k: PhotoKey;
  dict: Dict;
  className?: string;
  /** Preloads the image — use for the one LCP candidate per page, no more. */
  priority?: boolean;
  /** Above the fold but not the LCP: fetch immediately, without a preload hint. */
  eager?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      src={photos[k]}
      alt={dict.photoAlts[k]}
      width={2000}
      height={1331}
      priority={priority}
      loading={!priority && eager ? "eager" : undefined}
      sizes={sizes}
      className={`photo${className ? ` ${className}` : ""}`}
    />
  );
}

export function StatsBand({ dict }: { dict: Dict }) {
  return (
    <section className="band">
      {dict.stats.map((s) => (
        <div key={s.label}>
          <b>{s.value}+</b>
          <span>{s.label}</span>
        </div>
      ))}
    </section>
  );
}

export function Chips({ items, outline }: { items: string[]; outline?: boolean }) {
  return (
    <div className={`chips${outline ? " o" : ""}`}>
      {/* positional keys: these are free-form string lists, not a keyed set */}
      {items.map((c, i) => (
        <span key={i}>{c}</span>
      ))}
    </div>
  );
}

/**
 * The 4 steps of "come lavoriamo". Each service declares its step (`step`):
 * on the home page every step links to its service; on a service page only
 * the current step is expanded and the others are dimmed.
 */
export function Steps({ dict, locale, active, activeText }: { dict: Dict; locale: Locale; active?: number; activeText?: string }) {
  return (
    <div className="steps">
      {dict.steps.map((s, i) => {
        const n = i + 1;
        const key = SERVICE_KEYS.find((k) => dict.services.items[k].step === n) ?? SERVICE_KEYS[i];
        const svc = dict.services.items[key];
        const on = active ? n === active : n === 1;
        const dim = active !== undefined && n !== active;
        return (
          <div key={s.title} className={`step${on ? " on" : ""}${dim ? " dim" : ""}`}>
            <span className="n">{n}</span>
            <div>
              <h3>{s.title}</h3>
              {!dim && <p>{active ? activeText ?? s.text : s.text}</p>}
              {active === undefined && (
                <Link href={href(`servizio:${key}`, locale)} className="svc">
                  {svc.title}
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ServiceCards({ dict, locale, exclude }: { dict: Dict; locale: Locale; exclude?: ServiceKey }) {
  const keys = SERVICE_KEYS.filter((k) => k !== exclude);
  return (
    <div className={`cards${keys.length === 3 ? " c3" : ""}`}>
      {keys.map((k) => {
        const s = dict.services.items[k];
        return (
          <Link key={k} href={href(`servizio:${k}`, locale)} className="card">
            <span className="dot" />
            <h3>{s.title}</h3>
            <p>{s.short}</p>
            <span className="more">{dict.common.scopri}</span>
          </Link>
        );
      })}
    </div>
  );
}

export function ClientLogos({ variant }: { variant: "strip" | "grid" }) {
  return (
    <div className={variant === "strip" ? "logos-strip" : "logos-grid"}>
      {clientLogos.map((c) => (
        <div key={c.name} className="logo-cell">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.src} alt={c.name} loading="lazy" style={c.invert ? { filter: "invert(1) grayscale(1)" } : undefined} />
        </div>
      ))}
    </div>
  );
}

export function FaqList({ dict, items }: { dict: Dict; items: FaqId[] }) {
  return (
    <div className="faq">
      {pickFaq(dict, items).map((f, n) => (
        <details key={f.id} open={n === 0}>
          <summary>{f.q}</summary>
          <p>{linkify(f.a)}</p>
        </details>
      ))}
    </div>
  );
}

export function ContactBlock({ lbl, title, cta, to, sub }: { lbl: string; title: string; cta: string; to: string; sub?: ReactNode }) {
  return (
    <section className="contact-block">
      <div>
        <span className="lbl">{lbl}</span>
        <h2 className="h2">{title}</h2>
        {sub && <p className="lead">{sub}</p>}
      </div>
      <div className="contact-block-cta">
        <Link href={to} className="btn p">
          {cta}
        </Link>
      </div>
    </section>
  );
}

/** "L'AI in pratica" as cards — home page. */
export function AiCards({ dict }: { dict: Dict }) {
  const a = dict.ai;
  return (
    <section className="pad ai-section">
      <SectionHead lbl={a.lbl} title={a.title} lead={a.intro} />
      <div className="cards">
        {a.areas.map((x) => (
          <div key={x.title} className="card">
            <span className="dot" />
            <h3>{x.title}</h3>
            <p>{x.text}</p>
          </div>
        ))}
      </div>
      <p className="ai-close">{a.close}</p>
    </section>
  );
}

/** The same areas as a numbered list — AI & BI service page. */
export function AiList({ dict }: { dict: Dict }) {
  const a = dict.ai;
  return (
    <section className="pad split">
      <div>
        <SectionHead lbl={a.listLbl} title={a.title} />
        <p className="lead">{a.intro}</p>
      </div>
      <div className="steps">
        {a.areas.map((x, i) => (
          <div key={x.title} className="step">
            <span className="n">{i + 1}</span>
            <div>
              <h3>{x.title}</h3>
              <p>{x.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SectionHead({ lbl, title, lead }: { lbl: string; title: string; lead?: string }) {
  return (
    <>
      <span className="lbl">{lbl}</span>
      <h2 className="h2">{title}</h2>
      {lead && <p className="lead narrow">{lead}</p>}
    </>
  );
}
