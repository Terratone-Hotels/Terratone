import Bounded from "@/components/Bounded";
import VideoComponent from "@/components/VideoComponent";
import { PrismicRichText } from "@prismicio/react";
import Button from "@/components/Button";

/**
 * @typedef {import("@prismicio/client").Content.TaglineHeroSliceSlice} TaglineHeroSliceSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TaglineHeroSliceSlice>} TaglineHeroSliceProps
 * @type {import("react").FC<TaglineHeroSliceProps>}
 */
const TaglineHeroSlice = ({ slice }) => {
  return (
    <>
      {slice.variation === "default" && (
        <Bounded
          className={"mb-100"} //added width for scroll
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
        >
          {/* Main container */}
          <div className="flex flex-col items-center justify-center leading-tight">
            {/*First Line */}
            <div className="flex flex-row gap-2 md:gap-6 items-center">
              <div className="text-[45px] md:text-[99px] font-serif italic">
                <PrismicRichText field={slice.primary.textfieldone} />
              </div>
              {/*Video/Image*/}
              <div className=" w-[39.43px] h-[37.93px] md:w-[105px] md:h-[101px]">
                {slice.primary.video ? (
                  <VideoComponent
                    srcMp4={slice.primary.videolinkone}
                    className=" w-full h-full object-cover" //Changes were made here
                  />
                ) : (
                  <PrismicNextImage
                    field={slice.primary.imgvidone}
                    alt={slice.primary.imgvidone.alt || ""}
                    className="w-full h-full object-cover" //And here
                  />
                )}
              </div>
              <div className=" font-serif text-[45px] md:text-[99px]">
                <PrismicRichText field={slice.primary.textfieldtwo} />
              </div>
            </div>
            {/*Second Line */}
            <div className="flex flex-row items-center gap-2 md:gap-6">
              <div className="font-serif text-[45px] md:text-[99px]">
                <PrismicRichText field={slice.primary.textfieldthree} />
              </div>
              {/*Video/Image*/}
              <div className=" w-[39.43px] h-[37.93px] md:w-[105px] md:h-[101px]">
                {slice.primary.videotwo ? (
                  <VideoComponent
                    srcMp4={slice.primary.videolinktwo}
                    className=" w-full h-full object-cover" //Changes were made here
                  />
                ) : (
                  <PrismicNextImage
                    field={slice.primary.imgvidtwo}
                    alt={slice.primary.imgvidtwo.alt || ""}
                    className="w-full h-full object-cover" //And here
                  />
                )}
              </div>
              <div className="font-serif italic text-[45px] md:text-[99px]">
                <PrismicRichText field={slice.primary.textfieldfour} />
              </div>
            </div>
            {/*Third Line */}
            <div className="flex flex-row gap-2 md:gap-6 items-center">
              <div className="font-serif text-[45px] md:text-[99px]">
                <PrismicRichText field={slice.primary.textfieldfive} />
              </div>
              {/*Video/Image*/}
              <div className="w-[86px] h-[37px]  md:w-[231px] md:h-[75px]">
                {slice.primary.videothree ? (
                  <VideoComponent
                    srcMp4={slice.primary.videolinkthree}
                    className=" w-full h-full object-cover"
                  />
                ) : (
                  <PrismicNextImage
                    field={slice.primary.imgvidthree}
                    alt={slice.primary.imgvidthree.alt || ""}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="font-serif text-[45px] md:text-[99px]">
                <PrismicRichText field={slice.primary.textfieldsix} />
              </div>
            </div>
            <div>
              <Button showArrow>STAY WITH US</Button>
            </div>
          </div>
        </Bounded>
      )}
      {slice.variation === "repeatableFieldVariation" && (
        <Bounded>
          {slice.primary.footer_cta.map((item, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-center gap-4"
            >
              <div className="font-serif italic text-[99px]">
                <PrismicRichText field={item.textone} />
              </div>
              <div className="w-[105px] h-[101px]">
                {" "}
                {item.video_toggle ? (
                  <VideoComponent
                    srcMp4={item.videolink}
                    className=" w-full h-full object-cover" //Changes were made here
                  />
                ) : (
                  <PrismicNextImage
                    field={item.imgvidone}
                    alt={item.imgvidone.alt || ""}
                    className="w-full h-full object-cover" //And here
                  />
                )}
              </div>
              <div className="text-[99px] font-serif">
                <PrismicRichText field={item.texttwo} />
              </div>
            </div>
          ))}
        </Bounded>
      )}
    </>
  );
};

export default TaglineHeroSlice;
