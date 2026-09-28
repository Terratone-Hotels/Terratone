"use client";

import { useRef, useEffect } from "react";
import { PrismicNextImage } from "@prismicio/next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import RichTextRenderer from "@/components/RichTextRenderer";
import { PrismicNextLink } from "@prismicio/next";

gsap.registerPlugin(ScrollTrigger);

/**
 * @typedef {import("@prismicio/client").Content.BanquetHallsSlice} BanquetHallsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<BanquetHallsSlice>} BanquetHallsProps
 * @type {import("react").FC<BanquetHallsProps>}
 */
export default function BanquetHalls({ slice }) {
  const containerRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);

  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const imageWrapper = imageWrapperRef.current;
    const image = imageRef.current;

    const heading = headingRef.current;
    const description = descriptionRef.current;
    const button = buttonRef.current;

    if (
      !container ||
      !imageWrapper ||
      !image ||
      !heading ||
      !description ||
      !button
    )
      return;

    gsap.set(imageWrapper, {
      scale: 0.5,

      overflow: "hidden",
    });
    gsap.set(image, { scale: 1.5 });

    gsap.set([heading, description, button], { scale: 0.9, y: 40, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 65%",
        end: "center center",
        scrub: 1.3,
      },
    });

    tl.to(
      imageWrapper,

      { scale: 1, borderRadius: "0px", ease: "power2.out" },
      "<",
    )

      .to(image, { scale: 1, ease: "power2.out" }, "<")

      .to(
        [heading, description, button],
        {
          scale: 1,
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "power2.out",
        },
        "<",
      );

   
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative  h-[80vh] md:h-auto items-center px-[0.9375rem] md:px-6 mt-15 lg:mt-35 overflow-hidden"
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
              sizes="100vw"
              imgixParams={{ w: 1920, q: 80 }}
              className="w-full h-full object-cover object-center will-change-transform"
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-end h-[40.6875rem] md:h-[46.5rem]">
          <div className="absolute top-10 sm:top-10 left-4 md:top-26 lg:left-5 xl:left-19 text-white max-w-[90%] sm:max-w-[80%] md:max-w-none">
            {/* Heading */}
            <div ref={headingRef}>
              <RichTextRenderer
                field={slice.primary.heading}
                className="text-[28px] sm:text-[1.9rem] md:text-[2.625rem] font-serif font-medium leading-5 md:leading-8"
              />
            </div>

            {/* Description */}
            <div
              ref={descriptionRef}
              className="my-3 sm:my-4 lg:my-6 w-[65%] lg:w-[30%]"
            >
              <RichTextRenderer
                field={slice.primary.description}
                className="text-sm sm:text-[0.9375rem] md:text-lg font-barlow text-white tracking-wide leading-snug md:leading-tight"
              />
            </div>

            {/* Button */}
            <div ref={buttonRef} className="inline-block">
              <Button
                field={slice.primary.button_link}
                className="bg-white px-2.5 py-1"
              >
                {slice.primary.button_text}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
