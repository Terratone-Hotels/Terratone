"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import TabsHeader from "./TabsHeader";
import { useLenisControl } from "../LenisScrollContext";
import HotelTab from "./tabs/HotelTab";
import DiningTab from "./tabs/DiningTab";
import EventTab from "./tabs/EventTab";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BookNowModal({
  isOpen,
  onClose,
  initialTab = "hotel",
}) {
  const [portalReady, setPortalReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const closeTimer = useRef(null);

  const { stopScroll, startScroll } = useLenisControl();
  const ANIM = 250;

  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    let root = document.getElementById("booknow-portal");
    if (!root) {
      root = document.createElement("div");
      root.id = "booknow-portal";
      document.body.appendChild(root);
    }
    setPortalReady(true);
  }, []);

  useEffect(() => {
    if (!portalReady) return;

    if (isOpen) {
      setMounted(true);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimateIn(true))
      );

      // Lock scroll using Lenis
      stopScroll();

      // Pause GSAP's ticker to freeze all animations, including ScrollTriggers
      gsap.ticker.lagSmoothing(0);
      gsap.ticker.remove(gsap.updateRoot);

      setActiveTab(initialTab);
    } else {
      setAnimateIn(false);

      closeTimer.current = setTimeout(() => {
        setMounted(false);

        // Restore scroll using Lenis
        startScroll();

        // Resume GSAP's ticker
        gsap.ticker.add(gsap.updateRoot);
        gsap.ticker.lagSmoothing(500, 33);

        // Optional: A quick refresh of ScrollTrigger might be needed
        // in some edge cases, but try without it first.
        // ScrollTrigger.refresh();
      }, ANIM);
    }

    return () => clearTimeout(closeTimer.current);
  }, [isOpen, portalReady, initialTab, stopScroll, startScroll]);

  if (!portalReady || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex justify-end"
      aria-modal="true"
      role="dialog"
    >
      {/* ... rest of your JSX is unchanged ... */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/70 transition-opacity duration-200
          ${animateIn ? "opacity-100" : "opacity-0"}
        `}
      />

      <aside
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
        className={`relative z-10 h-full w-[90vw] md:w-[420px] bg-neutral-900 text-white shadow-xl
          overflow-y-auto
          transition-transform duration-200 ease-out
          ${animateIn ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <h3 className="text-2xl font-semibold">Book</h3>

          <button
            onClick={onClose}
            className="relative px-4 py-2 border border-white text-xs uppercase before:absolute before:inset-[-4px] before:border before:border-white"
          >
            CLOSE ✕
          </button>
        </div>

        <div className="px-6 py-5">
          <TabsHeader active={activeTab} setActive={setActiveTab} />
        </div>

        <div className="p-6 flex-1 overflow-y-auto" data-lenis-prevent>
          {activeTab === "hotel" && <HotelTab />}
          {activeTab === "dining" && <DiningTab />}
          {activeTab === "event" && <EventTab />}
        </div>
      </aside>
    </div>,
    document.getElementById("booknow-portal")
  );
}
