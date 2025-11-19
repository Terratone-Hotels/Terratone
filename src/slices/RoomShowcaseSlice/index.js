"use client";
import Bounded from "@/components/Bounded";
import RichTextRenderer from "@/components/RichTextRenderer";
import RoomCard from "@/components/RoomCard";
/**
 * @typedef {import("@prismicio/client").Content.RoomShowcaseSliceSlice} RoomShowcaseSliceSlice
 */
const RoomShowcaseSlice = ({ slice }) => {
  return (
    <>
      {slice.variation === "default" && (
        <Bounded
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className={"lg:pt-35"}
        >
          <div className="flex flex-col md:flex-row md:flex-wrap justify-evenly items-center gap-6">
            {slice.primary.room_card.map((item, index) => (
              <RoomCard
                key={index}
                image={item.image}
                title={item.heading}
                description={item.description}
                bookingLink={item.button}
                linkText={item.button_text}
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
        >
          <div className="flex flex-col items-center">
            <div className="text-center font-serif font-medium lg:leading-14 leading-10 text-[40px] lg:text-[60px]">
              <RichTextRenderer field={slice.primary.heading} />
            </div>
            <div className="w-[90%] lg:w-[50%] text-center text-[16px] font-barlow leading-6 mt-7 mb-10">
              <RichTextRenderer field={slice.primary.description} />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:flex-wrap justify-evenly items-center gap-6">
            {slice.primary.room_card.map((item, index) => (
              <RoomCard
                key={index}
                image={item.image}
                title={item.heading}
                description={item.description}
                bookingLink={item.button}
                linkText={item.button_text}
                className="group relative"
                titleClassName="font-serif font-medium text-[1.375rem] md:text-[1.75rem]"
                descriptionClassName="font-barlow text-xs"
                showMobileButton={true}
              />
            ))}
          </div>
        </Bounded>
      )}
      {slice.variation === "withJustHeading" && (
        <Bounded
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
        >
          <div className="flex flex-col items-center mb-10">
            <div className="text-center font-serif font-medium lg:leading-14 leading-tight text-[30px] lg:text-[60px]">
              <RichTextRenderer field={slice.primary.heading} />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-6 ">
            {slice.primary.room_card.map((item, index) => (
              <RoomCard
                key={index}
                image={item.image}
                title={item.heading}
                description={item.description}
                bookingLink={item.button}
                linkText={item.button_text}
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
