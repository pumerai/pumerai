import { useState } from "react";
import WhatsAppEnquiry from "./WhatsAppEnquiry.jsx";

const banquetHalls = [
  {
    id: "sidhvin",
    name: "SIDHVIN BANQUET HALL",
    capacity: "200 GUESTS",
    tagline: "Weddings and large events.",
    description:
      "A grand hall with a raised stage for receptions and conferences.",
    mainImage: "/banquet/sidhvin-hall-main.webp",
    gallery: [
      { src: "/banquet/sidhvin-hall-main.webp", alt: "Sidhvin Banquet Hall theater seating setup with stage at Hotel Pumerai" },
      { src: "/banquet/sidhvin-hall-stage.webp", alt: "Decorated ceremonial stage at Sidhvin Banquet Hall" },
      { src: "/banquet/sidhvin-hall-auditorium.webp", alt: "Full auditorium view of Sidhvin Banquet Hall Honnavar" },
    ],
    features: [
      "Air-conditioned hall (capacity: up to 200 guests)",
      "Raised ceremonial stage and presentation podium",
      "Audio-visual setup and high-speed Wi-Fi",
      "100% generator power backup and elevator access",
      "Covered parking with EV charging bays",
    ],
  },
  {
    id: "milan",
    name: "MILAN HALL",
    capacity: "50 GUESTS",
    tagline: "Private dinners and small events.",
    description:
      "A warm hall for family functions, meetings and private dinners.",
    mainImage: "/banquet/milan-hall-main.webp",
    gallery: [
      { src: "/banquet/milan-hall-main.webp", alt: "Milan Hall round table banquet setup with stage at Hotel Pumerai" },
      { src: "/banquet/milan-hall-stage.webp", alt: "Speaker dais and presentation stage at Milan Hall" },
      { src: "/banquet/milan-hall-tables.webp", alt: "Elegantly arranged banquet dining tables at Milan Hall Honnavar" },
    ],
    features: [
      "Air-conditioned hall (capacity: up to 50 guests)",
      "Round banquet tables and flexible seating",
      "Speaker presentation dais and audio-visual support",
      "High-speed Wi-Fi and 100% power backup",
      "Elevator access and dedicated parking",
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
            <p className="banquet-intro-text">
              Parking, lift access and in-house catering, including pure veg.
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
                  width="1140"
                  height="1070"
                  className="banquet-main-image reveal-drop reveal-delay-0"
                  loading="lazy"
                />
                <div className="banquet-capacity-badge">
                  <span>200 GUESTS</span>
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
                    <img src={item.src} alt={item.alt} width="970" height="520" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>

            {/* Content Column */}
            <div className="banquet-info-col">
              <div className="editorial-tag">
                <span className="accent-pip" />
                <span>Premier Grand Venue</span>
              </div>
              <h2 id="sidhvin-title" className="banquet-hall-name">
                {banquetHalls[0].name}
              </h2>
              <p className="banquet-hall-tagline">{banquetHalls[0].tagline}</p>
              <div className="brass-rule-small" />
              <p className="banquet-hall-desc">{banquetHalls[0].description}</p>

              <div className="banquet-features-block">
                <h3 className="features-title">FACILITIES</h3>
                <ul className="banquet-features-list">
                  {banquetHalls[0].features.map((feat, i) => (
                    <li key={i} className="banquet-feature-item">
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
                  width="1140"
                  height="1060"
                  className="banquet-main-image reveal-drop reveal-delay-1"
                  loading="lazy"
                />
                <div className="banquet-capacity-badge">
                  <span>50 GUESTS</span>
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
                    <img src={item.src} alt={item.alt} width="970" height="520" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>

            {/* Content Column */}
            <div className="banquet-info-col">
              <div className="editorial-tag">
                <span className="accent-pip" />
                <span>Intimate Event Space</span>
              </div>
              <h2 id="milan-title" className="banquet-hall-name">
                {banquetHalls[1].name}
              </h2>
              <p className="banquet-hall-tagline">{banquetHalls[1].tagline}</p>
              <div className="brass-rule-small" />
              <p className="banquet-hall-desc">{banquetHalls[1].description}</p>

              <div className="banquet-features-block">
                <h3 className="features-title">FACILITIES</h3>
                <ul className="banquet-features-list">
                  {banquetHalls[1].features.map((feat, i) => (
                    <li key={i} className="banquet-feature-item">
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

      {/* Event WhatsApp Enquiry Box */}
      <WhatsAppEnquiry variant="banquet" />
    </div>
  );
}
