"use client";
import { useRef, useLayoutEffect, useEffect } from "react";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import RatingStars from "@/components/RatingStars";
import FooterLogo from "./FooterLogo";
import FooterLink from "./FooterLink";
import FooterLinkMobile from "./FooterLinkMobile";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer({ footerData }) {
  const data = footerData.data;

  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const footer = footerRef.current;

      const horizontalLines = footer.querySelectorAll(
        ".footer-line-horizontal"
      );
      const verticalLines = footer.querySelectorAll(".footer-line-vertical");
      const logo = footer.querySelector(".footer-logo"); // <- add this class to FooterLogo wrapper

      // INITIAL STATES
      gsap.set(horizontalLines, { width: 0 });
      gsap.set(verticalLines, { height: 0 });
      gsap.set(logo, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: "top 85%", // adjust if needed
        },
      });

      // 1️⃣ HORIZONTAL LINES (start first, together)
      tl.to(horizontalLines, {
        width: "100%",
        duration: 2,
        ease: "power4.out",
        stagger: 0, // all together
      });

      // 2️⃣ VERTICAL LINES (start halfway through horizontals)
      tl.to(
        verticalLines,
        {
          height: "100%",
          duration: 1.2,
          ease: "power2.out",
        },
        "-=1.2" // halfway overlap
      );

      // 3️⃣ LOGO (fade in, synced with vertical lines)
      tl.to(
        logo,
        {
          opacity: 1,
          y: 30,
          duration: 1.2,
          ease: "power2.out",
        },
        "-=1.2"
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const lines = footer.querySelectorAll(".footer-line, .footer-line-top");
    if (!lines.length) return;

    gsap.fromTo(
      lines,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: footer,
          start: "top 90%",
        },
      }
    );
  }, []);

  return (
    <section className="px-[0.9375rem] md:px-6 mt-15 lg:mt-20">
      <footer ref={footerRef} className="w-full pb-2 lg:mb-15">
        {/* MAIN DESKTOP FOOTER */}
        <div className="hidden lg:block w-full">
          {/* ------------------------------ */}
          {/* 1) FIRST ROW WRAPPER + TOP LINE */}
          {/* ------------------------------ */}
          <div className="relative w-full mt-1">
            {/* HORIZONTAL LINE 1 (TOP) */}
            <div className="footer-line-horizontal footer-line-1 absolute top-0 left-0 h-[1px] w-full bg-[#C7C7C7]" />

            {/* FIRST ROW CONTENT */}
            <div className="flex md:justify-between lg:justify-normal ">
              {/* LEFT COLUMN */}
              <div className="md:w-[28%] lg:w-[20%]">
                <div className=" mt-2 mb-12">
                  {data.footer_links.map((item, index) => (
                    <div
                      key={index}
                      className="font-serif md:text-[37px] lg:text-[2.625rem] leading-tight"
                    >
                      <FooterLink
                        field={item.page_link}
                        arrowSpan={"self-end"}
                        menu
                      >
                        {item.page_name}
                      </FooterLink>
                    </div>
                  ))}
                </div>
              </div>

              {/* MIDDLE COLUMN (WITH VERTICAL LINES) */}
              <div className="relative md:w-[33%] flex flex-col  font-barlow lg:w-[30%]">
                {/* VERTICAL LINE 1 */}
                <div className="footer-line-vertical footer-vert-1 absolute top-0 left-0 w-[1px] h-full bg-[#C7C7C7]" />

                {/* VERTICAL LINE 2 */}
                <div className="footer-line-vertical footer-vert-2 absolute top-0 right-0 w-[1px] h-full bg-[#C7C7C7]" />

                <div className="flex flex-row gap-10 h-[50%] mt-4 ">
                  <div className="flex flex-col  pl-15">
                    <div className="uppercase tracking-[0.2rem] font-medium text-sm mb-1.5">
                      <FooterLink
                        field={data.page_link_1}
                        arrowSpan={"self-center"}
                        arrowClassName={"w-[0.8em]"}
                      >
                        {data.page_title_1}
                      </FooterLink>
                    </div>
                    {data.page_sublinks.map((item, index) => (
                      <div key={index} className="text-[#8E8E8E] text-sm">
                        <FooterLink
                          field={item.link}
                          arrowSpan={"self-center"}
                          arrowClassName={"w-[0.7em]"}
                        >
                          {item.link_text}
                        </FooterLink>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col  px-10">
                    <div className="uppercase tracking-[0.2rem] font-medium text-sm mb-1.5">
                      <FooterLink
                        field={data.page_link_2}
                        arrowSpan={"self-center"}
                        arrowClassName={"w-[0.7em]"}
                      >
                        {data.page_title_2}
                      </FooterLink>
                    </div>
                    {data.page_sublinks_2.map((item, index) => (
                      <div key={index} className="text-[#8E8E8E] text-sm">
                        <FooterLink
                          field={item.link}
                          arrowSpan={"self-center"}
                          arrowClassName={"w-[0.7em]"}
                        >
                          {item.link_text}
                        </FooterLink>
                      </div>
                    ))}
                  </div>
                </div>

                <div className=" flex flex-row ">
                  <div className="flex flex-col px-15 font-barlow uppercase tracking-[0.2rem] font-medium text-sm ">
                    {data.page_links.map((item, index) => (
                      <div key={index}>
                        <FooterLink
                          field={item.page_link}
                          arrowSpan={"self-center"}
                          arrowClassName={"w-[0.7em]"}
                        >
                          {item.page_title}
                        </FooterLink>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="md:w-[34%] flex flex-1 font-barlow ">
                <div className="mt-4 w-full">
                  <div className="lg:px-16.5">
                    <div className="uppercase tracking-[0.2rem] font-medium text-sm mb-1.5">
                      <PrismicRichText field={data.address_heading} />
                    </div>
                    <div className="text-sm text-black font-medium leading-3.5 mb-1 lg:w-[45%]">
                      <PrismicRichText field={data.address} />
                    </div>
                    <div className="text-sm text-[#8E8E8E] font-medium mt-3">
                      <FooterLink
                        field={data.direction}
                        arrowSpan={"self-center"}
                        arrowClassName={"w-[0.8em]"}
                      >
                        {data.direction_text}
                      </FooterLink>
                    </div>

                    <div className="flex flex-col gap-1.5 mt-8">
                      <div className="uppercase tracking-[0.2rem] font-medium text-sm">
                        <PrismicRichText field={data.heading_for_directions} />
                      </div>
                      <div className="flex gap-7 flex-row">
                        {data.directions.map((item, index) => (
                          <div key={index} className="flex gap-0.5">
                            <span className="text-sm text-[#8E8E8E] font-medium">
                              {item.place}
                            </span>
                            <div className="text-sm text-[#5B5B5B] font-medium">
                              <FooterLink field={item.distance_link} noArrow>
                                {item.distance}
                              </FooterLink>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:mt-14.5 md:mt-13 lg:mb-4">
                      <div className="uppercase tracking-[0.2rem] font-medium text-sm mb-1.5">
                        <PrismicRichText field={data.contacts} />
                      </div>
                      <div className="flex md:flex-wrap text-sm text-[#8E8E8E] md:gap-5 lg:gap-10 font-medium">
                        {data.contacts_list.map((item, index) => (
                          <div key={index}>
                            <FooterLink
                              field={
                                item.method === "Telephone" ||
                                item.method === "Mail"
                                  ? item.link_text
                                  : item.link
                              }
                              arrowSpan={"self-center"}
                              arrowClassName={"w-0"}
                              method={item.method}
                              noArrow
                            >
                              {item.link_text}
                            </FooterLink>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECOND ROW + MIDDLE LINE */}
          <div className="relative w-full mt-[0.15px] ">
            <div className="footer-line-horizontal footer-line-2 absolute top-0 left-0 h-[1px] w-full bg-[#C7C7C7]" />

            <div className="flex items-center font-barlow py-3">
              <div className="md:w-[28%] lg:w-[20%] flex items-center gap-3 text-[#A9A9A9]">
                <RatingStars rating={data.rating} starClassName="xl:w-6 xl:h-7 md:w-4 md:h-6 " />
                <div className="flex items-center md:text-xs lg:text-sm gap-1 font-barlow mt-1">
                  <PrismicRichText field={data.review_count} />
                  <span className="text-[15px]">reviews</span>
                </div>
              </div>

              <div className="flex md:w-[33%] lg:w-[30%] justify-evenly font-medium text-sm">
                {data.follow_links.map((item, index) => (
                  <div key={index}>
                    <FooterLink
                      field={item.link}
                      arrowSpan={"self-center"}
                      arrowClassName={"w-[0.7em]"}
                    >
                      {item.link_text}
                    </FooterLink>
                  </div>
                ))}
              </div>

              <div className="md:w-auto lg:pl-17">
                <div className="flex gap-5 font-medium text-sm">
                  {data.booking_sites.map((item, index) => (
                    <FooterLink
                      key={index}
                      field={item.link}
                      arrowSpan={"self-center"}
                      arrowClassName={"w-[0.7em] h-[0.6em]"}
                    >
                      {item.link_text}
                    </FooterLink>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* THIRD ROW + LOGO LINE */}
          <div className="relative w-full mt-[2px] ">
            <div className="footer-line-horizontal footer-line-3 absolute top-0 left-0 h-[1px] w-full bg-[#C7C7C7] " />

            <div className="footer-logo ">
              <FooterLogo />
            </div>
          </div>
        </div>
        {/* M */}
        {/* O */}
        {/* B */}
        {/* I */}
        {/* L */}
        {/* E */}
        {/*   */}
        {/* H */}
        {/* E */}
        {/* R */}
        {/* E */}
        {/* ----- Mobile Version ------ */}

        <div className="lg:hidden font-barlow flex flex-col">
          {/* First Row */}
          <div className="flex flex-col items-center lg:hidden relative py-6">
            <div className="footer-line-top" /> {/* line */}
            <div className="uppercase text-xs font-medium tracking-widest">
              <PrismicRichText field={data.menu} />
            </div>
            <div className="font-serif text-[28px] font-medium">
              {/* Row 1 */}
              <div className="flex flex-wrap gap-7 justify-center max-w-[600px] mx-auto">
                {data.footer_links.slice(0, 3).map((item, index) => (
                  <div key={index} className="text-center">
                    <PrismicNextLink field={item.page_link}>
                      {item.page_name}
                    </PrismicNextLink>
                  </div>
                ))}
              </div>

              {/* Row 2 */}
              <div className="flex flex-wrap gap-7 justify-center">
                {data.footer_links.slice(3).map((item, index) => (
                  <div key={index} className="text-center">
                    <PrismicNextLink field={item.page_link}>
                      {item.page_name}
                    </PrismicNextLink>
                  </div>
                ))}
              </div>
            </div>
            <div className="footer-line" /> {/* line */}
          </div>

          {/* Second Row */}
          <div className="flex lg:hidden relative py-6 px-2">
            <div className="footer-line" /> {/* line */}
            <div className="flex flex-col flex-4 gap-1">
              <div className="font-medium uppercase text-xs tracking-widest">
                <PrismicNextLink field={data.page_link_1}>
                  {data.page_title_1}
                </PrismicNextLink>
              </div>
              <div className="flex flex-col gap-0.5">
                {data.page_sublinks.map((item, index) => (
                  <div
                    key={index}
                    className="font-medium text-xs text-[#8E8E8E]"
                  >
                    <PrismicNextLink field={item.link}>
                      {item.link_text}
                    </PrismicNextLink>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-3">
              <div className="font-medium uppercase text-xs tracking-widest">
                <PrismicNextLink field={data.page_link_2}>
                  {data.page_title_2}
                </PrismicNextLink>
              </div>
              <div className="flex flex-col gap-0.5">
                {data.page_sublinks_2.map((item, index) => (
                  <div
                    key={index}
                    className="font-medium text-xs text-[#8E8E8E]"
                  >
                    <PrismicNextLink field={item.link}>
                      {item.link_text}
                    </PrismicNextLink>
                  </div>
                ))}
              </div>
            </div>
            <div className="footer-line" /> {/* line */}
          </div>

          {/* Third Row */}
          <div className="flex flex-row relative px-2 py-6">
            <div className="footer-line" /> {/* line */}
            <div className="w-[50%] flex-4 sm:w-[40%]">
              <div className="font-medium uppercase text-xs tracking-widest mb-1.5">
                <PrismicRichText field={data.address_heading} />
              </div>
              <div className="font-medium text-xs text-[#8E8E8E] w-[50%]">
                <PrismicRichText field={data.address} />
              </div>
              <div className="font-medium text-sm underline underline-offset-2 text-black mt-2">
                <PrismicNextLink field={data.direction}>
                  {data.direction_text}
                </PrismicNextLink>
              </div>
            </div>
            <div className="flex flex-3 flex-col">
              <div className="text-xs tracking-widest uppercase mb-1.5 font-medium">
                <PrismicRichText field={data.heading_for_directions} />
              </div>

              <div className="flex flex-col gap-3">
                {data.directions.map((item, index) => (
                  <div key={index} className="flex text-start gap-0.5">
                    <span className="text-xs text-[#8E8E8E] font-medium">
                      {item.place}
                    </span>
                    <div className="text-xs text-[#5B5B5B] font-medium underline underline-offset-2">
                      <FooterLinkMobile field={item.distance_link}>
                        {item.distance}
                      </FooterLinkMobile>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="footer-line" /> {/* line */}
          </div>

          {/* Fourth Row */}
          <div className="flex flex-col relative px-2 py-6 gap-1">
            <div className="footer-line" /> {/* line */}
            <div className="font-medium uppercase text-xs tracking-widest">
              <PrismicRichText field={data.contacts} />
            </div>
            <div className="flex text-xs text-[#5B5B5B] font-medium justify-between">
              {data.contacts_list.map((item, index) => (
                <div key={index}>
                  <div className="text-black underline underline-offset-2">
                    <FooterLinkMobile
                      field={
                        item.method === "Telephone" || item.method === "Mail"
                          ? item.link_text
                          : item.link
                      }
                      method={item.method}
                    >
                      {item.link_text}
                    </FooterLinkMobile>
                  </div>
                </div>
              ))}
            </div>
            <div className="footer-line" /> {/* line */}
          </div>

          {/* Fifth Row */}
          <div className="flex flex-col gap-3 justify-between w-full relative px-2 py-4.5">
            <div className="footer-line" /> {/* line */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-5 text-xs">
                <RatingStars rating={data.rating} starClassName="w-3 h-4" />
                <div className="text-[#5B5B5B] mt-0.5 flex text-xs gap-1 font-barlow">
                  <PrismicRichText field={data.review_count} />
                  <span> reviews</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-5  text-xs">
                {data.booking_sites.map((item, index) => (
                  <div key={index}>
                    <PrismicNextLink field={item.link}>
                      {item.link_text}
                    </PrismicNextLink>
                  </div>
                ))}
             
              </div>
            </div>
            <div className="flex flex-col text-start  text-xs">
              {data.follow_links.map((item, index) => (
                <div key={index}>
                  <PrismicNextLink field={item.link}>
                    {item.link_text}
                  </PrismicNextLink>
                </div>
              ))}
              
            </div>
            <div className="footer-line" /> {/* line */}
          </div>

          {/* Sixth Row */}
          <div className="w-full mt-2 relative">
            <FooterLogo />
          </div>
        </div>
      </footer>
    </section>
  );
}
