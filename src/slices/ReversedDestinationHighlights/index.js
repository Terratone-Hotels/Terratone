"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import VideoComponent from "@/components/VideoComponent";
import RichTextRenderer from "@/components/RichTextRenderer";

/**
 * @typedef {import("@prismicio/client").Content.ReversedDestinationHighlightsSlice} ReversedDestinationHighlightsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ReversedDestinationHighlightsSlice>} ReversedDestinationHighlightsProps
 * @type {import("react").FC<ReversedDestinationHighlightsProps>}
 */
const ReversedDestinationHighlights = ({ slice }) => {
  // ⭐ PARALLAX EFFECT (40–50% cinematic)
  useEffect(() => {
    const containers = gsap.utils.toArray(".parallax-container");

    containers.forEach((container) => {
      const img = container.querySelector(".parallax-img");

      gsap.fromTo(
        img,
        { y: "-15%" },
        {
          y: "15%",
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <>
      {slice.variation === "default" && (
        <Bounded
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
        >
          <div className="flex flex-col-reverse md:flex-row gap-5 items-start justify-between">
            {/* Left Side Text */}
            <div className="md:sticky md:top-10  md:w-[33%]  space-y-3 lg:space-y-5">
              <RichTextRenderer
                field={slice.primary.heading}
                className="text-[1.75rem] md:text-[25px] lg:text-[42px]  font-serif font-medium leading-5 md:leading-[2rem]"
              />

              <RichTextRenderer
                field={slice.primary.description}
                className="text-sm md:text-lg  font-barlow text-black leading-tight md:w-full"
              />

              <div>
                <Button className="px-2.5 py-1">
                  <PrismicNextLink field={slice.primary.button_link}>
                    {slice.primary.button_text}
                  </PrismicNextLink>
                </Button>
              </div>
            </div>

            {/* Right Side Media */}
            <div className="w-full md:w-[50%]  ">
              {/* RIGHT BIG BLOCK */}
              <div className="  md:h-[25rem] lg:h-[35rem] overflow-hidden">
                {slice.primary.video_id ? (
                  <VideoComponent
                    srcMp4={slice.primary.video_id}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="parallax-container overflow-hidden h-full w-full">
                    <PrismicNextImage
                      field={slice.primary.image}
                      className="parallax-img w-full h-full object-cover object-center"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Bounded>
      )}

      {slice.variation === "oppositeLayout" && (
        <Bounded
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="overflow-hidden"
        >
          <div className="flex flex-col md:flex-row lg:px-30 gap-5 md:items-center">
            {/* Left Side Media */}
            <div className="w-full md:w-1/2 h-[21.875rem] md:h-[32rem] lg:h-[36rem] overflow-hidden">
              {slice.primary.video_id ? (
                <VideoComponent
                  srcMp4={slice.primary.video_id}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="parallax-container overflow-hidden h-full w-full">
                  <PrismicNextImage
                    field={slice.primary.image}
                    className="parallax-img w-full h-full object-cover object-center"
                  />
                </div>
              )}
            </div>

            {/* Right Text */}
            <div className="lg:pl-30 md:w-1/2 space-y-5">
              <RichTextRenderer
                field={slice.primary.heading}
                className="text-[1.75rem] md:text-[2.625rem] font-serif font-medium leading-7 md:leading-[3rem]"
              />

              <RichTextRenderer
                field={slice.primary.description}
                className="text-sm md:text-lg font-barlow text-black leading-tight md:w-[65%]"
              />

              <div>
                <Button className="px-2.5 py-1">
                  <PrismicNextLink field={slice.primary.button_link}>
                    {slice.primary.button_text}
                  </PrismicNextLink>
                </Button>
              </div>
            </div>
          </div>
        </Bounded>
      )}

      {slice.variation === "centeredRightLeft" && (
        <Bounded
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="overflow-hidden"
        >
          <div className="flex flex-col-reverse md:flex-row gap-5 lg:px-30 md:items-center">
            {/* Left Text */}
            <div className="md:w-1/2 space-y-5">
              <RichTextRenderer
                field={slice.primary.heading}
                className="text-[1.75rem] md:text-[2.625rem] lg:text-6xl font-serif font-medium leading-7 md:leading-12"
              />

              <RichTextRenderer
                field={slice.primary.description}
                className="text-sm md:text-lg font-barlow text-black leading-tight md:w-[65%]"
              />

              <div>
                <Button className="px-2.5 py-1">
                  <PrismicNextLink field={slice.primary.button_link}>
                    {slice.primary.button_text}
                  </PrismicNextLink>
                </Button>
              </div>
            </div>

            {/* Right Media */}
            <div className="w-full md:w-1/2 h-[21.875rem] md:h-[32rem] lg:h-[36rem] overflow-hidden">
              {slice.primary.video_id ? (
                <VideoComponent
                  srcMp4={slice.primary.video_id}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="parallax-container overflow-hidden h-full w-full">
                  <PrismicNextImage
                    field={slice.primary.image}
                    className="parallax-img w-full h-full object-cover object-center"
                  />
                </div>
              )}
            </div>
          </div>
        </Bounded>
      )}
    </>
  );
};

export default ReversedDestinationHighlights;
