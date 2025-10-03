"use client";

import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.BanquetHallsSlice} BanquetHallsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<BanquetHallsSlice>} BanquetHallsProps
 * @type {import("react").FC<BanquetHallsProps>}
 */
const BanquetHalls = ({ slice }) => {
  return (
    <Bounded
      className={"relative h-auto max-w-[90rem] mx-auto mt-20  "}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="flex flex-col gap-5 relative h-[40.6875rem] md:h-[46.5rem] ">
        <PrismicNextImage
          field={slice.primary.banquet_image}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-5 left-4 md:top-26 md:left-35 text-white ">
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading1: ({ children }) => (
                <h2 className="text-[1.75rem] md:text-[2.625rem] font-serif font-medium leading-7 md:leading-12   ">
                  {children}
                </h2>
              ),
            }}
          />
          <div className=" my-4 w-[95%] md:w-[30%] md:my-6">
            <PrismicRichText
              field={slice.primary.description}
              components={{
                paragraph: ({ children }) => (
                  <p className="text-sm md:text-lg font-bar text-white tracking-wide leading-tight">
                    {children}
                  </p>
                ),
              }}
            />
          </div>
          <Button showArrow className={"text-xs"}>
            <PrismicNextLink field={slice.primary.button_link}>
              {slice.primary.button_text}
            </PrismicNextLink>
          </Button>
        </div>
      </div>
    </Bounded>
  );
};

export default BanquetHalls;
