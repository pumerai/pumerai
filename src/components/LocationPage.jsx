import Location from "../sections/Location.jsx";
import PageHeader from "./PageHeader.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";
import { routesMeta, siteConfig } from "../utils/seo.js";

const transitOptions = [
  {
    mode: "By Road (National Highway 66)",
    summary: "Direct Highway Access on NH-66",
    details:
      "Hotel Pumerai is situated directly on National Highway 66 (NH-66) near Ramateertha Cross in Honnavar. It offers seamless highway connectivity for travelers driving south from Gokarna (48 km), Karwar, and Goa (125 km), or driving north from Murudeshwar (26 km), Bhatkal, Udupi (130 km), and Mangalore (185 km). On-site covered parking and EV charging stations are available for all guests.",
  },
  {
    mode: "By Train (Honnavar Railway Station)",
    summary: "3.5 km from Station (7 min drive)",
    details:
      "Honnavar Railway Station (station code: HNA) is located just 3.5 km from Hotel Pumerai along the Konkan Railway network. Daily express and passenger trains connect Honnavar to Mumbai, Panvel, Madgaon (Goa), Mangalore, Bengaluru, and Ernakulam. Pre-paid autos and local taxis are readily available outside the station.",
  },
  {
    mode: "By Air (Connecting Airports)",
    summary: "Convenient Coastal Airport Corridors",
    details:
      "The nearest operational commercial airports are Mangalore International Airport (IXE, approx. 185 km south via NH-66) and Goa International Airport (Dabolim GOI, approx. 160 km north; Mopa GOX, approx. 190 km north). Both airports offer domestic and international flights with direct highway taxi and transit links to Honnavar.",
  },
  {
    mode: "By River & Coastal Waterways",
    summary: "2.8 km from Sharavathi River Boating Point",
    details:
      "The serene Sharavathi River backwaters and mangrove boating jetty are located just 2.8 km (5 minutes drive) from the hotel, where the river meets the Arabian Sea.",
  },
];

const nearbyLandmarks = [
  { name: "Sharavathi River Backwaters & Boating", distance: "2.8 km", time: "5 min drive", note: "Mangrove boat safaris and tranquil river cruises" },
  { name: "Honnavar Railway Station (HNA)", distance: "3.5 km", time: "7 min drive", note: "Main transit stop on the Konkan Railway route" },
  { name: "Kasarkod Eco Beach (Blue Flag)", distance: "5 km", time: "8 min drive", note: "Certified clean beach, boardwalks & casuarina pines" },
  { name: "Apsarakonda Waterfalls & Beach", distance: "7 km", time: "12 min drive", note: "Natural hill stream cascade, cave and sunset point" },
  { name: "Mirjan Fort", distance: "18 km", time: "25 min drive", note: "Historic 16th-century laterite stone citadel" },
  { name: "Idagunji Mahaganapati Temple", distance: "19 km", time: "25 min drive", note: "Ancient pilgrimage shrine dedicated to Lord Ganesha" },
  { name: "Murudeshwar Shiva Temple & Beach", distance: "26 km", time: "35 min drive", note: "123-ft Shiva statue, Raja Gopura & beach along NH-66" },
  { name: "Gokarna Mahabaleshwar Temple & Om Beach", distance: "48 km", time: "55 min drive", note: "Sacred coastal town with Om Beach & Kudle Beach" },
  { name: "Sirsi Marikamba Temple & Western Ghats", distance: "68 km", time: "1 hr 20 min drive", note: "Historic temple, spice valleys & forest waterfalls" },
  { name: "Udupi Sri Krishna Matha & Malpe", distance: "130 km", time: "2 hr 15 min drive", note: "Renowned temple heritage and coastal cuisine" },
  { name: "Mangalore (Mangaluru)", distance: "185 km", time: "3 hr 15 min drive", note: "Major commercial gateway & international airport" },
];

const locationFaqs = [
  {
    q: "Where is Hotel Pumerai located in Honnavar?",
    a: "Hotel Pumerai is located directly on National Highway 66 (NH-66) near Ramateertha Cross in Honnavar, Uttara Kannada district, Karnataka 581334, India.",
  },
  {
    q: "Is Hotel Pumerai easy to access from National Highway 66 (NH-66)?",
    a: "Yes, Hotel Pumerai is situated immediately along NH-66 with wide highway frontage, clear signage, secure drive-in entry, covered parking, and on-site EV charging stations.",
  },
  {
    q: "How far is Kasarkod Eco Beach from Hotel Pumerai?",
    a: "Kasarkod Eco Beach, one of India's prestigious Blue Flag certified beaches, is located 5 km from Hotel Pumerai (an 8-minute drive across the Sharavathi River bridge).",
  },
  {
    q: "How far is the Sharavathi River boating point from the hotel?",
    a: "The Sharavathi River backwater boating and mangrove cruise point is just 2.8 km (approx. 5 minutes drive) from Hotel Pumerai.",
  },
  {
    q: "How do I reach Hotel Pumerai from Honnavar Railway Station?",
    a: "Honnavar Railway Station is 3.5 km from Hotel Pumerai. Local auto-rickshaws and taxis are stationed at the station exit and take approximately 7 minutes via NH-66.",
  },
  {
    q: "Does Hotel Pumerai provide parking and electric vehicle (EV) charging?",
    a: "Yes, Hotel Pumerai provides complimentary secure covered parking on the premises and dedicated on-site Electric Vehicle (EV) charging stations for hotel guests.",
  },
  {
    q: "Is Hotel Pumerai a good base for visiting Murudeshwar and Gokarna?",
    a: "Yes, Hotel Pumerai in Honnavar is ideally situated midway along the Uttara Kannada coast—just 26 km north of Murudeshwar and 48 km south of Gokarna along NH-66.",
  },
];

