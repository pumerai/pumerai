import AroundHonnavar from "../components/AroundHonnavar.jsx";

/**
 * InAndAround — Home page "Around Honnavar" section.
 * Uses the shared AroundHonnavar interactive map + panel component.
 */
export default function InAndAround() {
  return (
    <section
      className="section around-honnavar-section"
      id="around-honnavar"
      aria-labelledby="around-honnavar-heading"
    >
      <div className="section-container">
        <header className="section-header-split" data-reveal>
          <div className="header-meta">
            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>IN &amp; AROUND</span>
            </div>
            <h2 id="around-honnavar-heading" className="section-title">
              Around <span className="title-italic">Honnavar</span>
            </h2>
          </div>
          <div className="header-summary-block">
            <p className="header-summary">
              Beaches, temples, backwaters and hill towns within driving distance.
            </p>
          </div>
        </header>

        <div data-reveal>
          <AroundHonnavar />
        </div>
      </div>
    </section>
  );
}
