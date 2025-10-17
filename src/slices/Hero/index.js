"use client";

import React, { useEffect, useRef, useState } from "react";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import { gsap } from "gsap";
import VideoComponent from "@/components/VideoComponent";
import Bounded from "@/components/Bounded";

const Hero = ({ slice }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [currentSwiper, setCurrentSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const headingRef = useRef(null);
  const thumbsRef = useRef(null);
  const logoLeftRef = useRef(null);
  const logoRightRef = useRef(null);
  const progressBarsRef = useRef([]);

  // === GSAP Loader + Curtain Animation ===
  useEffect(() => {
    const logoLeft = logoLeftRef.current;
    const logoRight = logoRightRef.current;

    gsap.set(".curtain", { yPercent: 0 });
    gsap.set([headingRef.current, thumbsRef.current], { opacity: 0 });
    gsap.set([logoLeft, logoRight], {
      opacity: 0,
      xPercent: (i) => (i === 0 ? -400 : 400),

      rotate: 0,
    });

    const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

    tl.to([logoLeft, logoRight], {
      opacity: 1,
      xPercent: 0,
      duration: 0.5,
      ease: "power3.out",
      stagger: 0.1,
    })
      .to([logoLeft, logoRight], {
        duration: 1,
        ease: "power3.out",
        rotate: 25,
      })
      .to(".curtain", { yPercent: -100, duration: 0.8 }, "-=0.5")

      .set(".curtain", { display: "none" })
      .fromTo(
        headingRef.current,
        { clipPath: "inset(100% 0% 0% 0%)", opacity: 0, y: 40 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          y: 0,
          duration: 1.8,
          ease: "power3.out",
        },
        "-=1.3"
      )
      .fromTo(
        thumbsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.4, ease: "power3.out" },
        "-=1"
      );

    return () => tl.kill();
  }, []);

  // === Swiper Setup + GSAP Sync ===
  const handleSwiper = (swiper) => {
    setCurrentSwiper(swiper);

    swiper.on("slideChange", () => {
      setActiveIndex(swiper.realIndex);

      // Reset all bars on slide change
      progressBarsRef.current.forEach((bar, i) => {
        if (bar) {
          gsap.set(bar, {
            opacity: i === swiper.realIndex ? 1 : 0.2,
            strokeDashoffset: 1,
          });
        }
      });
    });

    // Sync GSAP progress with Swiper autoplay timer
    swiper.on("autoplayTimeLeft", (s, time, progress) => {
      const activeBar = progressBarsRef.current[s.realIndex];
      if (activeBar) {
        gsap.to(activeBar, {
          strokeDashoffset: 1 - progress,
          ease: "none",
          duration: 0.1,
        });
      }
    });
  };

  return (
    <Bounded full className="hero-section relative overflow-hidden">
      {/* === Curtain Loader === */}
      <div className="curtain fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black">
        <div className="flex items-center justify-center space-x-6">
          <div
            ref={logoLeftRef}
            className="w-[10px] h-[60px] md:w-[14px] md:h-[80px] bg-white opacity-0"
          ></div>
          <div
            ref={logoRightRef}
            className="w-[10px] h-[60px] md:w-[14px] md:h-[80px] bg-white opacity-0"
          ></div>
        </div>
      </div>

      {/* === Hero Section === */}
      <div className="relative z-10 origin-bottom">
        <Swiper
          loop
          spaceBetween={0}
          navigation={false}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs, Autoplay]}
          onSwiper={handleSwiper}
          effect="fade"
          speed={1200}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* === Text + Thumbnails === */}
        <div
          className="absolute bottom-0 w-full flex flex-col sm:items-center z-20 pb-6 md:pb-10 px-[22px]"
          style={{ pointerEvents: "none" }}
        >
          <div
            ref={headingRef}
            className="font-serif leading-tight text-start sm:text-center w-full text-[2.8125rem] sm:text-[3.25rem] text-white mb-4 opacity-0 [clip-path:inset(100%_0%_0%_0%)]"
          >
            <PrismicRichText field={slice.primary.heading} />
          </div>

          <div
            ref={thumbsRef}
            className="md:w-full md:flex md:justify-center opacity-0"
            style={{ pointerEvents: "auto" }}
          >
            <Swiper
              onSwiper={setThumbsSwiper}
              loop
              spaceBetween={20}
              slidesPerView={"auto"}
              freeMode
              watchSlidesProgress
              modules={[FreeMode, Navigation, Thumbs]}
              className="!w-auto"
            >
              {slice.primary.carousel.map((item, index) => (
                <SwiperSlide key={index} className="!w-auto">
                  <div className="relative">
                    <PrismicNextImage
                      field={item.video ? item.thumbnail : item.image}
                      alt={item.image.alt || ""}
                      className="w-16 h-18 md:w-18 md:h-20 object-cover cursor-pointer"
                    />
                    {/* SVG Progress Bar */}
                    <svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                    >
                      <rect
                        ref={(el) => (progressBarsRef.current[index] = el)}
                        pathLength="1"
                        className={`fill-transparent stroke-white stroke-[3] ${
                          index === activeIndex ? "opacity-100" : "opacity-20"
                        }`}
                        style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
                        x="1.5"
                        y="1.5"
                        width="97"
                        height="97"
                        rx="2"
                      />
                    </svg>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
