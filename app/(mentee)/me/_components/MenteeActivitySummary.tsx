import type { ReactNode } from "react";
import { BookOpen, Flame } from "lucide-react";

interface MenteeActivitySummaryProps {
  totalTasks: number;
  consecutiveDays: number;
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
  totalTasks,
  consecutiveDays,
}: MenteeActivitySummaryProps) {
  return (
    <section>
      <h2 className="text-title-l text-gray-900">학습 현황</h2>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <StatCard
          icon={<BookOpen size={24} className="text-primary-500" />}
          value={`${totalTasks}개`}
          label="완료한 과제"
        />
        <StatCard
          icon={<Flame size={24} className="text-primary-500" />}
          value={`${consecutiveDays}일`}
          label="연속 학습일"
        />
      </div>
    </section>
  );
}
