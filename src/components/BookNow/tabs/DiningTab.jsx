"use client";
import toast from "react-hot-toast";
import TerratoneToast from "@/components/TerratoneToast";
import Calendar from "./Calendar";
import { format } from "date-fns";
import ArrowIcon from "@/components/ArrowIcon";

export default function DiningTab({ data, setData }) {
  const { fullName, phone, date, guests } = data;

  // ✔ Auto-build final time string whenever hour/minute/period changes
  const updateTime = (hourValue, minuteValue, periodValue) => {
    const hour = hourValue ?? data.hour ?? "";
    const minute = minuteValue ?? data.minute ?? "";
    const period = periodValue ?? data.period ?? "AM";

    let finalTime = "";

    if (hour && minute) {
      finalTime = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")} ${period}`;
    }

    setData((prev) => ({
      ...prev,
      hour,
      minute,
      period,
      time: finalTime, // ✔ used for validation + backend send
    }));
  };

  const validate = () => {
    if (!fullName || !phone || !date || !data.time || guests < 1) {
      toast.custom(
        <TerratoneToast message="Please complete all required fields." />
      );
      return false;
    }
    return true;
  };

  // Set date from calendar
  const updateDate = (v) => {
    setData((prev) => ({ ...prev, date: v }));
  };

  return (
    <div className="space-y-6 font-barlow">
      <h4 className="text-lg uppercase  font-medium mb-4">Reserve a table</h4>

      <div className="space-y-4 mt-6">
        {/* ---------------- FULL NAME ---------------- */}
        <div className="mb-4">
          <label className="block text-[14px] tracking-wider uppercase font-medium text-neutral-500 mb-1">
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
              onChange={(e) => {
                const v = e.target.value;
                if (/^[A-Za-z\s]*$/.test(v)) {
                  setData((prev) => ({ ...prev, fullName: v }));
                }
              }}
              placeholder="John Doe"
              className="w-full bg-transparent outline-none text-[15px] text-neutral-900 placeholder:text-neutral-400"
            />
          </div>
        </div>

        {/* ---------------- PHONE NUMBER ---------------- */}
        <div className="mb-4">
          <label className="block text-[14px] tracking-wider font-medium uppercase text-neutral-500 mb-1">
            Ph. No *
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
              placeholder="+91 9213566646"
              className="w-full bg-transparent outline-none text-[15px] text-neutral-900 placeholder:text-neutral-400"
            />
          </div>
        </div>

        {/* ---------------- DATE PICKER ---------------- */}
        <div className="border border-neutral-800">
          <div className="border-b border-neutral-800 p-4">
            <p className="uppercase font-medium text-black">Select Date</p>

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
            checkOut={null}
            setCheckOut={() => {}}
            singleDate={true}
          />
        </div>

        {/* ---------------- TIME PICKER ---------------- */}
        <div className="border border-neutral-700 p-3">
          <label className="block text-xs font-medium uppercase text-neutral-800 mb-1">
            Time *
          </label>

          <div className="flex items-center gap-2">
            {/* HOUR */}
            <input
              type="number"
              min="1"
              max="12"
              value={data.hour || ""}
              onChange={(e) =>
                updateTime(e.target.value.slice(0, 2), null, null)
              }
              placeholder="Hour"
              className="
                w-14 px-3 py-2 border border-neutral-400 bg-transparent
                text-neutral-900 text-sm text-center outline-none
                [appearance:textfield]
                [&::-webkit-outer-spin-button]:appearance-none
                [&::-webkit-inner-spin-button]:appearance-none
              "
            />

            <span className="text-neutral-800 text-lg">:</span>

            {/* MINUTE */}
            <input
              type="number"
              min="0"
              max="59"
              value={data.minute || ""}
              onChange={(e) =>
                updateTime(null, e.target.value.slice(0, 2), null)
              }
              placeholder="Min"
              className="
                w-14 px-3 py-2 border border-neutral-400 bg-transparent
                text-neutral-900 text-sm text-center outline-none
                [appearance:textfield]
                [&::-webkit-outer-spin-button]:appearance-none
                [&::-webkit-inner-spin-button]:appearance-none
              "
            />

            {/* AM / PM */}
            <div className="flex border border-neutral-400">
              <button
                type="button"
                onClick={() => updateTime(null, null, "AM")}
                className={`px-3 py-2 text-sm ${
                  data.period === "AM"
                    ? "bg-black text-white"
                    : "bg-transparent text-neutral-800"
                }`}
              >
                AM
              </button>
              <button
                type="button"
                onClick={() => updateTime(null, null, "PM")}
                className={`px-3 py-2 text-sm ${
                  data.period === "PM"
                    ? "bg-black text-white"
                    : "bg-transparent text-neutral-800"
                }`}
              >
                PM
              </button>
            </div>
          </div>
        </div>

        {/* ---------------- NUMBER OF GUESTS ---------------- */}
        <div className="border border-neutral-700 p-4 space-y-4">
          <div className="flex justify-between items-center pt-2">
            <span className="uppercase font-medium text-black">Guests</span>

            <div className="flex items-center gap-3">
              {/* MINUS */}
              <button
                disabled={guests <= 1}
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    guests: Math.max(1, prev.guests - 1),
                  }))
                }
                className="w-6 h-6 font-medium bg-[#EAE4DD] flex items-center justify-center disabled:bg-neutral-200 disabled:text-neutral-500"
              >
                -
              </button>

              {/* DISPLAY */}
              <span className="w-6 font-medium text-center">
                {guests.toString().padStart(2, "0")}
              </span>

              {/* PLUS */}
              <button
                onClick={() =>
                  setData((prev) => ({
                    ...prev,
                    guests: prev.guests + 1,
                  }))
                }
                className="w-6 h-6 font-medium bg-[#EAE4DD] flex items-center justify-center disabled:bg-neutral-200 disabled:text-neutral-500"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* ---------------- SUBMIT ---------------- */}
        <div className="w-full mt-4">
          <button
            type="button"
            onClick={async () => {
              if (!validate()) return;

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
            className="w-full flex items-baseline justify-center gap-2 bg-white text-black border border-black py-3 font-semibold text-sm tracking-wide uppercase hover:text-white hover:bg-black transition-all cursor-pointer"
          >
            Reserve A Table <ArrowIcon/>
          </button>
        </div>
      </div>
    </div>
  );
}
