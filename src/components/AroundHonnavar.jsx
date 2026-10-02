import { useState, useEffect, useRef } from "react";
import { destinations } from "../data/destinations.js";
import UttaraKannadaMap from "./UttaraKannadaMap.jsx";

/**
 * AroundHonnavar — shared interactive map + destination panel component.
 *
 * Used on:
 *   - Home page (InAndAround section)
 *   - Location page (Location section)
 *
 * Hover a dot  → activates that destination.
 * Click a dot  → activates (also works on touch).
 * Click a tab  → activates.
 * Keyboard arrows while focus is inside the tab list → cycle destinations.
 * Default active = nearest destination (index 0, already sorted by distance).
 */
export default function AroundHonnavar() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const tabsScrollRef = useRef(null);
  const activeDest = destinations[activeIdx];

  // Crossfade: mark animating for 200ms on change
  const prevActiveRef = useRef(activeIdx);
  const handleSelect = (idx) => {
    if (idx === activeIdx) return;
    setIsAnimating(true);
    setActiveIdx(idx);
    prevActiveRef.current = idx;
    setTimeout(() => setIsAnimating(false), 200);
  };

  // Scroll active tab into view when changed via map dot
  useEffect(() => {
    if (!tabsScrollRef.current) return;
    const activeTab = tabsScrollRef.current.querySelector('[aria-selected="true"]');
    if (activeTab) {
      activeTab.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
    }
  }, [activeIdx]);

  // Keyboard arrow navigation inside the tab list
  const handleTabKeyDown = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      handleSelect((activeIdx + 1) % destinations.length);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      handleSelect((activeIdx - 1 + destinations.length) % destinations.length);
    }
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

      {/* RIGHT — tabs + detail panel */}
      <div className="ah-panel-column">
        {/* Horizontal tab strip */}
        <div
          className="ah-tabs-strip"
          role="tablist"
          aria-label="Destinations around Honnavar"
          ref={tabsScrollRef}
          onKeyDown={handleTabKeyDown}
        >
          {destinations.map((dest, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={dest.id}
                type="button"
                role="tab"
                id={`ah-tab-${dest.id}`}
                aria-selected={isActive}
                aria-controls={`ah-panel-${dest.id}`}
                className={`ah-tab-btn${isActive ? " is-active" : ""}`}
                onClick={() => handleSelect(idx)}
              >
                {dest.tabLabel}
              </button>
            );
          })}
        </div>

        {/* Detail panel — fixed height so layout never jumps */}
        <div
          id={`ah-panel-${activeDest.id}`}
          role="tabpanel"
          aria-labelledby={`ah-tab-${activeDest.id}`}
          className={`ah-detail-panel${isAnimating && !prefersReducedMotion ? " is-fading" : ""}`}
        >
          {/* Destination photo — 3:2, ~180×120 */}
          {activeDest.image && (
            <div className="ah-dest-photo-frame">
              <img
                key={activeDest.id}
                src={activeDest.image}
                alt={activeDest.alt}
                loading="lazy"
                className="ah-dest-photo"
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
      </div>
    </div>
  );
}
