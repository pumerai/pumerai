import Location from "../sections/Location.jsx";
import PageHeader from "./PageHeader.jsx";

export default function LocationPage() {
  return (
    <main className="page-shell location-page-shell">
      <PageHeader
        eyebrow="LOCATION"
        title="Location &"
        italicTitle="Around Honnavar"
        description="On NH-66, near Kasarkod Beach, Sharavathi backwaters and Honnavar."
        id="location-page-heading"
      />
      <Location isStandalonePage={true} />
    </main>
  );
}
