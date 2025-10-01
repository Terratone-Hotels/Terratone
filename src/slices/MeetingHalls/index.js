"use client";
import Button from "@/components/Button";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

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
      
    >
      {/* Heading + description */}
      <div className="max-w-3xl mx-auto text-center mb-12 px-4 ">
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading1: ({ children }) => (
              <h2 className="text-3xl  md:text-4xl font-serif font-semibold mb-4">
                {children}
              </h2>
            ),
            heading2: ({ children }) => (
              <h2 className="text-3xl md:text-4xl  mb-4">
                {children}
              </h2>
            ),
          }}
        />

        <PrismicRichText
          field={slice.primary.description}
          components={{
            paragraph: ({ children }) => (
              <p className="text-base font-barlow md:text-lg text-gray-700">{children}</p>
            ),
          }}
        />
        <div>
        <Button variant="secondary"  className="mt-5 font-barlow mr-1" >ABOUT US  </Button>
        <Button showArrow variant="secondary"/>
        </div>
      </div>

      {/* Desktop Grid (hover overlay) */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-20 max-w-6xl mx-auto px-4">
        {slice.primary.rooms.map((item, index) => (
          <div key={index} className="group relative">
            <div className="relative overflow-hidden">
              <PrismicNextImage
                field={item.image}
                className="w-full h-64 object-cover"
              />
              {/* Hover button for desktop */}
              <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <span className="bg-white text-black px-6 py-2 text-sm font-medium shadow-md hover:bg-black hover:text-white transition">
                  VIEW ROOM →
                </span>
              </button>
            </div>
            <div className="mt-4">
              <h3 className="text-[1.375rem] font-medium font-serif">
                {item.card_title}
              </h3>
              <p className="text-xs font-barlow text-gray-600 mt-1">
                {item.card_description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:hidden px-4">
        <Swiper spaceBetween={16} slidesPerView={1.3} grabCursor={true}>
          {slice.primary.rooms.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative">
                <div className="relative overflow-hidden rounded-md">
                  <PrismicNextImage
                    field={item.image}
                    className="w-full h-64 object-cover"
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white text-black px-6 py-2 text-sm font-medium shadow-md">
                      VIEW ROOM →
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold font-serif ">
                    {item.card_title}
                  </h3>
                  <p className="text-sm text-gray-600  mt-1">
                    {item.card_description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default MeetingHalls;
