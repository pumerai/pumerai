const navLinks = [
  { label: "Rooms", route: "/rooms" },
  { label: "Banquet Hall", route: "/banquet" },
  { label: "Veg Restaurant Menu", route: "/dining", search: "?menu=veg" },
  { label: "Non-Veg Restaurant Menu", route: "/dining", search: "?menu=nonveg" },
  { label: "Gallery", route: "/gallery" },
  { label: "Location", route: "/location" },
  { label: "FAQ", route: "/faq" },
];

const WHATSAPP_NUMBER = "919845423223";

function whatsappHref(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * FOOTER CONFIGURATION
 * Single source of truth for footer action cards
 */
export const footerConfig = {
  booking: {
    heading: "Book your stay",
    line: "Premium rooms with centralised AC and free Wi-Fi.",
    buttonLabel: "Book Now",
    bookingUrl: "https://bookingengine.stayflexi.com/?hotel_id=41986",
  },
  contact: {
    title: "HOTEL PUMERAI HONNAVAR",
    mapsLink: "https://maps.app.goo.gl/rCfTnw9t8Dp58mga7",
    address: "Hotel Pumerai, NH-66, near Ramateertha Cross,\nHonnavar, Uttara Kannada, Karnataka 581334, India",
    reservationsPhone: "+91 98454 23223",
    frontDeskPhone: "08387-221221",
    email: "reservation@hotelpumerai.com",
    instagramUrl: "https://www.instagram.com/hotelpumerai?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==",
  },
  help: {
    heading: "Need help?",
    line: "Ask us about rooms, dining or things to do in Honnavar.",
    buttonLabel: "Chat on WhatsApp",
    message: "Hi Hotel Pumerai, I would like to inquire about room availability and concierge assistance.",
  },
};

// Inline SVG Icons (no external icon library dependencies)
function InstagramIcon({ className = "" }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function WhatsAppIcon({ className = "" }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export default function Footer({ onNavigate, currentPath = "/" }) {
  const isFaqPage = currentPath === "/faq";

  const handleNavClick = (e, item) => {
    e.preventDefault();
    if (item.search && typeof window !== "undefined") {
      window.history.pushState({}, "", `${item.route}${item.search}`);
      if (onNavigate) {
        onNavigate({ route: item.route });
      }
      const menuType = item.search.includes("nonveg") ? "nonveg" : "veg";
      window.dispatchEvent(new CustomEvent("pumerai:open-menu", { detail: { menu: menuType } }));
      return;
    }
    if (onNavigate) {
      onNavigate(item);
    } else if (typeof window !== "undefined") {
      window.location.href = item.section ? `/#${item.section}` : item.route;
    }
  };

  return (
    <footer className="site-footer" id="footer" aria-label="Site Footer">
      <div className="footer-container">

        <div className="footer-brass-divider" />

        {/* Main Grid: 3 Equal Height Columns with full-height dividers */}
        <div className={`footer-main-grid ${isFaqPage ? "footer-main-grid-faq" : ""}`}>

          {/* Col 1: Book Your Stay (matches Col 3 structure and styles) */}
          {!isFaqPage && (
            <section className="footer-col footer-col-center">
              <h4 className="footer-col-heading">{footerConfig.booking.heading}</h4>
              <p className="footer-col-copy">{footerConfig.booking.line}</p>
              <a
                href={footerConfig.booking.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary footer-inline-btn"
              >
                <span>{footerConfig.booking.buttonLabel}</span>
              </a>
            </section>
          )}

          {/* Col 2: Contact, Address & Social */}
          <section className="footer-col footer-col-center">
            <p className="footer-col-title">{footerConfig.contact.title}</p>

            <address className="footer-contact-block footer-contact-centered">
              <a
                href={footerConfig.contact.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link contact-address-link"
              >
                Hotel Pumerai, NH-66, near Ramateertha Cross,
                <br />
                Honnavar, Uttara Kannada, Karnataka 581334, India
              </a>

              <span className="footer-contact-item-inline">
                Reservations: <a href={`tel:${footerConfig.contact.reservationsPhone.replace(/\s+/g, "")}`} className="contact-link">{footerConfig.contact.reservationsPhone}</a>
              </span>
              <span className="footer-contact-item-inline">
                Front Desk: <a href={`tel:${footerConfig.contact.frontDeskPhone.replace(/\s+/g, "")}`} className="contact-link">{footerConfig.contact.frontDeskPhone}</a>
              </span>
              <span className="footer-contact-item-inline">
                Email: <a href={`mailto:${footerConfig.contact.email}`} className="contact-link">{footerConfig.contact.email}</a>
              </span>
            </address>

            <p className="footer-col-title footer-follow-label">Follow Us</p>
            <div className="footer-social-icons">
              <a
                href={footerConfig.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hotel Pumerai on Instagram"
                className="footer-social-icon"
              >
                <InstagramIcon />
              </a>
            </div>
          </section>

          {/* Col 3: Need Help? Concierge Assistance */}
          {!isFaqPage && (
            <section className="footer-col footer-col-center">
              <h4 className="footer-col-heading">{footerConfig.help.heading}</h4>
              <p className="footer-col-copy">{footerConfig.help.line}</p>
              <a
                href={whatsappHref(footerConfig.help.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary footer-inline-btn"
              >
                <WhatsAppIcon />
                <span>{footerConfig.help.buttonLabel}</span>
              </a>
            </section>
          )}
        </div>

        {/* Bottom Bar: Copyright (left) | Nav Links (center) | Legal (right) */}
        <div className="footer-bottom-bar footer-bottom-bar-3col">
          <p className="footer-copy">
            &copy; 2026 Hotel Pumerai. All rights reserved.
          </p>

          <nav className="footer-bottom-nav" aria-label="Footer site navigation">
            {navLinks.map((item) => {
              const fullHref = item.search
                ? `${item.route}${item.search}`
                : item.section
                ? `${item.route}#${item.section}`
                : item.route;
              return (
                <a
                  key={item.label}
                  href={fullHref}
                  className="footer-nav-link"
                  onClick={(e) => handleNavClick(e, item)}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="footer-legal-links">
            <a href="/privacy" onClick={(e) => handleNavClick(e, { route: "/privacy" })}>Privacy Policy</a>
            <span className="legal-dot" aria-hidden="true">&bull;</span>
            <a href="/cancellation" onClick={(e) => handleNavClick(e, { route: "/cancellation" })}>Cancellation Policy</a>
            <span className="legal-dot" aria-hidden="true">&bull;</span>
            <a href="/contact" onClick={(e) => handleNavClick(e, { route: "/contact" })}>Contact</a>
          </div>
        </div>

        {/* Bottom Centered Logo Lockup & Designer Credit */}
        <div className="footer-bottom-logo-block">
          <img
            src="/pumerai-logo-full.webp"
            alt="Hotel Pumerai"
            className="footer-bottom-full-logo"
            width="132"
            height="132"
            loading="lazy"
          />
          <p className="footer-credit">
            Designed &amp; Developed by{" "}
            <a
              href="https://dishanwebwing.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-credit-link"
            >
              Dishan Web Wing
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}