"use client";
import { useEffect, useRef } from "react";
import { PrismicNextImage } from "@prismicio/next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DiscoverHero = ({ slice }) => {
  const containerRef = useRef(null);

  // --- Define individual refs ---
  const imageRef = useRef(null);
  const imageRef1 = useRef(null);
  const imageRef2 = useRef(null);
  const imageRef3 = useRef(null);
  const imageRef4 = useRef(null);
  const imageRef5 = useRef(null);
  const imageRef6 = useRef(null);
  const imageRef7 = useRef(null);
  const imageRef8 = useRef(null);
  const imageRef9 = useRef(null);
  // ------------------------------

  useEffect(() => {
    const container = containerRef.current;
    const allImages = [
      imageRef.current,
      imageRef1.current,
      imageRef2.current,
      imageRef3.current,
      imageRef4.current,
      imageRef5.current,
      imageRef6.current,
      imageRef7.current,
      imageRef8.current,
      imageRef9.current,
    ].filter(Boolean);

    const ctx = gsap.context(() => {
      if (!container || allImages.length === 0) return;

      // --- INITIAL STATE (already opacity 0 via CSS, but ensure) ---
      gsap.set(allImages, { opacity: 0 });

      // --- Fade in sequence on load ---
      gsap.to(allImages, {
        opacity: 1,
        duration: 0.2,
        ease: "power4.in",
        stagger: 0.2,
      });

      // --- Scroll 3D setup ---
      gsap.set(container, { perspective: 8000 });
      gsap.set(allImages, { transformStyle: "preserve-3d" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=300%",
          scrub: true,
          pin: true,
        },
      });

      tl.to(
        imageRef.current,
        { scale: 35, z: 200, x: -4500, y: -7000, ease: "power4.in" },
        0
      )
        .to(
          imageRef1.current,
          { scale: 26, z: 1300, x: 8500, y: -1000, ease: "power4.in" },
          0
        )
        .to(
          imageRef2.current,
          { scale: 12, z: 1000, x: 10000, y: 10000, ease: "power4.in" },
          0
        )
        .to(
          imageRef3.current,
          { scale: 35, z: 1000, x: -9000, y: -14100, ease: "power4.in" },
          0
        )
        .to(
          imageRef4.current,
          { scale: 9, z: 15000, x: -10500, y: -2000, ease: "power4.in" },
          0
        )
        .to(
          imageRef5.current,
          { scale: 10, z: 1000, x: 2500, y: -20, ease: "power4.in" },
          0
        )
        .to(
          imageRef6.current,
          { scale: 11, z: 13000, x: -6500, y: -500, ease: "power4.in" },
          0
        )
        .to(
          imageRef7.current,
          { scale: 6.5, z: 9500, x: -3500, y: 2500, ease: "power4.in" },
          0
        )
        .to(
          imageRef8.current,
          { scale: 18, z: 10500, x: 1400, y: -2500, ease: "power4.in" },
          0
        )
        .to(
          imageRef9.current,
          { scale: 18, z: 10500, x: -10000, y: 7000, ease: "power4.in" },
          0
        );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      data-slice-type={slice.slice_type}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 0. Top Left */}
      <div
        ref={imageRef}
        className="absolute top-[15%] md:top-[25%] left-[25%] w-10 h-8 md:w-32 md:h-20 z-10 opacity-0"
      >
        <PrismicNextImage
          field={slice.primary.image_top_left}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 1. Top Right */}
      <div
        ref={imageRef1}
        className="absolute top-[35%] right-[4%] w-25 h-15 md:w-48 md:h-30 z-20 opacity-0"
      >
        <PrismicNextImage
          field={slice.primary.image_top_right}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2. Bottom Right */}
      <div
        ref={imageRef2}
        className="absolute bottom-10 right-1/4 md:w-50 md:h-30 w-18 h-12 lg:w-80 lg:h-48 z-1 opacity-0"
      >
        <PrismicNextImage
          field={slice.primary.image_bottom_right}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 3. Center Top */}
      <div
        ref={imageRef3}
        className="absolute top-[10%] left-1/3 -translate-x-1/2 xl:w-45 xl:h-45 md:h-25 md:w-25 h-15 w-15 z-1 opacity-0"
      >
        <PrismicNextImage
          field={slice.primary.image_top_center}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 4. Center Left */}
      <div
        ref={imageRef4}
        className="absolute top-1/3 left-0 -translate-y-1/2 w-10 h-15 md:w-20 md:h-28 xl:w-46 xl:h-54 z-20 opacity-0"
      >
        <PrismicNextImage
          field={slice.primary.image_left}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 5. Mid Right */}
      <div
        ref={imageRef5}
        className="absolute bottom-[50%] md:bottom-[41%] right-[10%] w-10 h-10 md:w-20 md:h-20 z-10 opacity-0"
      >
        <PrismicNextImage
          field={slice.primary.image_top_left}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 6. Center */}
      <div
        ref={imageRef6}
        className="absolute lg:top-1/2 top-[38%] left-[10%] -translate-x-1/2 -translate-y-1/2 w-14 h-10 lg:w-28 lg:h-20 z-40 opacity-0"
      >
        <PrismicNextImage
          field={slice.primary.image_top_left}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 7. Bottom Left */}
      <div
        ref={imageRef7}
        className="absolute bottom-[4%] left-[14%] w-20 h-20 lg:w-35 lg:h-35 xl:h-45 xl:w-45 z-10 opacity-0"
      >
        <PrismicNextImage
          field={slice.primary.image_extra_2}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 8. Extra Top */}
      <div
        ref={imageRef8}
        className="absolute top-20 right-1/4 lg:w-38 lg:h-26 w-24 h-15 z-20 opacity-0"
      >
        <PrismicNextImage
          field={slice.primary.image_extra_3}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 9. Extra Bottom Center */}
      <div
        ref={imageRef9}
        className="absolute bottom-[10%] left-[40%] md:left-1/4 w-7 h-7 md:h-15 md:w-15 lg:w-25 lg:h-25 z-10 opacity-0"
      >
        <PrismicNextImage
          field={slice.primary.image_extra_1}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="z-20 text-center max-w-[70%] xl:max-w-[50%] px-6">
        <div className=" text-md md:text-xl xl:text-[26px] font-serif leading-tight tracking-tight">
          {slice.primary.heading?.[0]?.text ||
            "Nestled in Thevally, Kollam, Terratone Boutique Hotel puts you steps from tranquil backwaters, local markets, temples, and Kerala cuisine. Experience the perfect blend of tradition and modern energy—with easy access to key attractions, travel routes, and an authentic neighbourhood vibe for both business and leisure."}
        </div>
      </div>
    </section>
  );
};

export default DiscoverHero;
