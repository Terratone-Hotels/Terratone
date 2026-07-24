// components/ScrollTriggerRefresher.js
"use client";
import { useEffect } from "react";

export default function ScrollTriggerRefresher() {
  useEffect(() => {
    let cancelled = false;
    let cleanupImgListeners = () => {};

    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      if (cancelled) return;

      const imgs = Array.from(document.querySelectorAll("img"));
      let loaded = 0;
      const done = () => {
        loaded++;
        if (loaded >= imgs.length) ScrollTrigger.refresh();
      };

      if (!imgs.length) {
        ScrollTrigger.refresh();
      } else {
        imgs.forEach((img) =>
          img.complete ? done() : img.addEventListener("load", done, { once: true }),
        );
        cleanupImgListeners = () =>
          imgs.forEach((img) => img.removeEventListener("load", done));
      }

      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => {
      cancelled = true;
      cleanupImgListeners();
    };
  }, []);
  return null;
}