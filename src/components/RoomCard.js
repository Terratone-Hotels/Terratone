"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Button from "@/components/Button";

gsap.registerPlugin(ScrollTrigger);

export default function RoomCard({
  image,
  title,
  description,
  bookingLink,
  linkText = "Book Now",
  titleClassName = "text-xl font-semibold",
  descriptionClassName = "text-xs text-gray-700",
  buttonTextProp = {},
}) {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const titleRef = useRef(null);
  const borderRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial hidden state (prevents flicker)
      gsap.set(
        [imgRef.current, titleRef.current, borderRef.current, descRef.current],
        {
          opacity: 0,
        }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Step 1: Image fade + slow slide up
      tl.fromTo(
        imgRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.8,
          ease: "power3.out",
        }
      );

      // Step 2: Title fade + rise slightly after image
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
        },
        "-=1.2" // overlaps slightly with the end of image animation
      );

      // Step 3: Border line fills left → right
      tl.fromTo(
        borderRef.current,
        { opacity: 1, scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power2.out",
        },
        "-=1.0"
      );

      // Step 4: Description fades + slides from left
      tl.fromTo(
        descRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power2.out",
        },
        "-=0.7"
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={cardRef} className="group flex flex-col py-4 relative">
      {/* Room Image */}
      {image && (
        <PrismicNextImage
          ref={imgRef}
          field={image}
          className="w-full h-[20rem] lg:h-[29.688rem] object-cover"
        />
      )}

      {/* Title */}
      {title && (
        <div ref={titleRef} className={`mt-4 ${titleClassName}`}>
          <PrismicRichText field={title} />
        </div>
      )}

      {/* Border line */}
      <div ref={borderRef} className="w-auto border-b-1"></div>

      {/* Description + Button */}
      <div className="flex mt-3 flex-row items-end justify-between relative">
        {description && (
          <div
            ref={descRef}
            className={`pr-2 font-barlow w-[60%] md:w-[70%] ${descriptionClassName}`}
          >
            <PrismicRichText
              field={description}
              components={{
                paragraph: ({ children }) => (
                  <p className="m-0 font-barlow">{children}</p>
                ),
              }}
            />
          </div>
        )}

        {bookingLink && (
          <div className="lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
            <PrismicNextLink field={bookingLink} className="block">
              <Button
                {...buttonTextProp}
                className="hover:border-transparent transition-colors duration-300"
              >
                {linkText}
              </Button>
            </PrismicNextLink>
          </div>
        )}
      </div>
    </div>
  );
}
