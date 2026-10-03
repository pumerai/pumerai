import { useState, useRef, useCallback, useEffect } from "react";

const SLIDES = [
  {
    id: "matsya",
    title: "Matsya Restaurant",
    caption: "Coastal seafood, tandoor and continental, open 7:00 AM to 10:30 PM.",
    image: "/dining/_DSC0222_result.webp",
    alt: "Matsya multicuisine restaurant dining room at Hotel Pumerai Honnavar",
    href: "/dining",
    linkLabel: "Know more",
  },
  {
    id: "madhura",
    title: "Madhura Restaurant",
    caption: "Pure vegetarian South Indian, open from 6:30 AM.",
    image: "/dining/_DSC0243_result.webp",
    alt: "Madhura vegetarian restaurant bright dining room at Hotel Pumerai",
    href: "/dining",
    linkLabel: "Know more",
  },
  {
    id: "sidhvin",
    title: "Sidhvin Banquet Hall",
    caption: "A grand hall with a raised stage for up to 200 guests.",
    image: "/banquet/sidhvin-hall-main.webp",
    alt: "Sidhvin banquet hall with chandeliers and raised stage at Hotel Pumerai",
    href: "/banquet",
    linkLabel: "Know more",
  },
  {
    id: "milan",
    title: "Milan Hall",
    caption: "A warm hall for private dinners and small events, up to 50 guests.",
    image: "/banquet/milan-hall-main.webp",
    alt: "Milan hall intimate event space with warm lighting at Hotel Pumerai",
    href: "/banquet",
    linkLabel: "Know more",
  },
];

const TRANSITION_MS = 500;

export default function InsideHotelSlider({ onNavigate }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isCaptionFading, setIsCaptionFading] = useState(false);
  const trackRef = useRef(null);
  const sectionRef = useRef(null);
  const touchStartX = useRef(null);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const goTo = useCallback(
    (idx) => {
      const next = (idx + SLIDES.length) % SLIDES.length;
      if (next === activeIdx) return;
      setIsCaptionFading(true);
      setTimeout(
        () => {
          setActiveIdx(next);
          setIsCaptionFading(false);
        },
        prefersReducedMotion ? 0 : 200
      );
    },
    [activeIdx, prefersReducedMotion]
  );

  // Keyboard arrow navigation when section is focused
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); goTo(activeIdx + 1); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); goTo(activeIdx - 1); }
    },
    [activeIdx, goTo]
  );

  // Touch/swipe
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40)  goTo(activeIdx + 1);
    if (diff < -40) goTo(activeIdx - 1);
    touchStartX.current = null;
  };

  const active = SLIDES[activeIdx];

  const handleNavClick = (href, e) => {
    if (onNavigate && href.startsWith("/")) {
      e.preventDefault();
      onNavigate({ route: href });
    }
  };

  return (
    <section
      className="section inside-hotel-section"
      id="inside-hotel"
      aria-roledescription="carousel"
      aria-label="Inside Hotel Pumerai"
      ref={sectionRef}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="section-container">
        {/* Section header */}
        <header className="ihs-header" data-reveal>
          <div className="editorial-tag">
            <span className="accent-pip" />
            <span>THE HOTEL</span>
          </div>
          <h2 id="inside-hotel-heading" className="section-title">
            Inside <span className="title-italic">Hotel Pumerai</span>
          </h2>
        </header>

        {/* Slider track */}
        <div
          className="ihs-track-wrapper"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          data-reveal
        >
          <div className="ihs-track" ref={trackRef}>
            {SLIDES.map((slide, idx) => {
              const offset = idx - activeIdx;
              const isActive = offset === 0;
              const isPrev = offset === -1 || (activeIdx === 0 && idx === SLIDES.length - 1);
              const isNext = offset === 1 || (activeIdx === SLIDES.length - 1 && idx === 0);
              const isAdjacent = isPrev || isNext;

              return (
                <div
                  key={slide.id}
                  className={`ihs-slide${isActive ? " is-active" : ""}${isAdjacent ? " is-adjacent" : ""}`}
                  aria-label={`${idx + 1} of ${SLIDES.length}`}
                  aria-hidden={!isActive}
                  onClick={() => !isActive && goTo(idx)}
                  style={{
                    transform: prefersReducedMotion
                      ? "none"
                      : `translateX(calc(${(idx - activeIdx) * 100}% + ${(idx - activeIdx) * 16}px))`,
                    transition: prefersReducedMotion ? "none" : `transform ${TRANSITION_MS}ms ease-in-out`,
                  }}
                >
                  <div className="ihs-slide-image-frame">
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      loading={idx === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className={`ihs-slide-img ${idx === 0 ? "reveal-drop reveal-delay-0" : ""}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination dots */}
        <div className="ihs-dots" role="group" aria-label="Slide navigation">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              className={`ihs-dot${idx === activeIdx ? " is-active" : ""}`}
              aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
              aria-pressed={idx === activeIdx}
              onClick={() => goTo(idx)}
            />
          ))}
        </div>

        {/* Caption row */}
        <div
          className={`ihs-caption-row${isCaptionFading && !prefersReducedMotion ? " is-fading" : ""}`}
          data-reveal
        >
          <div className="ihs-caption-left">
            <h3 className="ihs-slide-title">{active.title}</h3>
            <p className="ihs-slide-caption">{active.caption}</p>
          </div>
          <div className="ihs-caption-right">
            <a
              href={active.href}
              className="button-secondary ihs-know-more-btn"
              onClick={(e) => handleNavClick(active.href, e)}
            >
              <span>Know more <span className="arrow-icon" aria-hidden="true">&rarr;</span></span>
            </a>
            <a
              href="/gallery"
              className="ihs-gallery-link"
              onClick={(e) => handleNavClick("/gallery", e)}
            >
              View gallery
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
