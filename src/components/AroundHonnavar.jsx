import { useState } from "react";
import { destinations } from "../data/destinations.js";
import UttaraKannadaMap from "./UttaraKannadaMap.jsx";

const MURUDESHWAR_INDEX = destinations.findIndex((d) => d.id === "murudeshwar");
const DEFAULT_INDEX = MURUDESHWAR_INDEX !== -1 ? MURUDESHWAR_INDEX : 2;

/**
 * AroundHonnavar — shared interactive map + destination panel component.
 *
 * Used on:
 *   - Home page (InAndAround section)
 *   - Location page (Location section)
 *
 * Behaviour:
 *   - Murudeshwar is the active place on first render (and in prerendered HTML).
 *   - Details panel is always visible with exactly one place shown.
 *   - Clicking/tapping another dot swaps the panel with a 200ms crossfade.
 *   - Clicking the active dot keeps it open.
 *   - Clicking empty map space does nothing.
 */
export default function AroundHonnavar() {
  const [activeIdx, setActiveIdx] = useState(DEFAULT_INDEX);
  const [isAnimating, setIsAnimating] = useState(false);

  const activeDest = destinations[activeIdx] || destinations[DEFAULT_INDEX];

  const handleSelect = (idx) => {
    if (idx === null || idx === activeIdx) {
      return;
    }
    setIsAnimating(true);
    setActiveIdx(idx);
    setTimeout(() => setIsAnimating(false), 200);
  };

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

      {/* RIGHT — detail panel */}
      <div
        className="ah-panel-column"
        id="ah-detail-region"
        role="region"
        aria-live="polite"
        aria-label="Destination details"
      >
        <div
          id={`ah-panel-${activeDest.id}`}
          className={`ah-detail-panel${isAnimating && !prefersReducedMotion ? " is-fading" : ""}`}
        >
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
              {`${activeDest.distanceKm} km from Pumerai`}
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
      </div>
    </div>
  );
}
