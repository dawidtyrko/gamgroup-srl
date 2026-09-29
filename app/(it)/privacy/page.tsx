import type { Metadata } from "next";
import { Breadcrumb, Shell } from "@/components/site/ui";
import { it } from "@/lib/i18n/it";
import { href } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Informativa Privacy — GAM Group Srl",
  description:
    "Informativa sul trattamento dei dati personali ai sensi del Regolamento (UE) 2016/679 (GDPR).",
  alternates: {
    canonical: "/privacy",
    languages: { it: "/privacy", en: "/en/privacy", "x-default": "/privacy" },
  },
};

/*
 * NOTE: bozza di informativa da far validare a un consulente legale prima
 * della pubblicazione definitiva.
 */
export default function PrivacyPage() {
  return (
    <Shell dict={it} locale="it" page="privacy">
      <Breadcrumb items={[{ label: it.nav.home, to: href("home", "it") }, { label: "Privacy" }]} />
      <article className="legal">
        <span className="lbl">Privacy</span>
        <h1>
          Informativa sul trattamento dei dati personali
        </h1>
        <p>
          Ai sensi degli artt. 13 e 14 del Regolamento (UE) 2016/679 (&ldquo;GDPR&rdquo;), questa
          informativa descrive come vengono trattati i dati personali degli utenti di questo sito.
        </p>

        <h2>1. Titolare del trattamento</h2>
        <p>
          <strong>GAM Group Srl</strong> — Via Siora Andriana del Vescovo, 5/C, 31100 Treviso (TV), Italia
          <br />
          P.IVA: 03641560267 · Email: <a href="mailto:info@gamgroup.it">info@gamgroup.it</a>
        </p>

        <h2>2. Dati trattati e finalità</h2>
        <p>
          <strong>Modulo di contatto:</strong> nome, cognome, email aziendale, azienda e
          contenuto del messaggio, trattati al solo fine di rispondere alla richiesta (base giuridica:
          consenso dell&rsquo;interessato, art. 6.1.a GDPR, e misure precontrattuali, art. 6.1.b GDPR).
        </p>
        <p>
          <strong>Dati di navigazione:</strong> il sito utilizza statistiche aggregate e
          anonime (Vercel Analytics, senza cookie di profilazione) per finalità di miglioramento del
          servizio (legittimo interesse, art. 6.1.f GDPR).
        </p>
        <p>
          <strong>Candidature:</strong> i CV inviati via email a
          recruitment@gamgroup.it sono trattati per la selezione del personale.
        </p>

        <h2>3. Destinatari e trasferimenti</h2>
        <p>
          I dati sono trattati da fornitori tecnici che agiscono come responsabili del trattamento:
          Vercel Inc. (hosting del sito e della base dati) e Resend (invio delle notifiche email del
          modulo di contatto). Alcuni fornitori possono trattare dati al di fuori dell&rsquo;UE; in tal caso
          il trasferimento avviene sulla base di Clausole Contrattuali Standard approvate dalla
          Commissione Europea.
        </p>

        <h2>4. Conservazione</h2>
        <p>
          I dati del modulo di contatto sono conservati per il tempo necessario a gestire la richiesta
          e per eventuali obblighi di legge, dopodiché vengono cancellati.
        </p>

        <h2>5. Diritti dell&rsquo;interessato</h2>
        <p>
          In qualsiasi momento è possibile esercitare i diritti previsti dagli artt. 15&ndash;22 GDPR
          (accesso, rettifica, cancellazione, limitazione, portabilità, opposizione, revoca del
          consenso) scrivendo a info@gamgroup.it. È inoltre possibile proporre reclamo al Garante per
          la Protezione dei Dati Personali (www.garanteprivacy.it).
        </p>

        <h2>6. Aggiornamenti</h2>
        <p>
          La presente informativa può essere aggiornata; la versione pubblicata su questa pagina è
          quella vigente. Ultimo aggiornamento: luglio 2026.
        </p>
      </article>
    </Shell>
  );
}
