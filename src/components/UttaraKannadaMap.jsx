import { useState, useRef, useEffect } from "react";

/**
 * UttaraKannadaMap — Geographically accurate SVG map of the Karnataka & Goa coast.
 *
 * PROJECTION (equirectangular, fitting all destinations):
 *   xscale = 247.601 px/deg,  lng_origin = 73.2918°E
 *   yscale = 199.679 px/deg,  lat_origin = 15.8091°N
 *   x(lng) = (lng − 73.2918) × 247.601
 *   y(lat) = (15.8091 − lat) × 199.679
 *
 * Validation (coastal distance, km):
 *   Kasarkod 0.03 | Murudeshwar 0.00 | Gokarna 0.02 | Udupi 0.01 | Mangalore 0.00
 *   Goa (Panaji) 3.28 | Sirsi 54.62 (inland ✓)
 *
 * Coastline: Natural Earth simplified points, projected with the same formula.
 * Map drawing fills card edge to edge (sea on left, top, bottom; land on right).
 * Contains: coastline, hotel marker, destination dots, Arabian Sea label.
 */

// Pre-computed dot positions (project(lat, lng) with constants above)
const DOTS = {
  sharavathi: { x: 286.5, y: 304.9, side: "left", label: "Sharavathi River" },
  kasarkod: { x: 285.5, y: 304.0, side: "left", label: "Kasarkod Beach" },
  murudeshwar: { x: 294.7, y: 342.3, side: "left", label: "Murudeshwar" },
  gokarna: { x: 254.3, y: 251.8, side: "left", label: "Gokarna" },
  sirsi: { x: 382.7, y: 237.3, side: "right", label: "Sirsi" },
  goa: { x: 132.7, y: 61.9, side: "right", label: "Goa" },
  udupi: { x: 359.1, y: 492.8, side: "right", label: "Udupi" },
  mangalore: { x: 387.3, y: 578.1, side: "left", label: "Mangalore" },
};

// Hotel Pumerai (anchor): project(14.2750, 74.4525)
const HOTEL = { x: 287.4, y: 306.3 };

// Offsets for dots close to Hotel Pumerai to prevent label collisions
const OFFSETS = {
  kasarkod: { dx: -24, dy: -16 },
  sharavathi: { dx: -24, dy: 14 },
};

const LABEL_GAP = 12; // px from dot edge to label start

function labelPos(dot, destId) {
  let x = dot.x, y = dot.y;
  const offset = OFFSETS[destId];
  if (offset) { x += offset.dx; y += offset.dy; }
  const lx = dot.side === "left" ? x - LABEL_GAP : x + LABEL_GAP;
  const anchor = dot.side === "left" ? "end" : "start";
  return { lx, ly: y + 4, anchor };
}

