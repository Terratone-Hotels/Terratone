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
  onClick,
}) {
  // ✅ Create refs for the elements we need to animate
  const buttonRef = useRef(null);
  const textSpanRef = useRef(null);
  const arrowSpanRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      // Hover animation (same as before)
      tl.to(textSpanRef.current, {
        x: -4,
        backgroundColor: "#e4a3a2",
        duration: 0.3,
        ease: "power2.out",
      })
        .to(
          arrowSpanRef.current,
          {
            x: 4,
            backgroundColor: "#e4a3a2",
            duration: 0.3,
            ease: "power2.out",
          },
          "<"
        )
        .to(
          buttonRef.current,
          {
            borderColor: "transparent",
            duration: 0.3,
            ease: "power2.out",
          },
          "<"
        );

      const button = buttonRef.current;

      // DESKTOP
      const onMouseEnter = () => tl.play();
      const onMouseLeave = () => tl.reverse();

      // 🟢 MOBILE — TAP SHOULD DO SAME AS DESKTOP HOVER
      const onTouchStart = () => tl.play(); // play hover animation
      const onTouchEnd = () => tl.reverse(); // reverse animation

      // Prevent hover from staying active after click
      const onClickReset = () => tl.reverse();

      // EVENT LISTENERS
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

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={clsx(
        "group cursor-pointer inline-grid font-medium uppercase",
        !noBorder && "border border-black",
        "grid-cols-[auto_auto]"
      )}
      style={{ alignItems: "stretch" }} // so grid items stretch height-wise
    >
      {/* Text span */}
      <span
        ref={textSpanRef}
        className={clsx(
          "flex items-center justify-center font-barlowNormal text-xs lg:text-sm text-black",
          className
        )}
      >
        {children}
      </span>

      {/* Arrow span */}
      <span
        ref={arrowSpanRef}
        className={clsx(
          "flex justify-center items-center text-black",
          className
        )}
      >
        {showArrow && <ArrowIcon className="w-[0.688rem] h-full" />}
      </span>
    </button>
  );
}
