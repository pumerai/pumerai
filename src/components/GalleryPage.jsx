import GallerySection from "../sections/GallerySection.jsx";
import PageHeader from "./PageHeader.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";
import { routesMeta } from "../utils/seo.js";

export default function GalleryPage({ onNavigate }) {
  const breadcrumbs = routesMeta["/gallery"].breadcrumbs;

  const handleLinkClick = (e, route) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate({ route });
    }
  };

  return (
    <main className="page-shell gallery-page-shell" id="main-content">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      <PageHeader
        eyebrow="VISUAL TOUR"
        title="Photo Gallery |"
        italicTitle="Hotel Pumerai Honnavar"
        description="Experience the contemporary architecture, boutique rooms, rooftop pool, and coastal dining at Hotel Pumerai on NH-66."
        id="gallery-page-heading"
      />

      <section className="gallery-editorial-intro" aria-label="Hotel overview and visual details">
        <div className="section-container">
          <div className="gallery-intro-card" data-reveal>
            <h2 className="gallery-intro-title">
              Discover Our Coastal Sanctuary in Honnavar
            </h2>
            <div className="brass-rule-small" />
            <p className="gallery-intro-text">
              Welcome to the official photo gallery of Hotel Pumerai. Located along National Highway 66 (NH-66) near Ramateertha Cross in Honnavar, our boutique property combines coastal tranquility with modern hospitality. Explore authentic photographs of our 40 air-conditioned guest rooms and suites, shimmering rooftop swimming pool with coastal vistas, Matsya and Madhura dining spaces, two fully equipped banquet halls, and sunlit grand lobby.
            </p>
          </div>
        </div>
      </section>

      <GallerySection isStandalonePage={true} onNavigate={onNavigate} />

      {/* Contextual Hub for Users & Search Crawlers */}
      <section className="section gallery-context-hub" aria-label="Explore Hotel Pumerai services">
        <div className="section-container" data-reveal>
          <div className="gallery-context-box">
            <h2 className="gallery-context-title">Explore Hotel Pumerai Facilities</h2>
            <div className="brass-rule-small" />
            <p className="gallery-context-desc">
              Discover everything our Honnavar hotel offers for weekend getaways, family holidays, business stays, and highway road trips.
            </p>
            <div className="gallery-hub-grid">
              <a
                href="/rooms"
                className="gallery-hub-card"
                onClick={(e) => handleLinkClick(e, "/rooms")}
              >
                <span className="hub-tag">ACCOMMODATION</span>
                <h3 className="hub-title">Rooms &amp; Suites</h3>
                <p className="hub-text">
                  40 contemporary rooms including Club Rooms with balconies, Deluxe, and Family Suites.
                </p>
                <span className="hub-link-label">View Rooms &rarr;</span>
              </a>

              <a
                href="/dining"
                className="gallery-hub-card"
                onClick={(e) => handleLinkClick(e, "/dining")}
              >
                <span className="hub-tag">CUISINE</span>
                <h3 className="hub-title">Matsya &amp; Madhura Dining</h3>
                <p className="hub-text">
                  Fresh coastal Karavali seafood at Matsya and pure vegetarian South Indian meals at Madhura.
                </p>
                <span className="hub-link-label">Explore Dining &rarr;</span>
              </a>

              <a
                href="/banquet"
                className="gallery-hub-card"
                onClick={(e) => handleLinkClick(e, "/banquet")}
              >
                <span className="hub-tag">EVENTS</span>
                <h3 className="hub-title">Banquet Halls</h3>
                <p className="hub-text">
                  Sidhvin Hall for 200 guests and Milan Hall for 50 guests for weddings and conferences.
                </p>
                <span className="hub-link-label">View Banquet Halls &rarr;</span>
              </a>

              <a
                href="/location"
                className="gallery-hub-card"
                onClick={(e) => handleLinkClick(e, "/location")}
              >
                <span className="hub-tag">CONNECTIVITY</span>
                <h3 className="hub-title">Location &amp; Sightseeing</h3>
                <p className="hub-text">
                  Located on NH-66 near Ramateertha Cross, 5 km from Kasarkod Beach and 2.8 km from Sharavathi River.
                </p>
                <span className="hub-link-label">Getting Here &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
