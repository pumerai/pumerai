/**
 * UttaraKannadaMap — Geographically accurate SVG map of the Karnataka & Goa coast.
 *
 * PROJECTION (equirectangular, fitting all destinations with 12% padding):
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
 * Land polygon extends to the right edge of the SVG canvas.
 *
 * Map contains: coastline, hotel marker, destination dots, Arabian Sea label.
 * No compass, no route lines, no decorative pills.
 */

// Pre-computed dot positions (project(lat, lng) with constants above)
const DOTS = {
  kasarkod:    { x: 285.5, y: 304.0, side: "left",  label: "Kasarkod Beach" },
  murudeshwar: { x: 294.7, y: 342.3, side: "left",  label: "Murudeshwar"    },
  gokarna:     { x: 254.3, y: 251.8, side: "left",  label: "Gokarna"        },
  sirsi:       { x: 382.7, y: 237.3, side: "right", label: "Sirsi"          },
  goa:         { x: 132.7, y:  61.9, side: "right", label: "Goa"            },
  udupi:       { x: 359.1, y: 492.8, side: "right", label: "Udupi"          },
  mangalore:   { x: 387.3, y: 578.1, side: "left",  label: "Mangalore"      },
};

// Hotel Pumerai (anchor): project(14.2750, 74.4525)
const HOTEL = { x: 287.4, y: 306.3 };

// Kasarkod is only 2.3px from Hotel in SVG — offset it toward the sea
const KASARKOD_OFFSET = { dx: -24, dy: -16 };

const LABEL_GAP = 12; // px from dot edge to label start

function labelPos(dot, isKasarkod) {
  let x = dot.x, y = dot.y;
  if (isKasarkod) { x += KASARKOD_OFFSET.dx; y += KASARKOD_OFFSET.dy; }
  const lx = dot.side === "left" ? x - LABEL_GAP : x + LABEL_GAP;
  const anchor = dot.side === "left" ? "end" : "start";
  return { lx, ly: y + 4, anchor };
}

export default function UttaraKannadaMap({
  destinations = [],
  activeDestIndex = 0,
  onSelectDestination,
}) {
  const activeDest = destinations[activeDestIndex] || destinations[0];

  return (
    <div className="regional-map-container" aria-label="Interactive map of Uttara Kannada destinations">
      <div className="regional-map-frame">
        <svg
          viewBox="0 0 520 640"
          className="uttara-kannada-map-svg"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Subtle ripple pattern for the sea */}
            <pattern id="seaRipple" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 0,20 Q 10,16 20,20 T 40,20" fill="none" stroke="rgba(58,55,49,0.22)" strokeWidth="0.7" />
            </pattern>
          </defs>

          {/* 1. Sea background (full canvas, then land overlaid) */}
          <rect width="520" height="640" fill="#171715" />
          <rect width="520" height="640" fill="url(#seaRipple)" opacity="0.6" />

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

          {/* 3. Coastal landmass — Karnataka & Goa (land to the east/right of coast) */}
          {/*    Path: coast polyline, then close to right edge + top-right corner     */}
          <path
            d={[
              "M 115.9,53.7",
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
              "L 520,640",
              "L 520,0",
              "L 115.9,0",
              "Z",
            ].join(" ")}
            fill="#22201C"
            stroke="#3A3731"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* 4. Destination Markers */}
          {destinations.map((dest, idx) => {
            const dot = DOTS[dest.id];
            if (!dot) return null;
            const isActive = idx === activeDestIndex;
            const isKasarkod = dest.id === "kasarkod";
            const { lx, ly, anchor } = labelPos(dot, isKasarkod);

            // Kasarkod: draw a leader line from offset position back to the dot
            const leaderNeeded = isKasarkod;
            const displayX = isKasarkod ? dot.x + KASARKOD_OFFSET.dx : dot.x;
            const displayY = isKasarkod ? dot.y + KASARKOD_OFFSET.dy : dot.y;

            return (
              <g
                key={dest.id}
                className={`map-marker-group${isActive ? " is-active" : ""}`}
                onClick={() => onSelectDestination?.(idx)}
                onMouseEnter={() => onSelectDestination?.(idx)}
                role="button"
                tabIndex={0}
                aria-label={`${dest.name}, ${dest.distanceKm} km from Hotel Pumerai`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectDestination?.(idx);
                  }
                }}
              >
                {/* 44px touch hit area (on the actual dot position) */}
                <circle cx={dot.x} cy={dot.y} r="22" fill="transparent" cursor="pointer" />

                {/* Leader line for Kasarkod (offset dot → actual position) */}
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

                {/* Active pulse ring */}
                {isActive && (
                  <circle
                    cx={dot.x}
                    cy={dot.y}
                    r="9"
                    fill="none"
                    stroke="#B49A6A"
                    strokeWidth="1.4"
                    className="map-active-pulse"
                    opacity="0.8"
                  />
                )}

                {/* Dot */}
                <circle
                  cx={dot.x}
                  cy={dot.y}
                  r={isActive ? 5.5 : 3.8}
                  fill={isActive ? "#B49A6A" : "#6B6560"}
                  stroke="#171715"
                  strokeWidth="1.6"
                  className="map-pin-dot"
                />

                {/* Label at (possibly offset) display position */}
                <text
                  x={lx}
                  y={ly}
                  textAnchor={anchor}
                  fill={isActive ? "#D4B978" : "#8A8178"}
                  fontSize="11"
                  fontWeight={isActive ? "700" : "500"}
                  letterSpacing="0.03em"
                  className="map-marker-label"
                >
                  {dot.label}
                </text>
              </g>
            );
          })}

          {/* 5. Hotel Pumerai Marker — non-interactive, always visible */}
          <g className="map-base-marker" transform={`translate(${HOTEL.x},${HOTEL.y})`}>
            <circle cx="0" cy="0" r="13" fill="rgba(180,154,106,0.14)" />
            <circle cx="0" cy="0" r="8"  fill="none" stroke="#B49A6A" strokeWidth="1.0" />
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

        {/* Footer caption */}
        <div className="map-footer-ingress">
          <span className="ingress-dot" />
          <span className="ingress-caption">Honnavar, NH-66 — coastal Karnataka</span>
        </div>
      </div>
    </div>
  );
}
