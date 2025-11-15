"use client";

export default function TabsHeader({ active = "hotel", setActive }) {
  const tabs = [
    { id: "hotel", label: "Hotel" },
    { id: "dining", label: "Dining" },
    { id: "event", label: "Event" },
  ];

  return (
    <div className="flex gap-1">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => setActive(t.id)}
          className={`px-4 py-3  text-sm font-medium border ${
            active === t.id
              ? "bg-white text-black border-white/20"
              : "bg-transparent text-neutral-300 border-neutral-700"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
