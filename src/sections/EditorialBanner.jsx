export default function EditorialBanner({
  id,
  variant = "visual-right", // "visual-right" | "visual-left"
  eyebrow,
  titlePrimary,
  titleItalic,
  copy,
  perks = [],
  ctaText,
  ctaAction,
  ctaHref,
  imageSrc,
  imageAlt,
  imageBadge,
}) {
  const isLeft = variant === "visual-left";

  const handleCtaClick = (e) => {
    if (ctaAction) {
      e.preventDefault();
      ctaAction();
    }
  };

  return (
    <section className={`section editorial-banner-section ${isLeft ? "banner-visual-left" : "banner-visual-right"}`} id={id}>
      <div className="section-container">
        <div className="editorial-banner-grid" data-reveal>
          {/* Visual Column */}
          <div className="editorial-banner-visual">
            <div className="editorial-banner-frame">
              <img
                src={imageSrc}
                alt={imageAlt}
                loading="lazy"
                className="editorial-banner-img"
              />
              {imageBadge && (
                <div className="editorial-banner-badge">
                  <span>{imageBadge}</span>
                </div>
              )}
            </div>
          </div>

          {/* Copy Column */}
          <div className="editorial-banner-content">
            {eyebrow && (
              <div className="editorial-tag">
                <span className="accent-pip" />
                <span>{eyebrow}</span>
              </div>
            )}

            <h2 className="editorial-banner-heading">
              {titlePrimary}
              {titleItalic && (
                <>
                  <br />
                  <span className="title-italic">{titleItalic}</span>
                </>
              )}
            </h2>

            <div className="brass-rule-small" />

            <p className="editorial-banner-copy">{copy}</p>

            {perks.length > 0 && (
              <ul className="editorial-banner-perks" aria-label="Highlights">
                {perks.map((perk, i) => (
                  <li key={i} className="editorial-perk-item">
                    <span className="perk-bullet">&#x2713;</span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            )}

            {ctaText && (
              <div className="editorial-banner-action">
                <a
                  href={ctaHref || "#"}
                  onClick={handleCtaClick}
                  className="button-primary editorial-banner-btn"
                >
                  {ctaText}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
