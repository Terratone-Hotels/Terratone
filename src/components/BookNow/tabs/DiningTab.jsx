"use client";
import toast from "react-hot-toast";
import TerratoneToast from "@/components/TerratoneToast";

export default function DiningTab({ data, setData }) {
  const { fullName, phone, date, time, guests } = data;

  return (
    <div className="space-y-6">
      <h4 className="text-lg font-medium mb-4">Reserve a table</h4>

      <div className="space-y-4 mt-6">
        {/* FULL NAME */}
        <div className="border border-neutral-700  p-3">
          <label className="block text-xs uppercase text-black mb-1">
            Full Name *
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setData({ ...data, fullName: e.target.value })}
            placeholder="Enter your name"
            className="w-full bg-transparent outline-none text-sm text-neutral-800"
          />
        </div>

        {/* PHONE NUMBER */}
        <div className="border border-neutral-700  p-3">
          <label className="block text-xs uppercase text-black mb-1">
            Phone Number *
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            placeholder="+91 9876543210"
            className="w-full bg-transparent outline-none text-sm text-neutral-800"
          />
        </div>

        {/* DATE */}
        <div className="border border-neutral-700  p-3 cursor-pointer">
          <label className="block text-xs uppercase text-neutral-800 mb-1">
            Date *
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setData({ ...data, date: e.target.value })}
            className="w-full bg-transparent outline-none text-sm text-neutral-800 no-calendar-icon"
          />
        </div>

        {/* TIME */}
        <div className="border border-neutral-700  p-3 cursor-pointer">
          <label className="block text-xs uppercase text-neutral-800 mb-1">
            Time *
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setData({ ...data, time: e.target.value })}
            className="w-full bg-transparent outline-none text-sm text-neutral-800 no-time-icon"
          />
        </div>

        {/* NUMBER OF GUESTS */}
        <div className="border border-neutral-700  p-3">
          <label className="block text-xs uppercase text-neutral-800 mb-2">
            Number of Guests *
          </label>

          <div className="flex items-center justify-between">
            <span className="text-neutral-800">{guests}</span>

            <div className="flex gap-2">
              <button
                type="button"
                disabled={guests <= 1}
                onClick={() =>
                  setData({ ...data, guests: Math.max(1, guests - 1) })
                }
                className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-500 disabled:border-neutral-700 disabled:text-neutral-700"
              >
                -
              </button>
              <button
                type="button"
                onClick={() => setData({ ...data, guests: guests + 1 })}
                className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-500"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* SUBMIT */}
        <div className="flex w-full items-center  mt-4">
          {/* LEFT RECTANGLE BUTTON */}
          <button
            type="button"
            onClick={async () => {
              try {
                const res = await fetch("/api/dining", {
                  method: "POST",
                  body: JSON.stringify(data),
                });

                const json = await res.json();

                if (json.success) {
                  toast.custom(
                    <TerratoneToast message="Dining reservation sent!" />
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
            className="flex-1 bg-white text-black py-3 font-semibold text-sm tracking-wide uppercase hover:text-white transition-all hover:bg-green-600 border-black cursor-pointer border-1"
          >
            Reserve Table
          </button>

          {/* RIGHT CIRCLE BUTTON */}
          <button
            type="button"
            onClick={async () => {
              try {
                const res = await fetch("/api/dining", {
                  method: "POST",
                  body: JSON.stringify(data),
                });

                const json = await res.json();

                if (json.success) {
                  toast.custom(
                    <TerratoneToast message="Dining reservation sent!" />
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
            className="w-12 h-12 bg-white text-black  rounded-full flex items-center justify-center border border-black hover:text-white transition-all hover:bg-green-600 cursor-pointer "
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
