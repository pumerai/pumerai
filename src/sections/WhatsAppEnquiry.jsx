import { useState } from "react";
import { trackEvent } from "../utils/analytics.js";

function formatLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getTodayStr() {
  return formatLocalDate(new Date());
}

function getTomorrowStr() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return formatLocalDate(d);
}

const ROOM_OPTIONS = [
  "Any room",
  "Premium Room",
  "Club Room",
  "Family Suite Room",
  "Club Room with Balcony",
  "Suite Room",
  "Premium Twin Room",
  "Deluxe Room",
];

const GUEST_OPTIONS = ["1", "2", "3", "4", "5", "6", "7+"];

export default function WhatsAppEnquiry() {
  const today = getTodayStr();
  const tomorrow = getTomorrowStr();

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guests, setGuests] = useState("2");
  const [roomType, setRoomType] = useState("Any room");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!checkIn) {
      errs.checkIn = "Check-in date is required.";
    } else if (checkIn < today) {
      errs.checkIn = "Check-in date cannot be in the past.";
    }

    if (!checkOut) {
      errs.checkOut = "Check-out date is required.";
    } else if (checkIn && checkOut <= checkIn) {
      errs.checkOut = "Check-out must be after check-in.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    trackEvent("click_whatsapp", {
      source: "whatsapp_enquiry_box",
      check_in: checkIn,
      check_out: checkOut,
      guests,
      room_type: roomType,
    });

    const msg = `Hi Hotel Pumerai, I would like to enquire about a room. Check-in: ${checkIn}. Check-out: ${checkOut}. Guests: ${guests}. Room type: ${roomType}.`;
    const url = `https://wa.me/919845423223?text=${encodeURIComponent(msg)}`;

    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section
      className="section whatsapp-enquiry-section"
      id="whatsapp-enquiry"
      aria-labelledby="whatsapp-enquiry-heading"
    >
      <div className="section-container">
        {/* Section Header */}
        <header className="section-header-split" data-reveal>
          <div className="header-meta">
            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>WHATSAPP</span>
            </div>
            <h2 id="whatsapp-enquiry-heading" className="section-title">
              Enquire on <span className="title-italic">WhatsApp</span>
            </h2>
          </div>
          <div className="header-summary-block">
            <p className="header-summary">
              Send your dates and we will reply shortly.
            </p>
          </div>
        </header>

        {/* Enquiry Card */}
        <div className="whatsapp-enquiry-card" data-reveal>
          <form
            onSubmit={handleSubmit}
            className="whatsapp-enquiry-form"
            noValidate
          >
            <div className="whatsapp-fields-row">
              {/* Check-in */}
              <div className="whatsapp-field-group">
                <label htmlFor="wa-checkin" className="whatsapp-field-label">
                  Check-in
                </label>
                <input
                  id="wa-checkin"
                  type="date"
                  min={today}
                  value={checkIn}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                    if (errors.checkIn) setErrors((prev) => ({ ...prev, checkIn: null }));
                  }}
                  className={`whatsapp-input ${errors.checkIn ? "is-invalid" : ""}`}
                  required
                />
                {errors.checkIn && (
                  <span className="whatsapp-inline-error" role="alert">
                    {errors.checkIn}
                  </span>
                )}
              </div>

              {/* Check-out */}
              <div className="whatsapp-field-group">
                <label htmlFor="wa-checkout" className="whatsapp-field-label">
                  Check-out
                </label>
                <input
                  id="wa-checkout"
                  type="date"
                  min={checkIn || today}
                  value={checkOut}
                  onChange={(e) => {
                    setCheckOut(e.target.value);
                    if (errors.checkOut) setErrors((prev) => ({ ...prev, checkOut: null }));
                  }}
                  className={`whatsapp-input ${errors.checkOut ? "is-invalid" : ""}`}
                  required
                />
                {errors.checkOut && (
                  <span className="whatsapp-inline-error" role="alert">
                    {errors.checkOut}
                  </span>
                )}
              </div>

              {/* Guests */}
              <div className="whatsapp-field-group">
                <label htmlFor="wa-guests" className="whatsapp-field-label">
                  Number of guests
                </label>
                <select
                  id="wa-guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="whatsapp-input whatsapp-select"
                >
                  {GUEST_OPTIONS.map((num) => (
                    <option key={num} value={num}>
                      {num === "7+" ? "7+" : num}
                    </option>
                  ))}
                </select>
              </div>

              {/* Room type */}
              <div className="whatsapp-field-group">
                <label htmlFor="wa-roomtype" className="whatsapp-field-label">
                  Room type
                </label>
                <select
                  id="wa-roomtype"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="whatsapp-input whatsapp-select"
                >
                  {ROOM_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="whatsapp-submit-row">
              <button
                type="submit"
                className="button-primary whatsapp-submit-btn"
                aria-label="Enquire on WhatsApp with selected stay dates and room type"
              >
                <span>Enquire on WhatsApp</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
