const transitHighlights = [
  {
    label: "NH-66 Coastal Highway",
    value: "Direct Ingress / Egress",
    desc: "Direct access along the Karavali highway corridor connecting Goa, Gokarna, Murudeshwar, and Mangalore.",
  },
  {
    label: "Honnavar Railway Station (HNA)",
    value: "~3.5 km • 9 min drive",
    desc: "Key Konkan Railway junction with direct trains to Mumbai, Goa, Mangalore, and Bangalore.",
  },
  {
    label: "Kasarkod Eco Beach",
    value: "~5 km • 8 min drive",
    desc: "Blue Flag-certified beach featuring golden sands, casuarina groves, and clean swimming waters.",
  },
  {
    label: "Sharavathi River Boating",
    value: "~2.8 km • 5 min drive",
    desc: "Scenic river cruises, mangrove trails, and tranquil backwater sunset boat rides.",
  },
  {
    label: "Honnavar KSRTC Bus Stand",
    value: "~2.5 km • 6 min drive",
    desc: "Frequent intercity and interstate coastal express transit.",
  },
  {
    label: "Airport Transit Corridors",
    value: "Goa & Mangalore",
    desc: "Accessible via NH-66: Goa MOPA / Dabolim (~150 km) and Mangalore International (~175 km).",
  },
];

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
  const officialGoogleMapsLink = "https://maps.app.goo.gl/rCfTnw9t8Dp58mga7";

  return (
    <section className="section location-section coastal-connected-section" id="location" aria-labelledby="coastal-connected-title">
      <div className="section-container">
        {/* Editorial Split Composition */}
        <div className="coastal-connected-split" data-reveal>
          {/* LEFT: Large location / map / landscape visual */}
          <div className="cc-map-column">
            <div className="cc-map-frame">
              <iframe
                title="Hotel Pumerai Honnavar Official Location on Google Maps"
                src="https://maps.google.com/maps?q=Hotel+Pumerai,+NH-66,+Ramateertha+Cross,+Honnavar,+Karnataka+581334&amp;hl=en&amp;z=15&amp;output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="cc-map-iframe"
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

          {/* RIGHT: Heading, Short paragraph, Location information, Distances / connectivity, Map CTA */}
          <div className="cc-content-column">
            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>LOCATION &amp; ACCESS &bull; HONNAVAR</span>
            </div>

            <h2 id="coastal-connected-title" className="section-title cc-heading">
              Coastal. <br />
              <span className="title-italic">Yet Connected.</span>
            </h2>

            <div className="brass-rule-small" />

            <p className="cc-lead-copy">
              Set along NH-66 in Honnavar, Hotel Pumerai offers a comfortable coastal base with convenient access
              to beaches, rivers and nearby destinations across Uttara Kannada.
            </p>

            {/* Distances & Connectivity Highlights */}
            <div className="cc-connectivity-grid">
              {transitHighlights.map((item) => (
                <div className="cc-conn-card" key={item.label}>
                  <div className="cc-conn-header">
                    <h3 className="cc-conn-label">{item.label}</h3>
                    <span className="cc-conn-val">{item.value}</span>
                  </div>
                  <p className="cc-conn-desc">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Official Address & Concierge Card */}
            <div className="cc-address-block">
              <div className="cc-addr-info">
                <span className="cc-addr-tag">Official Property Address</span>
                <h4 className="cc-addr-name">Hotel Pumerai</h4>
                <address className="cc-addr-text">
                  NH-66, near Ramateertha Cross, Honnavar, Uttara Kannada, Karnataka 581334
                </address>
              </div>

              <div className="cc-addr-contacts">
                <a href="tel:+919845423223" className="cc-contact-chip">
                  <span className="chip-label">Reservations:</span>
                  <span className="chip-val">+91 98454 23223</span>
                </a>
                <a
                  href="https://wa.me/919845423223?text=Hi%20Hotel%20Pumerai%2C%20I%20would%20like%20directions%20and%20assistance."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cc-contact-chip chip-whatsapp"
                >
                  <span className="chip-label">WhatsApp:</span>
                  <span className="chip-val">Chat with Concierge</span>
                </a>
              </div>

              <div className="cc-cta-row">
                <a
                  href={officialGoogleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-primary cc-directions-btn"
                >
                  <span>OPEN HOTEL PUMERAI ON GOOGLE MAPS <span className="arrow-icon">&rarr;</span></span>
                </a>
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
