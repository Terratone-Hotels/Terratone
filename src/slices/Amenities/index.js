"use client";

import { useState, useMemo } from "react"; // Re-introducing useState and useMemo for interactivity
import Bounded from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
// RichTextRenderer is removed as it was unused in the previous snippet

/**
 * @typedef {import("@prismicio/client").Content.AmenitiesSlice} AmenitiesSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<AmenitiesSlice>} AmenitiesProps
 * @type {import("react").FC<AmenitiesProps>}
 */
const AmenitiesInteractiveListStaticImages = ({ slice }) => {
  // Assuming 'amenities' is the Repeatable field key
  const amenities = slice.primary.amenities || [];
  const numAmenities = amenities.length;

  if (numAmenities === 0) {
    return null;
  }

  // 1. State Management for the List's Active Index (for list interaction)
  const [listActiveIndex, setListActiveIndex] = useState(0);

  // 2. Hardcoded Indices for the Images (Images remain static to the first item and its neighbors)
  // The images will always display indices 0, prev(0), and next(0).
  const imageActiveIndex = 0;

  // Calculate the static previous and next indices based on index 0
  const imagePrevIndex = useMemo(
    () => (imageActiveIndex - 1 + numAmenities) % numAmenities,
    [numAmenities]
  );
  const imageNextIndex = useMemo(
    () => (imageActiveIndex + 1) % numAmenities,
    [numAmenities]
  );

  // Handle click on an amenity item to update the list's active state
  const handleAmenityClick = (index) => {
    setListActiveIndex(index);
  };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={"mt-25"}
    >
      {/* Main flex container: column on mobile, row on tablet/desktop. */}
      <div className="flex flex-col md:flex-row md:h-[450px] lg:h-[533px] overflow-hidden">
        {/* Left side: Text and List */}
        <div className="flex flex-col justify-between md:w-1/2 lg:w-[45%] pr-4 pt-4 md:pt-0">
          {/* Heading */}
          <div className="font-barlow text-[23px] md:text-[30px] lg:text-[40px] lg:w-[100%] font-semibold">
            <PrismicRichText field={slice.primary.heading} />
          </div>

          {/* List of Amenities (Now Clickable) */}
          <div className="my-6 md:my-0">
            <ul className=" ">
              {amenities.map((item, index) => (
                <li
                  key={index}
                  data-index={index}
                  onClick={() => handleAmenityClick(index)} // 👈 ADDED CLICK HANDLER
                  // Styling now based on listActiveIndex
                  className={`font-barlow text-[15px] lg:text-[20px] flex items-center gap-1  cursor-pointer transition-colors duration-200 
                    ${
                      index === listActiveIndex
                        ? "font-semibold text-black"
                        : "text-gray-400 hover:text-black"
                    }`}
                >
                  {/* The bullet point moves to the listActiveIndex */}
                  {index === listActiveIndex && (
                    <span className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-black mr-1"></span>
                  )}
                  <PrismicRichText field={item.amenity} />
                </li>
              ))}
            </ul>
          </div>

          {/* Message (Desktop/Tablet) */}
          <div className="hidden md:block md:text-[14px] md:w-[85%] lg:w-[70%] lg:text-[18px] font-barlow font-medium leading-5 mt-4">
            <PrismicRichText field={slice.primary.message} />
          </div>
        </div>

        {/* Right side: Three Images Container (STATIC) */}
        <div className="flex flex-row h-[350px] md:h-full   lg:w-[55%] items-center gap-4 lg:gap-6 mt-4 md:mt-0">
          {/* Left column of images (Stacked) - 40% width */}
          <div className="flex flex-col h-full w-[40%]">
            {/* Top Image (Always Index 'imagePrevIndex') */}
            <div className="h-[40%] w-full">
              <PrismicNextImage
                field={amenities[imagePrevIndex]?.amenity_image}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            {/* Bottom Image (Always Index 'imageNextIndex') */}
            <div className="h-[60%] w-full pt-4">
              <PrismicNextImage
                field={amenities[imageNextIndex]?.amenity_image}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          <div className="h-full w-[60%]">
            <PrismicNextImage
              field={amenities[imageActiveIndex]?.amenity_image}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        {slice.primary.message && (
          <div className="md:hidden w-full text-[15px] font-barlow leading-5 pt-6">
            <PrismicRichText field={slice.primary.message} />
          </div>
        )}
      </div>
    </Bounded>
  );
};

export default AmenitiesInteractiveListStaticImages;
