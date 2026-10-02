import { useState } from "react";

const destinations = [
  {
    id: "kasarkod",
    num: "01",
    name: "Kasarkod Eco Beach",
    type: "Blue Flag Beach",
    distance: "~5 km",
    time: "8 min drive",
    description:
      "Prestigious Blue Flag-certified beach featuring golden sands, casuarina groves, pristine waters, and a scenic coastal boardwalk overlooking the Arabian Sea.",
    image: "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_42%20AM_result.webp",
    alt: "Kasarkod Eco Beach golden sand and coastal greenery near Honnavar",
    mapsQuery: "Kasarkod+Eco+Beach+Honnavar",
  },
  {
    id: "sharavathi",
    num: "02",
    name: "Sharavathi River Backwaters",
    type: "River & Mangroves",
    distance: "~2.8 km",
    time: "5 min drive",
    description:
      "Serene mangrove boat cruises, historic railway bridges across the river estuary, and tranquil sunset rides arranged directly by Hotel Pumerai concierge.",
    image: "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_15%20AM_result.webp",
    alt: "Sharavathi River backwater boating and lush mangroves in Honnavar",
    mapsQuery: "Sharavathi+River+Boating+Honnavar",
  },
  {
    id: "murudeshwar",
    num: "03",
    name: "Murudeshwar Temple & Beach",
    type: "Iconic Pilgrimage",
    distance: "~26 km",
    time: "35 min drive",
    description:
      "Home to the iconic 123-foot Shiva statue, 20-storey Raja Gopura, and Arabian Sea peninsula views, situated an easy drive south along NH-66.",
    image: "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_21%20AM_result.webp",
    alt: "Murudeshwar Temple towering Shiva statue and coastal peninsula along NH-66",
    mapsQuery: "Murudeshwar+Temple",
  },
  {
    id: "bhatkal",
    num: "04",
    name: "Bhatkal & Heritage Coast",
    type: "Coastal Town",
    distance: "~38 km",
    time: "45 min drive",
    description:
      "Historic coastal trading port along NH-66 with heritage architecture, calm shores, and authentic coastal Karnataka traditions.",
    image: "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_05%20AM_result.webp",
    alt: "Heritage coastal port and architecture around Bhatkal Karnataka",
    mapsQuery: "Bhatkal+Karnataka",
  },
  {
    id: "apsarakonda",
    num: "05",
    name: "Apsarakonda Waterfalls",
    type: "Lagoon & Waterfalls",
    distance: "~8 km",
    time: "12 min drive",
    description:
      "Freshwater waterfall cascading into a natural emerald pond with scenic clifftop sunset viewpoints overlooking the Arabian Sea.",
    image: "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_23_32%20AM_result.webp",
    alt: "Apsarakonda coastal waterfall and sunset viewpoint in Honnavar",
    mapsQuery: "Apsarakonda+Falls+Honnavar",
  },
  {
    id: "mirjan",
    num: "06",
    name: "Historic Mirjan Fort",
    type: "16th-Century Heritage",
    distance: "~18 km",
    time: "22 min drive",
    description:
      "Majestic 16th-century laterite stone citadel enveloped in verdant moss, known for its deep moats, watchtowers, and tranquil coastal history.",
    image: "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_21_55%20AM_result.webp",
    alt: "Ancient Mirjan Fort laterite stone bastions near Honnavar",
    mapsQuery: "Mirjan+Fort+Karnataka",
  },
];

export default function InAndAround({ onNavigate }) {
  const [activeDestIndex, setActiveDestIndex] = useState(0);
  const activeDest = destinations[activeDestIndex];

  return (
    <section className="section in-and-around-section" id="in-and-around" aria-labelledby="in-around-heading">
      <div className="section-container">
        {/* Editorial Section Header */}
        <header className="section-header-split" data-reveal>
          <div className="header-meta">
            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>IN &amp; AROUND</span>
            </div>
            <h2 id="in-around-heading" className="section-title">
              Explore Honnavar, <br />
              <span className="title-italic">From Pumerai.</span>
            </h2>
          </div>
          <div className="header-summary-block">
            <p className="header-summary">
              Discover beaches, rivers, temples and coastal destinations around Honnavar, with Hotel Pumerai as your comfortable base.
            </p>
          </div>
        </header>

        {/* Editorial Composition: Large Visual Area + Magazine List */}
        <div className="in-around-showcase" data-reveal>
          {/* Dominant Featured Visual Frame */}
          <div className="in-around-spotlight-frame">
            <div className="spotlight-media-container">
              <img
                key={activeDest.id}
                src={activeDest.image}
                alt={activeDest.alt}
                loading="lazy"
                className="spotlight-image"
              />
              <div className="spotlight-overlay" />

              {/* Floating Badges */}
              <div className="spotlight-top-badge">
                <span className="spotlight-badge-pip" />
                <span className="spotlight-badge-type">{activeDest.type}</span>
              </div>

              <div className="spotlight-bottom-info">
                <div className="spotlight-distance-pill">
                  <strong>{activeDest.distance}</strong>
                  <span className="pill-dot">&bull;</span>
                  <span>{activeDest.time} from Hotel Pumerai</span>
                </div>
                <h3 className="spotlight-title">{activeDest.name}</h3>
                <p className="spotlight-desc">{activeDest.description}</p>
                <div className="spotlight-actions">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeDest.mapsQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-primary spotlight-btn"
                    aria-label={`Get directions to ${activeDest.name} on Google Maps`}
                  >
                    <span>GET DIRECTIONS ON MAP <span className="arrow-icon">&rarr;</span></span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Asymmetrical Editorial Destination List */}
          <div className="in-around-list-column" role="tablist" aria-label="Destinations around Honnavar">
            {destinations.map((dest, idx) => {
              const isSelected = idx === activeDestIndex;
              return (
                <button
                  key={dest.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`in-around-item-btn ${isSelected ? "is-active" : ""}`}
                  onClick={() => setActiveDestIndex(idx)}
                  onMouseEnter={() => setActiveDestIndex(idx)}
                >
                  <div className="item-btn-num">{dest.num}</div>
                  <div className="item-btn-content">
                    <div className="item-btn-header">
                      <h4 className="item-btn-title">{dest.name}</h4>
                      <span className="item-btn-distance">{dest.distance}</span>
                    </div>
                    <div className="item-btn-meta">
                      <span className="item-btn-type">{dest.type}</span>
                      <span className="item-btn-sep">&bull;</span>
                      <span className="item-btn-time">{dest.time}</span>
                    </div>
                  </div>
                  <span className="item-btn-arrow" aria-hidden="true">&rarr;</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Global Explorer Map Action */}
        <div className="in-around-footer-bar" data-reveal>
          <div className="ia-footer-content">
            <span className="ia-footer-icon">📍</span>
            <p className="ia-footer-text">
              Hotel Pumerai sits directly on NH-66 near Ramateertha Cross, offering swift ingress and egress to all destinations in Uttara Kannada.
            </p>
          </div>
          <a
            href="https://maps.app.goo.gl/rCfTnw9t8Dp58mga7"
            target="_blank"
            rel="noopener noreferrer"
            className="button-secondary ia-footer-btn"
          >
            <span>VIEW HOTEL ON GOOGLE MAPS</span>
          </a>
        </div>
      </div>
    </section>
  );
}
