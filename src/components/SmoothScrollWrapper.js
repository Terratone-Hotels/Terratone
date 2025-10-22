"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrollWrapper({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // slightly slower for fluid motion
      lerp: 0.08, // smaller lerp = smoother interpolation
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential easeOut
      smoothTouch: true, // improves mobile smoothness
      touchMultiplier: 1.2,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <div data-lenis-root>{children}</div>;
}
