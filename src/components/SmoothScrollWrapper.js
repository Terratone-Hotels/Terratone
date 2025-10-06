"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollWrapper({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // slightly slower for fluid motion
      lerp: 0.08, // small lerp value = smoother transition
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential easeOut
      smoothTouch: true, // smoother mobile feel
      touchMultiplier: 1.2,
    });

    // Keep ScrollTrigger synced with Lenis scroll position
    lenis.on("scroll", ScrollTrigger.update);

    // GSAP’s requestAnimationFrame hook
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <div data-lenis-root>{children}</div>;
}
