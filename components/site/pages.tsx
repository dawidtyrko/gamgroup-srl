import Link from "next/link";
import GamMap from "@/components/GamMap";
import type { Dict, Locale } from "@/lib/i18n/types";
import type { JobView } from "@/lib/jobs";
import { href, type ServiceKey } from "@/lib/routes";
import { partnerLogos, servicePhoto } from "@/lib/siteData";
import { ADDRESS, ADDRESS_LINE, EMAIL, RECRUITMENT_EMAIL } from "@/lib/contact";
import { CONTACT_FAQ } from "@/lib/faq";
import ContactForm from "./ContactForm";
import JobsList from "./JobsList";
import {
  AiCards,
  AiList,
  Breadcrumb,
  Chips,
  ClientLogos,
  ContactBlock,
  FaqList,
  MarkedText,
  PageHero,
  Photo,
  SectionHead,
  ServiceCards,
  Shell,
  StatsBand,
  Steps,
} from "./ui";

type P = { dict: Dict; locale: Locale };

/**
 * `sizes` per layout, matching the grids in globals.css (breakpoints 640/900).
 * Without these every photo would be fetched at the full 2000px source width.
 */
const HERO_SIZES = "(max-width: 640px) 100vw, 45vw"; // .hero-photos, 3 columns
const ROW_LEAD_SIZES = "(max-width: 640px) 100vw, 45vw"; // .photo-row / .gallery, wide first cell
const ROW_SIZES = "(max-width: 640px) 50vw, 30vw"; // .photo-row, the two narrow cells
const GALLERY_LEAD_SIZES = "(max-width: 640px) 100vw, 50vw"; // .gallery first cell (2fr, spans 2 rows)
const GALLERY_SIZES = "(max-width: 640px) 50vw, 25vw"; // .gallery, the four small cells
const SVC_SIZES = "(max-width: 900px) 100vw, 60vw"; // .svc-top, 1.3fr of 2.3fr

const MailLink = ({ to }: { to: string }) => (
  <a href={`mailto:${to}`} className="inline-link">
    {to}
  </a>
);

/** The contact block's subtitle on the home and chi-siamo pages. */
const AddressAndEmail = () => (
  <>
    {ADDRESS_LINE} · <MailLink to={EMAIL} />
  </>
);

/* ------------------------------------------------------------------ Home */
export function HomePage({ dict, locale }: P) {
  const h = dict.home;
  return (
    <Shell dict={dict} locale={locale} page="home">
      <section className="hero">
        <span className="pill">
          <b>{h.badge}</b>
          {h.pill}
        </span>
        <h1>
          <MarkedText t={h.title} />
        </h1>
        <p>{h.subtitle}</p>
        <div className="hero-ctas">
          <Link href={href("contatti", locale)} className="btn p">
            {h.ctaPrimary}
          </Link>
          <a href="#come" className="btn s">
            {h.ctaSecondary}
          </a>
        </div>
        <div className="hero-photos">
          {/* only the centre photo is preloaded: it is the largest, and below
              640px it is reordered to the top (`.hero-photos .photo:nth-child(2)`) */}
          <Photo k="libreria" dict={dict} eager sizes={HERO_SIZES} />
          <Photo k="tavolo" dict={dict} priority sizes={HERO_SIZES} />
          <Photo k="lavoro" dict={dict} eager sizes={HERO_SIZES} />
        </div>
      </section>

      <section className="clients-strip">
        <p>{h.clientsLabel}</p>
        <ClientLogos variant="strip" />
      </section>

      <section className="journey" id="come">
        <div className="sticky">
          <SectionHead lbl={h.journey.lbl} title={h.journey.title} />
          <p className="lead">{h.journey.lead}</p>
        </div>
        <Steps dict={dict} locale={locale} />
      </section>

      <AiCards dict={dict} />

      <StatsBand dict={dict} />

      <section className="pad">
        <SectionHead lbl={h.services.lbl} title={h.services.title} />
        <ServiceCards dict={dict} locale={locale} />
      </section>

      <ContactBlock
        lbl={h.contact.lbl}
        title={h.contact.title}
        cta={h.contact.cta}
        to={href("contatti", locale)}
        sub={
<AddressAndEmail />
        }
      />
    </Shell>
  );
}

