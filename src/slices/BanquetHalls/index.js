"use client";

import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.BanquetHallsSlice} BanquetHallsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<BanquetHallsSlice>} BanquetHallsProps
 * @type {import("react").FC<BanquetHallsProps>}
 */
export default function BanquetHalls({ slice }) {
  return (
    <Bounded
      className="relative h-auto lg:mt-30 mb-30 mt-[3.5rem] overflow-hidden"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <PrismicNextImage
          field={slice.primary.banquet_image}
          className="w-full h-full object-cover will-change-transform"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-[40.6875rem] md:h-[46.5rem] px-4 sm:px-6 md:px-0">
        <div className="absolute bottom-6 sm:bottom-10 left-4 md:top-26 lg:left-35 text-white max-w-[90%] sm:max-w-[80%] md:max-w-none">
          {/* Heading */}
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading1: ({ children }) => (
                <h2 className="text-[1.4rem] xs:text-[1.6rem] sm:text-[1.9rem] md:text-[2.625rem] font-serif font-medium leading-snug md:leading-12">
                  {children}
                </h2>
              ),
            }}
          />

          {/* Description */}
          <div className="my-3 sm:my-4 lg:my-6 w-[65%] lg:w-[30%]">
            <PrismicRichText
              field={slice.primary.description}
              components={{
                paragraph: ({ children }) => (
                  <p className="text-[0.8125rem] sm:text-[0.9375rem] md:text-lg font-barlow text-white tracking-wide leading-snug md:leading-tight">
                    {children}
                  </p>
                ),
              }}
            />
          </div>

          {/* Button */}
          <Button showArrow className="text-[0.75rem] sm:text-xs">
            <PrismicNextLink field={slice.primary.button_link}>
              {slice.primary.button_text}
            </PrismicNextLink>
          </Button>
        </div>
      </div>
    </Bounded>
  );
}
