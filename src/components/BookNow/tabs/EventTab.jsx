"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import TerratoneToast from "@/components/TerratoneToast";
import Calendar from "./Calendar";
import { format } from "date-fns";
import ArrowIcon from "@/components/ArrowIcon";

export default function EventTab({ data, setData }) {
  const {
    fullName,
    phone,
    email,
    eventType,
    selectedRoom,
    date,
    startHour,
    startMinute,
    startPeriod,
    endHour,
    endMinute,
    endPeriod,
    people,
    notes,
  } = data;

  const ROOM_LIST = ["Media Room", "Conference Room", "Banquet Hall"];
  const [openRoom, setOpenRoom] = useState(false);

  // ------------------ TIME BUILDER ------------------
  const buildTime = (hour, minute, period) => {
    if (!hour || !minute) return "";
    return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")} ${period}`;
  };

  // Start time
  const updateStartTime = (h, m, p) => {
    const hour = h ?? startHour ?? "";
    const minute = m ?? startMinute ?? "";
    const period = p ?? startPeriod ?? "AM";

    setData((prev) => ({
      ...prev,
      startHour: hour,
      startMinute: minute,
      startPeriod: period,
      startTime: buildTime(hour, minute, period),
    }));
  };

  // End time
  const updateEndTime = (h, m, p) => {
    const hour = h ?? endHour ?? "";
    const minute = m ?? endMinute ?? "";
    const period = p ?? endPeriod ?? "AM";

    setData((prev) => ({
      ...prev,
      endHour: hour,
      endMinute: minute,
      endPeriod: period,
      endTime: buildTime(hour, minute, period),
    }));
  };

  // ------------------ DATE SELECT ------------------
  const updateDate = (v) => {
    setData((prev) => ({ ...prev, date: v }));
  };

  // ------------------ VALIDATION ------------------
  const validate = () => {
    if (
      !fullName ||
      !phone ||
      !email ||
      !eventType ||
      !selectedRoom ||
      !date ||
      !data.startTime ||
      !data.endTime ||
      !people ||
      people < 1
    ) {
      toast.custom(
        <TerratoneToast message="Please complete all required fields." />
      );
      return false;
    }
    return true;
  };

  return (
    <div className="space-y-6 font-barlow">
      <h4 className="text-lg font-medium mb-4">Event Enquiry</h4>

      <div className="space-y-4 mt-6">
        {/* ---------------- FULL NAME ---------------- */}
        <div>
          <label className="block text-[14px] tracking-wider uppercase text-neutral-500 mb-1">
            Full Name *
          </label>

          <div
            className={`bg-[#F5F2EE] p-3 border ${
              fullName ? "border-black" : "border-neutral-300"
            } focus-within:border-black`}
          >
            <input
              type="text"
              value={fullName || ""}
              onChange={(e) =>
                setData((prev) => ({ ...prev, fullName: e.target.value }))
              }
              placeholder="John Doe"
              className="w-full bg-transparent outline-none text-[15px] text-neutral-900 placeholder:text-neutral-400"
            />
          </div>
        </div>

        {/* ---------------- PHONE ---------------- */}
        <div>
          <label className="block text-[14px] tracking-wider uppercase text-neutral-500 mb-1">
            Phone Number *
          </label>

          <div
            className={`bg-[#F5F2EE] p-3 border ${
              phone ? "border-black" : "border-neutral-300"
            } focus-within:border-black`}
          >
            <input
              type="text"
              value={phone || ""}
              onChange={(e) => {
                const v = e.target.value;
                if (/^\d{0,10}$/.test(v)) {
                  setData((prev) => ({ ...prev, phone: v }));
                }
              }}
              placeholder="+91 9812345678"
              className="w-full bg-transparent outline-none text-[15px] text-neutral-900"
            />
          </div>
        </div>

        {/* ---------------- EMAIL ---------------- */}
        <div>
          <label className="block text-[14px] tracking-wider uppercase text-neutral-500 mb-1">
            Email Address *
          </label>

          <div
            className={`bg-[#F5F2EE] p-3 border ${
              email ? "border-black" : "border-neutral-300"
            } focus-within:border-black`}
          >
            <input
              type="email"
              value={email || ""}
              onChange={(e) =>
                setData((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="you@example.com"
              className="w-full bg-transparent outline-none text-[15px]"
            />
          </div>
        </div>

        {/* ====================== EVENT DETAILS ======================= */}

        {/* EVENT TYPE */}
        <div>
          <label className="block text-[14px] tracking-wider uppercase text-neutral-500 mb-1">
            Type of Event *
          </label>

          <div
            className={`bg-[#F5F2EE] p-3 border ${
              eventType ? "border-black" : "border-neutral-300"
            } focus-within:border-black`}
          >
            <input
              type="text"
              value={eventType || ""}
              onChange={(e) =>
                setData((prev) => ({ ...prev, eventType: e.target.value }))
              }
              placeholder="Workshop, Meeting, etc."
              className="w-full bg-transparent outline-none text-[15px]"
            />
          </div>
        </div>

        {/* ROOM SELECTOR */}
        <div className="border border-neutral-700 p-3 relative">
          <button
            type="button"
            onClick={() => setOpenRoom(!openRoom)}
            className="w-full bg-transparent text-sm text-black uppercase text-left"
          >
            {selectedRoom || "TYPE OF ROOM NEEDED *"}
          </button>

          <span
            className={`absolute right-3 top-1/2 -translate-y-1/2 text-neutral-700 transition-transform ${
              openRoom ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>

          {openRoom && (
            <div className="absolute left-0 top-full mt-2 w-full bg-white border border-neutral-700 z-20">
              {ROOM_LIST.map((room) => (
                <button
                  key={room}
                  onClick={() => {
                    setData((prev) => ({ ...prev, selectedRoom: room }));
                    setOpenRoom(false);
                  }}
                  className="block w-full text-left p-3 text-sm hover:bg-neutral-200 uppercase"
                >
                  {room}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ---------------- EVENT DATE (FULL CALENDAR) ---------------- */}
        <div className="border border-neutral-800">
          <div className="border-b border-neutral-800 p-4">
            <p className="uppercase text-black">Select Event Date *</p>

            <div className="flex gap-2 mt-2 text-neutral-400 tracking-wide text-sm">
              {date ? (
                <span>{format(date, "MMM dd, yyyy").toUpperCase()}</span>
              ) : (
                <span>(SELECT DATE)</span>
              )}
            </div>
          </div>

          <Calendar
            checkIn={date}
            setCheckIn={updateDate}
            singleDate={true}
            checkOut={null}
            setCheckOut={() => {}}
          />
        </div>

        {/* ---------------- START TIME ---------------- */}
        <div className="border border-neutral-700 p-3">
          <label className="block text-xs uppercase text-neutral-800 mb-1">
            Start Time *
          </label>

          <div className="flex items-center gap-2">
            {/* Hour */}
            <input
              type="number"
              min="1"
              max="12"
              value={startHour || ""}
              onChange={(e) =>
                updateStartTime(e.target.value.slice(0, 2), null, null)
              }
              placeholder="Hr"
              className="w-14 px-3 py-2 border border-neutral-400 bg-transparent text-center text-sm outline-none  [appearance:textfield]
    [&::-webkit-outer-spin-button]:appearance-none
    [&::-webkit-inner-spin-button]:appearance-none"
            />

            <span className="text-neutral-800 text-lg">:</span>

            {/* Minute */}
            <input
              type="number"
              min="0"
              max="59"
              value={startMinute || ""}
              onChange={(e) =>
                updateStartTime(null, e.target.value.slice(0, 2), null)
              }
              placeholder="Min"
              className="w-14 px-3 py-2 border border-neutral-400 bg-transparent text-center text-sm outline-none  [appearance:textfield]
    [&::-webkit-outer-spin-button]:appearance-none
    [&::-webkit-inner-spin-button]:appearance-none"
            />

            {/* AM/PM */}
            <div className="flex border border-neutral-400">
              <button
                type="button"
                onClick={() => updateStartTime(null, null, "AM")}
                className={`px-3 py-2 text-sm ${
                  startPeriod === "AM"
                    ? "bg-black text-white"
                    : "text-neutral-800"
                }`}
              >
                AM
              </button>
              <button
                type="button"
                onClick={() => updateStartTime(null, null, "PM")}
                className={`px-3 py-2 text-sm ${
                  startPeriod === "PM"
                    ? "bg-black text-white"
                    : "text-neutral-800"
                }`}
              >
                PM
              </button>
            </div>
          </div>
        </div>

        {/* ---------------- END TIME ---------------- */}
        <div className="border border-neutral-700 p-3">
          <label className="block text-xs uppercase text-neutral-800 mb-1">
            End Time (Estimated) *
          </label>

          <div className="flex items-center gap-2">
            {/* Hour */}
            <input
              type="number"
              min="1"
              max="12"
              value={endHour || ""}
              onChange={(e) =>
                updateEndTime(e.target.value.slice(0, 2), null, null)
              }
              placeholder="Hr"
              className="w-14 px-3 py-2 border border-neutral-400 bg-transparent text-center text-sm outline-none  [appearance:textfield]
    [&::-webkit-outer-spin-button]:appearance-none
    [&::-webkit-inner-spin-button]:appearance-none"
            />

            <span className="text-neutral-800 text-lg">:</span>

            {/* Minute */}
            <input
              type="number"
              min="0"
              max="59"
              value={endMinute || ""}
              onChange={(e) =>
                updateEndTime(null, e.target.value.slice(0, 2), null)
              }
              placeholder="Min"
              className="w-14 px-3 py-2 border border-neutral-400 bg-transparent text-center text-sm outline-none  [appearance:textfield]
    [&::-webkit-outer-spin-button]:appearance-none
    [&::-webkit-inner-spin-button]:appearance-none"
            />

            {/* AM/PM */}
            <div className="flex border border-neutral-400">
              <button
                type="button"
                onClick={() => updateEndTime(null, null, "AM")}
                className={`px-3 py-2 text-sm ${
                  endPeriod === "AM" ? "bg-black text-white" : ""
                }`}
              >
                AM
              </button>

              <button
                type="button"
                onClick={() => updateEndTime(null, null, "PM")}
                className={`px-3 py-2 text-sm ${
                  endPeriod === "PM" ? "bg-black text-white" : ""
                }`}
              >
                PM
              </button>
            </div>
          </div>
        </div>

        {/* ---------------- NUMBER OF PEOPLE ---------------- */}
        {/* ---------------- NUMBER OF PEOPLE ---------------- */}
        <div className="border border-neutral-700 p-4 space-y-4">
          <div className="flex justify-between items-center pt-2">
            <span className="uppercase text-black">Number of People *</span>

            <div className="flex items-center gap-3">
              {/* Minus */}
              <button
                disabled={Number(people) <= 1}
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    people: Math.max(1, Number(prev.people) - 1),
                  }))
                }
                className="w-6 h-6 bg-[#EAE4DD] flex items-center justify-center disabled:bg-neutral-200"
              >
                -
              </button>

              {/* Display */}
              <span className="w-6 text-center">
                {String(Number(people)).padStart(2, "0")}
              </span>

              {/* Plus */}
              <button
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    people: Number(prev.people) + 1,
                  }))
                }
                className="w-6 h-6 bg-[#EAE4DD] flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* ---------------- NOTES ---------------- */}
        <div className="border border-neutral-700 p-3">
          <label className="block text-xs uppercase text-neutral-800 mb-2">
            Additional Information
          </label>
          <textarea
            rows={4}
            value={notes || ""}
            onChange={(e) =>
              setData((prev) => ({ ...prev, notes: e.target.value }))
            }
            className="w-full bg-transparent outline-none text-sm resize-none text-neutral-900"
            placeholder="Any special requirements..."
          />
        </div>

        {/* ---------------- SUBMIT ---------------- */}
        <div className="w-full mt-4">
          <button
            type="button"
            onClick={async () => {
              if (!validate()) return;

              try {
                const res = await fetch("/api/event", {
                  method: "POST",
                  body: JSON.stringify(data),
                });

                const json = await res.json();

                if (json.success) {
                  toast.custom(
                    <TerratoneToast message="Event enquiry sent!" />
                  );
                } else {
                  toast.custom(
                    <TerratoneToast message="Something went wrong" icon="⚠" />
                  );
                }
              } catch (err) {
                toast.custom(
                  <TerratoneToast message="Network error" icon="⚠" />
                );
              }
            }}
            className="w-full flex items-baseline justify-center gap-2 bg-white text-black border border-black py-3 font-semibold text-sm tracking-wide uppercase hover:text-white hover:bg-black transition-all cursor-pointer"
          >
            Submit Enquiry <ArrowIcon/>
          </button>
        </div>
      </div>
    </div>
  );
}
