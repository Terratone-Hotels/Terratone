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

const THUMB_IMGIX = { w: 240, q: 80, fit: "crop" };

const Hero = ({ slice }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  // Mount H1 only after curtain — keeps clip animation, cuts LCP render delay on hidden H1
  const [showHeading, setShowHeading] = useState(false);

  const hasAnimatedInitialHeading = useRef(false);
  const thumbsIntroPlayed = useRef(false);

  const curtainRef = useRef(null);
  const headingWrapperRef = useRef(null);
  const headingRef = useRef(null);
  const thumbsRef = useRef(null);
  const logoLeftRef = useRef(null);
  const logoRightRef = useRef(null);
  const progressBarsRef = useRef([]);
  const swiperRef = useRef(null);
  const headingTimelineRef = useRef(null);

  const slides = slice?.primary?.carousel || [];

  // --- 1. Clean Animation Trigger ---
  const animateHeadingIn = useCallback(() => {
    if (!headingRef.current) return;

    gsap.killTweensOf(headingRef.current);

    gsap.set(headingRef.current, {
      opacity: 0,
      clipPath: "inset(100% 0% 0% 0%)",
    });

    headingTimelineRef.current = gsap.fromTo(
      headingRef.current,
      {
        opacity: 0,
        clipPath: "inset(100% 0% 0% 0%)",
      },
      {
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.65,
        ease: "power3.out",
      }
    );
  }, []);

  // Keep thumbs fully hidden until after H1 (curtain lift was showing them too early)
  useLayoutEffect(() => {
    if (thumbsRef.current) {
      gsap.set(thumbsRef.current, { opacity: 0, y: 40 });
    }
  }, []);

  // After H1 mounts: same clip-in, then thumbs once (order: curtain → H1 → thumbs)
  useLayoutEffect(() => {
    if (!showHeading || !headingRef.current || !headingWrapperRef.current) return;

    gsap.set(headingWrapperRef.current, { opacity: 1, y: 0 });
    animateHeadingIn();
    hasAnimatedInitialHeading.current = true;

    // After H1 clip (~0.55s): thumbs one-by-one (does not affect LCP — thumb 0 already priority)
    const t = window.setTimeout(() => {
      if (thumbsIntroPlayed.current) return;
      thumbsIntroPlayed.current = true;

      setIsLoadingComplete(true);

      const container = thumbsRef.current;
      const thumbs = container?.querySelectorAll(".thumb");
      if (!container || !thumbs?.length) return;

      gsap.set(container, { opacity: 1, y: 0 });
      gsap.set(thumbs, { opacity: 0, y: 40 });
      gsap.to(thumbs, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power3.out",
        stagger: 0.2,
        overwrite: true,
      });
    }, 480);

    return () => window.clearTimeout(t);
  }, [showHeading, animateHeadingIn]);

  // --- 2. Curtain Animation (logo → wipe → then mount H1) ---
  useLayoutEffect(() => {
    const curtain = curtainRef.current;
    const left = logoLeftRef.current;
    const right = logoRightRef.current;
    const headingWrapper = headingWrapperRef.current;

    if (!curtain || !left || !right || !headingWrapper) return;

    gsap.set(curtain, { yPercent: 0 });
    gsap.set(headingWrapper, { opacity: 0, y: 50 });
    gsap.set([left, right], {
      opacity: 0,
      xPercent: (i) => (i === 0 ? -400 : 400),
      rotate: 0,
    });

    const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

    tl.to([left, right], {
      opacity: 1,
      xPercent: 0,
      duration: 0.25,
      ease: "power3.out",
      stagger: 0.05,
    })
      .to([left, right], {
        duration: 0.45,
        ease: "power3.out",
        rotate: 25,
      })
      .to(curtain, {
        yPercent: -100,
        duration: 0.8,
        ease: "power3.out",
      })
      // Start H1 just as wipe finishes — H1 not in DOM during logo/curtain (no LCP render delay)
      .call(() => setShowHeading(true), null, "-=0.08")
      .set(curtain, { display: "none" });

    return () => tl.kill();
  }, []);

  // --- 3. Swiper Logic ---
  const handleSwiper = useCallback(
    (swiper) => {
      swiperRef.current = swiper;

      const resetBars = (activeIndex) => {
        progressBarsRef.current.forEach((bar, i) => {
          if (!bar) return;
          gsap.killTweensOf(bar);
          gsap.set(bar, {
            opacity: i === activeIndex ? 1 : 0.2,
            strokeDashoffset: 1,
            overwrite: true,
          });
        });
      };

      const autoplayTimeLeftHandler = (s, time, progress) => {
        if (s.subsequentSlide || s.touchEventsData?.isTouched) return;

        const activeBar = progressBarsRef.current[s.realIndex];
        if (!activeBar) return;

        gsap.to(activeBar, {
          strokeDashoffset: progress,
          ease: "none",
          duration: 0.1,
          overwrite: "auto",
        });
      };

      const onSlideChangeTransitionStart = () => {
        setActiveIndex(swiper.realIndex);
        resetBars(swiper.realIndex);

        if (headingRef.current) {
          gsap.killTweensOf(headingRef.current);
          gsap.set(headingRef.current, { opacity: 0 });
        }
      };

      const onSlideChangeTransitionEnd = () => {
        if (hasAnimatedInitialHeading.current) {
          animateHeadingIn();
        }
      };

      const onTouchStart = () => {
        const activeBar = progressBarsRef.current[swiper.realIndex];
        if (activeBar) gsap.killTweensOf(activeBar);
      };

      swiper.on("autoplayTimeLeft", autoplayTimeLeftHandler);
      swiper.on("slideChangeTransitionStart", onSlideChangeTransitionStart);
      swiper.on("slideChangeTransitionEnd", onSlideChangeTransitionEnd);
      swiper.on("touchStart", onTouchStart);
    },
    [animateHeadingIn]
  );

  // --- 4. Start Autoplay ONLY when Curtain is done ---
  useEffect(() => {
    if (!isLoadingComplete) return;

    const swiper = swiperRef.current;
    if (!swiper) return;

    const firstBar = progressBarsRef.current[swiper.realIndex];

    // 1. Ensure the bar is clean and ready
    if (firstBar) {
      gsap.killTweensOf(firstBar); // Kill any background animation
      gsap.set(firstBar, { opacity: 1, strokeDashoffset: 1 });
    }

    setActiveIndex(swiper.realIndex);

    // 2. Start autoplay explicitly now
    if (swiper.autoplay) {
      swiper.autoplay.stop(); // Safety stop to reset internal timer
      swiper.autoplay.start();
    }
  }, [isLoadingComplete]);

  // Thumb click
  const onClickThumb = (index) => {
    if (!isLoadingComplete) return;
    const swiper = swiperRef.current;
    if (!swiper) return;

    if (headingRef.current) {
      gsap.killTweensOf(headingRef.current);
      gsap.set(headingRef.current, { opacity: 0 });
    }

    if (swiper.slideToLoop) swiper.slideToLoop(index);
    else swiper.slideTo(index);
  };

  if (!slides.length) return null;

  return (
    <section data-hero-slice className="data-hero-slice">
      <Bounded full className="hero-section relative overflow-hidden">
        {/* Curtain */}
        <div
          ref={curtainRef}
          className="curtain fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
        >
          {/* Logo Animation Parts */}
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

        {/* Main Slider */}
        <div className="relative z-10 origin-bottom">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-9 pointer-events-none" />

          <Swiper
            loop
            spaceBetween={0}
            navigation={false}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            onSwiper={handleSwiper}
            effect="fade"
            speed={200}
            // --- CRITICAL FIX: Enabled MUST be false here ---
            autoplay={{
              delay: 5000,
              enabled: false, // <--- Prevents auto-start behind curtain
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
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
                    // Full hero still sized for display; LCP priority is on first thumb (better SI/LCP)
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority="auto"
                    alt={item.image?.alt?.trim() || `Hero slide ${index + 1}`}
                    sizes="100vw"
                    className="w-full h-dvh object-cover"
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Bottom Content */}
          <div
            className="absolute bottom-0 w-full flex flex-col sm:items-center z-20 pb-6 md:pb-10 px-[22px]"
            style={{ pointerEvents: "none" }}
          >
            <div ref={headingWrapperRef} className="heading-wrapper w-full">
              {showHeading ? (
                <div
                  ref={headingRef}
                  className="font-serif leading-tight text-start sm:text-center w-full text-[24px] sm:text-[28px] lg:text-[32px] xl:text-[44px] text-white mb-4"
                >
                  {slides[activeIndex]?.headings && (
                    <PrismicRichText field={slides[activeIndex].headings} />
                  )}
                </div>
              ) : null}
            </div>

            <div
              ref={thumbsRef}
              className="md:w-full md:flex md:justify-center"
              style={{
                pointerEvents: isLoadingComplete ? "auto" : "none",
              }}
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
                      {/*
                        First thumb is intentional LCP candidate (Lighthouse ~1.9s).
                        Discoverable immediately: priority + fetchPriority high, not lazy.
                      */}
                      <PrismicNextImage
                        field={item.video ? item.thumbnail : item.image}
                        alt={
                          (item.video
                            ? item.thumbnail?.alt
                            : item.image?.alt
                          )?.trim() || `Hero thumbnail ${index + 1}`
                        }
                        priority={index === 0}
                        fetchPriority={index === 0 ? "high" : "low"}
                        loading={index === 0 ? "eager" : "lazy"}
                        sizes="160px"
                        imgixParams={THUMB_IMGIX}
                        className="w-16 h-18 md:w-18 md:h-20 object-cover cursor-pointer"
                        onClick={() => onClickThumb(index)}
                      />
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
                          className={`fill-transparent stroke-white stroke-[3] transition-opacity duration-300 ${
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
