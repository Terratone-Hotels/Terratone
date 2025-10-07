"use client";
import Bounded from "@/components/Bounded";
import { PrismicRichText } from "@prismicio/react";
import QuoteIcon from "@/components/quoteIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import RichTextRenderer from "@/components/RichTextRenderer";

const Testimonials = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex items-center justify-center mt-40 overflow-x-hidden "
    >
      <div className="flex flex-col justify-center text-center items-center w-full max-w-[60rem] mx-auto overflow-hidden">
        <div className="flex text-5xl font-medium font-serif mb-10">
          <QuoteIcon />
        </div>

        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          modules={[Navigation, A11y]}
          className="w-full overflow-hidden"
        >
          {slice.primary.testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="p-6 mb-4 justify-center items-center font-barlow text-sm md:text-lg select-none">
                <RichTextRenderer field={item.quote} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Bounded>
  );
};

export default Testimonials;
