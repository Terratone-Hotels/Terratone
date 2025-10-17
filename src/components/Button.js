"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import clsx from "clsx";

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

export default function Button({
  children,
  className = "",
  showArrow = true,
  noBorder = false,
}) {
  // ✅ Create refs for the elements we need to animate
  const buttonRef = useRef(null);
  const textSpanRef = useRef(null);
  const arrowSpanRef = useRef(null);

  useEffect(() => {
    // ✅ Use GSAP context for safe cleanup in React
    const ctx = gsap.context(() => {
      // Create a single, pausable timeline for the hover effect
      const tl = gsap.timeline({ paused: true });

      // Add animations to the timeline
      tl.to(textSpanRef.current, {
        x: -4, // Equivalent to -0.25rem
        backgroundColor: "#e4a3a2",
        duration: 0.3,
        ease: "power2.out",
      })
        .to(
          arrowSpanRef.current,
          {
            x: 4, // Equivalent to 0.25rem
            backgroundColor: "#e4a3a2",
            duration: 0.3,
            ease: "power2.out",
          },
          "<" // Starts this animation at the same time as the previous one
        )
        .to(
          buttonRef.current,
          {
            borderColor: "transparent",
            duration: 0.3,
            ease: "power2.out",
          },
          "<" // Starts this animation at the same time as the previous one
        );

      // Event handlers to play and reverse the timeline
      const onMouseEnter = () => tl.play();
      const onMouseLeave = () => tl.reverse();

      const button = buttonRef.current;
      button.addEventListener("mouseenter", onMouseEnter);
      button.addEventListener("mouseleave", onMouseLeave);

      // Cleanup function
      return () => {
        button.removeEventListener("mouseenter", onMouseEnter);
        button.removeEventListener("mouseleave", onMouseLeave);
      };
    }, buttonRef); // Scope the context to the button element

    return () => ctx.revert(); // Cleanup GSAP animations
  }, []);

  return (
    <button
      ref={buttonRef}
      className={clsx(
        "group inline-flex font-medium uppercase",
        !noBorder && "border border-black"
      )}
    >
      {/* Text span */}
      <span
        ref={textSpanRef}
        className={clsx(
          "flex items-center justify-center font-barlowNormal text-xs lg:text-sm text-black",
          className
          // ✅ Removed transition classes
        )}
      >
        {children}
      </span>

      {/* Arrow span */}
      <span
        ref={arrowSpanRef}
        className={clsx(
          "flex items-center justify-center text-black",
          className
          // ✅ Removed transition classes
        )}
      >
        {showArrow && <ArrowIcon className="w-[0.688rem] h-[0.625rem]" />}
      </span>

      {/* ✅ The <style jsx> block has been removed */}
    </button>
  );
}
