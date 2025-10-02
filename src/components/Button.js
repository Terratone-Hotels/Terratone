import clsx from "clsx";

const ArrowIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 10"
    className={className}
    fill="currentColor"
  >
    <path d="M6.62604 10L5.66394 9.04609L9.00456 5.69668H0.612915V4.30332H9.00456L5.66394 0.959272L6.62604 0L11.6129 5L6.62604 10Z" />
  </svg>
);

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  showArrow = false,
  className,
  ...restProps
}) {
  const variants = {
    primary: "bg-white text-black border border-black hover:bg-[#E4A3A2]",
    secondary: "bg-terra-pink text-black hover:bg-white",
    outline: "border border-black text-black hover:bg-gray-100",
    ghost: "text-black hover:bg-gray-100",
  };

  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-[.1rem] font-medium transition duration-200",
        " px-[0.8125rem] h-[2rem] font-barlowNormal text-xs md:text-sm cursor-pointer ",
        variants[variant],
        fullWidth && "w-full",
        className
      )}
      {...restProps}
    >
      {children}
      {showArrow && <ArrowIcon className="w-[0.688rem] h-[0.625rem]" />}
    </button>
  );
}