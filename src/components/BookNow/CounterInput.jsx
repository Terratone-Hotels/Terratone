"use client";

import { useEffect, useState } from "react";

// Text input for a +/- counter: stays as free text while focused so typing
// and backspacing feel normal, and only re-pads/clamps once you blur.
export default function CounterInput({ value, min = 0, max, onCommit, className = "" }) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState(String(value).padStart(2, "0"));

  useEffect(() => {
    if (!editing) setRaw(String(value).padStart(2, "0"));
  }, [value, editing]);

  return (
    <input
      type="text"
      inputMode="numeric"
      value={raw}
      onFocus={() => setEditing(true)}
      onChange={(e) => setRaw(e.target.value.replace(/\D/g, ""))}
      onBlur={() => {
        setEditing(false);
        let n = raw === "" ? min : Number(raw);
        n = Math.max(min, n);
        if (max != null) n = Math.min(max, n);
        onCommit(n);
      }}
      className={`text-center bg-transparent outline-none ${className}`}
    />
  );
}
