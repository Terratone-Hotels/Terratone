"use client";

import { useLayoutEffect, useRef } from "react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DotWave from "@/components/DotWave";

gsap.registerPlugin(ScrollTrigger);

const HorizontalPage = ({ slice }) => {
  const containerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const text4Ref = useRef(null);
  const text5Ref = useRef(null);
  const bgRef = useRef(null);
  const imgTopRef = useRef(null);
  const imgBottomRef = useRef(null);
  const img4Ref = useRef(null);

  // 🟣 Section 3 refs
  const section3TextRef = useRef(null);
  const dotWaveRef = useRef(null);
  const section3Text2Ref = useRef(null);
  const section3Text3Ref = useRef(null);

  // 🟠 Marquee refs
  const marqueeWrapperRef = useRef(null);
  const marqueeImagesRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const sections = gsap.utils.toArray(".panel");
      const stops = [];

      sections.forEach((section, index) => {
        if (section.dataset.pin) stops.push(index);
      });

      // Master horizontal scroll timeline
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          end: () => "+=" + container.scrollWidth * 2,
          // markers: true,
        },
      });

      tl.timeScale(0.8);

      stops.forEach((stop, index) => {
        const isSecondSection = stop === 1;
        const isThirdSection = stop === 2;
        const isFourthSection = stop === 3;

        tl.to(sections, { xPercent: -(100 * stop), duration: 1 });

        // === SECTION 2 ===
        if (isSecondSection) {
          const text1 = text1Ref.current;
          const text2 = text2Ref.current;
          const text3 = text3Ref.current;
          const text4 = text4Ref.current;
          const text5 = text5Ref.current;
          const bg = bgRef.current;
          const imgTop = imgTopRef.current;
          const imgBottom = imgBottomRef.current;
          const img4 = img4Ref.current;

          gsap.set([text1, text2, text3, text4, text5], { opacity: 0 });
          gsap.set([imgTop, imgBottom, img4], { opacity: 0, scale: 1 });
          gsap.set(bg, { scale: 1 });

          tl.to(text1, { opacity: 1, duration: 1 })
            .to(bg, { scale: 0.5, duration: 2, ease: "power2.out" })
            .to(text1, { opacity: 0, duration: 0.5 }, "<")
            .to(text2, { opacity: 1, duration: 1 })
            .to({}, { duration: 1 })
            .to([text2, bg], { opacity: 0, duration: 1.2 })
            .to([imgTop, imgBottom], {
              opacity: 1,
              y: 0,
              duration: 2,
              ease: "power2.out",
            })
            .to(text3, { opacity: 1, duration: 1.5 }, ">-0.5")
            .to({}, { duration: 1 })
            .to(text3, { opacity: 0, duration: 1 })
            .to(
              [imgTop, imgBottom],
              { opacity: 0, scale: 0.8, duration: 2, ease: "power2.inOut" },
              "<"
            )
            .fromTo(
              img4,
              { opacity: 0, scale: 0 },
              { opacity: 1, scale: 0.6, duration: 2, ease: "power2.out" }
            )
            .to(text4, { opacity: 1, duration: 1.2 }, ">+0.4")
            .to(text4, { opacity: 0, duration: 1.2 })
            .fromTo(
              text5,
              { opacity: 0, scale: 0.95 },
              { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" },
              ">-0.3"
            );
        }

        // === SECTION 3 ===
        if (isThirdSection) {
          const text1 = section3TextRef.current;
          const wave = dotWaveRef.current;
          const text2 = section3Text2Ref.current;
          const text3 = section3Text3Ref.current;

          gsap.set([text1, wave], { opacity: 1 });
          gsap.set([text2, text3], { opacity: 0, y: 0 });

          tl.to([text1, wave], { opacity: 0, duration: 1.5 })
            .to(
              [text2, text3],
              { opacity: 1, duration: 1.8, stagger: 0.2, ease: "power2.out" },
              ">-0.3"
            )
            .to({}, { duration: 0.8 })
            .to(
              text2,
              { y: -60, opacity: 0, duration: 1.2, ease: "power2.inOut" },
              "fadeout"
            )
            .to(
              text3,
              { y: 60, opacity: 0, duration: 1.2, ease: "power2.inOut" },
              "fadeout"
            );
        }

        // === SECTION 4 (Marquee) ===
        if (isFourthSection) {
          const marqueeImgs = marqueeImagesRef.current;

          // reset to clean horizontal start
          gsap.set(marqueeImgs, {
            xPercent: (i) => i * 120,
            opacity: 1,
          });

          // move horizontally left
          tl.to(marqueeImgs, {
            xPercent: "-=360",
            duration: 5,
            ease: "none",
          });
        }

        tl.to(sections, { xPercent: -(100 * stop), duration: 1 });

        if (index === stops.length - 1) {
          tl.to(sections, {
            xPercent: -(100 * (sections.length - 1)),
            duration: 1,
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="horizontal-container overflow-hidden relative"
    >
      <div className="panels flex flex-nowrap h-screen">
        {/* SECTION 1 */}
        <section className="panel w-screen h-screen flex items-center justify-start px-24 font-barlow">
          <div className="text-left max-w-[600px] text-[340px] leading-tight">
            <PrismicRichText field={slice.primary.our_story} />
          </div>
        </section>

        {/* SECTION 2 */}
        <section
          className="panel relative flex flex-col items-center justify-center text-white text-4xl w-screen h-screen overflow-hidden"
          data-pin="true"
        >
          <div ref={bgRef} className="absolute inset-0 -z-10">
            <PrismicNextImage
              field={slice.primary.image_1}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div
            ref={imgTopRef}
            className="absolute top-0 left-[75%] -translate-x-1/2 w-[30%] h-[65vh] opacity-0"
          >
            <PrismicNextImage
              field={slice.primary.image_2}
              fill
              className="object-cover shadow-lg"
            />
          </div>
          <div
            ref={imgBottomRef}
            className="absolute bottom-0 left-[25%] -translate-x-1/2 w-[30%] h-[65vh] opacity-0"
          >
            <PrismicNextImage
              field={slice.primary.image_3}
              fill
              className="object-cover shadow-lg"
            />
          </div>
          <div
            ref={img4Ref}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[135vh] opacity-0"
          >
            <PrismicNextImage
              field={slice.primary.image_4}
              fill
              className="object-cover shadow-lg"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex flex-col items-center justify-center text-center max-w-[700px] w-full px-6 translate-y-[-5%]">
              <div ref={text1Ref}>
                <PrismicRichText field={slice.primary.text_1} />
              </div>
              <div
                ref={text2Ref}
                className="absolute inset-0 flex items-center justify-center"
              >
                <PrismicRichText field={slice.primary.text_2} />
              </div>
              <div
                ref={text3Ref}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black opacity-0"
              >
                <PrismicRichText field={slice.primary.text_3} />
              </div>
              <div
                ref={text4Ref}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0"
              >
                <PrismicRichText field={slice.primary.text_4} />
              </div>
              <div
                ref={text5Ref}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0"
              >
                <PrismicRichText field={slice.primary.text_5} />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 */}
        <section
          className="panel flex flex-col items-center justify-center w-screen h-screen px-16 text-center relative"
          data-pin="true"
        >
          <div
            ref={section3TextRef}
            className="max-w-[800px] mb-8 text-3xl text-black relative z-10"
          >
            <PrismicRichText field={slice.primary.section3_text_1} />
          </div>
          <div ref={dotWaveRef} className="z-10">
            <DotWave />
          </div>
          <div
            ref={section3Text2Ref}
            className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 text-4xl text-black z-20"
          >
            <PrismicRichText field={slice.primary.section_3_text_2} />
          </div>
          <div
            ref={section3Text3Ref}
            className="absolute top-[50%] left-1/2 -translate-x-1/2 text-4xl text-black opacity-0 z-20"
          >
            <PrismicRichText field={slice.primary.section_3_text_3} />
          </div>
        </section>

        {/* 🟠 SECTION 4 — PURE HORIZONTAL MARQUEE */}
        <section
          className="panel flex items-center justify-center w-screen h-screen overflow-hidden bg-[#edf1e8]"
          data-pin="true"
        >
          <div
            ref={marqueeWrapperRef}
            className="relative w-[200%] h-[50vh] flex items-center gap-8"
          >
            {[
              slice.primary.marque_1_image_1,
              slice.primary.marque_1_image_2,
              slice.primary.marque_1_image_3,
            ].map((img, i) => (
              <div
                key={i}
                className="flex-1 aspect-[5/3]"
                ref={(el) => (marqueeImagesRef.current[i] = el)}
              >
                <PrismicNextImage
                  field={img}
                  fill
                  className="object-cover rounded-lg shadow-md"
                />
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5 */}
        <section
          className="panel bg-gray-900 flex items-center justify-center text-white text-5xl w-screen h-screen"
          data-pin="true"
        >
          <div>Section 5 — End of Scroll</div>
        </section>
      </div>
    </section>
  );
};

export default HorizontalPage;
