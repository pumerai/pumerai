import Banquet from "../sections/Banquet.jsx";
import PageHeader from "./PageHeader.jsx";

export default function BanquetPage({ onNavigate }) {
  return (
    <main className="page-shell banquet-page-shell">
      <PageHeader
        eyebrow="EVENTS"
        title="Banquet Halls"
        description="Two air-conditioned halls for weddings, meetings and family functions."
        id="banquet-page-heading"
      />
      <Banquet />
    </main>
  );
}
