"use client";
import { useEffect, useRef } from "react";
import { PrismicNextImage } from "@prismicio/next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DiscoverHero = ({ slice }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRefs = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const textEl = textRef.current;
    if (!textEl || !container) return;

    const random = (min, max) => Math.random() * (max - min) + min;
    gsap.set(container, { transformStyle: "preserve-3d", perspective: 1200 });

    const text = textEl.innerText;
    textEl.innerHTML = text
      .split("")
      .map((c) => `<span class="letter">${c}</span>`)
      .join("");
    const letters = textEl.querySelectorAll(".letter");
    gsap.set(letters, { color: "#bcbcbc" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=200%",
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.fromTo(
      textEl,
      { scale: 1, opacity: 0.6 },
      { scale: 1.3, opacity: 1, ease: "power2.out", duration: 20 }
    );
    tl.to(
      letters,
      {
        color: "#000",
        stagger: { each: 0.05, ease: "none" },
        duration: 6,
        ease: "none",
      },
      0.2
    );

    const minDuration = 10;
    const maxDuration = 30;
    const minWidth = 100;
    const maxWidth = 300;

    imageRefs.current.forEach((img) => {
      if (!img) return;
      const imgWidth = img.offsetWidth;
      const mappedDuration = gsap.utils.mapRange(
        minWidth,
        maxWidth,
        maxDuration,
        minDuration
      )(imgWidth);
      const baseDuration = Math.max(
        minDuration,
        Math.min(maxDuration, mappedDuration)
      );
      const finalDuration = baseDuration + random(-2, 2);

      const rect = img.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;
      const centerY = containerRect.top + containerRect.height / 2;

      const dx_start = rect.left + rect.width / 2 - centerX;
      const dy_start = rect.top + rect.height / 2 - centerY;
      const magnitude = Math.sqrt(dx_start * dx_start + dy_start * dy_start);
      const normX = magnitude
        ? dx_start / magnitude
        : Math.cos(Math.random() * Math.PI * 2);
      const normY = magnitude
        ? dy_start / magnitude
        : Math.sin(Math.random() * Math.PI * 2);

      const finalScale = random(3.5, 6);
      const driftDistance = random(1200, 2500);
      const finalZ = random(800, 1200);
      const finalX = normX * driftDistance;
      const finalY = normY * driftDistance;

      tl.to(
        img,
        {
          x: finalX,
          y: finalY,
          z: finalZ,
          scale: finalScale,
          ease: "power2.inOut",
          duration: finalDuration,
          transformOrigin: "center center",
          transformStyle: "preserve-3d",
        },
        0
      );
    });
  }, []);

  return (
    <section
      ref={containerRef}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ perspective: 1200 }}
    >
      {/* Text */}
      <div className="z-20 text-center max-w-[85%] md:max-w-[80%] xl:max-w-[50%] px-6">
        <div
          ref={textRef}
          className="text-2xl xl:text-[26px] font-serif leading-tight tracking-tight"
        >
          {slice.primary.heading?.[0]?.text ||
            "Nestled in Thevally, Kollam, Terratone Boutique Hotel puts you steps from tranquil backwaters, local markets, temples, and Kerala cuisine. Experience the perfect blend of tradition and modern energy—with easy access to key attractions, travel routes, and an authentic neighbourhood vibe for both business and leisure."}
        </div>
      </div>

      {/* Floating Images */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 0 - Top Left */}
        <div
          ref={(el) => (imageRefs.current[0] = el)}
          className="absolute top-18 left-3 sm:top-15 sm:left-14 sm:w-50 sm:z-20 md:top-16 md:left-12 xl:top-12.5 xl:left-135 w-28 md:w-46 lg:w-55 lg:h-35 xl:w-70 xl:h-44 z-10"
        >
          <PrismicNextImage field={slice.primary.image_top_left} className="w-full h-full object-cover" />
        </div>

        {/* 1 - Top Right */}
        <div
          ref={(el) => (imageRefs.current[1] = el)}
          className="absolute top-14 right-1 sm:top-14 sm:right-4 md:top-14 md:right-2 lg:top-24 lg:right-20 xl:top-25 xl:right-50 w-28 md:w-36 md:h-40 lg:w-38 lg:h-30 xl:w-40 xl:h-32 lg:z-30 xl:z-0"
        >
          <PrismicNextImage field={slice.primary.image_top_right} className="object-cover w-full h-full" />
        </div>

        {/* 2 - Bottom Left */}
        <div
          ref={(el) => (imageRefs.current[2] = el)}
          className="absolute bottom-3 left-3 md:bottom-10 md:left-20 xl:bottom-16 xl:left-61 w-36 md:w-44 xl:w-65 xl:h-40 z-10"
        >
          <PrismicNextImage field={slice.primary.image_bottom_left} className="w-full h-full object-cover" />
        </div>

        {/* 3 - Bottom Right */}
        <div
          ref={(el) => (imageRefs.current[3] = el)}
          className="absolute bottom-5 right-3 md:bottom-6 md:right-5 xl:bottom-7 xl:right-35 w-32 md:w-44 xl:w-61 z-40"
        >
          <PrismicNextImage field={slice.primary.image_bottom_right} className="w-full h-full object-cover" />
        </div>

        {/* 4 - Top Center */}
        <div
          ref={(el) => (imageRefs.current[4] = el)}
          className="absolute top-36 right-1 sm:top-40 sm:left-50  md:top-36 md:left-50 lg:top-40 lg:left-80 xl:bottom-60 xl:left-60 xl:h-34 z-10 w-22 md:w-34 xl:w-60"
        >
          <PrismicNextImage field={slice.primary.image_top_center} className="w-full h-full object-cover" />
        </div>

        {/* 5 - Bottom Center */}
        <div
          ref={(el) => (imageRefs.current[5] = el)}
          className="absolute bottom-28 left-30 z-10 lg:z-0 lg:bottom-30 md:bottom-20 xl:bottom-40 xl:left-110  w-28 md:w-40 lg:w-30 xl:w-50"
        >
          <PrismicNextImage field={slice.primary.image_bottom_center}  className="w-full h-full object-cover"/>
        </div>

        {/* 6 - Left */}
        <div
          ref={(el) => (imageRefs.current[6] = el)}
          className="absolute top-45 left-1 sm:top-60 sm:w-16 md:left-3 md:top-60 xl:top-70 xl:left-20  w-14 md:w-20 xl:w-40"
        >
          <PrismicNextImage field={slice.primary.image_left}  className="w-full h-full object-cover"/>
        </div>

        {/* 7 - Right */}
        <div
          ref={(el) => (imageRefs.current[7] = el)}
          className="absolute bottom-62 right-1 md:bottom-42 md:right-1 xl:right-10 xl:top-50  w-14  md:w-34 xl:w-60 xl:h-70"
        >
          <PrismicNextImage field={slice.primary.image_right}  className="w-full h-full object-cover"/>
        </div>

        {/* 8 - Extra Right Top */}
        <div
          ref={(el) => (imageRefs.current[8] = el)}
          className="z-10 xl:z-0 absolute bottom-33 right-1 md:right-40 md:bottom-33 lg:right-70 xl:h-28 xl:left-108 xl:top-49 w-27 md:w-42 xl:w-40"
        >
          <PrismicNextImage field={slice.primary.image_right} className="w-full h-full object-cover" />
        </div>

        {/* 9 - Extra Bottom Right Small */}
        <div
          ref={(el) => (imageRefs.current[9] = el)}
          className="absolute bottom-24 left-2 sm:bottom-15 sm:left-70 sm:w-30 md:bottom-8 md:left-90 lg:bottom-2 xl:bottom-2 xl:left-200 w-20 md:w-32 lg:w-40  xl:w-50 z-10"
        >
          <PrismicNextImage field={slice.primary.image_extra_1}  className="w-full h-full object-cover"/>
        </div>

        {/* 10 - Extra Bottom Mid */}
        <div
          ref={(el) => (imageRefs.current[10] = el)}
          className="absolute bottom-20 right-25 md:bottom-16 md:right-40 lg:bottom-4 xl:bottom-30 xl:right-65  w-20 md:w-36 xl:w-40 xl:-z-30"
        >
          <PrismicNextImage field={slice.primary.image_extra_2}  className="w-full h-full object-cover"/>
        </div>

        {/* 11 - Extra Top Right Large */}
        <div
          ref={(el) => (imageRefs.current[11] = el)}
          className="absolute top-15 right-25 sm:top-20 sm:right-40 md:top-12  md:right-60 xl:top-16 xl:right-100 w-24 md:w-37 xl:w-50 z-20"
        >
          <PrismicNextImage field={slice.primary.image_extra_3}  className="w-full h-full object-cover"/>
        </div>
      </div>
    </section>
  );
};

export default DiscoverHero;
