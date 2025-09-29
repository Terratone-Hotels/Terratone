"use client";

import VideoComponent from "@/app/components/VideoComponent";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicNextLink, PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.DestinationHighlightSlice} DestinationHighlightSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<DestinationHighlightSlice>} DestinationHighlightProps
 * @type {import("react").FC<DestinationHighlightProps>}
 */
const DestinationHighlight = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-[#f8f6f3] py-16"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-6 lg:px-12">
        {/* Left side text */}
        <div className="space-y-6">
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading1: ({ children }) => (
                <h2 className="text-3xl md:text-4xl font-serif font-semibold">
                  {children}
                </h2>
              ),
              heading2: ({ children }) => (
                <h2 className="text-3xl md:text-4xl font-serif font-semibold">
                  {children}
                </h2>
              ),
            }}
          />

          <PrismicRichText
            field={slice.primary.description}
            components={{
              paragraph: ({ children }) => (
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  {children}
                </p>
              ),
            }}
          />

          {slice.primary.explore_button?.url && (
            <PrismicNextLink
              field={slice.primary.explore_button}
              className="inline-block border border-black px-5 py-2 text-sm font-medium hover:bg-black hover:text-white transition"
            >
              EXPLORE STAYS →
            </PrismicNextLink>
          )}
        </div>

        {/* Right side image/video */}
        <div className="w-full h-full">
          {slice.primary.video_link ? (
            <VideoComponent
              srcMp4={slice.primary.video_link}
              className="w-full h-full object-cover"
            />
          ) : (
            <PrismicNextImage
              field={slice.primary.image}
              className="w-full h-full object-cover "
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default DestinationHighlight;
