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

  const isFirstMountRef = useRef(true);

  // Scroll active tab horizontally inside its container when changed via map dot (never shift window)
  useEffect(() => {
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      return;
    }
    const container = tabsScrollRef.current;
    if (!container) return;
    const activeTab = container.querySelector('[aria-selected="true"]');
    if (activeTab) {
      const tabLeft = activeTab.offsetLeft;
      const tabWidth = activeTab.offsetWidth;
      const containerWidth = container.clientWidth;
      const targetScroll = tabLeft - containerWidth / 2 + tabWidth / 2;
      container.scrollTo({ left: Math.max(0, targetScroll), behavior: "smooth" });
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
        {destinations.map((dest, idx) => {
          const isActive = idx === activeIdx;
          return (
            <div
              key={dest.id}
              id={`ah-panel-${dest.id}`}
              role="tabpanel"
              aria-labelledby={`ah-tab-${dest.id}`}
              hidden={!isActive}
              className={`ah-detail-panel${isActive && isAnimating && !prefersReducedMotion ? " is-fading" : ""}`}
            >
              {/* Destination photo — 3:2. Hidden when image is null (e.g. Goa) */}
              {dest.image && (
                <div className="ah-dest-photo-frame">
                  <img
                    key={dest.id}
                    src={dest.image}
                    alt={dest.alt}
                    width={dest.imageW || 800}
                    height={dest.imageH || 533}
                    loading="lazy"
                    decoding="async"
                    className="ah-dest-photo"
                    style={{ objectPosition: dest.objectPosition || "center center" }}
                  />
                </div>
              )}

              {/* Metadata */}
              <div className="ah-dest-meta">
                <h3 className="ah-dest-name">{dest.name}</h3>

                <p className="ah-dest-distance">
                  {dest.distanceKm} km from Pumerai
                  <span className="ah-dist-sep" aria-hidden="true"> · </span>
                  {dest.driveTime}
                </p>

                <p className="ah-dest-desc">{dest.description}</p>

                <a
                  href={dest.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-primary ah-map-btn"
                  aria-label={`View ${dest.name} location on map`}
                >
                  <span>View location on map <span className="arrow-icon" aria-hidden="true">&rarr;</span></span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
