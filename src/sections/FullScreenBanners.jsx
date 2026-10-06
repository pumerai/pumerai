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
      {/* Banner 1: The Rooftop Pool */}
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
          className="fullscreen-banner-img"
        />
        <BannerContent
          headline={
            <>
              The Rooftop <span className="title-italic">Pool</span>
            </>
          }
          line="Glass-edge pool open 6:30 AM to 7:00 PM, with a children's splash area."
        />
      </section>

      {/* Banner 2: Hotel Facade on NH-66 */}
      <section
        className="fullscreen-banner-item"
        aria-label="Hotel Pumerai facade on NH-66 Honnavar"
      >
        <div className="fullscreen-banner-overlay" aria-hidden="true" />
        <img
          src="/gallery/entrance-archway.webp"
          srcSet="/gallery/entrance-archway.webp 1280w"
          sizes="100vw"
          alt="Hotel Pumerai illuminated entrance facade and portico on NH-66 Honnavar"
          width="1280"
          height="853"
          loading="lazy"
          decoding="async"
          className="fullscreen-banner-img"
        />
        <BannerContent
          headline={
            <>
              On NH-66, <span className="title-italic">Honnavar</span>
            </>
          }
          line="Close to Kasarkod Beach and the Sharavathi backwaters."
        />
      </section>
    </div>
  );
}
