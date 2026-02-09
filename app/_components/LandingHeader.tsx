"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth";

const ROLE_CONFIG = {
  MENTEE: {
    nav: [
      { label: "플래너", href: "/planner" },
      { label: "피드백", href: "/feedback" },
    ],
    badge: "멘티",
    profileHref: "/me",
  },
  MENTOR: {
    nav: [
      { label: "대시보드", href: "/dashboard" },
      { label: "학습관리", href: "/learnManagement" },
      { label: "코칭센터", href: "/coachingCenter" },
    ],
    badge: "멘토",
    profileHref: "/mypage",
  },
  PARENT: {
    nav: [],
    badge: "학부모",
    profileHref: "/parent",
  },
} as const;

export default function LandingHeader() {
  const { user, isAuthenticated } = useAuth();
  const role = user?.role;
  const config = role ? ROLE_CONFIG[role] : null;

  return (
    <header className="border-b border-gray-200 bg-gray-50">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-20">
        <Link href="/">
          <Image alt="설스터디" src="/logos/Logo-120.svg" width={95} height={24} />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {!isAuthenticated && (
            <>
              <span className="rounded-lg px-2 py-2 text-[16px] leading-6 font-normal text-gray-700">
                학습관리
              </span>
              <span className="rounded-lg px-2 py-2 text-[16px] leading-6 font-normal text-gray-700">
                코칭관리
              </span>
              <span className="rounded-lg px-2 py-2 text-[16px] leading-6 font-normal text-gray-700">
                성장분석
              </span>
            </>
          )}
          {isAuthenticated && config && config.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-2 py-2 text-[16px] leading-6 font-normal text-gray-700 transition-colors hover:text-primary-500"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {!isAuthenticated ? (
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-label-l text-gray-900">
              로그인
            </Link>
            <Link href="/register" className="text-label-l text-gray-900">
              회원가입
            </Link>
          </div>
        ) : (
          config && (
            <Link href={config.profileHref} className="flex items-center gap-2">
              <span className="rounded-md bg-primary-500 px-2 py-0.5 text-label-m text-white">
                {config.badge}
              </span>
              <span className="text-label-l text-gray-700">{user?.name ?? ""}</span>
            </Link>
          )
        )}
      </div>
    </header>
  );
}
