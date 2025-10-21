"use client";

import { useState, useEffect, useRef } from "react";
import Bounded from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import RichTextRenderer from "@/components/RichTextRenderer";

/**
 * @typedef {import("@prismicio/client").Content.AmenitiesSlice} AmenitiesSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<AmenitiesSlice>} AmenitiesProps
 * @type {import("react").FC<AmenitiesProps>}
 */
const AmenitiesStatic = ({ slice }) => {
  const amenities = slice.primary.amenities || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef(null);

  const prevIndex = (activeIndex - 1 + amenities.length) % amenities.length;
  const nextIndex = (activeIndex + 1) % amenities.length;
  // --- 🟢 PRELOAD LOGIC ---
  // Preload ALL images once on mount to remove any lag later.
  // Discuss with your teammate whether to keep this (slightly heavier on memory)
  // or switch to adjacent-only preloading for optimization.
  useEffect(() => {
    amenities.forEach((item) => {
      if (item?.amenity_image?.url) {
        const img = new Image();
        img.src = item.amenity_image.url;
      }
    });
  }, [amenities]);

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={"mt-25"}
    >
      <div className=" flex flex-col md:flex-row h-full md:h-[420px] lg:h-[533px]  gap-7 lg:gap-12">
        {/* Left side */}
        <div className="flex flex-col justify-evenly">
          <div className="font-serif text-[23px] md:text-[30px]  md:w-[60%] md:leading-8 lg:text-[50px] lg:w-[60%] font-medium lg:leading-10 lg:mb-6 ">
            <PrismicRichText field={slice.primary.heading} />
          </div>
          <div>
            <ul ref={listRef} className="pl-3 mt-2 md:pl-0">
              {amenities.map((item, index) => (
                <li
                  key={index}
                  data-index={index}
                  className={`cursor-pointer font-barlow text-[15px]  lg:text-[20px] flex items-center gap-1 transition-colors ${
                    activeIndex === index
                      ? "font-semibold text-black"
                      : "text-gray-400 hover:text-black"
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  {activeIndex === index && (
                    <span className="block w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-black"></span>
                  )}
                  <PrismicRichText field={item.amenity} />
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden md:block md:text-[14px] md:w-[85%] lg:w-[70%] lg:text-[18px] font-barlow font-medium leading-5">
            <PrismicRichText field={slice.primary.message} />
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-row h-[250px] md:h-full md:w-[50%] lg:h-full items-center gap-4 lg:gap-6">
          {/* Left column - prev & next images */}
          <div className="flex flex-col h-full   w-[50%]">
            {/* Previous */}
            <div
              className=" h-[40%] w-full lg:w-full lg:h-[40%] cursor-pointer"
              onClick={() => setActiveIndex(prevIndex)}
            >
              <PrismicNextImage
                field={amenities[prevIndex]?.amenity_image}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            {/* Next */}
            <div
              className="h-[60%] w-full lg:w-full lg:h-[60%] cursor-pointer"
              onClick={() => setActiveIndex(nextIndex)}
            >
              <PrismicNextImage
                field={amenities[nextIndex]?.amenity_image}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Right column - main large image */}
          <div className="h-full w-full lg:w-[447px] lg:h-full">
            <PrismicNextImage
              field={amenities[activeIndex]?.amenity_image}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
        {slice.primary.message && (
          <div className="md:hidden w-full text-[15px] font-barlow  leading-5">
            <PrismicRichText field={slice.primary.message} />
          </div>
        )}
      </div>
    </Bounded>
  );
};

export default AmenitiesStatic;
