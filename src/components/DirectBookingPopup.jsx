import { useEffect, useRef, useState } from "react";

/**
 * DIRECT BOOKING POPUP CONFIGURATION
 * All texts, links, timings and flags configurable in one place.
 */
export const DIRECT_BOOKING_CONFIG = {
  enabled: true,
  label: "DIRECT BOOKING",
  headingPrefix: "Book direct, save ",
  headingAccent: "10%",
  line: "Reserve with the hotel directly and get 10% off.",
  phoneText: "Call +91 98454 23223",
  phoneNumber: "+919845423223",
  phoneHref: "tel:+919845423223",
  contactText: "Contact us",
  contactRoute: "/contact",
  note: "Mention this offer when you call. Applies to direct bookings.",
  delayMs: 10000, // 10 seconds on page
  scrollPercent: 50, // 50% scroll depth
  cooldownDays: 7, // 7 days cooldown after close / action
  storageKeyCooldown: "pumerai_direct_offer_dismissed_until",
  storageKeySession: "pumerai_direct_offer_shown_session",
};

// In-memory fallback if localStorage / sessionStorage are disabled/unavailable
let memoryDismissedThisPageLoad = false;
let memoryShownThisSession = false;

function isDismissedOrCooldown() {
  if (memoryDismissedThisPageLoad) return true;

  try {
    const until = localStorage.getItem(DIRECT_BOOKING_CONFIG.storageKeyCooldown);
    if (until && Date.now() < Number(until)) {
      return true;
    }
  } catch (e) {
    // localStorage unavailable
  }

  try {
    if (sessionStorage.getItem(DIRECT_BOOKING_CONFIG.storageKeySession) === "1") {
      return true;
    }
  } catch (e) {
    // sessionStorage unavailable
    if (memoryShownThisSession) return true;
  }

  return false;
}

function setCooldown7Days() {
  memoryDismissedThisPageLoad = true;
  memoryShownThisSession = true;

  try {
    const cooldownMs = DIRECT_BOOKING_CONFIG.cooldownDays * 24 * 60 * 60 * 1000;
    localStorage.setItem(
      DIRECT_BOOKING_CONFIG.storageKeyCooldown,
      String(Date.now() + cooldownMs)
    );
  } catch (e) {}

  try {
    sessionStorage.setItem(DIRECT_BOOKING_CONFIG.storageKeySession, "1");
  } catch (e) {}
}

function markSessionShown() {
  memoryShownThisSession = true;
  try {
    sessionStorage.setItem(DIRECT_BOOKING_CONFIG.storageKeySession, "1");
  } catch (e) {}
}

