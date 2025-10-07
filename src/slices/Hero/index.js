"use client";

import React, { useEffect, useRef, useState } from "react";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { gsap } from "gsap";
import VideoComponent from "@/components/VideoComponent";
import Bounded from "@/components/Bounded";

const Hero = ({ slice }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [currentSwiper, setCurrentSwiper] = useState(null);

  const heroWrapperRef = useRef(null);
  const headingRef = useRef(null);
  const thumbsRef = useRef(null);
  const textContainerRef = useRef(null);
  const logoLeftRef = useRef(null);
  const logoRightRef = useRef(null);

  // --- Autoplay ---
  useEffect(() => {
    if (!currentSwiper) return;
    const id = setInterval(() => currentSwiper.slideNext(), 5000);
    return () => clearInterval(id);
  }, [currentSwiper]);

  const handleSwiper = (swiper) => setCurrentSwiper(swiper);

  // === GSAP Loader + Curtain Animation ===
  useEffect(() => {
    const textContainer = textContainerRef.current;
    const innerLetters = document.querySelectorAll(".inner-letter");
    const logoLeft = logoLeftRef.current;
    const logoRight = logoRightRef.current;

    // Random top/bottom for each letter
    innerLetters.forEach((letter) => {
      const fromTop = Math.random() > 0.5;
      const clip = fromTop ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)";
      const offset = fromTop ? { yPercent: 100 } : { yPercent: -100 };
      gsap.set(letter, { clipPath: clip, opacity: 0, ...offset });
      letter.dataset.dir = fromTop ? "top" : "bottom";
    });

    // Initial positions
    gsap.set(heroWrapperRef.current, {
      scaleY: 0.65,
      transformOrigin: "center bottom",
      filter: "blur(2px)",
    });
    gsap.set(".curtain", { yPercent: 0 });
    gsap.set([headingRef.current, thumbsRef.current], { opacity: 0 });
    gsap.set(textContainer, { opacity: 0 });
    gsap.set([logoLeft, logoRight], {
      opacity: 0,

      xPercent: (i) => (i === 0 ? -400 : 400), // move from sides
      rotate: 25,
    });

    const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

    // === 1️⃣ Fade-in text container ===
    tl.to(textContainer, { opacity: 1, duration: 0.6, ease: "power1.out" });

    // === 2️⃣ Random up/down reveal ===
    tl.to(innerLetters, {
      clipPath: "inset(0% 0% 0% 0%)",
      yPercent: 0,
      opacity: 1,
      duration: 1.3,
      stagger: { each: 0.08, from: "random" },
    });

    // === 3️⃣ Random up/down vanish ===
    tl.to(
      innerLetters,
      {
        clipPath: (i, el) =>
          el.dataset.dir === "top"
            ? "inset(0% 0% 100% 0%)"
            : "inset(100% 0% 0% 0%)",
        yPercent: (i, el) => (el.dataset.dir === "top" ? -100 : 100),
        opacity: 0,
        duration: 1.2,
        stagger: { each: 0.05, from: "random" },
        delay: 0.3,
      },
      "-=0.4"
    );

    // === 4️⃣ Fade out text container ===
    tl.to(
      textContainer,
      { opacity: 0, duration: 0.5, ease: "power2.inOut" },
      "-=0.2"
    );

    // === 5️⃣ Logo strokes slide in from left/right ===
    tl.to([logoLeft, logoRight], {
      opacity: 1,
      xPercent: 0,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.1,
    });

    // === 6️⃣ Subtle bounce/settle motion ===
    tl.to([logoLeft, logoRight], {
      yPercent: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.6)",
    });

    // === 7️⃣ Curtain raise + hero stretch ===
    tl.to(".curtain", { yPercent: -100, duration: 2 }, "-=0.5")
      .to(
        heroWrapperRef.current,
        {
          scaleY: 1,
          filter: "blur(0px)",
          duration: 2.2,
          ease: "expo.out",
        },
        "<"
      )
      .set(".curtain", { display: "none" });

    // === 8️⃣ Heading + thumbs ===
    tl.fromTo(
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
    ).fromTo(
      thumbsRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.4, ease: "power3.out" },
      "-=1"
    );

    return () => tl.kill();
  }, []);

  return (
    <Bounded full className="hero-section relative overflow-hidden">
      {/* === Curtain Loader === */}
      <div className="curtain fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black">
        {/* TERRATONE text */}
        <h1
          ref={textContainerRef}
          className="opacity-0 text-white font-barlow uppercase tracking-tighter text-3xl md:text-8xl flex"
        >
          {"TERRATONE".split("").map((char, i) => (
            <span
              key={i}
              className="letter inline-block relative overflow-hidden px-[0.05em]"
            >
              <span className="inner-letter inline-block">{char}</span>
            </span>
          ))}
        </h1>

        {/* Logo strokes */}
        <div className="flex items-center justify-center mt-6 space-x-6">
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
      <div ref={heroWrapperRef} className="relative z-10 origin-bottom">
        <Swiper
          loop
          spaceBetween={0}
          navigation={false}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
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
                  <PrismicNextImage
                    field={item.video ? item.thumbnail : item.image}
                    alt={item.image.alt || ""}
                    className="w-16 h-18 md:w-18 md:h-20 object-cover cursor-pointer hover:border-white transition-all duration-300"
                  />
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
