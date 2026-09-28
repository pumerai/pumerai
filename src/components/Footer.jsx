const navLinks = [
  { label: "Rooms", route: "/rooms" },
  { label: "Dining", route: "/dining" },
  { label: "Gallery", route: "/gallery" },
  { label: "Location", route: "/location" },
  { label: "FAQ", route: "/faq" },
];

const WHATSAPP_NUMBER = "919845423223";

function whatsappHref(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Inline SVG Icons (no external icon library dependencies)
function FacebookIcon({ className = "" }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ className = "" }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ className = "" }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
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

export default function Footer({ onNavigate }) {
  const officialGoogleMapsLink = "https://maps.app.goo.gl/rCfTnw9t8Dp58mga7";

  const handleNavClick = (e, item) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(item);
    } else {
      window.location.href = item.section ? `/#${item.section}` : item.route;
    }
  };

  return (
    <footer className="site-footer" id="footer" aria-label="Site Footer" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="footer-container">

        {/* Giant Watermark across top of footer (as seen in Jiana reference screenshot) */}
        <div className="footer-watermark-wrap" aria-hidden="true">
          <div className="footer-watermark">
            HOTEL PUMERAI
          </div>
        </div>

        <div className="footer-brass-divider" />

        {/* Main 3-Column Grid — offer/signup | centered contact+social | concierge/WhatsApp */}
        <div className="footer-main-grid">

          {/* Col 1: Offers / Stay Updated */}
          <section className="footer-col footer-col-center">
            <h4 className="footer-col-heading">Stay in Touch &amp; Receive Offers</h4>
            <p className="footer-col-copy">
              Join the Hotel Pumerai guest list to receive exclusive seasonal rates and updates.
            </p>
            <a
              href={whatsappHref("Hi Hotel Pumerai, please add me to your updates and seasonal offers list.")}
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary footer-inline-btn"
            >
              Sign Up on WhatsApp
            </a>
          </section>

          {/* Col 2: Contact, Address & Social */}
          <section className="footer-col footer-col-center">
            <p className="footer-col-title">HOTEL PUMERAI &mdash; HONNAVAR</p>

            <address className="footer-contact-block footer-contact-centered">
              <a
                href={officialGoogleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link contact-address-link"
              >
                Hotel Pumerai, NH-66, near Ramateertha Cross,
                <br />
                Honnavar &ndash; 581334, Uttara Kannada, Karnataka
              </a>

              <span className="footer-contact-item-inline">
                Reservations: <a href="tel:+919845423223" className="contact-link">+91 98454 23223</a>
              </span>
              <span className="footer-contact-item-inline">
                Front Desk: <a href="tel:+918387221221" className="contact-link">08387-221221</a>
              </span>
              <span className="footer-contact-item-inline">
                Email: <a href="mailto:reservation@hotelpumerai.com" className="contact-link">reservation@hotelpumerai.com</a>
              </span>
            </address>

            <ul className="footer-distances-list footer-distances-centered">
              <li>&bull; ~5 km from Kasarkod Eco Beach</li>
              <li>&bull; ~2.8 km from Sharavathi River (~3.5 km from Station)</li>
            </ul>

            <p className="footer-col-title footer-follow-label">Follow Us</p>
            <div className="footer-social-icons">
              <a
                href="https://www.instagram.com/hotelpumerai?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hotel Pumerai on Instagram"
                className="footer-social-icon"
              >
                <InstagramIcon />
              </a>
            </div>
          </section>

          {/* Col 3: Direct Concierge Assistance */}
          <section className="footer-col footer-col-center">
            <h4 className="footer-col-heading">Direct Concierge Assistance</h4>
            <p className="footer-col-copy">
              Ask our team about room reservations, dining, special discounts, or recommendations around Honnavar.
            </p>
            <a
              href={whatsappHref("Hi Hotel Pumerai, I would like to inquire about room availability and concierge assistance.")}
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary footer-inline-btn"
            >
              <WhatsAppIcon />
              <span>Chat on WhatsApp</span>
            </a>
          </section>
        </div>

        {/* Coastal Wave Flourish Divider */}
        <div className="footer-brass-divider footer-wave-divider" aria-hidden="true">
          <svg width="46" height="8" viewBox="0 0 46 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 4C4.5 1 8 1 11.5 4C15 7 18.5 7 22 4C25.5 1 29 1 32.5 4C36 7 39.5 7 43 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Bottom Bar: Copyright | Nav Links | Legal */}
        <div className="footer-bottom-bar footer-bottom-bar-3col">
          <p className="footer-copy">
            &copy; 2026 Hotel Pumerai. All rights reserved.
          </p>

          <nav className="footer-bottom-nav" aria-label="Footer site navigation">
            {navLinks.map((item) => (
              <a
                key={item.route}
                href={item.route}
                className="footer-nav-link"
                onClick={(e) => handleNavClick(e, item)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="footer-legal-links">
            <a href="/location" onClick={(e) => handleNavClick(e, { route: "/location" })}>Privacy Policy</a>
            <span className="legal-dot">&bull;</span>
            <a href="/faq" onClick={(e) => handleNavClick(e, { route: "/faq" })}>Cancellation &amp; FAQ</a>
            <span className="legal-dot">&bull;</span>
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
              Dishan Web Wings
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}