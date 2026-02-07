"use client";

import { useState, useEffect } from "react";
import { Info, ChevronRight } from "lucide-react";
import { useIsDesktop } from "@/_hooks/useMediaQuery";
import Button from "@/components/ui/Button";
import ChildStatus from "../dashboard/_components/ChildStatus";
import WeeklyDensity from "../dashboard/_components/WeeklyDensity";
import MentorInfo from "../dashboard/_components/MentorInfo";
import { parentApi } from "@/lib/api/parent";
import type { ParentDashboardResponse } from "@/lib/api/parentTypes";
import { useAuth } from "@/lib/auth";

function getDensityDescription(score: number | null): string {
  if (score === null) return "학습 밀도 데이터가 아직 없습니다.";
  if (score >= 80)
    return `학습 밀도 ${score}점은 풀이 흔적이 아주 상세하고 집중력이 높았다는 의미예요. 멘토가 직접 확인한 점수입니다.`;
  if (score >= 60)
    return `학습 밀도 ${score}점은 양호한 수준이에요. 풀이 과정을 더 상세하게 기록하면 더 높은 점수를 받을 수 있어요.`;
  return `학습 밀도 ${score}점은 개선이 필요해요. 풀이 과정을 꼼꼼히 기록하는 연습이 필요합니다.`;
}

export default function ParentDashboard() {
  const isDesktop = useIsDesktop();
  const { logout } = useAuth();
  const [dashboard, setDashboard] = useState<ParentDashboardResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    parentApi
      .getDashboard()
      .then(setDashboard)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-body-m text-gray-500">불러오는 중...</p>
      </div>
    );
  }

  const completionPercent = Math.round(
    (dashboard?.todayCompletionRate ?? 0) * 100,
  );
  const densityScore = dashboard?.weeklyDensityScore ?? null;

  const completionMessage = dashboard
    ? `오늘 ${dashboard.menteeName}님은 계획한 공부의 ${completionPercent}%를 마쳤어요!${
        completionPercent >= 80
          ? " 꾸준한 학습 습관이 잡히고 있습니다."
          : completionPercent >= 50
            ? " 조금만 더 힘내면 목표에 도달할 수 있어요."
            : " 오늘 남은 학습을 마무리하도록 격려해 주세요."
      }`
    : "";

  const mentorName = dashboard?.mentor
    ? `${dashboard.mentor.name} 멘토`
    : "담당 멘토 없음";
  const mentorEducation = dashboard?.mentor
    ? `${dashboard.mentor.university} ${dashboard.mentor.department}`
    : "";

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <h1 className="text-heading-xl text-gray-900">학부모</h1>

      {/* 안내 배너 */}
      <div className="mt-4 flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-3">
        <Info size={18} className="shrink-0 text-gray-500" />
        <p className="text-body-m text-gray-700">
          부모님이 자녀의 학습 현황을 확인하는 용도입니다.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        <ChildStatus
          completionRate={completionPercent}
          message={completionMessage}
        />
        <WeeklyDensity
          score={densityScore ?? 0}
          description={getDensityDescription(densityScore)}
        />
        {dashboard?.mentor && (
          <MentorInfo name={mentorName} education={mentorEducation} />
        )}

        {/* 로그아웃 행 */}
        <button
          type="button"
          onClick={logout}
          className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white px-5 py-4"
        >
          <span className="text-body-m text-primary-500">로그아웃</span>
          <ChevronRight size={18} className="text-gray-400" />
        </button>
      </div>

      {/* 모바일: 상담 신청 고정 버튼 */}
      {!isDesktop && (
        <div className="fixed right-5 bottom-20 z-30">
          <Button variant="primary" size="sm">
            상담 신청
          </Button>
        </div>
      )}
    </div>
  );
}
