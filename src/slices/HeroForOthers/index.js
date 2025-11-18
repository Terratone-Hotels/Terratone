import Bounded from "@/components/Bounded";
import HeroTextRenderer from "@/components/HeroTextRenderer";
import RichTextRenderer from "@/components/RichTextRenderer";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
/**
 * @typedef {import("@prismicio/client").Content.HeroForOthersSlice} HeroForOthersSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HeroForOthersSlice>} HeroForOthersProps
 * @type {import("react").FC<HeroForOthersProps>}
 */
const HeroForOthers = ({ slice }) => {
  return (
    <>
      {slice.variation === "default" && (
        <section data-hero-slice className="data-hero-slice">
          <Bounded
            full
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
          >
            <div className="relative h-screen">
              <PrismicNextImage
                field={slice.primary.hero_image}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-15 lg:bottom-7 left-1/2 transform -translate-x-1/2 text-white font-serif text-center capitalize text-[35px] w-[80%]  lg:text-[3.25rem] leading-10 tracking-tight lg:tracking-tight lg:leading-14 ">
              <HeroTextRenderer field={slice.primary.hero_heading} />
            </div>
          </Bounded>
        </section>
      )}
      {slice.variation === "withAvailabilityBar" && (
        <section data-hero-slice className="data-hero-slice">
          <Bounded
            full
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
          >
            <div className="relative h-screen">
              <PrismicNextImage
                field={slice.primary.hero_image}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-15 lg:bottom-7 left-1/2 transform -translate-x-1/2 text-white font-serif text-center capitalize text-[35px] w-[80%]  lg:text-[3.25rem] leading-10 tracking-tight lg:tracking-tight lg:leading-14 ">
              <HeroTextRenderer field={slice.primary.hero_heading} />
            </div>
          </Bounded>
        </section>
      )}
    </>
  );
};

export default HeroForOthers;
