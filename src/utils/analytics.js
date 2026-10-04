import { siteConfig } from "./seo.js";

/**
 * GA4 & Conversion Event Tracking Utility
 *
 * Rules:
 * - Load GA4 only after the page is interactive (window load / requestIdleCallback).
 * - Add the GA4 ID only when provided in siteConfig.ga4Id.
 * - Capture all conversion events:
 *   click_call, click_whatsapp, click_book_now, click_email, click_directions,
 *   submit_enquiry, popup_call, popup_contact.
 */

let isInitialized = false;

export function trackEvent(eventName, params = {}) {
  if (typeof window === "undefined") return;

  if (window.gtag) {
    window.gtag("event", eventName, params);
  }
}

export function initAnalytics() {
  if (typeof window === "undefined" || isInitialized) return;

  const gaId = siteConfig.ga4Id?.trim();
  if (!gaId) {
    // GA4 ID is not yet provided; set up event listeners for forward-compatibility
    setupDelegatedEventListeners();
    return;
  }

  isInitialized = true;

  // Load GA4 only after the browser is idle/interactive
  const loadScript = () => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", gaId, {
      anonymize_ip: true,
      send_page_view: true,
    });

    setupDelegatedEventListeners();
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(loadScript, { timeout: 3000 });
  } else {
    window.addEventListener("load", loadScript, { once: true });
  }
}

function setupDelegatedEventListeners() {
  if (typeof document === "undefined") return;

  document.addEventListener("click", (e) => {
    const anchor = e.target.closest("a");
    if (!anchor) return;

    const href = anchor.getAttribute("href") || "";

    // 1. Phone Call
    if (href.startsWith("tel:")) {
      trackEvent("click_call", {
        phone_number: href.replace("tel:", ""),
        link_text: anchor.innerText?.trim() || "",
      });
      return;
    }

    // 2. WhatsApp
    if (href.includes("wa.me") || href.includes("api.whatsapp.com")) {
      trackEvent("click_whatsapp", {
        link_url: href,
        link_text: anchor.innerText?.trim() || "",
      });
      return;
    }

    // 3. Direct Booking Engine
    if (href.includes("stayflexi.com") || href.includes("bookingengine")) {
      trackEvent("click_book_now", {
        target_url: href,
        link_text: anchor.innerText?.trim() || "",
      });
      return;
    }

    // 4. Email
    if (href.startsWith("mailto:")) {
      trackEvent("click_email", {
        email: href.replace("mailto:", ""),
      });
      return;
    }

    // 5. Directions / Maps
    if (href.includes("maps.app.goo.gl") || href.includes("google.com/maps")) {
      trackEvent("click_directions", {
        maps_url: href,
      });
      return;
    }

    // 6. Popup Actions
    if (anchor.dataset?.tracking === "popup_call") {
      trackEvent("popup_call");
      return;
    }
    if (anchor.dataset?.tracking === "popup_contact") {
      trackEvent("popup_contact");
      return;
    }
  });

  // 7. Form Submission (Contact / Enquiry)
  document.addEventListener("submit", (e) => {
    trackEvent("submit_enquiry", {
      form_id: e.target.id || "enquiry_form",
    });
  });
}
