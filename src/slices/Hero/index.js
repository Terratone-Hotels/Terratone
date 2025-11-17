"use client";

import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from "react";
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

// All hooks must be here at top, before any conditional or return!
const Hero = ({ slice }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const curtainRef = useRef(null);
  const headingRef = useRef(null);
  const thumbsRef = useRef(null);
  const logoLeftRef = useRef(null);
  const logoRightRef = useRef(null);
  const progressBarsRef = useRef([]);
  const swiperRef = useRef(null);
  const swiperHandlersRef = useRef({});

  // Safe data access and fallback
  const slides = slice?.primary?.carousel || [];

  // Animate heading text in on reveal
  const animateHeadingIn = useCallback(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        {
          opacity: 0,
          clipPath: "inset(100% 0% 0% 0%)",
        },
        {
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          ease: "power3.out",
        }
      );
    }
  }, []);

  /* --------------------------------------------------
    GSAP LOADER + HEADING + THUMBS ANIMATION
  -------------------------------------------------- */
  useLayoutEffect(() => {
    const curtain = curtainRef.current;
    const left = logoLeftRef.current;
    const right = logoRightRef.current;
    const heading = headingRef.current;

    if (!curtain || !left || !right || !heading) return;

    gsap.set(curtain, { yPercent: 0 });
    gsap.set(heading, { opacity: 0 });
    gsap.set([left, right], {
      opacity: 0,
      xPercent: (i) => (i === 0 ? -400 : 400),
      rotate: 0,
    });

    const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

    tl.to([left, right], {
      opacity: 1,
      xPercent: 0,
      duration: 0.5,
      ease: "power3.out",
      stagger: 0.1,
    })
      .to([left, right], {
        duration: 1,
        ease: "power3.out",
        rotate: 25,
      })
      .to(curtain, { yPercent: -100, duration: 0.8 })
      .set(curtain, { display: "none" })
      .fromTo(
        heading,
        { clipPath: "inset(100% 0% 0% 0%)", opacity: 0, y: 40 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          y: 0,
          duration: 1.8,
          ease: "power3.out",
        },
        "-=1.3"
      );

    const thumbsNodes = thumbsRef.current?.querySelectorAll(".thumb");
    if (thumbsNodes?.length) {
      tl.from(
        thumbsNodes,
        {
          opacity: 0,
          y: 40,
          duration: 0.35,
          ease: "power3.out",
          stagger: 0.12,
        },
        "-=1.0"
      );
    }

    return () => tl.kill();
  }, []);

  /* --------------------------------------------------
    SWIPER INIT + EVENT HANDLERS + CLEANUP
  -------------------------------------------------- */
  const handleSwiper = useCallback(
    (swiper) => {
      swiperRef.current = swiper;

      const updateBars = (index) => {
        progressBarsRef.current.forEach((bar, i) => {
          if (!bar) return;
          gsap.set(bar, {
            opacity: i === index ? 1 : 0.2,
            strokeDashoffset: 1, // original logic
          });
        });
      };

      const slideChangeHandler = () => {
        setActiveIndex(swiper.realIndex);
        updateBars(swiper.realIndex);
        animateHeadingIn(); // Animate heading on each slide reveal
      };

      const autoplayTimeLeftHandler = (s, time, progress) => {
        const activeBar = progressBarsRef.current[s.realIndex];
        if (activeBar) {
          gsap.to(activeBar, {
            strokeDashoffset: progress, // original logic
            ease: "none",
            duration: 0.1,
          });
        }
      };

      // Attach
      swiper.on("slideChange", slideChangeHandler);
      swiper.on("autoplayTimeLeft", autoplayTimeLeftHandler);

      // Store handlers for cleanup
      swiperHandlersRef.current = {
        slideChange: slideChangeHandler,
        autoplayTimeLeft: autoplayTimeLeftHandler,
      };

      updateBars(swiper.realIndex);
      setActiveIndex(swiper.realIndex);
      animateHeadingIn(); // Initial animation also, for first heading
    },
    [animateHeadingIn]
  );

  // Clean up listeners on unmount
  useEffect(() => {
    return () => {
      const swiper = swiperRef.current;
      const { slideChange, autoplayTimeLeft } = swiperHandlersRef.current;
      if (swiper && swiper.off) {
        if (slideChange) swiper.off("slideChange", slideChange);
        if (autoplayTimeLeft) swiper.off("autoplayTimeLeft", autoplayTimeLeft);
      }
    };
  }, []);

  /* --------------------------------------------------
    THUMB CLICK HANDLER
  -------------------------------------------------- */
  const onClickThumb = (index) => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    if (typeof swiper.slideToLoop === "function") {
      swiper.slideToLoop(index);
    } else {
      swiper.slideTo(index);
    }
  };

  // Don't conditionally call hooks: short-circuit early for empty slides
  if (!slides.length) return null;

  /* --------------------------------------------------
    RENDER
  -------------------------------------------------- */
  return (
    <Bounded full className="hero-section relative overflow-hidden">
      {/* Curtain Loader */}
      <div
        ref={curtainRef}
        className="curtain fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
      >
        <div className="flex items-center justify-center space-x-6">
          <div
            ref={logoLeftRef}
            className="w-[10px] h-[60px] md:w-[14px] md:h-[80px] bg-white opacity-0"
          />
          <div
            ref={logoRightRef}
            className="w-[10px] h-[60px] md:w-[14px] md:h-[80px] bg-white opacity-0"
          />
        </div>
      </div>
      {/* Hero Slider */}
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
          {slides.map((item, index) => (
            <SwiperSlide key={index}>
              {item.video ? (
                <VideoComponent
                  srcMp4={item.youtube_video_id}
                  className="w-full h-dvh object-cover"
                />
              ) : (
                <PrismicNextImage
                  field={item.image}
                  alt={item.image?.alt?.trim() || `Hero slide ${index + 1}`}
                  className="w-full h-dvh object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Heading + Thumbs */}
        <div
          className="absolute bottom-0 w-full flex flex-col sm:items-center z-20 pb-6 md:pb-10 px-[22px]"
          style={{ pointerEvents: "none" }}
        >
          <div
            ref={headingRef}
            className="font-serif sm:leading-17 text-start sm:text-center w-full text-[36px] sm:text-[3.25rem] text-white mb-4 opacity-0 [clip-path:inset(100%_0%_0%_0%)]"
          >
            <PrismicRichText field={slides[activeIndex]?.headings} />
          </div>

          <div
            ref={thumbsRef}
            className="md:w-full md:flex md:justify-center"
            style={{ pointerEvents: "auto" }}
          >
            <Swiper
              onSwiper={setThumbsSwiper}
              loop
              spaceBetween={20}
              slidesPerView="auto"
              freeMode
              watchSlidesProgress
              modules={[FreeMode, Navigation, Thumbs]}
              className="!w-auto"
            >
              {slides.map((item, index) => (
                <SwiperSlide key={index} className="thumb !w-auto">
                  <div className="relative">
                    <PrismicNextImage
                      field={item.video ? item.thumbnail : item.image}
                      alt={
                        item.video
                          ? item.thumbnail?.alt?.trim() ||
                            `Video thumbnail ${index + 1}`
                          : item.image?.alt?.trim() || `Hero slide ${index + 1}`
                      }
                      className="w-16 h-18 md:w-18 md:h-20 object-cover cursor-pointer"
                      onClick={() => onClickThumb(index)}
                    />
                    {/* Progress Bar (unchanged) */}
                    <svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      style={{ transform: "scaleX(1) rotate(360deg)" }}
                    >
                      <rect
                        transform="rotate(-90 50 50)"
                        ref={(el) => (progressBarsRef.current[index] = el)}
                        pathLength="1"
                        className={`fill-transparent stroke-white stroke-[3] ${
                          index === activeIndex ? "opacity-100" : "opacity-20"
                        }`}
                        style={{
                          strokeDasharray: 1,
                          strokeDashoffset: 1,
                        }}
                        x="1.5"
                        y="1.5"
                        width="97"
                        height="97"
                        rx="0"
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
