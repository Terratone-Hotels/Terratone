"use client";

import { useEffect, useRef } from "react";
import { useEasterEggStore } from "@/store/easterEggStore";

const DURATION = 9000;
const END_PHASE = 7000;

export default function CinematicSnowClient() {
  const snowActive = useEasterEggStore((s) => s.snowActive);
  const requestRef = useRef();

  useEffect(() => {
    if (!snowActive) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    Object.assign(canvas.style, {
      position: "fixed",
      inset: 0,
      zIndex: 999999,
      pointerEvents: "none",
      transition: "opacity 1s ease",
    });
    document.body.appendChild(canvas);

    const resize = () => {
      const dpr = window.devicePixelRatio || 2; // Force high resolution
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    resize();
    window.addEventListener("resize", resize);

    // --- Sprite Factory: Creating multi-layered "Glow" flakes ---
    const createFlakeSprite = (size, blur, opacity, tint) => {
      const sCanvas = document.createElement("canvas");
      const sCtx = sCanvas.getContext("2d");
      const pad = (size * 5 + blur) * 2;
      sCanvas.width = pad;
      sCanvas.height = pad;
      sCtx.translate(pad / 2, pad / 2);

      // High-end sites use subtle gradients even on tiny flakes
      sCtx.strokeStyle = tint;
      sCtx.lineWidth = size * 0.3;
      sCtx.lineCap = "round";
      sCtx.shadowColor = "white";
      sCtx.shadowBlur = blur;

      for (let i = 0; i < 6; i++) {
        sCtx.moveTo(0, 0);
        sCtx.lineTo(0, size * 3.5);
        sCtx.moveTo(0, size * 1.8);
        sCtx.lineTo(size * 1.2, size * 2.8);
        sCtx.moveTo(0, size * 1.8);
        sCtx.lineTo(-size * 1.2, size * 2.8);
        sCtx.rotate(Math.PI / 3);
      }
      sCtx.stroke();
      return sCanvas;
    };

    const flakes = Array.from({ length: 110 }).map(() => {
      const zIndex = Math.random();
      const size = 0.8 + zIndex * 4.5;
      const blur = zIndex > 0.85 ? 12 : (1 - zIndex) * 2;
      const tint = Math.random() > 0.8 ? "rgba(220, 245, 255, 0.9)" : "white";

      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        sprite: createFlakeSprite(size, blur, 0.3 + zIndex * 0.7, tint),
        vy: 0.3 + zIndex * 1.2,
        vx: (Math.random() - 0.5) * 0.2,
        drift: Math.random() * Math.PI * 2,
        driftSpeed: 0.005 + Math.random() * 0.01,
        rotation: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.02,
        zIndex,
      };
    });

    let startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / DURATION, 1);

      // Smooth Easing functions
      const easeIn = 1 - Math.pow(1 - Math.min(progress / 0.15, 1), 3);
      const isEnding = elapsed > END_PHASE;
      const easeOut = isEnding
        ? 1 - Math.pow((elapsed - END_PHASE) / (DURATION - END_PHASE), 3)
        : 1;

      const currentAlpha = easeIn * easeOut;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // --- 1. THE CINEMATIC "DIMMER" ---
      const grad = ctx.createRadialGradient(
        window.innerWidth / 2,
        window.innerHeight / 2,
        0,
        window.innerWidth / 2,
        window.innerHeight / 2,
        window.innerWidth * 0.8
      );
      grad.addColorStop(0, `rgba(5, 10, 25, ${currentAlpha * 0.45})`);
      grad.addColorStop(1, `rgba(0, 0, 0, ${currentAlpha * 0.85})`);

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // --- 2. THE SNOW PHYSICS ---
      flakes.forEach((f) => {
        f.drift += f.driftSpeed;
        f.y += f.vy * easeOut;
        f.x += (f.vx + Math.sin(f.drift) * 0.4) * easeOut;
        f.rotation += f.spinSpeed * easeOut;

        if (f.y > window.innerHeight + 40) f.y = -40;
        if (f.x > window.innerWidth + 40) f.x = -40;
        if (f.x < -40) f.x = window.innerWidth + 40;

        ctx.save();
        ctx.globalAlpha = easeOut * (0.6 + f.zIndex * 0.4);
        ctx.translate(f.x, f.y);
        ctx.rotate(f.rotation);

        // Motion Stretch: Draw slightly elongated if falling fast
        const stretch = 1 + f.vy * 0.05;
        ctx.scale(1, stretch);

        ctx.drawImage(f.sprite, -f.sprite.width / 2, -f.sprite.height / 2);
        ctx.restore();
      });

      if (elapsed < DURATION) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        cleanup();
      }
    };

    const cleanup = () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      window.removeEventListener("resize", resize);
      if (canvas.parentNode) canvas.remove();
    };

    requestRef.current = requestAnimationFrame(animate);
    return cleanup;
  }, [snowActive]);

  return null;
}
