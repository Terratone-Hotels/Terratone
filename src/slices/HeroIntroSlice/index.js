/**
 * @typedef {import("@prismicio/client").Content.HeroIntroSliceSlice} HeroIntroSliceSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HeroIntroSliceSlice>} HeroIntroSliceProps
 * @type {import("react").FC<HeroIntroSliceProps>}
 */

import { PrismicRichText } from "@prismicio/react";

const HeroIntroSlice = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative flex items-center justify-center h-screen w-screen overflow-hidden "
    >
      <div className="max-w-[90vw] px-10 text-[10vw] md:text-[12vw] font-medium font-inter leading-none break-words">
        <PrismicRichText field={slice.primary.hero_text} />
      </div>
    </section>
  );
};

export default HeroIntroSlice;
