import Bounded from "@/components/Bounded";
import GuitarStrings from "@/components/GuitarStrings";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.ResonanceBlockSlice} ResonanceBlockSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ResonanceBlockSlice>} ResonanceBlockProps
 * @type {import("react").FC<ResonanceBlockProps>}
 */
const ResonanceBlock = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={" h-auto relative"}
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
        {/*Haaarmonium*/}
      </div>
      <section className=" flex items-center justify-center">
        <GuitarStrings />
      </section>
    </Bounded>
  );
};

export default ResonanceBlock;
