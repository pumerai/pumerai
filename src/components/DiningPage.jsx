import Dining from "../sections/Dining.jsx";
import PageHeader from "./PageHeader.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";
import { routesMeta } from "../utils/seo.js";

export default function DiningPage({ onNavigate }) {
  const breadcrumbs = routesMeta["/dining"].breadcrumbs;

  const handleLinkClick = (e, route) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate({ route });
    }
  };

  return (
    <main className="page-shell dining-page-shell" id="main-content">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      <PageHeader
        eyebrow="RESTAURANTS &amp; CUISINE"
        title="Restaurants in Honnavar |"
        italicTitle="Matsya &amp; Madhura"
        description="Fresh coastal Karavali seafood, multi-cuisine specialties, and 100% pure vegetarian South Indian dining open daily on NH-66."
        id="dining-page-heading"
      />

      <Dining isStandalonePage={true} onNavigate={onNavigate} />

      {/* Contextual Hub for Diners & Highway Travelers */}
      <section className="section dining-context-section" aria-label="Highway dining and hotel stay information">
        <div className="section-container" data-reveal>
          <div className="dining-context-card">
            <span className="editorial-tag">HIGHWAY DINING &amp; STAYS</span>
            <h2 className="context-card-title">Convenient NH-66 Stopover for Travelers</h2>
            <div className="brass-rule-small" />
            <p className="context-card-text">
              Both Matsya and Madhura restaurants offer dedicated highway parking, clean restrooms, air conditioning, and fast service for road travelers driving between Goa, Gokarna, Murudeshwar, Udupi, and Mangalore along NH-66.
            </p>
            <div className="context-card-actions">
              <a
                href="/rooms"
                className="button-secondary"
                onClick={(e) => handleLinkClick(e, "/rooms")}
              >
                STAY OVERNIGHT &rarr;
              </a>
              <a
                href="/location"
                className="button-secondary"
                onClick={(e) => handleLinkClick(e, "/location")}
              >
                DRIVING DIRECTIONS (NH-66) &rarr;
              </a>
              <a
                href="/contact"
                className="button-primary"
                onClick={(e) => handleLinkClick(e, "/contact")}
              >
                TABLE RESERVATIONS
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
