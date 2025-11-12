"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as Tone from "tone";

gsap.registerPlugin(ScrollTrigger);

export default function GuitarStringsPhysics() {
  const containerRef = useRef(null);
  const linesRef = useRef([]);
  const samplerRef = useRef(null);
  const audioStartedRef = useRef(false);
  const prevMouseY = useRef(null);
  const [isInteractive, setIsInteractive] = useState(false);

  const notes = ["E2", "A2", "D3", "G3", "B3", "E4"]; // standard tuning

  // --- 🔓 Global audio unlocker ---
  useEffect(() => {
    const unlockAudio = async () => {
      try {
        await Tone.start();
        console.log("🔓 Tone.js audio unlocked by user gesture");
        window.removeEventListener("mousedown", unlockAudio);
        window.removeEventListener("touchstart", unlockAudio);
      } catch (e) {
        console.warn("Tone unlock failed:", e);
      }
    };

    window.addEventListener("mousedown", unlockAudio);
    window.addEventListener("touchstart", unlockAudio);

    return () => {
      window.removeEventListener("mousedown", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };
  }, []);

  // --- Audio setup ---
  const initializeSampler = async () => {
    if (audioStartedRef.current) return;
    await Tone.start();
    const sampler = new Tone.Sampler({
      urls: {
        E2: "E2.wav",
        A2: "A2.wav",
        D3: "D3.wav",
        G3: "G3.wav",
        B3: "B3.wav",
        E4: "E4.wav",
      },
      baseUrl: "/samples/guitar/",
      onload: () => console.log("🎸 Sampler loaded"),
    }).toDestination();

    samplerRef.current = sampler;
    audioStartedRef.current = true;
  };

  // --- Play one string ---
  const handlePlayString = async (index, { strong = false } = {}) => {
    if (!audioStartedRef.current) await initializeSampler();
    if (!samplerRef.current) return;

    const note = notes[index];
    const velocity = strong ? 1 : 0.4 + Math.random() * 0.6;
    samplerRef.current.triggerAttackRelease(note, "1n", undefined, velocity);

    const lineContainer = linesRef.current[index];
    const line = lineContainer?.querySelector(".string-color-fill");
    if (!line) return;

    const amplitude = strong ? 6 : 3;

    gsap.killTweensOf(line);
    gsap.set(line, { y: 0, filter: "blur(0px)" });

    const tl = gsap.timeline();
    tl.to(line, { y: -amplitude, duration: 0.05, ease: "power1.out" })
      .to(line, {
        y: amplitude,
        duration: 0.05,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 2,
      })
      .to(line, { y: 0, duration: 0.1, ease: "elastic.out(1,0.3)" });

    gsap.fromTo(
      line,
      { filter: "blur(0.6px)" },
      { filter: "blur(0px)", duration: 0.8, ease: "power2.out" }
    );
  };

  // --- Preload audio when near viewport ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          initializeSampler();
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // --- Mouse detection (only when interactive) ---
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = async (e) => {
      if (!isInteractive) return;
      if (!audioStartedRef.current) await initializeSampler();

      const rect = container.getBoundingClientRect();
      const y = e.clientY - rect.top;
      if (prevMouseY.current === null) {
        prevMouseY.current = y;
        return;
      }

      const direction = y > prevMouseY.current ? "down" : "up";
      linesRef.current.forEach((line, i) => {
        if (!line) return;
        const lineRect = line.getBoundingClientRect();
        const lineY = lineRect.top - rect.top;
        const crossed =
          (prevMouseY.current < lineY && y >= lineY && direction === "down") ||
          (prevMouseY.current > lineY && y <= lineY && direction === "up");
        if (crossed) handlePlayString(i);
      });

      prevMouseY.current = y;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("touchmove", (e) => {
      if (e.touches?.[0]) handleMouseMove(e.touches[0]);
    });

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("touchmove", handleMouseMove);
      if (samplerRef.current) samplerRef.current.disconnect();
    };
  }, [isInteractive]);

  // --- ✨ Intro animation with ScrollTrigger ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".string-color-fill", {
        scaleX: 0,
        transformOrigin: "left center",
        backgroundColor: "transparent",
      });
      gsap.set(".string-text", { opacity: 0, y: 30 });

      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      // Step 1: Words fade/slide in
      intro.to(".string-text", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.25,
      });

      // Step 2: Strings fill in left → right
      intro.to(".string-color-fill", {
        scaleX: 1,
        backgroundColor: "black",
        duration: 0.6,
        stagger: 0.08,
      });

      // Step 3: Unlock interactivity
      intro.add(() => setIsInteractive(true));
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center py-10 bg-stone w-full"
      onMouseDown={initializeSampler}
      onTouchStart={initializeSampler}
    >
      <div className="flex flex-col items-center w-full max-w-2xl select-none">
        {notes.map((note, i) => (
          <div
            key={note}
            ref={(el) => (linesRef.current[i] = el)}
            className="w-full h-[1px] md:h-[2px] my-4 md:my-6 rounded-full relative"
          >
            <div className="string-color-fill w-full h-full rounded-full absolute top-0 left-0" />

            {i === 1 && (
              <span className="string-text absolute -top-[2.5rem] left-0 bg-stone pr-3 font-serif text-2xl md:text-5xl">
                Where
              </span>
            )}
            {i === 2 && (
              <span className="string-text absolute -top-[2.5rem] left-1/4 bg-stone px-3 italic font-serif text-2xl md:text-5xl">
                Every Meal
              </span>
            )}
            {i === 3 && (
              <span className="string-text absolute -top-[2.5rem] right-0 bg-stone pl-3 font-serif text-2xl md:text-5xl">
                Is Harmony
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
