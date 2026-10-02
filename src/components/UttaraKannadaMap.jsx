import { useMemo } from "react";

/**
 * Map coordinate positions for each destination on the 520x640 SVG canvas.
 * Positions are relative to the stylized coastline path and are calibrated
 * to represent each destination's geographic position on the Karnataka coast.
 */
const DESTINATION_MAP_POINTS = {
  kasarkod: {
    x: 155,
    y: 305,
    labelX: 138,
    labelY: 309,
    textAnchor: "end",
    shortName: "Kasarkod Beach",
    calloutName: "KASARKOD BEACH",
    calloutX: 22,
    calloutY: 294,
    calloutW: 118,
  },
  murudeshwar: {
    x: 195,
    y: 420,
    labelX: 178,
    labelY: 424,
    textAnchor: "end",
    shortName: "Murudeshwar",
    calloutName: "MURUDESHWAR",
    calloutX: 214,
    calloutY: 409,
    calloutW: 104,
  },
  gokarna: {
    x: 175,
    y: 135,
    labelX: 158,
    labelY: 139,
    textAnchor: "end",
    shortName: "Gokarna",
    calloutName: "GOKARNA",
    calloutX: 194,
    calloutY: 124,
    calloutW: 82,
  },
  sirsi: {
    x: 395,
    y: 190,
    labelX: 412,
    labelY: 194,
    textAnchor: "start",
    shortName: "Sirsi",
    calloutName: "SIRSI",
    calloutX: 326,
    calloutY: 179,
    calloutW: 56,
  },
  goa: {
    x: 185,
    y: 48,
    labelX: 202,
    labelY: 52,
    textAnchor: "start",
    shortName: "Goa",
    calloutName: "GOA",
    calloutX: 202,
    calloutY: 37,
    calloutW: 52,
  },
  udupi: {
    x: 225,
    y: 515,
    labelX: 242,
    labelY: 519,
    textAnchor: "start",
    shortName: "Udupi",
    calloutName: "UDUPI",
    calloutX: 242,
    calloutY: 504,
    calloutW: 60,
  },
  mangalore: {
    x: 255,
    y: 595,
    labelX: 238,
    labelY: 599,
    textAnchor: "end",
    shortName: "Mangalore",
    calloutName: "MANGALORE",
    calloutX: 145,
    calloutY: 584,
    calloutW: 92,
  },
};

// Hotel Pumerai central base location on NH-66 at Honnavar
const PUMERAI_COORDS = { x: 230, y: 280 };

