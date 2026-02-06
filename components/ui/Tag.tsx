import type { ReactNode } from "react";

type TagVariant = "primary" | "success" | "warning" | "error" | "default";

interface TagProps {
  children: ReactNode;
  variant?: TagVariant;
  outlined?: boolean;
  icon?: ReactNode;
}

const FILLED: Record<TagVariant, string> = {
  primary: "bg-primary-100 text-primary-500",
  success: "bg-success-100 text-success-700",
  warning: "bg-warning-100 text-warning-700",
  error: "bg-error-100 text-error-700",
  default: "bg-gray-100 text-gray-500",
};

const OUTLINED: Record<TagVariant, string> = {
  primary: "border border-primary-500 text-primary-500",
  success: "border border-success-300 text-success-700",
  warning: "border border-warning-300 text-warning-700",
  error: "border border-error-300 text-error-700",
  default: "border border-gray-300 text-gray-500",
};

export default function Tag({ children, variant = "default", outlined = false, icon }: TagProps) {
  return (
    <span className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-label-s ${outlined ? OUTLINED[variant] : FILLED[variant]}`}>
      {icon}
      {children}
    </span>
  );
}
