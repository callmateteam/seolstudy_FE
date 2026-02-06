import type { ReactNode } from "react";

interface MenuItemProps {
  children: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export default function MenuItem({ children, isActive = false, onClick }: MenuItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-lg px-3 py-2 text-left text-body-m cursor-pointer ${isActive ? "bg-primary-50 text-primary-500" : "text-gray-700 hover:bg-gray-100"}`}
    >
      {children}
    </button>
  );
}
