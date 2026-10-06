import { transportConfig } from "../data/transport.js";

export default function Transport() {
  const { airports, railway, busStand } = transportConfig;

  // Row 3 is hidden until name, distance and time are filled in config
  const showBusStand = Boolean(busStand.name && busStand.distance && busStand.time);

  // Photo is displayed only if image width >= 300px and no watermark
  const hasValidPhoto = Boolean(
    railway.image && railway.imageWidth && railway.imageWidth >= 300
  );

  const items = [
    {
      id: airports.id,
      label: airports.label,
      name: airports.name,
      distanceLine: airports.distanceLine,
      description: airports.description,
    },
    {
      id: railway.id,
      label: railway.label,
      name: railway.name,
      distanceLine: railway.distanceLine,
      description: railway.description,
    },
  ];

  if (showBusStand) {
    items.push({
      id: busStand.id,
      label: busStand.label,
      name: busStand.name,
      distanceLine: busStand.distanceLine || `${busStand.distance} · ${busStand.time}`,
      description: busStand.description,
    });
  }

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

        {/* Transport Showcase — mirrors Spaces layout */}
        <div
          className={`transport-showcase ${hasValidPhoto ? "has-photo-stage" : "is-text-only"}`}
          data-reveal
        >
          {/* Left Column: Transport Rows */}
          <div className="transport-list">
            {items.map((item) => (
              <article key={item.id} className="transport-card">
                <span className="transport-kicker">{item.label}</span>
                <h3 className="transport-name">{item.name}</h3>
                <p className="transport-distance">{item.distanceLine}</p>
                {item.description && (
                  <p className="transport-desc">{item.description}</p>
                )}
              </article>
            ))}
          </div>

          {/* Right Column: Photo panel (only if >= 300px photo available) */}
          {hasValidPhoto && (
            <div className="transport-photo-stage">
              <div className="transport-photo-frame">
                <img
                  src={railway.image}
                  alt={railway.alt}
                  width={railway.imageWidth}
                  height={railway.imageHeight}
                  loading="lazy"
                  className="transport-photo"
                />
              </div>
              <p className="transport-photo-caption">{railway.caption}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
