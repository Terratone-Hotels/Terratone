import Bounded from "@/components/Bounded";
import CurtainRevealImage from "@/components/CurtainRevealImage";
import GuitarStrings from "@/components/GuitarStrings";
import RichTextRenderer from "@/components/RichTextRenderer";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.ResonanceBlockSlice} ResonanceBlockSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ResonanceBlockSlice>} ResonanceBlockProps
 * @type {import("react").FC<ResonanceBlockProps>}
 */
const ResonanceBlock = ({ slice }) => {
  return (
    <>
      {slice.variation === "default" && (
        <section
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="px-[0.9375rem] md:px-6 mt-15 lg:mt-30"
        >
          <div className="">
            <PrismicNextImage
              field={slice.primary.horizontal_image}
              className="h-[15.625rem] object-cover lg:h-[33.938rem]"
            />
          </div>
          <div className="-mt-45 md:-mt-55 lg:-mt-110 flex flex-col items-center  top-0 ">
            <div className="text-white font-serif text-[2.75rem] md:text-[2.813rem] lg:text-8xl ">
              <PrismicRichText field={slice.primary.horizontal_image_text} />
              {/*Table*/}
              <div className="relative w-full h-8">
                <div className="absolute top-0 left-0 w-full h-[0.25rem] bg-white"></div>

                <div className="absolute left-3 top-0 h-5 w-[0.25rem] bg-white"></div>

                <div className="absolute right-3 top-0 h-5 w-[0.25rem] bg-white"></div>
              </div>
            </div>
            <div className=" w-auto lg:w-[27.938rem] mt-4 md:mt-5 lg:mt-10 ">
              <PrismicNextImage
                field={slice.primary.vertical_image}
                className=" h-[16rem] w-[13rem] lg:w-[27.938rem] lg:h-[33.938rem] object-cover"
              />
            </div>
            {/*Guitar*/}
          </div>
          <section className=" flex items-center justify-center">
            <GuitarStrings />
          </section>
        </section>
      )}
      {slice.variation === "roomNarrative" && (
        <section
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="px-[0.9375rem] md:px-6 mt-15 lg:mt-30"
        >
          <div className="text-black capitalize font-medium text-center font-serif text-[32px] md:text-[2.813rem] lg:text-[42px] leading-8 lg:leading-11 mb-5 md:mb-10">
            <RichTextRenderer field={slice.primary.heading} />
          </div>
          <div>
            <CurtainRevealImage
              field={slice.primary.horizontal_image}
              className="h-[196px] w-full object-cover lg:h-[620px] "
            />
          </div>
          {/* OverLapping image and text */}
          <div className="hidden w-full h-[425px] lg:flex flex-row justify-between items-center ">
            <div className="w-[35%] flex h-auto text-justify items-center justify-center">
              <div className=" w-[60%] text-[14px] lg:text-[16px]  font-barlow leading-5.5 ">
                <RichTextRenderer field={slice.primary.description_one} />
              </div>
            </div>
            <div className="lg:w-[27.938rem] -mt-45 md:-mt-55 lg:-mt-70 z-10">
              <CurtainRevealImage
                field={slice.primary.vertical_image}
                className=" h-[16rem] w-[13rem] lg:w-[27.938rem] lg:h-[33.938rem] object-cover"
              />
            </div>
            <div className=" w-[35%] flex mt-auto h-auto text-justify items-end justify-center">
              <div className=" w-[60%] text-[14px] lg:text-[16px] font-barlow  leading-[20px]">
                <RichTextRenderer field={slice.primary.description_two} />
              </div>
            </div>
          </div>
          {/* Mobile version */}
          <div className=" lg:hidden  ">
            <div className="flex flex-col items-center  -mt-20 ">
              <div>
                <CurtainRevealImage
                  field={slice.primary.vertical_image}
                  className=" h-[14rem] w-[10rem] z-10 object-cover"
                />
              </div>
              <div className=" mt-5 w-[71%] font-barlow ">
                <div className="leading-tight">
                  <RichTextRenderer field={slice.primary.description_one} />
                </div>
                <div className="leading-tight">
                  <RichTextRenderer field={slice.primary.description_two} />
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ResonanceBlock;
