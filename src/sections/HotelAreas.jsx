import { useState } from "react";

const hotelAreas = [
  {
    id: "lobby",
    number: "01",
    name: "Lobby",
    tagline: "Sunlit Grand Lounge & Teak Accents",
    description:
      "Double-height arrival lounge with natural daylight, curved seating and handcrafted teak portals.",
    image: "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_23_24%20AM_result.webp",
    alt: "Double-height sunlit grand lobby with curved sofas and warm wood finishes at Hotel Pumerai Honnavar",
    highlight: "Double-Height Ceiling, Artisanal Teak Lounge",
  },
  {
    id: "terrace",
    number: "02",
    name: "Arrival Portico",
    tagline: "Landscaped Entrance & Covered Drive",
    description:
      "Covered drop-off with landscaped approach and dedicated parking along NH-66.",
    image: "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_23_27%20AM_result.webp",
    alt: "Landscaped arrival portico and covered driveway at Hotel Pumerai Honnavar",
    highlight: "Covered Portico, Landscaped Forecourt, NH-66 Frontage",
  },
  {
    id: "reception",
    number: "03",
    name: "Reception",
    tagline: "24-Hour Desk & Reading Foyer",
    description:
      "Round-the-clock reception desk for check-in, local boat tours and travel guidance.",
    image: "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_23_28%20AM_result.webp",
    alt: "Artisanal wooden library reception desk with brass Ganesha and seating at Hotel Pumerai",
    highlight: "24/7 Desk, Travel Assistance, Reading Library",
  },
  {
    id: "facade",
    number: "04",
    name: "Facade",
    tagline: "Contemporary Silhouette along NH-66",
    description:
      "Highway entrance on NH-66 with private parking and dedicated EV charging stations.",
    image: "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_23_21%20AM_result.webp",
    alt: "Prominent architectural facade and landscaped frontage of Hotel Pumerai along NH-66 Honnavar",
    highlight: "NH-66 Landmark, EV Charging, Covered Parking",
  },
];

export default function HotelAreas() {
  const [activeAreaIndex, setActiveAreaIndex] = useState(0);
  const [isCrossfading, setIsCrossfading] = useState(false);
  const activeArea = hotelAreas[activeAreaIndex];

  const handleSelectArea = (index) => {
    if (index === activeAreaIndex) return;
    setIsCrossfading(true);
    setActiveAreaIndex(index);
    setTimeout(() => {
      setIsCrossfading(false);
    }, 300);
  };

  return (
    <section className="section hotel-areas-section" id="areas" aria-labelledby="hotel-areas-title">
      <div className="section-container">
        <header className="section-header-split" data-reveal>
          <div className="header-meta">
            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>SPACES</span>
            </div>
            <h2 id="hotel-areas-title" className="section-title">
              Spaces at <br />
              <span className="title-italic">Hotel Pumerai</span>
            </h2>
          </div>
          <p className="header-summary">
            Lobby, pool, reception and facade.
          </p>
        </header>

        {/* Interactive Areas Showcase Layout matching HP.pdf item 9 reference */}
        <div className="hotel-areas-showcase" data-reveal>
          {/* Areas Selection Column / Tabs */}
          <div className="areas-nav-list" role="tablist" aria-label="Hotel Pumerai Areas">
            {hotelAreas.map((area, index) => {
              const isActive = index === activeAreaIndex;
              return (
                <button
                  key={area.id}
                  type="button"
                  role="tab"
                  id={`area-tab-${area.id}`}
                  aria-selected={isActive}
                  aria-controls={`area-panel-${area.id}`}
                  className={`area-nav-item ${isActive ? "is-active" : ""}`}
                  onClick={() => handleSelectArea(index)}
                  onMouseEnter={() => handleSelectArea(index)}
                >
                  <div className="area-item-info">
                    <h3 className="area-item-name">{area.name}</h3>
                    <p className="area-item-tagline">{area.tagline}</p>
                  </div>
                  <span className="area-arrow-indicator" aria-hidden="true">&rarr;</span>
                </button>
              );
            })}
          </div>

          {/* Area Image & Details Stage */}
          <div
            className="area-visual-stage"
            id={`area-panel-${activeArea.id}`}
            role="tabpanel"
            aria-labelledby={`area-tab-${activeArea.id}`}
          >
            <div className="area-image-frame">
              <img
                key={activeArea.id}
                src={activeArea.image}
                alt={activeArea.alt}
                loading="lazy"
                className={`area-stage-image reveal-drop reveal-delay-0 ${isCrossfading ? "is-crossfading" : ""}`}
              />
            </div>

            <div className="area-stage-copy">
              <h4 className="area-stage-title">{activeArea.name}</h4>
              <p className="area-stage-desc">{activeArea.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
