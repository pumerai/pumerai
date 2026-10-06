import { useEffect, useRef } from "react";

function BannerContent({ headline, line }) {
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.classList.add("is-revealed");
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-revealed");
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="fullscreen-banner-copy" ref={contentRef}>
      <h2 className="fullscreen-banner-headline">{headline}</h2>
      <p className="fullscreen-banner-line">{line}</p>
    </div>
  );
}

export default function FullScreenBanners() {
  return (
    <div className="fullscreen-banners-wrapper" id="banners">
      {/* Banner: The Rooftop Pool */}
      <section
        className="fullscreen-banner-item"
        aria-label="Rooftop pool at Hotel Pumerai"
      >
        <div className="fullscreen-banner-overlay" aria-hidden="true" />
        <img
          src="/gallery/rooftop-pool-vista.webp"
          srcSet="/gallery/rooftop-pool-vista.webp 1024w"
          sizes="100vw"
          alt="Rooftop swimming pool at Hotel Pumerai overlooking coastal canopies"
          width="1024"
          height="682"
          loading="lazy"
          decoding="async"
          className="fullscreen-banner-img fullscreen-banner-pool-img"
          style={{ objectPosition: "center 68%" }}
        />
        <BannerContent
          headline={
            <>
              The Rooftop <span className="title-italic">Pool</span>
            </>
          }
          line="Relax beside our glass-edge rooftop pool, with a dedicated splash area for little ones."
        />
      </section>
    </div>
  );
}
