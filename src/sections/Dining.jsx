import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { venuesData } from "../data/dining.js";

const MenuOverlay = lazy(() => import("./MenuOverlay.jsx"));

export default function Dining({ sectionId = "dining", headingId = "dining-heading", isStandalonePage = false, onNavigate }) {
  const [activeMenuKey, setActiveMenuKey] = useState(null);
  const [selections, setSelections] = useState({ veg: {}, nonveg: {} });
  const triggerBtnRefs = useRef({});
  const restaurantVenues = venuesData;

  // Check URL query param on mount and listen to navigation/custom events (?menu=veg or ?menu=nonveg)
  useEffect(() => {
    const checkQuery = () => {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const menuParam = params.get("menu");
        if (menuParam === "veg" || menuParam === "nonveg") {
          setActiveMenuKey(menuParam);
        }
      }
    };

    checkQuery();
    window.addEventListener("popstate", checkQuery);

    const handleCustomOpen = (e) => {
      if (e.detail?.menu) {
        setActiveMenuKey(e.detail.menu);
      }
    };
    window.addEventListener("pumerai:open-menu", handleCustomOpen);

    return () => {
      window.removeEventListener("popstate", checkQuery);
      window.removeEventListener("pumerai:open-menu", handleCustomOpen);
    };
  }, []);

  const handleOpenMenu = (menuKey) => {
    setActiveMenuKey(menuKey);
  };

  const handleCloseMenu = () => {
    setActiveMenuKey(null);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (url.searchParams.has("menu")) {
        url.searchParams.delete("menu");
        window.history.replaceState({}, "", url.pathname + (url.hash || ""));
      }
    }
  };

  const handleUpdateQty = (menuKey, dishId, qty) => {
    setSelections((prev) => {
      const current = { ...(prev[menuKey] || {}) };
      if (qty <= 0) {
        delete current[dishId];
      } else {
        current[dishId] = qty;
      }
      return { ...prev, [menuKey]: current };
    });
  };

  const handleClearSelection = (menuKey) => {
    setSelections((prev) => ({ ...prev, [menuKey]: {} }));
  };

  return (
    <section className="section dining-section" id={sectionId} aria-labelledby={headingId}>
      <div className="section-container">
        {/* Section Header (homepage only; standalone dining page uses its own single hero intro) */}
        {!isStandalonePage && (
          <header className="section-header-split" data-reveal>
            <div className="header-meta">
              <div className="editorial-tag">
                <span className="accent-pip" />
                <span>DINING</span>
              </div>
              <h2 id={headingId} className="section-title">
                Dining
              </h2>
            </div>
            <p className="header-summary">
              Two restaurants, open daily.
            </p>
          </header>
        )}

        {/* Venues Grid */}
        <div className="dining-venues-grid">
          {restaurantVenues.map((venue, idx) => {
            const menuKey = venue.id === "madhura" ? "veg" : "nonveg";

            return (
              <article className="venue-card" id={venue.id} key={venue.id} data-reveal>
                <div className="venue-media-container">
                  <figure className="venue-figure">
                    <img
                      src={venue.image}
                      alt={venue.alt}
                      width="1280"
                      height="853"
                      loading="lazy"
                      className={`venue-image reveal-drop reveal-delay-${idx % 4}`}
                    />
                  </figure>
                  <div className="venue-hours-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>{venue.hours} &middot; {venue.mealTimes}</span>
                  </div>
                </div>

                <div className="venue-details-body">
                  <div className="venue-header-row">
                    <h2 className="venue-title">{venue.name}</h2>
                  </div>

                  {venue.cuisines && (
                    <div className="venue-cuisines-row" aria-label="Available cuisines">
                      {venue.cuisines.map((cuisine) => (
                        <span className="cuisine-badge" key={cuisine}>
                          {cuisine}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="venue-desc">{venue.description}</p>

                  <div className="signature-dishes-block">
                    <span className="dishes-heading">SIGNATURE DISHES</span>
                    <div className="dishes-list">
                      {venue.signatureDishes.map((dish) => (
                        <div className="dish-item" key={dish.name}>
                          <div className="dish-name-row">
                            <strong className="dish-title">{dish.name}</strong>
                            {dish.note && <span className="dish-note-text"> &ndash; {dish.note}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="venue-cta-row">
                    <button
                      type="button"
                      className="button-primary menu-view-btn"
                      ref={(el) => {
                        triggerBtnRefs.current[menuKey] = { current: el };
                      }}
                      onClick={() => handleOpenMenu(menuKey)}
                      aria-label={`View Menu for ${venue.name}`}
                    >
                      <span>VIEW MENU</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>

                    <a
                      href="tel:+919845423223"
                      className="button-secondary table-reserve-btn"
                      aria-label={`Reserve table at ${venue.name}`}
                    >
                      RESERVE A TABLE
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Lazy-Loaded Full Menu Overlay */}
      <Suspense fallback={null}>
        {activeMenuKey && (
          <MenuOverlay
            isOpen={!!activeMenuKey}
            menuKey={activeMenuKey}
            onClose={handleCloseMenu}
            selections={selections}
            onUpdateQty={handleUpdateQty}
            onClearSelection={handleClearSelection}
            triggerButtonRef={triggerBtnRefs.current[activeMenuKey]}
          />
        )}
      </Suspense>
    </section>
  );
}
