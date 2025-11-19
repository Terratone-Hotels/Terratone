"use client";

export default function TabsHeader({ active = "hotel", setActive }) {
  const tabs = [
    { id: "hotel", label: "HOTEL", icon: "/dining-icon.svg" },
    { id: "dining", label: "DINING", icon: "/hotel-icon.svg" },
    { id: "event", label: "EVENT", icon: "/event-icon.svg" },
  ];

  return (
    <div className="flex gap-1.5">
      {tabs.map((t) => {
        const isActive = active === t.id;

        return (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`px-6 py-3 text-md font-medium font-barlow cursor-pointer flex items-center gap-2
              ${
                isActive
                  ? "bg-black text-white"
                  : "bg-transparent text-black hover:bg-[#EBE5DE]"
              }`}
          >
            <span>{t.label}</span>

            <img
              src={t.icon}
              alt={t.label}
              className={`w-5 h-5 object-contain 
                ${isActive ? "invert brightness-0" : "invert-0 brightness-0"}
              `}
            />
          </button>
        );
      })}
    </div>
  );
}
