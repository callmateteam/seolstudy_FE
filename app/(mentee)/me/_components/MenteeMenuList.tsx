"use client";

import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface MenuItemRow {
  label: string;
  onClick?: () => void;
  variant?: "default" | "danger";
}

export default function MenteeMenuList() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  const items: MenuItemRow[] = [
    { label: "공지사항" },
    { label: "설정" },
    { label: "문의하기" },
    { label: "로그아웃", onClick: handleLogout, variant: "danger" },
  ];

  return (
    <div className="rounded-2xl bg-white shadow-card">
      {items.map((item, idx) => (
        <button
          key={item.label}
          type="button"
          onClick={item.onClick}
          className={`flex w-full cursor-pointer items-center justify-between px-6 py-4 text-left ${
            idx < items.length - 1 ? "border-b border-gray-100" : ""
          } ${
            item.variant === "danger"
              ? "text-body-m text-error-500"
              : "text-body-m text-gray-900"
          }`}
        >
          {item.label}
          <ChevronRight size={18} className="text-gray-400" />
        </button>
      ))}
    </div>
  );
}
