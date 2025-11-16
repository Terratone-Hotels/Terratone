export default function BrandIcon({ className = "" }) {
  return (
    <div
      className={`relative flex items-center justify-center w-[110px] h-[110px] ${className}`}
    >
      <div className="brand-line-1 bg-neutral-800 w-[14px] h-[120px] mx-[18px]" />
      <div className="brand-line-2 bg-neutral-800 w-[14px] h-[120px] mx-[18px]" />
    </div>
  );
}
