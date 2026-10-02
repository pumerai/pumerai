export default function About() {
  return (
    <section className="section about-section" id="about" aria-labelledby="about-heading">
      <div className="section-container">
        <div className="about-content-wrapper">
          <figure className="editorial-figure about-figure" data-reveal>
            <div className="figure-inner">
              <img
                src="/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_23_21%20AM_result.webp"
                alt="Hotel Pumerai architectural entrance portico on NH-66 Honnavar Karnataka"
                loading="lazy"
              />
            </div>
          </figure>

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
            <p className="body-paragraph">
              Free high-speed Wi-Fi (100+ Mbps), covered parking with EV charging, and 24-hour front desk service are available throughout. Rated 4.7 / 5 on Google, the hotel sits 5 km from Kasarkod Eco Beach and 2.8 km from the Sharavathi River backwaters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
