"use client";

import React, { useState, useEffect, useRef } from "react";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import VideoComponent from "@/app/components/VideoComponent";

const Hero = ({ slice }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [currentSwiper, setCurrentSwiper] = useState(null); // Ref to the main Swiper instance

  useEffect(() => {
    if (!currentSwiper) return;

    const intervalId = setInterval(() => {
      currentSwiper.slideNext();
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [currentSwiper]); // Re-run when currentSwiper is available

  const handleSwiper = (swiper) => {
    setCurrentSwiper(swiper);
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="hero-section relative"
    >
      {/* Main Swiper */}
      <Swiper
        loop={true}
        spaceBetween={0}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
        onSwiper={handleSwiper}
        effect="fade"
        speed={1200}
      >
        {slice.primary.carousel.map((item, index) => (
          <SwiperSlide key={index}>
            {item.video ? (
              <VideoComponent
                srcMp4={item.youtube_video_id}
                className="w-full h-dvh object-cover"
              />
            ) : (
              <PrismicNextImage
                field={item.image}
                alt={item.image.alt || ""}
                className="w-full h-dvh object-cover "
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails Overlay */}
      <div className="absolute bottom-6  xl:bottom-22 z-10 left-1/2 -translate-x-1/2  ">
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={20}
          slidesPerView={"auto"}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
        >
          {slice.primary.carousel.map((item, index) => (
            <SwiperSlide key={index} className="!w-auto">
              {item.video ? (
                <PrismicNextImage
                  field={item.thumbnail}
                  alt={item.image.alt || ""}
                  className="w-12 h-18  md:w-18 md:h-20 object-cover cursor-pointer border-1 border-transparent hover:border-white"
                />
              ) : (
                <PrismicNextImage
                  field={item.image}
                  alt={item.image.alt || ""}
                  className="w-12 h-18  md:w-18 md:h-20 object-cover cursor-pointer border-1 border-transparent hover:border-white"
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Heading */}
      <div className=" font-serif absolute bottom-1/5 left-1/2 -translate-x-1/2 text-center  w-full text-5xl px-[2px] md:text-6xl text-white z-20">
        <PrismicRichText field={slice.primary.heading} />
      </div>
    </section>
  );
};

export default Hero;
