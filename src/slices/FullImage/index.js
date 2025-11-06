"use client";
import { useEffect, useRef } from "react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const components = {
  heading1: ({ children }) => (
    <h1 className="text-5xl md:text-8xl font-bold text-white">{children}</h1>
  ),
  heading2: ({ children }) => (
    <h2 className="text-4xl md:text-7xl font-bold text-white">{children}</h2>
  ),
};

const FullImage = ({ slice }) => {
  const imageWrapperRef = useRef(null);
  const overlayWrapperRef = useRef(null);
  const heroTitleRef = useRef(null);

  useEffect(() => {
    // Ensure all refs are available
    if (
      !imageWrapperRef.current ||
      !overlayWrapperRef.current ||
      !heroTitleRef.current
    )
      return;

    const ctx = gsap.context(() => {
      // Timeline for image and overlay scale
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: imageWrapperRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
        ease: "power2.out",
      });

      tl.fromTo(imageWrapperRef.current, { scale: 1.3 }, { scale: 1 });
      tl.fromTo(overlayWrapperRef.current, { scale: 1.3 }, { scale: 1 }, "<");

      // Animate hero title opacity and y-position
      gsap.fromTo(
        heroTitleRef.current,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageWrapperRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            markers: true, // <-- Add markers for debugging
          },
        }
      );
    }, imageWrapperRef); // Scoping animations to the component

    return () => ctx.revert(); // Cleanup GSAP animations
  }, []);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative w-screen h-screen overflow-visible z-10 flex items-center justify-center"
    >
      {/* Container with overflow-hidden */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Image wrapper */}
        <div ref={imageWrapperRef} className="w-full h-full">
          {slice.primary.image && (
            <PrismicNextImage
              field={slice.primary.image}
              alt=""
              fill
              className="object-cover brightness-95"
            />
          )}
          <div className="absolute left-0 top-0 h-full w-[15vw]" />
        </div>
        {/* Overlay wrapper */}
        <div ref={overlayWrapperRef} className="absolute inset-0 bg-black/30" />
      </div>

      {/* === Title Content === */}
      <div
        ref={heroTitleRef}
        className="relative z-20 p-4 text-center text-white text-5xl invisible" // <-- Use 'invisible' class instead of inline style
      >
        {slice.primary.hero_title && (
          <PrismicRichText
            field={slice.primary.hero_title}
            components={components}
          />
        )}
      </div>
    </section>
  );
};

export default FullImage;
