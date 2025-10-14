// components/ParallaxGallery.js
import { useEffect, useRef } from "react";
import { PrismicNextImage } from "@prismicio/next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ParallaxGallery = ({ slice }) => {
  const galleryRef = useRef(null);

  // The GSAP and useEffect logic does not need to change at all.
  useEffect(() => {
    let ctx = gsap.context(() => {
      const imageContainers = gsap.utils.toArray(".imageContainer");

      imageContainers.forEach((container) => {
        const image = container.querySelector("img");

        const parallaxTween = gsap.to(image, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.fromTo(
          parallaxTween,
          { timeScale: 3 },
          {
            timeScale: 0.2,
            ease: "power1.inOut",
            yoyo: true,
            repeat: 1,
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });
    }, galleryRef);

    return () => ctx.revert();
  }, [slice]);

  return (
    <section
      ref={galleryRef}
      className="
        w-full flex flex-col
        gap-8 pb-[10vh]
        lg:gap-0 lg:pb-[40vh] 
      "
    >
      {slice.primary.parallax.map((item, index) => (
        <div
          key={index}
          className={`
            imageContainer overflow-hidden 
     
            h-[50vh] w-[75%]

            

            xl:h-[70vh] xl:w-[44%] xl:max-w-[1280px]

            lg:h-[70vh] lg:w-[44%] lg:max-w-[650px]

            md:h-[70vh] md:w-[43%]


            md:mt-[-16]
            lg:mt-[-20vh] 
            lg:first:mt-0 
            
         
            ${index % 2 === 0 ? "self-start md:ml-[5%]" : "self-end md:mr-[5%]"}
          `}
        >
          <PrismicNextImage
            field={item.parallax_images}
            className="
              w-full object-cover relative
              h-[150%]
              top-[-25%] 
            "
          />
        </div>
      ))}
    </section>
  );
};

export default ParallaxGallery;
