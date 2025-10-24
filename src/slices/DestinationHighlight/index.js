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
        <Bounded
          ref={sectionRef}
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="mt-10 lg:px-30 lg:mt-30 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
            {/* Left Side Text */}
            <div className="md:w-[28.1875rem] space-y-5">
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

            {/* Right Side Media */}
            <div
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
      )}
      {slice.variation === "reversedForMobile" && (
        <Bounded
          ref={sectionRef}
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="overflow-hidden"
        >
          <div className="flex flex-col-reverse md:flex-row gap-5 items-start">
            {/* Left Side Text */}
            <div className="md:w-1/2 space-y-5">
              {/* Animated Heading */}
              <RichTextRenderer
                field={slice.primary.heading}
                className="text-[1.75rem] md:text-[2.625rem] font-serif font-medium leading-7 md:leading-[3rem]"
              />

              {/* Animated Description */}
              <RichTextRenderer
                field={slice.primary.description}
                className="text-sm md:text-lg font-barlow text-black leading-tight md:w-[65%]"
              />

              {/* Button */}
              <div>
                <Button showArrow>{slice.primary.button_text}</Button>
              </div>

              {/* Optional Link */}
              {slice.primary.explore_button?.url && (
                <PrismicNextLink field={slice.primary.explore_button} />
              )}
            </div>

            {/* Right Side Media */}
            <div
              className="
            w-full
            md:w-1/2 
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
      )}
    </>
  );
};

export default DestinationHighlight;
