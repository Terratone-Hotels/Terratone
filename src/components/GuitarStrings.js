"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import * as Tone from "tone";

export default function GuitarStringsPhysics() {
  const linesRef = useRef([]);
  const samplerRef = useRef(null);
  const audioStartedRef = useRef(false);
  const [vibrating, setVibrating] = useState(Array(6).fill(false));

  const notes = ["E2", "A2", "D3", "G3", "B3", "E4"]; // standard guitar tuning

  const initializeSampler = async () => {
    if (audioStartedRef.current) return;
    await Tone.start();

    // Create a Sampler using WAV files for acoustic guitar
    const sampler = new Tone.Sampler({
      urls: {
        E2: "E2.wav",
        A2: "A2.wav",
        D3: "D3.wav",
        G3: "G3.wav",
        B3: "B3.wav",
        E4: "E4.wav",
      },
      baseUrl: "/samples/guitar/", // place your WAV files in public/samples/guitar/
      onload: () => console.log("Sampler loaded"),
    }).toDestination();

    samplerRef.current = sampler;
    audioStartedRef.current = true;
  };

  useEffect(() => {
    linesRef.current = linesRef.current.slice(0, notes.length);

    const handlePlayString = async (index) => {
      if (!audioStartedRef.current) await initializeSampler();
      if (!samplerRef.current || vibrating[index]) return;

      const note = notes[index];
      const velocity = 0.4 + Math.random();

      samplerRef.current.triggerAttackRelease(note, "1n", undefined, velocity);

      setVibrating((prev) => {
        const next = [...prev];
        next[index] = true;
        return next;
      });

      // GSAP vibration animation
      const line = linesRef.current[index];
      const tl = gsap.timeline({
        onComplete: () =>
          setVibrating((prev) => {
            const next = [...prev];
            next[index] = false;
            return next;
          }),
      });

      gsap.set(line, { y: 0, rotation: 0, filter: "blur(0px)" });
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
        { filter: "blur(0.5px)" },
        { filter: "blur(0px)", duration: 1, ease: "power2.out" }
      );
    };

    linesRef.current.forEach((line, i) => {
      if (!line) return;
      line.addEventListener("mouseenter", () => handlePlayString(i));
      line.addEventListener("touchstart", () => handlePlayString(i));
    });

    return () => {
      linesRef.current.forEach((line, i) => {
        if (!line) return;
        line.replaceWith(line.cloneNode(true));
      });
      if (samplerRef.current) {
        samplerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center py-10 bg-[#f8f5f1]"
      onMouseDown={initializeSampler}
      onTouchStart={initializeSampler}
    >
      <div className="text-center mb-8">
        <p className="font-serif text-lg md:text-xl">
          Where <em>Every Meal</em> Is Harmony
        </p>
      </div>

      <div className="flex flex-col items-center w-full max-w-xl">
        {notes.map((note, i) => (
          <div
            key={note}
            ref={(el) => (linesRef.current[i] = el)}
            className={`w-full ${i % 2 === 0 ? "bg-gray-600" : "bg-gray-700"} ${
              i === 0
                ? "h-[1px]"
                : i === 1
                  ? "h-[1.25px]"
                  : i === 2
                    ? "h-[1.5px]"
                    : i === 3
                      ? "h-[2px]"
                      : i === 4
                        ? "h-[2.25px]"
                        : "h-[2.5px]"
            } my-2 rounded-full`}
            style={{ transformOrigin: "center center" }}
          ></div>
        ))}
      </div>
    </div>
  );
}
