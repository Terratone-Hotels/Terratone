"use client";
import Bounded from "@/components/Bounded";
import QuoteIcon from "@/components/quoteIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import RichTextRenderer from "@/components/RichTextRenderer";

export default function Testimonials({ slice }) {
  return (
    <Bounded>
      <div className="flex flex-col items-center text-center md:max-w-[60rem] mx-auto">
        <div className="flex text-5xl font-medium font-serif text-stone-800 mb-6">
          <QuoteIcon />
        </div>

        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          modules={[Scrollbar, A11y]}
          scrollbar={{
            el: ".custom-scrollbar",
            draggable: true,
            dragSize: 20,
          }}
          className="w-full custom-swiper"
        >
          {slice.primary.testimonials.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="p-6 text-lg font-barlow mx-auto md:text-xl">
                <RichTextRenderer field={item.quote} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="custom-scrollbar relative mt-6 w-28 h-[2px] bg-gray-300 rounded-full"></div>
      </div>
    </Bounded>
  );
}
