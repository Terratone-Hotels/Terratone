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

    // A variable to hold our ticker function for cleanup
    let waveUpdate;

    const rafId = requestAnimationFrame(() => {
      const maxAmplitude = 20;
      const wavelength = 0.9;
      let amplitude = 0;
      let phase = 0;
      let speed = 0.02;

      gsap.set(dots, {
        x: 0,
        y: 0,
        opacity: 1,
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
      });

      // ✅ STEP 1: Create highly performant "quickSetters" for each dot's y property.
      const ySetters = dots.map((dot) => gsap.quickSetter(dot, "y", "px"));

      // ✅ STEP 2: Define the update logic that will run on every frame.
      // This replaces the old `animateWave` function.
      const updateWave = () => {
        phase += speed;
        if (amplitude < maxAmplitude) amplitude += 0.2;
        if (speed < 0.05) speed += 0.001;

        ySetters.forEach((setY, i) => {
          const yOffset = Math.sin(phase + i * wavelength) * amplitude;
          // Use the quickSetter to update the y position. No new tweens are created.
          setY(yOffset);
        });
      };

      const trigger = ScrollTrigger.create({
        trigger: container,
        start: "top 70%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({
            onComplete: () => {
              // ✅ STEP 3: Add the update function to GSAP's core ticker.
              // This starts the continuous, performant wave animation.
              waveUpdate = updateWave; // Assign to outer variable for cleanup
              gsap.ticker.add(waveUpdate);
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

      // ✅ STEP 4: The forced refresh is removed as it can cause its own stutter.
      // setTimeout(() => ScrollTrigger.refresh(), 200);

      // Cleanup
      return () => {
        trigger.kill();
        // ✅ STEP 5: Make sure to remove the function from the ticker on cleanup.
        if (waveUpdate) {
          gsap.ticker.remove(waveUpdate);
        }
      };
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (waveUpdate) {
        gsap.ticker.remove(waveUpdate);
      }
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
