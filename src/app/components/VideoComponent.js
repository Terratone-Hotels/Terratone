import React from "react";

export default function VideoComponent({ srcMp4, srcWebm, className }) {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      className={className || "hero-video"}
    >
      {srcWebm && <source src={srcWebm} type="video/webm" />}
      {srcMp4 && <source src={srcMp4} type="video/mp4" />}
      Your browser does not support the video tag.
    </video>
  );
}
