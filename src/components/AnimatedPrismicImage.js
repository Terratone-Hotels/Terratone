"use client";

import { useEffect, useRef } from "react";
import { PrismicNextImage } from "@prismicio/next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * A component that animates a Prismic image on scroll.
 * The image scales up from a circle to a full-bleed image.
 *
 * @param {{ field: import("@prismicio/client").ImageField }} props
 */
export default function AnimatedPrismicImage({ field }) {
  const wrapperRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Ensure the refs are connected to the DOM elements
    const wrapperElement = wrapperRef.current;
    const imageElement = imageRef.current;

    if (!wrapperElement || !imageElement) return;

    // Set the initial visual state of the elements before the animation starts
    gsap.set(wrapperElement, {
      scale: 0.5,
      borderRadius: "400px",
      overflow: "hidden",
    });
    gsap.set(imageElement, { scale: 1.5 });

    // Create the scroll-triggered animation
    const animation = ScrollTrigger.create({
      trigger: wrapperElement,
      start: "top bottom", // Animation starts when the top of the wrapper hits the viewport bottom

      // --- THIS IS THE CHANGED LINE ---
      // The animation now completes when the top of the image wrapper reaches the center of the viewport.
      end: "top center",

      scrub: 1, // Smoothly ties the animation progress to the scrollbar
      onUpdate: (self) => {
        // self.progress is a value from 0 to 1 representing the scroll progress
        const progress = self.progress;

        // Interpolate values based on scroll progress
        const wrapperScale = 0.5 + progress * 0.5; // Scale from 0.5 to 1
        const borderRadius = 400 - progress * 375; // Border radius from 400px to 25px
        const imageScale = 1.5 - progress * 0.5; // Inner image scale from 1.5 to 1

        // Apply the animated styles directly using GSAP's .to() for smooth updates
        gsap.to(wrapperElement, {
          scale: wrapperScale,
          borderRadius: `${borderRadius}px`,
          duration: 0.5, // A slight duration helps smooth out scrubbing
          ease: "power2.out",
        });

        gsap.to(imageElement, {
          scale: imageScale,
          duration: 0.5,
          ease: "power2.out",
        });
      },
    });

    // Cleanup function to kill the ScrollTrigger instance when the component unmounts
    return () => {
      animation.kill();
    };
  }, [field]); // Rerun effect if the image field changes

  return (
    // This is the outer wrapper that gets scaled and rounded
    <div ref={wrapperRef} className="absolute inset-0 z-0">
      {/* The PrismicNextImage component is inside, it gets the parallax scale effect */}
      <div ref={imageRef} className="w-full h-full">
        <PrismicNextImage
          field={field}
          className="w-full h-full object-cover will-change-transform"
          fill
        />
      </div>
    </div>
  );
}
