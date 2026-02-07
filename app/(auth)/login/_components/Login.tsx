"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import type { UserRole } from "./RoleSelect";

interface LoginProps {
  role: UserRole;
  onSubmit: (loginId: string, password: string) => void;
  isLoading?: boolean;
}

export default function Login({ role, onSubmit, isLoading }: LoginProps) {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const inputClassName =
    "h-14 w-full rounded-xl bg-gray-50 px-3 text-body-m text-gray-900 outline-none placeholder:text-gray-500";

  const handleSubmit = () => {
    if (!loginId || !password) return;
    onSubmit(loginId, password);
  };

  return (
    <article className="mt-19.5">
      <section className="mb-12 text-center">
        <Link href="/" className="text-heading-l text-primary-500 mb-1 block">설스터디</Link>
        <p className="text-label-l text-black">
          <span className="text-primary-500">
            {role === "Mentee" ? "멘티님" : role === "Mentor" ? "멘토님" : "학부모님"}{" "}
          </span>
          반가워요!
        </p>
      </section>
      <figure className="flex flex-col gap-5">
        <label className="flex flex-col gap-2">
          <p className="text-title-m text-gray-900">아이디</p>
          <input
            type="text"
            placeholder="아이디를 입력해주세요"
            className={inputClassName}
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-2">
          <p className="text-title-m text-gray-900">비밀번호</p>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            className={inputClassName}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className="flex flex-col gap-2">
          <Button onClick={handleSubmit} disabled={isLoading || !loginId || !password}>
            {isLoading ? "로그인 중..." : "로그인"}
          </Button>
          <Link href="/register">
            <Button fullWidth outlined>
              회원가입
            </Button>
          </Link>
        </div>
      </figure>
    </article>
  );
}
