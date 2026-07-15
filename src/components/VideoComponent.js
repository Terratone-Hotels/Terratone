"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Muted looping video. Defers network load until near viewport so large
 * homepage MP4s do not compete with LCP / Speed Index on first paint.
 */
export default function VideoComponent({
  srcMp4,
  srcWebm,
  className,
  preload = "none",
}) {
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || shouldLoad) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.01 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    if (!shouldLoad) return;
    const v = videoRef.current;
    if (!v) return;
    v.load();
    const play = v.play();
    if (play?.catch) play.catch(() => {});
  }, [shouldLoad, srcMp4, srcWebm]);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      autoPlay={shouldLoad}
      preload={shouldLoad ? "auto" : preload}
      className={className || "hero-video"}
    >
      {shouldLoad && srcWebm ? (
        <source src={srcWebm} type="video/webm" />
      ) : null}
      {shouldLoad && srcMp4 ? (
        <source src={srcMp4} type="video/mp4" />
      ) : null}
      Your browser does not support the video tag.
    </video>
  );
}
