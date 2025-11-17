"use client";

import { useRef, useEffect } from "react";
import { PrismicNextImage } from "@prismicio/next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import RichTextRenderer from "@/components/RichTextRenderer";
import { PrismicNextLink } from "@prismicio/next";

// Register the GSAP plugin here, once, at the top level of the file.
gsap.registerPlugin(ScrollTrigger);

/**
 * @typedef {import("@prismicio/client").Content.BanquetHallsSlice} BanquetHallsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<BanquetHallsSlice>} BanquetHallsProps
 * @type {import("react").FC<BanquetHallsProps>}
 */
export default function BanquetHalls({ slice }) {
  // Create refs for ALL elements we need to animate
  const containerRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);

  // --- MODIFICATION 1: Create individual refs for content elements ---
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const imageWrapper = imageWrapperRef.current;
    const image = imageRef.current;

    // Get individual content elements from their refs
    const heading = headingRef.current;
    const description = descriptionRef.current;
    const button = buttonRef.current;

    // Guard clause to ensure all elements are mounted
    if (
      !container ||
      !imageWrapper ||
      !image ||
      !heading ||
      !description ||
      !button
    )
      return;

    // Set the initial state for the image animations
    gsap.set(imageWrapper, {
      scale: 0.5,

      overflow: "hidden",
    });
    gsap.set(image, { scale: 1.5 });

    // --- MODIFICATION 2: Set initial state for EACH content element ---
    // We group them in an array to set them all at once.
    gsap.set([heading, description, button], { scale: 0.9, y: 40, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 65%",
        end: "center center",
        scrub: 1.3,
      },
    });

    // Animate the image wrapper (scale and border radius)
    tl.to(
      imageWrapper,
      // ✅ MODIFIED: Changed borderRadius to "0px" for sharp corners
      { scale: 1, borderRadius: "0px", ease: "power2.out" },
      "<"
    )
      // Animate the inner image (parallax effect)
      .to(image, { scale: 1, ease: "power2.out" }, "<")
      // Animate the content elements IN SEQUENCE
      .to(
        [heading, description, button], // Target all three elements
        {
          scale: 1,
          y: 0,
          opacity: 1,
          stagger: 0.1, // Add a 0.1s delay between each element's animation
          ease: "power2.out",
        },
        "<" // Start this animation at the same time as the image animations
      );

    // Cleanup function
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <Bounded
      ref={containerRef}
      className="relative  h-auto items-center overflow-hidden"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {/* Everything must be inside the internal bounded div */}
      <div className="relative">
        {/* Background Image JSX (now inside bounded padding area) */}
        <div
          ref={imageWrapperRef}
          className="absolute inset-0 z-0 flex items-center justify-center"
        >
          <div ref={imageRef} className="w-full h-full">
            <PrismicNextImage
              field={slice.primary.banquet_image}
              className="w-full h-full object-cover object-center will-change-transform"
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-end h-[40.6875rem] md:h-[46.5rem]">
          <div className="absolute top-4 sm:top-10 left-4 md:top-26 lg:left-5 xl:left-19 text-white max-w-[90%] sm:max-w-[80%] md:max-w-none">
            {/* Heading */}
            <div ref={headingRef}>
              <RichTextRenderer
                field={slice.primary.heading}
                className="text-[1.4rem] xs:text-[1.6rem] sm:text-[1.9rem] md:text-[2.625rem] font-serif font-medium leading-snug md:leading-12"
              />
            </div>

            {/* Description */}
            <div
              ref={descriptionRef}
              className="my-3 sm:my-4 lg:my-6 w-[65%] lg:w-[30%]"
            >
              <RichTextRenderer
                field={slice.primary.description}
                className="text-[0.8125rem] sm:text-[0.9375rem] md:text-lg font-barlow text-white tracking-wide leading-snug md:leading-tight"
              />
            </div>

            {/* Button */}
            <div ref={buttonRef} className="inline-block">
              <Button className="bg-white px-2.5 py-1">
                <PrismicNextLink field={slice.primary.button_link}>
                  {slice.primary.button_text}
                </PrismicNextLink>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
}
