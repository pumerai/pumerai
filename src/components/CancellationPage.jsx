import PageHeader from "./PageHeader.jsx";

// TODO: Client to provide finalized cancellation and modification policy terms for this page
export default function CancellationPage() {
  return (
    <main className="page-shell cancellation-page-shell">
      <PageHeader
        eyebrow="TERMS & POLICIES"
        title="Cancellation"
        italicTitle="Policy"
        description="Booking cancellation and modification terms for room reservations at Hotel Pumerai, Honnavar."
        id="cancellation-page-heading"
      />

      <section className="section legal-content-section" aria-labelledby="cancellation-page-heading">
        <div className="section-container">
          <div className="legal-content-card">
            <div className="editorial-tag">
              <span className="accent-pip" />
              <span>RESERVATION POLICIES</span>
            </div>

            <h2 className="legal-section-title">Cancellation &amp; Booking Terms</h2>
            <p className="legal-paragraph">
              At Hotel Pumerai in Honnavar, we strive to offer flexible, transparent booking terms for our guests.
              Direct bookings made with our property include free cancellation up to 24 hours prior to check-in.
            </p>

            <h2 className="legal-subheading">1. Standard Direct Bookings</h2>
            <p className="legal-paragraph">
              Direct bookings include free cancellation up to 24 hours prior to check-in. If you need to cancel or
              reschedule your stay, please notify our front desk at least 24 hours before your scheduled arrival date.
            </p>

            <h2 className="legal-subheading">2. Cancellations &amp; Modifications</h2>
            <p className="legal-paragraph">
              To request a cancellation or change your dates of stay, please reach out directly to our 24-hour reception
              team with your reservation confirmation number.
            </p>

            <h2 className="legal-subheading">3. Banquet &amp; Event Bookings</h2>
            <p className="legal-paragraph">
              Cancellations for banquet halls (Sidhvin Banquet Hall and Milan Hall), large group bookings, and special events
              are subject to the specific terms outlined in your event booking contract.
            </p>

            <h2 className="legal-subheading">4. Contact Reservations</h2>
            <p className="legal-paragraph">
              For assistance with any existing booking or questions regarding cancellation terms, call our front desk at{" "}
              <a href="tel:+919845423223" className="contact-link">+91 98454 23223</a> or email{" "}
              <a href="mailto:reservation@hotelpumerai.com" className="contact-link">reservation@hotelpumerai.com</a>.
            </p>

            <div className="legal-footnote">
              <p>
                <em>Note: Formal comprehensive cancellation policy wording is currently pending final client confirmation. This placeholder is served with noindex.</em>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
