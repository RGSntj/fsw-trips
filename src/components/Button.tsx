import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

export function Button({
  className,
  ...rest
}: ComponentPropsWithoutRef<"button">) {
  const buttonClassName = twMerge(
    "apperance-none rounded-lg bg-primary p-2 text-sm font-medium text-white shadow transition-colors hover:bg-primaryDarker",
    className
  );

  return (
    <button className={buttonClassName} {...rest}>
      {rest.children}
    </button>
  );
}
