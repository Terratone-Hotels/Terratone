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
import { useLoader, shouldSkipCurtain } from "@/context/LoaderContext";
import HeroSecondVariation from "@/components/HeroSecondVariation";

const THUMB_IMGIX = { w: 160, h: 180, q: 50, fit: "crop" };
const LCP_BLOCKER_ID = "hero-default-lcp";

/**
 * Prefer IMAGE as LCP on mobile:
 * - One priority mobile <img> only (not desktop twin)
 * - Full-viewport, eager, high fetchPriority
 * - Video slides kept for non-LCP paths only (your first slide is image)
 */
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
      {/* LCP candidate — mobile full-bleed image */}
      <PrismicNextImage
        field={item.image}
        loading={priority ? "eager" : "lazy"}
        priority={!!priority}
        fetchPriority={priority ? "high" : "auto"}
        sizes="100vw"
        imgixParams={
          priority
            ? { w: 1080, q: 55, auto: "format,compress", fit: "max" }
            : { w: 900, q: 50, auto: "format,compress", fit: "max" }
        }
        className="w-full h-dvh object-cover md:hidden"
        onLoad={onLoaded}
      />
      {/* Desktop — separate, not priority (avoids double download on mobile LH) */}
      <PrismicNextImage
        field={item.image}
        loading={priority ? "eager" : "lazy"}
        priority={false}
        fetchPriority={priority ? "high" : "auto"}
        sizes="100vw"
        imgixParams={{ q: 70, auto: "format,compress" }}
        className="w-full h-dvh object-cover hidden md:block"
        onLoad={priority ? onLoaded : undefined}
      />
    </>
  );
}

const HeroDefault = ({ slice }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [mountCarousel, setMountCarousel] = useState(false);
  const [swiperAPI, setSwiperAPI] = useState(null);
  const [carouselReady, setCarouselReady] = useState(false);
  /** Mobile: hero image loaded → safe to reveal h1 (image should already be LCP). */
  const [heroImageReady, setHeroImageReady] = useState(false);

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

  useEffect(() => {
    // Only matters when desktop curtain is waiting on assets
    if (shouldSkipCurtain()) return;
    addBlocker(LCP_BLOCKER_ID);
    return () => removeBlocker(LCP_BLOCKER_ID);
  }, [addBlocker, removeBlocker]);

  const clearLcpBlocker = useCallback(() => {
    if (lcpBlockerCleared.current) return;
    lcpBlockerCleared.current = true;
    removeBlocker(LCP_BLOCKER_ID);
    // Image painted → allow h1 clip (mobile LCP should already be the image)
    setHeroImageReady(true);
  }, [removeBlocker]);

  // If onLoad never fires, don't leave h1 stuck forever
  useEffect(() => {
    if (!shouldSkipCurtain()) return;
    const t = window.setTimeout(() => setHeroImageReady(true), 2800);
    return () => window.clearTimeout(t);
  }, []);

  // Clip-path wipe — mobile + desktop (shorter on mobile)
  const animateHeadingIn = useCallback(() => {
    if (!headingRef.current) return;

    const mobile = shouldSkipCurtain();
    const duration = mobile ? 0.45 : 0.65;

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
        duration,
        ease: "power3.out",
      },
    );
  }, []);

  // Keep h1 hidden until we intentionally reveal it.
  // Mobile: stays hidden until hero IMAGE has loaded → image wins LCP.
  // Desktop: hidden until curtain, then clip.
  useLayoutEffect(() => {
    if (thumbsRef.current) {
      gsap.set(thumbsRef.current, { opacity: 0, y: 40 });
    }
    if (headingRef.current) {
      gsap.set(headingRef.current, {
        opacity: 0,
        clipPath: "inset(100% 0% 0% 0%)",
      });
    }
    if (headingWrapperRef.current) {
      if (shouldSkipCurtain()) {
        gsap.set(headingWrapperRef.current, { opacity: 1, y: 0 });
      } else {
        gsap.set(headingWrapperRef.current, { opacity: 0, y: 50 });
      }
    }
  }, []);

  // Desktop after curtain
  useLayoutEffect(() => {
    if (shouldSkipCurtain()) return;
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

    const thumbsTimer = window.setTimeout(() => {
      if (thumbsIntroPlayed.current) return;
      thumbsIntroPlayed.current = true;
      setIsLoadingComplete(true);

      const container = thumbsRef.current;
      const thumbs = container?.querySelectorAll(".thumb");
      if (!container || !thumbs?.length) return;

      gsap.set(container, { opacity: 1, y: 0 });
      gsap.set(thumbs, { opacity: 0, y: 24 });
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

  // Mobile: wait for IMAGE load, then h1 clip (so LCP is the photo, not the text)
  useLayoutEffect(() => {
    if (!shouldSkipCurtain()) return;
    if (!isRevealed || !heroImageReady) return;
    if (hasAnimatedInitialHeading.current) return;
    if (!headingRef.current) return;

    hasAnimatedInitialHeading.current = true;
    animateHeadingIn();

    const startMount = () => setMountCarousel(true);
    let idleId;
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(startMount, { timeout: 2000 });
    } else {
      idleId = window.setTimeout(startMount, 800);
    }

    const thumbsTimer = window.setTimeout(() => {
      if (thumbsIntroPlayed.current) return;
      thumbsIntroPlayed.current = true;
      setIsLoadingComplete(true);

      const container = thumbsRef.current;
      const thumbs = container?.querySelectorAll(".thumb");
      if (!container || !thumbs?.length) return;

      gsap.set(container, { opacity: 1, y: 0 });
      gsap.set(thumbs, { opacity: 0, y: 24 });
      gsap.to(thumbs, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power3.out",
        stagger: 0.08,
        overwrite: true,
      });
    }, 320);

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
  }, [isRevealed, heroImageReady, animateHeadingIn]);

  useEffect(() => {
    if (!mountCarousel) return;
    let cancelled = false;

    (async () => {
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

  const handleSwiper = useCallback(
    (swiper) => {
      swiperRef.current = swiper;
      setCarouselReady(true);

      const resetBars = (idx) => {
        progressBarsRef.current.forEach((bar, i) => {
          if (!bar) return;
          bar.style.opacity = i === idx ? "1" : "0.2";
          bar.style.strokeDashoffset = "1";
        });
      };

      const autoplayTimeLeftHandler = (s, _time, progress) => {
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
                    {/* No priority here — LCP image is only the static first paint layer */}
                    <HeroSlideMedia item={item} priority={false} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

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

            <div
              ref={thumbsRef}
              className="self-start md:self-center w-full md:flex md:justify-center overflow-x-auto max-w-full [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              style={{
                pointerEvents: isLoadingComplete ? "auto" : "none",
              }}
            >
              <div className="flex gap-5 w-max justify-start md:mx-auto">
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
                      priority={false}
                      fetchPriority="low"
                      loading="lazy"
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
