"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import Bounded from "@/components/Bounded";
import HeroTextRenderer from "@/components/HeroTextRenderer";
import { PrismicNextImage } from "@prismicio/next";

import { useHotelBooking } from "@/store/useHotelBooking";
import useBookNowModal from "@/hooks/useBookNowModal";

import Calendar from "@/components/BookNow/tabs/Calendar";
import { format } from "date-fns";

const HeroForOthers = ({ slice }) => {
  // --------------------------------------
  // INITIAL ROOM FROM URL
  // --------------------------------------
  const pathname = usePathname();

  const roomMap = {
    "deluxe-king": "Deluxe King",
    "deluxe-suite": "Deluxe Suite",
    "deluxe-twin": "Deluxe Twin",
  };

  const parts = pathname.split("/"); // ["", "stay", "deluxe-suite"]
  const slug = parts[2]; // "deluxe-suite"

  let detectedRoom = roomMap[slug] || "Deluxe King";

  // If /stay but no slug => default to Deluxe Suite
  if (parts[1] === "stay" && !roomMap[slug]) {
    detectedRoom = "Deluxe Suite";
  }

  const [room, setRoom] = useState(detectedRoom);

  // --------------------------------------
  // LOCAL STATE
  // --------------------------------------
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const [guestsOpen, setGuestsOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [roomOpen, setRoomOpen] = useState(false);

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  // --------------------------------------
  // ZUSTAND
  // --------------------------------------
  const setHotelData = useHotelBooking((s) => s.setData);
  const openFromOutside = useBookNowModal((s) => s.openFromOutside);

  // --------------------------------------
  // CLICK OUTSIDE
  // --------------------------------------
  const guestsRef = useRef(null);
  const calendarRef = useRef(null);
  const roomRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (guestsRef.current && !guestsRef.current.contains(e.target)) {
        setGuestsOpen(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setCalendarOpen(false);
      }
      if (roomRef.current && !roomRef.current.contains(e.target)) {
        setRoomOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --------------------------------------
  // GUEST FUNCTIONS
  // --------------------------------------
  const incrementAdult = () => {
    if (adults + children >= 3) return;
    setAdults(adults + 1);
  };

  const decrementAdult = () => {
    if (adults <= 1) return;
    setAdults(adults - 1);
  };

  const incrementChild = () => {
    if (adults + children >= 3) return;
    setChildren(children + 1);
  };

  const decrementChild = () => {
    if (children <= 0) return;
    setChildren(children - 1);
  };

  // --------------------------------------
  // SUBMIT
  // --------------------------------------
  const handleCheckAvailability = () => {
    setHotelData({
      selectedProperty: room,
      adults,
      children,
      checkIn,
      checkOut,
    });

    openFromOutside();
  };

  // --------------------------------------
  // RENDER
  // --------------------------------------
  return (
    <>
      {/* DEFAULT HERO */}
      {slice.variation === "default" && (
        <section data-hero-slice>
          <Bounded full>
            <div className="relative h-screen">
              <PrismicNextImage
                field={slice.primary.hero_image}
                className="w-full h-full object-cover"
                priority
                sizes="100vw"
              />

              <div className="absolute bottom-16 lg:bottom-10 left-1/2 -translate-x-1/2 text-white font-serif text-center text-[35px] w-[80%] lg:text-[3.25rem] leading-10 lg:leading-[3.4rem] tracking-tight">
                <HeroTextRenderer field={slice.primary.hero_heading} />
              </div>
            </div>
          </Bounded>
        </section>
      )}

      {/* HERO WITH AVAILABILITY BAR */}
      {slice.variation === "withAvailabilityBar" && (
        <section data-hero-slice>
          <Bounded full>
            <div className="relative h-screen">
              <PrismicNextImage
                field={slice.primary.hero_image}
                className="w-full h-full object-cover"
                priority
                sizes="100vw"
              />

              <div className="absolute bottom-40 lg:bottom-28 left-1/2 -translate-x-1/2 text-white font-serif text-center text-[35px] w-[80%] lg:text-[3.25rem] leading-10 lg:leading-[3.4rem] tracking-tight">
                <HeroTextRenderer field={slice.primary.hero_heading} />
              </div>

              {/* AVAILABILITY BAR */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[95%] lg:w-[80%] shadow-xl rounded-md overflow-visible">
                <div
                  className="
    flex flex-wrap lg:flex-nowrap 
    gap-y-3 gap-x-3 
    relative overflow-visible
  "
                >
                  {/* ROOM */}
                  <div
                    ref={roomRef}
                    className="relative basis-[48%] lg:w-1/4 
               border border-neutral-300  rounded-md 
               bg-white px-4 py-3"
                  >
                    <label className="block text-[14px] font-barlow uppercase tracking-wide text-neutral-500 mb-1">
                      Room
                    </label>

                    <button
                      onClick={() => setRoomOpen(!roomOpen)}
                      className="w-full text-left bg-transparent text-lg outline-none cursor-pointer"
                    >
                      {room}
                    </button>

                    {roomOpen && (
                      <div
                        className="
          absolute left-0 bottom-full mb-3
          w-full bg-white shadow-xl border border-neutral-300 p-4 z-[9999]
          rounded-md
        "
                      >
                        {["Deluxe King", "Deluxe Suite", "Deluxe Twin"].map(
                          (r) => (
                            <div
                              key={r}
                              onClick={() => {
                                setRoom(r);
                                setRoomOpen(false);
                              }}
                              className="py-2 text-lg cursor-pointer hover:bg-neutral-100"
                            >
                              {r}
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>

                  {/* GUESTS */}
                  <div
                    ref={guestsRef}
                    className="relative basis-[48%] lg:w-1/4 
               border border-neutral-300 rounded-md 
               bg-white px-4 py-3"
                  >
                    <label className="block text-[14px] font-barlow uppercase tracking-wide text-neutral-500 mb-1">
                      Guest(s)
                    </label>

                    <button
                      onClick={() => setGuestsOpen(!guestsOpen)}
                      className="w-full text-left bg-transparent  font-barlow text-lg outline-none cursor-pointer"
                    >
                      {adults + children} Guests
                    </button>

                    {guestsOpen && (
                      <div
                        className="
          absolute left-0 bottom-full mb-3
          w-full bg-white shadow-xl border border-neutral-300 p-4
          rounded-md z-[9999]
        "
                      >
                        {/* Adults */}
                        <div className="flex justify-between items-center py-2">
                          <span className="uppercase">Adults</span>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={decrementAdult}
                              disabled={adults <= 1}
                              className="w-6 h-6 bg-neutral-200 disabled:opacity-40"
                            >
                              -
                            </button>
                            <span>{adults}</span>
                            <button
                              onClick={incrementAdult}
                              disabled={adults + children >= 3}
                              className="w-6 h-6 bg-neutral-200 disabled:opacity-40"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Children */}
                        <div className="flex justify-between items-center py-2 border-t">
                          <span className="uppercase">Children</span>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={decrementChild}
                              disabled={children <= 0}
                              className="w-6 h-6 bg-neutral-200 disabled:opacity-40"
                            >
                              -
                            </button>
                            <span>{children}</span>
                            <button
                              onClick={incrementChild}
                              disabled={adults + children >= 3}
                              className="w-6 h-6 bg-neutral-200 disabled:opacity-40"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* DATE PICKER */}
                  <div
                    ref={calendarRef}
                    className="relative basis-full lg:w-1/4 
               border border-neutral-300 rounded-md 
               bg-white px-4 py-3"
                  >
                    <label className="block text-[14px] font-barlow uppercase tracking-wide text-neutral-500 mb-1">
                      Dates of Stay
                    </label>

                    <button
                      onClick={() => setCalendarOpen(!calendarOpen)}
                      className="w-full bg-transparent text-left font-barlow text-lg outline-none cursor-pointer"
                    >
                      {checkIn && checkOut
                        ? `${format(checkIn, "MMM dd, yyyy")} / ${format(
                            checkOut,
                            "MMM dd, yyyy"
                          )}`
                        : "Select Dates"}
                    </button>

                    {calendarOpen && (
                      <div
                        className="
          absolute left-0 bottom-full mb-3
          w-full bg-white shadow-2xl border border-neutral-300 p-4
          rounded-md z-[9999]
        "
                      >
                        <Calendar
                          checkIn={checkIn}
                          checkOut={checkOut}
                          setCheckIn={setCheckIn}
                          setCheckOut={setCheckOut}
                        />

                        <button
                          onClick={() => setCalendarOpen(false)}
                          className="w-full bg-black text-white mt-3 py-2 text-sm uppercase rounded-md"
                        >
                          Done
                        </button>
                      </div>
                    )}
                  </div>

                  {/* CTA BUTTON */}
                  <button
                    onClick={handleCheckAvailability}
                    className="flex w-full  bg-black text-white rounded-md overflow-hidden cursor-pointer"
                  >
                    {/* Left section with padding */}
                    <span className="flex-1 flex items-center justify-center px-6 py-6 text-xs uppercase tracking-wide">
                      Check Availability
                    </span>

                    {/* Right square arrow area */}
                    <span className="w-20 flex items-center justify-center bg-neutral-900 text-lg">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </Bounded>
        </section>
      )}
    </>
  );
};

export default HeroForOthers;
