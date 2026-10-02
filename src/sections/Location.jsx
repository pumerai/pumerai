import AroundHonnavar from "../components/AroundHonnavar.jsx";

const hotelPolicies = [
  { label: "Check-in Time", value: "From 1:00 PM with 24-hour reception for late arrivals." },
  { label: "Check-out Time", value: "Until 11:00 AM." },
  { label: "Pool Hours", value: "6:30 AM to 7:00 PM daily for rooftop and children's pools." },
  { label: "Smoking Policy", value: "Smoke-free rooms with designated outdoor smoking areas." },
  { label: "Pet Policy", value: "Pets are not accommodated." },
  { label: "Parking & EV", value: "Covered parking with dedicated EV charging stations." },
  { label: "Front Desk", value: "24-hour front desk, security and luggage assistance." },
  { label: "Direct Bookings", value: "Free cancellation up to 24 hours before check-in." },
];

/**
 * Photo credits for destination images (licence required by CC-BY-SA).
 * Must appear only on the Location page, not on Home.
 */
const CREDITS = [
  { file: "Kasarkod Beach", author: "sarangib", page: "https://commons.wikimedia.org/wiki/File:Kasrkod-beach-park-Honnavar.jpg", licence: "CC0 1.0" },
  { file: "Murudeshwar", author: "Joygopal008", page: "https://commons.wikimedia.org/wiki/File:Murudeshwar_Shiva_Statue.jpg", licence: "CC BY-SA 4.0" },
  { file: "Gokarna", author: "Vedamurthy.j", page: "https://commons.wikimedia.org/wiki/File:Mahabaleshwara_Temple.JPG", licence: "CC BY-SA 3.0" },
  { file: "Sirsi", author: "solarisgirl", page: "https://commons.wikimedia.org/wiki/File:Marikamba_Temple,_Sirsi_(48029209132).jpg", licence: "CC BY-SA 2.0" },
  { file: "Goa", author: "Vyacheslav Argenberg", page: "https://commons.wikimedia.org/wiki/File:Mandrem_Beach_and_Mandrem_River,_Mandrem,_Goa,_India_(edit).jpg", licence: "CC BY 4.0" },
  { file: "Udupi", author: "Outlander07", page: "https://commons.wikimedia.org/wiki/File:Udupi_Sri_krishna_matha_Temple_pond.jpg", licence: "CC BY-SA 4.0" },
  { file: "Mangalore", author: "Nyk19", page: "https://commons.wikimedia.org/wiki/File:Mangalore_skylines.jpg", licence: "CC BY-SA 4.0" },
];

export default function Location({ isStandalonePage = false }) {
  return (
    <section
      className="section location-section coastal-connected-section"
      id="location"
      aria-label="Around Honnavar and hotel policies"
    >
      <div className="section-container">
        {/* Interactive map + destination panel */}
        <div data-reveal>
          <AroundHonnavar />
        </div>

        {/* Photo credits — Location page only, 12px muted */}
        <p className="photo-credits-line" data-reveal>
          Destination photos from{" "}
          <a href="https://commons.wikimedia.org" target="_blank" rel="noopener noreferrer">
            Wikimedia Commons
          </a>
          :{" "}
          {CREDITS.map((c, i) => (
            <span key={c.file}>
              <a href={c.page} target="_blank" rel="noopener noreferrer">
                {c.file}
              </a>
              {" "}by {c.author} ({c.licence}){i < CREDITS.length - 1 ? "; " : "."}
            </span>
          ))}
        </p>

        {/* Essential Stay Information & Policies */}
        <div className="policies-summary-card" data-reveal>
          <div className="policies-header">
            <span className="policies-tag">POLICIES</span>
            <h3 className="policies-title">Hotel Policies</h3>
          </div>
          <div className="policies-two-col-grid">
            {hotelPolicies.map((p) => (
              <div className="policy-row-item" key={p.label}>
                <span className="policy-row-label">{p.label}</span>
                <span className="policy-row-val">{p.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
