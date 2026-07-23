"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NOTES = ["E2", "A2", "D3", "G3", "B3", "E4"];

/**
 * Guitar pluck UI.
 * Tone.js is loaded only on first interaction (dynamic import) so the
 * large tone chunk is not part of the GuitarStrings module graph at parse time.
 */
export default function GuitarStringsPhysics() {
  const containerRef = useRef(null);
  const linesRef = useRef([]);
  const samplerRef = useRef(null);
  const initPromiseRef = useRef(null);
  const prevMouseY = useRef(null);

  // Load Tone + sampler once — never via top-level import.
  const initializeSampler = useCallback(async () => {
    if (samplerRef.current) return samplerRef.current;
    if (initPromiseRef.current) return initPromiseRef.current;

    initPromiseRef.current = (async () => {
      const ToneMod = await import("tone");
      const T = ToneMod.default?.Sampler ? ToneMod.default : ToneMod;

      await T.start();

      const sampler = new T.Sampler({
        urls: {
          E2: "E2.wav",
          A2: "A2.wav",
          D3: "D3.wav",
          G3: "G3.wav",
          B3: "B3.wav",
          E4: "E4.wav",
        },
        baseUrl: "/samples/guitar/",
      }).toDestination();

      await new Promise((resolve) => {
        if (sampler.loaded) {
          resolve();
          return;
        }
        const prev = sampler.onload;
        sampler.onload = () => {
          if (typeof prev === "function") prev();
          resolve();
        };
        // Safety if onload never fires
        setTimeout(resolve, 4000);
      });

      samplerRef.current = sampler;
      return sampler;
    })().catch((e) => {
      initPromiseRef.current = null;
      console.warn("Guitar sampler init failed:", e);
      return null;
    });

    return initPromiseRef.current;
  }, []);

  const handlePlayString = useCallback(
    async (index) => {
      const sampler = await initializeSampler();
      if (!sampler) return;

      const note = NOTES[index];
      const velocity = 0.4 + Math.random() * 0.6;
      sampler.triggerAttackRelease(note, "1n", undefined, velocity);

      const line = linesRef.current[index]?.querySelector(".string-color-fill");
      if (!line) return;

      gsap.killTweensOf(line);
      gsap.set(line, { y: 0, filter: "blur(0px)" });

      gsap
        .timeline()
        .to(line, { y: -3, duration: 0.05, ease: "power1.out" })
        .to(line, {
          y: 3,
          duration: 0.05,
          ease: "power1.inOut",
          yoyo: true,
          repeat: 2,
        })
        .to(line, { y: 0, duration: 0.12, ease: "elastic.out(1,0.3)" });
    },
    [initializeSampler],
  );

  // Pluck detection — first audio need triggers dynamic Tone import
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const y = e.clientY - rect.top;

      if (prevMouseY.current == null) {
        prevMouseY.current = y;
        return;
      }

      const direction = y > prevMouseY.current ? "down" : "up";

      linesRef.current.forEach((line, i) => {
        if (!line) return;
        const lineRect = line.getBoundingClientRect();
        const stringY = lineRect.top - rect.top;

        const crossed =
          (prevMouseY.current < stringY &&
            y >= stringY &&
            direction === "down") ||
          (prevMouseY.current > stringY &&
            y <= stringY &&
            direction === "up");

        if (crossed) handlePlayString(i);
      });

      prevMouseY.current = y;
    };

    const onTouchMove = (e) => {
      if (e.touches?.[0]) handleMouseMove(e.touches[0]);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("touchmove", onTouchMove);
    };
  }, [handlePlayString]);

  // Visual intro only — no Tone
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".string-color-fill", {
        scaleX: 0,
        transformOrigin: "left center",
        backgroundColor: "black",
      });
      gsap.set(".string-text", { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.to(".string-text", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.25,
      });

      tl.to({}, { duration: 0.4 });

      tl.to(".string-color-fill", {
        scaleX: 1,
        duration: 0.6,
        stagger: 0.08,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center py-10 bg-stone w-full"
      onMouseDown={() => {
        initializeSampler();
      }}
      onTouchStart={() => {
        initializeSampler();
      }}
    >
      <div className="flex flex-col items-center w-full max-w-2xl select-none">
        {NOTES.map((note, i) => (
          <div
            key={note}
            ref={(el) => {
              linesRef.current[i] = el;
            }}
            className="w-full h-[1px] md:h-[2px] my-4 md:my-6 rounded-full relative"
          >
            <div className="string-color-fill w-full h-full rounded-full absolute top-0 left-0" />

            {i === 1 && (
              <span className="string-text absolute -top-[22px] md:-top-[2.5rem] left-0 bg-stone pr-3 font-serif text-2xl md:text-5xl">
                Where
              </span>
            )}
            {i === 2 && (
              <span className="string-text absolute -top-[22px] md:-top-[2.5rem] left-1/4 bg-stone px-3 italic font-serif text-2xl md:text-5xl">
                Every Meal
              </span>
            )}
            {i === 3 && (
              <span className="string-text absolute -top-[22px] md:-top-[2.5rem] right-0 bg-stone pl-3 font-serif text-2xl md:text-5xl">
                Is Harmony
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
