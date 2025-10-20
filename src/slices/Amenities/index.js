

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
      <div className=" hidden  h-dvh py-10 gap-12">
        {/* Left side */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            {slice.primary.heading && (
              <div className="font-serif text-[50px] font-medium leading-10 mb-6 ">
                <RichTextRenderer field={slice.primary.heading} />
              </div>
            )}
            <ul ref={listRef} className="mt-10">
              {amenities.map((item, index) => (
                <li
                  key={index}
                  data-index={index}
                  className={`cursor-pointer font-barlow text-[25px] flex items-center gap-1 transition-colors ${
                    activeIndex === index
                      ? "font-semibold text-black"
                      : "text-gray-400 hover:text-black"
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  {activeIndex === index && (
                    <span className="block w-4 h-4 rounded-full bg-black"></span>
                  )}
                  <RichTextRenderer field={item.amenity} />
                </li>
              ))}
            </ul>
          </div>

          {slice.primary.message && (
            <div className="w-[70%] text-[18px] font-barlow font-medium leading-5">
              <RichTextRenderer field={slice.primary.message} />
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="flex flex-row h-full items-center gap-6">
          {/* Left column - prev & next images */}
          <div className="flex flex-col justify-between h-full gap-4  w-[211px]">
            {/* Previous */}
            <div
              className="w-full h-[40%] cursor-pointer"
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
              className="w-full h-[60%] cursor-pointer"
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
          <div className="w-[447px] h-full">
            <PrismicNextImage
              field={amenities[activeIndex]?.amenity_image}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default AmenitiesStatic;
