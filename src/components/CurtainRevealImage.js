"use client";

import { useRef, useEffect, useState } from "react";
import { PrismicNextImage } from "@prismicio/next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * CurtainRevealImage
 * Safe GSAP reveal animation for PrismicNextImage.
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

  // 🎨 Choose random curtain color if not specified
  useEffect(() => {
    if (!color) {
      const chosen = colorList[Math.floor(Math.random() * colorList.length)];
      setCurtainColor(chosen);
    }
  }, [color, colorList]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const overlay = overlayRef.current;

    // 🛡️ Prevent null target animation
    if (!wrapper || !overlay) return;

    // 🛡️ Prevent running if no valid image field
    if (!field || !field.url) {
      console.warn("CurtainRevealImage: field is missing or invalid", field);
      return;
    }

    const ctx = gsap.context(() => {
      const dirMap = {
        up: { from: { y: "0%" }, to: { y: "-100%" } },
        down: { from: { y: "-100%" }, to: { y: "0%" } },
        left: { from: { x: "0%" }, to: { x: "-100%" } },
        right: { from: { x: "-100%" }, to: { x: "0%" } },
      };
      const dir = dirMap[curtainDirection] || dirMap.up;

      gsap.set(overlay, dir.from);

      gsap.to(overlay, {
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
    }, wrapper);

    // Cleanup on unmount
    return () => ctx.revert();
  }, [field, curtainDirection, duration, ease, once, markers]);

  return (
    <div
      ref={wrapperRef}
      className={`relative inline-block overflow-hidden ${className}`}
      style={{ lineHeight: 0 }}
    >
      {/* 🖼️ Image */}
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

      {/* 🪄 Curtain Overlay */}
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
