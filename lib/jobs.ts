import { kv } from "@vercel/kv";
import { randomUUID } from "crypto";
import type { Locale } from "./i18n/types";

/**
 * Job board data — stored in a Redis LIST `gam:jobs` (one Job per element),
 * mirroring lib/projects.ts. Bilingual: Italian is the base content, English
 * is an optional per-field override (empty EN fields fall back to Italian at
 * render time — see localizeJob).
 */
export type ReqGroup = { label: string; items: string[] };

export type JobContent = {
  title: string;
  sede: string;
  type: string;
  tags: string[];
  description: string[]; // paragraphs
  requirementGroups: ReqGroup[]; // one or more labelled groups
};

export type Job = {
  id: string;
  it: JobContent;
  en?: Partial<JobContent>;
};

export type JobInput = Omit<Job, "id">;

export const JOBS_KEY = "gam:jobs";

const IT_REQ = (items: string[]): ReqGroup[] => [{ label: "Requisiti", items }];
const EN_REQ = (items: string[]): ReqGroup[] => [{ label: "Requirements", items }];

export const DEFAULT_JOBS: Job[] = [
  {
    id: "seed-sap-s4hana",
    it: {
      title: "Consulente SAP S/4HANA",
      sede: "Remoto / Treviso / Padova",
      type: "Contratto Commercio / Tempo indeterminato / Full-time",
      tags: ["SAP S/4HANA", "FI/CO o MM/SD", "3+ anni"],
      description: [
        "Siamo alla ricerca di Consulenti SAP con almeno 3 anni di esperienza sui moduli SAP (FI, CO, SD, MM).",
        "Il candidato ideale ha una forte capacità di analisi e problem-solving e sa lavorare in team per supportare le aziende Clienti in progetti di migrazione a SAP S/4HANA e attività di supporto AMS.",
      ],
      requirementGroups: IT_REQ([
        "Esperienza di almeno 3 anni in ambito SAP S/4HANA sui moduli (FI, CO, SD, MM)",
        "Inglese fluente (scritto e parlato)",
        "Capacità analitiche e di problem-solving",
        "Esperienza in progetti di migrazione a SAP S/4HANA e supporto AMS",
        "Esperienza nella gestione di progetti SAP o attività di consulenza",
      ]),
    },
    en: {
      title: "SAP S/4HANA Consultant",
      sede: "Remote / Treviso / Padua",
      type: "Commerce contract / Permanent / Full-time",
      tags: ["SAP S/4HANA", "FI/CO or MM/SD", "3+ years"],
      description: [
        "We are looking for SAP Consultants with at least 3 years of experience on SAP modules (FI, CO, SD, MM).",
        "The ideal candidate has strong analytical and problem-solving skills and works well in a team, supporting client companies in SAP S/4HANA migration projects and AMS support activities.",
      ],
      requirementGroups: EN_REQ([
        "At least 3 years of experience with SAP S/4HANA modules (FI, CO, SD, MM)",
        "Fluent English (written and spoken)",
        "Analytical and problem-solving skills",
        "Experience in SAP S/4HANA migration projects and AMS support",
        "Experience managing SAP projects or consulting engagements",
      ]),
    },
  },
  {
    id: "seed-service-manager-ams",
    it: {
      title: "Service Manager AMS",
      sede: "Milano / Remoto",
      type: "Freelance / Full-time fino al 30/06/2025, con possibilità di estensione – disponibilità immediata",
      tags: ["ITIL", "Gestione team", "AMS"],
      description: [
        "Siamo alla ricerca di un Service Manager AMS con esperienza nella gestione di servizi di Application Management Services (AMS) per sistemi ERP.",
        "Il candidato ideale ha una forte capacità di gestione operativa e strategica dei servizi AMS, assicurando il rispetto degli SLA, il coordinamento dei team di supporto e il continuo miglioramento dei processi IT.",
      ],
      requirementGroups: IT_REQ([
        "Esperienza di almeno 3 anni nella gestione di servizi AMS per sistemi ERP",
        "Conoscenza delle metodologie ITIL per la gestione dei servizi IT",
        "Esperienza nella gestione di SLA e KPI relativi a servizi AMS",
        "Ottime capacità di coordinamento e gestione dei team di supporto",
        "Spiccate doti di problem-solving e gestione delle criticità",
      ]),
    },
    en: {
      title: "AMS Service Manager",
      sede: "Milan / Remote",
      type: "Freelance / Full-time until 30/06/2025, extension possible – immediate availability",
      tags: ["ITIL", "Team management", "AMS"],
      description: [
        "We are looking for an AMS Service Manager with experience managing Application Management Services (AMS) for ERP systems.",
        "The ideal candidate has strong operational and strategic management skills for AMS services, ensuring SLA compliance, coordinating support teams and continuously improving IT processes.",
      ],
      requirementGroups: EN_REQ([
        "At least 3 years of experience managing AMS services for ERP systems",
        "Knowledge of ITIL methodologies for IT service management",
        "Experience managing SLAs and KPIs for AMS services",
        "Excellent coordination and support-team management skills",
        "Strong problem-solving and issue-management skills",
      ]),
    },
  },
  {
    id: "seed-sap-analyst",
    it: {
      title: "Analista SAP Tecnico-Funzionale",
      sede: "Milano",
      type: "Freelance / Full-time – Disponibilità immediata",
      tags: ["ABAP", "Moduli SAP", "Analisi funzionale"],
      description: [
        "Siamo alla ricerca di un Analista SAP Tecnico-Funzionale con esperienza nei moduli SAP SD e MM, per supportare le attività di analisi, configurazione e sviluppo all'interno di un contesto strutturato e dinamico.",
        "Il candidato ideale possiede un approccio ibrido tecnico-funzionale, con capacità di analisi dei processi aziendali, configurazione del sistema e debugging in ABAP quando necessario.",
      ],
      requirementGroups: IT_REQ([
        "Profonda conoscenza dei moduli SAP SD e MM (opzionale: moduli WM e FICO)",
        "Conoscenza ABAP e capacità di utilizzare il debug se necessario",
        "Conoscenza della lingua inglese a livello medio",
        "Disponibilità immediata e full-time",
      ]),
    },
    en: {
      title: "SAP Technical-Functional Analyst",
      sede: "Milan",
      type: "Freelance / Full-time – immediate availability",
      tags: ["ABAP", "SAP modules", "Functional analysis"],
      description: [
        "We are looking for an SAP Technical-Functional Analyst with experience in the SAP SD and MM modules, to support analysis, configuration and development within a structured and dynamic environment.",
        "The ideal candidate has a hybrid technical-functional approach, with the ability to analyse business processes, configure the system and debug in ABAP when needed.",
      ],
      requirementGroups: EN_REQ([
        "In-depth knowledge of the SAP SD and MM modules (optional: WM and FICO modules)",
        "ABAP knowledge and the ability to use debugging when needed",
        "Intermediate level of English",
        "Immediate availability and full-time",
      ]),
    },
  },
  {
    id: "seed-it-specialist",
    it: {
      title: "IT Specialist",
      sede: "Remoto / Treviso / Padova",
      type: "Contratto / Freelancer",
      tags: ["Java", "Node.js", "Angular / React"],
      description: [
        "Siamo alla ricerca di un laureando o neolaureato in discipline tecniche o economiche, con una forte passione per il mondo IT e la programmazione.",
        "Il candidato ideale possiede un approccio curioso e proattivo, con una buona capacità di apprendimento e di lavoro in team.",
      ],
      requirementGroups: [
        {
          label: "Requisiti essenziali",
          items: [
            "Laurea (o laureando) in ingegneria informatica, meccanica, delle telecomunicazioni, elettronica; Economia aziendale o economia e commercio; Statistica, fisica o matematica.",
          ],
        },
        {
          label: "Requisiti preferenziali",
          items: [
            "Esperienza con Java e tecnologie back-end",
            "Utilizzo di tecnologie Node.js e framework back-end",
            "Esperienza con Angular, React o altri framework front-end",
          ],
        },
      ],
    },
    en: {
      title: "IT Specialist",
      sede: "Remote / Treviso / Padua",
      type: "Contract / Freelance",
      tags: ["Java", "Node.js", "Angular / React"],
      description: [
        "We are looking for a graduate or soon-to-graduate in technical or economic disciplines, with a strong passion for IT and programming.",
        "The ideal candidate has a curious, proactive approach, with a good capacity for learning and teamwork.",
      ],
      requirementGroups: [
        {
          label: "Essential requirements",
          items: [
            "Degree (or studying towards one) in computer, mechanical, telecommunications or electronic engineering; business economics or economics and commerce; statistics, physics or mathematics.",
          ],
        },
        {
          label: "Preferred requirements",
          items: [
            "Experience with Java and back-end technologies",
            "Use of Node.js technologies and back-end frameworks",
            "Experience with Angular, React or other front-end frameworks",
          ],
        },
      ],
    },
  },
  {
    id: "seed-senior-it-consultant",
    it: {
      title: "Senior IT Consultant",
      sede: "Remoto / Treviso / Padova",
      type: "Contratto Commercio / Tempo indeterminato",
      tags: ["SAP", "AS/400", "5+ anni"],
      description: [
        "Siamo alla ricerca di un Senior IT Consultant con una solida esperienza in ambito economico e tecnico, e con competenze avanzate nel settore IT.",
        "Il candidato ideale ha attitudini sviluppate nel lavoro di squadra e nei rapporti interpersonali, ed è in grado di supportare progetti complessi, portando valore aggiunto con la sua esperienza.",
      ],
      requirementGroups: [
        {
          label: "Requisiti essenziali",
          items: [
            "Esperienza di almeno 4-5 anni in uno dei seguenti ambiti:",
            "Implementazione e gestione di SAP nelle aree logistica (WM, EWM, PP-PS, VC, SD-LE) o amministrazione e finanza (FI, CO, RE, BPC, TR)",
            "Gestione di sistemi AS/400",
          ],
        },
        {
          label: "Requisiti preferenziali",
          items: [
            "Esperienza nell'implementazione di SAP",
            "Partecipazione a progetti internazionali o rollout internazionali",
          ],
        },
      ],
    },
    en: {
      title: "Senior IT Consultant",
      sede: "Remote / Treviso / Padua",
      type: "Commerce contract / Permanent",
      tags: ["SAP", "AS/400", "5+ years"],
      description: [
        "We are looking for a Senior IT Consultant with solid experience in the economic and technical fields, and advanced IT expertise.",
        "The ideal candidate has well-developed teamwork and interpersonal skills, and is able to support complex projects, adding value through their experience.",
      ],
      requirementGroups: [
        {
          label: "Essential requirements",
          items: [
            "At least 4-5 years of experience in one of the following areas:",
            "Implementation and management of SAP in logistics (WM, EWM, PP-PS, VC, SD-LE) or administration and finance (FI, CO, RE, BPC, TR)",
            "Management of AS/400 systems",
          ],
        },
        {
          label: "Preferred requirements",
          items: [
            "Experience in SAP implementation",
            "Participation in international projects or international rollouts",
          ],
        },
      ],
    },
  },
];

