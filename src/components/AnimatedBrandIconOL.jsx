import { useEffect } from "react";
import gsap from "gsap";

export default function BrandIconAuto({ className = "" }) {
  useEffect(() => {
    gsap.set(".auto-line-1", { rotation: 0, transformOrigin: "center center" });
    gsap.set(".auto-line-2", { rotation: 0, transformOrigin: "center center" });

    gsap.to(".auto-line-1", {
      rotation: 36,
      duration: 0.9,
      ease: "power2.out",
    });

    gsap.to(".auto-line-2", {
      rotation: 36,
      duration: 0.9,
      ease: "power2.out",
    });
  }, []);

  return (
    <div
      className={`relative flex items-center justify-center gap-[45px] w-[110px] h-[110px] ${className}`}
    >
      <div className="auto-line-1 bg-neutral-800 w-[20px] h-[160px] " />
      <div className="auto-line-2 bg-neutral-800 w-[20px] h-[160px] " />
    </div>
  );
}
