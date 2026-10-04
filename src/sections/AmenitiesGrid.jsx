export const verifiedServices = [
  {
    id: "reception",
    num: "01",
    title: "24-Hour Reception & Concierge",
    desc: "Round-the-clock front desk welcoming late arrivals and arranging local boat trips.",
    highlight: "24/7 Front Desk, Express Check-in",
  },
  {
    id: "room-service",
    num: "02",
    title: "Daily Housekeeping & Room Service",
    desc: "Daily housekeeping and in-room dining from both Matsya and Madhura restaurants.",
    highlight: "In-Room Dining, Daily Linens",
  },
  {
    id: "rooftop-pool",
    num: "03",
    title: "Rooftop Pool & Children's Splash Zone",
    desc: "Glass-edge pool open 6:30 AM to 7:00 PM with shallow children's splash area.",
    highlight: "Open 6:30 AM – 7:00 PM, Horizon Deck",
  },
  {
    id: "wifi",
    num: "04",
    title: "Free High-Speed Wi-Fi",
    desc: "Fast 100+ Mbps wireless coverage across all rooms, dining spaces and lounges.",
    highlight: "100+ Mbps Coverage Throughout",
  },
  {
    id: "parking-ev",
    num: "05",
    title: "Covered Parking & EV Charging",
    desc: "Private covered parking with EV charging stations and 24-hour security monitoring.",
    highlight: "EV Charging Bays, Secure Parking",
  },
  {
    id: "backup-elevator",
    num: "06",
    title: "Dual Elevators & Power Backup",
    desc: "Elevator access across all four floors with 24/7 automated generator power backup.",
    highlight: "Full Power Backup, Dual Elevators",
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
              <span>SERVICES</span>
            </div>
            <h2 id="hospitality-heading" className="section-title">
              Hospitality and <br />
              <span className="title-italic">Guest Services.</span>
            </h2>
          </div>
          <div className="header-summary-block">
            <p className="header-summary">
              Everyday comforts and services for your stay at Hotel Pumerai.
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
                src="/gallery/lobby-library-reception.webp"
                alt="24-hour reception desk and handcrafted library foyer at Hotel Pumerai"
                width="1280"
                height="853"
                loading="lazy"
                className="hospitality-img-zoom"
              />
              <div className="hospitality-frame-overlay">
                <span className="hospitality-badge">24-Hour Front Desk &amp; Concierge</span>
              </div>
            </div>

            {/* Supporting Secondary Image Frames */}
            <div className="hospitality-supporting-row">
              <div className="hospitality-sub-frame">
                <img
                  src="/gallery/sunlit-grand-lobby.webp"
                  alt="Sunlit double-height grand lobby and guest lounge at Hotel Pumerai"
                  width="1280"
                  height="853"
                  loading="lazy"
                  className="hospitality-img-zoom"
                />
                <span className="hospitality-sub-caption">Sunlit Arrival Lounge</span>
              </div>

              <div className="hospitality-sub-frame">
                <img
                  src="/rooms/premium-room/premium-room-main.webp"
                  alt="Spotless linens and contemporary room comfort at Hotel Pumerai"
                  width="1280"
                  height="853"
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
                  </div>
                  <h3 className="story-card-title">{service.title}</h3>
                  <p className="story-card-desc">{service.desc}</p>
                </div>
              ))}
            </div>

            {/* Bottom Hospitality Note */}
            <div className="hospitality-footer-note">
              <div className="hfn-inner">
                <span className="hfn-accent" />
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
