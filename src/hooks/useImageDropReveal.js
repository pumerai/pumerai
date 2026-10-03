import { useEffect } from "react";

/**
 * useImageDropReveal — CozyStay drop-down scroll reveal observer.
 *
 * Fail-safe architecture:
 * 1. Images and wrappers are VISIBLE by default in CSS.
 * 2. Start state applies ONLY when <html> has .js-reveal AND the element has .reveal-pending.
 * 3. Observes the WRAPPER (fixed aspect-ratio / explicit height), never the <img> itself.
 * 4. Safety net: 1500ms timeout after mount reveals any element within/above viewport.
 * 5. Global safety net: 4000ms timeout reveals everything, unconditionally.
 * 6. If IntersectionObserver is unavailable or prefers-reduced-motion is true: reveal all immediately.
 * 7. On image error: reveal wrapper background with warning, never leave an empty hole.
 */
export function useImageDropReveal(path) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // If IntersectionObserver is not supported or reduced motion is preferred:
    // Ensure all images stay visible without hidden start states.
    if (!("IntersectionObserver" in window) || prefersReduced) {
      document.documentElement.classList.remove("js-reveal");
      document.querySelectorAll(".reveal-pending").forEach((el) => {
        el.classList.remove("reveal-pending");
      });
      return;
    }

    // Enable JS reveal styling
    document.documentElement.classList.add("js-reveal");

    const isInnerPage = window.location.pathname !== "/";
    const viewportHeight = window.innerHeight;

    // Helper to reveal an image safely
    const revealTarget = (img) => {
      if (!img || !img.classList.contains("reveal-pending")) return;
      img.classList.add("is-animating");
      img.classList.remove("reveal-pending");

      const onEnd = (e) => {
        if (e.target === img) {
          img.classList.remove("is-animating");
          img.removeEventListener("transitionend", onEnd);
        }
      };
      img.addEventListener("transitionend", onEnd);
      setTimeout(() => img.classList.remove("is-animating"), 1200);
    };

    // Find all images with .reveal-drop
    const images = Array.from(document.querySelectorAll(".reveal-drop"));
    const wrappersToObserve = new Map();

    images.forEach((img) => {
      // Error fallback: reveal immediately and log warning
      img.addEventListener(
        "error",
        () => {
          img.classList.remove("reveal-pending");
          console.warn("Hotel Pumerai: Image failed to load:", img.src || img.currentSrc);
        },
        { once: true }
      );

      // Check if image is already revealed
      if (!img.classList.contains("reveal-pending") && img.dataset.revealInitialized) {
        return;
      }
      img.dataset.revealInitialized = "true";

      const rect = img.getBoundingClientRect();

      // Inner page first screen: show normally, never blank
      if (isInnerPage && rect.top < viewportHeight) {
        img.classList.remove("reveal-pending");
        return;
      }

      // Add .reveal-pending to start hidden
      img.classList.add("reveal-pending");

      // Find the parent WRAPPER (which has explicit height or aspect-ratio)
      const wrapper =
        img.closest(
          ".pool-band-section, .room-preview-figure, .room-media-box, .area-image-frame, .about-primary-frame, .about-secondary-frame, .ihs-slide-image-frame, .pas-image-frame, .banquet-main-frame, .venue-figure, .gallery-figure"
        ) || img.parentElement;

      if (wrapper) {
        if (!wrappersToObserve.has(wrapper)) {
          wrappersToObserve.set(wrapper, []);
        }
        wrappersToObserve.get(wrapper).push(img);
      } else {
        // Fallback: reveal immediately if no wrapper found
        img.classList.remove("reveal-pending");
      }
    });

    // Create IntersectionObserver for the WRAPPERS
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const wrapper = entry.target;
            observer.unobserve(wrapper);
            const imgs = wrappersToObserve.get(wrapper) || [];
            imgs.forEach(revealTarget);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    wrappersToObserve.forEach((_, wrapper) => {
      observer.observe(wrapper);
    });

    // Safety net 1: 1500ms after mount, reveal any pending element within or above viewport
    const safety1500 = setTimeout(() => {
      const pending = document.querySelectorAll(".reveal-drop.reveal-pending");
      const vh = window.innerHeight;
      pending.forEach((img) => {
        const r = img.getBoundingClientRect();
        if (r.top <= vh) {
          revealTarget(img);
        }
      });
    }, 1500);

    // Safety net 2: 4000ms global timeout reveals EVERYTHING unconditionally
    const safety4000 = setTimeout(() => {
      const pending = document.querySelectorAll(".reveal-drop.reveal-pending");
      pending.forEach((img) => {
        revealTarget(img);
      });
    }, 4000);

    return () => {
      clearTimeout(safety1500);
      clearTimeout(safety4000);
      observer.disconnect();
    };
  }, [path]);
}
