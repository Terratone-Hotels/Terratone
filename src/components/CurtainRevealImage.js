"use client";

import { useRef, useEffect, useState } from "react";
import { PrismicNextImage } from "@prismicio/next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * CurtainRevealImage
 * - PrismicNextImage with a GSAP curtain that lifts when the image enters viewport
 * - Works reliably with Next.js client components
 */

export default function CurtainRevealImage({
  field, // Prismic image field
  alt = "Image",
  className = "",
  curtainDirection = "up", // "up" | "down" | "left" | "right"
  colorList = [
    "var(--color-earth-green)",
    "var(--color-terra-pink)",
    "var(--color-toiled-gold)",
    "var(--color-sand)",
  ],
  color = null, // fixed curtain color (optional)
  once = true, // play animation only once
  duration = 1.2,
  ease = "power2.inOut",
  markers = false, // turn true if you want to debug
}) {
  const wrapperRef = useRef(null);
  const overlayRef = useRef(null);
  const [curtainColor, setCurtainColor] = useState(
    color || "var(--color-stone)"
  );

  // 🎨 pick random color if not specified
  useEffect(() => {
    if (!color) {
      const chosen = colorList[Math.floor(Math.random() * colorList.length)];
      setCurtainColor(chosen);
    }
  }, [color, colorList]);

  // 🎬 GSAP reveal
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const overlay = overlayRef.current;
    if (!wrapper || !overlay) return;

    // Ensure the element actually has a measurable height (otherwise ScrollTrigger won't init)
    const rect = wrapper.getBoundingClientRect();
    if (rect.height === 0) {
      console.warn(
        "CurtainRevealImage: wrapper has 0 height, add an explicit h-[value]"
      );
    }

    const dirMap = {
      up: { from: { y: "0%" }, to: { y: "-100%" } },
      down: { from: { y: "-100%" }, to: { y: "0%" } },
      left: { from: { x: "0%" }, to: { x: "-100%" } },
      right: { from: { x: "-100%" }, to: { x: "0%" } },
    };
    const dir = dirMap[curtainDirection] || dirMap.up;

    gsap.set(overlay, dir.from);

    const tween = gsap.to(overlay, {
      ...dir.to,
      duration,
      ease,
      scrollTrigger: {
        trigger: wrapper,
        start: "top 90%", // fire when top of image is 85% down the viewport
        toggleActions: "play none none none",
        once,
        markers,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [curtainDirection, duration, ease, once, markers]);

  return (
    <div
      ref={wrapperRef}
      className={`relative overflow-hidden ${className}`}
      style={{ lineHeight: 0, zIndex: 0 }}
    >
      {/* Image */}
      <PrismicNextImage
        field={field}
        alt={alt}
        className="w-full h-full object-cover z-[1]"
      />

      {/* Curtain Overlay */}
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
