"use client";

import { useEffect, useRef } from "react";
import { PrismicRichText } from "@prismicio/react";
import { gsap } from "gsap";

// NOTE: ScrollTrigger is NOT needed for this on-load animation, so it is commented out.

export default function HeroTextRenderer({
  field,
  className = "",
  animationDuration = 0.6,
  animationStagger = 0.25,
  animationEase = "power2.out",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- 1. Content Preparation (Wait for Prismic content) ---

    // Use a small timeout to ensure the PrismicRichText component has
    // finished rendering its HTML content before we try to modify it.
    const renderDelay = setTimeout(() => {
      
      const lines = Array.from(
        container.querySelectorAll("p, span, h1, h2, h3, h4, h5, h6, li")
      );

      // If no content is found, exit
      if (lines.length === 0) return;

      // --- 2. Text Line Splitting and Wrapping ---
      lines.forEach((el) => {
        // Prevent re-splitting if the component re-renders
        if (!el.classList.contains("split-line-wrapper")) { 
          const text = el.innerHTML;
          el.innerHTML = text
            .split("<br>")
            .map(
              (line) =>
                // The .line-mask must have overflow: hidden (via inline style or CSS class)
                `<span class='line-mask' style='overflow: hidden; display: block;'>
                   <span class='split-line' style='display: block;'>${line}</span>
                 </span>`
            )
            .join("");
        }
      });
      
      const animatedElements = container.querySelectorAll(".split-line");

      // --- 3. GSAP Initialization and Animation ---

      // A. GSAP Setup: Instantaneously set the container to visible
      // This overrides the initial `opacity: 0` style applied to the outer div,
      // allowing the masked content to become part of the visual flow.
      gsap.set(container, { opacity: 1 });

      // B. Define the Timeline
      const tl = gsap.timeline(); 

      // C. Set Initial State: Set the text lines to their starting position (yPercent: 100)
      // This ensures the animation always starts from the correct state.
      gsap.set(animatedElements, { yPercent: 100 });

      // D. Animate the Lines (Slide In)
      tl.to(
        animatedElements,
        {
          yPercent: -10, // Animate TO the final state (yPercent: 0, centered)
          duration: animationDuration,
          stagger: animationStagger,
          ease: animationEase,
        }
      );
      
    }, 50); // 50ms delay is usually sufficient to wait for rendering

    // Cleanup: Clear the timeout if the component unmounts
    return () => clearTimeout(renderDelay); 

  }, [field, animationDuration, animationStagger, animationEase]); 
  
  return (
    // FIX for FOUC: Start the entire container as invisible using inline style.
    // GSAP will set this to opacity: 1 inside useEffect *after* splitting the text.
    <div ref={containerRef} className={` ${className}`} style={{ opacity: 0 }}>
      <PrismicRichText field={field} />
    </div>
  );
}