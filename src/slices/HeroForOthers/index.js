"use client";

import Bounded from "@/components/Bounded";
import HeroTextRenderer from "@/components/HeroTextRenderer";
import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.HeroForOthersSlice} HeroForOthersSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HeroForOthersSlice>} HeroForOthersProps
 * @type {import("react").FC<HeroForOthersProps>}
 */
const HeroForOthers = ({ slice }) => {
  return (
    <>
      {/* ---------------- DEFAULT VARIANT ---------------- */}
      {slice.variation === "default" && (
        <section data-hero-slice>
          <Bounded full>
            <div className="relative h-screen">
              <PrismicNextImage
                field={slice.primary.hero_image}
                className="w-full h-full object-cover"
                priority
                sizes="100vw"
              />

              <div className="absolute bottom-16 lg:bottom-10 left-1/2 -translate-x-1/2 text-white font-serif text-center text-[35px] w-[80%] lg:text-[3.25rem] leading-10 lg:leading-[3.4rem] tracking-tight">
                <HeroTextRenderer field={slice.primary.hero_heading} />
              </div>
            </div>
          </Bounded>
        </section>
      )}

      {/* ------------- WITH AVAILABILITY BAR VARIANT ------------- */}
      {slice.variation === "withAvailabilityBar" && (
        <section data-hero-slice>
          <Bounded full>
            <div className="relative h-screen">
              {/* Background */}
              <PrismicNextImage
                field={slice.primary.hero_image}
                className="w-full h-full object-cover"
                priority
                sizes="100vw"
              />

              {/* HEADING */}
              <div className="absolute bottom-40 lg:bottom-28 left-1/2 -translate-x-1/2 text-white font-serif text-center text-[35px] w-[80%] lg:text-[3.25rem] leading-10 lg:leading-[3.4rem] tracking-tight">
                <HeroTextRenderer field={slice.primary.hero_heading} />
              </div>

              {/* --------- AVAILABILITY BAR --------- */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[95%] lg:w-[80%] bg-white shadow-xl rounded-md overflow-hidden flex">
                {/* ROOM SELECT */}
                <div className="w-1/4 border-r border-neutral-300 px-4 py-3">
                  <label className="block text-[10px] uppercase tracking-wide text-neutral-500 mb-1">
                    Room
                  </label>
                  <select className="w-full bg-transparent text-sm outline-none cursor-pointer">
                    <option>Deluxe King</option>
                    <option>Deluxe Suite</option>
                    <option>Deluxe</option>
                  </select>
                </div>

                {/* GUESTS */}
                <div className="w-1/4 border-r border-neutral-300 px-4 py-3">
                  <label className="block text-[10px] uppercase tracking-wide text-neutral-500 mb-1">
                    Guests
                  </label>
                  <select className="w-full bg-transparent text-sm outline-none cursor-pointer">
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4 Guests</option>
                  </select>
                </div>

                {/* DATES */}
                <div className="w-1/4 border-r border-neutral-300 px-4 py-3">
                  <label className="block text-[10px] uppercase tracking-wide text-neutral-500 mb-1">
                    Dates of Stay
                  </label>
                  <input
                    type="text"
                    defaultValue="Sep 9, 2025 / Sep 10, 2025"
                    className="w-full bg-transparent text-sm outline-none cursor-pointer"
                  />
                </div>

                {/* CTA BUTTON */}
                <button className="w-1/4 bg-[#222223] text-white flex items-center justify-between px-6 text-sm uppercase tracking-wide group">
                  <span>Check Availability</span>
                  <span className="text-lg group-hover:translate-x-1 transition">
                    →
                  </span>
                </button>
              </div>
            </div>
          </Bounded>
        </section>
      )}
    </>
  );
};

export default HeroForOthers;
