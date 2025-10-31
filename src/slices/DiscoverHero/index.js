"use client";
import { useEffect, useRef } from "react";
import { PrismicNextImage } from "@prismicio/next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * @typedef {import("@prismicio/client").Content.DiscoverHeroSlice} DiscoverHeroSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<DiscoverHeroSlice>} DiscoverHeroProps
 * @type {import("react").FC<DiscoverHeroProps>}
 */
const DiscoverHero = ({ slice }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRefs = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const textEl = textRef.current;
    if (!textEl || !container) return;

    // Wrap each letter in span
    const text = textEl.innerText;
    textEl.innerHTML = text
      .split("")
      .map((char) => `<span class="letter">${char}</span>`)
      .join("");

    const letters = textEl.querySelectorAll(".letter");
    gsap.set(letters, { color: "#bcbcbc" });

    // Define directions — move far enough to exit viewport completely
    const directions = [
      { x: "-60vw", y: "-60vh" }, // top-left
      { x: "60vw", y: "-60vh" }, // top-right
      { x: "-60vw", y: "60vh" }, // bottom-left
      { x: "60vw", y: "60vh" }, // bottom-right
    ];

    // Scroll-triggered master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=250%", // long scroll for cinematic feel
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Animate text color smoothly across the scroll
    tl.to(letters, {
      color: "#000",
      stagger: {
        each: 0.05,
        ease: "none",
      },
      duration: 10,
      ease: "none",
    });

    // Animate each image flying away diagonally
    imageRefs.current.forEach((img, i) => {
      if (!img) return;
      tl.to(
        img,
        {
          scale: 2.4,
          x: directions[i]?.x || 0,
          y: directions[i]?.y || 0,
          ease: "power3.inOut",
          duration: 10,
        },
        0 // start with text
      );
    });
  }, []);

  return (
    <section
      ref={containerRef}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Text */}
      <div className="z-20 text-center max-w-[75%] px-6">
        <div
          ref={textRef}
          className="text-2xl xl:text-4xl font-semibold leading-relaxed tracking-tight"
        >
          {slice.primary.heading?.[0]?.text ||
            "Nestled in Thevally, Kollam, Terratone Boutique Hotel puts you steps from tranquil backwaters, local markets, temples, and Kerala cuisine. Experience the perfect blend of tradition and modern energy—with easy access to key attractions, travel routes, and an authentic neighbourhood vibe for both business and leisure."}
        </div>
      </div>

      {/* Floating images */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          ref={(el) => (imageRefs.current[0] = el)}
          className="absolute md:left-26 md:top-20 xl:top-64 xl:left-60 w-40 xl:w-80 z-10"
        >
          <PrismicNextImage field={slice.primary.image_top_left} />
        </div>
        <div
          ref={(el) => (imageRefs.current[1] = el)}
          className="absolute md:right-60 md:top-17 xl:top-78 xl:right-70 w-40 md:w-56 md:h-70 z-10"
        >
          <PrismicNextImage field={slice.primary.image_top_right} />
        </div>
        <div
          ref={(el) => (imageRefs.current[2] = el)}
          className="absolute md:bottom-10 md:left-70 xl:bottom-46 xl:left-164 w-50 xl:w-96 z-10"
        >
          <PrismicNextImage field={slice.primary.image_bottom_left} />
        </div>
        <div
          ref={(el) => (imageRefs.current[3] = el)}
          className="absolute md:bottom-10 md:right-10 xl:bottom-20 xl:right-40 w-40 xl:w-66 z-40"
        >
          <PrismicNextImage field={slice.primary.image_bottom_right} />
        </div>
      </div>
    </section>
  );
};

export default DiscoverHero;
