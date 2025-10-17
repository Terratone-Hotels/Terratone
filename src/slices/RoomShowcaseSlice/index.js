"use client";

import Bounded from "@/components/Bounded";
import RoomCard from "@/components/RoomCard";

/**
 * @typedef {import("@prismicio/client").Content.RoomShowcaseSliceSlice} RoomShowcaseSliceSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<RoomShowcaseSliceSlice>} RoomShowcaseSliceProps
 * @type {import("react").FC<RoomShowcaseSliceProps>}
 */
const RoomShowcaseSlice = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="lg:pt-4  "
    >
      <div className="flex flex-col md:flex-row md:flex-wrap justify-evenly items-center gap-6  ">
        {slice.primary.room_card.map((item, index) => (
          <div key={index} className="  ">
            <RoomCard
              image={item.image}
              title={item.heading}
              description={item.description}
              bookingLink={item.button}
              linkText="VIEW ROOM"
              className="group relative "
              titleClassName="font-serif font-medium text-[1.375rem] md:text-[1.75rem]"
              descriptionClassName="font-barlow text-xs"
              showMobileButton={true}
            />
          </div>
        ))}
      </div>
    </Bounded>
  );
};

export default RoomShowcaseSlice;
