"use client";

import { useEffect, useRef } from "react";
import type { Dict } from "@/lib/i18n/types";

/**
 * The figures count up the first time the band scrolls into view — the
 * treatment from the previous site: ease-out cubic over 1.7s, climbing from 1
 * rather than 0 so the number is never blank (Vittoria's call).
 *
 * The server renders the real figures, and the rewind to the start value
 * happens inside the observer callback, immediately before the animation. So
 * without JS, before hydration, or with reduced motion, the band just shows the
 * final numbers and nothing ever flashes a wrong value.
 */
const DURATION = 1700;

export default function StatsBand({ dict }: { dict: Dict }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cells = Array.from(section.querySelectorAll<HTMLElement>("[data-count]")).map((el) => {
      const target = Number(el.dataset.count) || 0;
      return { el, target, from: target > 1 ? 1 : 0, suffix: el.dataset.suffix ?? "" };
    });
    if (cells.length === 0) return;

    let frame = 0;
    const paint = (eased: number) => {
      for (const c of cells) {
        c.el.textContent = Math.round(c.from + (c.target - c.from) * eased) + c.suffix;
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        paint(0);
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - start) / DURATION);
          paint(1 - Math.pow(1 - p, 3));
          if (p < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.25 }
    );
    io.observe(section);

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="band" ref={ref}>
      {dict.stats.map((s) => (
        <div key={s.label}>
          <b data-count={s.value} data-suffix="+">
            {s.value}+
          </b>
          <span>{s.label}</span>
        </div>
      ))}
    </section>
  );
}
