import { useState } from "react";

const banquetHalls = [
  {
    id: "sidhvin",
    name: "SIDHVIN BANQUET HALL",
    capacity: "200 Guests",
    seatingType: "Auditorium & Theater Seating",
    tagline: "Grand Celebrations, Weddings & Corporate Gatherings",
    description:
      "Sidhvin Banquet Hall is Hotel Pumerai's flagship grand event space. Featuring generous proportions, high acoustic ceilings, fluted teak wall cladding, and a raised stage with ceremonial backdrop, it is perfectly suited for wedding receptions, cultural milestones, award banquets, and large corporate seminars along NH-66.",
    mainImage: "/banquet/sidhvin-hall-main.webp",
    gallery: [
      { src: "/banquet/sidhvin-hall-main.webp", alt: "Sidhvin Banquet Hall theater seating setup with stage at Hotel Pumerai" },
      { src: "/banquet/sidhvin-hall-stage.webp", alt: "Decorated ceremonial stage at Sidhvin Banquet Hall" },
      { src: "/banquet/sidhvin-hall-auditorium.webp", alt: "Full auditorium view of Sidhvin Banquet Hall Honnavar" },
    ],
    features: [
      "Capacity: 200 Guests",
      "Expansive Theater & Banquet Seating Layouts",
      "Elevated Ceremonial Stage & Podium",
      "Centralized Air Conditioning",
      "High-Speed Wi-Fi & Generator Power Backup",
      "Passenger Elevator Access & Covered Parking",
      "Customized Multi-Cuisine Catering (Matsya & Madhura)",
    ],
  },
  {
    id: "milan",
    name: "MILAN HALL",
    capacity: "50 Guests",
    seatingType: "Round Table Banquet & Executive Meets",
    tagline: "Intimate Celebrations, Seminars & Private Dining",
    description:
      "Milan Hall offers a warm, refined atmosphere for smaller gatherings of up to 50 guests. Designed with clothed round banquet tables, a dedicated speaker dais, ambient cove illumination, and contemporary timber finishes, it provides an exclusive, comfortable setting for family milestones, pre-wedding festivities, executive board meetings, and private dinners.",
    mainImage: "/banquet/milan-hall-main.webp",
    gallery: [
      { src: "/banquet/milan-hall-main.webp", alt: "Milan Hall round table banquet setup with stage at Hotel Pumerai" },
      { src: "/banquet/milan-hall-stage.webp", alt: "Speaker dais and presentation stage at Milan Hall" },
      { src: "/banquet/milan-hall-tables.webp", alt: "Elegantly arranged banquet dining tables at Milan Hall Honnavar" },
    ],
    features: [
      "Capacity: 50 Guests",
      "Round Banquet Tables with Drapes",
      "Elevated Presentation Dais & Lectern",
      "Centralized Air Conditioning",
      "Adjoining Elevator Foyer & Lounge",
      "Dedicated High-Speed Wi-Fi",
      "Specialized Pure Veg & Multi-Cuisine Menus",
    ],
  },
];

