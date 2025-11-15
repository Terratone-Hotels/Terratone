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

  // 🟣 SECTION 2 REFS
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const text4Ref = useRef(null);
  const text5Ref = useRef(null);
  const bgRef = useRef(null);
  const imgTopRef = useRef(null);
  const imgBottomRef = useRef(null);
  const img4Ref = useRef(null);

  // 🟡 SECTION 3 REFS
  const section3TextRef = useRef(null);
  const dotWaveRef = useRef(null);
  const section3Text2Ref = useRef(null);
  const section3Text3Ref = useRef(null);

  // 🟠 SECTION 5 REFS
  const section5TextRef = useRef(null);
  const section5Image1Ref = useRef(null);
  const section5Image2Ref = useRef(null);
  const section5Image3Ref = useRef(null);

  // 🟢 SECTION 6 REFS
  const section6ImgRef = useRef(null);
  const section6TextRef = useRef(null);

  // 🟤 MARQUEE REFS
  const marqueeWrapperRef = useRef(null);
  const marqueeImagesRef = useRef([]);

  const galleryImagesRef = useRef([]);

  const section6Text2Ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const sections = gsap.utils.toArray(".panel");
      const stops = [];
      sections.forEach((section, i) => {
        if (section.dataset.pin) stops.push(i);
      });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          end: () => "+=" + container.scrollWidth * 2.5,
          // markers: true,
        },
      });

      tl.timeScale(0.8);

      stops.forEach((stop, index) => {
        const isSecond = stop === 1;
        const isThird = stop === 2;
        const isFourth = stop === 3;
        const isFifth = stop === 4;
        const isSixth = stop === 5; // 👈 added for section 6

        tl.to(sections, { xPercent: -(100 * stop), duration: 1 });

        // === 🟣 SECTION 2 ===
        if (isSecond) {
          const text1 = text1Ref.current;
          const text2 = text2Ref.current;
          const text3 = text3Ref.current;
          const text4 = text4Ref.current;
          const text5 = text5Ref.current;
          const bg = bgRef.current;
          const imgTop = imgTopRef.current;
          const imgBottom = imgBottomRef.current;
          const img4 = img4Ref.current;

          gsap.set(
            [text1, text2, text3, text4, text5, imgTop, imgBottom, img4],
            { opacity: 0 }
          );
          gsap.set(bg, { scale: 1 });

          tl.to(text1, { opacity: 1, duration: 1 })
            .to(bg, { scale: 0.5, duration: 2, ease: "power2.out" })
            .to(text1, { opacity: 0, duration: 0.5 }, "<")
            .to(text2, { opacity: 1, duration: 1 })
            .to({}, { duration: 1 })
            .to([text2, bg], { opacity: 0, duration: 1.2 })
            .to([imgTop, imgBottom], {
              opacity: 1,
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

        // === 🟡 SECTION 3 ===
        if (isThird) {
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

        // === 🟤 SECTION 4 — SCRUB PARALLAX FROM BELOW ===
        if (isFourth) {
          const imgs = marqueeImagesRef.current;

          // They start BELOW the screen (~50%)
          gsap.set(imgs, { yPercent: 150 });

          // As user scrolls → they rise up

          tl.to(imgs, {
            yPercent: -140,
            ease: "none",
          });
        }

        // === 🔵 SECTION 5 — TEXT + IMAGES ===
        if (isFifth) {
          const text = section5TextRef.current;
          const img1 = section5Image1Ref.current;
          const img2 = section5Image2Ref.current;
          const img3 = section5Image3Ref.current;

          gsap.set([img1, img2, img3], { opacity: 0, scale: 0.95 });
          gsap.set(text, { opacity: 0 });

          tl.fromTo(text, { opacity: 0 }, { opacity: 1, duration: 1.2 })
            .to({}, { duration: 1 })
            .to(text, { opacity: 0, duration: 1.2 })
            .to(img1, {
              opacity: 1,
              scale: 1,
              duration: 1.2,
              ease: "power2.out",
            })
            .to(
              img2,
              { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
              ">0.3"
            )
            .to(
              img3,
              { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
              ">0.3"
            );
        }

        // SECTION 6

        if (isSixth) {
          const img = section6ImgRef.current;
          const text = section6TextRef.current;
          const galleryRefs = galleryImagesRef.current;

          // Start states
          gsap.set([img, text, ...galleryRefs], { opacity: 0 });
          gsap.set(img, { clipPath: "circle(0% at 50% 50%)", scale: 1 });
          gsap.set(galleryRefs, { scale: 0.8 });

          tl
            // 1️⃣ Circular reveal
            .to(img, {
              opacity: 1,
              clipPath: "circle(50% at 50% 50%)",
              duration: 1.5,
              ease: "power2.out",
            })
            // 2️⃣ Fade text in
            .to(text, { opacity: 1, duration: 1, ease: "power2.out" }, "<+0.3")
            // 3️⃣ Hold with text visible
            .to({}, { duration: 1.5 })
            // 4️⃣ Fade text out and morph circle → rectangle
            .to(
              text,
              { opacity: 0, duration: 1, ease: "power2.inOut" },
              ">-0.3"
            )
            .to(
              img,
              {
                clipPath: "circle(150% at 50% 50%)", // expands outward first
                duration: 1.5,
                ease: "power2.inOut",
              },
              "<"
            )
            .set(img, { clipPath: "inset(0%)" }) // becomes rectangle once fully expanded
            // 5️⃣ Slight scale down (to make space)
            .to(img, {
              scale: 0.9,
              duration: 1.2,
              ease: "power2.inOut",
            })
            // 6️⃣ Reveal gallery organically
            .to(
              galleryRefs,
              {
                opacity: 1,
                scale: 1,
                stagger: 0.25,
                duration: 0.2,
                ease: "power2.out",
              },
              ">-0.4"
            )
            .to(
              [img, ...galleryRefs],
              {
                opacity: 0,

                duration: 2,
                ease: "power2.inOut",
              },
              ">+0.5"
            )
            .to(
              section6Text2Ref.current,
              {
                opacity: 1,
                duration: 1.8,
                ease: "power2.out",
              },
              ">-0.3"
            );
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
        {/* 🟢 SECTION 1 */}
        <section className="panel w-screen h-screen flex items-center justify-start px-24 font-barlow">
          <div className="text-left max-w-[600px] text-[340px] leading-tight">
            <PrismicRichText field={slice.primary.our_story} />
          </div>
        </section>

        {/* 🟣 SECTION 2 */}
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

        {/* 🟡 SECTION 3 */}
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

        {/* 🟤 SECTION 4 — STATIC + PARALLAX */}
        <section
          className="panel flex flex-col items-center justify-center w-screen h-screen gap-10"
          data-pin="true"
        >
          {[...Array(2)].map((_, batch) => (
            <div key={batch} className="flex flex-col items-center gap-10">
              {[
                slice.primary.marque_1_image_1,
                slice.primary.marque_1_image_2,
                slice.primary.marque_1_image_3,
              ].map((img, i) => (
                <div
                  key={batch + "-" + i}
                  ref={(el) => (marqueeImagesRef.current[batch * 3 + i] = el)}
                  className="w-[28vw] h-[55vh] relative overflow-hidden shadow-lg"
                >
                  <PrismicNextImage field={img} fill className="object-cover" />
                </div>
              ))}
            </div>
          ))}
        </section>

        {/* 🔵 SECTION 5 — TEXT + IMAGES */}
        {/* 🔵 SECTION 5 — TEXT + IMAGES WITH GAPS */}
        <section
          className="panel relative flex items-center justify-center w-screen h-screen overflow-hidden "
          data-pin="true"
        >
          {/* TEXT */}
          <div
            ref={section5TextRef}
            className="absolute inset-0 flex items-center justify-center text-5xl text-black z-20 "
          >
            <PrismicRichText field={slice.primary.section_4_text} />
          </div>

          {/* IMAGES WITH GAP */}
          <div className="absolute inset-0 flex gap-4 p-4">
            {/* LEFT */}
            <div className="w-1/2 h-full relative  overflow-hidden ">
              <div
                ref={section5Image1Ref}
                className="absolute inset-0 opacity-0"
              >
                <PrismicNextImage
                  field={slice.primary.section_4_image_1}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* RIGHT */}
            <div className="w-1/2 h-full flex flex-col gap-4">
              <div className="h-1/2 relative overflow-hidden ">
                <div
                  ref={section5Image2Ref}
                  className="absolute inset-0 opacity-0"
                >
                  <PrismicNextImage
                    field={slice.primary.section_4_image_2}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="h-1/2 relative overflow-hidden s">
                <div
                  ref={section5Image3Ref}
                  className="absolute inset-0 opacity-0"
                >
                  <PrismicNextImage
                    field={slice.primary.section_4_image_3}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        {/* 🟢 SECTION 6 — IMAGE MORPH + ORGANIC COLLAGE */}
        <section
          className="panel  flex flex-col items-center justify-center text-black text-5xl w-screen h-screen gap-8 relative overflow-hidden"
          data-pin="true"
        >
          {/* Main image */}
          <div
            ref={section6ImgRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45vh] h-[45vh] overflow-hidden shadow-2xl z-20"
          >
            <PrismicNextImage
              field={slice.primary.section_5_image1}
              fill
              className="object-cover"
            />
          </div>

          {/* Gallery images */}
          {[
            slice.primary.section_5_gallery_1,
            slice.primary.section_5_gallery_2,
            slice.primary.section_5_gallery_3,
            slice.primary.section_5_gallery_4,
            slice.primary.section_5_gallery_5,
            slice.primary.section_5_gallery_6,
          ].map((img, i) => (
            <div
              key={i}
              ref={(el) => (galleryImagesRef.current[i] = el)}
              className={`absolute w-[25vh] h-[25vh] overflow-hidden opacity-0 z-10`}
              style={{
                top: ["8%", "25%", "70%", "70%", "10%", "40%"][i],
                left: ["15%", "85%", "15%", "80%", "65%", "5%"][i],
              }}
            >
              <PrismicNextImage field={img} fill className="object-cover" />
            </div>
          ))}

          {/* Text */}
          <div
            ref={section6TextRef}
            className="absolute bottom-[20%] text-center text-3xl px-6 z-30"
          >
            <PrismicRichText field={slice.primary.section_5_text_1} />
          </div>
          {/* Final reveal text */}
          <div
            ref={section6Text2Ref}
            className="absolute inset-0 flex items-center justify-center text-center text-4xl px-6 opacity-0 z-30"
          >
            <PrismicRichText field={slice.primary.section_5_text_2} />
          </div>
        </section>
      </div>
    </section>
  );
};

export default HorizontalPage;
