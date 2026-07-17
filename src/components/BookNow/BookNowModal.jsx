"use client";
import React from "react";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import TabsHeader from "./TabsHeader";
import { useLenisControl } from "../LenisScrollContext";
import HotelTab from "./tabs/HotelTab";
import DiningTab from "./tabs/DiningTab";
import EventTab from "./tabs/EventTab";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHotelBooking } from "@/store/useHotelBooking";
import useBookNowModal from "@/hooks/useBookNowModal";

gsap.registerPlugin(ScrollTrigger);

export default function BookNowModal({
  isOpen,
  onClose,
  initialTab = "hotel",
}) {
  const openGlobal = useBookNowModal((s) => s.openGlobal);
  const closeGlobal = useBookNowModal((s) => s.closeFromOutside);
  const [openInternal, setOpenInternal] = useState(false);

  const closeModal = () => {
    setOpenInternal(false);
    onClose?.();
    closeGlobal();
  };
  const [portalReady, setPortalReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const closeTimer = useRef(null);
  const asideRef = useRef(null);

  const { stopScroll, startScroll } = useLenisControl();
  const ANIM = 250;

  const [activeTab, setActiveTab] = useState(initialTab);

  const hotelData = useHotelBooking((s) => s.data);
  const setHotelData = useHotelBooking((s) => s.setData);

  const [diningData, setDiningData] = useState({
    fullName: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
  });

  const [eventData, setEventData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    eventType: "",
    selectedRoom: "",
    date: "",
    startTime: "",
    endTime: "",
    people: "",
    notes: "",
  });

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
      // Clear any pending close-timeout from a rapid reopen
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
        closeTimer.current = null;
      }

      // ✅ Prevent page shift: measure the scrollbar width before locking scroll,
      // then compensate with padding so content doesn't jump sideways.
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      document.body.style.overflow = "hidden";

      setMounted(true);
      setActiveTab(initialTab);
      stopScroll();
      gsap.globalTimeline.pause();

      // ✅ Force a synchronous reflow so the browser commits the
      // "translate-x-full" starting position before flipping to animated-in.
      // This replaces the double-rAF trick, which browsers can coalesce
      // into a single frame (causing the occasional "snap" instead of slide).
      requestAnimationFrame(() => {
        if (asideRef.current) {
          // eslint-disable-next-line no-unused-expressions
          asideRef.current.offsetHeight; // force reflow
        }
        setAnimateIn(true);
      });
    } else {
      setAnimateIn(false);

      closeTimer.current = setTimeout(() => {
        setMounted(false);

        // ✅ Restore page scroll + remove compensation padding
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";

        startScroll();
        gsap.globalTimeline.resume();
      }, ANIM);
    }

    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, [isOpen, portalReady, initialTab, stopScroll, startScroll]);

  // ✅ Safety net: always restore body styles if this component unmounts
  // while still "open" (e.g. parent removes it without isOpen going false first).
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, []);

  if (!portalReady || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-70 flex justify-end"
      aria-modal="true"
      role="dialog"
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/70 transition-opacity duration-200
          ${animateIn ? "opacity-100" : "opacity-0"}`}
      />

      <aside
        ref={asideRef}
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
        className={`relative z-10 h-full w-[100vw] md:w-[420px] bg-stone text-black shadow-xl
          overflow-y-auto
          transition-transform duration-200 ease-out
          ${animateIn ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex font-serif items-center  justify-between px-6 py-4 mt-10">
          <h3 className="text-2xl lg:text-5xl ">Book</h3>

          <button
            onClick={onClose}
            className="relative text-lg font-semibold px-1 font-barlow  border-b-2 cursor-pointer"
          >
            CLOSE ✕
          </button>
        </div>

        <div className="px-6 py-5">
          <TabsHeader active={activeTab} setActive={setActiveTab} />
        </div>

        <div className="p-6 flex-1 overflow-y-auto" data-lenis-prevent>
          {activeTab === "hotel" && (
            <HotelTab
              data={hotelData}
              setData={setHotelData}
              closeModal={closeModal}
            />
          )}

          {activeTab === "dining" && (
            <DiningTab data={diningData} setData={setDiningData} />
          )}

          {activeTab === "event" && (
            <EventTab data={eventData} setData={setEventData} />
          )}
        </div>
      </aside>
    </div>,
    document.getElementById("booknow-portal")
  );
}