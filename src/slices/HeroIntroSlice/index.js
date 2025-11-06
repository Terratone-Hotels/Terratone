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
      className="
        hero-intro 
        flex h-screen w-screen 
        items-center justify-start 
        bg-[var(--color-stone)]
        relative z-0 overflow-hidden
      "
    >
      <div className="p-10 text-[280px] font-medium font-inter leading-68 leading-">
        <PrismicRichText field={slice.primary.hero_text} />
      </div>

      {/* Fade gradient that helps blend into next section */}
      <div className="absolute right-0 top-0 h-full w-[20vw] bg-gradient-to-l from-[var(--color-stone)] to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default HeroIntroSlice;
