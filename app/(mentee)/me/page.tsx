"use client";

import { useState, useEffect } from "react";
import { useIsDesktop } from "@/_hooks/useMediaQuery";
import { menteeApi } from "@/lib/api/mentee";
import type { MenteeMyPageResponse } from "@/lib/api/menteeTypes";
import MenteeProfileCard from "./_components/MenteeProfileCard";
import SubjectProgress from "./_components/SubjectProgress";
import MenteeActivitySummary from "./_components/MenteeActivitySummary";
import MenteeMenuList from "./_components/MenteeMenuList";

interface SubjectData {
  icon: string;
  name: string;
  subcategories: string;
  progress: number;
  completed: number;
  total: number;
  density: number;
}

const SUBJECT_META: Record<string, { icon: string; name: string; subcategories: string }> = {
  KOREAN: { icon: "가", name: "국어", subcategories: "비문학 · 문학 · 문법" },
  ENGLISH: { icon: "Aa", name: "영어", subcategories: "어휘 · 독해 · 문법" },
  MATH: { icon: "f(x)", name: "수학", subcategories: "미적분 · 확통 · 기하" },
};

function formatJoinDate(isoDate: string): string {
  const d = new Date(isoDate);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

function mapSubjectStats(stats: MenteeMyPageResponse["subjectStats"]): SubjectData[] {
  return stats.map((stat) => {
    const meta = SUBJECT_META[stat.subject] ?? { icon: "?", name: stat.subject, subcategories: "" };
    return {
      icon: meta.icon,
      name: meta.name,
      subcategories: meta.subcategories,
      progress: Math.round(stat.completionRate),
      completed: stat.completedTasks,
      total: stat.totalTasks,
      density: stat.avgDensityScore != null ? Math.round(stat.avgDensityScore) : 0,
    };
  });
}

const CONSULTATION_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfgdWIKLyMFdZdyLI9FaxO3ix1ZdLeKmta4TB-U0VwK1B6UCg/viewform";

export default function MenteeMyPage() {
  const [data, setData] = useState<MenteeMyPageResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    menteeApi
      .getMyPage()
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <article className="mt-7 px-5 lg:mx-auto lg:max-w-7xl">
        <h1 className="text-heading-xl text-gray-900">마이</h1>
        <div className="flex items-center justify-center py-20">
          <p className="text-body-m text-gray-500">로딩중...</p>
        </div>
      </article>
    );
  }

  if (!data) {
    return (
      <article className="mt-7 px-5 lg:mx-auto lg:max-w-7xl">
        <h1 className="text-heading-xl text-gray-900">마이</h1>
        <div className="flex items-center justify-center py-20">
          <p className="text-body-m text-gray-500">데이터를 불러올 수 없습니다.</p>
        </div>
      </article>
    );
  }

  const subjectNames = data.subjects.map(
    (s) => SUBJECT_META[s]?.name ?? s,
  );

  const mentorName = data.mentor
    ? `${data.mentor.name} (${data.mentor.university} ${data.mentor.department})`
    : "-";

  return (
    <article className="mt-7 px-5 lg:mx-auto lg:max-w-7xl">
      <h1 className="text-heading-xl text-gray-900">마이</h1>

      <div className="mt-6 flex flex-col gap-6 pb-8">
        <MenteeProfileCard
          name={data.name}
          profileImage={data.profileImage}
          joinDate={formatJoinDate(data.joinedAt)}
          school={data.school ?? "-"}
          grade={data.grade ?? "-"}
          subjects={subjectNames}
          mentorName={mentorName}
        />
        <SubjectProgress subjects={mapSubjectStats(data.subjectStats)} />
        <MenteeActivitySummary
          consecutiveDays={data.activitySummary?.consecutiveDays ?? 0}
          totalTasks={data.activitySummary?.totalCompletedTasks ?? 0}
          densityExcellence={data.activitySummary?.totalFeedbacks ?? 0}
        />
        <MenteeMenuList />
      </div>

      <a
        href={CONSULTATION_FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed z-50 rounded-lg bg-primary-500 px-6 py-3.5 text-title-l text-white shadow-lg hover:opacity-90 ${
          isDesktop ? "right-8 bottom-8" : "right-5 bottom-20"
        }`}
      >
        상담 받아보기
      </a>
    </article>
  );
}
