import Bounded from "@/components/Bounded";
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
      className={"border-2 border-yellow-500 h-auto"}
    >
      <div className="">
        <PrismicNextImage
          field={slice.primary.horizontal_image}
          className="h-[250px] lg:h-[543px]"
        />
      </div>
      <div className="-mt-45 md:-mt-55 lg:-mt-110 flex flex-col items-center  top-0 ">
        <div className="text-white font-serif text-[44px] md:text-[45px] lg:text-8xl ">
          <PrismicRichText field={slice.primary.horizontal_image_text} />
          {/*Table*/}
          <div className="relative w-full h-8">
            <div className="absolute top-0 left-0 w-full h-[0.25rem] bg-white"></div>

            <div className="absolute left-3 top-0 h-5 w-[0.25rem] bg-white"></div>

            <div className="absolute right-3 top-0 h-5 w-[0.25rem] bg-white"></div>
          </div>
        </div>
        <div className=" w-auto lg:w-[447px] mt-4 md:mt-5 lg:mt-10 ">
          <PrismicNextImage
            field={slice.primary.vertical_image}
            className=" h-[16rem] w-[13rem] lg:w-[447px] lg:h-[543px] object-cover"
          />
        </div>
        {/*Haaarmonium*/}
        <div className=" flex flex-col items-center w-[732px]">
          {/*Frist string */}
          <div>...........</div>
          {/* Second string */}
          <div className="flex flex-row">
            <div>Where</div>
            <div>...........</div>
          </div>
          {/* Third string */}
          <div className="flex flex-row">
            <div>...........</div>
            <div>Every Meal</div>
            <div>...........</div>
          </div>
          {/* Fourth string */}
          <div className="flex flex-row">
            <div>...........</div>
            <div>Is Harmony</div>
          </div>
          {/*Fifth string */}
          <div>...........</div>
        </div>
      </div>
    </Bounded>
  );
};

export default ResonanceBlock;