/* ------------------------------------------------------------- Chi siamo */
export function AboutPage({ dict, locale }: P) {
  const a = dict.about;
  return (
    <Shell dict={dict} locale={locale} page="chiSiamo">
      <Breadcrumb items={[{ label: dict.nav.home, to: href("home", locale) }, { label: dict.nav.chiSiamo }]} />
      <PageHero lbl={a.lbl} title={a.title}>
        <p>
          {a.p.pre}
          <b>{a.p.year}</b>
          {a.p.mid}
          <b>{a.p.city}</b>
          {a.p.post}
        </p>
      </PageHero>
      <Photo k="tavolo" dict={dict} className="photo-wide" priority sizes="100vw" />

      <section className="pad">
        <StatsBand dict={dict} />
      </section>

      <section className="pad split">
        <div>
          <SectionHead lbl={a.approach.lbl} title={a.approach.title} />
        </div>
        <div>
          <p className="lead">{a.approach.text}</p>
          <p className="mini-lbl">{a.sectorsLabel}</p>
          <Chips items={a.sectors} outline />
        </div>
      </section>

      {[a.people, a.world].map((b) => (
        <section key={b.lbl} className="pad split">
          <div>
            <SectionHead lbl={b.lbl} title={b.title} />
          </div>
          <div>
            <p className="lead">{b.text}</p>
          </div>
        </section>
      ))}

      <section className="pad">
        <SectionHead lbl={a.company.lbl} title={a.company.title} lead={a.company.lead} />
        <div className="gallery">
          <Photo k="salotto" dict={dict} sizes={GALLERY_LEAD_SIZES} />
          <Photo k="caffe" dict={dict} sizes={GALLERY_SIZES} />
          <Photo k="f1" dict={dict} sizes={GALLERY_SIZES} />
          <Photo k="modellini" dict={dict} sizes={GALLERY_SIZES} />
          <Photo k="vespa" dict={dict} sizes={GALLERY_SIZES} />
        </div>
      </section>

      <section className="pad">
        <SectionHead lbl={a.partners.lbl} title={a.partners.title} />
        <div className="partners">
          {partnerLogos.map((p) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={p.name} src={p.src} alt={p.name} loading="lazy" />
          ))}
        </div>
      </section>

      <ContactBlock
        lbl={a.contact.lbl}
        title={a.contact.title}
        cta={a.contact.cta}
        to={href("contatti", locale)}
        sub={
<AddressAndEmail />
        }
      />
    </Shell>
  );
}

/* --------------------------------------------------------------- Servizio */
export function ServicePage({ dict, locale, service }: P & { service: ServiceKey }) {
  const S = dict.services;
  const s = S.items[service];
  const keys = Object.keys(S.items) as ServiceKey[];
  return (
    <Shell dict={dict} locale={locale} page={`servizio:${service}`}>
      <Breadcrumb
        items={[
          { label: dict.nav.home, to: href("home", locale) },
          { label: dict.common.servizi, to: href("servizio:erp", locale) },
          { label: s.title },
        ]}
      />
      <nav className="tabs" aria-label={dict.common.servizi}>
        {keys.map((k) => (
          <Link key={k} href={href(`servizio:${k}`, locale)} className={k === service ? "on" : undefined} aria-current={k === service ? "page" : undefined}>
            {S.items[k].num} · {S.items[k].title}
          </Link>
        ))}
      </nav>
      <PageHero lbl={`${dict.common.servizio} ${s.num}`} title={s.h1}>
        <p>{s.intro}</p>
      </PageHero>

      <section className="svc-top">
        <Photo k={servicePhoto[service]} dict={dict} priority sizes={SVC_SIZES} />
        <div className="svc-highlight">
          <p>{s.highlight}</p>
          <div>
            <Link href={href("contatti", locale)} className="btn p">
              {s.cta}
            </Link>
          </div>
        </div>
      </section>

      <section className="pad">
        <SectionHead lbl={S.techLbl} title={s.techTitle} />
        <Chips items={s.tags} />
        {s.eco.length > 0 && (
          <div className="eco">
            {s.eco.map((e) => (
              <div key={e.name}>
                <h3>{e.name}</h3>
                <Chips items={e.items} outline />
              </div>
            ))}
          </div>
        )}
      </section>

      {service === "aiBi" && <AiList dict={dict} />}

      <section className="pad split">
        <div>
          <SectionHead lbl={S.pathLbl} title={S.pathTitle} />
          <p className="lead">{s.pathLead}</p>
        </div>
        <Steps dict={dict} locale={locale} active={s.step} activeText={s.stepText} />
      </section>

      <section className="pad">
        <SectionHead lbl={S.faqLbl} title={S.faqTitle} />
        <FaqList dict={dict} items={s.faq} />
      </section>

      <section className="pad">
        <span className="lbl">{S.othersLbl}</span>
        <ServiceCards dict={dict} locale={locale} exclude={service} />
      </section>

      <ContactBlock
        lbl={S.contactLbl}
        title={s.contactTitle}
        cta={dict.home.contact.cta}
        to={href("contatti", locale)}
        sub={
<MailLink to={EMAIL} />
        }
      />
    </Shell>
  );
}

