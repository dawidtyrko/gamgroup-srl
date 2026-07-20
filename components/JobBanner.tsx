/**
 * Careers-popup banner — a branded abstract graphic (navy base + teal glow +
 * a subtle motif) instead of a photo, so the HR modal no longer reuses the
 * case-study images. One of four motif/accent variants is chosen by job index,
 * so consecutive roles look distinct. Swap for real HR photography later by
 * rendering an <img> here, same as CaseBanner.
 */

const NAVY = "#1B2A4A";
const NAVY_D = "#101b30";
const TEAL = "#4D93A2";
const TEAL_LT = "#79B7C4";

function Motif({ variant }: { variant: number }) {
  // low-opacity white geometry layered over the gradient
  const stroke = "rgba(255,255,255,.14)";
  switch (variant) {
    case 0: // dot grid
      return (
        <g fill="rgba(255,255,255,.16)">
          {Array.from({ length: 4 }).map((_, r) =>
            Array.from({ length: 14 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 44} cy={40 + r * 44} r={2.2} />
            )),
          )}
        </g>
      );
    case 1: // concentric arcs (echoes the brand "ponte" graphic)
      return (
        <g fill="none" stroke={stroke} strokeWidth={1.6}>
          {[70, 130, 190, 250, 310].map((r) => (
            <circle key={r} cx={560} cy={210} r={r} />
          ))}
        </g>
      );
    case 2: // diagonal lines
      return (
        <g stroke={stroke} strokeWidth={1.6}>
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1={i * 70 - 100} y1={260} x2={i * 70 + 120} y2={-20} />
          ))}
        </g>
      );
    default: // rising bars
      return (
        <g fill="rgba(255,255,255,.12)">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <rect key={i} x={60 + i * 78} y={230 - i * 22} width={40} height={i * 22 + 30} rx={6} />
          ))}
        </g>
      );
  }
}

export default function JobBanner({ index }: { index: number }) {
  const variant = index % 4;
  // nudge the teal glow to a different corner per variant
  const glow = [
    { cx: "18%", cy: "24%" },
    { cx: "78%", cy: "30%" },
    { cx: "30%", cy: "78%" },
    { cx: "82%", cy: "72%" },
  ][variant];
  return (
    <svg
      aria-hidden
      viewBox="0 0 620 240"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <defs>
        <linearGradient id={`jb-bg-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={NAVY} />
          <stop offset="1" stopColor={NAVY_D} />
        </linearGradient>
        <radialGradient id={`jb-glow-${variant}`} cx={glow.cx} cy={glow.cy} r="60%">
          <stop offset="0" stopColor={TEAL} stopOpacity="0.55" />
          <stop offset="0.5" stopColor={TEAL_LT} stopOpacity="0.12" />
          <stop offset="1" stopColor={TEAL} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="620" height="240" fill={`url(#jb-bg-${variant})`} />
      <Motif variant={variant} />
      <rect width="620" height="240" fill={`url(#jb-glow-${variant})`} />
    </svg>
  );
}
