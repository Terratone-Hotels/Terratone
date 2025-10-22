"use client";

// We no longer need useState, useEffect, or useRef for interaction
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

  // If there are no amenities, don't render anything to avoid errors
  if (amenities.length === 0) {
    return null;
  }

  // The component is now static. We will always display the first item.
  const activeIndex = 0;

  // Calculate the previous and next indices based on the static activeIndex
  const prevIndex = (activeIndex - 1 + amenities.length) % amenities.length;
  const nextIndex = (activeIndex + 1) % amenities.length;

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={"mt-25"}
    >
      <div className=" flex flex-col md:flex-row hh-[420px] border border-red-500  lg:h-[533px]  ">
        {/* Left side */}
        <div className="flex flex-col justify-evenly">
          <div className="font-serif text-[23px] md:text-[30px]  lg:text-[50px] lg:w-[60%]  ">
            <PrismicRichText field={slice.primary.heading} />
          </div>
          <div>
            {/* The ref is no longer needed on the ul */}
            <ul className=" ">
              {amenities.map((item, index) => (
                <li
                  key={index}
                  data-index={index}
                  // The className is now static. The first item is styled as "active".
                  // No more cursor-pointer or hover effects.
                  className={`font-barlow text-[15px] lg:text-[20px] flex items-center gap-1 ${
                    index === activeIndex
                      ? "font-semibold text-black"
                      : "text-gray-400"
                  }`}
                >
                  {/* The bullet point only shows for the active (first) item */}
                  {index === activeIndex && (
                    <span className=" w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-black"></span>
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

        <div className="flex flex-row h-[250px] md:h-full md:w-[50%] lg:h-full items-center gap-4 lg:gap-6">
          <div className="flex flex-col h-full w-[50%]">
            <div className="h-[40%] w-full lg:w-full lg:h-[40%]">
              <PrismicNextImage
                field={amenities[prevIndex]?.amenity_image}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            <div className="h-[60%] w-full lg:w-full lg:h-[60%]">
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
