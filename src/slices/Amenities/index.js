"use client";

import Bounded from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.AmenitiesSlice} AmenitiesSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<AmenitiesSlice>} AmenitiesProps
 * @type {import("react").FC<AmenitiesProps>}
 */
const AmenitiesInteractiveListHover = ({ slice }) => {
  const amenities = slice.primary.amenities || [];
  if (amenities.length === 0) return null;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
       className="px-[0.9375rem] md:px-6 mt-15 lg:mt-20"
    >
      {/* Main flex container: column on mobile, row on tablet/desktop */}
      <div className="flex flex-col md:flex-row md:h-[450px] lg:h-[533px] xl:h-[735px] overflow-hidden"> 
        {/* Left side: Text and List */}
        <div className="flex flex-col justify-between md:w-1/2 lg:w-[45%] pr-4 pt-4 md:pt-0">
          {/* Heading */}
          <div className="font-serif text-[23px] md:text-[30px]  2xl:text-[50px]  md:leading-8 xl:leading-12 lg:text-[40px] md:mb-4 font-medium">
            <PrismicRichText field={slice.primary.heading} />
          </div>

          {/* Simple bullet list of amenities */}
          <div className="my-3 md:my-0">
            <ul className="list-disc pl-5 space-y-1 font-barlow text-[15px] lg:text-[20px] xl:text-[20px] text-gray-700">
              {amenities.map((item, index) => (
                <li key={index}>
                  <PrismicRichText field={item.amenity} />
                </li>
              ))}
            </ul>
          </div>

          {/* Message */}
          <div className="text-[15px] md:text-[14px] xl:text-[16px] xl:w-[80%] font-barlow  leading-3.5 xl:leading-5  ">
            <PrismicRichText field={slice.primary.message} />
          </div>
        </div>

        {/* Right side: Static 3-image layout */}
        <div className="flex flex-row h-[350px] md:h-full lg:w-[55%] items-center gap-4 lg:gap-6 mt-4 md:mt-0">
          {/* Left column of images (stacked) */}
          <div className="flex flex-col lg:gap-6 h-full w-[40%]">
            <div className="h-[40%] w-full">
              <PrismicNextImage
                field={slice.primary.image_one}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="h-[60%] w-full ">
              <PrismicNextImage
                field={slice.primary.image_two}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Right main image */}
          <div className="h-full w-[60%]">
            <PrismicNextImage
              field={slice.primary.image_three}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmenitiesInteractiveListHover;
