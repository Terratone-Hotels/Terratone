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
        <div className=" w-full">
          {/* First Row */}
          <div className="flex border-t border-b  border-[#C7C7C7] ">
            {/* First Column */}
            <div className="w-[20%] h-full">
              <div className="mb-12 pt-5 ">
                <div className="font-barlow uppercase tracking-widest font-medium text-sm">
                  <PrismicRichText field={data.menu} />
                </div>
                <div>
                  {data.footer_links.map((item, index) => (
                    <div
                      key={index}
                      className="font-serif font-medium text-[42px] leading-12"
                    >
                      <FooterLink field={item.page_link} arrowSpan={"self-end"}>
                        {item.page_name}
                      </FooterLink>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex border-t text-sm font-barlow border-[#C7C7C7] py-[11px] text-[#A9A9A9] gap-3">
                <div>
                  <RatingStars rating={data.rating} />
                </div>
                <div className="flex gap-1">
                  <PrismicRichText field={data.review_count} />{" "}
                  <span>reviews</span>
                </div>
              </div>
            </div>
            {/* Second Column */}
            <div className=" w-[30%] flex flex-col  font-barlow  ">
              <div className="flex justify-evenly pt-5 h-full border-x  border-[#C7C7C7]">
                <div>
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
                <div>
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
                <div className="font-barlow uppercase tracking-[0.2rem] font-medium text-sm">
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

              <div className=" flex justify-evenly text-sm gap-5 w-full font-medium  border-t border-[#c7c7c7] py-3 ">
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
            {/* Third COlumn */}
            <div className=" w-[50%] flex flex-col font-barlow">
              {/* Padding Div */}
              <div className="flex flex-col  pt-5 border-b border-[#c7c7c7] h-full w-full">
                {/* Location blow */}
                <div className="lg:pl-17">
                  <div>
                    <div className="uppercase tracking-[0.2rem] font-medium text-sm mb-1.5">
                      <PrismicRichText field={data.address_heading} />
                    </div>
                    <div className="text-sm text-[#8E8E8E] font-medium leading-3.5 mb-1 w-[45%]">
                      <PrismicRichText field={data.address} />
                    </div>
                    <div className="text-sm text-[#8E8E8E] font-medium  mb-3">
                      <FooterLink
                        field={data.direction}
                        arrowSpan={"self-center"}
                        arrowClassName={"w-[0.7em]"}
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
                <div className="lg:mt-14.5 lg:pl-17">
                  <div className="uppercase tracking-[0.2rem] font-medium text-sm mb-1.5">
                    <PrismicRichText field={data.contacts} />
                  </div>
                  <div className="flex  text-sm text-[#8E8E8E] lg:gap-10 font-medium">
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
              <div className="pl-17 py-3 border-t-[#c7c7c7] ">
                <div className="flex gap-5 font-medium text-sm">
                  {data.booking_sites.map((item, index) => (
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
            </div>
          </div>
          {/* Second Row */}
          {/* <div className="flex justify-between font-barlow py-2 border-b border-[#C7C7C7]">
            <div className="flex gap-4">
              <div>
                <RatingStars rating={data.rating} />
              </div>
              <div className="flex gap-1">
                <PrismicRichText field={data.review_count} />{" "}
                <span>reviews</span>
              </div>
            </div>
            <div className="flex">
              {data.follow_links.map((item, index) => (
                <div key={index}>
                  <FooterLink field={item.link}>
                    {item.link_text}
                  </FooterLink>
                </div>
              ))}
            </div>
            <div className="flex">
              {data.booking_sites.map((item, index) => (
                <div key={index}>
                  <FooterLink field={item.link}>
                    {item.link_text}
                  </FooterLink>
                </div>
              ))}
            </div>
          </div> */}
          <div className="w-full">
            <FooterLogo />
          </div>
        </div>
      </footer>
    </Bounded>
  );
}
