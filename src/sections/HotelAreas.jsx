import { useState } from "react";

const hotelAreas = [
  {
    id: "lobby",
    number: "01",
    name: "Lobby",
    tagline: "Sunlit Grand Lounge & Teak Accents",
    description:
      "A double-height architectural welcome bathed in natural coastal daylight, featuring bespoke curved seating, handcrafted teak portals, and polished brass regional motifs.",
    image: "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_23_24%20AM_result.webp",
    alt: "Double-height sunlit grand lobby with curved sofas and warm wood finishes at Hotel Pumerai Honnavar",
    highlight: "Double-Height Ceiling • Artisanal Teak Lounges",
  },
  {
    id: "pool",
    number: "02",
    name: "Pool Area",
    tagline: "Glass-Edge Rooftop Leisure & Horizon Deck",
    description:
      "Perched above the Karavali coast, our rooftop swimming pool and adjoining children's splash zone offer refreshing breezes and panoramic vistas of palm canopies, open daily 6:30 AM – 7:00 PM.",
    image: "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_46%20AM_result.webp",
    alt: "Rooftop glass-edge swimming pool overlooking coconut groves at Hotel Pumerai",
    highlight: "Glass-Edge Design • Children's Splash Zone • 6:30 AM–7:00 PM",
  },
  {
    id: "reception",
    number: "03",
    name: "Reception",
    tagline: "24-Hour Desk & Curated Library Foyer",
    description:
      "Our dedicated 24-hour reception desk welcomes every traveller with swift check-in, Sharavathi boat cruise arrangements, coastal itinerary guidance, and an artisanal reading library.",
    image: "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_23_28%20AM_result.webp",
    alt: "Artisanal wooden library reception desk with brass Ganesha and seating at Hotel Pumerai",
    highlight: "24/7 Concierge • Travel Desk • Curated Reading Library",
  },
  {
    id: "facade",
    number: "04",
    name: "Facade",
    tagline: "Contemporary Silhouette along NH-66",
    description:
      "A striking boutique facade standing proudly along NH-66 near Ramateertha Cross. Features wide-lane private drive-in access, secured parking bays, and dedicated EV charging stations.",
    image: "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_23_21%20AM_result.webp",
    alt: "Prominent architectural facade and landscaped frontage of Hotel Pumerai along NH-66 Honnavar",
    highlight: "Highway Landmark • EV Charging • Secured Self-Parking",
  },
];

export default function HotelAreas() {
  const [activeAreaIndex, setActiveAreaIndex] = useState(0);
  const activeArea = hotelAreas[activeAreaIndex];

  return (
    <section className="section hotel-areas-section" id="areas" aria-labelledby="hotel-areas-title">
      <div className="section-container">
        <header className="section-header-split" data-reveal>
          <div className="header-meta">
            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>Property Tour • Curated Spaces</span>
            </div>
            <h2 id="hotel-areas-title" className="section-title">
              Areas of HOTEL <br />
              <span className="title-italic">&amp; architectural spaces.</span>
            </h2>
          </div>
          <p className="header-summary">
            Discover the thoughtfully planned physical experience of Hotel Pumerai, from sun-drenched arrival lounges to the coastal rooftop pool deck.
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
                  onClick={() => setActiveAreaIndex(index)}
                  onMouseEnter={() => setActiveAreaIndex(index)}
                >
                  <span className="area-item-num">{area.number}</span>
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
                className="area-stage-image"
              />
              <div className="area-stage-overlay">
                <span className="area-stage-badge">{activeArea.highlight}</span>
              </div>
            </div>

            <div className="area-stage-copy">
              <div className="area-stage-header">
                <span className="area-stage-index">{activeArea.number} / 04</span>
                <h4 className="area-stage-title">{activeArea.name}</h4>
              </div>
              <p className="area-stage-desc">{activeArea.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
