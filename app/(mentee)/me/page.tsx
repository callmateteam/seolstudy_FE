"use client";

import { useState, useEffect } from "react";
import { mockGet } from "@/app/mock";
import MenteeProfileCard from "./_components/MenteeProfileCard";
import MenteeActivitySummary from "./_components/MenteeActivitySummary";
import MenteeMenuList from "./_components/MenteeMenuList";

interface MenteeMyPageData {
  name: string;
  profileImage: string | null;
  school: string;
  grade: string;
  totalTasks: number;
  consecutiveDays: number;
}

export default function MenteeMyPage() {
  const [data, setData] = useState<MenteeMyPageData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await mockGet("/api/my/mentee");
      if (response.success) {
        setData(response.data as MenteeMyPageData);
      }
    }
    fetchData();
  }, []);

  // mock fallback
  const pageData = data ?? {
    name: "이하은",
    profileImage: null,
    school: "서울고등학교",
    grade: "고2",
    totalTasks: 42,
    consecutiveDays: 7,
  };

  return (
    <article className="mt-7 px-5">
      <h1 className="text-heading-xl text-gray-900">마이페이지</h1>

      <div className="mt-6 flex flex-col gap-6">
        <MenteeProfileCard
          name={pageData.name}
          profileImage={pageData.profileImage}
          school={pageData.school}
          grade={pageData.grade}
        />
        <MenteeActivitySummary
          totalTasks={pageData.totalTasks}
          consecutiveDays={pageData.consecutiveDays}
        />
        <MenteeMenuList />
      </div>
    </article>
  );
}
