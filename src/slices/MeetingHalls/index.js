"use client";
import Button from "@/components/Button";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Bounded from "@/components/Bounded";

/**
 * @typedef {import("@prismicio/client").Content.MeetingHallsSlice} MeetingHallsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<MeetingHallsSlice>} MeetingHallsProps
 * @type {import("react").FC<MeetingHallsProps>}
 */
const MeetingHalls = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=" mt-20 md:mt-44"
    >
      <div className="relative h-12  w-40 mx-auto mb-8">
        {/* left low dot */}
        <span className="absolute left-0 top-6 w-2 h-2 rounded-full bg-[#977161]" />

        {/* left raised dot */}
        <span className="absolute left-8 top-0 w-2 h-2 rounded-full bg-[#996353]" />

        {/* center low dot */}
        <span className="absolute left-1/2 -translate-x-1/2 top-10 w-2 h-2 rounded-full bg-[#5B554C]" />

        {/* right raised dot */}
        <span className="absolute right-12 top-2 w-2 h-2 rounded-full bg-[#857161]" />

        {/* right low dot */}
        <span className="absolute right-2 top-6 w-2 h-2 rounded-full bg-[#AF9381]" />
      </div>

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
                <h2 className="text-3xl  md:text-5xl font-serif font-medium mb-4">
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
                <p className="text-base leading-tight font-barlow md:text-[18px] ">
                  {children}
                </p>
              ),
            }}
          />
        </div>

        {/* Desktop Grid (hover overlay) */}
        <div className="hidden lg:flex gap-40 max-w-[85%] mx-auto ">
          {slice.primary.rooms.map((item, index) => (
            <div key={index} className="group relative">
              <div className="relative overflow-hidden ">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-black/40 z-10" />
                <PrismicNextImage
                  field={item.image}
                  className="w-full aspect-square  object-cover"
                />
                <div className="absolute z-20  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex opacity-0 group-hover:opacity-100 transition duration-300">
                  <Button showArrow>VIEW ROOM</Button>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-[1.375rem] font-medium font-serif">
                  {item.card_title}
                </h3>
                <p className="text-[14px] font-barlow mt-2">
                  {item.card_description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:hidden pl-4">
          <Swiper spaceBetween={20} slidesPerView={1.2} grabCursor={true}>
            {slice.primary.rooms.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="relative">
                  <div className="relative overflow-hidden ">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <PrismicNextImage
                      field={item.image}
                      className="aspect-square object-cover"
                    />

                    <div className="absolute inset-0 z-20 flex items-center justify-center">
                      <Button variant="normal"> VIEW ROOM </Button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold font-serif ">
                      {item.card_title}
                    </h3>
                    <p className="text-sm font-barlow ">{item.card_description}</p>
                  </div>
                </div>
                
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Bounded>
    </section>
  );
};

export default MeetingHalls;
