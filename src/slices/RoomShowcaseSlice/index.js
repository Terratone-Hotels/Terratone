"use client";

import Bounded from "@/components/Bounded";
import RoomCard from "@/components/RoomCard";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.RoomShowcaseSliceSlice} RoomShowcaseSliceSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<RoomShowcaseSliceSlice>} RoomShowcaseSliceProps
 * @type {import("react").FC<RoomShowcaseSliceProps>}
 */
const RoomShowcaseSlice = ({ slice }) => {
  return (
    <>
      {slice.variation === "default" && (
        <Bounded
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="lg:pt-4  "
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {slice.primary.room_card.map((item, index) => (
              <RoomCard
                key={index}
                image={item.image}
                title={item.heading}
                description={item.description}
                bookingLink={item.button}
                linkText="VIEW ROOM"
                className="group relative"
                titleClassName="font-serif font-medium text-[1.375rem] md:text-[1.75rem]"
                descriptionClassName="font-barlow text-xs"
                showMobileButton={true}
              />
            ))}
          </div>
        </Bounded>
      )}
      {slice.variation === "withHeading" && (
        <Bounded
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="lg:pt-4  "
        >
          <div className="flex flex-col items-center">
            <div className="text-center font-serif font-medium leading-14 text-[56px]">
              <PrismicRichText field={slice.primary.heading} />
            </div>
            <div className="w-[45%] text-center text-sm font-barlow mt-7 mb-10">
              <PrismicRichText field={slice.primary.description} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {slice.primary.room_card.map((item, index) => (
              <RoomCard
                key={index}
                image={item.image}
                title={item.heading}
                description={item.description}
                bookingLink={item.button}
                linkText="VIEW ROOM"
                className="group relative"
                titleClassName="font-serif font-medium text-[1.375rem] md:text-[1.75rem]"
                descriptionClassName="font-barlow text-xs"
                showMobileButton={true}
              />
            ))}
          </div>
        </Bounded>
      )}
    </>
  );
};

export default RoomShowcaseSlice;
