"use client";

import { useRef, useEffect, useState } from "react";
import { PrismicNextImage } from "@prismicio/next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * CurtainRevealImage
 * GSAP curtain reveal animation for PrismicNextImage.
 * Fully protected against hydration and pin errors.
 */
export default function CurtainRevealImage({
  field,
  alt = "Image",
  className = "",
  curtainDirection = "up",
  colorList = [
    "var(--color-earth-green)",
    "var(--color-terra-pink)",
    "var(--color-toiled-gold)",
    "var(--color-sand)",
  ],
  color = null,
  once = true,
  duration = 1.2,
  ease = "power2.inOut",
  markers = false,
}) {
  const wrapperRef = useRef(null);
  const overlayRef = useRef(null);
  const [curtainColor, setCurtainColor] = useState(
    color || "var(--color-stone)"
  );

  // 🎨 Choose random curtain color if not provided
  useEffect(() => {
    if (!color) {
      const chosen = colorList[Math.floor(Math.random() * colorList.length)];
      setCurtainColor(chosen);
    }
  }, [color, colorList]);

  useEffect(() => {
    // 🛡️ Prevent SSR errors
    if (typeof window === "undefined") return;

    const wrapper = wrapperRef.current;
    const overlay = overlayRef.current;

    if (!wrapper || !overlay) return;
    if (!field || !field.url) {
      console.warn("CurtainRevealImage: invalid field", field);
      return;
    }

    // Delay slightly to ensure ScrollTrigger and Lenis are ready
    const timeout = setTimeout(() => {
      const ctx = gsap.context(() => {
        const dirMap = {
          up: { from: { y: "0%" }, to: { y: "-100%" } },
          down: { from: { y: "-100%" }, to: { y: "0%" } },
          left: { from: { x: "0%" }, to: { x: "-100%" } },
          right: { from: { x: "-100%" }, to: { x: "0%" } },
        };

        const dir = dirMap[curtainDirection] || dirMap.up;
        gsap.set(overlay, dir.from);

        // ✅ Safe ScrollTrigger tween
        const tween = gsap.to(overlay, {
          ...dir.to,
          duration,
          ease,
          scrollTrigger: {
            trigger: wrapper,
            start: "top 85%",
            toggleActions: "play none none none",
            once,
            markers,
          },
        });

        // ✅ Refresh triggers after setup
        ScrollTrigger.refresh();

        return () => tween.scrollTrigger?.kill();
      }, wrapper);

      return () => ctx.revert();
    }, 150); // 150ms delay fixes hydration timing

    return () => clearTimeout(timeout);
  }, [field, curtainDirection, duration, ease, once, markers]);

  return (
    <div
      ref={wrapperRef}
      className={`relative inline-block overflow-hidden ${className}`}
      style={{ lineHeight: 0 }}
    >
      {field ? (
        <PrismicNextImage
          field={field}
          alt={alt}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="bg-gray-100 w-full h-full flex items-center justify-center text-gray-400 text-sm">
          Missing Image
        </div>
      )}

      {/* Curtain overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          backgroundColor: curtainColor,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
