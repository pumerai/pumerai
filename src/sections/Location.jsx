import { useState } from "react";
import { destinations } from "../data/destinations.js";

const hotelPolicies = [
  { label: "Check-in Time", value: "From 1:00 PM (24-hr front desk welcomes late highway arrivals)" },
  { label: "Check-out Time", value: "Until 11:00 AM (Late checkout subject to room availability)" },
  { label: "Pool Hours", value: "6:30 AM – 7:00 PM daily (Rooftop leisure & children's splash pool)" },
  { label: "Smoking Policy", value: "All rooms are smoke-free; permitted only in designated outdoor zones" },
  { label: "Pet Policy", value: "Pets are not accommodated" },
  { label: "Parking & EV", value: "Spacious private parking with dedicated EV charging stations" },
  { label: "Front Desk", value: "24-hour manned reception, security & luggage assistance" },
  { label: "Direct Bookings", value: "Free cancellation up to 24 hours prior to check-in on eligible rates" },
];

export default function Location({ isStandalonePage = false }) {
  const [activeDestIndex, setActiveDestIndex] = useState(0);
  const activeDest = destinations[activeDestIndex] || destinations[0];
  const officialGoogleMapsLink = "https://maps.app.goo.gl/rCfTnw9t8Dp58mga7";

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

        {/* MAIN INTERACTIVE AREA: Two-part destination experience */}
        <div className="location-editorial-grid" data-reveal>
          {/* LEFT SIDE: Large Pumerai location / map visual */}
          <div className="location-map-column">
            <div className="location-map-wrapper">
              <iframe
                title="Hotel Pumerai Honnavar Official Location on Google Maps"
                src="https://maps.google.com/maps?q=Hotel+Pumerai,+NH-66,+Ramateertha+Cross,+Honnavar,+Karnataka+581334&amp;hl=en&amp;z=15&amp;output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="location-map-iframe"
              />

              {/* Map Floating Actions */}
              <div className="cc-map-overlay-bar">
                <a
                  href={officialGoogleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-primary cc-map-action-btn"
                  aria-label="Get directions to Hotel Pumerai on Google Maps"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="3 11 22 2 13 21 11 13 3 11" />
                  </svg>
                  <span>GET DIRECTIONS</span>
                </a>
                <a
                  href={officialGoogleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-secondary cc-map-app-btn"
                  aria-label="Open location in Google Maps app"
                >
                  Open in Maps
                </a>
              </div>
            </div>

            {/* Highway Landmark Ingress Tag */}
            <div className="cc-highway-ingress-card">
              <div className="ingress-badge">
                <span className="ingress-pip" />
                <span>NH-66 DIRECT ACCESS</span>
              </div>
              <p className="ingress-text">
                Wide ingress and egress right off National Highway 66 near Ramateertha Cross. Features private secured parking bays and dedicated EV charging.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE: Interactive destination selector panel */}
          <div className="location-destination-column">
            {/* Horizontal Destination Tabs */}
            <div className="destination-tabs-nav" role="tablist" aria-label="Destinations around Honnavar">
              <div className="destination-tabs-scroll">
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
              {/* Large Destination Image */}
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
                    <span className="distance-icon" aria-hidden="true">📍</span>
                    <span>{activeDest.distance}</span>
                    {activeDest.driveTime && (
                      <>
                        <span className="distance-sep">&bull;</span>
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
            <span className="policies-tag">Essential Stay Information</span>
            <h3 className="policies-title">Hotel Policies &amp; Guest Comfort</h3>
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
