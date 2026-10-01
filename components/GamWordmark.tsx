import { CSSProperties } from "react";

/**
 * The "GAM" wordmark, rendered as real text (Zilla Slab Bold — a squared
 * slab-serif, picked 2026-09-24 to match the client's reference logo) with
 * the brand's horizontal-scanline treatment applied via a CSS
 * background-clip gradient. Replaces the old hand-drawn SVG letterforms
 * (removed on 28/09/2026) — this works with any
 * font/size/colour without re-drawing paths.
 */
const ZILLA = "'Zilla Slab', serif";

export function stripeGradient(color: string): string {
  // ~55% duty-cycle stripes, sized in em so they scale with font-size —
  // matches the ~7-band look of the old masked SVG at any size.
  return `repeating-linear-gradient(to bottom, ${color} 0, ${color} 0.13em, transparent 0.13em, transparent 0.24em)`;
}

export default function GamWordmark({
  color,
  size,
  tagline,
  taglineColor,
  dataLogo,
}: {
  color: string;
  size: number | string;
  tagline?: string;
  taglineColor?: string;
  dataLogo?: boolean;
}) {
  // font-size lives on the wrapper so both children's `em` values (including
  // the swappable gradient's own stripe pitch) scale off ONE shared base —
  // a sibling span can't inherit a size set on its sibling, only its parent.
  const wordStyle: CSSProperties = {
    fontFamily: ZILLA,
    fontWeight: 700,
    fontSize: "1em",
    lineHeight: 1,
    letterSpacing: "0.01em",
    backgroundImage: stripeGradient(color),
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    WebkitTextFillColor: "transparent",
    display: "block",
  };
  return (
    <span style={{ display: "inline-flex", flexDirection: "column", lineHeight: 1, fontSize: size }}>
      <span {...(dataLogo ? { "data-logo": "" } : {})} style={wordStyle}>
        GAM
      </span>
      {tagline && (
        <span
          data-logo-tagline={dataLogo ? "" : undefined}
          style={{
            marginTop: "0.18em",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: "0.32em",
            color: taglineColor ?? color,
          }}
        >
          {tagline}
        </span>
      )}
    </span>
  );
}
