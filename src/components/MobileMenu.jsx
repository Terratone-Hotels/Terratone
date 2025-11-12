"use client";

import { useState } from "react";
import { PrismicNextLink } from "@prismicio/next";
import TerratoneLogo from "@/components/terratoneLogo"; // Import TerratoneLogo
import Button from "@/components/Button";

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
      <div className="flex flex-row lg:hidden ">
        <div className="mr-5 sm:mr-7">
          <Button
            noBorder
            className=" px-1.5 py-1.5 text-[11px] bg-white  lg:hidden"
          >
            Book stay
          </Button>
        </div>

        <div className="sm:mr-8">
          <button
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black pr-3 lg:hidden z-50"
          >
            <HamburgerIcon className="h-3 w-8 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }

  // When the menu is OPEN, render the white overlay and its contents.
  return (
    <>
      <div
        id="mobile-menu"
        className="fixed left-0 w-full top-0 h-[60vh] sm:h-[60vh] z-40 bg-white shadow-xl overflow-y-auto pt-2"
      >
        {/* Open Menu Header Bar: Logo | Button | Close Icon */}
        <div className="flex flex-row items-center justify-between pr-5  py-4 mt-1">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="sm:ml-8">
              <TerratoneLogo className="text-black scale-79 sm:scale-84" />
            </div>

            {/* 2. Button (Pink BG) */}
            <div className="mr-4 sm:mr-7">
              {buttonLink && (
                <Button
                  noBorder
                  className="px-1.5 py-1.5 text-[11px] bg-terra-pink "
                >
                  <PrismicNextLink
                    field={buttonLink}
                    // New: Pink background styling
                  >
                    {buttonText}
                  </PrismicNextLink>
                </Button>
              )}
            </div>
          </div>

          {/* 3. Close Icon (Black) */}
          <div className="sm:mr-6.5">
            <button
              onClick={closeMenu}
              className="focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black p-1"
            >
              <XMarkIcon className="h-5 w-5 text-black" aria-hidden="true" />
            </button>
          </div>
        </div>

        <nav className="flex flex-col items-start px-4 sm:px-10">
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
