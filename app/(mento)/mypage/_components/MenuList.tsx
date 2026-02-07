"use client";

import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface MenuItemRow {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "primary";
}

export default function MenuList() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  const items: MenuItemRow[] = [
    { label: "정산 관리" },
    { label: "코칭 가이드" },
    { label: "공지사항 및 고객센터" },
    { label: "로그아웃", onClick: handleLogout, variant: "primary" },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {items.map((item, idx) => (
        <button
          key={item.label}
          type="button"
          onClick={item.onClick}
          className={`flex w-full cursor-pointer items-center justify-between px-4 py-3.5 text-left ${
            idx < items.length - 1 ? "border-b border-gray-100" : ""
          } ${
            item.variant === "primary" ? "text-body-m text-primary-500" : "text-body-m text-gray-900"
          }`}
        >
          {item.label}
          <ChevronRight size={18} className="text-gray-400" />
        </button>
      ))}
    </div>
  );
}
