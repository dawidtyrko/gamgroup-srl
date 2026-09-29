import type { Metadata } from "next";
import { Breadcrumb, Shell } from "@/components/site/ui";
import { en } from "@/lib/i18n/en";
import { href } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Privacy Policy — GAM Group Srl",
  description:
    "Privacy policy on the processing of personal data pursuant to Regulation (EU) 2016/679 (GDPR).",
  alternates: {
    canonical: "/en/privacy",
    languages: { it: "/privacy", en: "/en/privacy", "x-default": "/privacy" },
  },
};

/*
 * NOTE: draft policy — have legal counsel validate before final publication
 * (same reviewer as the Italian informativa).
 */
export default function PrivacyPageEn() {
  return (
    <Shell dict={en} locale="en" page="privacy">
      <Breadcrumb items={[{ label: en.nav.home, to: href("home", "en") }, { label: "Privacy" }]} />
      <article className="legal">
        <span className="lbl">Privacy</span>
        <h1>
          Privacy policy — personal data processing
        </h1>
        <p>
          Pursuant to Articles 13 and 14 of Regulation (EU) 2016/679 (&ldquo;GDPR&rdquo;), this
          notice describes how the personal data of this website&rsquo;s users are processed.
        </p>

        <h2>1. Data controller</h2>
        <p>
          <strong>GAM Group Srl</strong> — Via Siora Andriana del Vescovo, 5/C, 31100 Treviso (TV), Italy
          <br />
          VAT no. 03641560267 · Email: <a href="mailto:info@gamgroup.it">info@gamgroup.it</a>
        </p>

        <h2>2. Data processed and purposes</h2>
        <p>
          <strong>Contact form:</strong> first name, last name, business email,
          company and message content, processed solely to respond to the request (legal basis:
          the data subject&rsquo;s consent, Art. 6.1.a GDPR, and pre-contractual measures, Art. 6.1.b GDPR).
        </p>
        <p>
          <strong>Browsing data:</strong> the site uses aggregate, anonymous
          statistics (Vercel Analytics, no profiling cookies) to improve the service
          (legitimate interest, Art. 6.1.f GDPR).
        </p>
        <p>
          <strong>Job applications:</strong> CVs sent by email to
          recruitment@gamgroup.it are processed for personnel selection.
        </p>

        <h2>3. Recipients and transfers</h2>
        <p>
          Data are processed by technical providers acting as data processors:
          Vercel Inc. (website and database hosting) and Resend (delivery of contact-form email
          notifications). Some providers may process data outside the EU; in that case the
          transfer takes place on the basis of Standard Contractual Clauses approved by the
          European Commission.
        </p>

        <h2>4. Retention</h2>
        <p>
          Contact-form data are kept for the time needed to handle the request and for any legal
          obligations, after which they are deleted.
        </p>

        <h2>5. Data subject rights</h2>
        <p>
          At any time you may exercise the rights provided by Articles 15&ndash;22 GDPR (access,
          rectification, erasure, restriction, portability, objection, withdrawal of consent) by
          writing to info@gamgroup.it. You may also lodge a complaint with the Italian Data
          Protection Authority (www.garanteprivacy.it).
        </p>

        <h2>6. Updates</h2>
        <p>
          This notice may be updated; the version published on this page is the one in force.
          Last updated: July 2026.
        </p>
      </article>
    </Shell>
  );
}
