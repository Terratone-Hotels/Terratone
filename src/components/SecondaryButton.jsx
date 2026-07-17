"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import clsx from "clsx";
import { PrismicNextLink } from "@prismicio/next";
import { isFilled } from "@prismicio/client";

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

export default function SecondaryButton({
  field,
  children,
  className = "",
  showArrow = true,
  noBorder = false,
  buttonClass,
}) {
  const buttonRef = useRef(null);
  const textSpanRef = useRef(null);
  const arrowSpanRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      tl.to(buttonRef.current, {
        backgroundColor: "#e4a3a2",
        borderColor: "#e4a3a2",
        duration: 0.3,
        ease: "power2.out",
      })
        .to(
          textSpanRef.current,
          { x: -4, color: "#000000", duration: 0.3, ease: "power2.out" },
          "<"
        )
        .to(
          arrowSpanRef.current,
          { x: 4, color: "#000000", duration: 0.3, ease: "power2.out" },
          "<"
        );

      const button = buttonRef.current;
      if (!button) return;

      const onMouseEnter = () => tl.play();
      const onMouseLeave = () => tl.reverse();
      const onTouchStart = () => tl.play();
      const onTouchEnd = () => tl.reverse();
      const onClickReset = () => tl.reverse();

      button.addEventListener("mouseenter", onMouseEnter);
      button.addEventListener("mouseleave", onMouseLeave);
      button.addEventListener("touchstart", onTouchStart, { passive: true });
      button.addEventListener("touchend", onTouchEnd, { passive: true });
      button.addEventListener("click", onClickReset);

      return () => {
        button.removeEventListener("mouseenter", onMouseEnter);
        button.removeEventListener("mouseleave", onMouseLeave);
        button.removeEventListener("touchstart", onTouchStart);
        button.removeEventListener("touchend", onTouchEnd);
        button.removeEventListener("click", onClickReset);
      };
    }, buttonRef);

    return () => ctx.revert();
  }, []);

  // Don't render if the Prismic link field is empty
  if (!isFilled.link(field)) return null;

  return (
    <PrismicNextLink
      field={field}
      ref={buttonRef}
      className={clsx(
        "group cursor-pointer inline-grid font-medium uppercase bg-transparent",
        buttonClass,
        !noBorder && "border border-white",
        "grid-cols-[auto_auto]"
      )}
      style={{ alignItems: "stretch" }}
    >
      {/* Text span */}
      <span
        ref={textSpanRef}
        className={clsx(
          "flex items-center justify-center font-barlowNormal text-xs lg:text-sm text-white",
          className
        )}
      >
        {children || field.text}
      </span>

      {/* Arrow span */}
      <span
        ref={arrowSpanRef}
        className={clsx("flex justify-center items-center text-white", className)}
      >
        {showArrow && <ArrowIcon className="w-[0.688rem] h-full" />}
      </span>
    </PrismicNextLink>
  );
}