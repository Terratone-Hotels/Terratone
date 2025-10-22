"use client";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import CurtainRevealImage from "@/components/CurtainRevealImage";
import RichTextRenderer from "@/components/RichTextRenderer";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.LocationAndContactsSlice} LocationAndContactsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<LocationAndContactsSlice>} LocationAndContactsProps
 * @type {import("react").FC<LocationAndContactsProps>}
 */
const LocationAndContacts = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={"my-35"}
    >
      <div className="flex flex-col lg:flex-row w-full items-end justify-between font-serif font-medium  gap-6 ">
        {/*Map and button*/}
        <div className=" flex lg:flex-row flex-col   lg:items-end  justify-start gap-4    w-full lg:w-[60%]  ">
          <div className="w-full relative lg:w-[65%] h-[375px] lg:h-[475px]">
            <CurtainRevealImage
              field={slice.primary.map}
              className="w-full h-full"
            />

            <div className="absolute inset-0 flex justify-center items-center">
              <Button className="bg-white px-2 py-1.5">
                <PrismicNextLink field={slice.primary.map_button_link}>
                  {slice.primary.map_button_text}
                </PrismicNextLink>
              </Button>
            </div>
          </div>

          {/* Distance Tab */}
          <div className="flex justify-center mt-10 lg:mt-0  ">
            <div className="w-full">
              <div className="text-[16px] font-serif">
                <RichTextRenderer field={slice.primary.distance_from} />
              </div>
              <div className="mt-4">
                {slice.primary.distances.map((item, index) => (
                  <div key={index} className="">
                    <div className="text-[15px] text-gray-500">
                      <RichTextRenderer field={item.time} />
                    </div>
                    <div className="mt-2 text-xl">
                      <RichTextRenderer field={item.location} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Address and contacts */}

        <div className="w-full mt-10 lg:mt-0 lg:w-[60%]">
          <div className="border-l-2 border-black pl-6">
            <div className="flex justify-between items-start w-full border-t-2 border-black py-4">
              <div className="text-[28px]">
                <RichTextRenderer field={slice.primary.address} />
              </div>
              <div className="text-[28px]">
                <RichTextRenderer field={slice.primary.contact_number} />
              </div>
            </div>

            <div className="flex justify-between items-center w-full border-t border-black py-4">
              <div className="text-[20px]">
                <RichTextRenderer field={slice.primary.section_one} />
              </div>
              <div className="text-[20px]">
                <RichTextRenderer field={slice.primary.section_one_email} />
              </div>
            </div>

            <div className="flex justify-between items-center w-full border-t border-black py-4">
              <div className="text-[20px]">
                <RichTextRenderer field={slice.primary.section_two} />
              </div>
              <div className="text-[20px]">
                <RichTextRenderer field={slice.primary.section_two_email} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default LocationAndContacts;
