"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Bounded from "@/components/Bounded";
import VideoComponent from "@/components/VideoComponent";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Button from "@/components/Button";

gsap.registerPlugin(ScrollTrigger);

const DestinationHighlight = ({ slice }) => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);
  const mediaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state — hidden and slightly lowered
      gsap.set(
        [
          headingRef.current,
          descRef.current,
          buttonRef.current,
          mediaRef.current,
        ],
        { opacity: 0, y: 60 }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%", // earlier start (was 80%)
          end: "bottom 10%", // ends a bit earlier too
          scrub: 1, // smoother catch-up
          ease: "none",
        },
      });

      // Step 1 — Heading
      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: "power3.out",
      });

      // Step 2 — Description
      tl.to(
        descRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
        },
        "-=0.9"
      );

      // Step 3 — Button
      tl.to(
        buttonRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power2.out",
        },
        "-=0.8"
      );

      // Step 4 — Media (image / video)
      tl.fromTo(
        mediaRef.current,
        { opacity: 0, scale: 1.1 },
        {
          opacity: 1,
          scale: 1,
          duration: 2,
          ease: "expo.out",
        },
        "-=1.2"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Bounded
      ref={sectionRef}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mt-10 lg:mt-30 overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
        {/* Left Side Text */}
        <div className="md:w-[28.1875rem] space-y-5">
          <div ref={headingRef}>
            <PrismicRichText
              field={slice.primary.heading}
              components={{
                heading1: ({ children }) => (
                  <h2 className="text-[1.75rem] md:text-[2.625rem] font-serif font-medium leading-7 md:leading-12">
                    {children}
                  </h2>
                ),
              }}
            />
          </div>

          <div ref={descRef}>
            <PrismicRichText
              field={slice.primary.description}
              components={{
                paragraph: ({ children }) => (
                  <p className="text-sm md:text-lg font-barlow text-black leading-tight">
                    {children}
                  </p>
                ),
              }}
            />
          </div>

          <div ref={buttonRef}>
            <Button showArrow>{slice.primary.button_text}</Button>
          </div>

          {slice.primary.explore_button?.url && (
            <PrismicNextLink field={slice.primary.explore_button} />
          )}
        </div>

        {/* Right Side Media */}
        <div
          ref={mediaRef}
          className="
            w-full
            h-[29.9375rem]
            md:h-[32rem]
            lg:h-[36rem]
            overflow-hidden
          "
        >
          {slice.primary.video_link ? (
            <VideoComponent
              srcMp4={slice.primary.video_link}
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <PrismicNextImage
              field={slice.primary.image}
              className="w-full h-full object-cover object-center"
            />
          )}
        </div>
      </div>
    </Bounded>
  );
};

export default DestinationHighlight;
