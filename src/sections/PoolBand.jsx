import { useEffect, useRef } from "react";

/**
 * PoolBand — Full-width rooftop pool image band.
 * Sits between Rooms and Experiences on the Home page.
 * No container, no heading, no button — image + text overlay only.
 */
export default function PoolBand() {
  const copyRef = useRef(null);

  useEffect(() => {
    const el = copyRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { el.classList.add("is-revealed"); return; }
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("is-revealed"); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className="pool-band-section"
      aria-label="Rooftop pool at Hotel Pumerai"
    >
      {/* Dark gradient overlay */}
      <div className="pool-band-overlay" aria-hidden="true" />

      {/* The image */}
      <img
        src="/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_46%20AM_result.webp"
        alt="Rooftop pool at Hotel Pumerai overlooking coastal palm groves"
        loading="lazy"
        decoding="async"
        className="pool-band-img"
        width="1920"
        height="760"
      />

      {/* Centred text overlay */}
      <div className="pool-band-copy" data-pool-reveal ref={copyRef}>
        <h2 className="pool-band-headline">
          The Rooftop <em>Pool</em>
        </h2>
        <p className="pool-band-sub">
          Glass-edge pool open 6:30 AM to 7:00 PM, with a children's splash area.
        </p>
      </div>
    </section>
  );
}
