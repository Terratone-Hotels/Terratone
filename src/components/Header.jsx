"use client";

import { useState } from "react";
import { PrismicNextLink } from "@prismicio/next";
import TerratoneLogo from "./terratoneLogo";
import Bounded from "./Bounded";
import MobileMenu from "./MobileMenu";
import Button from "@/components/Button";

export default function HeaderClient({ headerData }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const data = headerData;

  // 💡 Logo and button colors are always for the DARK header when the menu is CLOSED.
  const logoColor = "text-white";
  const buttonClasses =
    "px-4 py-2 text-white bg-black border border-black rounded-md hover:bg-gray-800 transition-colors text-sm font-semibold";

  // Style to hide elements when the menu is open on mobile
  const hideOnMobileOpen = isMenuOpen ? "invisible md:visible" : "";

  return (
    <Bounded
      full
      className={`absolute top-3 z-50 w-full ${isMenuOpen ? "fixed top-0 bg-transparent" : ""}`}
    >
      <header className="flex flex-row items-center justify-between md:px-6 py-4">
        {/* Left: Site logo - HIDES on mobile when menu is OPEN to avoid overlap */}
        <div
          className={`md:block ${hideOnMobileOpen} ${logoColor} flex flex-row justify-between sm:ml-8 lg:ml-5`}
        >
          <TerratoneLogo className=" scale-79 sm:scale-85 lg:scale-100" />
        </div>

        {/* Middle: Desktop Navigation links */}
        <nav className="hidden md:block">
          {data.navigation && (
            <ul className="flex flex-row gap-6">
              {data.navigation.map((item, index) => (
                <li key={index}>
                  <PrismicNextLink
                    field={item.link}
                    className="font-barlow uppercase text-sm font-medium text-white hover:text-black transition-colors"
                  >
                    {item.link_lable}
                  </PrismicNextLink>
                </li>
              ))}
            </ul>
          )}
        </nav>

        {/* Right: Container for Desktop Button and Mobile Menu components */}
        <div className="flex items-center">
          {/* Desktop Button (Conditionally visible on MD and up) */}
          {data.nav_button_link && (
            <div className="hidden md:block">
              <Button noBorder field={data.nav_button_link} className="bg-white font-barlowNormal text-xs px-2 py-1.5" >{data.nav_buttonlink_text}
              </Button>
            </div>
          )}

          {/* Mobile Menu Component (Only shows the hamburger when closed) */}
          {/* We must wrap the MobileMenu in a div that HIDES its hamburger when the menu is open */}
          <div className={hideOnMobileOpen}>
            {/* This div only holds the HAMBURGER icon and nothing else when closed */}
            {!isMenuOpen && (
              <MobileMenu
                navigation={data.navigation || []}
                buttonLink={data.nav_button_link}
                buttonText={data.nav_buttonlink_text}
                setIsMenuOpen={setIsMenuOpen}
                isOpen={isMenuOpen}
              />
            )}
          </div>

          {/* 💡 The full menu overlay is rendered separately to be outside the header flow */}
          {isMenuOpen && (
            <MobileMenu
              navigation={data.navigation || []}
              buttonLink={data.nav_button_link}
              buttonText={data.nav_buttonlink_text}
              setIsMenuOpen={setIsMenuOpen}
              isOpen={isMenuOpen}
            />
          )}
        </div>
      </header>
    </Bounded>
  );
}
