import type { ReactNode } from "react";
import { ThumbsUp, Flame } from "lucide-react";

interface ActivitySummaryProps {
  summary: {
    totalFeedbacks: number;
    consecutiveDays: number;
  };
}

function StatCard({ icon, value, label }: { icon: ReactNode; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl border border-gray-200 bg-white py-5">
      {icon}
      <span className="text-heading-l text-gray-900">{value}</span>
      <span className="text-label-m text-gray-500">{label}</span>
    </div>
  );
}

export default function ActivitySummary({ summary }: ActivitySummaryProps) {
  return (
    <section>
      <h2 className="text-title-l text-gray-900">활동 요약</h2>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <StatCard
          icon={<ThumbsUp size={24} className="text-primary-500" />}
          value={`${summary.totalFeedbacks}개`}
          label="총 피드백 수"
        />
        <StatCard
          icon={<Flame size={24} className="text-primary-500" />}
          value={`${summary.consecutiveDays}일`}
          label="연속 활동일"
        />
      </div>
    </section>
  );
}
