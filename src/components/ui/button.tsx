import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "outline" | "ghost";
type ButtonSize = "default" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "bg-[#459AE4] text-white shadow-[0_12px_24px_rgba(69,154,228,0.2)] hover:bg-[#3c8bd0]",
  outline:
    "border border-[#459AE4]/30 bg-white text-[#459AE4] hover:bg-[#459AE4]/5",
  ghost: "bg-transparent text-[#1f2937] hover:bg-[#459AE4]/10",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-11 px-6 py-2.5",
  icon: "h-10 w-10 p-0",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", type, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type ?? "button"}
        className={cn(
          "inline-flex cursor-pointer items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#459AE4]/40 disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button };
