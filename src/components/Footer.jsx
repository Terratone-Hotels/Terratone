"use client";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import RatingStars from "@/components/RatingStars";
import FooterLogo from "./FooterLogo";
import FooterLink from "./FooterLink";

export default function Footer({ footerData }) {
  const data = footerData.data;
  return (
    <Bounded>
      <footer className="w-full">
        {/* Main div */}
        <div className="hidden lg:block w-full">
          {/* First Row */}
          <div className="flex md:justify-between lg:justify-normal border-t border-b  border-[#C7C7C7] ">
            {/* First Column */}
            <div className="md:w-[28%] lg:w-[20%] h-full">
              <div className="mb-12 pt-5 ">
                <div className="font-barlow uppercase tracking-widest font-medium text-sm">
                  <PrismicRichText field={data.menu} />
                </div>
                <div>
                  {data.footer_links.map((item, index) => (
                    <div
                      key={index}
                      className="font-serif md:text-[37px] lg:text-[2.625rem]  leading-tight"
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
            </div>
            {/* Second Column */}
            <div className="md:w-[33%] lg:w-[30%] h-auto flex flex-col  font-barlow  ">
              <div className="grid grid-cols-2  pt-5 h-full border-x  border-[#C7C7C7]">
                <div className="flex flex-col justify-self-center">
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
                <div className="flex flex-col justify-self-center">
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
                <div className=" flex flex-col justify-self-center  font-barlow uppercase tracking-[0.2rem] font-medium text-sm">
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
            {/* Third COlumn */}
            <div className=" md:w-[34%] flex flex-1 font-barlow">
              {/* Padding Div */}
              <div className="flex flex-col  pt-5 pl-8 h-full w-full">
                {/* Location blow */}
                <div className="lg:pl-17">
                  <div>
                    <div className="uppercase tracking-[0.2rem] font-medium text-sm mb-1.5">
                      <PrismicRichText field={data.address_heading} />
                    </div>
                    <div className="text-sm text-[#8E8E8E] font-medium leading-3.5 mb-1 lg:w-[45%]">
                      <PrismicRichText field={data.address} />
                    </div>
                    <div className="text-sm text-[#8E8E8E] font-medium  mb-3">
                      <FooterLink
                        field={data.direction}
                        arrowSpan={"self-center"}
                        arrowClassName={"w-[0.8em]"}
                      >
                        {data.direction_text}
                      </FooterLink>
                    </div>
                  </div>
                  <div className="flex gap-7">
                    {data.directions.map((item, index) => (
                      <div key={index} className="flex gap-0.5">
                        <span className="text-sm text-[#8E8E8E] font-medium ">
                          {" "}
                          {item.place}
                        </span>
                        <span className="underline text-sm text-[#5B5B5B] font-medium">
                          {item.distance}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Contacts below */}
                <div className="lg:mt-14.5 md:mt-13 lg:pl-17">
                  <div className="uppercase tracking-[0.2rem] font-medium text-sm mb-1.5">
                    <PrismicRichText field={data.contacts} />
                  </div>
                  <div className="flex md:flex-wrap text-sm text-[#8E8E8E] md:gap-5 lg:gap-10 font-medium">
                    {data.contacts_list.map((item, index) => (
                      <div key={index}>
                        <div>
                          <PrismicRichText field={item.type} />
                        </div>
                        <div>
                          <FooterLink
                            field={item.link}
                            arrowSpan={"self-center"}
                            arrowClassName={"w-[0.7em]"}
                          >
                            {item.link_text}
                          </FooterLink>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Second Row */}
          <div className="flex  items-center font-barlow py-3 border-b border-[#C7C7C7] mb-3">
            {/* First col */}
            <div className=" md:w-[28%] lg:w-[20%] flex flex-col items-start xl:flex-row xl:items-center  text-[#A9A9A9] md:gap-1 lg:gap-3  ">
              <div>
                <RatingStars rating={data.rating} starClassName="w-6 h-6" />
              </div>
              <div className=" flex  items-center justify-center md:text-xs lg:text-sm font-barlow mt-1">
                <PrismicRichText field={data.review_count} />{" "}
                <span>reviews</span>
              </div>
            </div>
            {/* second col */}
            <div className="flex lg:flex-none md:w-[33%] lg:w-[30%]">
              <div className=" flex justify-evenly lg:flex-row  md:text-[13px]   lg:text-sm  w-full font-medium ">
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
            </div>
            {/* third col */}
            <div className="md:w-auto lg:pl-17 ">
              <div className="flex gap-5 font-medium text-sm">
                {data.booking_sites.map((item, index) => (
                  <div key={index}>
                    <FooterLink
                      field={item.link}
                      arrowSpan={"self-center"}
                      arrowClassName={"w-[0.7em] h-[0.6em]"}
                    >
                      {item.link_text}
                    </FooterLink>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Third Row */}
          <div className="w-full">
            <FooterLogo />
          </div>
        </div>

        {/*----- Mobile Version ------*/}
        <div className="lg:hidden font-barlow  border-t border-[#c7c7c7] flex flex-col">
          {/* First Row */}
          <div className="flex flex-col items-center border-b border-[#c7c7c7] py-6">
            <div className="uppercase text-xs font-medium tracking-widest">
              <PrismicRichText field={data.menu} />
            </div>
            <div className="flex font-serif text-[28px] font-medium flex-wrap justify-center">
              {data.footer_links.map((item, index) => (
                <div key={index} className="basis-1/3 text-center">
                  <PrismicNextLink field={item.page_link}>
                    {item.page_name}
                  </PrismicNextLink>
                </div>
              ))}
            </div>
          </div>
          {/* Second Row */}
          <div className="flex border-b border-[#c7c7c7] py-6 px-2 justify-between">
            <div className="flex flex-col gap-1">
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
            <div>
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
            <div className="font-medium uppercase text-xs tracking-widest">
              {data.page_links.map((item, index) => (
                <div key={index}>
                  <PrismicNextLink field={item.page_link}>
                    {item.page_title}
                  </PrismicNextLink>
                </div>
              ))}
            </div>
          </div>
          {/* Third Row */}
          <div className="flex px-2 py-6 border-b border-[#c7c7c7]">
            <div className="w-[50%]">
              <div className="font-medium uppercase text-xs tracking-widest">
                <PrismicRichText field={data.address_heading} />
              </div>
              <div className="font-medium text-xs text-[#8E8E8E] w-[90%]">
                <PrismicRichText field={data.address} />
              </div>
              <div className="font-medium text-sm underline text-black mt-2">
                <PrismicNextLink field={data.direction}>
                  {data.direction_text}
                </PrismicNextLink>
              </div>
            </div>
            <div className="flex w-[50%] mt-4 justify-center gap-2 flex-row">
              {data.directions.map((item, index) => (
                <div key={index} className="flex  gap-0.5">
                  <span className="text-xs text-[#8E8E8E] font-medium ">
                    {" "}
                    {item.place}
                  </span>
                  <span className="underline text-xs text-[#5B5B5B] font-medium">
                    {item.distance}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Fourth Row */}
          <div className="flex flex-col px-2 py-6 border-b border-[#c7c7c7] gap-1">
            <div className="font-medium uppercase text-xs tracking-widest ">
              <PrismicRichText field={data.contacts} />
            </div>
            <div className="flex text-xs text-[#5B5B5B] font-medium justify-between">
              {data.contacts_list.map((item, index) => (
                <div key={index}>
                  <div>
                    <PrismicRichText field={item.type} />
                  </div>
                  <div className="text-black underline">
                    <PrismicNextLink field={item.link}>
                      {item.link_text}
                    </PrismicNextLink>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Fifth Row */}
          <div className="flex justify-between w-full border-b px-2 py-6 border-[#c7c7c7]">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 text-xs ">
                <div>
                  <RatingStars
                    rating={data.rating}
                    starClassName="w-3 h-4 "
                  />
                </div>
                <div className="text-[#5B5B5B] mt-0.5 flex text-xs font-barlow ">
                  <PrismicRichText field={data.review_count} />{" "}
                  <span>reviews</span>
                </div>
              </div>
              <div className="flex  gap-5 text-xs">
                {data.booking_sites.map((item, index) => (
                  <div key={index}>
                    <PrismicNextLink field={item.link}>
                      {item.link_text}
                    </PrismicNextLink>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className=" flex  flex-col text-center justify-end text-xs">
                {data.follow_links.map((item, index) => (
                  <div key={index}>
                    <PrismicNextLink field={item.link}>
                      {item.link_text}
                    </PrismicNextLink>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Sixth Row */}
          <div className="w-full">
            <FooterLogo />
          </div>
        </div>
      </footer>
    </Bounded>
  );
}
