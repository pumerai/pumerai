export const verifiedServices = [
  {
    id: "reception",
    num: "01",
    title: "24-Hour Reception & Concierge",
    desc: "Round-the-clock front desk welcoming late highway arrivals, arranging Sharavathi river boat trips, and tailoring coastal itineraries.",
    highlight: "24/7 Manned Desk • Express Check-in",
  },
  {
    id: "room-service",
    num: "02",
    title: "Daily Housekeeping & Room Service",
    desc: "Thoughtful daily room care, spotless linens, and prompt in-room dining from Matsya Seafood and Madhura Vegetarian kitchens.",
    highlight: "In-Room Dining • Daily Linens",
  },
  {
    id: "rooftop-pool",
    num: "03",
    title: "Rooftop Pool & Children's Splash Zone",
    desc: "Elevated glass-edge leisure pool open daily from 6:30 AM to 7:00 PM with safe adjoining shallow splash area for young family swimmers.",
    highlight: "Open 6:30 AM – 7:00 PM • Horizon Deck",
  },
  {
    id: "wifi",
    num: "04",
    title: "Free High-Speed 100+ Mbps Wi-Fi",
    desc: "Dependable, seamless wireless coverage across all guest rooms, dining spaces, and public lounges for effortless connectivity.",
    highlight: "100+ Mbps Coverage Throughout",
  },
  {
    id: "parking-ev",
    num: "05",
    title: "Covered Parking & EV Charging",
    desc: "Spacious private parking with dedicated EV charging stations, wide highway ingress/egress, and 24-hour security monitoring.",
    highlight: "EV Charging Bays • Secured Ingress",
  },
  {
    id: "backup-elevator",
    num: "06",
    title: "Dual Elevators & 100% Generator Backup",
    desc: "Barrier-free elevator access across all four floors with seamless 24/7 automated generator power backup.",
    highlight: "Full Power Backup • Dual Elevators",
  },
];

export default function AmenitiesGrid() {
  return (
    <section className="section amenities-section hospitality-section" id="amenities" aria-labelledby="hospitality-heading">
      <div className="section-container">
        {/* Editorial Section Header */}
        <header className="section-header-split" data-reveal>
          <div className="header-meta">
            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>WE ARE HERE FOR YOU</span>
            </div>
            <h2 id="hospitality-heading" className="section-title">
              Hospitality that Goes <br />
              <span className="title-italic">the Extra Mile.</span>
            </h2>
          </div>
          <div className="header-summary-block">
            <p className="header-summary">
              Thoughtful service and everyday comforts designed to make your stay at Hotel Pumerai relaxed and effortless.
            </p>
          </div>
        </header>

        {/* Editorial Hospitality Presentation (Not a generic icon grid) */}
        <div className="hospitality-layout" data-reveal>
          {/* Visual Showcase Column (Large image + 2 supporting frames) */}
          <div className="hospitality-visual-column">
            {/* Primary Dominant Image */}
            <div className="hospitality-primary-frame">
              <img
                src="/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_23_28%20AM_result.webp"
                alt="24-hour reception desk and handcrafted library foyer at Hotel Pumerai"
                loading="lazy"
                className="hospitality-img-zoom"
              />
              <div className="hospitality-frame-overlay">
                <span className="hospitality-badge">24-Hour Attentive Front Desk &amp; Concierge</span>
              </div>
            </div>

            {/* Supporting Secondary Image Frames */}
            <div className="hospitality-supporting-row">
              <div className="hospitality-sub-frame">
                <img
                  src="/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_23_24%20AM_result.webp"
                  alt="Sunlit double-height grand lobby and guest lounge at Hotel Pumerai"
                  loading="lazy"
                  className="hospitality-img-zoom"
                />
                <span className="hospitality-sub-caption">Sunlit Arrival Lounge</span>
              </div>

              <div className="hospitality-sub-frame">
                <img
                  src="/rooms/premium-room/ChatGPT%20Image%20Sep%2025,%202026,%2002_03_35%20AM_result.webp"
                  alt="Spotless linens and contemporary room comfort at Hotel Pumerai"
                  loading="lazy"
                  className="hospitality-img-zoom"
                />
                <span className="hospitality-sub-caption">In-Room Comfort &amp; Dining</span>
              </div>
            </div>
          </div>

          {/* Service Stories Column */}
          <div className="hospitality-stories-column">
            <div className="hospitality-stories-grid">
              {verifiedServices.map((service) => (
                <div className="hospitality-story-card" key={service.id}>
                  <div className="story-card-top">
                    <span className="story-card-num">{service.num}</span>
                    <span className="story-card-pill">{service.highlight}</span>
                  </div>
                  <h3 className="story-card-title">{service.title}</h3>
                  <p className="story-card-desc">{service.desc}</p>
                </div>
              ))}
            </div>

            {/* Bottom Hospitality Note */}
            <div className="hospitality-footer-note">
              <div className="hfn-inner">
                <span className="hfn-accent">&bull;</span>
                <p className="hfn-text">
                  Direct bookings receive complimentary Wi-Fi, priority early check-in assistance, and free secured parking with EV bays.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
