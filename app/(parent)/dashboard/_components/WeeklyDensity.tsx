import CircularProgress from "@/components/ui/CircularProgress";

interface WeeklyDensityProps {
  score: number;
  description: string;
}

export default function WeeklyDensity({
  score,
  description,
}: WeeklyDensityProps) {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-card">
      <h3 className="text-title-l text-gray-900">이번주 학습 밀도 (집중도)</h3>

      <div className="mt-4 flex flex-col items-center">
        <CircularProgress value={score} suffix="점" />
        <p className="text-body-m mt-4 text-center text-gray-700">
          {description}
        </p>
      </div>
    </section>
  );
}
