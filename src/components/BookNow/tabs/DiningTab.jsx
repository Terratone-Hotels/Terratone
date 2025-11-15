"use client";

import { useState } from "react";

export default function DiningTab() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);

  return (
    <div className="space-y-6">
      <h4 className="text-lg font-medium mb-4">Reserve a table</h4>

      <div className="space-y-4 mt-6">
        {/* FULL NAME */}
        <div className="border border-neutral-700 rounded p-3">
          <label className="block text-xs uppercase text-neutral-300 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your name"
            className="w-full bg-transparent outline-none text-sm text-neutral-200"
          />
        </div>

        {/* PHONE NUMBER */}
        <div className="border border-neutral-700 rounded p-3">
          <label className="block text-xs uppercase text-neutral-300 mb-1">
            Phone Number *
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 9876543210"
            className="w-full bg-transparent outline-none text-sm text-neutral-200"
          />
        </div>

        {/* DATE */}
        <div className="border border-neutral-700 rounded p-3 cursor-pointer">
          <label className="block text-xs uppercase text-neutral-300 mb-1">
            Date *
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-neutral-200 no-calendar-icon"
          />
        </div>

        {/* TIME */}
        <div className="border border-neutral-700 rounded p-3 cursor-pointer">
          <label className="block text-xs uppercase text-neutral-300 mb-1">
            Time *
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-neutral-200 no-time-icon"
          />
        </div>

        {/* NUMBER OF GUESTS */}
        <div className="border border-neutral-700 rounded p-3">
          <label className="block text-xs uppercase text-neutral-300 mb-2">
            Number of Guests *
          </label>

          <div className="flex items-center justify-between">
            <span className="text-neutral-200">{guests}</span>

            <div className="flex gap-2">
              <button
                type="button"
                disabled={guests <= 1}
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-500 disabled:border-neutral-700 disabled:text-neutral-700"
              >
                -
              </button>
              <button
                type="button"
                onClick={() => setGuests(guests + 1)}
                className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-500"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* SUBMIT */}
        <button className="w-full bg-white text-black py-3 rounded font-semibold text-sm tracking-wide">
          Reserve Table →
        </button>
      </div>
    </div>
  );
}
