"use client";

import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";

import "swiper/css";
import "swiper/css/navigation";

const MobilePlacesToVisit = ({ slice }) => {
  const items = slice.primary.contents;
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  if (!items || items.length === 0) return null;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-10 overflow-hidden">
      {/* 1. Dynamic Background - Managed by Swiper Index */}
      <div className="absolute inset-0 z-0">
        {items.map((item, index) => (
          <div
            key={`bg-${index}`}
            className={`absolute inset-0 transition-opacity duration-700 ${
              activeIndex === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <PrismicNextImage
              field={item.image}
              fill
              className="object-cover scale-150 blur-xs"
              alt=""
            />
          </div>
        ))}
      </div>

      {/* 2. Swiper Container */}
      <div className="relative z-10 w-full max-w-[350px] md:max-w-[550px] ">
        <Swiper
          modules={[Navigation]}
          loop={true}
          spaceBetween={25}
          slidesPerView={1}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          breakpoints={{
            768: {
              slidesPerView: 1.1, 
              spaceBetween: 20,
              centeredSlides: true,
            },
          }}
          className="w-full !overflow-visible"
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              {/* Main Card */}
              <div className="bg-[#F2EFE9] rounded-2xl relative flex flex-col min-h-[500px] mb-4">
                {/* Overlapping Stamp */}
                <div className="absolute -top-7 -left-1  z-30 rotate-7 stamp-edge">
                  <PrismicNextImage
                    field={item.stamp}
                    className="object-cover w-28 h-32 "
                  />
                </div>

                {/* Image Section */}
                <div className="w-full p-3">
                  <div className="aspect-square relative rounded-xl overflow-hidden shadow-sm">
                    <PrismicNextImage
                      field={item.image}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col justify-between text-center px-5 pb-6">
                  <div>
                    <h2 className="text-4xl font-serif font-medium italic mb-3 text-black leading-tight">
                      <PrismicText field={item.title} />
                    </h2>
                    <div className="text-black text-[13px] leading-relaxed font-barlow ">
                      <PrismicRichText field={item.description} />
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  <div className="flex items-center justify-center gap-10 pt-4">
                    <button
                      onClick={() => swiperRef.current?.slidePrev()}
                      className="p-2 active:scale-90 transition-transform"
                      aria-label="Previous slide"
                    >
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M19 12H5M5 12L12 19M5 12L12 5"
                          stroke="black"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={() => swiperRef.current?.slideNext()}
                      className="p-2 active:scale-90 transition-transform"
                      aria-label="Next slide"
                    >
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="black"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default MobilePlacesToVisit;
