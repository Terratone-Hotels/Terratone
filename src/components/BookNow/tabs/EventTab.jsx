"use client";

import { useState, useRef } from "react";

export default function EventTab() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [eventType, setEventType] = useState("");

  const [openRoom, setOpenRoom] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("");

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [people, setPeople] = useState("");
  const [notes, setNotes] = useState("");

  const ROOM_LIST = ["Media Room", "Conference Room", "Banquet Hall"];

  const dateRef = useRef(null);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);

  return (
    <div className="space-y-8">
      <h4 className="text-lg font-medium mb-2">Event enquiry</h4>
      <p className="text-sm text-neutral-300">
        Full form (name, email, date, guests, notes).
      </p>

      {/* CONTACT INFORMATION */}
      <div className="space-y-4">
        <input
          placeholder="FIRST NAME *"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="inputbox"
        />

        <input
          placeholder="LAST NAME *"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="inputbox"
        />

        <input
          placeholder="EMAIL ADDRESS *"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="inputbox"
        />

        <input
          placeholder="PHONE NUMBER *"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="inputbox"
        />
      </div>

      {/* EVENT DETAILS */}
      <div className="space-y-4">
        <input
          placeholder="NATURE OF THIS EVENT *"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          className="inputbox"
        />

        {/* ROOM SELECTOR */}
        <div className="border border-neutral-700 rounded p-3 relative">
          <button
            className="w-full bg-transparent outline-none text-sm text-neutral-200 uppercase text-left"
            onClick={() => setOpenRoom(!openRoom)}
            type="button"
          >
            {selectedRoom || "TYPE OF ROOM *"}
          </button>

          {openRoom && (
            <div className="dropdown">
              {ROOM_LIST.map((room) => (
                <div
                  key={room}
                  className="dropdown-item"
                  onClick={() => {
                    setSelectedRoom(room);
                    setOpenRoom(false);
                  }}
                >
                  {room}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* EVENT DATE — FULL BOX CLICKABLE */}
        <div
          className="border border-neutral-700 rounded p-3 cursor-pointer"
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
            onChange={(e) => setDate(e.target.value)}
            className="hidden-date-input"
          />
        </div>

        {/* START TIME */}
        <div
          className="border border-neutral-700 rounded p-3 cursor-pointer"
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
            onChange={(e) => setStartTime(e.target.value)}
            className="hidden-date-input"
          />
        </div>

        {/* END TIME */}
        <div
          className="border border-neutral-700 rounded p-3 cursor-pointer"
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
            onChange={(e) => setEndTime(e.target.value)}
            className="hidden-date-input"
          />
        </div>

        {/* NUMBER OF PEOPLE — SINGLE OUTER BORDER ONLY */}
        <div className="border border-neutral-700 rounded p-3 space-y-2">
          <span className="text-xs uppercase text-neutral-300">
            NUMBER OF PEOPLE *
          </span>
          <input
            type="number"
            min={1}
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-neutral-200 uppercase no-spinner"
          />
        </div>

        {/* ADDITIONAL INFORMATION — SINGLE OUTER BORDER ONLY */}
        <div className="border border-neutral-700 rounded p-3 space-y-2">
          <span className="text-xs uppercase text-neutral-300">
            ADDITIONAL INFORMATION
          </span>

          <textarea
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-neutral-200 uppercase resize-none"
          />
        </div>
      </div>

      {/* SUBMIT */}
      <button
        type="button"
        className="w-full flex items-center bg-white text-black rounded-full overflow-hidden"
      >
        <span className="flex-1 text-center py-3 uppercase tracking-wider text-sm font-medium">
          Submit Enquiry
        </span>
        <span className="w-10 h-10 bg-white border border-black rounded-full flex items-center justify-center mr-1">
          →
        </span>
      </button>

      <style>{`
        .inputbox {
          width: 100%;
          background: transparent;
          outline: none;
          border: 1px solid #3f3f3f;
          border-radius: 0.375rem;
          padding: 0.75rem;
          font-size: 0.875rem;
          text-transform: uppercase;
          color: #e5e5e5;
          letter-spacing: 0.5px;
        }

        .textarea {
          width: 100%;
          background: transparent;
          outline: none;
          border: 1px solid #3f3f3f;
          border-radius: 0.375rem;
          padding: 0.75rem;
          font-size: 0.875rem;
          text-transform: uppercase;
          color: #e5e5e5;
          letter-spacing: 0.5px;
          resize: none;
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
          background: #0e0e0e;
          border: 1px solid #3f3f3f;
          border-radius: 0.375rem;
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
          color: #e5e5e5;
        }

        .dropdown-item:hover {
          background: #1a1a1a;
        }
      `}</style>
    </div>
  );
}
