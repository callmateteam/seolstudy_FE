"use client";

import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useIsDesktop } from "@/_hooks/useMediaQuery";
import { useAuth } from "@/lib/auth";

interface MenuItemRow {
  label: string;
  onClick?: () => void;
  variant?: "default" | "primary";
}

export default function MenteeMenuList() {
  const router = useRouter();
  const isDesktop = useIsDesktop();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const items: MenuItemRow[] = [
    { label: "목표 등급 재설정" },
    { label: "이용약관 / 개인정보처리방침" },
    { label: "로그아웃", onClick: handleLogout, variant: "primary" },
  ];

  return (
    <div className="relative">
      <div className="rounded-2xl bg-white shadow-card">
        {items.map((item, idx) => (
          <button
            key={item.label}
            type="button"
            onClick={item.onClick}
            className={`flex w-full cursor-pointer items-center justify-between px-6 py-4 text-left ${
              idx < items.length - 1 ? "border-b border-gray-100" : ""
            } ${
              item.variant === "primary"
                ? "text-body-m text-primary-500"
                : "text-body-m text-gray-900"
            }`}
          >
            {item.label}
            <ChevronRight size={18} className="text-gray-400" />
          </button>
        ))}
      </div>
      {!isDesktop && (
        <button
          type="button"
          className="fixed bottom-20 right-5 z-30 rounded-full bg-primary-500 px-5 py-2.5 text-label-l font-semibold text-white shadow-lg"
        >
          상담 신청
        </button>
      )}
    </div>
  );
}
