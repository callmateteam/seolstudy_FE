import type { ReactNode } from "react";

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "primary" | "secondary" | "tertiary" | "ghost";

interface ButtonProps {
  children: ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
  outlined?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
}

const SIZE: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-label-m",
  md: "px-4 py-3 text-title-m",
  lg: "px-6 py-3.5 text-title-l",
};

const SOLID: Record<ButtonVariant, string> = {
  primary: "bg-primary-500 text-white",
  secondary: "bg-primary-600 text-white",
  tertiary: "bg-primary-700 text-white",
  ghost: "bg-gray-100 text-gray-700",
};

const OUTLINED: Record<ButtonVariant, string> = {
  primary: "border border-primary-500 bg-gray-50 text-primary-500",
  secondary: "border border-primary-600 bg-gray-50 text-primary-600",
  tertiary: "border border-primary-700 bg-gray-50 text-primary-700",
  ghost: "border border-gray-300 text-gray-700",
};

export default function Button({
  children,
  size = "md",
  variant = "primary",
  outlined = false,
  fullWidth = false,
  disabled = false,
  icon,
  onClick,
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg ${SIZE[size]} ${outlined ? OUTLINED[variant] : SOLID[variant]} ${fullWidth ? "w-full" : ""} ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
    >
      {icon}
      {children}
    </button>
  );
}
