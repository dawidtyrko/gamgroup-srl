import type { Dict } from "./i18n/types";
import type { ServiceKey } from "./routes";

/** Client logos — the section kept from the old site (19 logos, `public/clients/`). */
export const clientLogos: { name: string; src: string; invert?: boolean }[] = [
  { name: "Maserati", src: "/clients/maserati.png" },
  { name: "Miele", src: "/clients/miele.png" },
  { name: "CNH Industrial", src: "/clients/cnh.png" },
  { name: "Geox", src: "/clients/geox.png" },
  { name: "Safilo", src: "/clients/safilo.png" },
  { name: "Iveco", src: "/clients/iveco.svg" },
  { name: "Leonardo", src: "/clients/leonardo.svg" },
  { name: "Magneti Marelli", src: "/clients/marelli.svg" },
  { name: "Valeo", src: "/clients/valeo.svg" },
  { name: "Diadora", src: "/clients/diadora.svg" },
  { name: "Air Liquide", src: "/clients/airliquide.svg" },
  { name: "ArcelorMittal CLN", src: "/clients/arcelormittal.svg" },
  // the official site only publishes the white (dark-background) variant — inverted for white
  { name: "CLN Group", src: "/clients/cln.svg", invert: true },
  { name: "Fassa Bortolo", src: "/clients/fassabortolo.png" },
  { name: "Selle Royal", src: "/clients/selleroyal.png" },
  { name: "Iseo Serrature", src: "/clients/iseo.svg" },
  { name: "Grandi Molini Italiani", src: "/clients/grandimolini.png" },
  // ex Industria Italiana Autobus, back to the Menarini name in 2024
  { name: "Menarini", src: "/clients/menarini.png" },
  { name: "Provincia di Treviso", src: "/clients/treviso.png" },
  // added 29/09/2026 (meeting) — each logo taken from the company's official site;
  // `invert` = the site only publishes a white version
  { name: "3B S.p.A.", src: "/clients/3b.svg", invert: true },
  { name: "Friul Intagli Industries", src: "/clients/friulintagli.svg", invert: true },
  { name: "Bitron", src: "/clients/bitron.svg", invert: true },
  { name: "SEWS-CABIND", src: "/clients/sews-cabind.svg" },
  { name: "DENSO Thermal Systems", src: "/clients/denso.png" },
  { name: "Colfert", src: "/clients/colfert.svg" },
  // ex DTR VMS, now part of DN Automotive (official site vms.dnautomotive.com)
  { name: "DN Automotive (ex DTR VMS)", src: "/clients/dn-automotive.png", invert: true },
  { name: "Favero Health Projects", src: "/clients/favero.png" },
  { name: "ICI Caldaie", src: "/clients/ici.png", invert: true },
  { name: "MBF", src: "/clients/mbf.svg" },
  { name: "Sappi", src: "/clients/sappi.svg" },
  { name: "Tomasella", src: "/clients/tomasella.svg" },
  { name: "SHL Production", src: "/clients/shl.png", invert: true },
  { name: "SuperJet International", src: "/clients/superjet.png" },
  { name: "Officine Biglia", src: "/clients/biglia.png" },
  { name: "OLSA", src: "/clients/olsa.svg" },
  { name: "Moretto", src: "/clients/moretto.svg" },
];

export const partnerLogos = [
  { name: "Rivelio", src: "/partners/rivelio.png" },
  { name: "Microsoft Partner", src: "/partners/microsoft.png" },
  { name: "ProcederAI", src: "/partners/proceder.png" },
  { name: "Claude", src: "/partners/claude.png" },
  { name: "AWS", src: "/partners/aws.png" },
];

export type PhotoKey = keyof Dict["photoAlts"];

/** Office photos (Flavio Graffi Fotografia), all 2000px wide, 3:2. */
export const photos: Record<PhotoKey, string> = {
  libreria: "/azienda/libreria.jpg",
  riunione: "/azienda/team-riunione.jpg",
  scaffale: "/azienda/maserati-scaffale.jpg",
  lavoro: "/azienda/ufficio-lavoro.jpg",
  tavolo: "/azienda/team-tavolo.jpg",
  scrivania: "/azienda/scrivania.jpg",
  salotto: "/azienda/salotto.jpg",
  caffe: "/azienda/angolo-caffe.jpg",
  f1: "/azienda/team-f1.jpg",
  modellini: "/azienda/modellini.jpg",
  vespa: "/azienda/vespa-casco.jpg",
};

/** Which photo illustrates each service page. */
export const servicePhoto: Record<ServiceKey, PhotoKey> = {
  erp: "scrivania",
  aiBi: "scaffale",
  integrazione: "tavolo",
  assistenza: "lavoro",
};