export default function DirectBookingPopup({ currentPath = "/", onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const previouslyFocusedElRef = useRef(null);
  const cardRef = useRef(null);
  const callBtnRef = useRef(null);
  const closeBtnRef = useRef(null);
  const isBookingEngineOpeningRef = useRef(false);

  // Monitor clicks across document to detect if the booking engine is being opened
  useEffect(() => {
    const onDocClick = (e) => {
      const anchor = e.target.closest("a");
      if (
        anchor &&
        anchor.href &&
        (anchor.href.includes("stayflexi") ||
          anchor.href.includes("bookingengine.stayflexi.com"))
      ) {
        isBookingEngineOpeningRef.current = true;
        setIsOpen(false);
        setTimeout(() => {
          isBookingEngineOpeningRef.current = false;
        }, 6000);
      }
    };

    document.addEventListener("click", onDocClick, { capture: true, passive: true });
    return () => document.removeEventListener("click", onDocClick, { capture: true });
  }, []);

  // Popup display conditions: 10s timer OR 50% scroll
  useEffect(() => {
    if (!DIRECT_BOOKING_CONFIG.enabled) return;

    // Do not show on /contact, /faq
    if (currentPath === "/contact" || currentPath === "/faq") {
      setIsOpen(false);
      return;
    }

    if (isDismissedOrCooldown()) {
      return;
    }

    let hasTriggered = false;

    const triggerPopup = () => {
      if (hasTriggered) return;
      if (isBookingEngineOpeningRef.current) return;
      if (isDismissedOrCooldown()) return;

      // On home page, ensure document is ready and hero is loaded
      if (currentPath === "/" && document.readyState !== "complete") {
        return;
      }

      hasTriggered = true;
      markSessionShown();
      setIsOpen(true);
    };

    // 1. Time-based trigger: 10 seconds
    const timer = setTimeout(() => {
      triggerPopup();
    }, DIRECT_BOOKING_CONFIG.delayMs);

    // 2. Scroll-based trigger: 50% of the page
    const handleScroll = () => {
      if (hasTriggered) return;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 100) {
        const percent = (window.scrollY / docHeight) * 100;
        if (percent >= DIRECT_BOOKING_CONFIG.scrollPercent) {
          triggerPopup();
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPath]);

  // Accessibility: Focus trapping, Escape key, and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    // Save previous active element to restore later
    previouslyFocusedElRef.current = document.activeElement;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the popup (Call button has primary focus)
    const focusTimer = setTimeout(() => {
      if (callBtnRef.current) {
        callBtnRef.current.focus({ preventScroll: true });
      } else if (closeBtnRef.current) {
        closeBtnRef.current.focus({ preventScroll: true });
      }
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
        return;
      }

      if (e.key === "Tab") {
        if (!cardRef.current) return;
        const focusable = cardRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus({ preventScroll: true });
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus({ preventScroll: true });
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);

      if (
        previouslyFocusedElRef.current &&
        typeof previouslyFocusedElRef.current.focus === "function"
      ) {
        previouslyFocusedElRef.current.focus({ preventScroll: true });
      }
    };
  }, [isOpen]);

  const handleClose = () => {
    setCooldown7Days();
    setIsOpen(false);
  };

  const handleCallClick = () => {
    setCooldown7Days();
    setIsOpen(false);
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    setCooldown7Days();
    setIsOpen(false);
    if (onNavigate) {
      onNavigate({ route: DIRECT_BOOKING_CONFIG.contactRoute });
    } else {
      window.location.href = DIRECT_BOOKING_CONFIG.contactRoute;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="direct-booking-backdrop"
      onClick={handleClose}
      aria-hidden="false"
    >
      <div
        className="direct-booking-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="direct-booking-title"
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button (X icon, top right) */}
        <button
          type="button"
          className="direct-booking-close-btn"
          onClick={handleClose}
          aria-label="Close"
          ref={closeBtnRef}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="1" y1="1" x2="13" y2="13" />
            <line x1="13" y1="1" x2="1" y2="13" />
          </svg>
        </button>

        {/* Content */}
        <span className="direct-booking-label">
          {DIRECT_BOOKING_CONFIG.label}
        </span>

        <h3 id="direct-booking-title" className="direct-booking-heading">
          {DIRECT_BOOKING_CONFIG.headingPrefix}
          <em>{DIRECT_BOOKING_CONFIG.headingAccent}</em>
        </h3>

        <p className="direct-booking-line">
          {DIRECT_BOOKING_CONFIG.line}
        </p>

        <div className="direct-booking-actions">
          <a
            href={DIRECT_BOOKING_CONFIG.phoneHref}
            className="button-primary direct-booking-call-btn"
            ref={callBtnRef}
            onClick={handleCallClick}
          >
            {DIRECT_BOOKING_CONFIG.phoneText}
          </a>

          <a
            href={DIRECT_BOOKING_CONFIG.contactRoute}
            className="direct-booking-contact-link"
            onClick={handleContactClick}
          >
            {DIRECT_BOOKING_CONFIG.contactText}
          </a>
        </div>

        <p className="direct-booking-note">
          {DIRECT_BOOKING_CONFIG.note}
        </p>
      </div>
    </div>
  );
}
