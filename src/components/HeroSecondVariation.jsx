"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { gsap } from "gsap";
import VideoComponent from "@/components/VideoComponent";
import Bounded from "@/components/Bounded";
import { useLoader } from "@/context/LoaderContext";

const THUMB_IMGIX = { w: 160, h: 180, q: 50, fit: "crop" };
const AUTOPLAY_DELAY = 5000;
const LCP_BLOCKER_ID = "hero-secondVariation-lcp";

const HeroSecondVariation = ({ slice }) => {
  const slides = slice?.primary?.carousel || [];
  const { addBlocker, removeBlocker, isRevealed } = useLoader();
  const [activeIndex, setActiveIndex] = useState(0);
  const hasAnimatedInitialHeading = useRef(false);
  const lcpBlockerCleared = useRef(false);
  const headingRef = useRef(null);
  const headingWrapperRef = useRef(null);
  const progressBarsRef = useRef([]);
  const [restartTick, setRestartTick] = useState(0);
  const autoplayRef = useRef(
    Autoplay({
      delay: AUTOPLAY_DELAY,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    }),
  );

  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true }, [
    autoplayRef.current,
  ]);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
    align: "start",
  });

  // --- Register the first slide's asset as a load-blocker for the global curtain ---
  useEffect(() => {
    addBlocker(LCP_BLOCKER_ID);
    return () => removeBlocker(LCP_BLOCKER_ID);
  }, [addBlocker, removeBlocker]);

  const clearLcpBlocker = useCallback(() => {
    if (lcpBlockerCleared.current) return;
    lcpBlockerCleared.current = true;
    removeBlocker(LCP_BLOCKER_ID);
  }, [removeBlocker]);

  // --- Heading clip-reveal (same visual as default variation) ---
  const animateHeadingIn = useCallback(() => {
    if (!headingRef.current) return;
    gsap.killTweensOf(headingRef.current);
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
      {
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.65,
        ease: "power3.out",
      },
    );
  }, []);

  useLayoutEffect(() => {
    if (headingRef.current) {
      gsap.set(headingRef.current, {
        opacity: 0,
        clipPath: "inset(100% 0% 0% 0%)",
      });
    }
  }, []);

  // Initial reveal is gated on the global curtain, not on an Embla event.
  useEffect(() => {
    if (!isRevealed || hasAnimatedInitialHeading.current) return;
    hasAnimatedInitialHeading.current = true;
    gsap.set(headingWrapperRef.current, { opacity: 1, y: 0 });
    animateHeadingIn();
  }, [isRevealed, animateHeadingIn]);

  // --- select fires the instant target slide is decided (hide heading, mirrors slideChangeTransitionStart) ---
  // --- settle fires once the snap has physically finished (reveal heading, mirrors slideChangeTransitionEnd) ---
  useEffect(() => {
    const emblaApi = emblaMainApi;
    if (!emblaApi) return;

    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      setActiveIndex(index);
      // Bumping this forces only the active bar's key to change below,
      // remounting it so its CSS animation restarts cleanly from 0.
      setRestartTick((t) => t + 1);
      emblaThumbsApi?.scrollTo(index);

      if (hasAnimatedInitialHeading.current) {
        gsap.killTweensOf(headingRef.current);
        gsap.set(headingRef.current, { opacity: 0 });
      }
    };

    const onSettle = () => {
      if (hasAnimatedInitialHeading.current) animateHeadingIn();
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("settle", onSettle);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("settle", onSettle);
    };
  }, [emblaMainApi, emblaThumbsApi, animateHeadingIn]);

  // --- Autoplay stays paused behind the curtain, starts once revealed ---
  useEffect(() => {
    const autoplay = emblaMainApi?.plugins()?.autoplay;
    autoplay?.stop();
  }, [emblaMainApi]);

  useEffect(() => {
    if (!isRevealed || !emblaMainApi) return;
    const autoplay = emblaMainApi.plugins()?.autoplay;
    autoplay?.play();
  }, [isRevealed, emblaMainApi]);

  // --- Progress ring: a CSS animation, not a per-frame JS write. Paused
  // during drag so it doesn't visibly race ahead of/behind the interaction. ---
  useEffect(() => {
    const emblaApi = emblaMainApi;
    if (!emblaApi) return;

    const setPlayState = (state) => {
      const bar = progressBarsRef.current[emblaApi.selectedScrollSnap()];
      if (bar) bar.style.animationPlayState = state;
    };
    const pause = () => setPlayState("paused");
    const resume = () => setPlayState("running");

    emblaApi.on("pointerDown", pause);
    emblaApi.on("pointerUp", resume);

    return () => {
      emblaApi.off("pointerDown", pause);
      emblaApi.off("pointerUp", resume);
    };
  }, [emblaMainApi]);

  const onClickThumb = useCallback(
    (index) => {
      if (!isRevealed || !emblaMainApi) return;
      gsap.killTweensOf(headingRef.current);
      gsap.set(headingRef.current, { opacity: 0 });
      emblaMainApi.scrollTo(index);
    },
    [isRevealed, emblaMainApi],
  );

  if (!slides.length) return null;

  return (
    <section data-hero-slice className="data-hero-slice h-screen">
      <Bounded full className="hero-section relative overflow-hidden">
        <div className="relative h-screen z-10 origin-bottom">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-9 pointer-events-none" />

          <div className="overflow-hidden" ref={emblaMainRef}>
            <div className="flex">
              {slides.map((item, index) => (
                <div className="flex-[0_0_100%] min-w-0" key={index}>
                  {item.video ? (
                    <VideoComponent
                      srcMp4={item.youtube_video_id}
                      className="w-full  object-cover"
                      onLoadedData={index === 0 ? clearLcpBlocker : undefined}
                    />
                  ) : (
                    <PrismicNextImage
                      field={item.image}
                      loading={index === 0 ? "eager" : "lazy"}
                      priority={index === 0}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      imgixParams={{ q: 70 }}
                      className="w-full h object-cover"
                      onLoad={index === 0 ? clearLcpBlocker : undefined}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div
            className="absolute bottom-0 w-full flex flex-col sm:items-center z-20 pb-6 md:pb-10 px-[22px]"
            style={{ pointerEvents: "none" }}
          >
            <div
              ref={headingWrapperRef}
              className="w-full"
              style={{ opacity: 0 }}
            >
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
              className="overflow-hidden md:w-full md:flex md:justify-center"
              ref={emblaThumbsRef}
              style={{ pointerEvents: isRevealed ? "auto" : "none" }}
            >
              <div className="flex gap-5 w-max">
                {slides.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to slide ${index + 1} of ${slides.length}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                    onClick={() => onClickThumb(index)}
                    className="relative block flex-[0_0_auto] rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                  >
                    <PrismicNextImage
                      field={item.video ? item.thumbnail : item.image}
                      priority={index === 0}
                      fetchPriority={index === 0 ? "high" : "low"}
                      loading={index === 0 ? "eager" : "lazy"}
                      sizes="160px"
                      imgixParams={THUMB_IMGIX}
                      className="w-16 h-18 md:w-18 md:h-20 object-cover"
                    />
                    <svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <rect
                        key={
                          index === activeIndex
                            ? `active-${restartTick}`
                            : `idle-${index}`
                        }
                        transform="rotate(-90 50 50)"
                        ref={(el) => (progressBarsRef.current[index] = el)}
                        pathLength="1"
                        className={`fill-transparent stroke-white stroke-[3] transition-opacity duration-300 ${
                          index === activeIndex
                            ? "opacity-100 hero-progress-fill"
                            : "opacity-20"
                        }`}
                        style={{
                          strokeDasharray: 1,
                          strokeDashoffset: 1,
                          animationDuration:
                            index === activeIndex
                              ? `${AUTOPLAY_DELAY}ms`
                              : undefined,
                          animationPlayState:
                            index === activeIndex && isRevealed
                              ? "running"
                              : "paused",
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

export default HeroSecondVariation;
