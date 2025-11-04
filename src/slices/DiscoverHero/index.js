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

    // Ensure elements exist before proceeding
    if (!textEl || !container) return;

    const random = (min, max) => Math.random() * (max - min) + min;

    // Add 3D perspective to container for depth illusion
    gsap.set(container, { transformStyle: "preserve-3d", perspective: 1200 });

    // Wrap each letter in span for color animation
    const text = textEl.innerText;
    textEl.innerHTML = text
      .split("")
      .map((c) => `<span class="letter">${c}</span>`)
      .join("");
    const letters = textEl.querySelectorAll(".letter");
    gsap.set(letters, { color: "#bcbcbc" });

    // Scroll triggered master timeline
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

    // Animate text scale and color
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

    // --- Variable Speed Image Animation Setup ---
    // Define the range for speed (duration) and size (width)
    const minDuration = 10; // Fastest speed (shorter duration, for bigger images)
    const maxDuration = 30; // Slowest speed (longer duration, for smaller images)
    const minWidth = 100; // Smallest expected image width in pixels (adjust if needed)
    const maxWidth = 300; // Largest expected image width in pixels (adjust if needed)

    imageRefs.current.forEach((img) => {
      if (!img) return;

      // Get actual rendered width for size mapping
      const imgWidth = img.offsetWidth;

      // Map width to duration (inverted: larger width -> shorter duration)
      const mappedDuration = gsap.utils.mapRange(
        minWidth,
        maxWidth,
        maxDuration, // Output for minWidth
        minDuration // Output for maxWidth
      )(imgWidth);

      // Ensure duration stays within bounds and add small random jitter
      const baseDuration = Math.max(
        minDuration,
        Math.min(maxDuration, mappedDuration)
      );
      const finalDuration = baseDuration + random(-2, 2);

      // --- Existing 3D Drift Calculations ---
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

      // 🌙 Drift Fix: Increased base drift distance to ensure images leave the viewport entirely
      const driftDistance = random(1200, 2500); // Increased range from (700, 1500)
      // 🌙 Drift Fix: Increased Z distance to make the animation feel deeper/farther
      const finalZ = random(800, 1200); // Increased range from (400, 600)

      const finalX = normX * driftDistance;
      const finalY = normY * driftDistance;

      // --- Animation Application (using finalDuration) ---
      tl.to(
        img,
        {
          x: finalX,
          y: finalY,
          z: finalZ,
          scale: finalScale,
          ease: "power2.inOut",
          duration: finalDuration, // Mapped duration based on size
          transformOrigin: "center center",
          transformStyle: "preserve-3d",
        },
        0 // all animations start simultaneously
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
      <div className="z-20 text-center max-w-[50%] px-6">
        <div
          ref={textRef}
          className="text-2xl xl:text-[26px] font-serif leading-tight tracking-tight"
        >
          {slice.primary.heading?.[0]?.text ||
            "Nestled in Thevally, Kollam, Terratone Boutique Hotel puts you steps from tranquil backwaters, local markets, temples, and Kerala cuisine. Experience the perfect blend of tradition and modern energy—with easy access to key attractions, travel routes, and an authentic neighbourhood vibe for both business and leisure."}
        </div>
      </div>

      {/* Floating images (9 existing + 3 new slots = 12 total) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Image 0 (Top Left) */}
        <div
          ref={(el) => (imageRefs.current[0] = el)}
          className="absolute md:left-26 md:top-20 xl:top-12.5 xl:left-135 w-40 xl:w-50 xl:h-44 z-10"
        >
          <PrismicNextImage
            field={slice.primary.image_top_left}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Image 1 (Top Right) */}
        <div
          ref={(el) => (imageRefs.current[1] = el)}
          className="absolute md:right-60 md:top-17 xl:top-25 xl:right-150 w-40 md:w-29.5 xl:h-32 md:h-70 z-10"
        >
          <PrismicNextImage
            field={slice.primary.image_top_right}
            className="object-cover w-full h-full"
          />
        </div>
        {/* Image 2 (Bottom Left) */}
        <div
          ref={(el) => (imageRefs.current[2] = el)}
          className="absolute md:bottom-10 md:left-70 xl:bottom-16 xl:left-61 w-50 xl:h-37 xl:w-65 z-10"
        >
          <PrismicNextImage
            field={slice.primary.image_bottom_left}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Image 3 (Bottom Right) */}
        <div
          ref={(el) => (imageRefs.current[3] = el)}
          className="absolute md:bottom-10 md:right-10 xl:bottom-7 xl:right-55 w-40 xl:w-61 z-40"
        >
          <PrismicNextImage field={slice.primary.image_bottom_right} />
        </div>
        {/* Image 4 (Top Center) */}
        <div
          ref={(el) => (imageRefs.current[4] = el)}
          className="absolute xl:bottom-60 xl:right-50 z-10 xl:w-40"
        >
          <PrismicNextImage field={slice.primary.image_top_center} />
        </div>
        {/* Image 5 (Bottom Center) */}
        <div
          ref={(el) => (imageRefs.current[5] = el)}
          className="absolute xl:w-40 xl:bottom-40 xl:left-110"
        >
          <PrismicNextImage field={slice.primary.image_bottom_center} />
        </div>
        {/* Image 6 (Left) */}
        <div
          ref={(el) => (imageRefs.current[6] = el)}
          className="absolute xl:w-40 xl:top-70 xl:left-50"
        >
          <PrismicNextImage field={slice.primary.image_left} />
        </div>
        {/* Image 7 (Right) */}
        <div
          ref={(el) => (imageRefs.current[7] = el)}
          className="absolute xl:w-60 xl:right-30 xl:top-70"
        >
          <PrismicNextImage field={slice.primary.image_right} />
        </div>
        {/* Image 8 (Extra spot) */}
        <div
          ref={(el) => (imageRefs.current[8] = el)}
          className="absolute xl:w-40 xl:left-108 xl:top-34"
        >
          <PrismicNextImage field={slice.primary.image_right} />
        </div>

        {/* Image 9 (Example positioning: Smaller size, slower speed) */}
        <div
          ref={(el) => (imageRefs.current[9] = el)}
          className="absolute xl:w-50 xl:bottom-2 xl:right-140 z-10"
        >
          <PrismicNextImage field={slice.primary.image_extra_1} />
        </div>
        {/* Image 10 (Example positioning: Medium size) */}
        <div
          ref={(el) => (imageRefs.current[10] = el)}
          className="absolute xl:w-50 xl:bottom-20 xl:right-15 z-30"
        >
          <PrismicNextImage field={slice.primary.image_extra_2} />
        </div>
        {/* Image 11 (Example positioning: Larger size, faster speed) */}
        <div
          ref={(el) => (imageRefs.current[11] = el)}
          className="absolute xl:w-50 xl:top-10 xl:right-100 z-20"
        >
          <PrismicNextImage field={slice.primary.image_extra_3} />
        </div>
      </div>
    </section>
  );
};

export default DiscoverHero;
