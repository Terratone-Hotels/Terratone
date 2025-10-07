"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DotWave = () => {
  const containerRef = useRef(null);
  const dotsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const dots = dotsRef.current;
      const maxAmplitude = 60;
      const wavelength = 0.9;
      let amplitude = 0;
      let phase = 0;
      let speed = 0.02;
      let animating = false;

      // Start stacked in center
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

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 70%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({
            onComplete: () => {
              animating = true;
              animateWave();
            },
          });

          // 🌟 Increased gap between dots
          tl.to(dots, {
            x: (i) => (i - 2) * 32, // was 16 → now 32 for more spacing
            duration: 1.2,
            ease: "power2.out",
            stagger: {
              amount: 0.3,
              from: "center",
            },
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-12 w-60 mx-auto mb-8" // ⬅️ wider container
    >
      {["#977161", "#996353", "#5B554C", "#857161", "#AF9381"].map(
        (color, i) => (
          <span
            key={i}
            ref={(el) => (dotsRef.current[i] = el)}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: color }}
          />
        )
      )}
    </div>
  );
};

export default DotWave;
