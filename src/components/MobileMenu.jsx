"use client";

import { PrismicNextLink } from "@prismicio/next";
import TerratoneLogo from "@/components/terratoneLogo"; // adjust path if needed
import { useEffect } from "react";

const ArrowIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 10"
    className={className}
    fill="currentColor"
  >
    <path d="M6.62604 10L5.66394 9.04609L9.00456 5.69668H0.612915V4.30332H9.00456L5.66394 0.959272L6.62604 0L11.6129 5L6.62604 10Z" />
  </svg>
);

export default function MobileMenu({
  navigation,
  sublink,
  enquireNow,
  isOpen,
  setIsMenuOpen,
  onEnquireClick,
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
                className={`font-barlowNormal uppercase sm:text-3xl text-2xl font-medium text-black hover:text-gray-600 transition-colors py-2 border-b border-black mb-2 w-full`}
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
      {/*  */}
      <div className="mx-3 mb-3 sm:px-10 mt-auto">
        <button
          onClick={onEnquireClick}
          className="w-full font-barlowNormal uppercase  text-sm font-medium text-white flex items-center gap-0.5"
        >
          <div className="bg-[#222223] py-2 w-full text-lg rounded-sm">
            <span>{enquireNow}</span>
          </div>
          <div className="bg-[#222223] px-2.5 self-stretch flex rounded-sm">
            <span className="self-center">
              <ArrowIcon className="w-4 h-4" />
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
