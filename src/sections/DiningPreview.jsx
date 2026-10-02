export default function DiningPreview({ onNavigate }) {
  const handleExplore = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate({ route: "/dining" });
    } else {
      window.location.href = "/dining";
    }
  };

  return (
    <section className="section dining-preview-section" id="dining" aria-labelledby="dining-preview-heading">
      <div className="section-container">
        <header className="section-header-split" data-reveal>
          <div className="header-meta">
            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>DINING</span>
            </div>
            <h2 id="dining-preview-heading" className="section-title">
              Dining
            </h2>
          </div>
          <div className="header-summary-block">
            <p className="header-summary">
              Two restaurants, open daily.
            </p>
            <div className="preview-all-action">
              <a
                href="/dining"
                className="button-primary"
                onClick={handleExplore}
                aria-label="Explore coastal dining at Hotel Pumerai"
              >
                <span>EXPLORE DINING <span className="arrow-icon">&rarr;</span></span>
              </a>
            </div>
          </div>
        </header>
      </div>
    </section>
  );
}
