"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export let globalLenis = null;

export default function SmoothScrollWrapper({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.08,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: true,
      touchMultiplier: 1.2,
    });

    globalLenis = lenis;

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      globalLenis = null;
    };
  }, []);

  return <div data-lenis-root>{children}</div>;
}
