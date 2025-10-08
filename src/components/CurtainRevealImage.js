"use client";

import { useRef, useEffect, useState } from "react";
import { PrismicNextImage } from "@prismicio/next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * CurtainRevealImage
 * A smooth curtain reveal effect for Prismic images.
 * - Begins the reveal right as the image enters the viewport.
 * - Works well with responsive Next.js layouts.
 */

export default function CurtainRevealImage({
  field,
  alt = "Image",
  className = "",
  curtainDirection = "up", // "up" | "down" | "left" | "right"
  colorList = [
    "var(--color-earth-green)",
    "var(--color-terra-pink)",
    "var(--color-toiled-gold)",
    "var(--color-sand)",
  ],
  color = null, // fixed curtain color
  once = true,
  duration = 1.2,
  ease = "power2.inOut",
  markers = false,
  immediate = false, // optional prop to trigger reveal instantly (no scroll)
}) {
  const wrapperRef = useRef(null);
  const overlayRef = useRef(null);
  const [curtainColor, setCurtainColor] = useState(
    color || "var(--color-stone)"
  );

  // 🎨 Choose a random color only once after mount
  useEffect(() => {
    if (!color) {
      setCurtainColor(colorList[Math.floor(Math.random() * colorList.length)]);
    }
  }, [color, colorList]);

  // 🎬 Curtain animation setup
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const overlay = overlayRef.current;
    if (!wrapper || !overlay) return;

    const dirMap = {
      up: { from: { y: "0%" }, to: { y: "-100%" } },
      down: { from: { y: "-100%" }, to: { y: "0%" } },
      left: { from: { x: "0%" }, to: { x: "-100%" } },
      right: { from: { x: "-100%" }, to: { x: "0%" } },
    };

    const dir = dirMap[curtainDirection] || dirMap.up;
    gsap.set(overlay, dir.from);

    // 🕹 Immediate play (e.g., hero sections)
    if (immediate) {
      gsap.to(overlay, { ...dir.to, duration, ease, delay: 0.1 });
      return;
    }

    // 🌀 Scroll-triggered reveal
    const tween = gsap.to(overlay, {
      ...dir.to,
      duration,
      ease,
      scrollTrigger: {
        trigger: wrapper,
        start: "top 95%", // starts as soon as image enters viewport
        toggleActions: "play none none none",
        once,
        markers,
        onEnter: () => ScrollTrigger.refresh(true), // fixes lazy-load timing
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [curtainDirection, duration, ease, once, markers, immediate]);

  return (
    <div
      ref={wrapperRef}
      className={`relative overflow-hidden ${className}`}
      style={{ lineHeight: 0, zIndex: 0 }}
    >
      {/* Actual image */}
      <PrismicNextImage
        field={field}
        alt={alt}
        className="w-full h-full object-cover z-[1]"
      />

      {/* Curtain overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          backgroundColor: curtainColor,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
