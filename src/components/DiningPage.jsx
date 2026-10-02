import Dining from "../sections/Dining.jsx";
import PageHeader from "./PageHeader.jsx";

export default function DiningPage({ onNavigate }) {
  return (
    <main className="page-shell dining-page-shell">
      <PageHeader
        eyebrow="DINING"
        title="Dining"
        description="Two restaurants, open daily."
        id="dining-page-heading"
      />
      <Dining isStandalonePage={true} onNavigate={onNavigate} />
    </main>
  );
}
