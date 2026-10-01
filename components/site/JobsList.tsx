"use client";

import { useState } from "react";
import type { Dict } from "@/lib/i18n/types";
import type { JobView } from "@/lib/jobs";
import { RECRUITMENT_EMAIL } from "@/lib/contact";

type Filter = "all" | "sap" | "dev" | "remote";

// Filters are derived from each job's own text, so positions added from
// /admin-cms are classified automatically.
// NB: list keys below are positional, not content-based — job copy comes from
// the admin form, which does not guarantee unique tags, paragraphs or group labels.
const DEV_RE = /java|node|react|angular|svilupp|develop|\.net|python/i;
function matches(job: JobView, f: Filter): boolean {
  const text = [job.title, ...job.tags].join(" ");
  if (f === "sap") return /\bSAP\b/i.test(text);
  if (f === "dev") return DEV_RE.test(text);
  if (f === "remote") return /remot/i.test(job.sede);
  return true;
}

export default function JobsList({ jobs, t }: { jobs: JobView[]; t: Dict["jobs"] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<string | null>(jobs[0]?.id ?? null);

  const filters = (Object.keys(t.filters) as Filter[]).filter((f) => f === "all" || jobs.some((j) => matches(j, f)));
  const shown = jobs.filter((j) => matches(j, filter));

  return (
    <>
      {filters.length > 1 && (
        <div className="filters" role="group">
          {filters.map((f) => (
            <button key={f} type="button" className={f === filter ? "on" : undefined} aria-pressed={f === filter} onClick={() => setFilter(f)}>
              {t.filters[f]}
            </button>
          ))}
        </div>
      )}

      {shown.map((job) => {
        const isOpen = open === job.id;
        const mail = `mailto:${RECRUITMENT_EMAIL}?subject=${encodeURIComponent(`${t.mailSubjectPrefix}${job.title}`)}`;
        return (
          <article key={job.id} className={`job${isOpen ? " open" : ""}`}>
            <button type="button" className="job-head" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : job.id)}>
              <span className="job-main">
                <span className="job-title">{job.title}</span>
                <span className="meta">
                  {job.sede} · {job.type}
                </span>
                <span className="chips">
                  {job.tags.map((tag, i) => (
                    <span key={i}>{tag}</span>
                  ))}
                </span>
              </span>
              {!isOpen && <span className="btn s">{t.details}</span>}
            </button>
            {isOpen && (
              <div className="detail">
                <div>
                  <p className="detail-lbl">{t.roleLabel}</p>
                  {job.description.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div>
                  {job.requirementGroups.map((g, gi) => (
                    <div key={gi}>
                      <p className="detail-lbl">{g.label}</p>
                      <ul>
                        {g.items.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <a href={mail} className="btn p apply">
                    {t.apply}
                  </a>
                </div>
              </div>
            )}
          </article>
        );
      })}
    </>
  );
}
