import { kv } from "@vercel/kv";
import { randomUUID } from "crypto";

/**
 * A Case Study ("I progetti" / modal content).
 * Field names map 1:1 to the README modal blocks:
 *   challenge   -> "La sfida"
 *   description -> "Il progetto"
 *   benefits    -> "Benefici" (rendered as the 2-col ✓ list)
 */
/** Optional English translation of a case study (per-field fallback to Italian). */
export type ProjectEn = {
  sector?: string;
  area?: string;
  title?: string;
  challenge?: string;
  description?: string;
  benefits?: string[];
};

export type Project = {
  id: string;
  sector: string; // pill label, e.g. "Fashion"
  img: string; // placeholder caption for the card/modal banner, e.g. "[ fashion retail ]"
  title: string;
  challenge: string;
  description: string;
  benefits: string[];
  featured?: boolean; // shown in the "Case study in evidenza" block on the homepage
  area?: string; // technical area badge, e.g. "AMS", "EDI", "AS400"
  image?: string; // photo URL (absolute or /photos/...); rendered with the duotone treatment
  en?: ProjectEn; // English fields — anything missing falls back to Italian
};

export type ProjectInput = Omit<Project, "id">;

/**
 * Resolve a project for a locale: English fields override Italian ones
 * per-field, so half-translated projects still render completely.
 */
export function localizeProject(p: Project, locale: "it" | "en"): Project {
  if (locale !== "en" || !p.en) return p;
  return {
    ...p,
    sector: p.en.sector?.trim() || p.sector,
    area: p.en.area?.trim() || p.area,
    title: p.en.title?.trim() || p.title,
    challenge: p.en.challenge?.trim() || p.challenge,
    description: p.en.description?.trim() || p.description,
    benefits: p.en.benefits && p.en.benefits.length > 0 ? p.en.benefits : p.benefits,
  };
}

/**
 * Vercel KV data structure
 * -------------------------
 * Projects are stored as a single Redis LIST under `gam:projects`.
 * Each list element is a Project object (the @vercel/kv client serialises
 * objects to JSON on write and parses them on read). Ordering is insertion
 * order (RPUSH appends), which is exactly the order the horizontal gallery
 * renders. Reading the whole gallery is one `LRANGE 0 -1`.
 */
export const PROJECTS_KEY = "gam:projects";

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: "seed-fashion-helpdesk",
    sector: "Fashion",
    area: "HD1 & HD2",
    img: "[ fashion retail ]",
    title: "Help Desk e Supporto Sistemistico per l’Efficienza Operativa",
    challenge:
      "Garantire la continuità operativa tra sede e punti vendita, con tempi di risposta rapidi su postazioni, reti e applicativi di negozio.",
    description:
      "Abbiamo attivato un servizio di Help Desk HD1 e HD2 con presidio sistemistico dedicato, gestendo richieste, incidenti e manutenzione di postazioni e infrastruttura.",
    benefits: [
      "Riduzione dei tempi di fermo",
      "SLA rispettati con costanza",
      "Un unico punto di contatto",
      "Maggiore continuità operativa",
    ],
  },
  {
    id: "seed-automotive-as400",
    sector: "Automotive",
    area: "AS400",
    img: "[ linea automotive ]",
    title: "Innovazione e Supporto Continuo nell’Area AS400",
    challenge:
      "Mantenere ed evolvere sistemi gestionali IBM i-Series critici per la produzione, senza interruzioni del servizio.",
    description:
      "Manutenzione correttiva ed evolutiva su AS400, con sviluppi mirati e affiancamento costante ai team interni del cliente.",
    benefits: [
      "Sistemi sempre disponibili",
      "Evoluzioni rilasciate in sicurezza",
      "Know-how preservato nel tempo",
      "Costi di gestione ottimizzati",
    ],
  },
  {
    id: "seed-manufacturing-edi",
    sector: "Manufacturing",
    area: "EDI",
    img: "[ stabilimento ]",
    title: "Soluzioni EDI e Budgeting per un’Operatività Globale",
    challenge:
      "Integrare i flussi documentali con partner internazionali e strutturare il processo di budgeting su più sedi.",
    description:
      "Implementazione di flussi EDI e di strumenti di budgeting integrati con l’ERP, allineando i processi a livello globale.",
    benefits: [
      "Scambio dati automatizzato",
      "Meno errori manuali",
      "Visibilità puntuale sui costi",
      "Processi allineati tra le sedi",
    ],
  },
  {
    id: "seed-pharma-ams",
    sector: "Farmaceutico",
    area: "AMS",
    img: "[ laboratorio ]",
    title: "Supporto AMS Affidabile per la Crescita Continua",
    challenge:
      "Assicurare una manutenzione applicativa affidabile in un settore regolamentato e in espansione.",
    description:
      "Servizio AMS strutturato con presidio applicativo, gestione delle richieste e miglioramento continuo delle soluzioni.",
    benefits: [
      "Applicazioni stabili e monitorate",
      "Richieste gestite con SLA",
      "Conformità mantenuta",
      "Supporto scalabile con la crescita",
    ],
  },
];

