/**
 * Hero background — a slow crossfading Ken-Burns slideshow of the GAM premises
 * behind the first section. A light veil keeps the dark headline legible; the
 * whole thing is aria-hidden and freezes to a single frame under
 * prefers-reduced-motion (handled in globals.css). Placeholder photos for now
 * (WhatsApp exports) — swap the files in public/hero for the boss's HQ set.
 */
const HERO_PHOTOS = [
  "/hero/hero-1.jpg",
  "/hero/hero-2.jpg",
  "/hero/hero-3.jpg",
  "/hero/hero-4.jpg",
  "/hero/hero-5.jpg",
  "/hero/hero-6.jpg",
  "/hero/hero-7.jpg",
];

// one crossfade cycle = COUNT * SLIDE seconds; each frame's animation-delay is
// staggered so exactly one is fading in as the previous fades out.
const SLIDE = 6;

export default function HeroBackground() {
  const total = HERO_PHOTOS.length * SLIDE;
  return (
    <div className="hero-bg" aria-hidden>
      {HERO_PHOTOS.map((src, i) => (
        <div
          key={src}
          className="hero-bg-frame"
          style={{
            backgroundImage: `url(${src})`,
            animationDuration: `${total}s`,
            animationDelay: `${i * SLIDE}s`,
          }}
        />
      ))}
      <div className="hero-bg-veil" />
    </div>
  );
}
