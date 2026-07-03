// FAQ — rendered in the FAQ section (components/Site.tsx) and exposed as
// FAQPage JSON-LD (app/page.tsx). Shared plain module so both server and
// client components can import the data.
export const faqs = [
  {
    q: "Di cosa si occupa GAM Group?",
    a: "GAM Group è una società di consulenza IT e system integration attiva dal 2001. Affianchiamo le imprese su ERP (SAP, IBM i-Series), consulenza applicativa con AI e Business Intelligence, sviluppo software e assistenza sistemistica.",
  },
  {
    q: "Dove si trova GAM Group?",
    a: "La sede è a Treviso, in Via Callalta 31/E. Lavoriamo con clienti in tutta Italia, dalle PMI alle multinazionali e alla pubblica amministrazione.",
  },
  {
    q: "Con quali sistemi e tecnologie lavorate?",
    a: "SAP (ECC, S/4HANA), IBM i-Series (AS400), Microsoft 365 con Power Platform e Copilot, e strumenti di Business Intelligence come Power BI.",
  },
  {
    q: "Come posso richiedere una consulenza?",
    a: "Compila il modulo nella sezione Contattaci, scrivi a info@gamgroup.it o chiama il +39 0422 583693: ti risponderemo al più presto.",
  },
];
