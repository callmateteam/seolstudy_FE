"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ClipboardList, BookOpen, MessageSquare, User } from "lucide-react";
import { useIsDesktop } from "@/_hooks/useMediaQuery";
import type { ReactNode } from "react";
import AuthGuard from "@/components/auth/AuthGuard";
import { useAuth } from "@/lib/auth";

const DESKTOP_NAV_ITEMS = [
  { label: "대시보드", href: "/dashboard" },
  { label: "학습관리", href: "/learnManagement" },
  { label: "코칭센터", href: "/coachingCenter" },
];

const MOBILE_NAV_ITEMS = [
  { label: "대시보드", href: "/dashboard", icon: ClipboardList },
  { label: "학습등록", href: "/learnManagement", icon: BookOpen },
  { label: "코칭센터", href: "/coachingCenter", icon: MessageSquare },
  { label: "마이", href: "/mypage", icon: User },
];

export default function MentoLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDesktop = useIsDesktop();
  const { user } = useAuth();

  return (
    <AuthGuard allowedRoles={["MENTOR"]}>
    <div className="min-h-screen">
      {/* 데스크탑 헤더 */}
      {isDesktop && (
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5">
            <Link href="/">
              <Image alt="설스터디" src="/logos/Logo-120.svg" width={95} height={24} />
            </Link>
            <nav className="flex items-center gap-8">
              {DESKTOP_NAV_ITEMS.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-label-l transition-colors ${
                      isActive
                        ? "text-primary-500"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <Link href="/mypage" className="flex items-center gap-2">
              <span className="rounded-md bg-primary-500 px-2 py-0.5 text-label-m text-white">
                멘토
              </span>
              <span className="text-label-l text-gray-700">{user?.name ?? ""}</span>
            </Link>
          </div>
        </header>
      )}

      {/* 메인 콘텐츠 */}
      <main className={!isDesktop ? "pb-16" : ""}>{children}</main>

      {/* 모바일 하단 네비게이션 바 */}
      {!isDesktop && (
        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white">
          <div className="mx-auto flex h-16 items-center justify-around">
            {MOBILE_NAV_ITEMS.map((item) => {
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
      )}
    </div>
    </AuthGuard>
  );
}
