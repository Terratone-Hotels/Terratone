// src/slices/FullImage/index.jsx
"use client";

import { useRef, useEffect } from "react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const components = {
  paragraph: ({ children }) => (
    <p className="text-6xl text-white font-serif">{children}</p>
  ),
};

export default function FullImage({ slice }) {
  // CORRECT: useRef<HTMLDivElement>(null)
  const sectionRef = useRef < HTMLDivElement > null;
  const imageWrapperRef = useRef < HTMLDivElement > null;
  const stepsRef = useRef < HTMLDivElement > null;

  const widthScreens = slice.primary.duration_screens || 4;
  const totalWidth = `${widthScreens * 100}vw`;

  const steps = slice.items.map((item, i) => (
    <div
      key={i}
      className="pin-step absolute inset-0 w-screen h-screen flex items-center justify-center p-20 opacity-0 pointer-events-none"
    >
      <div className="text-center">
        <PrismicRichText field={item.step_text} components={components} />
      </div>
    </div>
  ));

  useEffect(() => {
    const section = sectionRef.current;
    const imageWrapper = imageWrapperRef.current;
    const stepEls = stepsRef.current?.children;

    if (!section || !imageWrapper || !stepEls?.length) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${widthScreens * 100}vw`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 1,
      });

      gsap.to(imageWrapper, {
        x: `-${(widthScreens - 1) * 100}vw`,
        scale: 0.85,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${widthScreens * 100}vw`,
          scrub: 1,
        },
      });

      Array.from(stepEls).forEach((el, i) => {
        const start = i * 100;
        ScrollTrigger.create({
          trigger: section,
          start: `top top-=${start}vw`,
          end: `top top-=${start + 80}vw`,
          onEnter: () => gsap.to(el, { opacity: 1, duration: 0.6 }),
          onLeaveBack: () => gsap.set(el, { opacity: 0 }),
        });
      });
    }, section);

    return () => ctx.revert();
  }, [slice, widthScreens]);

  return (
    <section
      ref={sectionRef} // CORRECT: ref is a proper React ref
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="horizontal-section full-image image-pin-sequence relative h-screen overflow-hidden"
      style={{ width: totalWidth }}
    >
      <div
        ref={imageWrapperRef}
        className="sticky top-0 left-0 h-screen w-screen z-10"
      >
        {slice.primary.image && (
          <PrismicNextImage
            field={slice.primary.image}
            alt=""
            fill
            className="object-cover brightness-95"
            priority
          />
        )}
      </div>

      <div className="absolute inset-0 bg-black/30 pointer-events-none z-20" />

      <div
        ref={stepsRef}
        className="absolute top-0 left-0 z-30"
        style={{ width: totalWidth }}
      >
        {steps}
      </div>
    </section>
  );
}
