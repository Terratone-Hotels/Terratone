"use client";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroller({ children }) {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    // Only run the animation on screens wider than 1024px
    if (window.innerWidth <= 1024) return;

    // Use GSAP's context for safe cleanup
    let ctx = gsap.context(() => {
      const section = sectionRef.current;
      const container = containerRef.current;
      const totalScrollWidth = container.scrollWidth - section.offsetWidth;

      // Set the initial visibility of the section to hidden
      // It will be made visible by the ScrollTrigger animation
      gsap.set(section, { autoAlpha: 1 });

      gsap.to(container, {
        x: () => -totalScrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => "+=" + totalScrollWidth,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef); // Scope the context to the sectionRef

    // Cleanup function
    return () => ctx.revert();
  }, []);

  return (
    // Add an inline style to initially hide the component to prevent flicker
    <section
      ref={sectionRef}
      className="horizontal-scroll"
      style={{ visibility: "hidden" }}
    >
      <div ref={containerRef} className="horizontal-scroll__inner">
        {children}
      </div>
    </section>
  );
}
