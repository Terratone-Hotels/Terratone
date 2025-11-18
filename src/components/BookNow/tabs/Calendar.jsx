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
  const handleSelect = (date) => {
    if (isBefore(date, today)) return;

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
    <div className="text-black mt-4 select-none pb-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="p-2 hover:text-white">
          ←
        </button>

        <div className="uppercase tracking-wide text-sm">
          {format(currentMonth, "yyyy")} &nbsp; {format(currentMonth, "LLLL")}
        </div>

        <button onClick={nextMonth} className="p-2 hover:text-black">
          →
        </button>
      </div>

      {/* Week Labels */}
      <div className="grid grid-cols-7 text-center text-neutral-900 text-xs mb-3 border-b pb-2">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
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
                  w-10 h-10 flex items-center justify-center rounded-full text-sm transition-all

                  ${
                    isPast
                      ? "text-neutral-600 opacity-40 cursor-not-allowed"
                      : "text-black cursor-pointer"
                  }

                  ${isSelected ? "bg-green-600 text-white font-semibold" : ""}

                  ${isInRange(dayItem) ? "bg-green-600/20" : ""}
                `}
              >
                {dayNumber}
              </button>

              {/* Dot for checkout date */}
              {isCheckOutDay && (
                <div className="absolute bottom-1 w-1.5 h-1.5 bg-white rounded-full pointer-events-none"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
