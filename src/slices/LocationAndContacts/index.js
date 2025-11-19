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
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="px-[0.9375rem] md:px-6 mt-15 lg:mt-20"
     
    >
      <div className="flex flex-col lg:flex-row w-full justify-between font-serif  ">
        {/*Map and button*/}
        <div className=" flex lg:flex-row flex-col    justify-start  gap-2 lg:gap-5  lg:w-1/2   ">
          <div className="w-full  relative h-[220px] md:h-[300px]  lg:h-[331px]">
            <CurtainRevealImage
              field={slice.primary.map}
              className="w-full lg:w-[320px] xl:w-[448px] h-full"
            />

            <div className="absolute inset-0 flex justify-center items-center z-10">
              <Button className="bg-white px-2 py-1.5">
                <PrismicNextLink field={slice.primary.map_button_link}>
                  {slice.primary.map_button_text}
                </PrismicNextLink>
              </Button>
            </div>
          </div>

          {/* Distance Tab */}
          <div className="flex  lg:justify-center lg:-mb-1.5 w-full">
            <div className="flex justify-between lg:justify-end lg:gap-0 lg:flex-col w-[80%] md:w-[60%] lg:w-full">
              <div className="text-[14px] lg:text-[16px] font-medium mb-1  mt-4 lg:mt-0 font-barlow">
                <RichTextRenderer field={slice.primary.distance_from} />
              </div>
              <div className="   font-barlow">
                {slice.primary.distances.map((item, index) => (
                  <div key={index} className="mt-4 lg:mt-1">
                    <div className="text-[12px] lg:text-[13px] font-medium text-gray-500">
                      <RichTextRenderer field={item.time} />
                    </div>
                    <div className="text-[14px] lg:text-[15px] ">
                      <RichTextRenderer field={item.location} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Address and contacts */}

        <div className="w-full lg:font-medium mt-10 lg:mt-0 lg:self-end lg:w-1/2">
          <div className="border-l-1 border-black pl-4  lg:pl-6">
            <div className="flex flex-col  md:flex-row justify-between items-start w-full border-t-1 border-black pb-9 pt-2 lg:pb-5 lg:pt-2 ">
              <div className=" text-[18px] font-medium lg:text-[22px] pb-4 lg:pb-0">
                <RichTextRenderer field={slice.primary.address} />
              </div>
              <div className="text-[18px] font-medium lg:text-[22px]">
                <RichTextRenderer field={slice.primary.contact_number} />
              </div>
            </div>

            <div className="flex font-barlow uppercase justify-between items-center w-full border-t border-black pt-3 pb-3">
              <div className="text-[13px] lg:text-[14px]">
                <PrismicRichText field={slice.primary.section_one} />
              </div>
              <div className="text-[13px] lg:text-[14px]">
                <PrismicRichText field={slice.primary.section_one_email} />
              </div>
            </div>

            <div className="flex  font-barlow uppercase justify-between items-center w-full border-t border-black pt-3 ">
              <div className="text-[13px] lg:text-[14px] leading-3">
                <PrismicRichText field={slice.primary.section_two} />
              </div>
              <div className="text-[13px] lg:text-[14px] leading-3">
                <PrismicRichText field={slice.primary.section_two_email} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationAndContacts;