export default function UttaraKannadaMap({
  destinations = [],
  activeDestIndex = 0,
  onSelectDestination,
}) {
  const activeDest = destinations[activeDestIndex] || destinations[0];
  const activePoint = activeDest ? DESTINATION_MAP_POINTS[activeDest.id] : null;

  return (
    <div className="regional-map-container" aria-label="Interactive map of Uttara Kannada destinations">
      <div className="regional-map-frame">
        <svg
          viewBox="0 0 520 640"
          className="uttara-kannada-map-svg"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Stylized map showing Hotel Pumerai and surrounding destinations in Uttara Kannada"
        >
          <defs>
            {/* Subtle glow filter for base pin */}
            <filter id="pumeraiGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Subtle pattern for water depth / coastal ripples */}
            <pattern id="seaPattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 0,20 Q 10,16 20,20 T 40,20"
                fill="none"
                stroke="rgba(58, 55, 49, 0.28)"
                strokeWidth="0.8"
              />
            </pattern>
          </defs>

          {/* 1. Arabian Sea Foundation (West / Left) */}
          <rect width="520" height="640" fill="#171715" />
          <rect x="0" y="0" width="220" height="640" fill="url(#seaPattern)" opacity="0.6" />

          {/* Sea Depth Contours */}
          <path
            d="M 60,0 C 70,120 40,240 70,360 C 95,460 60,560 80,640"
            fill="none"
            stroke="rgba(58, 55, 49, 0.4)"
            strokeWidth="1"
            strokeDasharray="4,6"
          />
          <path
            d="M 110,0 C 120,100 95,220 120,340 C 145,440 115,540 135,640"
            fill="none"
            stroke="rgba(58, 55, 49, 0.3)"
            strokeWidth="1"
            strokeDasharray="6,8"
          />

          {/* Arabian Sea Editorial Vertical Label */}
          <text
            x="42"
            y="320"
            transform="rotate(-90 42 320)"
            textAnchor="middle"
            fill="#89847B"
            fontSize="10"
            letterSpacing="0.32em"
            fontWeight="500"
          >
            ARABIAN SEA
          </text>

          {/* 2. Coastal Landmass: Uttara Kannada Region (East / Right) */}
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

          {/* Western Ghats Subtle Topographical Ridges (Inland / East) */}
          <g opacity="0.35" stroke="#3A3731" strokeWidth="1" fill="none">
            <path d="M 380,40 C 420,80 390,140 430,190 C 410,240 450,280 430,340 C 470,400 440,460 470,520 C 450,560 480,600 470,640" />
            <path d="M 430,20 C 460,70 440,120 470,170 C 450,220 480,270 460,330 C 490,390 470,450 500,510" />
            <path d="M 470,0 C 500,60 480,120 510,180" />
          </g>

          <text
            x="485"
            y="430"
            transform="rotate(90 485 430)"
            textAnchor="middle"
            fill="#89847B"
            fontSize="8.5"
            letterSpacing="0.26em"
            fontWeight="500"
          >
            WESTERN GHATS RANGE
          </text>

          {/* 3. Sharavathi River Flowing into Estuary at Honnavar */}
          <path
            d="M 520,255
               C 440,245 380,265 320,268
               C 285,270 250,278 230,280
               C 200,282 170,284 150,285"
            fill="none"
            stroke="#171715"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M 520,255
               C 440,245 380,265 320,268
               C 285,270 250,278 230,280
               C 200,282 170,284 150,285"
            fill="none"
            stroke="#3A3731"
            strokeWidth="1.2"
          />

          {/* Estuary Mangrove Islands */}
          <ellipse cx="320" cy="270" rx="14" ry="5.5" fill="#1F1E1B" stroke="#3A3731" strokeWidth="0.8" />
          <ellipse cx="265" cy="275" rx="9" ry="3.5" fill="#1F1E1B" stroke="#3A3731" strokeWidth="0.8" />

          {/* River Waterway Label */}
          <text
            x="395"
            y="252"
            fill="#89847B"
            fontSize="8"
            letterSpacing="0.14em"
            fontWeight="500"
          >
            SHARAVATHI RIVER
          </text>

          {/* 4. NH-66 Coastal Highway (The Central Route) */}
          <path
            d="M 185,0
               L 185,48
               C 180,85 175,115 175,135
               C 175,185 210,230 222,255
               L 230,280
               C 220,320 200,360 195,420
               C 190,455 205,485 225,515
               C 240,545 250,570 255,595
               L 262,640"
            fill="none"
            stroke="#B49A6A"
            strokeWidth="1.6"
            strokeDasharray="5,4"
            opacity="0.55"
          />

          {/* Highway branch connecting Honnavar east to Sirsi */}
          <path
            d="M 230,280
               C 280,270 330,240 360,215
               L 395,190"
            fill="none"
            stroke="#B49A6A"
            strokeWidth="1.2"
            strokeDasharray="4,4"
            opacity="0.45"
          />

          {/* NH-66 Subtle Route Label */}
          <g transform="translate(182, 38)">
            <rect width="48" height="15" rx="3" fill="#1F1E1B" stroke="#3A3731" strokeWidth="0.8" />
            <text x="24" y="11" textAnchor="middle" fill="#B49A6A" fontSize="7.5" fontWeight="600" letterSpacing="0.08em">
              NH-66
            </text>
          </g>

          {/* 5. Minimalist Editorial Compass Rose (Top Left) */}
          <g transform="translate(48, 52)" opacity="0.75">
            <circle cx="0" cy="0" r="16" fill="none" stroke="#3A3731" strokeWidth="0.8" />
            <line x1="0" y1="-14" x2="0" y2="14" stroke="#89847B" strokeWidth="1" />
            <line x1="-14" y1="0" x2="14" y2="0" stroke="#89847B" strokeWidth="1" />
            <polygon points="0,-14 3,-3 0,0 -3,-3" fill="#B49A6A" />
            <text x="0" y="-17" textAnchor="middle" fill="#B49A6A" fontSize="8" fontWeight="700">
              N
            </text>
          </g>

          {/* 6. Region Editorial Badge (Top Right) */}
          <g transform="translate(345, 20)">
            <rect width="155" height="24" rx="12" fill="#1F1E1B" stroke="#3A3731" strokeWidth="1" />
            <circle cx="14" cy="12" r="3" fill="#B49A6A" />
            <text x="86" y="16" textAnchor="middle" fill="#B8B2A8" fontSize="8" fontWeight="600" letterSpacing="0.14em">
              UTTARA KANNADA
            </text>
          </g>

          {/* 7. Travel Connection Line from Hotel Pumerai to Active Destination */}
          {activePoint && (
            <line
              x1={PUMERAI_COORDS.x}
              y1={PUMERAI_COORDS.y}
              x2={activePoint.x}
              y2={activePoint.y}
              stroke="#B49A6A"
              strokeWidth="1.4"
              strokeDasharray="3,3"
              className="map-travel-line"
            />
          )}

          {/* 8. Destination Markers (Interactive — click, hover, keyboard) */}
          {destinations.map((dest, idx) => {
            const point = DESTINATION_MAP_POINTS[dest.id];
            if (!point) return null;
            const isActive = idx === activeDestIndex;

            return (
              <g
                key={dest.id}
                className={`map-marker-group ${isActive ? "is-active" : ""}`}
                onClick={() => onSelectDestination && onSelectDestination(idx)}
                onMouseEnter={() => onSelectDestination && onSelectDestination(idx)}
                role="button"
                tabIndex={0}
                aria-label={`${dest.name}, ${dest.distanceKm} km from Hotel Pumerai`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectDestination && onSelectDestination(idx);
                  }
                }}
              >
                {/* Hit area — 48px diameter for comfortable clicks/taps */}
                <circle cx={point.x} cy={point.y} r="24" fill="transparent" cursor="pointer" />

                {/* Pulse Ring for Active Marker */}
                {isActive && (
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="8"
                    fill="none"
                    stroke="#B49A6A"
                    strokeWidth="1.6"
                    className="map-active-pulse"
                  />
                )}

                {/* Pin Dot */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={isActive ? 6.5 : 4.5}
                  fill={isActive ? "#B49A6A" : "#89847B"}
                  stroke="#171715"
                  strokeWidth="2"
                  className="map-pin-dot"
                />

                {/* Active: gold callout badge; Inactive: muted label */}
                {isActive ? (
                  <g className="map-active-label-badge">
                    <rect
                      x={point.calloutX}
                      y={point.calloutY}
                      width={point.calloutW}
                      height="22"
                      rx="3"
                      fill="#161513"
                      stroke="#B49A6A"
                      strokeWidth="1.2"
                      className="map-label-bg"
                    />
                    <circle
                      cx={point.calloutX + 8}
                      cy={point.calloutY + 11}
                      r="2"
                      fill="#B49A6A"
                    />
                    <text
                      x={point.calloutX + 16}
                      y={point.calloutY + 14.5}
                      fill="#F2EEE5"
                      fontSize="8.5"
                      fontWeight="700"
                      letterSpacing="0.08em"
                    >
                      {point.calloutName}
                    </text>
                  </g>
                ) : (
                  <text
                    x={point.labelX}
                    y={point.labelY}
                    textAnchor={point.textAnchor}
                    fill="#B8B2A8"
                    fontSize="9.5"
                    fontWeight="500"
                    className="map-marker-label"
                  >
                    {point.shortName}
                  </text>
                )}
              </g>
            );
          })}

          {/* 9. Hotel Pumerai Primary Base Origin Marker */}
          <g className="map-base-marker" transform={`translate(${PUMERAI_COORDS.x}, ${PUMERAI_COORDS.y})`}>
            {/* Soft Ambient Radiance */}
            <circle cx="0" cy="0" r="16" fill="rgba(180, 154, 106, 0.16)" />
            <circle cx="0" cy="0" r="10" fill="none" stroke="#B49A6A" strokeWidth="1.2" />

            {/* Inner Core */}
            <circle cx="0" cy="0" r="6" fill="#B49A6A" />
            <circle cx="0" cy="0" r="2.5" fill="#F2EEE5" />

            {/* Base Badge Label */}
            <g transform="translate(14, -14)">
              <rect
                width="118"
                height="28"
                rx="4"
                fill="#11110F"
                stroke="#B49A6A"
                strokeWidth="1.2"
              />
              <text x="8" y="13" fill="#F2EEE5" fontSize="9.5" fontWeight="700" letterSpacing="0.06em">
                HOTEL PUMERAI
              </text>
              <text x="8" y="22" fill="#B49A6A" fontSize="7" fontWeight="600" letterSpacing="0.1em">
                BASE LOCATION, NH-66
              </text>
            </g>
          </g>
        </svg>

        {/* Map Ingress / Highway Information Footer Bar */}
        <div className="map-footer-ingress">
          <span className="ingress-dot" />
          <span className="ingress-caption">
            NH-66 Coastal Gateway, direct access to beaches, backwaters &amp; heritage sites
          </span>
        </div>
      </div>
    </div>
  );
}
