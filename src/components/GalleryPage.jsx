import GallerySection from "../sections/GallerySection.jsx";
import PageHeader from "./PageHeader.jsx";

export default function GalleryPage() {
  return (
    <main className="page-shell gallery-page-shell">
      <PageHeader
        eyebrow="GALLERY"
        title="Photo"
        italicTitle="Gallery"
        description="Explore Hotel Pumerai, from our rooms and pool to dining and coastal surroundings."
        id="gallery-page-heading"
      />
      <h2 className="sr-only">Hotel Pumerai photo gallery</h2>
      <GallerySection isStandalonePage={true} />
    </main>
  );
}
