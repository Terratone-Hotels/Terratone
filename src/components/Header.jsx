"use client";

import { useState, useEffect, useRef } from "react";
import { PrismicNextLink } from "@prismicio/next";
import TerratoneLogo from "./terratoneLogo";
import Bounded from "./Bounded";
import MobileMenu from "./MobileMenu";
import Button from "@/components/Button";

export default function HeaderClient({ headerData }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const buttonRef = useRef(null);
  const scrollTimeout = useRef(null);

  const data = headerData;

  // Style to hide elements when the menu is open on mobile
  const hideOnMobileOpen = isMenuOpen ? "invisible lg:visible" : "";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      // Hide header immediately while scrolling
      if (headerRef.current && buttonRef.current)
        buttonRef.current.style.transform = "translateY(-220%)";
      headerRef.current.style.transform = "translateY(-220%)";

      // Clear previous timeout
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      // Show header after 250ms of no scrolling
      scrollTimeout.current = setTimeout(() => {
        if (headerRef.current && buttonRef.current)
          headerRef.current.style.transform = "translateY(0%)";
        buttonRef.current.style.transform = "translateY(0%)";
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <div className="relative">
      <header
        ref={headerRef}
        className=" fixed top-0 mix-blend-difference  z-50 w-full flex flex-row items-center justify-between  lg:px-6 py-4 transition-transform duration-300 ease-in-out"
      >
        <div className={`   text-white n sm:ml-8 lg:ml-5`}>
          <PrismicNextLink href={"/"} className="inline-block">
            <TerratoneLogo className="scale-79 sm:scale-85 lg:scale-100" />
          </PrismicNextLink>
        </div>

        {/* Middle: Desktop Navigation links */}
        <div className="hidden lg:block absolute left-[36%]  xl:left-[43%]">
          <ul className="flex flex-row  gap-6">
            {data.navigation.map((item, index) => (
              <li key={index}>
                <PrismicNextLink
                  field={item.link}
                  className="font-barlow uppercase text-sm font-medium text-white hover:text-black "
                >
                  {item.link_lable}
                </PrismicNextLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Container for Desktop Button and Mobile Menu components */}
      </header>
      {/* Desktop Button */}
      {data.nav_button_link && (
        <div
          ref={buttonRef}
          className="hidden lg:flex justify-end bg-transparent absolute fixed right-10 top-4 duration-300 z-50"
        >
          <Button
            noBorder
            field={data.nav_button_link}
            className="bg-white font-barlowNormal text-xs px-2 py-1.5"
          >
            {data.nav_buttonlink_text}
          </Button>
        </div>
      )}
    </div>
  );
}
