import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "outlined" | "danger";
}

export function Button({ className, variant = "primary", ...rest }: Props) {
  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primaryDarker",
    outlined: "bg-transparent border-2 border-primary text-primary",
    danger: "bg-transparent border border-red-500 text-red-500",
  };

  const buttonClassName = twMerge(
    variantClasses[variant],
    "apperance-none rounded-lg p-2 text-sm font-medium shadow transition-colors",
    className
  );

  return (
    <button className={buttonClassName} {...rest}>
      {rest.children}
    </button>
  );
}
