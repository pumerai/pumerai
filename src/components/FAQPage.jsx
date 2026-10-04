import FAQ from "../sections/FAQ.jsx";
import PageHeader from "./PageHeader.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";
import { routesMeta } from "../utils/seo.js";

export default function FAQPage({ onNavigate }) {
  const breadcrumbs = routesMeta["/faq"].breadcrumbs;

  const handleLinkClick = (e, route) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate({ route });
    }
  };

  return (
    <main className="page-shell faq-page-shell" id="main-content">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      <PageHeader
        eyebrow="HELP &amp; FAQS"
        title="Frequently Asked Questions |"
        italicTitle="Hotel Pumerai Honnavar"
        description="Direct factual answers about our rooms, rooftop pool, Matsya and Madhura restaurants, parking, EV charging, and Honnavar location."
        id="faq-page-heading"
      />

      <FAQ isStandalonePage={true} onNavigate={onNavigate} />

      {/* Contextual Hub for Users Needing Help */}
      <section className="section faq-context-section" aria-label="Explore hotel services">
        <div className="section-container" data-reveal>
          <div className="faq-context-card">
            <span className="editorial-tag">EXPLORE PUMERAI</span>
            <h2 className="context-card-title">Need More Information?</h2>
            <div className="brass-rule-small" />
            <p className="context-card-text">
              Our 24-hour front desk is always available to answer custom travel queries, assist with booking modifications, or guide your road trip through Honnavar.
            </p>
            <div className="context-card-actions">
              <a
                href="/rooms"
                className="button-secondary"
                onClick={(e) => handleLinkClick(e, "/rooms")}
              >
                VIEW ROOMS &amp; SUITES &rarr;
              </a>
              <a
                href="/location"
                className="button-secondary"
                onClick={(e) => handleLinkClick(e, "/location")}
              >
                LOCATION &amp; DIRECTIONS &rarr;
              </a>
              <a
                href="/contact"
                className="button-primary"
                onClick={(e) => handleLinkClick(e, "/contact")}
              >
                CONTACT 24-HOUR FRONT DESK
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
