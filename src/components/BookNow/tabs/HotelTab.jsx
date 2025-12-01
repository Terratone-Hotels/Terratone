"use client";

import { useState } from "react";
import Calendar from "./Calendar";
import { format } from "date-fns";
import toast from "react-hot-toast";
import TerratoneToast from "@/components/TerratoneToast";
import useBookNowModal from "@/hooks/useBookNowModal";
import { useHotelBooking } from "@/store/useHotelBooking";
import ArrowIcon from "@/components/ArrowIcon";

export default function HotelTab({ data, setData, closeModal }) {
  const {
    selectedProperty,
    adults = 2,
    children = 0,
    checkIn,
    checkOut,
  } = data || {};

  const PROPERTY_LIST = ["Deluxe Suite", "Deluxe King", "Deluxe Twin"];
  const [openProperty, setOpenProperty] = useState(false);
  const closeFromOutside = useBookNowModal((s) => s.closeFromOutside);
  const clear = useHotelBooking((s) => s.clear);

  // NEW: use setData with partial objects (Zustand expects partial object)
  const updateCheckIn = (v) => setData({ checkIn: v });
  const updateCheckOut = (v) => setData({ checkOut: v });

  // ---------------------- VALIDATE & SUBMIT ----------------------
  const submit = async () => {
    if (
      !data.fullName ||
      !data.phone ||
      !selectedProperty ||
      !checkIn ||
      !checkOut
    ) {
      toast.custom(
        <TerratoneToast message="Please complete all booking details." />
      );
      return;
    }

    try {
      const payload = {
        ...data,
        adults,
        children,
        rooms: [
          {
            roomName: "1",
            property: selectedProperty,
            checkIn,
            checkOut,
            adults,
            children,
          },
        ],
      };

      const res = await fetch("/api/hotel", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (json.success) {
        const summary = `${selectedProperty} • ${adults} Adults, ${children} Children`;
        toast.custom(
          <TerratoneToast
            message={`Hotel enquiry sent!  We will get back to you soon`}
          />
        );
        setTimeout(() => {
          closeModal(); // close modal
          clear(); // reset all fields
        }, 400);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 text-sm">
      {/* ---------------- FULL NAME ---------------- */}
      <div className="mb-4">
        <label className="block text-[14px] tracking-wider uppercase text-neutral-500 mb-1">
          Full Name *
        </label>

        <div
          className={`bg-[#F5F2EE] p-3 border 
            ${data.fullName ? "border-black" : "border-neutral-300"} 
            focus-within:border-black
          `}
        >
          <input
            type="text"
            value={data.fullName || ""}
            onChange={(e) => {
              const v = e.target.value;
              if (/^[A-Za-z\s]*$/.test(v)) {
                setData({ fullName: v });
              }
            }}
            placeholder="John Doe"
            className="w-full bg-transparent outline-none text-[15px] text-neutral-900 placeholder:text-neutral-400"
          />
        </div>
      </div>

      {/* ---------------- PHONE NUMBER ---------------- */}
      <div className="mb-4">
        <label className="block text-[14px] tracking-wider uppercase text-neutral-500 mb-1">
          Ph. No *
        </label>

        <div
          className={`bg-[#F5F2EE] p-3 border 
            ${data.phone ? "border-black" : "border-neutral-300"} 
            focus-within:border-black
          `}
        >
          <input
            type="text"
            value={data.phone || ""}
            onChange={(e) => {
              const v = e.target.value;
              if (/^\d{0,10}$/.test(v)) {
                setData({ phone: v });
              }
            }}
            placeholder="+91 9213566646"
            className="w-full bg-transparent outline-none text-[15px] text-neutral-900 placeholder:text-neutral-400"
          />
        </div>
      </div>

      {/* ---------------- PROPERTY SELECTOR ---------------- */}
      <div
        className={`
          p-4 bg-[#F5F2EE] border 
          ${openProperty || selectedProperty ? "border-black" : "border-neutral-300"}
          transition-colors
        `}
      >
        <button
          onClick={() => setOpenProperty(!openProperty)}
          className="w-full flex justify-between items-center"
          type="button"
        >
          <span className="uppercase tracking-wide text-neutral-800">
            {selectedProperty || "Choose a Room *"}
          </span>

          <span
            className={`text-lg transition-transform duration-300 ${
              openProperty ? "rotate-180" : ""
            }`}
          >
            ▾
          </span>
        </button>

        {openProperty && (
          <div className="mt-3 space-y-2">
            {PROPERTY_LIST.map((prop) => (
              <div
                key={prop}
                className={`p-2 cursor-pointer ${
                  selectedProperty === prop
                    ? "bg-neutral-800 text-white"
                    : "hover:bg-neutral-200"
                }`}
                onClick={() => {
                  // pass partial object
                  setData({ selectedProperty: prop });
                  setOpenProperty(false);
                }}
              >
                {prop}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ---------------- DATE PICKER ---------------- */}
      <div className="border border-neutral-800">
        <div className="border-b border-neutral-800 p-4">
          <p className="uppercase text-black">SELECT DATE</p>
          <div className="flex gap-2 mt-2 text-neutral-400 tracking-wide text-sm">
            <span>
              {checkIn
                ? format(checkIn, "MMM dd, yy").toUpperCase()
                : "(CHECK-IN "}
            </span>
            <span>/</span>
            <span>
              {checkOut
                ? format(checkOut, "MMM dd, yy").toUpperCase()
                : "CHECK-OUT)"}
            </span>
          </div>
        </div>

        <Calendar
          checkIn={data.checkIn}
          setCheckIn={(d) => setData({ checkIn: d })}
          checkOut={data.checkOut}
          setCheckOut={(d) => setData({ checkOut: d })}
        />
      </div>

      {/* ---------------- GUEST PICKER ---------------- */}
      <div className="border border-neutral-600 p-4 space-y-4">
        {/* Heading */}
        {selectedProperty ? (
          <div>
            <p className="uppercase text-black">{selectedProperty}</p>
            <p className="uppercase text-black text-xs tracking-wide">
              ({checkIn ? format(checkIn, "MMM dd, yyyy") : "---"} —{" "}
              {checkOut ? format(checkOut, "MMM dd, yyyy") : "---"})
            </p>
          </div>
        ) : (
          <div>
            <p className="uppercase text-neutral-500">No room selected</p>
            <p className="uppercase text-neutral-400 text-xs tracking-wide">
              (Check-in — Check-out)
            </p>
          </div>
        )}

        {/* Adults */}
        <div className="flex justify-between items-center pt-2">
          <span className="uppercase text-black">Adults</span>

          <div className="flex items-center gap-3">
            <button
              disabled={adults <= 1}
              onClick={() => {
                const newAdults = Math.max(1, adults - 1);
                setData({ adults: newAdults });
              }}
              className="w-6 h-6 bg-[#EAE4DD] flex items-center justify-center disabled:bg-neutral-200 disabled:text-neutral-500"
            >
              -
            </button>

            <span className="w-6 text-center">
              {String(adults).padStart(2, "0")}
            </span>

            <button
              disabled={adults + children >= 3}
              onClick={() => {
                if (adults + children >= 3) return;
                setData({ adults: adults + 1 });
              }}
              className="w-6 h-6 bg-[#EAE4DD] flex items-center justify-center disabled:bg-neutral-200 disabled:text-neutral-500"
            >
              +
            </button>
          </div>
        </div>

        {/* Children */}
        <div className="flex justify-between items-center pt-2">
          <span className="uppercase text-black">Children</span>

          <div className="flex items-center gap-3">
            <button
              disabled={children <= 0}
              onClick={() => {
                const newChildren = Math.max(0, children - 1);
                setData({ children: newChildren });
              }}
              className="w-6 h-6 bg-[#EAE4DD] flex items-center justify-center disabled:bg-neutral-200 disabled:text-neutral-500"
            >
              -
            </button>

            <span className="w-6 text-center">
              {String(children).padStart(2, "0")}
            </span>

            <button
              disabled={adults + children >= 3}
              onClick={() => {
                if (adults + children >= 3) return;
                setData({ children: children + 1 });
              }}
              className="w-6 h-6 bg-[#EAE4DD] flex items-center justify-center disabled:bg-neutral-200 disabled:text-neutral-500"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- CTA BUTTONS ---------------- */}
      <div className="w-full mt-2">
        <button
          type="button"
          onClick={submit}
          className="w-full flex items-baseline justify-center gap-2 bg-white text-black hover:text-white hover:bg-black  py-3 font-semibold text-sm tracking-wide uppercase cursor-pointer transition-all border border-black"
        >
          Enquire Now <ArrowIcon/>
        </button>
      </div>
    </div>
  );
}
