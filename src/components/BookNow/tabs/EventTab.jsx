"use client";

import { useRef, useState } from "react";
import toast from "react-hot-toast";
import TerratoneToast from "@/components/TerratoneToast";

export default function EventTab({ data, setData }) {
  const {
    firstName,
    lastName,
    email,
    phone,
    eventType,
    selectedRoom,
    date,
    startTime,
    endTime,
    people,
    notes,
  } = data;

  const ROOM_LIST = ["Media Room", "Conference Room", "Banquet Hall"];

  const [openRoom, setOpenRoom] = useState(false);

  const dateRef = useRef(null);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);

  return (
    <div className="space-y-8">
      <h4 className="text-lg font-medium mb-2">Event enquiry</h4>
      <p className="text-sm text-black">
        Full form (name, email, date, guests, notes).
      </p>

      {/* CONTACT INFORMATION */}
      <div className="space-y-4">
        <input
          placeholder="FIRST NAME *"
          value={firstName}
          onChange={(e) => setData({ ...data, firstName: e.target.value })}
          className="inputbox"
        />

        <input
          placeholder="LAST NAME *"
          value={lastName}
          onChange={(e) => setData({ ...data, lastName: e.target.value })}
          className="inputbox"
        />

        <input
          placeholder="EMAIL ADDRESS *"
          type="email"
          value={email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className="inputbox"
        />

        <input
          placeholder="PHONE NUMBER *"
          value={phone}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
          className="inputbox"
        />
      </div>

      {/* EVENT DETAILS */}
      <div className="space-y-4">
        <input
          placeholder="NATURE OF THIS EVENT *"
          value={eventType}
          onChange={(e) => setData({ ...data, eventType: e.target.value })}
          className="inputbox"
        />

        {/* ROOM SELECTOR */}
        <div className="border border-neutral-700 p-3 relative flex items-center">
          <button
            className="w-full bg-transparent outline-none text-sm text-black uppercase text-left"
            onClick={() => setOpenRoom(!openRoom)}
            type="button"
          >
            {selectedRoom || "TYPE OF ROOM *"}
          </button>

          {/* Arrow */}
          <span
            className={`absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600 transition-transform duration-200 ${
              openRoom ? "rotate-180" : "rotate-0"
            }`}
          >
            ▼
          </span>

          {openRoom && (
            <div className="dropdown absolute left-0 top-full mt-2 w-full bg-white border border-neutral-700 z-10">
              {ROOM_LIST.map((room) => (
                <div
                  key={room}
                  className="dropdown-item p-2 hover:bg-neutral-200 cursor-pointer"
                  onClick={() => {
                    setData({ ...data, selectedRoom: room });
                    setOpenRoom(false);
                  }}
                >
                  {room}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* EVENT DATE */}
        <div
          className="border border-neutral-700  p-3 cursor-pointer"
          onClick={() => dateRef.current?.showPicker()}
        >
          <span
            className={`text-sm uppercase ${
              date ? "text-neutral-200" : "text-neutral-500"
            }`}
          >
            {date || "EVENT DATE *"}
          </span>

          <input
            ref={dateRef}
            type="date"
            value={date}
            onChange={(e) => setData({ ...data, date: e.target.value })}
            className="hidden-date-input"
          />
        </div>

        {/* START TIME */}
        <div
          className="border border-neutral-700  p-3 cursor-pointer"
          onClick={() => startTimeRef.current?.showPicker()}
        >
          <span
            className={`text-sm uppercase ${
              startTime ? "text-neutral-200" : "text-neutral-500"
            }`}
          >
            {startTime || "START TIME *"}
          </span>

          <input
            ref={startTimeRef}
            type="time"
            value={startTime}
            onChange={(e) => setData({ ...data, startTime: e.target.value })}
            className="hidden-date-input"
          />
        </div>

        {/* END TIME */}
        <div
          className="border border-neutral-700  p-3 cursor-pointer"
          onClick={() => endTimeRef.current?.showPicker()}
        >
          <span
            className={`text-sm uppercase ${
              endTime ? "text-neutral-200" : "text-neutral-500"
            }`}
          >
            {endTime || "END TIME *"}
          </span>

          <input
            ref={endTimeRef}
            type="time"
            value={endTime}
            onChange={(e) => setData({ ...data, endTime: e.target.value })}
            className="hidden-date-input"
          />
        </div>

        {/* NUMBER OF PEOPLE */}
        <div className="border border-neutral-700  p-3 space-y-2">
          <span className="text-xs uppercase text-neutral-800">
            NUMBER OF PEOPLE *
          </span>
          <input
            type="number"
            min={1}
            value={people}
            onChange={(e) => setData({ ...data, people: e.target.value })}
            className="w-full bg-transparent outline-none text-sm text-neutral-200 uppercase no-spinner"
          />
        </div>

        {/* ADDITIONAL INFORMATION */}
        <div className="border border-neutral-700  p-3 space-y-2">
          <span className="text-xs uppercase text-neutral-800">
            ADDITIONAL INFORMATION
          </span>

          <textarea
            rows={4}
            value={notes}
            onChange={(e) => setData({ ...data, notes: e.target.value })}
            className="w-full bg-transparent outline-none text-sm text-neutral-200 uppercase resize-none"
          />
        </div>
      </div>

      {/* SUBMIT */}

      {/* SUBMIT — NEW MATCHING CTA */}
      <div className="flex w-full items-center  mt-2">
        {/* LEFT RECTANGLE BUTTON */}
        <button
          type="button"
          onClick={async () => {
            try {
              const res = await fetch("/api/event", {
                method: "POST",
                body: JSON.stringify(data),
              });

              const json = await res.json();

              if (json.success) {
                toast.custom(
                  <TerratoneToast message="Event enquiry sent successfully!" />
                );
              } else {
                toast.custom(<TerratoneToast message="Something went wrong" />);
              }
            } catch (err) {
              toast.custom(<TerratoneToast message="Network error" />);
            }
          }}
          className="flex-1 bg-white text-black py-3  font-semibold text-sm uppercase tracking-wide border hover:text-white transition-all hover:bg-green-600 border-black cursor-pointer"
        >
          Submit Enquiry
        </button>

        {/* RIGHT CIRCLE BUTTON */}
        <button
          type="button"
          onClick={async () => {
            try {
              const res = await fetch("/api/event", {
                method: "POST",
                body: JSON.stringify(data),
              });

              const json = await res.json();

              if (json.success) {
                toast.custom(
                  <TerratoneToast message="Event enquiry sent successfully!" />
                );
              } else {
                toast.custom(<TerratoneToast message="Something went wrong" />);
              }
            } catch (err) {
              toast.custom(<TerratoneToast message="Network error" />);
            }
          }}
          className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center border hover:text-white transition-all hover:bg-green-600 border-black cursor-pointer"
        >
          →
        </button>
      </div>

      {/* styles unchanged */}
      <style>{`
        .inputbox {
          width: 100%;
          background: transparent;
          outline: none;
          border: 1px solid #3f3f3f;
        
          padding: 0.75rem;
          font-size: 0.875rem;
          text-transform: uppercase;
          color: #black;
          letter-spacing: 0.5px;
        }

        .hidden-date-input {
          position: absolute;
          opacity: 0;
          pointer-events: none;
          height: 0;
          width: 0;
        }

        .no-spinner::-webkit-inner-spin-button,
        .no-spinner::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .no-spinner {
          -moz-appearance: textfield;
        }

        .dropdown {
          background: #ffff;
          border: 1px solid #3f3f3f;
          
          width: 100%;
          overflow: hidden;
          z-index: 50;
          position: absolute;
          top: 100%;
          margin-top: 8px;
        }

        .dropdown-item {
          padding: 12px;
          text-transform: uppercase;
          cursor: pointer;
          font-size: 0.875rem;
          color: black;
        }

        .dropdown-item:hover {
          background: #E8E9EB;
        }
      `}</style>
    </div>
  );
}