function kvConfigured(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}
function requireKv() {
  if (!kvConfigured()) {
    throw new Error("Vercel KV is not configured. Set KV_REST_API_URL and KV_REST_API_TOKEN.");
  }
}

/** Resolve a job for a locale (English fields override Italian per-field). */
export function localizeJob(job: Job, locale: Locale): JobContent {
  const it = job.it;
  if (locale !== "en" || !job.en) return it;
  const en = job.en;
  return {
    title: en.title?.trim() || it.title,
    sede: en.sede?.trim() || it.sede,
    type: en.type?.trim() || it.type,
    tags: en.tags && en.tags.length > 0 ? en.tags : it.tags,
    description: en.description && en.description.length > 0 ? en.description : it.description,
    requirementGroups:
      en.requirementGroups && en.requirementGroups.length > 0 ? en.requirementGroups : it.requirementGroups,
  };
}

export async function getJobs(): Promise<Job[]> {
  if (!kvConfigured()) return DEFAULT_JOBS;
  try {
    const items = await kv.lrange<Job>(JOBS_KEY, 0, -1);
    if (!items || items.length === 0) {
      await kv.rpush(JOBS_KEY, ...DEFAULT_JOBS);
      return DEFAULT_JOBS;
    }
    return items;
  } catch (err) {
    console.error("[jobs] KV read failed, serving defaults:", err);
    return DEFAULT_JOBS;
  }
}

