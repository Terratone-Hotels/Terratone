"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DotWave = () => {
  const containerRef = useRef(null);
  const dotsRef = useRef([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const container = containerRef.current;
    const dots = dotsRef.current.filter(Boolean);
    if (!container || dots.length === 0) return;

    // Run after one animation frame to let GSAP & DOM hydrate
    const rafId = requestAnimationFrame(() => {
      const maxAmplitude = 60;
      const wavelength = 0.9;
      let amplitude = 0;
      let phase = 0;
      let speed = 0.02;
      let animating = false;

      gsap.set(dots, {
        x: 0,
        y: 0,
        opacity: 1,
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
      });

      const animateWave = () => {
        if (!animating) return;
        phase += speed;
        if (amplitude < maxAmplitude) amplitude += 0.3;
        if (speed < 0.05) speed += 0.001;

        dots.forEach((dot, i) => {
          const yOffset = Math.sin(phase + i * wavelength) * amplitude;
          gsap.to(dot, { y: yOffset, duration: 0.5, ease: "sine.inOut" });
        });

        requestAnimationFrame(animateWave);
      };

      // ✅ Create ScrollTrigger safely
      const trigger = ScrollTrigger.create({
        trigger: container,
        start: "top 70%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({
            onComplete: () => {
              animating = true;
              animateWave();
            },
          });

          tl.to(dots, {
            x: (i) => (i - 2) * 32,
            duration: 1.2,
            ease: "power2.out",
            stagger: { amount: 0.3, from: "center" },
          });
        },
      });

      // 🩹 Force ScrollTrigger to sync after DOM settles
      setTimeout(() => ScrollTrigger.refresh(), 200);

      // Cleanup
      return () => trigger.kill();
    });

    return () => {
      cancelAnimationFrame(rafId);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-12 w-60 mx-auto mb-8">
      {["#977161", "#996353", "#5B554C", "#857161", "#AF9381"].map(
        (color, i) => (
          <span
            key={i}
            ref={(el) => (dotsRef.current[i] = el)}
            className="w-2 h-2 rounded-full inline-block"
            style={{ backgroundColor: color }}
          />
        )
      )}
    </div>
  );
};

export default DotWave;