export default function Banquet() {
  const [activePhoto, setActivePhoto] = useState({
    sidhvin: banquetHalls[0].mainImage,
    milan: banquetHalls[1].mainImage,
  });

  const handleThumbnailClick = (hallId, src) => {
    setActivePhoto((prev) => ({ ...prev, [hallId]: src }));
  };

  return (
    <div className="banquet-content-wrapper">
      {/* Intro Overview Section */}
      <section className="section banquet-intro-section" aria-label="Banquet Overview">
        <div className="section-container">
          <div className="banquet-intro-card" data-reveal>
            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>Event Hosting • Hotel Pumerai</span>
            </div>
            <h2 className="section-title">
              Exceptional venues for <br />
              <span className="title-italic">unforgettable occasions.</span>
            </h2>
            <div className="brass-rule-small" />
            <p className="banquet-intro-text">
              Conveniently situated on NH-66 near Ramateertha Cross in Honnavar, Hotel Pumerai provides
              two distinct, air-conditioned banquet venues equipped for weddings, family milestones,
              corporate conferences, and private banquets. With generous guest parking, elevator access,
              on-site accommodation, and curated catering from our restaurants, every event is executed
              with effortless hospitality.
            </p>
          </div>
        </div>
      </section>

      {/* Hall 1: Sidhvin Banquet Hall */}
      <section className="section banquet-hall-section" id="sidhvin-hall" aria-labelledby="sidhvin-title">
        <div className="section-container">
          <div className="banquet-hall-grid" data-reveal>
            {/* Visual Column */}
            <div className="banquet-visual-col">
              <div className="banquet-main-frame">
                <img
                  src={activePhoto.sidhvin}
                  alt="Sidhvin Banquet Hall at Hotel Pumerai Honnavar"
                  className="banquet-main-image"
                  loading="lazy"
                />
                <div className="banquet-capacity-badge">
                  <span>CAPACITY: 200 GUESTS</span>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="banquet-thumbs-row" role="group" aria-label="Sidhvin Hall Gallery">
                {banquetHalls[0].gallery.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`banquet-thumb-btn ${activePhoto.sidhvin === item.src ? "is-active" : ""}`}
                    onClick={() => handleThumbnailClick("sidhvin", item.src)}
                    aria-label={`View photo ${idx + 1} of Sidhvin Banquet Hall`}
                  >
                    <img src={item.src} alt={item.alt} loading="lazy" />
                  </button>
                ))}
              </div>
            </div>

            {/* Content Column */}
            <div className="banquet-info-col">
              <div className="editorial-tag">
                <span className="accent-pip" />
                <span>Premier Grand Venue &bull; Capacity 200</span>
              </div>
              <h3 id="sidhvin-title" className="banquet-hall-name">
                {banquetHalls[0].name}
              </h3>
              <p className="banquet-hall-tagline">{banquetHalls[0].tagline}</p>
              <div className="brass-rule-small" />
              <p className="banquet-hall-desc">{banquetHalls[0].description}</p>

              <div className="banquet-features-block">
                <h4 className="features-title">HALL HIGHLIGHTS &amp; FACILITIES:</h4>
                <ul className="banquet-features-list">
                  {banquetHalls[0].features.map((feat, i) => (
                    <li key={i} className="banquet-feature-item">
                      <span className="feature-check">&#x2713;</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="banquet-action-row">
                <a
                  href="https://wa.me/919845423223?text=Hi%20Hotel%20Pumerai%2C%20I%20would%20like%20to%20enquire%20about%20booking%20Sidhvin%20Banquet%20Hall%20(200%20guests)."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-primary banquet-cta-btn"
                  aria-label="Enquire about Sidhvin Banquet Hall on WhatsApp"
                >
                  ENQUIRE ON WHATSAPP
                </a>
                <a
                  href="tel:+919845423223"
                  className="button-secondary banquet-phone-btn"
                  aria-label="Call Hotel Pumerai Events Desk"
                >
                  CALL EVENTS DESK
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hall 2: Milan Hall */}
      <section className="section banquet-hall-section banquet-hall-alt" id="milan-hall" aria-labelledby="milan-title">
        <div className="section-container">
          <div className="banquet-hall-grid banquet-grid-reversed" data-reveal>
            {/* Visual Column */}
            <div className="banquet-visual-col">
              <div className="banquet-main-frame">
                <img
                  src={activePhoto.milan}
                  alt="Milan Hall at Hotel Pumerai Honnavar"
                  className="banquet-main-image"
                  loading="lazy"
                />
                <div className="banquet-capacity-badge">
                  <span>CAPACITY: 50 GUESTS</span>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="banquet-thumbs-row" role="group" aria-label="Milan Hall Gallery">
                {banquetHalls[1].gallery.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`banquet-thumb-btn ${activePhoto.milan === item.src ? "is-active" : ""}`}
                    onClick={() => handleThumbnailClick("milan", item.src)}
                    aria-label={`View photo ${idx + 1} of Milan Hall`}
                  >
                    <img src={item.src} alt={item.alt} loading="lazy" />
                  </button>
                ))}
              </div>
            </div>

            {/* Content Column */}
            <div className="banquet-info-col">
              <div className="editorial-tag">
                <span className="accent-pip" />
                <span>Intimate Event Space &bull; Capacity 50</span>
              </div>
              <h3 id="milan-title" className="banquet-hall-name">
                {banquetHalls[1].name}
              </h3>
              <p className="banquet-hall-tagline">{banquetHalls[1].tagline}</p>
              <div className="brass-rule-small" />
              <p className="banquet-hall-desc">{banquetHalls[1].description}</p>

              <div className="banquet-features-block">
                <h4 className="features-title">HALL HIGHLIGHTS &amp; FACILITIES:</h4>
                <ul className="banquet-features-list">
                  {banquetHalls[1].features.map((feat, i) => (
                    <li key={i} className="banquet-feature-item">
                      <span className="feature-check">&#x2713;</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="banquet-action-row">
                <a
                  href="https://wa.me/919845423223?text=Hi%20Hotel%20Pumerai%2C%20I%20would%20like%20to%20enquire%20about%20booking%20Milan%20Hall%20(50%20guests)."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-primary banquet-cta-btn"
                  aria-label="Enquire about Milan Hall on WhatsApp"
                >
                  ENQUIRE ON WHATSAPP
                </a>
                <a
                  href="tel:+919845423223"
                  className="button-secondary banquet-phone-btn"
                  aria-label="Call Hotel Pumerai Events Desk"
                >
                  CALL EVENTS DESK
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Enquiry Card */}
      <section className="section banquet-enquiry-banner" aria-label="Event Planning Assistance">
        <div className="section-container">
          <div className="banquet-enquiry-box" data-reveal>
            <div className="enquiry-box-content">
              <span className="editorial-tag-light">PERSONALIZED EVENT PLANNING</span>
              <h3 className="enquiry-box-heading">Plan your occasion with our dedicated banquet team.</h3>
              <p className="enquiry-box-subtext">
                From seating arrangements and audiovisual coordination to specialized pure vegetarian or
                coastal seafood banquet dining, we ensure seamless hospitality for your guests.
              </p>
            </div>
            <div className="enquiry-box-actions">
              <a
                href="https://wa.me/919845423223?text=Hi%20Hotel%20Pumerai%20Events%20Team%2C%20I%20would%20like%20to%20plan%20an%20event%20at%20your%20banquet%20halls."
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary enquiry-primary-btn"
              >
                CHAT WITH EVENT CONCIERGE
              </a>
              <span className="enquiry-phone-note">Or call directly: +91 98454 23223</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
