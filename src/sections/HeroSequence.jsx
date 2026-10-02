import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO_FRAME_COUNT, heroFramePath } from "../utils/frames.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";

gsap.registerPlugin(ScrollTrigger);

const mobileInteriorScenes = [
  {
    id: "scene-rooms",
    title: "Premium Rooms & Grand Lobby",
    left: {
      label: "Premium Room",
      sub: "Coastal Elegance",
      image: "/rooms/premium-room/ChatGPT Image Sep 25, 2026, 02_03_35 AM_result.webp",
      alt: "Hotel Pumerai Premium Room interior",
    },
    right: {
      label: "Grand Lobby",
      sub: "Warm Hospitality",
      image: "/gallery/ChatGPT Image Sep 26, 2026, 12_23_24 AM_result.webp",
      alt: "Hotel Pumerai Grand Lobby reception area",
    },
  },
  {
    id: "scene-dining",
    title: "Reception & Matsya Seafood",
    left: {
      label: "24h Reception",
      sub: "Always Welcoming",
      image: "/gallery/ChatGPT Image Sep 26, 2026, 12_23_28 AM_result.webp",
      alt: "Hotel Pumerai 24-hour reception desk",
    },
    right: {
      label: "Matsya Restaurant",
      sub: "Seafood & Coastal Bar",
      image: "/dining/_DSC0222_result.webp",
      alt: "Matsya Seafood & Bar dining restaurant at Hotel Pumerai",
    },
  },
  {
    id: "scene-suites",
    title: "Madhura Veg & Suites",
    left: {
      label: "Madhura Dining",
      sub: "Pure Vegetarian",
      image: "/dining/_DSC0247_result.webp",
      alt: "Madhura Pure Vegetarian Restaurant dining area",
    },
    right: {
      label: "Executive Suite",
      sub: "Spacious Living",
      image: "/rooms/suite-room/ChatGPT Image Sep 25, 2026, 02_56_20 AM_result.webp",
      alt: "Hotel Pumerai Executive Suite bedroom and living",
    },
  },
  {
    id: "scene-leisure",
    title: "Rooftop Pool & Club Balcony",
    left: {
      label: "Rooftop Pool",
      sub: "Skyline Views",
      image: "/gallery/ChatGPT Image Sep 26, 2026, 12_22_46 AM_result.webp",
      alt: "Glass-edge rooftop swimming pool at Hotel Pumerai",
    },
    right: {
      label: "Balcony Room",
      sub: "Tropical Breezes",
      image: "/rooms/club-room-with-balcony/ChatGPT Image Sep 24, 2026, 09_22_33 PM_result.webp",
      alt: "Club room with private balcony at Hotel Pumerai",
    },
  },
];

