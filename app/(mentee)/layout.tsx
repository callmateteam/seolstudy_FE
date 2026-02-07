"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, MessageCircle, PenSquare, User } from "lucide-react";
import type { ReactNode } from "react";
import AuthGuard from "@/components/auth/AuthGuard";

const NAV_ITEMS = [
  { label: "플래너", href: "/planner", icon: CalendarDays },
  { label: "피드백", href: "/feedback", icon: MessageCircle },
  { label: "과제풀이", href: "/solve", icon: PenSquare },
  { label: "마이페이지", href: "/me", icon: User },
];

export default function MenteeLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AuthGuard allowedRoles={["MENTEE"]}>
      <div className="min-h-screen pb-16">
        <main>{children}</main>

        {/* 하단 네비게이션 바 */}
        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white">
          <div className="mx-auto flex h-16 max-w-lg items-center justify-around">
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center gap-0.5 ${
                    isActive ? "text-primary-500" : "text-gray-400"
                  }`}
                >
                  <Icon size={22} />
                  <span className="text-label-s">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </AuthGuard>
  );
}
