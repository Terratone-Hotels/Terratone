export default function TerratoneToast({ message, icon = "✓" }) {
  return (
    <div
      className="
        px-5 py-3
        bg-[#0f0f0f]/95 
        border border-neutral-700/60
        rounded-xl 
        shadow-[0_0_20px_rgba(0,0,0,0.3)]
        flex items-center gap-3
        text-sm tracking-wide
        animate-enter
      "
    >
      <span className="text-[#c8a96a] text-lg">{icon}</span>
      <span className="text-neutral-200">{message}</span>
    </div>
  );
}
