"use client";

import { useState } from "react";
import Calendar from "./Calendar";
import { format } from "date-fns";

export default function HotelTab() {
  const [selectedProperty, setSelectedProperty] = useState("");
  const [openProperty, setOpenProperty] = useState(false);

  // Live form fields (next room)
  const [adults, setAdults] = useState(2); // MIN 2
  const [children, setChildren] = useState(0); // MIN 0
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  // Saved rooms
  const [rooms, setRooms] = useState([]);

  const PROPERTY_LIST = ["Deluxe Suite", "Deluxe King", "Deluxe Twin"];

  // The next room number for the live form
  const liveRoomNumber = rooms.length + 1;

  // ---------------------- ADD ROOM ----------------------
  const addRoom = () => {
    if (!selectedProperty || !checkIn || !checkOut) return;

    const newRoomNumber = rooms.length + 1;

    const newRoom = {
      roomName: `${newRoomNumber}`, // only number
      property: selectedProperty,
      checkIn,
      checkOut,
      adults,
      children,
    };

    setRooms((prev) => [...prev, newRoom]);

    // Reset live form for the next room
    setSelectedProperty("");
    setCheckIn(null);
    setCheckOut(null);
    setAdults(2);
    setChildren(0);
  };

  // ---------------------- DELETE ROOM (renumber remaining) ----------------------
  const deleteRoom = (index) => {
    setRooms((prev) => {
      const filtered = prev.filter((_, i) => i !== index);

      // Renumber rooms 1..n
      return filtered.map((room, i) => ({
        ...room,
        roomName: `${i + 1}`,
      }));
    });
  };

  // ---------------------- UPDATE SAVED ROOM GUESTS ----------------------
  const updateRoomGuests = (index, type, delta) => {
    setRooms((prev) =>
      prev.map((room, i) => {
        if (i !== index) return room;

        return {
          ...room,
          adults:
            type === "adults"
              ? Math.max(2, room.adults + delta) // MIN = 2
              : room.adults,
          children:
            type === "children"
              ? Math.max(0, room.children + delta) // MIN = 0
              : room.children,
        };
      })
    );
  };

  return (
    <div className="space-y-6 text-sm">
      {/* ---------------------- PROPERTY SELECTOR ---------------------- */}
      <div className="border border-neutral-700 p-4 rounded">
        <button
          onClick={() => setOpenProperty(!openProperty)}
          className="w-full flex justify-between items-center"
          type="button"
        >
          <span className="uppercase tracking-wide text-neutral-300">
            {selectedProperty || "Choose a property*"}
          </span>
          <span
            className={`text-lg transition-transform duration-300 ${
              openProperty ? "rotate-180" : ""
            }`}
          >
            ▾
          </span>
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            openProperty ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-2 text-white">
            {PROPERTY_LIST.map((prop) => (
              <div
                key={prop}
                className={`p-2 rounded cursor-pointer hover:bg-neutral-800 ${
                  selectedProperty === prop ? "bg-neutral-800" : ""
                }`}
                onClick={() => {
                  setSelectedProperty(prop);
                  setOpenProperty(false);
                }}
              >
                {prop}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------------- DATE PICKER ---------------------- */}
      <div className="border border-neutral-700 p-4 rounded">
        <p className="uppercase text-neutral-300">Date of stay</p>

        <div className="flex gap-2 mt-2 text-neutral-400 tracking-wide text-sm">
          <span>
            {checkIn ? format(checkIn, "MMM dd, yy").toUpperCase() : "--"}
          </span>
          <span>/</span>
          <span>
            {checkOut ? format(checkOut, "MMM dd, yy").toUpperCase() : "--"}
          </span>
        </div>

        <Calendar
          checkIn={checkIn}
          setCheckIn={setCheckIn}
          checkOut={checkOut}
          setCheckOut={setCheckOut}
        />
      </div>

      {/* ---------------------- LIVE ROOM FORM ---------------------- */}
      <div className="border border-neutral-700 p-4 rounded space-y-4">
        <div className="flex justify-between items-center">
          <p className="uppercase text-neutral-300">
            Guests ({liveRoomNumber}
            {selectedProperty ? ` — ${selectedProperty}` : ""})
          </p>
        </div>

        {/* Adults */}
        <div className="flex justify-between items-center border-t border-neutral-700 pt-2">
          <span className="uppercase text-neutral-300">Adults</span>

          <div className="flex items-center gap-3">
            <button
              disabled={adults <= 2}
              className="w-6 h-6 rounded-full border border-neutral-500 disabled:border-neutral-700 disabled:text-neutral-700 disabled:cursor-not-allowed flex items-center justify-center"
              onClick={() => setAdults(Math.max(2, adults - 1))}
              type="button"
            >
              -
            </button>
            <span>{adults}</span>
            <button
              className="w-6 h-6 rounded-full border border-neutral-500 flex items-center justify-center"
              onClick={() => setAdults(adults + 1)}
              type="button"
            >
              +
            </button>
          </div>
        </div>

        {/* Children */}
        <div className="flex justify-between items-center border-t border-neutral-700 pt-2">
          <span className="uppercase text-neutral-300">Children</span>

          <div className="flex items-center gap-3">
            <button
              disabled={children <= 0}
              className="w-6 h-6 rounded-full border border-neutral-500 disabled:border-neutral-700 disabled:text-neutral-700 disabled:cursor-not-allowed flex items-center justify-center"
              onClick={() => setChildren(Math.max(0, children - 1))}
              type="button"
            >
              -
            </button>
            <span>{children}</span>
            <button
              className="w-6 h-6 rounded-full border border-neutral-500 flex items-center justify-center"
              onClick={() => setChildren(children + 1)}
              type="button"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* ---------------------- SAVED ROOMS ---------------------- */}
      {rooms.map((room, index) => (
        <div
          key={index}
          className="border border-neutral-700 p-4 rounded space-y-3"
        >
          <div className="flex justify-between items-center">
            <p className="uppercase text-neutral-300">
              Guests ({room.roomName} — {room.property})
            </p>

            <button
              onClick={() => deleteRoom(index)}
              className="border border-neutral-600 p-2 rounded hover:bg-neutral-800"
              type="button"
            >
              🗑
            </button>
          </div>

          {/* Dates */}
          <div className="text-neutral-400 text-sm tracking-wide">
            {format(room.checkIn, "MMM dd, yy").toUpperCase()} →{" "}
            {format(room.checkOut, "MMM dd, yy").toUpperCase()}
          </div>

          {/* Adults */}
          <div className="flex justify-between items-center border-t border-neutral-700 pt-2">
            <span className="uppercase text-neutral-300">Adults</span>
            <div className="flex items-center gap-3">
              <button
                disabled={room.adults <= 2}
                className="w-6 h-6 rounded-full border border-neutral-500 disabled:border-neutral-700 disabled:text-neutral-700 disabled:cursor-not-allowed flex items-center justify-center"
                onClick={() => updateRoomGuests(index, "adults", -1)}
                type="button"
              >
                -
              </button>
              <span>{room.adults}</span>
              <button
                className="w-6 h-6 rounded-full border border-neutral-500 flex items-center justify-center"
                onClick={() => updateRoomGuests(index, "adults", +1)}
                type="button"
              >
                +
              </button>
            </div>
          </div>

          {/* Children */}
          <div className="flex justify-between items-center border-t border-neutral-700 pt-2">
            <span className="uppercase text-neutral-300">Children</span>
            <div className="flex items-center gap-3">
              <button
                disabled={room.children <= 0}
                className="w-6 h-6 rounded-full border border-neutral-500 disabled:border-neutral-700 disabled:text-neutral-700 disabled:cursor-not-allowed flex items-center justify-center"
                onClick={() => updateRoomGuests(index, "children", -1)}
                type="button"
              >
                -
              </button>
              <span>{room.children}</span>
              <button
                className="w-6 h-6 rounded-full border border-neutral-500 flex items-center justify-center"
                onClick={() => updateRoomGuests(index, "children", +1)}
                type="button"
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* ---------------------- ADD ROOM BUTTON ---------------------- */}
      <button
        onClick={addRoom}
        className="border border-neutral-600 px-4 py-2 rounded flex items-center gap-2"
        type="button"
      >
        <span className="uppercase text-xs">Add Room</span>
        <span className="text-lg">+</span>
      </button>

      {/* ---------------------- CTA ---------------------- */}
      <button
        className="w-full bg-white text-black py-3 rounded flex justify-center items-center gap-2 font-semibold"
        type="button"
      >
        CHECK AVAILABILITY <span>→</span>
      </button>
    </div>
  );
}
