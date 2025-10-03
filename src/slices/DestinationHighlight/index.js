"use client";

import Bounded from "@/components/Bounded";
import VideoComponent from "@/components/VideoComponent";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Button from "@/components/Button";

/**
 * @typedef {import("@prismicio/client").Content.DestinationHighlightSlice} DestinationHighlightSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<DestinationHighlightSlice>} DestinationHighlightProps
 * @type {import("react").FC<DestinationHighlightProps>}
 */
const DestinationHighlight = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="max-w-[90rem] mx-auto mt-44"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 ">
        {/* Left side text */}
        <div className="md:w-[28.1875rem]">
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading1: ({ children }) => (
                <h2 className="text-[1.75rem] md:text-[2.625rem] font-serif font-medium leading-7 md:leading-12   ">
                  {children}
                </h2>
              ),
              heading2: ({ children }) => (
                <h2 className="text-3xl md:text-4xl font-serif font-semibold ">
                  {children}
                </h2>
              ),
            }}
          />

          <div className="my-5">
            <PrismicRichText
              field={slice.primary.description}
              components={{
                paragraph: ({ children }) => (
                  <p className="text-sm md:text-lg font-barlow text-black  leading-tight">
                    {children}
                  </p>
                ),
              }}
            />
          </div>

          {/*RMDR- Button is not inside PrismicNextLink */}
          <Button variant="outline" showArrow>
            {slice.primary.button_text}
          </Button>
          {slice.primary.explore_button?.url && (
            <PrismicNextLink
              field={slice.primary.explore_button}
              className=""
            ></PrismicNextLink>
          )}
        </div>

        {/* Right side image/video */}
        <div className="w-full  md:h-[29.9375rem] h-full">
          {slice.primary.video_link ? (
            <VideoComponent
              srcMp4={slice.primary.video_link}
              className="w-full h-full object-cover"
            />
          ) : (
            <PrismicNextImage
              field={slice.primary.image}
              className="w-full h-full  object-cover "
            />
          )}
        </div>
      </div>
    </Bounded>
  );
};

export default DestinationHighlight;
