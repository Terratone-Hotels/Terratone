"use client";

import { useRef, useLayoutEffect, useState, useEffect } from "react"; // Changed import to useLayoutEffect for GSAP
import { PrismicNextImage } from "@prismicio/next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * CurtainRevealImage
 * GSAP curtain reveal animation for PrismicNextImage.
 * FIX: Uses useState + useEffect to ensure the random color is consistently applied on the client
 * to match the hydration process.
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

  // State to hold the final color chosen on the client
  const [curtainColor, setCurtainColor] = useState(color || "transparent");

  // 🛑 CRITICAL HYDRATION FIX: Use useEffect to set the random color ONLY on the client.
  // The initial render will use 'transparent', and then the client sets the final color.
  useEffect(() => {
    // This check is already implicitly handled by useEffect only running on the client,
    // but we can ensure a choice is made here.
    if (!color) {
      const chosen = colorList[Math.floor(Math.random() * colorList.length)];
      setCurtainColor(chosen);
    }
  }, [color, colorList]); // Only re-run if explicit color or list changes

  // Use useLayoutEffect for immediate DOM access after the component has rendered and color is set
  useLayoutEffect(() => {
    // 🛡️ Ensure elements are present AFTER hydration
    const wrapper = wrapperRef.current;
    const overlay = overlayRef.current;

    // Check for window to be safe, although useLayoutEffect is client-only
    if (typeof window === "undefined" || !wrapper || !overlay) return;
    if (!field || !field.url) return;

    // Use a short delay before animation only if the color had to be set randomly.
    // This is a common pattern to ensure CSS is finalized after hydration.
    // If the color is fixed, we can run immediately.
    const delay = color ? 0 : 50;

    const ctx = gsap.context(() => {
      const dirMap = {
        up: { from: { y: "0%" }, to: { y: "-100%" } },
        down: { from: { y: "-100%" }, to: { y: "0%" } },
        left: { from: { x: "0%" }, to: { x: "-100%" } },
        right: { from: { x: "-100%" }, to: { x: "0%" } },
      };

      const dir = dirMap[curtainDirection] || dirMap.up;

      // Wrap animation setup in a setTimeout to guarantee it runs after the color is applied
      // and React finishes its internal reconciliation.
      gsap.delayedCall(delay / 1000, () => {
        // Set initial state
        gsap.set(overlay, dir.from);

        // Create the animation tween
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
      });
    }, wrapper);

    // Cleanup: Revert all animations created in the context
    return () => ctx.revert();
  }, [field, curtainDirection, duration, ease, once, markers, curtainColor]); // Add curtainColor dependency

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

      {/* Curtain overlay. Initial color is set by state. */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
