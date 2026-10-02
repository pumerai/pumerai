import { useState, useEffect, useRef, useCallback } from "react";

const slides = [
  {
    src: "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_46%20AM_result.webp",
    alt: "Rooftop swimming pool overlooking coastal palm groves at Hotel Pumerai Honnavar",
  },
  {
    src: "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_23_21%20AM_result.webp",
    alt: "Exterior facade and arrival portico of Hotel Pumerai along NH-66 Honnavar",
  },
  {
    src: "/dining/_DSC0222_result.webp",
    alt: "Matsya Multicuisine Restaurant dining room at Hotel Pumerai Honnavar",
  },
  {
    src: "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_23_24%20AM_result.webp",
    alt: "Sunlit grand lobby and double-height arrival lounge at Hotel Pumerai",
  },
  {
    src: "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_42%20AM_result.webp",
    alt: "Architectural facade and glass-edge pool deck at Hotel Pumerai",
  },
];

const SLIDE_DURATION = 4000;      // Each image remains on screen for ~4 seconds
const TEXT_FADE_LEAD = 550;       // Text fades out smoothly before next image transition

export default function InAndAround() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [isTextExiting, setIsTextExiting] = useState(false);
  const touchStartX = useRef(null);

  const goToSlide = useCallback((nextIdx) => {
    setIsTextExiting(false);
    setPrevIndex(currentIndex);
    setCurrentIndex(nextIdx);
  }, [currentIndex]);

  useEffect(() => {
    // Reset exiting state on slide change
    setIsTextExiting(false);

    // 1. Text fades out smoothly prior to slide transition
    const exitTimer = setTimeout(() => {
      setIsTextExiting(true);
    }, Math.max(0, SLIDE_DURATION - TEXT_FADE_LEAD));

    // 2. Transition to next slide
    const slideTimer = setTimeout(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(slideTimer);
    };
  }, [currentIndex]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current !== null) {
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (diff > 45) {
        goToSlide((currentIndex + 1) % slides.length);
      } else if (diff < -45) {
        goToSlide(currentIndex > 0 ? currentIndex - 1 : slides.length - 1);
      }
      touchStartX.current = null;
    }
  };

  return (
    <section
      className="section full-frame-slider-section"
      id="property-slider"
      aria-label="Hotel Pumerai Photography"
      data-reveal
    >
      <div className="section-container">
        <div
          className="full-frame-slider-stage"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* 5 Stacked Crossfade Slides with cinematic slow movement */}
          <div className="full-frame-slider-track">
            {slides.map((slide, idx) => {
              const isActive = idx === currentIndex;
              const isExiting = idx === prevIndex;
              return (
                <div
                  key={slide.src}
                  className={`full-frame-slide ${isActive ? "is-active" : ""} ${isExiting ? "is-exiting" : ""}`}
                  aria-hidden={!isActive}
                >
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    loading={idx === 0 ? "eager" : "lazy"}
                    className={`full-frame-slide-img full-frame-slide-img-${idx}`}
                  />
                </div>
              );
            })}
          </div>

          {/* Minimal editorial text overlay with subtle upward float & fade */}
          <p
            key={currentIndex}
            className={`full-frame-slider-overlay-text ${isTextExiting ? "is-exiting" : ""}`}
          >
            Your Coastal Escape
          </p>
        </div>
      </div>
    </section>
  );
}
