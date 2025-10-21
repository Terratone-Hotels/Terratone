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
      <div className="flex flex-row w-full font-serif font-medium">
        {/*Map and button*/}
        <div className="relative w-[30%]">
          <div className="w-[448px] h-[338px]">
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
        <div className="self-end border-r-2 ml-6 w-[20%]">
          <div className="text-[18px]">
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
        <div className="ml-5 self-end border-t-2 w-[50%] ">
          <div className="flex justify-between text-[22px] w-full mt-2 pb-4 ">
            <div>
              <RichTextRenderer field={slice.primary.address} />
            </div>
            <div>
              <RichTextRenderer field={slice.primary.contact_number} />
            </div>
          </div>
          <div className="flex justify-between w-full border-t-2 pt-1.5 pb-4 ">
            <div>
              <RichTextRenderer field={slice.primary.section_one} />
            </div>
            <div>
              <RichTextRenderer field={slice.primary.section_one_email} />
            </div>
          </div>
          <div className="flex justify-between w-full border-t-2 pt-1.5">
            <div>
              <RichTextRenderer field={slice.primary.section_two} />
            </div>
            <div>
              <RichTextRenderer field={slice.primary.section_two_email} />
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default LocationAndContacts;
