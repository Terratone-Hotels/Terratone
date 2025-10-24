import clsx from "clsx";

export default function Bounded({
  as: Comp = "section",
  className,
  children,
  full = false,
  noPadding = false,
  ...restProps
}) {
  return (
    <Comp className={clsx(className)} {...restProps}>
      <div
        className={clsx(
          full ? "w-full px-0 py-0 " : "",
          !full && !noPadding && "px-[0.9375rem] md:px-6 mt-15 lg:mt-35"
        )}
      >
        {children}
      </div>
    </Comp>
  );
}
