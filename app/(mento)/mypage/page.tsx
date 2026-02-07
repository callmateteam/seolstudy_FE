"use client";

import { useState, useEffect } from "react";
import { mentorApi } from "@/lib/api/mentor";
import type { MyPageResponse } from "@/lib/api/mentorTypes";
import ProfileCard from "./_components/ProfileCard";
import ActivitySummary from "./_components/ActivitySummary";
import MenuList from "./_components/MenuList";

export default function MyPage() {
  const [data, setData] = useState<MyPageResponse | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await mentorApi.getMyPage();
        setData(response);
      } catch {
        // 에러 시 빈 상태 유지
      }
    }
    fetchData();
  }, []);

  if (!data) return null;

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <h1 className="text-heading-xl text-gray-900">마이</h1>

      <div className="mt-10 flex flex-col gap-8">
        <ProfileCard data={data} />
        <ActivitySummary summary={data.activitySummary} />
        <MenuList />
      </div>
    </div>
  );
}
