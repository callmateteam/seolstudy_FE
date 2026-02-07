import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";

interface ChildStatusProps {
  childName: string;
  completionRate: number;
  message: string;
}

export default function ChildStatus({
  childName,
  completionRate,
  message,
}: ChildStatusProps) {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-card">
      <h3 className="text-title-l text-gray-900">자녀 학습 현황</h3>
      <p className="text-label-m mt-1 text-gray-500">
        부모님이 자녀의 학습 현황을 확인하는 용도입니다.
      </p>

      <div className="mt-4 rounded-xl bg-gray-50 p-4">
        <div className="flex items-center justify-between">
          <p className="text-title-m text-gray-900">{childName}</p>
          <p className="text-label-m text-primary-500">{completionRate}%</p>
        </div>
        <div className="mt-2">
          <ProgressBar value={completionRate} />
        </div>
        <p className="text-body-m mt-3 text-gray-700">{message}</p>
      </div>
    </section>
  );
}
