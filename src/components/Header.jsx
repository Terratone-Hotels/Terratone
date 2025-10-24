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
  const scrollTimeout = useRef(null);

  const data = headerData;

  // 💡 Logo and button colors are always for the DARK header when the menu is CLOSED.
  const logoColor = "text-white";

  // Style to hide elements when the menu is open on mobile
  const hideOnMobileOpen = isMenuOpen ? "invisible lg:visible" : "";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      // Hide header immediately while scrolling
      if (headerRef.current)
        headerRef.current.style.transform = "translateY(-120%)";

      // Clear previous timeout
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      // Show header after 250ms of no scrolling
      scrollTimeout.current = setTimeout(() => {
        if (headerRef.current)
          headerRef.current.style.transform = "translateY(0%)";
      }, 250);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <Bounded
      full
      className={`fixed top-0 left-0 right-0 z-50 w-full ${isMenuOpen ? "bg-transparent" : ""}`}
    >
      <header
        ref={headerRef}
        className="flex flex-row items-center justify-between lg:px-6 py-4 transition-transform duration-300 ease-in-out"
      >
        {/* Left: Site logo - HIDES on mobile when menu is OPEN to avoid overlap */}
        <div
          className={`lg:block ${hideOnMobileOpen} ${logoColor} flex flex-row justify-between sm:ml-8 lg:ml-5`}
        >
          <PrismicNextLink href={"/"} className="inline-block">
            <TerratoneLogo className="scale-79 sm:scale-85 lg:scale-100" />
          </PrismicNextLink>
        </div>

        {/* Middle: Desktop Navigation links */}
        <nav className="hidden lg:block">
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
          {/* Desktop Button */}
          {data.nav_button_link && (
            <div className="hidden lg:block">
              <Button
                noBorder
                field={data.nav_button_link}
                className="bg-white font-barlowNormal text-xs px-2 py-1.5"
              >
                {data.nav_buttonlink_text}
              </Button>
            </div>
          )}

          {/* Mobile Menu Hamburger */}
          <div className={hideOnMobileOpen}>
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

          {/* Full Mobile Menu Overlay */}
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
