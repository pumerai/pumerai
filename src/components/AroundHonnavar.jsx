import { useState, useEffect } from "react";
import { destinations } from "../data/destinations.js";
import UttaraKannadaMap from "./UttaraKannadaMap.jsx";

/**
 * AroundHonnavar — shared interactive map + destination panel component.
 *
 * Used on:
 *   - Home page (InAndAround section)
 *   - Location page (Location section)
 *
 * Click-to-reveal details:
 *   - Initially no place details are visible (hint panel shown).
 *   - Hovering a dot shows only its name label.
 *   - Clicking/tapping a dot opens the detail panel for that place only.
 *   - Clicking another dot swaps the panel.
 *   - Clicking the active dot, close (X) button, empty map space or Escape key hides panel.
 */
export default function AroundHonnavar() {
  const [activeIdx, setActiveIdx] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const activeDest = activeIdx !== null ? destinations[activeIdx] : null;

  const handleSelect = (idx) => {
    if (idx === null || idx === activeIdx) {
      setActiveIdx(null);
      return;
    }
    setIsAnimating(true);
    setActiveIdx(idx);
    setTimeout(() => setIsAnimating(false), 200);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveIdx(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className="around-honnavar-layout">
      {/* LEFT — SVG map */}
      <div className="ah-map-column">
        <UttaraKannadaMap
          destinations={destinations}
          activeDestIndex={activeIdx}
          onSelectDestination={handleSelect}
        />
      </div>

      {/* RIGHT — hint or detail panel */}
      <div
        className="ah-panel-column"
        id="ah-detail-region"
        role="region"
        aria-live="polite"
        aria-label="Destination details"
      >
        {activeDest === null ? (
          <div className="ah-empty-hint-panel">
            <p className="ah-empty-hint-text">Select a place on the map.</p>
          </div>
        ) : (
          <div
            id={`ah-panel-${activeDest.id}`}
            className={`ah-detail-panel${isAnimating && !prefersReducedMotion ? " is-fading" : ""}`}
            style={{ position: "relative" }}
          >
            <button
              type="button"
              className="ah-panel-close-btn"
              onClick={() => setActiveIdx(null)}
              aria-label="Close details"
            >
              <span aria-hidden="true">&times;</span>
            </button>

            {/* Destination photo — 3:2. Hidden when image is null (e.g. Goa) */}
            {activeDest.image && (
              <div className="ah-dest-photo-frame">
                <img
                  key={activeDest.id}
                  src={activeDest.image}
                  alt={activeDest.alt}
                  width={activeDest.imageW || 800}
                  height={activeDest.imageH || 533}
                  loading="lazy"
                  decoding="async"
                  className="ah-dest-photo"
                  style={{ objectPosition: activeDest.objectPosition || "center center" }}
                />
              </div>
            )}

            {/* Metadata */}
            <div className="ah-dest-meta">
              <h3 className="ah-dest-name">{activeDest.name}</h3>

              <p className="ah-dest-distance">
                {activeDest.distanceKm} km from Pumerai
                <span className="ah-dist-sep" aria-hidden="true"> · </span>
                {activeDest.driveTime}
              </p>

              <p className="ah-dest-desc">{activeDest.description}</p>

              <a
                href={activeDest.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary ah-map-btn"
                aria-label={`View ${activeDest.name} location on map`}
              >
                <span>View location on map <span className="arrow-icon" aria-hidden="true">&rarr;</span></span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
