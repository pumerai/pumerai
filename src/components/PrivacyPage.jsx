import PageHeader from "./PageHeader.jsx";

export default function PrivacyPage() {
  return (
    <main className="page-shell privacy-page-shell">
      <PageHeader
        eyebrow="LEGAL & PRIVACY"
        title="Privacy"
        italicTitle="Policy"
        description="Information about guest data privacy, collection, and confidentiality at Hotel Pumerai, Honnavar."
        id="privacy-page-heading"
      />

      <section className="section legal-content-section" aria-labelledby="privacy-page-heading">
        <div className="section-container">
          <div className="legal-content-card">
            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>GUEST PRIVACY NOTICE</span>
            </div>

            <h2 className="legal-section-title">Our Commitment to Guest Privacy</h2>
            <p className="legal-paragraph">
              Hotel Pumerai is dedicated to protecting the privacy and personal information of our guests.
              This notice outlines our general policies regarding information collection, reservation data,
              and communications for stays at our property on NH-66 in Honnavar, Karnataka.
            </p>

            <h2 className="legal-subheading">1. Information We Collect</h2>
            <p className="legal-paragraph">
              When making a reservation, dining enquiry, or event booking at Hotel Pumerai, we collect standard
              contact details including your name, telephone number, email address, government identification
              as required by Indian hotel regulations, and payment or billing details necessary to secure your reservation.
            </p>

            <h2 className="legal-subheading">2. Use of Information</h2>
            <p className="legal-paragraph">
              Guest details are used exclusively to process reservations, deliver hospitality services,
              coordinate concierge requests, send booking confirmations, and comply with statutory legal requirements.
              We do not sell, rent, or trade guest personal details to third parties.
            </p>

            <h2 className="legal-subheading">3. Security and Storage</h2>
            <p className="legal-paragraph">
              We implement industry-standard physical, electronic, and procedural safeguards to protect personal
              information collected through our direct channels and on-site front desk operations.
            </p>

            <h2 className="legal-subheading">4. Contact Front Desk</h2>
            <p className="legal-paragraph">
              For any questions regarding personal data or privacy practices, please contact our 24-hour front desk
              in Honnavar by phone at <a href="tel:+919845423223" className="contact-link">+91 98454 23223</a> or email at{" "}
              <a href="mailto:reservation@hotelpumerai.com" className="contact-link">reservation@hotelpumerai.com</a>.
            </p>

            <div className="legal-footnote">
              <p>
                <em>Note: Formal comprehensive legal policy text is currently pending final client review. This placeholder is served with noindex.</em>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
