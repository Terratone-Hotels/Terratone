"use client";

import { PrismicNextLink } from "@prismicio/next";
import TerratoneLogo from "@/components/terratoneLogo"; // adjust path if needed
import { useEffect } from "react";

// XMark SVG
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
  sublink,
  isOpen,
  setIsMenuOpen,
}) {
  const closeMenu = () => setIsMenuOpen(false);

  // Prevent scroll behind open menu (optional UX touch)
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  return (
    <div
      className={`fixed top-0 left-0 w-full flex flex-col items- bg-stone z-40 shadow-md transition-all duration-500 ease-in-out overflow-hidden ${
        isOpen ? "h-screen opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      {/* Header Bar: Logo + Close */}
      <div className="flex items-center justify-start  py-3 pr-3 ">
        <button
          onClick={closeMenu}
          className="focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black p-1"
          aria-label="Close menu"
        >
          {/* Your close icon would go here */}
        </button>
      </div>

      {/* Wrapper to allow main nav to grow and push sublinks down */}
      <div className="">
        {/* Navigation Links */}
        <nav className="flex flex-col items-start px-6 py-4 sm:px-10">
          {navigation.map((item, index) => {
            return (
              <PrismicNextLink
                key={index}
                field={item.link}
                onClick={closeMenu}
                // Combine the existing styling with the new conditional classes
                className={`font-barlowNormal uppercase text-3xl font-medium text-black hover:text-gray-600 transition-colors py-2 border-b border-black mb-2 w-full`}
              >
                {item.link_lable}
              </PrismicNextLink>
            );
          })}
        </nav>
      </div>

      {/* SubLink (This will now be at the bottom) */}
      <nav className="flex flex-col px-6 py-4 sm:px-10">
        {sublink.map((item, index) => {
          return (
            <PrismicNextLink
              key={index}
              field={item.link}
              onClick={closeMenu}
              // Combine the existing styling with the new conditional classes
              className={`font-barlowNormal uppercase text-base font-medium text-black hover:text-gray-600 transition-colors py-2 border-b border-gray-200 mb-2 w-full`}
            >
              {item.link_label}
            </PrismicNextLink>
          );
        })}
      </nav>
    </div>
  );
}
