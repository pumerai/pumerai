import { useEffect } from "react";

/**
 * useImageDropReveal — Drop-down scroll reveal observer for content images.
 * Adds .js-reveal to <html> so start state applies safely.
 * Observes .reveal-drop elements with threshold 0.15 and rootMargin "0px 0px -8% 0px".
 * Unobserves on reveal (play once only).
 * Adds will-change: transform, opacity, clip-path only while animating, then cleans up.
 * Reveals first-screen inner-page images immediately so pages never look blank.
 */
export function useImageDropReveal(path) {
  useEffect(() => {
    // If IntersectionObserver is not supported, do not add .js-reveal so all images stay visible
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    // Add .js-reveal to documentElement to enable progressive enhancement styles
    document.documentElement.classList.add("js-reveal");

    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Small delay to ensure the current route's DOM is mounted
    const timer = setTimeout(() => {
      const candidates = Array.from(
        document.querySelectorAll(".reveal-drop:not(.is-revealed)")
      );
      if (!candidates.length) return;

      const isInnerPage = window.location.pathname !== "/";
      const viewportHeight = window.innerHeight;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target;
              observer.unobserve(el);

              if (prefersReduced) {
                el.classList.add("is-revealed");
                return;
              }

              el.classList.add("is-animating");
              el.classList.add("is-revealed");

              const cleanup = (e) => {
                if (e.target === el) {
                  el.classList.remove("is-animating");
                  el.removeEventListener("transitionend", cleanup);
                }
              };

              el.addEventListener("transitionend", cleanup);

              // Failsafe cleanup for will-change
              setTimeout(() => {
                el.classList.remove("is-animating");
              }, 1200);
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: "0px 0px -8% 0px",
        }
      );

      candidates.forEach((el) => {
        // Any image visible in the first screen of an inner page shows normally
        if (isInnerPage) {
          const rect = el.getBoundingClientRect();
          if (rect.top < viewportHeight) {
            el.classList.add("reveal-immediate");
            el.classList.add("is-revealed");
            return;
          }
        }

        observer.observe(el);
      });

      return () => {
        observer.disconnect();
      };
    }, 50);

    return () => clearTimeout(timer);
  }, [path]);
}
