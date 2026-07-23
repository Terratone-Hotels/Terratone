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
import { gsap } from "gsap";
import VideoComponent from "@/components/VideoComponent";
import Bounded from "@/components/Bounded";
import { useLoader } from "@/context/LoaderContext";
import HeroSecondVariation from "@/components/HeroSecondVariation";

const THUMB_IMGIX = { w: 160, h: 180, q: 50, fit: "crop" };
const LCP_BLOCKER_ID = "hero-default-lcp";

/** First-slide / slide media without Swiper — keeps LCP cheap before carousel mounts. */
function HeroSlideMedia({ item, priority, onLoaded }) {
  if (item.video) {
    return (
      <VideoComponent
        srcMp4={item.youtube_video_id}
        className="w-full h-dvh object-cover"
        onLoadedData={onLoaded}
      />
    );
  }

  return (
    <>
      <PrismicNextImage
        field={item.image}
        loading={priority ? "eager" : "lazy"}
        priority={!!priority}
        fetchPriority={priority ? "high" : "auto"}
        sizes="100vw"
        imgixParams={{ q: 45, auto: "format,compress" }}
        className="w-full h-dvh object-cover md:hidden"
        onLoad={onLoaded}
      />
      <PrismicNextImage
        field={item.image}
        loading={priority ? "eager" : "lazy"}
        priority={!!priority}
        fetchPriority={priority ? "high" : "auto"}
        sizes="100vw"
        imgixParams={{ q: 70 }}
        className="w-full h-dvh object-cover hidden md:block"
        onLoad={onLoaded}
      />
    </>
  );
}

