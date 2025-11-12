"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import * as Tone from "tone";
export default function GuitarStringsPhysics() {
  const containerRef = useRef(null);
  const linesRef = useRef([]);
  const samplerRef = useRef(null);
  const audioStartedRef = useRef(false);
  const [vibrating, setVibrating] = useState(Array(6).fill(false));
  const prevMouseY = useRef(null);
  const notes = ["E2", "A2", "D3", "G3", "B3", "E4"]; // standard guitar tuning
  // This function is now called by EITHER the pre-loader OR a direct user interaction.
  // The check at the top ensures its core logic only ever runs once.
  const initializeSampler = async () => {
    if (audioStartedRef.current) return;
    await Tone.start();
    console.log(":rocket: Initializing Sampler...");
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
      onload: () => console.log(":guitar: Sampler loaded"),
    }).toDestination();
    samplerRef.current = sampler;
    audioStartedRef.current = true;
  };
  // Play specific string (No changes needed)
  const handlePlayString = async (index) => {
    if (!audioStartedRef.current) await initializeSampler();
    if (!samplerRef.current) return;
    const note = notes[index];
    const velocity = 0.4 + Math.random() * 0.6;
    samplerRef.current.triggerAttackRelease(note, "1n", undefined, velocity);
    const line = linesRef.current[index];
    if (!line) return;
    gsap.killTweensOf(line);
    gsap.set(line, { y: 0, filter: "blur(0px)" });
    const tl = gsap.timeline();
    tl.to(line, { y: -2, duration: 0.05, ease: "power1.out" })
      .to(line, {
        y: 3,
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
  // --- NEW: Proactive audio loading when component is NEAR the viewport ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the component enters our "pre-load zone"...
        if (entry.isIntersecting) {
          console.log("Component is approaching screen, pre-loading audio...");
          initializeSampler();
          // The job is done, disconnect the observer for performance.
          observer.disconnect();
        }
      },
      {
        // This creates an invisible margin around the viewport. The observer
        // triggers when the component enters this margin, before it's on screen.
        rootMargin: "200px",
      }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    // Cleanup if the component unmounts before triggering.
    return () => observer.disconnect();
  }, []); // Empty array ensures this runs only once.
  // Your original mouse tracking useEffect remains unchanged. It now acts as a reliable fallback.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleMouseMove = async (e) => {
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
        if (crossed) {
          handlePlayString(i);
        }
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
  }, []);
  return (
    // Your original fallback click handlers also remain for maximum reliability.
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center py-10 bg-stone w-full"
      onMouseDown={initializeSampler}
      onTouchStart={initializeSampler}
    >
      <div className="flex flex-col items-center w-full max-w-2xl select-none ">
        {notes.map((note, i) => (
          <div
            key={note}
            ref={(el) => (linesRef.current[i] = el)}
            className="w-full bg-black h-[1px] md:h-[2px] my-4 md:my-8 rounded-full relative"
            style={{ transformOrigin: "center center" }}
          >
            {" "}
            {i === 1 && (
              <span className="absolute -top-[1.6rem] left-0 bg-stone px-3 font-serif text-2xl md:text-5xl">
                Where
              </span>
            )}
            {i === 2 && (
              <span className="absolute -top-[1.6rem] left-1/3 bg-stone px-3 italic font-serif text-2xl md:text-5xl">
                Every Meal
              </span>
            )}
            {i === 3 && (
              <span className="absolute -top-[1.6rem] right-0 bg-stone px-3 font-serif text-2xl md:text-5xl">
                Is Harmony
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}





