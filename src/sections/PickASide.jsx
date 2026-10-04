import { useState } from "react";

const sideMoments = [
  {
    id: "beach",
    number: "01",
    label: "BEACHSIDE",
    name: "Kasarkod Eco Beach",
    badge: "5 km, Blue Flag Certified",
    description:
      "Clean Blue Flag beach with golden sand and calm waters 5 km away.",
    image: "/images/features/kasarkod-eco-beach.webp",
    alt: "Kasarkod Eco Beach golden sandy shoreline and coastal casuarina landscape near Honnavar",
    objectPosition: "center center",
    cta: "Explore Beach Route",
    ctaLink: "https://maps.app.goo.gl/rCfTnw9t8Dp58mga7",
  },
  {
    id: "pool",
    number: "02",
    label: "POOLSIDE",
    name: "Rooftop Swimming Pool",
    badge: "Rooftop Deck, 6:30 AM – 7:00 PM",
    description:
      "Glass-edge rooftop pool and shallow children's splash area overlooking coastal canopies.",
    image: "/gallery/rooftop-pool-vista.webp",
    alt: "Glass-edge rooftop pool overlooking coconut groves at Hotel Pumerai Honnavar",
    cta: "Rooftop Amenities",
    ctaLink: "#amenities",
  },
  {
    id: "river",
    number: "03",
    label: "RIVERSIDE",
    name: "Sharavathi River Boating",
    badge: "2.8 km, Mangrove Backwaters",
    description:
      "Mangrove trails and sunset estuary cruises arranged directly through our front desk.",
    image: "/images/features/sharavathi-backwater.webp",
    alt: "Honnavar Sharavathi backwaters with mangrove forest and boat on Badagani River",
    objectPosition: "center center",
    cta: "Boat Cruise Assistance",
    ctaLink: "tel:+919845423223",
  },
  {
    id: "hotel",
    number: "04",
    label: "HOTELSIDE",
    name: "Hotel Pumerai",
    badge: "NH-66 Honnavar, 40 Rooms",
    description:
      "Air-conditioned rooms, two on-site restaurants, and secure parking with EV charging.",
    image: "/gallery/hotel-highway-facade.webp",
    alt: "Contemporary exterior facade of Hotel Pumerai on NH-66 Honnavar",
    cta: "View Guest Rooms",
    ctaLink: "/rooms",
  },
];

export default function PickASide({ onNavigate }) {
  const [activeSideIndex, setActiveSideIndex] = useState(0);

  const handleCta = (e, item) => {
    if (item.ctaLink.startsWith("/")) {
      e.preventDefault();
      if (onNavigate) {
        onNavigate({ route: item.ctaLink });
      }
    } else if (item.ctaLink.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(item.ctaLink);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <section className="section pick-a-side-section" id="pick-a-side" aria-labelledby="pick-a-side-title">
      <div className="section-container">
        {/* Editorial Headline Header */}
        <header className="pick-a-side-header" data-reveal>
          <div className="editorial-tag">
            <span className="accent-pip" />
            <span>EXPERIENCES</span>
          </div>

          <h2 id="pick-a-side-title" className="pick-a-side-display-title">
            Beach, River and Pool
          </h2>

          <p className="pick-a-side-lead">
            Explore Honnavar beaches, backwaters and rooftop pool relaxation from Hotel Pumerai.
          </p>
        </header>

        {/* Major Visual Storytelling Composition */}
        <div className="pick-a-side-composition" data-reveal>
          {sideMoments.map((item, index) => {
            const isActive = index === activeSideIndex;
            return (
              <article
                key={item.id}
                className={`pick-a-side-card ${isActive ? "is-selected" : ""}`}
                onMouseEnter={() => setActiveSideIndex(index)}
                onClick={() => setActiveSideIndex(index)}
                tabIndex={0}
                role="region"
                aria-label={item.name}
              >
                {/* Large Fixed Image Frame with Subtle Scale Effect */}
                <div className="pas-image-frame">
                  <img
                    src={item.image}
                    alt={item.alt}
                    width="800"
                    height="533"
                    loading="lazy"
                    className={`pas-image reveal-drop reveal-delay-${index % 4}`}
                    style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
                  />
                  <div className="pas-image-gradient" />
                  
                  {/* Badge */}
                  <div className="pas-badge">
                    <span>{item.badge}</span>
                  </div>
                </div>

                {/* Editorial Content Below / Inside Frame */}
                <div className="pas-card-body">
                  <span className="pas-kicker">{item.label}</span>
                  <h3 className="pas-card-title">{item.name}</h3>
                  <p className="pas-card-desc">{item.description}</p>
                  
                  <div className="pas-action-row">
                    <a
                      href={item.ctaLink}
                      onClick={(e) => handleCta(e, item)}
                      className="pas-card-link"
                      target={item.ctaLink.startsWith("http") ? "_blank" : undefined}
                      rel={item.ctaLink.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      <span>{item.cta}</span>
                      <span className="pas-link-arrow" aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