async function writeAll(jobs: Job[]): Promise<void> {
  const tx = kv.multi();
  tx.del(JOBS_KEY);
  if (jobs.length) tx.rpush(JOBS_KEY, ...jobs);
  await tx.exec();
}

export async function addJob(input: JobInput): Promise<Job> {
  requireKv();
  const job: Job = { id: randomUUID(), ...input };
  const len = await kv.llen(JOBS_KEY);
  if (!len) await kv.rpush(JOBS_KEY, ...DEFAULT_JOBS);
  await kv.rpush(JOBS_KEY, job);
  return job;
}

export async function updateJob(id: string, input: JobInput): Promise<Job | null> {
  requireKv();
  const items = (await kv.lrange<Job>(JOBS_KEY, 0, -1)) ?? [];
  const idx = items.findIndex((j) => j.id === id);
  if (idx === -1) return null;
  const updated: Job = { id, ...input };
  items[idx] = updated;
  await writeAll(items);
  return updated;
}

export async function deleteJob(id: string): Promise<boolean> {
  requireKv();
  const items = (await kv.lrange<Job>(JOBS_KEY, 0, -1)) ?? [];
  const next = items.filter((j) => j.id !== id);
  if (next.length === items.length) return false;
  await writeAll(next);
  return true;
}

/* ---- input parsing (admin form → JobInput) ---- */

