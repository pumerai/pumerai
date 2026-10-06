import { transportConfig } from "../data/transport.js";

export default function Transport() {
  const { airports, railway, busStand } = transportConfig;

  // Photo is displayed only if image width >= 300px and no watermark
  const hasValidRailwayPhoto = Boolean(
    railway.image && railway.imageWidth && railway.imageWidth >= 300
  );

  const hasBusStandDistanceAndTime = Boolean(busStand.distance && busStand.time);

  return (
    <section
      className="section transport-section"
      id="transport"
      aria-labelledby="transport-heading"
    >
      <div className="section-container">
        {/* Section Header */}
        <header className="section-header-split" data-reveal>
          <div className="header-meta">
            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>TRANSPORT</span>
            </div>
            <h2 id="transport-heading" className="section-title">
              Getting to <span className="title-italic">Pumerai</span>
            </h2>
          </div>
          <div className="header-summary-block">
            <p className="header-summary">
              Nearest airports, railway station and bus stand.
            </p>
          </div>
        </header>

        {/* Transport Showcase — 3 Equal Cards in one row */}
        <div className="transport-grid-3col" data-reveal>
          {/* Card 1: Airports */}
          <article className="transport-card">
            <span className="transport-kicker">{airports.label}</span>
            <h3 className="transport-name">{airports.name}</h3>
            <p className="transport-distance">{airports.distanceLine}</p>
            {airports.description && (
              <p className="transport-desc">{airports.description}</p>
            )}
          </article>

          {/* Card 2: Railway Station */}
          <article className="transport-card">
            {hasValidRailwayPhoto && (
              <div className="transport-card-photo-box">
                <img
                  src={railway.image}
                  alt="Honnavar Railway Station"
                  width={railway.imageWidth}
                  height={railway.imageHeight}
                  loading="lazy"
                  className="transport-card-photo"
                />
              </div>
            )}
            <span className="transport-kicker">{railway.label}</span>
            <h3 className="transport-name">{railway.name}</h3>
            <p className="transport-distance">{railway.distanceLine}</p>
            {railway.description && (
              <p className="transport-desc">{railway.description}</p>
            )}
          </article>

          {/* Card 3: Bus Stand */}
          <article className="transport-card">
            <span className="transport-kicker">{busStand.label}</span>
            <h3 className="transport-name">{busStand.name}</h3>
            {hasBusStandDistanceAndTime ? (
              <p className="transport-distance">
                {busStand.distanceLine || `${busStand.distance} · ${busStand.time}`}
              </p>
            ) : (
              <p className="transport-distance-action">
                <a
                  href={
                    busStand.directionsUrl ||
                    "https://www.google.com/maps/dir/?api=1&origin=Hotel+Pumerai+Honnavar&destination=Honnavar+KSRTC+Bus+Stand"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transport-directions-link"
                >
                  Get directions &rarr;
                </a>
              </p>
            )}
            {busStand.description && (
              <p className="transport-desc">{busStand.description}</p>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}
