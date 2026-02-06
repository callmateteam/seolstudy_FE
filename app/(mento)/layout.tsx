"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Avatar from "@/components/ui/Avatar";

const NAV_ITEMS = [
  { label: "대시보드", href: "/dashboard" },
  { label: "학습관리", href: "/learnManagement" },
  { label: "코칭센터", href: "/coachingCenter" },
];

export default function MentoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      <header className="h-20 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5">
          <Link href="/dashboard" className="text-title-l text-primary-500">
            설스터디
          </Link>
          <nav className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`py-2 text-label-l transition-colors ${
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
          <div className="flex items-center gap-3">
            <Avatar initials="멘토" variant="primary" size="md" />
            <span className="text-label-l text-gray-700">김서연</span>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
