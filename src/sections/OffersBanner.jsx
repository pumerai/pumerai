import { useState } from "react";
import { rooms, STAYFLEXI_BOOKING_URL } from "../data/rooms.js";
import { useSharedBookingDates, getOffsetDateString } from "../hooks/useSharedBookingDates.js";

export default function OffersBanner() {
  const { checkIn, checkOut, today, setCheckIn, setCheckOut } = useSharedBookingDates();
  const [selectedRoom, setSelectedRoom] = useState("all");
  const [guests, setGuests] = useState("2");

  const handleCheckInChange = (e) => {
    const val = e.target.value;
    setCheckIn(val);
  };

  const handleCheckOutChange = (e) => {
    setCheckOut(e.target.value);
  };

  const handleCheckAvailability = (e) => {
    e.preventDefault();
    if (selectedRoom === "family-suite-room") {
      const waText = encodeURIComponent(
        `Hi Hotel Pumerai, I would like to check availability for the Family Suite Room from ${checkIn} to ${checkOut} for ${guests} guests.`
      );
      window.open(`https://wa.me/919845423223?text=${waText}`, "_blank", "noopener,noreferrer");
    } else {
      window.open(STAYFLEXI_BOOKING_URL, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section className="section direct-booking-section" id="booking" aria-labelledby="direct-booking-title">
      <div className="section-container">
        <div className="direct-booking-wrapper" data-reveal>
          {/* Left Column: Large Editorial Heading & Value Prop */}
          <div className="direct-booking-editorial">
            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>Direct Reservations</span>
            </div>

            <h2 id="direct-booking-title" className="direct-booking-heading">
              Your Honnavar<br />
              journey starts<br />
              <span className="title-italic">here.</span>
            </h2>

            <p className="direct-booking-subtext">
              Book directly with Hotel Pumerai for our best room rates and daily complimentary breakfast.
            </p>

            <ul className="direct-booking-perks-list" aria-label="Direct booking benefits">
              <li className="direct-perk-item">
                <span><strong>Direct rates:</strong> Lower than third-party booking sites</span>
              </li>
              <li className="direct-perk-item">
                <span><strong>Complimentary breakfast:</strong> Included with every direct stay</span>
              </li>
              <li className="direct-perk-item">
                <span><strong>Cancellation:</strong> Free cancellation up to 24 hours before check-in.</span>
              </li>
            </ul>
          </div>

          {/* Right Column: Premium Booking / Availability Card */}
          <div className="direct-booking-card-col">
            <div className="premium-booking-card">
              <div className="booking-card-header">
                <h3 className="booking-card-title">Check availability</h3>
                <span className="booking-card-badge">Official Website Rates</span>
              </div>

              <form className="booking-card-form" onSubmit={handleCheckAvailability}>
                <div className="booking-card-row">
                  <div className="booking-card-field">
                    <label htmlFor="direct-check-in" className="card-field-label">Check-in</label>
                    <input
                      id="direct-check-in"
                      type="date"
                      min={today}
                      value={checkIn}
                      onChange={handleCheckInChange}
                      className="card-field-input"
                      required
                    />
                  </div>
                  <div className="booking-card-field">
                    <label htmlFor="direct-check-out" className="card-field-label">Check-out</label>
                    <input
                      id="direct-check-out"
                      type="date"
                      min={checkIn ? getOffsetDateString(checkIn, 1) : today}
                      value={checkOut}
                      onChange={handleCheckOutChange}
                      className="card-field-input"
                      required
                    />
                  </div>
                </div>

                <div className="booking-card-row">
                  <div className="booking-card-field">
                    <label htmlFor="direct-room-type" className="card-field-label">Room Preference</label>
                    <select
                      id="direct-room-type"
                      value={selectedRoom}
                      onChange={(e) => setSelectedRoom(e.target.value)}
                      className="card-field-select"
                    >
                      <option value="all">All Room Types (7 Available)</option>
                      {rooms.map((r) => (
                        <option key={r.slug} value={r.slug}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="booking-card-field">
                    <label htmlFor="direct-guests" className="card-field-label">Guests</label>
                    <select
                      id="direct-guests"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="card-field-select"
                    >
                      <option value="1">1 Adult</option>
                      <option value="2">2 Adults</option>
                      <option value="3">3 Adults</option>
                      <option value="4">4+ Adults / Family</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="button-primary booking-card-submit-btn"
                  aria-label="Check Availability and Book Direct with Hotel Pumerai"
                >
                  CHECK AVAILABILITY
                </button>

                <div className="booking-card-footer">
                  <a
                    href="https://wa.me/919845423223?text=Hi%20Hotel%20Pumerai%2C%20I%20would%20like%20to%20check%20room%20availability%20and%20book%20direct."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="booking-card-whatsapp-link"
                    aria-label="Book directly via WhatsApp"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                    <span>WhatsApp: +91 98454 23223</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
