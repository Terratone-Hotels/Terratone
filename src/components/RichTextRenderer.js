"use client";

import { useEffect, useRef } from "react";
import { PrismicRichText } from "@prismicio/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RichTextRenderer({
  field,
  className = "",
  animationDuration = 0.6,
  animationStagger = 0.25,
  animationEase = "power2.out",
  triggerStart = "top 85%",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Target *all* text-containing elements within the Rich Text field
    // (p, span, h1, h2, h3, h4, h5, h6)
    const lines = Array.from(
      container.querySelectorAll("p, span, h1, h2, h3, h4, h5, h6, li")
    ); // Added h4, h5, h6, and li

    // Split text line-by-line using inline block wrapping, and add masking
    lines.forEach((el) => {
      // Avoid splitting if the element is already split
      if (!el.classList.contains("split-line")) {
        const text = el.innerHTML;
        el.innerHTML = text
          .split("<br>")
          .map(
            (line) =>
              `<span class='line-mask'><span class='split-line'>${line}</span></span>`
          )
          .join("");
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: triggerStart,
        once: true,
      },
    });

    tl.fromTo(
      container.querySelectorAll(".split-line"),
      { yPercent: 100 }, // Start position: 100% below the mask
      {
        yPercent: 0, // End position: aligned with the mask
        duration: animationDuration,
        stagger: animationStagger,
        ease: animationEase,
      }
    );

    return () => tl.kill();
  }, [field, animationDuration, animationStagger, animationEase, triggerStart]); // Add dependencies
  return (
    <div ref={containerRef} className={` ${className}`}>
      <PrismicRichText field={field} />
    </div>
  );
}
