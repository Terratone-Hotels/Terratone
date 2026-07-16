"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export default function PageLoader({ shouldWipe, onRevealed }) {
  const curtainRef = useRef(null);
  const logoLeftRef = useRef(null);
  const logoRightRef = useRef(null);
  const introTlRef = useRef(null);

  // Logo fly-in + rotate hold — plays immediately, independent of asset readiness.
  useLayoutEffect(() => {
    const curtain = curtainRef.current;
    const left = logoLeftRef.current;
    const right = logoRightRef.current;
    if (!curtain || !left || !right) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    gsap.set(curtain, { yPercent: 0, display: "flex", opacity: 1 });

    if (reduceMotion) {
      gsap.set([left, right], { opacity: 1, xPercent: 0, rotate: 25 });
      introTlRef.current = gsap.timeline();
    } else {
      gsap.set([left, right], {
        opacity: 0,
        xPercent: (i) => (i === 0 ? -400 : 400),
        rotate: 0,
      });

      introTlRef.current = gsap
        .timeline({ defaults: { ease: "power4.inOut" } })
        .to([left, right], {
          opacity: 1,
          xPercent: 0,
          duration: 0.25,
          ease: "power3.out",
          stagger: 0.05,
        })
        .to([left, right], {
          duration: 0.45,
          ease: "power3.out",
          rotate: 25,
        });
    }

    return () => introTlRef.current?.kill();
  }, []);

  // Wipe — only once shouldWipe flips true AND the intro has actually finished.
  useEffect(() => {
    if (!shouldWipe) return;
    const curtain = curtainRef.current;
    if (!curtain) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const playWipe = () => {
      gsap.to(curtain, reduceMotion
        ? {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
              gsap.set(curtain, { display: "none" });
              onRevealed?.();
            },
          }
        : {
            yPercent: -100,
            duration: 0.8,
            ease: "power4.inOut",
            onComplete: () => {
              gsap.set(curtain, { display: "none" });
              onRevealed?.();
            },
          },
      );
    };

    const intro = introTlRef.current;
    if (intro && intro.progress() < 1) {
      intro.eventCallback("onComplete", playWipe);
    } else {
      playWipe();
    }
  }, [shouldWipe, onRevealed]);

  return (
    <div
      ref={curtainRef}
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
    >
      <span className="sr-only">Loading…</span>
      <div className="flex items-center justify-center space-x-6" aria-hidden="true">
        <div
          ref={logoLeftRef}
          className="w-[10px] h-[60px] md:w-[14px] md:h-[80px] bg-white opacity-0"
        />
        <div
          ref={logoRightRef}
          className="w-[10px] h-[60px] md:w-[14px] md:h-[80px] bg-white opacity-0"
        />
      </div>
    </div>
  );
}