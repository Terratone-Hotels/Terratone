import clsx from "clsx";

// ☾ Helper function to check if the className string contains any Tailwind margin utility class (mt-, my-, m-)
const hasMarginClass = (className) => {
  if (!className) return false;
  return /(mt-|my-|mb-|ml-|mr-|mx-|m-|gap-)/.test(className);
};

export default function Bounded({
  as: Comp = "section",
  className,
  children,
  full = false,
  noPadding = false,
  ...restProps
}) {
  // ☾ Check if the user passed any margin class in the className prop
  const skipDefaultMargin = hasMarginClass(className);

  return (
    <Comp
      className={clsx(
        !full && 
        !noPadding && 
        !skipDefaultMargin && // ☾ Only apply default margin if no conflicting class is present
        "mt-15 lg:mt-35",
        className // ☾ The user's classes always apply
      )}
      {...restProps}
    >
      <div
        className={clsx(
          full ? "w-full px-0 py-0" : "",
          !full && !noPadding && "px-[0.9375rem] md:px-6"
        )}
      >
        {children}
      </div>
    </Comp>
  );
}