"use client";

import { useState } from "react";
import Calendar from "./Calendar";
import { format } from "date-fns";
import toast from "react-hot-toast";
import TerratoneToast from "@/components/TerratoneToast";

export default function HotelTab({ data, setData }) {
  const { selectedProperty, adults, children, checkIn, checkOut, rooms } = data;

  const PROPERTY_LIST = ["Deluxe Suite", "Deluxe King", "Deluxe Twin"];

  // Local-only dropdown toggle
  const [openProperty, setOpenProperty] = useState(false);

  const liveRoomNumber = rooms.length + 1;

  // 🔥 Stable setter functions (fix Calendar broken clicks)
  const updateCheckIn = (v) => {
    setData((prev) => ({ ...prev, checkIn: v }));
  };

  const updateCheckOut = (v) => {
    setData((prev) => ({ ...prev, checkOut: v }));
  };

  // ---------------------- ADD ROOM ----------------------
  const addRoom = () => {
    if (!selectedProperty) {
      toast.custom(<TerratoneToast message="Please select a room type." />);
      return;
    }

    if (!checkIn || !checkOut) {
      toast.custom(
        <TerratoneToast message="Please select check-in and check-out dates." />
      );
      return;
    }

    if (adults < 1) {
      toast.custom(
        <TerratoneToast message="Please select number of guests." />
      );
      return;
    }

    // valid → create room
    const newRoom = {
      roomName: `${rooms.length + 1}`,
      property: selectedProperty,
      checkIn,
      checkOut,
      adults,
      children,
    };

    setData({
      ...data,
      rooms: [...rooms, newRoom],

      // reset
      selectedProperty: "",
      checkIn: null,
      checkOut: null,
      adults: 2,
      children: 0,
    });

    toast.custom(<TerratoneToast message="Room added!" />);
  };

  // ---------------------- DELETE ROOM ----------------------
  const deleteRoom = (index) => {
    const filtered = rooms.filter((_, i) => i !== index);

    const renumbered = filtered.map((room, i) => ({
      ...room,
      roomName: `${i + 1}`,
    }));

    setData({ ...data, rooms: renumbered });
  };

  // ---------------------- UPDATE ROOM GUESTS ----------------------
  const updateRoomGuests = (index, type, delta) => {
    const updated = rooms.map((room, i) => {
      if (i !== index) return room;

      return {
        ...room,
        adults:
          type === "adults" ? Math.max(2, room.adults + delta) : room.adults,
        children:
          type === "children"
            ? Math.max(0, room.children + delta)
            : room.children,
      };
    });

    setData({ ...data, rooms: updated });
  };

  return (
    <div className="space-y-6 text-sm">
      {/* FULL NAME */}
      {/* FULL NAME */}
      <div className="border border-neutral-700 rounded p-3">
        <label className="block text-xs uppercase text-neutral-300 mb-1">
          Full Name *
        </label>
        <input
          type="text"
          value={data.fullName || ""}
          onChange={(e) => {
            const v = e.target.value;
            if (/^[A-Za-z\s]*$/.test(v)) {
              setData((prev) => ({ ...prev, fullName: v }));
            }
          }}
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
          value={data.phone || ""}
          onChange={(e) => {
            const v = e.target.value;

            // Allow only digits AND max length 10
            if (/^\d{0,10}$/.test(v)) {
              setData((prev) => ({ ...prev, phone: v }));
            }
          }}
          placeholder="9876543210"
          className="w-full bg-transparent outline-none text-sm text-neutral-200"
        />
      </div>

      {/* PROPERTY SELECTOR */}
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

        {openProperty && (
          <div className="mt-3 space-y-2 text-white">
            {PROPERTY_LIST.map((prop) => (
              <div
                key={prop}
                className={`p-2 rounded cursor-pointer hover:bg-neutral-800 ${
                  selectedProperty === prop ? "bg-neutral-800" : ""
                }`}
                onClick={() => {
                  setData({ ...data, selectedProperty: prop });
                  setOpenProperty(false);
                }}
              >
                {prop}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DATE PICKER */}
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
          setCheckIn={updateCheckIn}
          checkOut={checkOut}
          setCheckOut={updateCheckOut}
        />
      </div>

      {/* LIVE ROOM FORM */}
      <div className="border border-neutral-700 p-4 rounded space-y-4">
        <p className="uppercase text-neutral-300">
          Guests ({liveRoomNumber}
          {selectedProperty ? ` — ${selectedProperty}` : ""})
        </p>

        {/* Adults */}
        <div className="flex justify-between items-center border-t border-neutral-700 pt-2">
          <span className="uppercase text-neutral-300">Adults</span>

          <div className="flex items-center gap-3">
            <button
              disabled={adults <= 2}
              onClick={() =>
                setData((prev) => ({
                  ...prev,
                  adults: Math.max(2, prev.adults - 1),
                }))
              }
              className="w-6 h-6 rounded-full border border-neutral-500 disabled:border-neutral-700 disabled:text-neutral-700 flex items-center justify-center"
              type="button"
            >
              -
            </button>
            <span>{adults}</span>
            <button
              onClick={() =>
                setData((prev) => ({
                  ...prev,
                  adults: prev.adults + 1,
                }))
              }
              className="w-6 h-6 rounded-full border border-neutral-500 flex items-center justify-center"
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
              onClick={() =>
                setData((prev) => ({
                  ...prev,
                  children: Math.max(0, prev.children - 1),
                }))
              }
              className="w-6 h-6 rounded-full border border-neutral-500 disabled:border-neutral-700 disabled:text-neutral-700 flex items-center justify-center"
              type="button"
            >
              -
            </button>
            <span>{children}</span>
            <button
              onClick={() =>
                setData((prev) => ({
                  ...prev,
                  children: prev.children + 1,
                }))
              }
              className="w-6 h-6 rounded-full border border-neutral-500 flex items-center justify-center"
              type="button"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* SAVED ROOMS */}
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

          <div className="text-neutral-400 text-sm tracking-wide">
            {format(room.checkIn, "MMM dd, yy").toUpperCase()} →
            {format(room.checkOut, "MMM dd, yy").toUpperCase()}
          </div>

          {/* Adults */}
          <div className="flex justify-between items-center border-t border-neutral-700 pt-2">
            <span className="uppercase text-neutral-300">Adults</span>
            <div className="flex items-center gap-3">
              <button
                disabled={room.adults <= 2}
                onClick={() => updateRoomGuests(index, "adults", -1)}
                className="w-6 h-6 rounded-full border border-neutral-500 disabled:border-neutral-700 disabled:text-neutral-700 flex items-center justify-center"
                type="button"
              >
                -
              </button>
              <span>{room.adults}</span>
              <button
                onClick={() => updateRoomGuests(index, "adults", +1)}
                className="w-6 h-6 rounded-full border border-neutral-500 flex items-center justify-center"
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
                onClick={() => updateRoomGuests(index, "children", -1)}
                className="w-6 h-6 rounded-full border border-neutral-500 disabled:border-neutral-700 disabled:text-neutral-700 flex items-center justify-center"
                type="button"
              >
                -
              </button>
              <span>{room.children}</span>
              <button
                onClick={() => updateRoomGuests(index, "children", +1)}
                className="w-6 h-6 rounded-full border border-neutral-500 flex items-center justify-center"
                type="button"
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* ADD ROOM */}
      <button
        onClick={addRoom}
        className="border border-neutral-600 px-4 py-2 rounded flex items-center gap-2"
        type="button"
      >
        <span className="uppercase text-xs">Add Room</span>
        <span className="text-lg">+</span>
      </button>

      {/* CTA */}
      {/* CTA — NEW HOTEL STYLE BUTTONS */}
      <div className="flex w-full items-center mt-2">
        {/* LEFT RECTANGLE BUTTON */}
        <button
          type="button"
          onClick={async () => {
            try {
              let finalRooms = [];

              // CASE 1: Saved rooms exist
              if (rooms.length > 0) {
                finalRooms = rooms.map((r, i) => ({
                  ...r,
                  roomName: `${i + 1}`,
                }));
              }

              // CASE 2: No saved rooms → use live form
              if (rooms.length === 0) {
                if (selectedProperty && checkIn && checkOut) {
                  finalRooms = [
                    {
                      roomName: "1",
                      property: selectedProperty,
                      checkIn,
                      checkOut,
                      adults,
                      children,
                    },
                  ];
                } else {
                  toast.custom(
                    <TerratoneToast message="Please complete the booking details." />
                  );
                  return;
                }
              }

              const payload = {
                ...data,
                fullName: data.fullName || "",
                phone: data.phone || "",
                rooms: finalRooms,
              };

              const res = await fetch("/api/hotel", {
                method: "POST",
                body: JSON.stringify(payload),
              });

              const json = await res.json();

              if (json.success) {
                const primary = finalRooms[0];
                const summary = `Booked: ${primary.property} • ${primary.adults} Adults, ${primary.children} Children`;

                toast.custom(
                  <TerratoneToast message={`Hotel enquiry sent! ${summary}`} />
                );
              } else {
                toast.custom(<TerratoneToast message="Something went wrong" />);
              }
            } catch (err) {
              toast.custom(<TerratoneToast message="Network error" />);
            }
          }}
          className="flex-1 bg-white text-black py-3  font-semibold text-sm tracking-wide uppercase"
        >
          Check Availability
        </button>

        {/* RIGHT CIRCLE BUTTON */}
        <button
          type="button"
          onClick={async () => {
            // SAME AS LEFT BUTTON — duplicate logic
            try {
              let finalRooms = [];

              if (rooms.length > 0) {
                finalRooms = rooms.map((r, i) => ({
                  ...r,
                  roomName: `${i + 1}`,
                }));
              }

              if (rooms.length === 0) {
                if (selectedProperty && checkIn && checkOut) {
                  finalRooms = [
                    {
                      roomName: "1",
                      property: selectedProperty,
                      checkIn,
                      checkOut,
                      adults,
                      children,
                    },
                  ];
                } else {
                  toast.custom(
                    <TerratoneToast message="Please complete the booking details." />
                  );
                  return;
                }
              }

              const payload = { ...data, rooms: finalRooms };

              const res = await fetch("/api/hotel", {
                method: "POST",
                body: JSON.stringify(payload),
              });

              const json = await res.json();

              if (json.success) {
                const primary = finalRooms[0];
                const summary = `Booked: ${primary.property} • ${primary.adults} Adults, ${primary.children} Children`;

                toast.custom(
                  <TerratoneToast message={`Hotel enquiry sent! ${summary}`} />
                );
              } else {
                toast.custom(<TerratoneToast message="Something went wrong" />);
              }
            } catch (err) {
              toast.custom(<TerratoneToast message="Network error" />);
            }
          }}
          className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center border border-black"
        >
          →
        </button>
      </div>
    </div>
  );
}
