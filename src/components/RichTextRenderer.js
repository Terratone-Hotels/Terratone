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

    // 🚫 1. Kill any old triggers in this container
    ScrollTrigger.getAll().forEach((st) => {
      if (st.trigger === container) st.kill();
    });

    // 🧹 2. Clean old wrapped elements
    container.querySelectorAll(".line-mask").forEach((mask) => {
      const parent = mask.parentNode;
      if (parent) parent.innerHTML = parent.textContent;
    });

    // 🪄 3. Wrap lines again
    const lines = Array.from(
      container.querySelectorAll("p, span, h1, h2, h3, h4, h5, h6, li")
    );

    lines.forEach((el) => {
      const text = el.innerHTML;
      el.innerHTML = text
        .split("<br>")
        .map(
          (line) =>
            `<span class='line-mask overflow-hidden inline-block'>
              <span class='split-line inline-block'>${line}</span>
            </span>`
        )
        .join("");
    });

    // 🧩 4. Setup GSAP animation safely inside context
    const ctx = gsap.context(() => {
      requestAnimationFrame(() => {
        const splitLines = container.querySelectorAll(".split-line");

        if (!splitLines.length) return;

        gsap.fromTo(
          splitLines,
          { yPercent: 100 },
          {
            yPercent: 0,
            duration: animationDuration,
            stagger: animationStagger,
            ease: animationEase,
            scrollTrigger: {
              trigger: container,
              start: triggerStart,
              once: true,
              // Optional: add markers for debugging
              // markers: true,
            },
          }
        );
      });
    }, container);

    // 🧼 5. Cleanup properly on route change/unmount
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill();
      });
    };
  }, [field, animationDuration, animationStagger, animationEase, triggerStart]);

  return (
    <div ref={containerRef} className={className}>
      <PrismicRichText field={field} />
    </div>
  );
}
