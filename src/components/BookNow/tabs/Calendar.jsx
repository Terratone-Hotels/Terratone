"use client";

import { useState } from "react";
import {
  addMonths,
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameDay,
  isSameMonth,
  isBefore,
  addDays,
} from "date-fns";

export default function Calendar({
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  singleDate = false,
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(addMonths(currentMonth, -1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const weekStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = [];
  let day = weekStart;
  while (day <= weekEnd) {
    days.push(day);
    day = addDays(day, 1);
  }

  // Select logic
  // Select logic
  const handleSelect = (date) => {
    if (isBefore(date, today)) return;

    // ----- SINGLE DATE MODE (DiningTab) -----
    if (singleDate) {
      setCheckIn(date); // always overwrite selected date
      return;
    }

    // ----- RANGE MODE (HotelTab) -----
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
      return;
    }

    if (date > checkIn) {
      setCheckOut(date);
    } else {
      setCheckIn(date);
      setCheckOut(null);
    }
  };

  const isInRange = (day) =>
    checkIn && checkOut && day > checkIn && day < checkOut;

  return (
    <div className="text-black font-barlow select-none p-8 ">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        {/* Left button (rotated 180°) */}
        <button onClick={prevMonth} className="p-2 cursor-pointer">
          <img src="/right-arrow.svg" alt="Left Arrow" className="w-5 h-5 " />
        </button>

        <div className="uppercase tracking-wide text-lg">
          {format(currentMonth, "yyyy")} &nbsp; {format(currentMonth, "LLLL")}
        </div>

        {/* Right button */}
        <button onClick={nextMonth} className="p-2 cursor-pointer">
          <img
            src="/right-arrow.svg"
            alt="Right Arrow"
            className="w-5 h-5 rotate-180"
          />
        </button>
      </div>

      {/* Week Labels */}
      <div className="grid grid-cols-7 text-center text-neutral-600 text-lg mb-3 pb-2">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d, i) => (
          <div key={i}>{d}</div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 text-center gap-y-2">
        {days.map((dayItem, i) => {
          const isPast = isBefore(dayItem, today);
          const isSelected =
            isSameDay(dayItem, checkIn) || isSameDay(dayItem, checkOut);
          const isCheckOutDay = isSameDay(dayItem, checkOut);
          const inMonth = isSameMonth(dayItem, currentMonth);

          const dayNumber = format(dayItem, "d");

          return (
            <div key={i} className="relative flex justify-center items-center">
              <button
                disabled={isPast}
                onClick={() => handleSelect(dayItem)}
                className={`
                  w-10 h-10 flex items-center justify-center  text-lg transition-all

                  ${
                    isPast
                      ? "text-neutral-600 opacity-40 cursor-not-allowed"
                      : "text-black cursor-pointer"
                  }

                  ${isSelected ? "bg-black text-white font-semibold" : ""}

                  ${isInRange(dayItem) ? "bg-gray-400/20" : ""}
                `}
              >
                {dayNumber}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
