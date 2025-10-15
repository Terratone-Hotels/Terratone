import { useEffect, useRef } from "react";
import { PrismicNextImage } from "@prismicio/next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ParallaxGallery = ({ slice }) => {
  const galleryRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const imageContainers = gsap.utils.toArray(".imageContainer");

      imageContainers.forEach((container) => {
        const image = container.querySelector("img");

        // --- REVEAL ANIMATION ---
        gsap.from(container, {
          autoAlpha: 0,
          y: 80,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            toggleActions: "play none none reverse",
            once: true,
          },
        });

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

      ScrollTrigger.refresh();
    }, galleryRef);

    return () => ctx.revert();
  }, [slice]);

  return (
    <section
      ref={galleryRef}
      className="w-full flex flex-col gap-8 pb-[10vh] lg:gap-0 lg:pb-[40vh]"
    >
      {slice.primary.parallax.map((item, index) => (
        <div
          key={index}
          className={`imageContainer overflow-hidden
            h-[40vh] w-3/4 
            lg:h-[70vh] lg:w-[60%] lg:max-w-[650px]
            lg:mt-[-20vh]
            lg:first:mt-0
            ${index % 2 === 0 ? "self-start ml-[5%]" : "self-end mr-[5%]"}
          `}
        >
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
