"use client";

import { createContext, useContext, useEffect, useRef, useMemo } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext(null);

export const useLenisControl = () => useContext(LenisContext);

export default function LenisScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
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

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
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
