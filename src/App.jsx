import { useEffect, useState, useRef } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import BookingBar from "./components/BookingBar.jsx";
import MobileQuickActions from "./components/MobileQuickActions.jsx";
import RoomsPage from "./components/RoomsPage.jsx";
import DiningPage from "./components/DiningPage.jsx";
import GalleryPage from "./components/GalleryPage.jsx";
import LocationPage from "./components/LocationPage.jsx";
import ContactPage from "./components/ContactPage.jsx";
import FAQPage from "./components/FAQPage.jsx";
import BanquetPage from "./components/BanquetPage.jsx";
import PrivacyPage from "./components/PrivacyPage.jsx";
import CancellationPage from "./components/CancellationPage.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";
import SEOHead from "./components/SEOHead.jsx";
import HeroSequence from "./sections/HeroSequence.jsx";
import About from "./sections/About.jsx";
import RoomsPreview from "./sections/RoomsPreview.jsx";
import PoolBand from "./sections/PoolBand.jsx";
import PickASide from "./sections/PickASide.jsx";
import InsideHotelSlider from "./sections/InsideHotelSlider.jsx";
import HotelAreas from "./sections/HotelAreas.jsx";
import InAndAround from "./sections/InAndAround.jsx";
import TrustReviews from "./sections/TrustReviews.jsx";
import WebsiteLoader from "./components/WebsiteLoader.jsx";
import DirectBookingPopup from "./components/DirectBookingPopup.jsx";
import { useSectionReveals } from "./hooks/useSectionReveals.js";
import { useImageDropReveal } from "./hooks/useImageDropReveal.js";
import { initAnalytics } from "./utils/analytics.js";

const routes = new Set([
  "/",
  "/rooms",
  "/dining",
  "/banquet",
  "/gallery",
  "/location",
  "/contact",
  "/faq",
  "/privacy",
  "/cancellation",
  "/404",
]);

function normalizePath(path) {
  if (!path) return "/";
  const trimmed = path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
  return routes.has(trimmed) ? trimmed : "/404";
}

function HomePage({ onNavigate }) {
  return (
    <main id="main-content">
      <HeroSequence onNavigate={onNavigate} />
      <BookingBar isHomeSection={true} />
      <About />
      <RoomsPreview onNavigate={onNavigate} />
      <PoolBand />
      <PickASide onNavigate={onNavigate} />
      <InsideHotelSlider onNavigate={onNavigate} />
      <HotelAreas />
      <InAndAround />
      <TrustReviews />
    </main>
  );
}

function App({ initialPath = "/" }) {
  const [path, setPath] = useState(() =>
    typeof window !== "undefined" ? normalizePath(window.location.pathname) : normalizePath(initialPath)
  );
  const [pendingSection, setPendingSection] = useState(null);

  useSectionReveals();
  useImageDropReveal(path);

  const isPopStateRef = useRef(false);

  useEffect(() => {
    initAnalytics();

    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const onPopState = () => {
      isPopStateRef.current = true;
      setPath(normalizePath(window.location.pathname));
      setPendingSection(null);
    };

    const onHashChange = () => {
      const h = window.location.hash ? window.location.hash.slice(1) : null;
      if (h) {
        const target = document.getElementById(h);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    window.addEventListener("popstate", onPopState);
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Back/forward navigation: allow browser to retain its position
    if (isPopStateRef.current) {
      isPopStateRef.current = false;
      return;
    }

    const hash = window.location.hash ? window.location.hash.slice(1) : null;
    const targetSection = pendingSection || hash;

    if (targetSection) {
      let attempts = 0;
      const isInitialHash = !pendingSection && !!hash;
      const tryScroll = () => {
        const target = document.getElementById(targetSection);
        if (target) {
          target.scrollIntoView({
            behavior: isInitialHash ? "auto" : "smooth",
            block: "start",
          });
          if (isInitialHash) {
            setTimeout(() => {
              const currentTop = target.getBoundingClientRect().top;
              if (Math.abs(currentTop) > 120) {
                target.scrollIntoView({ behavior: "auto", block: "start" });
              }
            }, 650);
          }
        } else if (attempts < 6) {
          attempts += 1;
          setTimeout(tryScroll, 100);
        } else {
          window.scrollTo({ top: 0, behavior: "auto" });
        }
      };

      window.requestAnimationFrame(tryScroll);
      return;
    }

    // Fresh visit or route change without hash or pendingSection: always start at top
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [path, pendingSection]);

  const navigate = ({ route, section }) => {
    const nextPath = normalizePath(route);
    if (typeof window !== "undefined" && window.location.pathname !== nextPath) {
      window.history.pushState({}, "", nextPath);
    }

    setPath(nextPath);
    setPendingSection(section || null);
  };

  const page =
    path === "/rooms" ? (
      <RoomsPage />
    ) : path === "/dining" ? (
      <DiningPage onNavigate={navigate} />
    ) : path === "/banquet" ? (
      <BanquetPage onNavigate={navigate} />
    ) : path === "/gallery" ? (
      <GalleryPage />
    ) : path === "/location" ? (
      <LocationPage />
    ) : path === "/contact" ? (
      <ContactPage />
    ) : path === "/faq" ? (
      <FAQPage onNavigate={navigate} />
    ) : path === "/privacy" ? (
      <PrivacyPage />
    ) : path === "/cancellation" ? (
      <CancellationPage />
    ) : path === "/404" ? (
      <NotFoundPage onNavigate={navigate} />
    ) : (
      <HomePage onNavigate={navigate} />
    );

  const isHomeOrFaq = path === "/" || path === "/faq";

  return (
    <>
      <WebsiteLoader />
      <SEOHead path={path} />
      <div className="site-wrapper">
        <Header currentPath={path} onNavigate={navigate} />
        {!isHomeOrFaq && <BookingBar />}
        {page}
        <Footer onNavigate={navigate} currentPath={path} />
        <MobileQuickActions />
        <DirectBookingPopup currentPath={path} onNavigate={navigate} />
      </div>
    </>
  );
}

export default App;
