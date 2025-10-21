"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DotWave = () => {
  const containerRef = useRef(null);
  const dotsRef = useRef([]);
  const timelineRef = useRef(null); // 🟢 NEW: Ref to hold the pre-initialized timeline

  useEffect(() => {
    if (typeof window === "undefined") return;

    const container = containerRef.current;
    const dots = dotsRef.current.filter(Boolean);
    if (!container || dots.length === 0) return;

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

      const ySetters = dots.map((dot) => gsap.quickSetter(dot, "y", "px"));

      const updateWave = () => {
        phase += speed;
        if (amplitude < maxAmplitude) amplitude += 0.2;
        if (speed < 0.05) speed += 0.001;

        ySetters.forEach((setY, i) => {
          const yOffset = Math.sin(phase + i * wavelength) * amplitude;
          setY(yOffset);
        });
      };

      // 🎯 FIX 1: Initializing the timeline here, immediately, when the component mounts.
      const tl = gsap.timeline({
        paused: true, // Start paused
        onComplete: () => {
          // This starts the continuous wave AFTER the initial movement completes
          waveUpdate = updateWave;
          gsap.ticker.add(waveUpdate);
        },
      });

      tl.to(dots, {
        x: (i) => (i - 2) * 32,
        duration: 1.2,
        ease: "power2.out",
        stagger: { amount: 0.3, from: "center" },
      });

      timelineRef.current = tl; // Store the timeline for later use

      const trigger = ScrollTrigger.create({
        trigger: container,
        start: "top 70%",
        once: true,
        // 🎯 FIX 2: The onEnter callback is now instantaneous, simply playing the pre-initialized animation.
        onEnter: () => {
          if (timelineRef.current) {
            timelineRef.current.play(0); // Play from the start (time 0)
          }
        },
      });

      // Cleanup
      return () => {
        trigger.kill();
        if (waveUpdate) {
          gsap.ticker.remove(waveUpdate);
        }
      };
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (timelineRef.current) {
        timelineRef.current.kill();
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
