"use client";
import { useEffect, useRef } from "react";
import { PrismicNextImage } from "@prismicio/next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DiscoverHero = ({ slice }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

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
    const textEl = textRef.current;

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

      // --- Split text into spans for animation ---
      if (textEl) {
        const text = textEl.innerText;
        textEl.innerHTML = text
          .split("")
          .map((c) => `<span class="letter">${c}</span>`)
          .join("");
      }

      const letters = textEl ? textEl.querySelectorAll(".letter") : [];

      // --- INITIAL STATE ---
      gsap.set(allImages, { opacity: 0 });
      if (textEl) gsap.set(textEl, { opacity: 0 }); // 🌙
      if (letters.length > 0) gsap.set(letters, { color: "transparent" });

      // --- Fade in sequence on load ---
      // Text fades in first
      if (textEl) {
        gsap.to(textEl, {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.2, // slight delay before fade
        });
      }

      // 2️⃣ Letters fill up (gray → black), after text appears
      if (letters.length > 0) {
        gsap.to(letters, {
          color: "#000",
          duration: 0.6,
          stagger: 0.005,
          ease: "none",
          delay: 0.6, // starts right after text fade starts finishing
        });
      }

      // 3️⃣ Then images fade in one by one
      gsap.fromTo(
        allImages,
        {
          opacity: 0,
          clipPath: "inset(100% 0% 0% 0%)", // collapsed center
        },
        {
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)", // fully revealed
          duration: 0.9,
          ease: "circ.out",
        }
      );

      // --- Scroll 3D setup ---
      gsap.set(container, { perspective: 8000 });
      gsap.set(allImages, { transformStyle: "preserve-3d" });

      // --- ScrollTrigger timeline ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=250%",
          scrub: true,
          pin: true,
          // markers: true,
        },
      });

      // --- TEXT ANIMATION (fade out instantly as scroll begins) ---
      if (textEl && letters.length > 0) {
        gsap.set(letters, { opacity: 1 });

        gsap.to(letters, {
          opacity: 0,
          ease: "power4.in",
          stagger: {
            each: 0.008,
            from: "start",
          },
          scrollTrigger: {
            trigger: container,
            start: "center+=45% bottom", // start as soon as hero hits top
            end: "bottom+=100%", // finish quickly within first 10% of scroll
            scrub: true, // tie to scroll progress (no snap)
            // markers:true,
          },
        });
      }

      // --- IMAGE ANIMATIONS (untouched) ---
      tl.to(
        imageRef.current,
        { scale: 25, z: 200, x: -6500, y: -7000, ease: "power4.in" },
        -0.2
      )
        .to(
          imageRef1.current,
          { scale: 26, z: 1300, x: 8500, y: -1000, ease: "power4.in" },
          "<"
        )
        .to(
          imageRef2.current,
          { scale: 12, z: 1000, x: 4000, y: 10000, ease: "power4.in" },
          "<"
        )
        .to(
          imageRef3.current,
          { scale: 35, z: 1000, x: 6000, y: -14100, ease: "power4.in" },
          "<"
        )
        .to(
          imageRef4.current,
          { scale: 25, z: 15000, x: -8500, y: 1000, ease: "power4.in" },
          "<"
        )
        .to(
          imageRef5.current,
          { scale: 10, z: 1000, x: -5500, y: 7220, ease: "power4.in" },
          "<"
        )
        .to(
          imageRef6.current,
          { scale: 11, z: 13000, x: -6500, y: -500, ease: "power4.in" },
          "<"
        )
        .to(
          imageRef7.current,
          { scale: 6.5, z: 9500, x: -3500, y: 2500, ease: "power4.in" },
          "<"
        )
        .to(
          imageRef8.current,
          { scale: 18, z: 10500, x: 1400, y: -2500, ease: "power4.in" },
          "<"
        )
        .to(
          imageRef9.current,
          { scale: 18, z: 10500, x: -10000, y: 7000, ease: "power4.in" },
          "<"
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
        className="absolute top-[25%] left-[10%]  md:top-[15%] xl:top-[15%]  xl:left-[25%] w-30 h-20 md:w-62 md:h-40 z-10 opacity-0"
      >
        <PrismicNextImage
          field={slice.primary.image_top_left}
          className="w-full h-full object-cover"
          
        />
      </div>

      {/* 1. Top Right */}
      <div
        ref={imageRef1}
        className="absolute top-[45%] right-[1%] lg:top-[40%] xl:top-[35%] xl:right-[4%] w-16 h-14 md:w-33 md:h-21 lg:w-45 lg:h-25 xl:w-60 xl:h-38 z-20 opacity-0"
      >
        <PrismicNextImage
          field={slice.primary.image_right}
          className="w-full h-full object-cover"
         
        />
      </div>

      {/* 2. Bottom Right */}
      <div
        ref={imageRef2}
        className="absolute bottom-[27%] right-[10%] md:bottom-[12%] md:right-[5%] lg:bottom-[8%] lg:right-[8%] xl:bottom-10 xl:right-1/4 md:w-60 md:h-40 w-30 h-18 lg:w-80 lg:h-48 z-1 opacity-0"
      >
        <PrismicNextImage
          field={slice.primary.image_bottom_right}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 3. Center Top */}
      <div
        ref={imageRef3}
        className="absolute top-[22%] right-[5%] md:top-[16%] md:right-[20%] xl:top-[10%] xl:right-[25%]  xl:w-65 xl:h-45 md:h-35 md:w-55 h-25 w-35 z-1 opacity-0"
      >
        <PrismicNextImage
          field={slice.primary.image_top_center}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 4. Center Left */}
      <div
        ref={imageRef4}
        className="absolute top-[50%] left-[1%] xl:top-[45%] xl:left-[1%] w-18 h-15 md:w-35 md:h-25 xl:w-60 xl:h-54 z-20 opacity-0"
      >
        <PrismicNextImage
          field={slice.primary.image_left}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 5. Mid Right */}
      <div
        ref={imageRef5}
        className="absolute bottom-[28%] left-[15%] md:bottom-[10%] md:left-[20%] w-25 h-15 md:w-65 md:h-45 z-10 opacity-0"
      >
        <PrismicNextImage
          field={slice.primary.image_bottom_left}
          className="w-full h-full object-cover"
        />
      </div>

      {/* TEXT */}
      <div className="z-20 justify-self-center text-center max-w-[70%] xl:max-w-[60%] px-6">
        <div
          ref={textRef}
          className="text-md md:text-xl xl:text-[26px] font-serif leading-tight tracking-tight opacity-0 "
        >
          {slice.primary.heading?.[0]?.text ||
            "Nestled in Thevally, Kollam, Terratone Boutique Hotel puts you steps from tranquil backwaters, local markets, temples, and Kerala cuisine. Experience the perfect blend of tradition and modern energy—with easy access to key attractions, travel routes, and an authentic neighbourhood vibe for both business and leisure."}
        </div>
      </div>
    </section>
  );
};

export default DiscoverHero;
