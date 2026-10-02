import Banquet from "../sections/Banquet.jsx";
import PageHeader from "./PageHeader.jsx";

export default function BanquetPage({ onNavigate }) {
  return (
    <main className="page-shell banquet-page-shell">
      <PageHeader
        eyebrow="EVENTS & GATHERINGS • HOTEL PUMERAI"
        title="BANQUET HALLS"
        description="Elegant spaces for celebrations, gatherings and events at Hotel Pumerai."
        id="banquet-page-heading"
      />
      <Banquet />
    </main>
  );
}
