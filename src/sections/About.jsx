
const keyFacts = [
  { label: "Property Rating", value: "Premium 3-Star Hotel" },
  { label: "Guest Rooms", value: "40 Contemporary Rooms" },
  { label: "Dining On-Site", value: "2 On-Site Restaurants" },
  { label: "Swimming Pool", value: "Rooftop + Kids Pool" },
  { label: "Connectivity", value: "Free Wi-Fi · 100+ Mbps" },
  { label: "Beach Proximity", value: "~5 km to Kasarkod Eco Beach" },
  { label: "River Proximity", value: "~2.8 km to Sharavathi River" },
  { label: "Guest Rating", value: "4.7 / 5 on Google" },
];

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
            <figcaption className="editorial-caption">
              <span>01 &mdash; NH-66 Arrival</span>
              <span>Near Ramateertha Cross, Honnavar</span>
            </figcaption>
          </figure>

          <div className="about-text-block" data-reveal>
            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>About Hotel Pumerai &bull; Honnavar</span>
            </div>
            <h2 id="about-heading" className="section-title">
              A place to arrive.
              <br />
              <span className="title-italic">A place to explore.</span>
            </h2>
            <div className="brass-rule-small" />

            {/* Geo-targeted Intro Paragraph */}
            <p className="lead-paragraph">
              Hotel Pumerai is a premium 3-star hotel on NH-66 near Ramateertha Cross in Honnavar,
              Uttara Kannada, Karnataka. Located just ~5 km from Kasarkod Eco Beach and ~2.8 km
              from the Sharavathi River, Pumerai offers a comfortable base for travellers exploring
              Honnavar, Murudeshwar, Bhatkal, and coastal Karnataka.
            </p>

            {/* Factual Highlights Grid */}
            <div className="about-facts-grid">
              {keyFacts.map((fact) => (
                <div className="fact-item" key={fact.label}>
                  <span className="fact-label">{fact.label}</span>
                  <strong className="fact-val">{fact.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
