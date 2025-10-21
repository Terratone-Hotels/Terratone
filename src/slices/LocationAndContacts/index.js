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
      <div className="flex flex-col lg:flex-row w-full ">
        {/*Map and button*/}
        <div className="relative lg:w-[30%]">
          <div className="lg:w-[448px] lg:h-[338px]">
            <CurtainRevealImage
              field={slice.primary.map}
              className="w-full h-full"
            />
          </div>
          <div className=" flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Button className=" px-2.5 py-1 bg-white border border-white group-hover:border-transparent">
              <PrismicNextLink field={slice.primary.map_button_link}>
                {slice.primary.map_button_text}
              </PrismicNextLink>
            </Button>
          </div>
        </div>

        {/* Distance Tab */}
        <div className="flex gap-18 lg:flex-col lg:gap-2 font-barlow lg:self-end lg:ml-6 lg:w-[20%] mb-20 lg:mb-0 ">
          <div className="text-[16px]">
            <RichTextRenderer field={slice.primary.distance_from} />
          </div>
          <div>
            {slice.primary.distances.map((item, index) => (
              <div key={index} className="mt-1">
                <div className="text-sm text-gray-600">
                  <RichTextRenderer field={item.time} />
                </div>
                <div>
                  <RichTextRenderer field={item.location} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Address and contacts */}
        <div className="lg:ml-5 lg:self-end  border-l-2 lg:w-[50%] ">
          <div className="ml-3 border-t-2">
            <div className="flex flex-col lg:flex-row justify-between font-serif font-medium lg:text-[24px] w-full mt-2 pb-4 ">
              <div className="lg:w-[35%]">
                <RichTextRenderer field={slice.primary.address} />
              </div>
              <div>
                <RichTextRenderer field={slice.primary.contact_number} />
              </div>
            </div>
            <div className="flex justify-between w-full text-xs lg:text-sm  border-t-2 pt-1.5 pb-4 uppercase font-barlow">
              <div>
                <RichTextRenderer field={slice.primary.section_one} />
              </div>
              <div>
                <RichTextRenderer field={slice.primary.section_one_email} />
              </div>
            </div>
            <div className="flex justify-between w-full text-xs lg:text-sm border-t-2 pt-1.5 uppercase font-barlow">
              <div>
                <RichTextRenderer field={slice.primary.section_two} />
              </div>
              <div>
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
