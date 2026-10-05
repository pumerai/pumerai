export default function About() {
  return (
    <section className="section about-section" id="about" aria-labelledby="about-heading">
      <div className="section-container">
        <div className="about-editorial-wrapper">

          {/* Left column — text */}
          <div className="about-text-block" data-reveal>
            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>ABOUT</span>
            </div>
            <h2 id="about-heading" className="section-title">
              A place to arrive <br />
              <span className="title-italic">&amp; explore.</span>
            </h2>
            <div className="brass-rule-small" />
            <p className="lead-paragraph">
              Hotel Pumerai is a 3-star hotel on NH-66, Honnavar, with 40 air-conditioned rooms, two on-site restaurants, a rooftop pool and a children's splash zone.
            </p>
          </div>

          {/* Right column — editorial layered image composition */}
          <div className="about-image-composition" data-reveal>
            {/* Large primary image */}
            <div className="about-primary-frame">
              <img
                src="/gallery/hotel-highway-facade.webp"
                alt="Hotel Pumerai architectural entrance on NH-66, Honnavar, Karnataka"
                width="1024"
                height="682"
                loading="lazy"
                className="about-primary-img reveal-drop reveal-delay-0"
              />
            </div>

            {/* Overlapping secondary image — bottom-right corner */}
            <div className="about-secondary-frame">
              <img
                src="/gallery/rooftop-pool-vista.webp"
                alt="Rooftop glass-edge pool at Hotel Pumerai overlooking coastal canopies"
                width="1024"
                height="682"
                loading="lazy"
                className="about-secondary-img reveal-drop reveal-delay-1"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
