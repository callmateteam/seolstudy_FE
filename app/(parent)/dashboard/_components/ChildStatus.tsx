import ProgressBar from "@/components/ui/ProgressBar";

interface ChildStatusProps {
  completionRate: number;
  message: string;
}

export default function ChildStatus({
  completionRate,
  message,
}: ChildStatusProps) {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-card">
      <h3 className="text-title-l text-gray-900">자녀 학습 현황</h3>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <p className="text-label-m text-gray-500">오늘 완수율 (성실도)</p>
          <p className="text-title-m text-primary-500">{completionRate}%</p>
        </div>
        <div className="mt-2">
          <ProgressBar value={completionRate} />
        </div>
        <p className="text-body-m mt-3 text-gray-700">{message}</p>
      </div>
    </section>
  );
}
