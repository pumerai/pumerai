import { useEffect, useRef, useState } from "react";

function getTodayISO() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDateDDMMYYYY(isoStr) {
  if (!isoStr) return "";
  const parts = isoStr.split("-");
  if (parts.length !== 3) return isoStr;
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
}

export default function BanquetEnquiryPopup({
  isOpen,
  hall,
  onClose,
  triggerButtonRef,
}) {
  const [eventDate, setEventDate] = useState("");
  const [guests, setGuests] = useState("");
  const [errors, setErrors] = useState({});

  const modalRef = useRef(null);
  const dateInputRef = useRef(null);

  const todayStr = getTodayISO();

  // Hall info defaults
  const isGeneral = !hall || hall.id === "general";
  const hallName = hall?.name || "our banquet halls";
  const maxCapacity = hall?.maxCapacity || 200;

  // Heading: "Enquire about <hall name>" (general: "Enquire about our banquet halls")
  const headingText = isGeneral
    ? "Enquire about our banquet halls"
    : `Enquire about ${hallName}`;

  // Focus trap, body lock and Escape key
  useEffect(() => {
    if (!isOpen) return;

    // Reset fields on open
    setEventDate("");
    setGuests("");
    setErrors({});

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus the first input field
    const timer = setTimeout(() => {
      if (dateInputRef.current) {
        dateInputRef.current.focus({ preventScroll: true });
      }
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      if (triggerButtonRef?.current) {
        triggerButtonRef.current.focus({ preventScroll: true });
      }
    };
  }, [isOpen, onClose, triggerButtonRef]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};

    if (!eventDate) {
      newErrors.eventDate = "Select an event date.";
    } else if (eventDate < todayStr) {
      newErrors.eventDate = "Date cannot be in the past.";
    }

    if (!guests || guests.trim() === "") {
      newErrors.guests = "Enter the number of guests.";
    } else {
      const num = parseInt(guests, 10);
      if (isNaN(num) || num < 1) {
        newErrors.guests = "Enter the number of guests.";
      } else if (num > maxCapacity) {
        newErrors.guests = isGeneral
          ? `Our banquet halls seat up to ${maxCapacity} guests.`
          : `${hallName} seats up to ${maxCapacity} guests.`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formattedDate = formatDateDDMMYYYY(eventDate);
    const guestNum = parseInt(guests, 10);

    // Message format:
    // "Hi Hotel Pumerai, I would like to enquire about booking <hall name>. Event date: <dd-mm-yyyy>. Number of guests: <n>."
    // (For general: use "our banquet halls")
    const message = `Hi Hotel Pumerai, I would like to enquire about booking ${hallName}. Event date: ${formattedDate}. Number of guests: ${guestNum}.`;
    const waUrl = `https://wa.me/919845423223?text=${encodeURIComponent(message)}`;

    // GA4 event if enabled
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      try {
        window.gtag("event", "banquet_enquiry_submit", {
          hall_name: hallName,
          event_date: formattedDate,
          guests: guestNum,
        });
      } catch (err) {
        // Analytics failure should not block user
      }
    }

    // Open WhatsApp in new tab
    const a = document.createElement("a");
    a.href = waUrl;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Reset and close
    setEventDate("");
    setGuests("");
    setErrors({});
    onClose();
  };

  return (
    <div
      className="banquet-popup-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className="banquet-popup-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="banquet-popup-heading"
      >
        <button
          type="button"
          className="banquet-popup-close-btn"
          onClick={onClose}
          aria-label="Close enquiry popup"
        >
          <span aria-hidden="true">&times;</span>
        </button>

        <h3 id="banquet-popup-heading" className="banquet-popup-heading">
          {headingText}
        </h3>

        <form onSubmit={handleSubmit} className="banquet-popup-form" noValidate>
          <div className="banquet-popup-field">
            <label htmlFor="banquet-event-date" className="banquet-popup-label">
              Event date
            </label>
            <input
              ref={dateInputRef}
              id="banquet-event-date"
              type="date"
              min={todayStr}
              value={eventDate}
              onChange={(e) => {
                setEventDate(e.target.value);
                if (errors.eventDate) setErrors((prev) => ({ ...prev, eventDate: null }));
              }}
              className={`banquet-popup-input ${errors.eventDate ? "is-invalid" : ""}`}
              required
            />
            {errors.eventDate && (
              <span className="banquet-popup-error" role="alert">
                {errors.eventDate}
              </span>
            )}
          </div>

          <div className="banquet-popup-field">
            <label htmlFor="banquet-guest-count" className="banquet-popup-label">
              Number of guests
            </label>
            <input
              id="banquet-guest-count"
              type="number"
              min="1"
              max={maxCapacity}
              placeholder={`1 to ${maxCapacity}`}
              value={guests}
              onChange={(e) => {
                setGuests(e.target.value);
                if (errors.guests) setErrors((prev) => ({ ...prev, guests: null }));
              }}
              className={`banquet-popup-input ${errors.guests ? "is-invalid" : ""}`}
              required
            />
            {errors.guests && (
              <span className="banquet-popup-error" role="alert">
                {errors.guests}
              </span>
            )}
          </div>

          <button type="submit" className="button-primary banquet-popup-submit-btn">
            <span>Continue on WhatsApp</span>
          </button>
        </form>
      </div>
    </div>
  );
}
