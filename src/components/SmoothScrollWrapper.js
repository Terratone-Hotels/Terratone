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

    // --- FIX FOR BROWSER BACK BUTTON ---
    const handlePopState = () => {
      // 1. Force ScrollTrigger to refresh its positions based on the current DOM state
      ScrollTrigger.refresh(true);

      // 2. Explicitly tell Lenis to scroll to the top (or the position stored by the browser)
      // Lenis needs to be made aware of the restoration. Scrolling to the top is the safest default.
      lenis.scrollTo(0, { immediate: true });
    };

    // Listen for the page restoration event (when navigating back)
    window.addEventListener("popstate", handlePopState);

    // Also, force a refresh on initial load to handle cases where components load slowly.
    ScrollTrigger.refresh(true);

    // Cleanup function
    return () => {
      lenis.destroy();
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return <div data-lenis-root>{children}</div>;
}
