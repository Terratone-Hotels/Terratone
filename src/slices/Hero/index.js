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

const Hero = ({ slice }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  // This ref tracks if the INITIAL HEADING ANIMATION (via the curtain timeline) has run.
  const hasAnimatedInitialHeading = useRef(false);

  const curtainRef = useRef(null);
  const headingWrapperRef = useRef(null);
  const headingRef = useRef(null);
  const thumbsRef = useRef(null);
  const logoLeftRef = useRef(null);
  const logoRightRef = useRef(null);
  const progressBarsRef = useRef([]);
  const swiperRef = useRef(null);
  const swiperHandlersRef = useRef({});

  const slides = slice?.primary?.carousel || [];

  // Animate heading inside wrapper on slide change only
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

  // Curtain timeline including wrapper heading reveal
  useLayoutEffect(() => {
    const curtain = curtainRef.current;
    const left = logoLeftRef.current;
    const right = logoRightRef.current;
    const headingWrapper = headingWrapperRef.current;
    const heading = headingRef.current;

    if (!curtain || !left || !right || !headingWrapper || !heading) return;

    gsap.set(curtain, { yPercent: 0 });

    // Prevent heading flash
    gsap.set(heading, { opacity: 0, clipPath: "inset(100% 0% 0% 0%)" });

    gsap.set([left, right], {
      opacity: 0,
      xPercent: (i) => (i === 0 ? -400 : 400),
      rotate: 0,
    });

    gsap.set(headingWrapper, { opacity: 0, y: 50 });

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
      // Animate the heading wrapper AFTER curtain reveals
      .to(headingWrapper, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      })
      // Then animate heading itself on initial reveal
      .fromTo(
        heading,
        { opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
        {
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8"
      )
      // Thumbnails reveal
      .from(
        thumbsRef.current?.querySelectorAll(".thumb"),
        {
          opacity: 0,
          y: 40,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.3,
        },
        "-=0.5"
      )
      // FIX: Set the flag here after the animation is visually complete.
      .call(() => {
        setIsLoadingComplete(true);
        // Mark initial heading animation as done
        hasAnimatedInitialHeading.current = true;
      });

    return () => tl.kill();
  }, []);

  // Swiper initialization and handlers
  const handleSwiper = useCallback(
    (swiper) => {
      swiperRef.current = swiper;

      const updateBars = (index) => {
        progressBarsRef.current.forEach((bar, i) => {
          if (!bar) return;
          gsap.set(bar, {
            opacity: i === index ? 1 : 0.2,
            strokeDashoffset: 1,
          });
        });
      };

      const slideChangeHandler = () => {
        setActiveIndex(swiper.realIndex);
        updateBars(swiper.realIndex);

        // FIX: Only animate the heading if the initial load is complete.
        // The check for hasAnimatedInitialHeading.current is now handled by
        // the flag being set in the GSAP timeline.
        if (hasAnimatedInitialHeading.current && headingRef.current) {
          // Immediately hide the old heading before animating the new one
          gsap.set(headingRef.current, { opacity: 0 });
          animateHeadingIn();
        }
      };

      const autoplayTimeLeftHandler = (s, time, progress) => {
        const activeBar = progressBarsRef.current[s.realIndex];
        if (activeBar) {
          gsap.to(activeBar, {
            strokeDashoffset: progress,
            ease: "none",
            duration: 0.1,
          });
        }
      };

      swiper.on("slideChange", slideChangeHandler);
      swiper.on("autoplayTimeLeft", autoplayTimeLeftHandler);

      swiperHandlersRef.current = {
        slideChange: slideChangeHandler,
        autoplayTimeLeft: autoplayTimeLeftHandler,
      };
    },
    [animateHeadingIn]
  );

  // Start autoplay after curtain animation finished
  useEffect(() => {
    if (!isLoadingComplete) return;
    const swiper = swiperRef.current;
    if (!swiper) return;

    // Initialize progress bars correctly for the active slide
    progressBarsRef.current.forEach((bar, i) => {
      if (!bar) return;
      gsap.set(bar, {
        opacity: i === swiper.realIndex ? 1 : 0.2,
        strokeDashoffset: 1,
      });
    });

    setActiveIndex(swiper.realIndex);

    // Only start autoplay once the component is fully loaded
    if (swiper.autoplay) swiper.autoplay.start();
  }, [isLoadingComplete]);

  // Cleanup swiper event listeners
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

  // Thumbs click handler
  const onClickThumb = (index) => {
    if (!isLoadingComplete) return;
    const swiper = swiperRef.current;
    if (!swiper) return;

    // Ensure heading transition on manual click
    if (headingRef.current) {
      gsap.set(headingRef.current, { opacity: 0 });
      animateHeadingIn();
    }

    if (swiper.slideToLoop) swiper.slideToLoop(index);
    else swiper.slideTo(index);
  };

  if (!slides.length) return null;

  return (
    <section data-hero-slice className="data-hero-slice">
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
              enabled: false, // Starts disabled, enabled in useEffect
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

          {/* Heading Wrapper + Heading + Thumbs */}
          <div
            className="absolute bottom-0 w-full flex flex-col sm:items-center z-20 pb-6 md:pb-10 px-[22px]"
            style={{ pointerEvents: "none" }}
          >
            <div ref={headingWrapperRef} className="heading-wrapper w-full">
              <div
                ref={headingRef}
                className="font-serif sm:leading-17 text-start sm:text-center w-full text-[36px] sm:text-[3.25rem] text-white mb-4 opacity-0 [clip-path:inset(100%_0%_0%_0%)]"
              >
                {/* Ensure slides[activeIndex] exists before rendering */}
                {slides[activeIndex]?.headings && (
                  <PrismicRichText field={slides[activeIndex].headings} />
                )}
              </div>
            </div>

            <div
              ref={thumbsRef}
              className="md:w-full md:flex md:justify-center"
              style={{ pointerEvents: isLoadingComplete ? "auto" : "none" }}
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
                            : item.image?.alt?.trim() ||
                              `Hero slide ${index + 1}`
                        }
                        className="w-16 h-18 md:w-18 md:h-20 object-cover cursor-pointer"
                        onClick={() => onClickThumb(index)}
                      />

                      {/* Progress Bar */}
                      <svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        style={{ transform: "scaleX(1) rotate(360deg)" }}
                      >
                        {/* Rect for the progress path */}
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
    </section>
  );
};

export default Hero;
