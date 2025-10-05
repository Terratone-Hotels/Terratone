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
      const maxAmplitude = 60; // full wave height
      const wavelength = 0.9; // distance between dots
      let amplitude = 0; // starts small
      let phase = 0;
      let speed = 0.02; // initial slow speed
      let animating = false;

      gsap.set(dots, { opacity: 1, y: 0 });

      const animateWave = () => {
        if (!animating) return;
        phase += speed;

        // gradual ramp-up for amplitude + speed (gentle start)
        if (amplitude < maxAmplitude) amplitude += 0.3;
        if (speed < 0.05) speed += 0.001;

        dots.forEach((dot, i) => {
          const yOffset = Math.sin(phase + i * wavelength) * amplitude;
          gsap.to(dot, {
            y: yOffset,
            duration: 0.4,
            ease: "sine.inOut",
          });
        });
        requestAnimationFrame(animateWave);
      };

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 65%",
        once: true,
        onEnter: () => {
          animating = true;

          gsap.to(dots, {
            y: (i) => Math.sin(i * wavelength) * maxAmplitude * 0.3,
            duration: 1.8,
            ease: "sine.inOut",
          });
          animateWave();
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-12 w-40 mx-auto mb-8 flex items-center justify-between"
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
