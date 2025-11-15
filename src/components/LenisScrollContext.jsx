"use client";

import { createContext, useContext, useEffect, useRef, useMemo } from "react";
import Lenis from "lenis";

const LenisContext = createContext(null);

export const useLenisControl = () => useContext(LenisContext);

export default function LenisScrollProvider({ children }) {
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.08,
      smoothTouch: true,
    });

    lenisRef.current = lenis;

    // RAF loop
    const raf = (time) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafRef.current);
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
    []
  );

  return (
    <LenisContext.Provider value={ctxValue}>{children}</LenisContext.Provider>
  );
}
