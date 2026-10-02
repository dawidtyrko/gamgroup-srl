/**
 * Hero background — a single still photo of the GAM premises behind the first
 * section, with a dark veil so the white headline, nav and logo read cleanly
 * over it. The whole thing is aria-hidden.
 *
 * This used to be a 7-frame crossfading Ken-Burns slideshow (`/hero/hero-1..7`).
 * It was replaced on 2026-10-02 with one still from the newer Flavio Graffi
 * shoot: the rotation pulled attention away from the headline, and a single
 * frame also drops ~2.4 MB of eager image downloads from the first paint.
 * The shot is deliberately a calm, warm one: busier frames (a meeting around a
 * table) put faces right behind the striped GAM wordmark and it stopped reading.
 * The old frames are still in `public/hero/` and the rest of the shoot is on the
 * `sito-v2-nuovo` tag, so swapping the shot is a one-line change.
 */
const HERO_PHOTO = "/azienda/ufficio-lavoro.jpg";

export default function HeroBackground() {
  return (
    <div className="hero-bg" aria-hidden>
      <div className="hero-bg-frame" style={{ backgroundImage: `url(${HERO_PHOTO})` }} />
      <div className="hero-bg-veil" />
    </div>
  );
}