export default function UttaraKannadaMap({
  destinations = [],
  activeDestIndex = null,
  onSelectDestination,
}) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [focusedIdx, setFocusedIdx] = useState(null);
  const [viewBoxWidth, setViewBoxWidth] = useState(520);
  const frameRef = useRef(null);
  const markerRefs = useRef([]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const updateDims = () => {
      const { clientWidth, clientHeight } = frame;
      if (clientWidth > 0 && clientHeight > 0) {
        const aspect = clientWidth / clientHeight;
        const calculated = Math.max(480, Math.round(640 * aspect));
        setViewBoxWidth(calculated);
      }
    };

    updateDims();
    const ro = new ResizeObserver(updateDims);
    ro.observe(frame);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="regional-map-container" aria-label="Interactive map of Uttara Kannada destinations">
      <div className="regional-map-frame" ref={frameRef}>
        <svg
          viewBox={`0 0 ${viewBoxWidth} 640`}
          className="uttara-kannada-map-svg"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          role="img"
          aria-label="Map of destinations around Honnavar"
        >
          <defs>
            {/* Subtle ripple pattern for the sea */}
            <pattern id="seaRipple" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 0,20 Q 10,16 20,20 T 40,20" fill="none" stroke="rgba(58,55,49,0.22)" strokeWidth="0.7" />
            </pattern>
          </defs>

          {/* 1. Sea background (fills canvas edge to edge: left, top, bottom) */}
          <rect x="0" y="0" width={viewBoxWidth + 1000} height="640" fill="#171715" />
          <rect x="0" y="0" width={viewBoxWidth + 1000} height="640" fill="url(#seaRipple)" opacity="0.6" />

          {/* 2. Arabian Sea label — vertical, in the sea area (left of coast) */}
          <text
            x="52"
            y="360"
            transform="rotate(-90 52 360)"
            textAnchor="middle"
            fill="#6B6560"
            fontSize="10"
            letterSpacing="0.28em"
            fontWeight="500"
          >
            ARABIAN SEA
          </text>

          {/* 3. Coastal landmass fill — extends all the way to right edge */}
          <path
            d={[
              "M 115.9,0",
              "L 115.9,53.7",
              "L 158.5,101.5",
              "L 180.0,147.0",
              "L 201.1,191.7",
              "L 209.0,209.1",
              "L 254.3,251.8",
              "L 262.3,284.6",
              "L 285.5,303.9",
              "L 281.1,306.3",
              "L 276.4,331.7",
              "L 294.7,342.3",
              "L 339.5,394.0",
              "L 347.9,435.9",
              "L 359.1,492.8",
              "L 371.4,530.6",
              "L 387.3,578.1",
              "L 387.3,640",
              "L 2500,640",
              "L 2500,0",
              "Z",
            ].join(" ")}
            fill="#22201C"
            stroke="none"
          />

          {/* 3b. Coastline stroke — strokes only the coast, never the right border */}
          <path
            d={[
              "M 115.9,0",
              "L 115.9,53.7",
              "L 158.5,101.5",
              "L 180.0,147.0",
              "L 201.1,191.7",
              "L 209.0,209.1",
              "L 254.3,251.8",
              "L 262.3,284.6",
              "L 285.5,303.9",
              "L 281.1,306.3",
              "L 276.4,331.7",
              "L 294.7,342.3",
              "L 339.5,394.0",
              "L 347.9,435.9",
              "L 359.1,492.8",
              "L 371.4,530.6",
              "L 387.3,578.1",
              "L 387.3,640",
            ].join(" ")}
            fill="none"
            stroke="#3A3731"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* 4. Destination Markers */}
          {destinations.map((dest, idx) => {
            const dot = DOTS[dest.id];
            if (!dot) return null;
            const isActive = idx === activeDestIndex;
            const isHovered = hoveredIdx === idx;
            const isFocused = focusedIdx === idx;
            const offset = OFFSETS[dest.id];
            const leaderNeeded = !!offset;
            const displayX = offset ? dot.x + offset.dx : dot.x;
            const displayY = offset ? dot.y + offset.dy : dot.y;
            const { lx, ly, anchor } = labelPos(dot, dest.id);

            // Separate hit area center for nearby dots (Kasarkod & Sharavathi)
            let hitX = dot.x;
            let hitY = dot.y;
            if (dest.id === "kasarkod") {
              hitY = dot.y - 10;
            } else if (dest.id === "sharavathi") {
              hitY = dot.y + 10;
            }

            return (
              <g
                key={dest.id}
                ref={(el) => (markerRefs.current[idx] = el)}
                className={`map-marker-group${isActive ? " is-active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectDestination?.(idx);
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onFocus={() => setFocusedIdx(idx)}
                onBlur={() => setFocusedIdx(null)}
                role="button"
                tabIndex={0}
                aria-label={`${dest.name}, ${dest.distanceKm} km`}
                aria-pressed={isActive}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    onSelectDestination?.(idx);
                  } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                    e.preventDefault();
                    e.stopPropagation();
                    const nextIdx = (idx + 1) % destinations.length;
                    onSelectDestination?.(nextIdx);
                    markerRefs.current[nextIdx]?.focus({ preventScroll: true });
                  } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                    e.preventDefault();
                    e.stopPropagation();
                    const prevIdx = (idx - 1 + destinations.length) % destinations.length;
                    onSelectDestination?.(prevIdx);
                    markerRefs.current[prevIdx]?.focus({ preventScroll: true });
                  }
                }}
              >
                {/* Hit area: 44px diameter (>= 32px desktop, >= 44px mobile) */}
                <circle cx={hitX} cy={hitY} r="22" fill="transparent" cursor="pointer" />

                {/* Leader line for offset dots (connects offset display anchor to actual dot) */}
                {leaderNeeded && (
                  <line
                    x1={displayX}
                    y1={displayY}
                    x2={dot.x}
                    y2={dot.y}
                    stroke={isActive ? "#B49A6A" : "#6B6560"}
                    strokeWidth="0.8"
                    strokeDasharray="2,2"
                  />
                )}

                {/* Active static gold ring — stationary */}
                {isActive && (
                  <circle
                    cx={dot.x}
                    cy={dot.y}
                    r="8.5"
                    fill="none"
                    stroke="#B49A6A"
                    strokeWidth="1.2"
                    className="map-active-pulse"
                    opacity="0.85"
                  />
                )}

                {/* Visible gold focus ring */}
                {isFocused && !isActive && (
                  <circle
                    cx={dot.x}
                    cy={dot.y}
                    r="8"
                    fill="none"
                    stroke="#B49A6A"
                    strokeWidth="1.6"
                    opacity="0.9"
                  />
                )}

                {/* Dot: 8px visible diameter (r=4), active 10px (r=5) — stationary */}
                <circle
                  cx={dot.x}
                  cy={dot.y}
                  r={isActive ? 5 : 4}
                  fill={isActive ? "#B49A6A" : (isHovered ? "#B49A6A" : "#7A746D")}
                  stroke="#171715"
                  strokeWidth={isActive ? "1.8" : "1.5"}
                  className="map-pin-dot"
                />

                {/* Name label shown at all times (min 11px; active gold, otherwise muted ivory) */}
                <text
                  x={lx}
                  y={ly}
                  textAnchor={anchor}
                  fill={isActive ? "#D4B978" : (isHovered ? "#FAF6EE" : "#D8CFBC")}
                  fontSize="11"
                  fontWeight={isActive ? "700" : "500"}
                  letterSpacing="0.03em"
                  className="map-marker-label"
                  cursor="pointer"
                >
                  {dot.label}
                </text>
              </g>
            );
          })}

          {/* 5. Hotel Pumerai Marker — non-interactive, always visible */}
          <g className="map-base-marker" transform={`translate(${HOTEL.x},${HOTEL.y})`}>
            <circle cx="0" cy="0" r="13" fill="rgba(180,154,106,0.14)" />
            <circle cx="0" cy="0" r="8" fill="none" stroke="#B49A6A" strokeWidth="1.0" />
            <circle cx="0" cy="0" r="4.5" fill="#B49A6A" />
            <circle cx="0" cy="0" r="1.8" fill="#F2EEE5" />
            {/* One-line label to the right (inland side) */}
            <g transform="translate(11, -15)">
              <rect width="106" height="20" rx="3" fill="#0F0E0C" stroke="#B49A6A" strokeWidth="0.9" />
              <text x="7" y="13.5" fill="#F2EEE5" fontSize="9" fontWeight="700" letterSpacing="0.06em">
                HOTEL PUMERAI
              </text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
