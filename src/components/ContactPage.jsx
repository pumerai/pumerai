import { useState } from "react";
import PageHeader from "./PageHeader.jsx";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const officialGoogleMapsLink = "https://maps.app.goo.gl/rCfTnw9t8Dp58mga7";
  const whatsappDirectUrl = `https://wa.me/919845423223?text=${encodeURIComponent(
    "Hi Hotel Pumerai! I would like to contact your front desk regarding a room reservation or inquiry."
  )}`;

  return (
    <main className="page-shell contact-page-shell">
      <PageHeader
        eyebrow="CONTACT"
        title="Contact"
        description="Reservations and enquiries."
        id="contact-page-heading"
      />

      <section className="section contact-details-section">
        <div className="section-container">
          <div className="contact-main-grid">
            {/* Left Column: Contact Channels & NAP */}
            <div className="contact-info-col">
              <div className="contact-card-box">
                <h2 className="card-box-title">Get in Touch</h2>
                <div className="brass-rule-small" />

                <div className="contact-methods-stack">
                  <div className="method-item">
                    <span className="method-label">Reservations</span>
                    <a href="tel:+919845423223" className="method-val primary-link">
                      +91 98454 23223 (24 hours)
                    </a>
                  </div>

                  <div className="method-item">
                    <span className="method-label">Front Desk</span>
                    <a href="tel:+918387221221" className="method-val">
                      08387-221221
                    </a>
                  </div>

                  <div className="method-item">
                    <span className="method-label">WhatsApp</span>
                    <a
                      href={whatsappDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="method-val whatsapp-link"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>

                  <div className="method-item">
                    <span className="method-label">Email</span>
                    <a href="mailto:reservation@hotelpumerai.com" className="method-val">
                      reservation@hotelpumerai.com
                    </a>
                  </div>

                  <div className="method-item">
                    <span className="method-label">Address</span>
                    <address className="method-address">
                      Hotel Pumerai
                      <br />
                      NH-66, near Ramateertha Cross,
                      <br />
                      Honnavar, Uttara Kannada,
                      <br />
                      Karnataka 581334, India
                    </address>
                  </div>
                </div>

                <div className="contact-instant-actions">
                  <a href={officialGoogleMapsLink} target="_blank" rel="noopener noreferrer" className="button-primary">
                    Get Directions
                  </a>
                  <a href={whatsappDirectUrl} target="_blank" rel="noopener noreferrer" className="button-whatsapp-instant">
                    WhatsApp
                  </a>
                  <a href="tel:+919845423223" className="button-call-instant">
                    Call +91 98454 23223
                  </a>
                </div>
              </div>

              {/* Transit Distances Summary */}
              <div className="transit-mini-summary">
                <h4 className="transit-summary-title">Distances</h4>
                <ul className="transit-mini-list">
                  <li>Kasarkod Eco Beach, 5 km</li>
                  <li>Sharavathi River Backwaters, 2.8 km</li>
                  <li>Honnavar Railway Station, 3.5 km</li>
                  <li>Mirjan Fort, 18 km</li>
                  <li>Murudeshwar Temple, 26 km</li>
                </ul>
              </div>
            </div>

            {/* Right Column: Contact & Booking Inquiry Form */}
            <div className="contact-form-col">
              <div className="form-wrapper-box">
                <h2 className="form-box-title">Send an Enquiry</h2>
                <p className="form-box-desc">
                  Share your dates and we will reply shortly.
                </p>

                {!formSubmitted ? (
                  <form onSubmit={handleSubmit} className="contact-actual-form">
                    <div className="form-group">
                      <label htmlFor="contact-name">Full Name *</label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="e.g. Anand Rao"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="modal-form-input"
                      />
                    </div>

                    <div className="form-row-2">
                      <div className="form-group">
                        <label htmlFor="contact-phone">Phone / WhatsApp *</label>
                        <input
                          id="contact-phone"
                          type="tel"
                          required
                          placeholder="+91 98450 00000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="modal-form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="contact-email">Email Address</label>
                        <input
                          id="contact-email"
                          type="email"
                          placeholder="you@domain.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="modal-form-input"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-message">Dates and Details *</label>
                      <textarea
                        id="contact-message"
                        rows="4"
                        required
                        placeholder="Dates, number of guests and questions"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="modal-form-input modal-form-textarea"
                      />
                    </div>

                    <button type="submit" className="button-primary submit-contact-btn">
                      SEND ENQUIRY
                    </button>
                    <p className="form-secure-note">
                      Your details are never shared.
                    </p>
                  </form>
                ) : (
                  <div className="contact-success-state">
                    <h4 className="success-heading">Message Sent</h4>
                    <p className="success-copy">
                      Thank you, <strong>{name}</strong>. Our front desk will contact you shortly.
                    </p>
                    <div className="success-actions">
                      <a href={whatsappDirectUrl} target="_blank" rel="noopener noreferrer" className="button-whatsapp-instant">
                        Chat on WhatsApp
                      </a>
                      <button type="button" className="button-secondary" onClick={() => setFormSubmitted(false)}>
                        Send Another Enquiry
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Embedded Official Map in Contact Page */}
              <div className="contact-page-map-box">
                <iframe
                  title="Hotel Pumerai Honnavar Official Map Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800!2d74.446001!3d14.2904652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbc3b0078713aef:0xc5291d53eacaf9a1!5e0!3m2!1sen!2sin!4v0"
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="contact-map-iframe"
                />
                <div className="contact-map-action">
                  <a
                    href={officialGoogleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-primary contact-map-btn"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
