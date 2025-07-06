/* src/components/common/Button.tsx */
import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost";
type Size = "lg" | "md" | "sm";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const base =
  "flex items-center justify-center rounded-[4px] font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed";

const variantMap: Record<Variant, string> = {
  primary: "bg-[#B3E378] text-gray-900 hover:opacity-90",
  secondary: "bg-[#262626] text-white hover:bg-[#1D1D1D]",
  ghost:
    "bg-transparent text-gray-900 hover:bg-gray-100 border border-gray-300",
};

const sizeMap: Record<Size, string> = {
  lg: "h-[50px] text-[16px]",
  md: "h-[44px] text-[14px]",
  sm: "h-[36px] text-[14px]",
};

export default function Button({
  children,
  variant = "primary",
  size = "lg",
  fullWidth = true,
  isLoading = false,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        base,
        variantMap[variant],
        sizeMap[size],
        fullWidth && "w-full",
        className
      )}
    >
      {isLoading ? "loading…" : children}
    </button>
  );
}