/* ---------------------------------------------------------------- Clienti */
export function ClientsPage({ dict, locale }: P) {
  const c = dict.clients;
  return (
    <Shell dict={dict} locale={locale} page="clienti">
      <Breadcrumb items={[{ label: dict.nav.home, to: href("home", locale) }, { label: dict.nav.clienti }]} />
      <PageHero lbl={c.lbl} title={c.title}>
        <p>{c.lead}</p>
      </PageHero>
      <ClientLogos variant="grid" />

      <section className="pad">
        <SectionHead lbl={c.sectors.lbl} title={c.sectors.title} />
        <Chips items={c.sectors.items} outline />
      </section>

      <ContactBlock
        lbl={c.contact.lbl}
        title={c.contact.title}
        cta={c.contact.cta}
        to={href("contatti", locale)}
        sub={
<MailLink to={EMAIL} />
        }
      />
    </Shell>
  );
}

/* ---------------------------------------------------------- Lavora con noi */
export function JobsPage({ dict, locale, jobs }: P & { jobs: JobView[] }) {
  const j = dict.jobs;
  const count = jobs.length === 1 ? j.countOne : j.countMany.replace("{n}", String(jobs.length));
  return (
    <Shell dict={dict} locale={locale} page="lavora">
      <Breadcrumb items={[{ label: dict.nav.home, to: href("home", locale) }, { label: dict.nav.lavora }]} />
      <PageHero lbl={j.lbl} title={j.title}>
        <p>{j.lead}</p>
      </PageHero>
      <div className="photo-row">
        <Photo k="f1" dict={dict} priority sizes={ROW_LEAD_SIZES} />
        <Photo k="caffe" dict={dict} eager sizes={ROW_SIZES} />
        <Photo k="vespa" dict={dict} eager sizes={ROW_SIZES} />
      </div>

      <section className="pad">
        <SectionHead lbl={j.openLbl} title={jobs.length ? count : j.none} />
        {jobs.length > 0 && <JobsList jobs={jobs} t={j} />}
      </section>

      <ContactBlock
        lbl={j.spontaneous.lbl}
        title={j.spontaneous.title}
        cta={j.spontaneous.cta}
        to={`mailto:${RECRUITMENT_EMAIL}`}
        sub={
          <>
            {j.spontaneous.textPre} <MailLink to={RECRUITMENT_EMAIL} />
          </>
        }
      />
    </Shell>
  );
}

/* --------------------------------------------------------------- Contatti */
export function ContactPage({ dict, locale }: P) {
  const c = dict.contact;
  return (
    <Shell dict={dict} locale={locale} page="contatti">
      <Breadcrumb items={[{ label: dict.nav.home, to: href("home", locale) }, { label: c.lbl }]} />
      <PageHero lbl={c.lbl} title={c.title}>
        <p>{c.lead}</p>
      </PageHero>

      <section className="contact-grid">
        <div className="info">
          <div>
            <small>{c.sedeLbl}</small>
            {ADDRESS.street}
            <br />
            {ADDRESS.postalCode} {ADDRESS.city} ({ADDRESS.province})
          </div>
          <div>
            <small>{c.emailLbl}</small>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
          <div>
            <small>{c.candidatureLbl}</small>
            <a href={`mailto:${RECRUITMENT_EMAIL}`}>{RECRUITMENT_EMAIL}</a>
          </div>
          <GamMap directions={dict.map.directions} />
        </div>
        <ContactForm t={c} privacyHref={href("privacy", locale)} />
      </section>

      <section className="pad">
        <SectionHead lbl={c.faqLbl} title={c.faqTitle} />
        <FaqList dict={dict} items={CONTACT_FAQ} />
      </section>
      <div className="end-space" />
    </Shell>
  );
}