function MobileHeroPresentation({ isReady }) {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSceneIndex((current) => (current + 1) % mobileInteriorScenes.length);
    }, 4600);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`hero-mobile-presentation ${isReady ? "is-visible" : ""}`}
      aria-label="Hotel Pumerai mobile property and interiors showcase"
    >
      <div className="hero-mobile-backdrop" />
      <div className="hero-mobile-stage">
        {/* Main Anchor: Hotel Pumerai Exterior Property (Always dominant visual focus) */}
        <div className="hero-mobile-main-card">
          <div className="hero-mobile-main-media">
            <img
              src="/gallery/ChatGPT Image Sep 26, 2026, 12_23_21 AM_result.webp"
              alt="Hotel Pumerai exterior building and main property on NH-66 Honnavar"
              className="hero-mobile-exterior-img"
              loading="eager"
            />
            <div className="hero-mobile-main-overlay" />
            <div className="hero-mobile-main-badge">
              <span className="hero-mobile-badge-dot" />
              <span className="hero-mobile-badge-text">HOTEL PUMERAI &bull; EXTERIOR</span>
            </div>
            <div className="hero-mobile-main-pill">
              <span>NH-66 HONNAVAR</span>
            </div>
          </div>
        </div>

        {/* Supporting Secondary Transitions: Hotel Interiors (Flanking/beneath exterior) */}
        <div className="hero-mobile-supporting-wrap" aria-label="Hotel Pumerai interior highlights">
          {mobileInteriorScenes.map((scene, idx) => {
            const isActive = idx === activeSceneIndex;
            return (
              <div
                key={scene.id}
                className={`hero-mobile-scene-pair ${isActive ? "is-active" : ""}`}
                aria-hidden={!isActive}
              >
                <div className="hero-mobile-sub-card card-left">
                  <img
                    src={scene.left.image}
                    alt={scene.left.alt}
                    className="hero-mobile-sub-img"
                    loading="lazy"
                  />
                  <div className="hero-mobile-sub-overlay" />
                  <div className="hero-mobile-sub-meta">
                    <span className="hero-mobile-sub-title">{scene.left.label}</span>
                    <span className="hero-mobile-sub-desc">{scene.left.sub}</span>
                  </div>
                </div>
                <div className="hero-mobile-sub-card card-right">
                  <img
                    src={scene.right.image}
                    alt={scene.right.alt}
                    className="hero-mobile-sub-img"
                    loading="lazy"
                  />
                  <div className="hero-mobile-sub-overlay" />
                  <div className="hero-mobile-sub-meta">
                    <span className="hero-mobile-sub-title">{scene.right.label}</span>
                    <span className="hero-mobile-sub-desc">{scene.right.sub}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sub-scene Indicators */}
        <div className="hero-mobile-pips" role="tablist" aria-label="Hotel interior spaces">
          {mobileInteriorScenes.map((scene, idx) => (
            <button
              key={scene.id}
              type="button"
              className={`hero-mobile-pip ${idx === activeSceneIndex ? "is-active" : ""}`}
              onClick={() => setActiveSceneIndex(idx)}
              aria-label={`View ${scene.title}`}
              role="tab"
              aria-selected={idx === activeSceneIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function drawContainedImage(ctx, image, canvas, fit = "cover") {
  const pixelWidth = canvas.width;
  const pixelHeight = canvas.height;
  const ratio =
    fit === "contain"
      ? Math.min(pixelWidth / image.naturalWidth, pixelHeight / image.naturalHeight)
      : Math.max(pixelWidth / image.naturalWidth, pixelHeight / image.naturalHeight);
  const width = image.naturalWidth * ratio;
  const height = image.naturalHeight * ratio;
  const x = (pixelWidth - width) / 2;
  const y = (pixelHeight - height) / 2;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.clearRect(0, 0, pixelWidth, pixelHeight);
  ctx.drawImage(image, x, y, width, height);
}

export default function HeroSequence({ onNavigate }) {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const pinRef = useRef(null);
  const imagesRef = useRef([]);
  const activeFrameRef = useRef(0);
  const rafRef = useRef(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const progress = useMemo(() => {
    return Math.round(((loadedCount + failedCount) / HERO_FRAME_COUNT) * 100);
  }, [loadedCount, failedCount]);

  const renderFrame = (frameIndex) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const images = imagesRef.current;
    const image =
      images[frameIndex] ||
      images.find((candidate, index) => index <= frameIndex && candidate) ||
      images.find(Boolean);

    if (!canvas || !context || !image) {
      return;
    }

    window.cancelAnimationFrame(rafRef.current);
    rafRef.current = window.requestAnimationFrame(() => {
      drawContainedImage(context, image, canvas, "cover");
    });
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const wrapper = pinRef.current;
    if (!canvas || !wrapper) {
      return;
    }

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, wrapper.clientWidth);
    const height = Math.max(1, wrapper.clientHeight);

    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    renderFrame(activeFrameRef.current);
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsReady(true);
      return undefined;
    }

    let isCancelled = false;
    let nextIndex = 0;
    let loaded = 0;
    let failed = 0;
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

    if (isMobile) {
      // Fast-path for mobile: immediately ready, loads first frame as canvas backup
      setIsReady(true);
      const image = new Image();
      image.decoding = "async";
      image.onload = () => {
        if (!isCancelled) {
          imagesRef.current[0] = image;
          setLoadedCount(1);
          resizeCanvas();
        }
      };
      image.src = heroFramePath(1);
      return () => {
        isCancelled = true;
      };
    }

    const concurrentLoads = 8;

    const loadFrame = (index) =>
      new Promise((resolve) => {
        const image = new Image();
        image.decoding = "async";
        image.onload = () => {
          imagesRef.current[index] = image;
          loaded += 1;
          if (!isCancelled) {
            setLoadedCount(loaded);
            if (index === 0) {
              resizeCanvas();
            }
            if (loaded >= 36 || loaded + failed === HERO_FRAME_COUNT) {
              setIsReady(true);
            }
          }
          resolve();
        };
        image.onerror = () => {
          failed += 1;
          if (!isCancelled) {
            setFailedCount(failed);
            if (loaded >= 1 || loaded + failed === HERO_FRAME_COUNT) {
              setIsReady(true);
            }
          }
          resolve();
        };
        image.src = heroFramePath(index + 1);
      });

    const worker = async () => {
      while (!isCancelled && nextIndex < HERO_FRAME_COUNT) {
        const index = nextIndex;
        nextIndex += 1;
        await loadFrame(index);
      }
    };

    Array.from({ length: concurrentLoads }, worker);

    return () => {
      isCancelled = true;
      window.cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [prefersReducedMotion]);

  useLayoutEffect(() => {
    if (!isReady || prefersReducedMotion || loadedCount === 0) {
      return undefined;
    }

    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      // On mobile, the hero uses the smooth auto-cycling presentation and natural scroll
      return undefined;
    }

    const scrollDistance = "+=340%";

    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: heroRef.current,
        pin: pinRef.current,
        start: "top top",
        end: scrollDistance,
        scrub: 0.45,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const nextFrame = Math.min(
            HERO_FRAME_COUNT - 1,
            Math.max(0, Math.round(self.progress * (HERO_FRAME_COUNT - 1))),
          );

          if (nextFrame !== activeFrameRef.current) {
            activeFrameRef.current = nextFrame;
            renderFrame(nextFrame);
          }
        },
      });
    }, heroRef);

    ScrollTrigger.refresh();
    return () => context.revert();
  }, [isReady, loadedCount, prefersReducedMotion]);

  const handleOpenBookingModal = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("pumerai:open-booking"));
  };

  const handleScrollTo = (event, targetId) => {
    event.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (prefersReducedMotion) {
    return (
      <section className="hero hero-static" id="home" aria-label="Hotel Pumerai Honnavar">
        <img
          src={heroFramePath(1)}
          alt="Hotel Pumerai premium 3-star property on NH-66 Honnavar Karnataka"
          className="hero-static-img"
        />
        <MobileHeroPresentation isReady={true} />
        <div className="hero-right-headline is-visible" aria-label="Explore Honnavar, Experience HOTEL PUMERAI">
          <span className="hero-right-line-lead">Explore Honnavar,</span>
          <span className="hero-right-line-brand">Experience HOTEL PUMERAI</span>
        </div>
      </section>
    );
  }

  return (
    <section className="hero" id="home" ref={heroRef} aria-label="Hotel Pumerai Honnavar">
      <div className="hero-pin" ref={pinRef}>
        <canvas ref={canvasRef} aria-label="Interactive 240-frame sequence through Hotel Pumerai on NH-66" />

        {/* Mobile-Only Dynamic Image Presentation Layer (Desktop locked & untouched) */}
        <MobileHeroPresentation isReady={isReady} />

        {!isReady && (
          <div className="loading-screen" aria-live="polite">
            <p className="loading-logo">HOTEL PUMERAI</p>
            <span className="loading-caption">
              Honnavar, Karnataka &bull; NH-66 Near Ramateertha Cross
            </span>
            <div className="loading-track">
              <i style={{ width: `${progress}%` }} />
            </div>
            <small>{progress}%</small>
          </div>
        )}

        {isReady && loadedCount === 0 && (
          <div className="fallback-message">
            <p className="loading-logo">HOTEL PUMERAI</p>
            <span>Welcome to Hotel Pumerai, Honnavar. Explore rooms and dining below.</span>
          </div>
        )}

        {/* Right-side Hero Headline as specified in HP.pdf */}
        <div className={`hero-right-headline ${isReady ? "is-visible" : ""}`} aria-label="Explore Honnavar, Experience HOTEL PUMERAI">
          <span className="hero-right-line-lead">Explore Honnavar,</span>
          <span className="hero-right-line-brand">Experience HOTEL PUMERAI</span>
        </div>

        <div className="scroll-cue" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  );
}