const HeroDefault = ({ slice }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  /** After curtain: allow Swiper chunk to load + mount */
  const [mountCarousel, setMountCarousel] = useState(false);
  /** Dynamically loaded Swiper API (not on critical path before curtain) */
  const [swiperAPI, setSwiperAPI] = useState(null);
  /** Hide static LCP only once main Swiper instance is ready */
  const [carouselReady, setCarouselReady] = useState(false);

  const { addBlocker, removeBlocker, isRevealed } = useLoader();
  const lcpBlockerCleared = useRef(false);

  const hasAnimatedInitialHeading = useRef(false);
  const thumbsIntroPlayed = useRef(false);

  const headingWrapperRef = useRef(null);
  const headingRef = useRef(null);
  const thumbsRef = useRef(null);
  const progressBarsRef = useRef([]);
  const swiperRef = useRef(null);
  const headingTimelineRef = useRef(null);

  const slides = slice?.primary?.carousel || [];

  // --- Register first slide's asset as a load-blocker for the global curtain ---
  useEffect(() => {
    addBlocker(LCP_BLOCKER_ID);
    return () => removeBlocker(LCP_BLOCKER_ID);
  }, [addBlocker, removeBlocker]);

  const clearLcpBlocker = useCallback(() => {
    if (lcpBlockerCleared.current) return;
    lcpBlockerCleared.current = true;
    removeBlocker(LCP_BLOCKER_ID);
  }, [removeBlocker]);

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
      },
    );
  }, []);

  useLayoutEffect(() => {
    if (thumbsRef.current) {
      gsap.set(thumbsRef.current, { opacity: 0, y: 40 });
    }
  }, []);

  useLayoutEffect(() => {
    if (headingRef.current) {
      gsap.set(headingRef.current, {
        opacity: 0,
        clipPath: "inset(100% 0% 0% 0%)",
      });
    }
    if (headingWrapperRef.current) {
      gsap.set(headingWrapperRef.current, { opacity: 0, y: 50 });
    }
  }, []);

  // Curtain done → heading in, then schedule Swiper mount (after paint / idle).
  useLayoutEffect(() => {
    if (!isRevealed || !headingRef.current || !headingWrapperRef.current)
      return;

    gsap.set(headingWrapperRef.current, { opacity: 1, y: 0 });
    animateHeadingIn();
    hasAnimatedInitialHeading.current = true;

    const startMount = () => setMountCarousel(true);
    let idleId;
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(startMount, { timeout: 600 });
    } else {
      idleId = window.setTimeout(startMount, 50);
    }

    // Flex thumbs live in the DOM immediately — intro does not need Swiper.
    const thumbsTimer = window.setTimeout(() => {
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

    return () => {
      if (typeof window.cancelIdleCallback === "function") {
        try {
          window.cancelIdleCallback(idleId);
        } catch {
          /* ignore */
        }
      }
      window.clearTimeout(idleId);
      window.clearTimeout(thumbsTimer);
    };
  }, [isRevealed, animateHeadingIn]);

  // Load Swiper only when mountCarousel is true (not during curtain / early TBT window).
  useEffect(() => {
    if (!mountCarousel) return;
    let cancelled = false;

    (async () => {
      // One Swiper only — Autoplay is the sole module (no FreeMode / Thumbs / Navigation).
      const [{ Swiper, SwiperSlide }, modules] = await Promise.all([
        import("swiper/react"),
        import("swiper/modules"),
        import("swiper/css"),
      ]);
      if (cancelled) return;
      setSwiperAPI({
        Swiper,
        SwiperSlide,
        Autoplay: modules.Autoplay,
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [mountCarousel]);

  // --- 2. Main Swiper Logic ---
  const handleSwiper = useCallback(
    (swiper) => {
      swiperRef.current = swiper;
      setCarouselReady(true);

      // Progress rings: plain DOM only (autoplayTimeLeft fires often —
      // GSAP here was a main-thread / TBT cost).
      const resetBars = (idx) => {
        progressBarsRef.current.forEach((bar, i) => {
          if (!bar) return;
          bar.style.opacity = i === idx ? "1" : "0.2";
          bar.style.strokeDashoffset = "1";
        });
      };

      const autoplayTimeLeftHandler = (s, time, progress) => {
        if (s.subsequentSlide || s.touchEventsData?.isTouched) return;

        const activeBar = progressBarsRef.current[s.realIndex];
        if (!activeBar) return;

        activeBar.style.strokeDashoffset = String(progress);
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

      swiper.on("autoplayTimeLeft", autoplayTimeLeftHandler);
      swiper.on("slideChangeTransitionStart", onSlideChangeTransitionStart);
      swiper.on("slideChangeTransitionEnd", onSlideChangeTransitionEnd);
    },
    [animateHeadingIn],
  );

  // --- 3. Start Autoplay ONLY when thumbs intro is done AND swiper exists ---
  useEffect(() => {
    if (!isLoadingComplete || !carouselReady) return;

    const swiper = swiperRef.current;
    if (!swiper) return;

    const firstBar = progressBarsRef.current[swiper.realIndex];

    if (firstBar) {
      firstBar.style.opacity = "1";
      firstBar.style.strokeDashoffset = "1";
    }

    setActiveIndex(swiper.realIndex);

    if (swiper.autoplay) {
      swiper.autoplay.stop();
      swiper.autoplay.start();
    }
  }, [isLoadingComplete, carouselReady]);

  // Flex thumb click → drive the single main Swiper
  const onClickThumb = (index) => {
    if (!isLoadingComplete) return;

    if (headingRef.current) {
      gsap.killTweensOf(headingRef.current);
      gsap.set(headingRef.current, { opacity: 0 });
    }

    const swiper = swiperRef.current;
    if (swiper) {
      if (swiper.slideToLoop) swiper.slideToLoop(index);
      else swiper.slideTo(index);
      return;
    }

    // Swiper not ready yet — still update heading/index for UX
    setActiveIndex(index);
    progressBarsRef.current.forEach((bar, i) => {
      if (!bar) return;
      bar.style.opacity = i === index ? "1" : "0.2";
      bar.style.strokeDashoffset = "1";
    });
    animateHeadingIn();
  };

  if (!slides.length) return null;

  const first = slides[0];
  const { Swiper, SwiperSlide, Autoplay } = swiperAPI || {};

  return (
    <section data-hero-slice className="data-hero-slice">
      <Bounded full className="hero-section relative overflow-hidden">
        <div className="relative z-10 origin-bottom">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-9 pointer-events-none" />

          {/* Static LCP slide until Swiper is ready */}
          <div
            className={`relative w-full h-dvh ${carouselReady ? "invisible" : ""}`}
            aria-hidden={carouselReady}
          >
            <HeroSlideMedia
              item={first}
              priority
              onLoaded={clearLcpBlocker}
            />
          </div>

          {/* Single main Swiper — only after curtain + dynamic import */}
          {swiperAPI && (
            <div className="absolute inset-0">
              <Swiper
                loop
                spaceBetween={0}
                modules={[Autoplay]}
                onSwiper={handleSwiper}
                speed={200}
                autoplay={{
                  delay: 5000,
                  enabled: false,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: false,
                }}
                className="h-full"
              >
                {slides.map((item, index) => (
                  <SwiperSlide key={index}>
                    <HeroSlideMedia item={item} priority={index === 0} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          {/* Bottom Content */}
          <div
            className="absolute bottom-0 w-full flex flex-col sm:items-center z-20 pb-6 md:pb-10 px-[22px]"
            style={{ pointerEvents: "none" }}
          >
            <div ref={headingWrapperRef} className="heading-wrapper w-full">
              <div
                ref={headingRef}
                className="font-serif leading-tight text-start sm:text-center w-full text-[24px] sm:text-[28px] lg:text-[32px] xl:text-[44px] text-white mb-4"
              >
                {slides[activeIndex]?.headings && (
                  <PrismicRichText field={slides[activeIndex].headings} />
                )}
              </div>
            </div>

            {/* Flex thumbs — not a second Swiper */}
            <div
              ref={thumbsRef}
              className="md:w-full md:flex md:justify-center overflow-x-auto max-w-full [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              style={{
                pointerEvents: isLoadingComplete ? "auto" : "none",
              }}
            >
              <div className="flex gap-5 w-max mx-auto px-1">
                {slides.map((item, index) => (
                  <button
                    type="button"
                    key={index}
                    className="thumb relative shrink-0 p-0 border-0 bg-transparent"
                    onClick={() => onClickThumb(index)}
                    aria-label={`Show slide ${index + 1}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                  >
                    <PrismicNextImage
                      field={item.video ? item.thumbnail : item.image}
                      priority={index === 0}
                      fetchPriority={index === 0 ? "high" : "low"}
                      loading={index === 0 ? "eager" : "lazy"}
                      sizes="160px"
                      imgixParams={THUMB_IMGIX}
                      className="w-16 h-18 md:w-18 md:h-20 object-cover cursor-pointer pointer-events-none"
                    />
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      style={{ transform: "scaleX(1) rotate(360deg)" }}
                      aria-hidden
                    >
                      <rect
                        transform="rotate(-90 50 50)"
                        ref={(el) => {
                          progressBarsRef.current[index] = el;
                        }}
                        pathLength="1"
                        className="fill-transparent stroke-white stroke-[3]"
                        style={{
                          strokeDasharray: 1,
                          strokeDashoffset: 1,
                          opacity: index === activeIndex ? 1 : 0.2,
                        }}
                        x="1.5"
                        y="1.5"
                        width="97"
                        height="97"
                        rx="0"
                      />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Bounded>
    </section>
  );
};

const Hero = ({ slice }) => {
  if (slice.variation === "secondVariation") {
    return <HeroSecondVariation slice={slice} />;
  }
  return <HeroDefault slice={slice} />;
};

export default Hero;