/** True only when the KV REST credentials are present in the environment. */
function kvConfigured(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

/**
 * Read all case studies in display order.
 * Falls back to the in-memory seed when KV is not configured (local dev) or
 * unreachable, so the site always renders. Lazily seeds an empty store so the
 * very first deploy shows the four reference case studies.
 */
export async function getProjects(): Promise<Project[]> {
  if (!kvConfigured()) return DEFAULT_PROJECTS;
  try {
    const items = await kv.lrange<Project>(PROJECTS_KEY, 0, -1);
    if (!items || items.length === 0) {
      await kv.rpush(PROJECTS_KEY, ...DEFAULT_PROJECTS);
      return DEFAULT_PROJECTS;
    }
    return items;
  } catch (err) {
    console.error("[projects] KV read failed, serving defaults:", err);
    return DEFAULT_PROJECTS;
  }
}

function requireKv() {
  if (!kvConfigured()) {
    throw new Error(
      "Vercel KV is not configured. Set KV_REST_API_URL and KV_REST_API_TOKEN."
    );
  }
}

/** Trim an English-translation block; empty block becomes undefined. */
function normalizeEn(en?: ProjectEn): ProjectEn | undefined {
  if (!en) return undefined;
  const out: ProjectEn = {
    sector: en.sector?.trim() || undefined,
    area: en.area?.trim() || undefined,
    title: en.title?.trim() || undefined,
    challenge: en.challenge?.trim() || undefined,
    description: en.description?.trim() || undefined,
    benefits: en.benefits?.map((b) => b.trim()).filter(Boolean),
  };
  if (out.benefits && out.benefits.length === 0) out.benefits = undefined;
  const hasAny = Object.values(out).some((v) => v !== undefined);
  return hasAny ? out : undefined;
}

/** Build a clean, trimmed Project from raw input. */
function normalize(input: ProjectInput, id: string): Project {
  return {
    id,
    sector: input.sector.trim(),
    img: input.img?.trim() || "[ case study ]",
    title: input.title.trim(),
    challenge: input.challenge.trim(),
    description: input.description.trim(),
    benefits: input.benefits.map((b) => b.trim()).filter(Boolean),
    featured: Boolean(input.featured),
    area: input.area?.trim() || undefined,
    image: input.image?.trim() || undefined,
    en: normalizeEn(input.en),
  };
}

/** Atomically replace the whole list (used by update/delete). */
async function writeAll(projects: Project[]): Promise<void> {
  const tx = kv.multi();
  tx.del(PROJECTS_KEY);
  if (projects.length) tx.rpush(PROJECTS_KEY, ...projects);
  await tx.exec();
}

/** Append a new case study to KV and return the stored record. */
export async function addProject(input: ProjectInput): Promise<Project> {
  requireKv();
  const project = normalize(input, randomUUID());

  // Seed defaults if the list is still empty, so admin additions append after them.
  const len = await kv.llen(PROJECTS_KEY);
  if (!len) await kv.rpush(PROJECTS_KEY, ...DEFAULT_PROJECTS);

  await kv.rpush(PROJECTS_KEY, project);
  return project;
}

/** Update an existing case study in place. Returns null if the id is unknown. */
export async function updateProject(
  id: string,
  input: ProjectInput
): Promise<Project | null> {
  requireKv();
  const items = (await kv.lrange<Project>(PROJECTS_KEY, 0, -1)) ?? [];
  const idx = items.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const updated = normalize(input, id);
  items[idx] = updated;
  await writeAll(items);
  return updated;
}

/** Delete a case study by id. Returns false if the id is unknown. */
export async function deleteProject(id: string): Promise<boolean> {
  requireKv();
  const items = (await kv.lrange<Project>(PROJECTS_KEY, 0, -1)) ?? [];
  const next = items.filter((p) => p.id !== id);
  if (next.length === items.length) return false;
  await writeAll(next);
  return true;
}

/**
 * Validate + normalise a raw request body into ProjectInput.
 * `benefits` may be an array or a newline/comma-separated string.
 */
export function parseProjectInput(
  body: Record<string, unknown>
): { input: ProjectInput } | { error: string } {
  const parseBenefits = (raw: unknown): string[] =>
    Array.isArray(raw)
      ? raw.map(String)
      : typeof raw === "string"
        ? raw.split(/[\n,]/)
        : [];
  const benefits = parseBenefits(body.benefits);

  // optional English block (per-field fallback happens at render time)
  const rawEn = (body.en ?? {}) as Record<string, unknown>;
  const en: ProjectEn = {
    sector: String(rawEn.sector ?? ""),
    area: String(rawEn.area ?? ""),
    title: String(rawEn.title ?? ""),
    challenge: String(rawEn.challenge ?? ""),
    description: String(rawEn.description ?? ""),
    benefits: parseBenefits(rawEn.benefits).map((b) => b.trim()).filter(Boolean),
  };

  const input: ProjectInput = {
    sector: String(body.sector ?? ""),
    img: String(body.img ?? ""),
    title: String(body.title ?? ""),
    challenge: String(body.challenge ?? ""),
    description: String(body.description ?? ""),
    benefits: benefits.map((b) => b.trim()).filter(Boolean),
    featured: body.featured === true || body.featured === "true",
    area: String(body.area ?? ""),
    image: String(body.image ?? ""),
    en,
  };

  const img = input.image?.trim();
  if (img && !/^(https?:\/\/|\/)/.test(img)) {
    return { error: "URL immagine non valido: usa un link http(s) o un percorso /..." };
  }

  const missing = (["sector", "title", "challenge", "description"] as const).filter(
    (k) => !input[k].trim()
  );
  if (missing.length) {
    return { error: `Campi obbligatori mancanti: ${missing.join(", ")}.` };
  }
  if (input.benefits.length === 0) {
    return { error: "Inserisci almeno un beneficio." };
  }
  return { input };
}
