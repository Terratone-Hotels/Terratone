"use client";

import { useRef, useLayoutEffect } from "react";
import Bounded from "@/components/Bounded";
import VideoComponent from "@/components/VideoComponent";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Button from "@/components/Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TaglineHeroSlice = ({ slice }) => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      const textBlocks = container.querySelectorAll(".hero-text");
      const mediaBlocks = container.querySelectorAll(".hero-media");

      /* --------------------------------------------------
         INITIAL STATE — TEXT & MEDIA MATCH EACH OTHER
      -------------------------------------------------- */
      gsap.set(textBlocks, {
        opacity: 0,
        clipPath: "inset(100% 0% 0% 0%)", // hidden from bottom
      });

      gsap.set(mediaBlocks, {
        opacity: 0,
        clipPath: "inset(100% 0% 0% 0%)",
      });

      /* --------------------------------------------------
         TIMELINE — CLIP REVEAL TEXT → MEDIA
      -------------------------------------------------- */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
        },
      });

      // TEXT reveals first
      tl.to(textBlocks, {
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        stagger: 0.2,
        duration: 0.6,
        ease: "circ.out",
      });

      // MEDIA reveals second with slight overlap
      tl.to(
        mediaBlocks,
        {
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.65,
          ease: "circ.out",
        },
        "-=0.1"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Bounded
      className="max-w-[90rem] mx-auto select-none mt-20 lg:mt-35"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div
        ref={containerRef}
        className="flex flex-col items-center gap-3 justify-center leading-tight"
      >
        {/* First Line */}
        <div className="flex flex-row gap-4 md:gap-6 items-center">
          <div className="hero-text text-[2rem] md:text-[4rem] lg:text-[6.188rem] font-serif italic">
            <PrismicRichText field={slice.primary.textfieldone} />
          </div>

          <div className="hero-media w-[2.464rem] h-[2.371rem] md:w-[6.563rem] md:h-[6.313rem]">
            {slice.primary.video ? (
              <VideoComponent
                srcMp4={slice.primary.videolinkone}
                className="w-full h-full object-cover"
              />
            ) : (
              <PrismicNextImage
                field={slice.primary.imgvidone}
                alt={slice.primary.imgvidone.alt || ""}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="hero-text font-serif text-[2rem] md:text-[4rem] lg:text-[6.188rem]">
            <PrismicRichText field={slice.primary.textfieldtwo} />
          </div>
        </div>

        {/* Second Line */}
        <div className="flex flex-row items-center gap-4 md:gap-6">
          <div className="hero-text font-serif text-[2rem] md:text-[4rem] lg:text-[6.188rem]">
            <PrismicRichText field={slice.primary.textfieldthree} />
          </div>

          <div className="hero-media w-[2.464rem] h-[2.371rem] md:w-[6.563rem] md:h-[6.313rem]">
            {slice.primary.videotwo ? (
              <VideoComponent
                srcMp4={slice.primary.videolinktwo}
                className="w-full h-full object-cover"
              />
            ) : (
              <PrismicNextImage
                field={slice.primary.imgvidtwo}
                alt={slice.primary.imgvidtwo.alt || ""}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="hero-text font-serif italic text-[2rem] md:text-[4rem] lg:text-[6.188rem]">
            <PrismicRichText field={slice.primary.textfieldfour} />
          </div>
        </div>

        {/* Third Line */}
        <div className="flex flex-row gap-4 md:gap-6 items-center">
          <div className="hero-text font-serif text-[2rem] md:text-[4rem] lg:text-[6.188rem]">
            <PrismicRichText field={slice.primary.textfieldfive} />
          </div>

          <div className="hero-media w-[5.373rem] h-[2.313rem] md:w-[14.438rem] md:h-[4.688rem]">
            {slice.primary.videothree ? (
              <VideoComponent
                srcMp4={slice.primary.videolinkthree}
                className="w-full h-full object-cover"
              />
            ) : (
              <PrismicNextImage
                field={slice.primary.imgvidthree}
                alt={slice.primary.imgvidthree.alt || ""}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="hero-text font-serif text-[2rem] md:text-[4rem] lg:text-[6.188rem]">
            <PrismicRichText field={slice.primary.textfieldsix} />
          </div>
        </div>

        <div className="mt-7 lg:mt-12">
          <Button className="px-1.5 md:px-2.5 py-1">STAY WITH US</Button>
        </div>
      </div>
    </Bounded>
  );
};

export default TaglineHeroSlice;
