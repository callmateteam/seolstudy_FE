"use client";

import type { ReactNode } from "react";
import { Clock, BookOpen, Award, ThumbsUp } from "lucide-react";
import { useIsDesktop } from "@/_hooks/useMediaQuery";

interface MenteeActivitySummaryProps {
  consecutiveDays: number;
  totalTasks: number;
  densityExcellence: number;
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl bg-gray-50 py-5">
      {icon}
      <span className="text-heading-l text-gray-900">{value}</span>
      <span className="text-label-m text-gray-500">{label}</span>
    </div>
  );
}

export default function MenteeActivitySummary({
  consecutiveDays,
  totalTasks,
  densityExcellence,
}: MenteeActivitySummaryProps) {
  const isDesktop = useIsDesktop();

  return (
    <section>
      <h2 className="text-title-l text-gray-900">활동 요약</h2>
      {isDesktop ? (
        <div className="mt-4 grid grid-cols-2 gap-4">
          <StatCard
            icon={<ThumbsUp size={24} className="text-primary-500" />}
            value={`${totalTasks}개`}
            label="총 피드백 수"
          />
          <StatCard
            icon={<Clock size={24} className="text-primary-500" />}
            value={`${consecutiveDays}일`}
            label="연속 활동일"
          />
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-3 gap-3">
          <StatCard
            icon={<Clock size={24} className="text-primary-500" />}
            value={`${consecutiveDays}일`}
            label="연속 학습"
          />
          <StatCard
            icon={<BookOpen size={24} className="text-primary-500" />}
            value={`${totalTasks}개`}
            label="완수 과제"
          />
          <StatCard
            icon={<Award size={24} className="text-primary-500" />}
            value={`${densityExcellence}%`}
            label="밀도 우수"
          />
        </div>
      )}
    </section>
  );
}
