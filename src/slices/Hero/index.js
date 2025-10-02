"use client";

import React, { useState, useEffect } from "react";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import VideoComponent from "@/components/VideoComponent";
import Bounded from "@/components/Bounded";

const Hero = ({ slice }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [currentSwiper, setCurrentSwiper] = useState(null);

  useEffect(() => {
    if (!currentSwiper) return;

    const intervalId = setInterval(() => {
      currentSwiper.slideNext();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentSwiper]);

  const handleSwiper = (swiper) => {
    setCurrentSwiper(swiper);
  };

  return (
    <Bounded
      full
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
                className="w-full h-dvh object-cover"
              />
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom overlay: Heading + Thumbnails */}
      <div className="absolute bottom-0 w-full flex flex-col sm:items-center z-20 pb-6 md:pb-10  px-[22px]  ">
        <div className="font-serif leading-tight text-start sm:text-center w-full text-[2.8125rem]  sm:text-[3.25rem] text-white mb-4">
          <PrismicRichText field={slice.primary.heading} />
        </div>

        <div className="md:w-full md:flex md:justify-center">
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={20}
            slidesPerView={"auto"}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="!w-auto"
          >
            {slice.primary.carousel.map((item, index) => (
              <SwiperSlide key={index} className="!w-auto">
                <PrismicNextImage
                  field={item.video ? item.thumbnail : item.image}
                  alt={item.image.alt || ""}
                  className="w-16 h-18 md:w-18 md:h-20 object-cover cursor-pointer   hover:border-white"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
