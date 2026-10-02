import FAQ from "../sections/FAQ.jsx";
import PageHeader from "./PageHeader.jsx";

export default function FAQPage() {
  return (
    <main className="page-shell faq-page-shell">
      <PageHeader
        eyebrow="FAQS"
        title="Frequently Asked"
        italicTitle="Questions"
        description="Answers to common questions about rooms, dining, booking and policies at Hotel Pumerai."
        id="faq-page-heading"
      />
      <FAQ isStandalonePage={true} />
    </main>
  );
}
