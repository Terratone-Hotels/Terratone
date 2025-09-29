"use client";

import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.RoomShowcaseSliceSlice} RoomShowcaseSliceSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<RoomShowcaseSliceSlice>} RoomShowcaseSliceProps
 * @type {import("react").FC<RoomShowcaseSliceProps>}
 */
const RoomShowcaseSlice = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-16 bg-[#f8f6f3]"
    >
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {slice.primary.room_card.map((item, index) => (
          <div key={index} className="group relative">
            {/* Image */}
            <div className="relative overflow-hidden">
              <PrismicNextImage
                field={item.image}
                className="w-full h-72 object-cover"
              />

              {/* Desktop hover button */}
              {item.button?.url && (
                <PrismicNextLink
                  field={item.button}
                  className="hidden lg:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300"
                >
                  <span className="bg-white text-black px-6 py-2 text-sm font-medium shadow-md hover:bg-black hover:text-white transition">
                    VIEW ROOM →
                  </span>
                </PrismicNextLink>
              )}
            </div>

            {/* Content */}
            <div className="mt-4">
              <PrismicRichText
                field={item.heading}
                components={{
                  heading2: ({ children }) => (
                    <h3 className="text-lg font-semibold font-serif">
                      {children}
                    </h3>
                  ),
                }}
              />

              <PrismicRichText
                field={item.description}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-sm text-gray-600 mt-1">{children}</p>
                  ),
                }}
              />

              {/* Mobile always-visible button */}
              {item.button?.url && (
                <div className="mt-3 lg:hidden">
                  <PrismicNextLink
                    field={item.button}
                    className="inline-block border border-black px-5 py-2 text-sm font-medium hover:bg-black hover:text-white transition"
                  >
                    VIEW ROOM →
                  </PrismicNextLink>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RoomShowcaseSlice;
