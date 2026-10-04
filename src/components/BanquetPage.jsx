import Banquet from "../sections/Banquet.jsx";
import PageHeader from "./PageHeader.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";
import { routesMeta } from "../utils/seo.js";

export default function BanquetPage({ onNavigate }) {
  const breadcrumbs = routesMeta["/banquet"].breadcrumbs;

  const handleLinkClick = (e, route) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate({ route });
    }
  };

  return (
    <main className="page-shell banquet-page-shell" id="main-content">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      <PageHeader
        eyebrow="EVENTS &amp; CELEBRATIONS"
        title="Banquet Halls in Honnavar |"
        italicTitle="Sidhvin &amp; Milan"
        description="Two fully equipped air-conditioned venues on NH-66 for weddings, receptions, conferences, and family celebrations."
        id="banquet-page-heading"
      />

      <Banquet onNavigate={onNavigate} />

      {/* Contextual Hub for Event Planning & Accommodation */}
      <section className="section banquet-context-section" aria-label="Event guest accommodation and catering">
        <div className="section-container" data-reveal>
          <div className="banquet-context-card">
            <span className="editorial-tag">EVENT HOSPITALITY</span>
            <h2 className="context-card-title">Guest Accommodation &amp; Event Catering</h2>
            <div className="brass-rule-small" />
            <p className="context-card-text">
              Hosting an out-of-town wedding, anniversary, or corporate retreat in Honnavar? Hotel Pumerai provides 40 air-conditioned guest rooms and suites, ample covered parking, and complete in-house catering by Matsya and Madhura restaurants.
            </p>
            <div className="context-card-actions">
              <a
                href="/rooms"
                className="button-secondary"
                onClick={(e) => handleLinkClick(e, "/rooms")}
              >
                GUEST ROOMS &amp; SUITES &rarr;
              </a>
              <a
                href="/dining"
                className="button-secondary"
                onClick={(e) => handleLinkClick(e, "/dining")}
              >
                EVENT CATERING &amp; DINING &rarr;
              </a>
              <a
                href="/contact"
                className="button-primary"
                onClick={(e) => handleLinkClick(e, "/contact")}
              >
                RESERVE BANQUET HALL
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
