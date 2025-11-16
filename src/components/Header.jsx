"use client";

import { useState, useEffect, useRef } from "react";
import { PrismicNextLink } from "@prismicio/next";
import TerratoneLogo from "./terratoneLogo";
import Bounded from "./Bounded";
import MobileMenu from "./MobileMenu";
import Button from "@/components/Button";
import BookNowModal from "./BookNow/BookNowModal";
const HamburgerIcon = (props) => (
  <svg
    {...props}
    width="48"
    height="14"
    viewBox="0 0 48 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      x1="0.387695"
      y1="1.06589"
      x2="47.36"
      y2="1.06589"
      stroke="currentColor"
      strokeWidth="1.70084"
    />
    <line
      x1="20.3359"
      y1="12.5764"
      x2="47.3608"
      y2="12.5764"
      stroke="currentColor"
      strokeWidth="1.70084"
    />
  </svg>
);

const XMarkIcon = (props) => (
  <svg
    {...props}
    width="28"
    height="27"
    viewBox="0 0 28 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      x1="2.08864"
      y1="1.02676"
      x2="26.8374"
      y2="25.7755"
      stroke="currentColor"
      strokeWidth="1.70084"
    />
    <line
      x1="0.885968"
      y1="25.7755"
      x2="25.6347"
      y2="1.02676"
      stroke="currentColor"
      strokeWidth="1.70084"
    />
  </svg>
);

export default function HeaderClient({ headerData }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const buttonRef = useRef(null);
  const scrollTimeout = useRef(null);
  const [open, setOpen] = useState(false);
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
        <div className={`   text-white`}>
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
                  className="font-barlow uppercase text-sm font-medium text-white  "
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
          className="flex justify-end bg-transparent cursor-pointer absolute fixed right-6 top-4 duration-300 z-50"
        >
          <Button
            noBorder
            field={data.nav_button_link}
            className={`
  ${isMenuOpen ? "!bg-terra-pink" : "bg-white"}
  font-barlowNormal text-xs px-2 py-1.5
cursor-pointer`}
            onClick={() => setOpen(true)}
          >
            {data.nav_buttonlink_text}
          </Button>
          <BookNowModal isOpen={open} onClose={() => setOpen(false)} />
          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="lg:hidden block ml-4 mt-1"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-3 w-8 text-black" aria-hidden="true" />
            ) : (
              <HamburgerIcon
                className="h-3 w-8 text-white"
                aria-hidden="true"
              />
            )}
          </button>
        </div>
      )}
      <MobileMenu
        navigation={data.navigation}
        isOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        className="z-60"
      />
    </div>
  );
}