export default function LocationPage({ onNavigate }) {
  const breadcrumbs = routesMeta["/location"].breadcrumbs;
  const officialGoogleMapsLink = siteConfig.hasMap;

  const handleLinkClick = (e, route) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate({ route });
    }
  };

  return (
    <main className="page-shell location-page-shell" id="main-content">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      <PageHeader
        eyebrow="LOCATION &amp; DIRECTIONS"
        title="Hotel Pumerai Location |"
        italicTitle="Honnavar on NH-66"
        description="Situated on NH-66 near Ramateertha Cross, 2.8 km from Sharavathi backwaters and 5 km from Blue Flag Kasarkod Eco Beach."
        id="location-page-heading"
      />

      {/* Editorial Geographic Overview */}
      <section className="section location-overview-section" aria-label="Location overview">
        <div className="section-container" data-reveal>
          <div className="location-intro-card">
            <span className="editorial-tag">ACCESSIBILITY &amp; TRANSIT</span>
            <h2 className="location-section-title">
              Prime Highway Location in Honnavar, Coastal Karnataka
            </h2>
            <div className="brass-rule-small" />
            <p className="location-intro-paragraph">
              Hotel Pumerai is prominently positioned on National Highway 66 (NH-66) near Ramateertha Cross in Honnavar, Uttara Kannada, Karnataka (PIN: 581334). Whether you are undertaking a coastal road trip across Karnataka, visiting ancient temple circuits, exploring the Sharavathi River backwaters, or traveling on business, our property offers unmatched highway convenience, dedicated covered parking, and on-site EV charging bays.
            </p>
            <div className="location-action-bar">
              <a
                href={officialGoogleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary"
              >
                OPEN GOOGLE MAPS DIRECTIONS
              </a>
              <a
                href="tel:+919845423223"
                className="button-secondary"
              >
                CALL CONCIERGE: +91 98454 23223
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Transit & How to Reach Section */}
      <section className="section how-to-reach-section" aria-label="How to reach Hotel Pumerai">
        <div className="section-container" data-reveal>
          <div className="section-header-compact">
            <span className="editorial-tag">TRAVEL GUIDE</span>
            <h2 className="section-title">
              How to Reach <span className="title-italic">Hotel Pumerai</span>
            </h2>
            <p className="header-summary">
              Step-by-step transit details for road travelers, rail passengers, and flight connections.
            </p>
          </div>

          <div className="transit-options-grid">
            {transitOptions.map((opt) => (
              <article className="transit-option-card" key={opt.mode}>
                <span className="transit-card-tag">{opt.summary}</span>
                <h3 className="transit-card-title">{opt.mode}</h3>
                <p className="transit-card-text">{opt.details}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Distance & Sightseeing Guide */}
      <section className="section distances-guide-section" aria-label="Distances to nearby attractions">
        <div className="section-container" data-reveal>
          <div className="section-header-compact">
            <span className="editorial-tag">NEARBY ATTRACTIONS</span>
            <h2 className="section-title">
              Verified Distances from <span className="title-italic">Hotel Pumerai</span>
            </h2>
            <p className="header-summary">
              Actual driving distances and travel times to major beaches, temples, and transit hubs.
            </p>
          </div>

          <div className="distances-table-container">
            <div className="distances-grid">
              {nearbyLandmarks.map((item) => (
                <div className="distance-row-card" key={item.name}>
                  <div className="distance-row-main">
                    <h3 className="distance-place-name">{item.name}</h3>
                    <p className="distance-place-note">{item.note}</p>
                  </div>
                  <div className="distance-row-metrics">
                    <span className="metric-km">{item.distance}</span>
                    <span className="metric-time">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map & Destinations Section (Existing AroundHonnavar + Policies) */}
      <Location isStandalonePage={true} />

      {/* Local AEO / Answer Engine Q&A Section */}
      <section className="section location-faq-section" aria-label="Frequently asked questions about Hotel Pumerai location">
        <div className="section-container" data-reveal>
          <div className="section-header-compact">
            <span className="editorial-tag">LOCAL SEARCH &amp; FAQ</span>
            <h2 className="section-title">
              Location Questions &amp; <span className="title-italic">Answers</span>
            </h2>
            <p className="header-summary">
              Clear, factual answers regarding Hotel Pumerai's location, highway connectivity, and local transit.
            </p>
          </div>

          <div className="location-faq-stack">
            {locationFaqs.map((faq, idx) => (
              <div className="location-faq-item" key={faq.q}>
                <h3 className="location-faq-q">
                  <span className="faq-q-num">{String(idx + 1).padStart(2, "0")}.</span> {faq.q}
                </h3>
                <p className="location-faq-a">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contextual Internal Linking Footer */}
      <section className="section location-hub-section" aria-label="Explore other pages">
        <div className="section-container" data-reveal>
          <div className="location-hub-card">
            <h2 className="hub-card-heading">Plan Your Stay in Honnavar</h2>
            <p className="hub-card-copy">
              Combine your visit with luxury accommodations, authentic dining, and event venues at Hotel Pumerai.
            </p>
            <div className="location-hub-links">
              <a
                href="/rooms"
                className="button-primary"
                onClick={(e) => handleLinkClick(e, "/rooms")}
              >
                VIEW ROOMS &amp; SUITES
              </a>
              <a
                href="/dining"
                className="button-secondary"
                onClick={(e) => handleLinkClick(e, "/dining")}
              >
                EXPLORE RESTAURANTS
              </a>
              <a
                href="/contact"
                className="button-secondary"
                onClick={(e) => handleLinkClick(e, "/contact")}
              >
                CONTACT FRONT DESK
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
