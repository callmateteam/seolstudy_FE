import type { ReactNode } from "react";

type ChipVariant = "default" | "primary";

interface ChipProps {
  children: ReactNode;
  variant?: ChipVariant;
  outlined?: boolean;
  icon?: ReactNode;
}

const FILLED: Record<ChipVariant, string> = {
  default: "bg-gray-100 text-gray-700",
  primary: "bg-primary-100 text-primary-500",
};

const OUTLINED: Record<ChipVariant, string> = {
  default: "border border-gray-300 text-gray-700",
  primary: "border border-primary-300 text-primary-500",
};

export default function Chip({ children, variant = "default", outlined = false, icon }: ChipProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-label-m ${outlined ? OUTLINED[variant] : FILLED[variant]}`}>
      {icon}
      {children}
    </span>
  );
}
