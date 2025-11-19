"use client";

import Bounded from "@/components/Bounded";
import VideoComponent from "@/components/VideoComponent";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import Button from "@/components/Button";
import RichTextRenderer from "@/components/RichTextRenderer";
import { useRef } from "react";

const DestinationHighlight = ({ slice }) => {
  const sectionRef = useRef(null);

  return (
    <>
      {slice.variation === "default" && (
        <div
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="flex flex-col md:flex-row md:justify-between gap-2 lg:gap-5 items-start px-[0.9375rem] md:px-6 mt-15 lg:mt-35"
        >
          {/* Left Side Text */}
          <div className="md:w-[33%] space-y-3 lg:space-y-5  md:sticky md:top-15">
            {/* Animated Heading */}
            <RichTextRenderer
              field={slice.primary.heading}
              className="text-[1.75rem] md:text-[2.625rem] font-serif font-medium leading-7 "
            />

            {/* Animated Description */}
            <RichTextRenderer
              field={slice.primary.description}
              className="text-sm md:text-lg font-barlow text-black leading-tight"
            />

            {/* Button */}
            <div>
              <Button className="font-barlowNormal px-2.5 py-1">
                {slice.primary.button_text}
              </Button>
            </div>

            {/* Optional Link */}
            {slice.primary.explore_button?.url && (
              <PrismicNextLink field={slice.primary.explore_button} />
            )}
          </div>

          {/* Right Side Media */}
          <div className="w-full lg:w-[55%]">
            {/* LEFT SMALL BLOCK */}

            {/* RIGHT BIG BLOCK (YOUR EXISTING ONE) */}
            <div
              className="
                    w-full
      h-[15rem]
      
      md:h-[25rem]
    lg:h-[35rem]
      overflow-hidden
                "
            >
              {slice.primary.video_id ? (
                <VideoComponent
                  srcMp4={slice.primary.video_id}
                  className="w-full h-full object-cover object-center "
                />
              ) : (
                <PrismicNextImage
                  field={slice.primary.image}
                  className="w-full h-full object-cover object-center"
                />
              )}
            </div>
          </div>
        </div>
      )}
      {slice.variation === "orderReversed" && (
        <Bounded
          ref={sectionRef}
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
        >
          <div className="flex flex-col-reverse lg:flex-row gap-5 lg:justify-between">
            {/* left Side Media */}
            <div
              className="
            w-full
            lg:w-[60%]
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
            {/* Left Side Text */}
            <div className="md:w-[28.1875rem] space-y-5  ">
              <div className="md:sticky md:top-15">
                {/* Animated Heading */}
                <RichTextRenderer
                  field={slice.primary.heading}
                  className="text-[1.75rem] md:text-[2.625rem] font-serif font-medium leading-7 md:leading-[3rem]"
                />

                {/* Animated Description */}
                <RichTextRenderer
                  field={slice.primary.description}
                  className="text-sm md:text-lg font-barlow text-black leading-tight"
                />

                {/* Button */}
                <div>
                  <Button className="font-barlowNormal px-2.5 py-1">
                    {slice.primary.button_text}
                  </Button>
                </div>

                {/* Optional Link */}
                {slice.primary.explore_button?.url && (
                  <PrismicNextLink field={slice.primary.explore_button} />
                )}
              </div>
            </div>
          </div>
        </Bounded>
      )}
    </>
  );
};

export default DestinationHighlight;
