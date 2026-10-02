import { useState, useRef, useEffect } from "react";
import { destinations } from "../data/destinations.js";
import UttaraKannadaMap from "../components/UttaraKannadaMap.jsx";

const hotelPolicies = [
  { label: "Check-in Time", value: "From 1:00 PM with 24-hour reception for late arrivals." },
  { label: "Check-out Time", value: "Until 11:00 AM." },
  { label: "Pool Hours", value: "6:30 AM to 7:00 PM daily for rooftop and children's pools." },
  { label: "Smoking Policy", value: "Smoke-free rooms with designated outdoor smoking areas." },
  { label: "Pet Policy", value: "Pets are not accommodated." },
  { label: "Parking & EV", value: "Covered parking with dedicated EV charging stations." },
  { label: "Front Desk", value: "24-hour front desk, security and luggage assistance." },
  { label: "Direct Bookings", value: "Free cancellation up to 24 hours before check-in." },
];

export default function Location({ isStandalonePage = false }) {
  const [activeDestIndex, setActiveDestIndex] = useState(0);
  const activeDest = destinations[activeDestIndex] || destinations[0];
  const tabsScrollRef = useRef(null);

  // Smoothly center the active tab if activated via map
  useEffect(() => {
    if (tabsScrollRef.current) {
      const activeTab = tabsScrollRef.current.children[activeDestIndex];
      if (activeTab && typeof activeTab.scrollIntoView === "function") {
        activeTab.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
      }
    }
  }, [activeDestIndex]);

  return (
    <section
      className="section location-section coastal-connected-section"
      id="location"
      aria-labelledby="location-editorial-heading"
    >
      <div className="section-container">
        {/* TOP AREA: Two-column editorial introduction */}
        <header className="location-editorial-header" data-reveal>
          <div className="location-header-col-left">
            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>IN &amp; AROUND</span>
            </div>
            <h2 id="location-editorial-heading" className="section-title location-editorial-title">
              Explore Honnavar, <br />
              <span className="title-italic">From Pumerai</span>
            </h2>
          </div>
          <div className="location-header-col-right">
            <p className="location-header-copy">
              Discover beaches, rivers, temples and coastal destinations around Honnavar, with Hotel Pumerai as your comfortable base.
            </p>
          </div>
        </header>

        {/* MAIN INTERACTIVE AREA: Two-column Map + Destination Experience */}
        <div className="location-editorial-grid" data-reveal>
          {/* LEFT SIDE: Interactive Stylized Uttara Kannada Regional Map */}
          <div className="location-map-column">
            <UttaraKannadaMap
              destinations={destinations}
              activeDestIndex={activeDestIndex}
              onSelectDestination={(idx) => setActiveDestIndex(idx)}
            />
          </div>

          {/* RIGHT SIDE: Interactive destination selector & information panel */}
          <div className="location-destination-column">
            {/* Horizontal Destination Tabs */}
            <div className="destination-tabs-nav" role="tablist" aria-label="Destinations around Honnavar">
              <div className="destination-tabs-scroll" ref={tabsScrollRef}>
                {destinations.map((dest, idx) => {
                  const isActive = idx === activeDestIndex;
                  return (
                    <button
                      key={dest.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`destination-tab-btn ${isActive ? "is-active" : ""}`}
                      onClick={() => setActiveDestIndex(idx)}
                    >
                      <span className="destination-tab-text">{dest.tabLabel || dest.name}</span>
                      {isActive && <span className="destination-tab-indicator" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Destination Content Panel (Keyed by activeDest.id for smooth switch animation) */}
            <div className="destination-detail-panel" key={activeDest.id}>
              {/* Large Destination Image with Pumerai Hover System */}
              <div className="destination-image-container gold-edge-frame">
                <img
                  src={activeDest.image}
                  alt={activeDest.alt}
                  loading="lazy"
                  className="destination-featured-image"
                />
                <div className="destination-image-tag">
                  <span className="tag-dot" />
                  <span>{activeDest.type}</span>
                </div>
              </div>

              {/* Destination Metadata */}
              <div className="destination-meta-group">
                <div className="destination-title-row">
                  <h3 className="destination-name">{activeDest.name}</h3>
                  <div className="destination-distance-badge">
                    <span className="distance-icon" aria-hidden="true" />
                    <span>{activeDest.distance}</span>
                    {activeDest.driveTime && (
                      <>
                        <span className="distance-sep">, </span>
                        <span className="distance-time">{activeDest.driveTime}</span>
                      </>
                    )}
                  </div>
                </div>

                <p className="destination-desc">{activeDest.description}</p>

                {/* Map CTA Button */}
                <div className="destination-cta-row">
                  <a
                    href={activeDest.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-primary destination-map-btn"
                    aria-label={`View ${activeDest.name} location on Google Maps`}
                  >
                    <span>VIEW LOCATION ON MAP <span className="arrow-icon" aria-hidden="true">&rarr;</span></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Essential Stay Information & Policies */}
        <div className="policies-summary-card" data-reveal>
          <div className="policies-header">
            <span className="policies-tag">POLICIES</span>
            <h3 className="policies-title">Hotel Policies</h3>
          </div>
          <div className="policies-two-col-grid">
            {hotelPolicies.map((p) => (
              <div className="policy-row-item" key={p.label}>
                <span className="policy-row-label">{p.label}</span>
                <span className="policy-row-val">{p.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
