import { useState } from "react";

const hotelAreas = [
  {
    id: "lobby",
    number: "01",
    name: "Lobby",
    tagline: "Sunlit Grand Lounge & Teak Accents",
    description:
      "Double-height arrival lounge with natural daylight, curved seating and handcrafted teak portals.",
    image: "/gallery/sunlit-grand-lobby.webp",
    alt: "Double-height sunlit grand lobby with curved sofas and warm wood finishes at Hotel Pumerai Honnavar",
  },
  {
    id: "pool",
    number: "02",
    name: "Pool Area",
    tagline: "Glass-Edge Pool & Splash Area",
    description:
      "Glass-edge rooftop pool open 6:30 AM to 7:00 PM, with a children's splash area.",
    image: "/gallery/rooftop-pool-facade.webp",
    alt: "Glass-edge rooftop swimming pool deck and children splash zone at Hotel Pumerai",
  },
  {
    id: "restaurants",
    number: "03",
    name: "Restaurants",
    tagline: "Matsya & Madhura",
    description:
      "Matsya for coastal seafood and Madhura for pure vegetarian South Indian.",
    image: "/dining/_DSC0222_result.webp",
    alt: "Matsya multicuisine dining hall at Hotel Pumerai Honnavar",
  },
  {
    id: "banquet",
    number: "04",
    name: "Banquet",
    tagline: "Sidhvin & Milan Halls",
    description:
      "Two air-conditioned halls for up to 200 and 50 guests.",
    image: "/banquet/sidhvin-hall-main.webp",
    alt: "Sidhvin banquet hall with ceremonial stage and chandelier lighting at Hotel Pumerai",
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
            Lobby, pool, restaurants and banquet halls.
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
