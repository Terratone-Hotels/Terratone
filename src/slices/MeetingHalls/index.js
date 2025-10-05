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
      <Bounded full
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
          <div className="hidden lg:flex gap-28 max-w-[85%] mx-auto ">
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
        </Bounded>

        <div className="lg:hidden pl-4 ">
          <Swiper spaceBetween={20} slidesPerView={1.2} grabCursor={true}>
            {slice.primary.rooms.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="relative">
                  <div className="relative overflow-hidden ">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <PrismicNextImage
                      field={item.image}
                      className="h-[275px] sm:h-[375px] object-cover"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold font-serif ">
                      {item.card_title}
                    </h3>
                    <p className="text-sm font-barlow ">
                      {item.card_description}
                    </p>
                    <div className=" mt-4 flex items-center justify-left">
                      <Button variant="normal"> VIEW ROOM </Button>
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