const splitList = (raw: string): string[] =>
  raw.split(/[\n,]/).map((s) => s.trim()).filter(Boolean);

/** Parse the `# Label` / bullet-lines textarea into requirement groups. */
function parseGroups(raw: string): ReqGroup[] {
  const groups: ReqGroup[] = [];
  let cur: ReqGroup | null = null;
  for (const line of raw.split("\n")) {
    const t = line.trim();
    if (!t) continue;
    if (t.startsWith("#")) {
      cur = { label: t.slice(1).trim(), items: [] };
      groups.push(cur);
    } else {
      if (!cur) {
        cur = { label: "", items: [] };
        groups.push(cur);
      }
      cur.items.push(t);
    }
  }
  return groups.filter((g) => g.items.length > 0);
}

type RawSection = Record<string, unknown>;

function parseSection(raw: RawSection): JobContent {
  const g = (k: string) => String(raw?.[k] ?? "");
  return {
    title: g("title").trim(),
    sede: g("sede").trim(),
    type: g("type").trim(),
    tags: splitList(g("tags")),
    description: g("description").split(/\n+/).map((s) => s.trim()).filter(Boolean),
    requirementGroups: parseGroups(g("requirements")),
  };
}

function toPartial(c: JobContent): Partial<JobContent> | undefined {
  const p: Partial<JobContent> = {};
  if (c.title) p.title = c.title;
  if (c.sede) p.sede = c.sede;
  if (c.type) p.type = c.type;
  if (c.tags.length) p.tags = c.tags;
  if (c.description.length) p.description = c.description;
  if (c.requirementGroups.length) p.requirementGroups = c.requirementGroups;
  return Object.keys(p).length ? p : undefined;
}

export function parseJobInput(
  body: Record<string, unknown>
): { input: JobInput } | { error: string } {
  const it = parseSection((body.it ?? {}) as RawSection);
  const enFull = parseSection((body.en ?? {}) as RawSection);

  const missing = (["title", "sede", "type"] as const).filter((k) => !it[k]);
  if (missing.length) {
    return { error: `Campi IT obbligatori mancanti: ${missing.join(", ")}.` };
  }
  if (it.description.length === 0) return { error: "Inserisci la descrizione (Il ruolo)." };
  if (it.requirementGroups.length === 0) return { error: "Inserisci almeno un requisito." };

  return { input: { it, en: toPartial(enFull) } };
}
