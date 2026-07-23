"use client";

import { createContext, useContext, useEffect, useRef, useMemo } from "react";

const LenisContext = createContext(null);

export const useLenisControl = () => useContext(LenisContext);

/**
 * Skip Lenis on mobile / touch / reduced-motion.
 * Native scroll is cheaper and avoids a permanent GSAP ticker (helps mobile TBT).
 */
function shouldSkipLenis() {
  if (typeof window === "undefined") return true;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.matchMedia("(max-width: 768px)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    .matches;
  return coarse || narrow || reduceMotion;
}

function waitForIdle() {
  return new Promise((resolve) => {
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(() => resolve(), { timeout: 2000 });
    } else {
      window.setTimeout(resolve, 1);
    }
  });
}

export default function LenisScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Mobile / touch / a11y: native scroll only — no Lenis, no GSAP ticker.
    if (shouldSkipLenis()) {
      lenisRef.current = null;
      return;
    }

    let cancelled = false;
    let cleanup = () => {};

    (async () => {
      // Desktop: wait past first paint / idle so Lenis+GSAP parse+init
      // is not in the early TBT window.
      await waitForIdle();
      if (cancelled) return;

      // Dynamic import — packages are not evaluated until this point.
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      // smoothTouch intentionally omitted — Lenis's own docs advise against it;
      // it decouples scroll from the finger and reads as laggy, not smoother.
      const lenis = new Lenis({
        duration: 1,
        // lerp: 0.08,
      });

      lenisRef.current = lenis;

      // Let ScrollTrigger know the instant Lenis moves, so scroll-linked
      // timelines never read a stale position relative to what's painted.
      lenis.on("scroll", ScrollTrigger.update);

      // Drive Lenis from GSAP's own ticker instead of a second, independent
      // rAF loop — the two loops firing unordered within the same frame was
      // the main source of the stutter on anything scroll-linked.
      const update = (time) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(update);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(update);
        lenis.destroy();
        lenisRef.current = null;
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  // avoid re-renders by memoizing context values
  const ctxValue = useMemo(
    () => ({
      stopScroll: () => lenisRef.current?.stop(),
      startScroll: () => lenisRef.current?.start(),
      lenis: lenisRef.current,
    }),
    [],
  );

  return (
    <LenisContext.Provider value={ctxValue}>{children}</LenisContext.Provider>
  );
}
