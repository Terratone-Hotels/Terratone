"use client";
import Button from "@/components/Button";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Bounded from "@/components/Bounded";
import DotWave from "@/components/DotWave";

/**
 * @typedef {import("@prismicio/client").Content.MeetingHallsSlice} MeetingHallsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<MeetingHallsSlice>} MeetingHallsProps
 * @type {import("react").FC<MeetingHallsProps>}
 */
const MeetingHalls = ({ slice }) => {
  return (
    <Bounded
      full
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=" mt-20 md:mt-44"
    >
      <DotWave />

      {/* Heading + description */}
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="max-w-[90rem] mx-auto full"
      >
        <div className="max-w-3xl mx-auto text-center mb-12 px-4  mt-8 md:mt-12">
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading1: ({ children }) => (
                <h2 className="text-[1.75rem]  md:text-5xl font-serif font-medium mb-2 lg:mb-8">
                  {children}
                </h2>
              ),
              heading2: ({ children }) => (
                <h2 className="text-3xl md:text-5xl font-serif  mb-4">
                  {children}
                </h2>
              ),
            }}
          />

          <PrismicRichText
            field={slice.primary.description}
            components={{
              paragraph: ({ children }) => (
                <p className=" leading-tight font-barlow text-[0.875rem] md:text-[1.125rem] ">
                  {children}
                </p>
              ),
            }}
          />
        </div>

        {/* Desktop Grid (hover overlay) */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-20 max-w-[85%] mx-auto items-start">
          {slice.primary.rooms.map((item, index) => (
            <div key={index} className="group flex flex-col">
              {/* Image wrapper */}
              <div className="relative aspect-square overflow-hidden ">
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <PrismicNextImage
                  field={item.image}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                  <Button showArrow>VIEW ROOM</Button>
                </div>
              </div>

              {/* Text wrapper */}
              <div className="mt-6 flex flex-col justify-start text-left min-h-[120px]">
                <h3 className="text-[1.375rem] font-medium font-serif">
                  {item.card_title}
                </h3>
                <p className="text-[14px] font-barlow mt-2 leading-relaxed">
                  {item.card_description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Bounded>

      <div className="lg:hidden pl-4">
        <Swiper spaceBetween={20} slidesPerView={1.2} grabCursor={true}>
          {slice.primary.rooms.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative flex flex-col">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden ">
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <PrismicNextImage
                    field={item.image}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </div>

                {/* Text */}
                <div className="mt-4 flex flex-col justify-between min-h-[110px]">
                  <h3 className="text-lg font-serif font-medium leading-snug">
                    {item.card_title}
                  </h3>
                  <p className="text-sm font-barlow leading-relaxed mt-2">
                    {item.card_description}
                  </p>
                  <div className="mt-4">
                    <Button variant="normal">VIEW ROOM</Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Bounded>
  );
};

export default MeetingHalls;
