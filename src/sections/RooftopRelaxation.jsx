export default function RooftopRelaxation({ onNavigate }) {
  const handleExplore = (e) => {
    e.preventDefault();
    const target = document.getElementById("amenities");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="section rooftop-relaxation-section" id="relaxation" aria-labelledby="relaxation-title">
      <div className="section-container">
        {/* Editorial Section Header */}
        <header className="rooftop-header" data-reveal>
          <div className="editorial-tag">
            <span className="accent-pip" />
            <span>RELAXATION</span>
          </div>

          <h2 id="relaxation-title" className="rooftop-title">
            Rooftop Pool <br />
            <span className="title-italic">&amp; Views.</span>
          </h2>

          <p className="rooftop-lead">
            Slow down, enjoy the water and take in the calm surroundings of Hotel Pumerai.
          </p>
        </header>

        {/* Dominant Immersive Image Frame */}
        <div className="rooftop-stage-wrap" data-reveal>
          <div className="rooftop-image-frame">
            <img
              src="/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_46%20AM_result.webp"
              alt="Glass-edge rooftop swimming pool overlooking palm canopies and the Karavali coast at Hotel Pumerai Honnavar"
              loading="lazy"
              className="rooftop-hero-img"
            />
            <div className="rooftop-image-overlay" />

            {/* Architectural Badges on Image */}
            <div className="rooftop-badge-pill">
              <span className="rooftop-badge-dot" />
              <span>GLASS-EDGE POOL, 6:30 AM &ndash; 7:00 PM</span>
            </div>

            <div className="rooftop-location-pill">
              <span>HOTEL PUMERAI, NH-66 HONNAVAR</span>
            </div>
          </div>

          {/* Editorial Specs Bar below the dominant visual */}
          <div className="rooftop-specs-row">
            <div className="rooftop-spec-item">
              <span className="spec-label">Daily Pool Hours</span>
              <strong className="spec-val">6:30 AM &ndash; 7:00 PM</strong>
              <p className="spec-sub">Morning lap swims and golden-hour sunset relaxation</p>
            </div>

            <div className="rooftop-spec-divider" aria-hidden="true" />

            <div className="rooftop-spec-item">
              <span className="spec-label">Children&apos;s Splash Pool</span>
              <strong className="spec-val">Dedicated Shallow Zone</strong>
              <p className="spec-sub">Safe, adjoining splash area for younger family swimmers</p>
            </div>

            <div className="rooftop-spec-divider" aria-hidden="true" />

            <div className="rooftop-spec-item">
              <span className="spec-label">Surrounding Panoramas</span>
              <strong className="spec-val">Western Ghats Horizon</strong>
              <p className="spec-sub">Unobstructed coastal canopy vistas and evening sea breezes</p>
            </div>

            <div className="rooftop-spec-action">
              <a
                href="#amenities"
                onClick={handleExplore}
                className="button-primary rooftop-btn"
                aria-label="Explore all hotel amenities"
              >
                <span>EXPLORE AMENITIES</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
