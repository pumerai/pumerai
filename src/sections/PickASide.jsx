import { useState } from "react";

const sideMoments = [
  {
    id: "beach",
    number: "01",
    label: "BEACHSIDE",
    name: "Kasarkod Eco Beach",
    badge: "~5 km • Blue Flag Certified",
    description:
      "Stroll along golden sands and casuarina promenades. Certified with the prestigious international Blue Flag for clean waters, eco-amenities, and pristine coastal calm.",
    image: "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_42%20AM_result.webp",
    alt: "Kasarkod Eco Beach and coastal walkway near Hotel Pumerai Honnavar",
    cta: "Explore Beach Route",
    ctaLink: "https://maps.app.goo.gl/rCfTnw9t8Dp58mga7",
  },
  {
    id: "pool",
    number: "02",
    label: "POOLSIDE",
    name: "Rooftop Swimming Pool",
    badge: "Rooftop Deck • 6:30 AM – 7:00 PM",
    description:
      "Perched high above the coastal highway, our glass-edge swimming pool and adjoining children's splash pool offer refreshing dips with panoramic Western Ghats horizons.",
    image: "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_46%20AM_result.webp",
    alt: "Glass-edge rooftop pool overlooking coconut groves at Hotel Pumerai Honnavar",
    cta: "Rooftop Amenities",
    ctaLink: "#amenities",
  },
  {
    id: "river",
    number: "03",
    label: "RIVERSIDE",
    name: "Sharavathi River Boating",
    badge: "~2.8 km • Mangrove Backwaters",
    description:
      "Glide through serene mangrove trails, witness historic railway bridges across the estuary, and experience unhurried sunset boat cruises arranged directly by our front desk.",
    image: "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_15%20AM_result.webp",
    alt: "Sharavathi River backwaters and mangrove boat rides in Honnavar",
    cta: "Boat Cruise Assistance",
    ctaLink: "tel:+919845423223",
  },
  {
    id: "hotel",
    number: "04",
    label: "HOTELSIDE",
    name: "Hotel Pumerai Retreat",
    badge: "NH-66 Honnavar • 40 Rooms",
    description:
      "Return from your coastal explorations to calm, air-conditioned rooms, regional seafood at Matsya, vegetarian dining at Madhura, and secured parking with EV charging.",
    image: "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_23_21%20AM_result.webp",
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
            <span>THE COASTAL RHYTHM &bull; EXPERIENCES</span>
          </div>

          <h2 id="pick-a-side-title" className="pick-a-side-display-title">
            <span className="pas-line">Beachside, Poolside, Riverside,</span>
            <span className="pas-line pas-accent">
              <span className="title-italic">Pick a Side.</span>
            </span>
          </h2>

          <p className="pick-a-side-lead">
            Whether you crave the sound of ocean surf, the tranquility of a rooftop swim, or the winding currents
            of the Sharavathi River, Hotel Pumerai brings Karnataka&apos;s coastal magic together in one serene stay.
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
                    loading="lazy"
                    className="pas-image"
                  />
                  <div className="pas-image-gradient" />
                  
                  {/* Floating Number Tag */}
                  <div className="pas-floating-tag">
                    <span className="pas-tag-num">{item.number}</span>
                    <span className="pas-tag-sep">/</span>
                    <span className="pas-tag-label">{item.label}</span>
                  </div>

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
