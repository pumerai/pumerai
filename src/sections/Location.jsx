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

        {/* Essential Stay Information & Policies */}
        <div className="policies-summary-card" data-reveal>
          <div className="policies-header">
            <span className="policies-tag">POLICIES</span>
            <h2 className="policies-title">Hotel Policies</h2>
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
