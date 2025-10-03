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

export default function Button({ children }) {
  return (
    <button className="group inline-flex items-center font-medium font-barlowNormal text-xs md:text-sm cursor-pointer">
      {/* Text Part */}
      <span className="px-3 h-8 flex items-center justify-center bg-white group-hover:bg-terra-pink text-black transition-transform duration-150 group-hover:-translate-x-1">
        {children}
      </span>

      {/* Arrow Part */}
      <span className="px-2 h-8 flex items-center justify-center bg-white group-hover:bg-terra-pink text-black transition-transform duration-150 group-hover:translate-x-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 12 10"
          className="w-[0.688rem] h-[0.625rem]"
          fill="currentColor"
        >
          <path d="M6.62604 10L5.66394 9.04609L9.00456 5.69668H0.612915V4.30332H9.00456L5.66394 0.959272L6.62604 0L11.6129 5L6.62604 10Z" />
        </svg>
      </span>
    </button>
  );
}

