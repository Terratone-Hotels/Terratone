"use client";

import { useState } from "react";
import { PrismicNextLink } from "@prismicio/next";
import TerratoneLogo from "./terratoneLogo"; // Import TerratoneLogo

// --- SVG Definitions (HamburgerIcon and XMarkIcon remain the same) ---

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

export default function MobileMenu({
  navigation,
  buttonLink,
  buttonText,
  setIsMenuOpen,
  isOpen,
}) {
  const toggleMenu = () => setIsMenuOpen(!isOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // When the menu is CLOSED, only render the hamburger icon.
  if (!isOpen) {
    return (
      <button
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        className="focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black p-1 md:hidden z-50"
      >
        <HamburgerIcon className="h-3.5 w-9 text-white" aria-hidden="true" />
      </button>
    );
  }

  // When the menu is OPEN, render the white overlay and its contents.
  return (
    <>
      <div
        id="mobile-menu"
        className="fixed left-0 w-full top-0 h-[50vh] sm:h-[60vh] z-40 bg-white shadow-xl overflow-y-auto pt-2"
      >
        {/* Open Menu Header Bar: Logo | Button | Close Icon */}
        <div className="flex flex-row items-center justify-between pr-5 sm:pl-5 sm:pr-10 py-4">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="">
              <TerratoneLogo className="text-black scale-80"/>
            </div>

            {/* 2. Button (Pink BG) */}
            {buttonLink && (
              <button className=" flex mr-2  sm:mr-4 px-3 bg-terra-pink border border-terra-pink py-1.5">
                <PrismicNextLink
                  field={buttonLink}
                  // New: Pink background styling
                  className=" text-black uppercase  text-xs font-barlowNormal"
                >
                  {buttonText}
                </PrismicNextLink>
              </button>
            )}
          </div>

          {/* 3. Close Icon (Black) */}
          <button
            onClick={closeMenu}
            className="focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black p-1"
          >
            <XMarkIcon className="h-5 w-5 text-black" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex flex-col items-start px-4 sm:px-9">
          {/* Navigation Links - Now left-aligned inside the white panel */}
          {navigation.map((item, index) => (
            <PrismicNextLink
              key={index}
              field={item.link}
              onClick={closeMenu}
              className="font-barlowNormal uppercase text-sm font-medium text-black hover:text-gray-600 transition-colors py-2"
            >
              {item.link_lable}
            </PrismicNextLink>
          ))}
        </nav>
      </div>
    </>
  );
}
