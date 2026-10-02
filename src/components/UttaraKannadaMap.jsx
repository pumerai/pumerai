/**
 * UttaraKannadaMap — Inline SVG map of the Uttara Kannada coast.
 *
 * Projection (equirectangular, derived from Hotel Pumerai anchor):
 *   x(lng) = (lng - 73.915) × 428
 *   y(lat) = (15.511 - lat) × 226.6
 *
 * Anchor: Hotel Pumerai 14.275°N 74.4525°E → SVG (230, 280)
 *
 * Dot positions computed from Google Maps coordinates (see destinations.js).
 * Coastline path is hand-drawn to match this projection.
 *
 * Map elements kept:    coastline landmass, hotel marker, destination dots, Arabian Sea label
 * Map elements removed: compass rose, Uttara Kannada pill, Western Ghats label,
 *                       Sharavathi River label, NH-66 route lines
 */

// Real lat/lng projected positions (pre-computed — do not hand-place)
// Formula: x = round((lng - 73.915) * 428), y = round((15.511 - lat) * 226.6)
const DOTS = {
  kasarkod:    { x: 229, y: 277, side: "left",  label: "Kasarkod Beach" },
  murudeshwar: { x: 245, y: 321, side: "right", label: "Murudeshwar"    },
  gokarna:     { x: 173, y: 218, side: "left",  label: "Gokarna"        },
  sirsi:       { x: 395, y: 202, side: "right", label: "Sirsi"          },
  goa:         { x:  89, y:  48, side: "right", label: "Goa"            },
  udupi:       { x: 354, y: 492, side: "right", label: "Udupi"          },
  mangalore:   { x: 403, y: 589, side: "left",  label: "Mangalore"      },
};

// Hotel Pumerai base (anchor point)
const HOTEL = { x: 230, y: 280 };

// Label offset constants
const LABEL_OFFSET = 14;  // px from dot centre to label start

function getLabelX(dot, isActive) {
  return dot.side === "left"
    ? dot.x - LABEL_OFFSET
    : dot.x + LABEL_OFFSET;
}

function getLabelAnchor(dot) {
  return dot.side === "left" ? "end" : "start";
}

export default function UttaraKannadaMap({
  destinations = [],
  activeDestIndex = 0,
  onSelectDestination,
}) {
  const activeDest = destinations[activeDestIndex] || destinations[0];
  const activeDot  = activeDest ? DOTS[activeDest.id] : null;

  return (
    <div className="regional-map-container" aria-label="Interactive map of Uttara Kannada destinations">
      <div className="regional-map-frame">
        <svg
          viewBox="0 0 520 640"
          className="uttara-kannada-map-svg"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <pattern id="seaRipple" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 0,20 Q 10,16 20,20 T 40,20"
                fill="none"
                stroke="rgba(58,55,49,0.25)"
                strokeWidth="0.7"
              />
            </pattern>
          </defs>

          {/* Sea background */}
          <rect width="520" height="640" fill="#171715" />
          <rect x="0" y="0" width="230" height="640" fill="url(#seaRipple)" opacity="0.55" />

          {/* Arabian Sea label — vertical, left of coastline */}
          <text
            x="36"
            y="320"
            transform="rotate(-90 36 320)"
            textAnchor="middle"
            fill="#89847B"
            fontSize="11"
            letterSpacing="0.3em"
            fontWeight="500"
          >
            ARABIAN SEA
          </text>

          {/* Coastal landmass — Uttara Kannada region */}
          <path
            d="M 160,0
               C 170,40 180,65 170,85
               C 160,110 152,145 168,180
               C 178,210 182,240 176,270
               C 156,274 144,280 150,285
               C 156,290 152,305 160,320
               C 170,335 178,350 174,365
               C 168,390 174,420 186,440
               C 172,448 166,455 186,462
               C 198,475 212,500 222,530
               C 232,550 242,575 252,605
               C 258,620 262,632 268,640
               L 520,640 L 520,0 Z"
            fill="#25231F"
            stroke="#3A3731"
            strokeWidth="1.4"
          />

          {/* Travel line from hotel to active destination */}
          {activeDot && (
            <line
              x1={HOTEL.x}
              y1={HOTEL.y}
              x2={activeDot.x}
              y2={activeDot.y}
              stroke="#B49A6A"
              strokeWidth="1.2"
              strokeDasharray="3,3"
              opacity="0.6"
              className="map-travel-line"
            />
          )}

          {/* Destination dots */}
          {destinations.map((dest, idx) => {
            const dot = DOTS[dest.id];
            if (!dot) return null;
            const isActive = idx === activeDestIndex;
            const lx = getLabelX(dot, isActive);
            const anchor = getLabelAnchor(dot);

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
                {/* 44px hit area */}
                <circle cx={dot.x} cy={dot.y} r="22" fill="transparent" cursor="pointer" />

                {/* Pulse ring — active only */}
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
                  r={isActive ? 6 : 4}
                  fill={isActive ? "#B49A6A" : "#89847B"}
                  stroke="#171715"
                  strokeWidth="1.8"
                  className="map-pin-dot"
                />

                {/* Label — gold when active, muted when inactive; min effective 11px */}
                <text
                  x={lx}
                  y={dot.y + 4}
                  textAnchor={anchor}
                  fill={isActive ? "#D4B978" : "#A09690"}
                  fontSize="11"
                  fontWeight={isActive ? "700" : "500"}
                  letterSpacing="0.04em"
                  className="map-marker-label"
                >
                  {dot.label}
                </text>
              </g>
            );
          })}

          {/* Hotel Pumerai marker — always visible, non-interactive */}
          <g className="map-base-marker" transform={`translate(${HOTEL.x},${HOTEL.y})`}>
            {/* Halo */}
            <circle cx="0" cy="0" r="14" fill="rgba(180,154,106,0.14)" />
            <circle cx="0" cy="0" r="9"  fill="none" stroke="#B49A6A" strokeWidth="1.1" />
            {/* Core */}
            <circle cx="0" cy="0" r="5"  fill="#B49A6A" />
            <circle cx="0" cy="0" r="2"  fill="#F2EEE5" />
            {/* Label badge — one line only, to the right */}
            <g transform="translate(12, -16)">
              <rect width="108" height="22" rx="3" fill="#11110F" stroke="#B49A6A" strokeWidth="1" />
              <text x="8" y="14.5" fill="#F2EEE5" fontSize="9.5" fontWeight="700" letterSpacing="0.06em">
                HOTEL PUMERAI
              </text>
            </g>
          </g>
        </svg>

        {/* Caption bar below map */}
        <div className="map-footer-ingress">
          <span className="ingress-dot" />
          <span className="ingress-caption">Honnavar, NH-66 — coastal Karnataka</span>
        </div>
      </div>
    </div>
  );
}
