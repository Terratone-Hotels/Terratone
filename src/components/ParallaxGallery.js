import { useLayoutEffect, useRef } from "react"; // 1. Switched to useLayoutEffect
import { PrismicNextImage } from "@prismicio/next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ParallaxGallery = ({ slice }) => {
  const galleryRef = useRef(null);

  // Use useLayoutEffect for immediate DOM access after render
  useLayoutEffect(() => {
    // GSAP context scopes the animations to this component and handles cleanup
    const ctx = gsap.context(() => {
      const imageContainers = gsap.utils.toArray(".imageContainer");

      // 🛑 Critical Check: Prevent animation setup if no elements are found
      if (imageContainers.length === 0) {
        // console.warn("GSAP: No elements found for selector '.imageContainer'.");
        return;
      }

      imageContainers.forEach((container) => {
        const image = container.querySelector("img");

        // --- REVEAL ANIMATION (Smooth entrance on scroll) ---
        gsap.from(container, {
          y: 80,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            toggleActions: "play none none reverse",
            // 2. Removed 'once: true' to fix the refresh/scroll-restore bug
          },
        });

        // --- PARALLAX ANIMATION (Image moves 25% up) ---
        gsap.to(image, {
          yPercent: 25,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
        });
      });

      // Force a ScrollTrigger refresh after all triggers are created
      ScrollTrigger.refresh();
    }, galleryRef);

    // Cleanup: Revert all animations created in the context when the component unmounts or dependencies change
    return () => ctx.revert();

    // Added optional chaining (?. ) in the dependency array for safety
  }, [slice.primary.parallax?.length]);

  return (
    <section ref={galleryRef} className="w-full flex flex-col gap-8  md:gap-0 ">
      {/* 🛑 Safety check: Use optional chaining to prevent crash if data is null/undefined */}
      {slice.primary.parallax?.map((item, index) => (
        <div
          key={index}
          // The .imageContainer class is critical for GSAP to select targets
          className={`imageContainer overflow-hidden
            h-[40vh] w-3/4 
            
            md:h-[70vh] md:w-[60%] md:max-w-[650px]
            md:mt-[5vh]
            2xl:mt-[-20vh]
            md:first:mt-0
            ${index % 2 === 0 ? "self-start ml-[5%]" : "self-end mr-[5%]"}
          `}
        >
          {/* The image is contained within the imageContainer and set up for parallax */}
          <PrismicNextImage
            field={item.parallax_images}
            className="w-full object-cover relative
              h-[150%] top-[-25%]
              will-change-transform will-change-opacity translate-z-0
            "
          />
        </div>
      ))}
    </section>
  );
};

export default ParallaxGallery;
