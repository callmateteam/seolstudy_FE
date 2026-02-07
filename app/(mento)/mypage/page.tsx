"use client";

import { useState, useEffect } from "react";
import { mockGet } from "@/app/mock";
import ProfileCard from "./_components/ProfileCard";
import ActivitySummary from "./_components/ActivitySummary";
import MenuList from "./_components/MenuList";

interface MentorMyPageData {
  id: string;
  role: string;
  name: string;
  profileImage: string | null;
  joinedAt: string;
  university: string;
  college: string;
  department: string;
  enrollmentStatus: string;
  subjects: string[];
  activitySummary: {
    totalFeedbacks: number;
    consecutiveDays: number;
  };
}

export default function MyPage() {
  const [data, setData] = useState<MentorMyPageData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await mockGet("/api/my/mentor");
      if (response.success) {
        setData(response.data as MentorMyPageData);
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
