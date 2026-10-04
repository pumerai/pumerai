import PageHeader from "./PageHeader.jsx";

export default function NotFoundPage({ onNavigate }) {
  const handleNav = (e, route) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate({ route });
    }
  };

  return (
    <main className="page-shell not-found-page-shell">
      <PageHeader
        eyebrow="ERROR 404"
        title="Page Not"
        italicTitle="Found"
        description="The page you are looking for does not exist, has been removed, or the link is broken."
        id="not-found-heading"
      />

      <section className="section not-found-section" aria-labelledby="not-found-heading">
        <div className="section-container">
          <div className="not-found-card">
            <p className="not-found-lead">
              We could not find the page you requested on Hotel Pumerai. Please explore our primary pages below:
            </p>

            <div className="not-found-links">
              <a href="/" className="button-primary" onClick={(e) => handleNav(e, "/")}>
                Return to Home
              </a>
              <a href="/rooms" className="button-secondary" onClick={(e) => handleNav(e, "/rooms")}>
                View Rooms in Honnavar
              </a>
              <a href="/contact" className="button-secondary" onClick={(e) => handleNav(e, "/contact")}>
                Contact Front Desk
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
