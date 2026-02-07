"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <Link href="/parent" className="text-title-l text-primary-500">
            설스터디
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-label-l text-gray-700">학부모님</span>
            <button
              type="button"
              onClick={handleLogout}
              className="text-label-m cursor-pointer text-error-500"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
