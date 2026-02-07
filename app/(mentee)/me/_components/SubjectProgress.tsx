import ProgressBar from "@/components/ui/ProgressBar";

interface SubjectData {
  icon: string;
  name: string;
  subcategories: string;
  progress: number;
  completed: number;
  total: number;
  density: number;
}

interface SubjectProgressProps {
  subjects: SubjectData[];
}

export default function SubjectProgress({ subjects }: SubjectProgressProps) {
  return (
    <section>
      <h2 className="text-title-l text-gray-900">과목별 달성률</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {subjects.map((subject) => (
          <div key={subject.name} className="rounded-2xl bg-white p-5 shadow-card">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-label-l font-semibold text-gray-700">
                {subject.icon}
              </span>
              <span className="text-title-l text-gray-900">{subject.name}</span>
              <span className="text-label-s text-gray-400">{subject.subcategories}</span>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <span className="text-label-s text-primary-500">달성률</span>
                <span className="text-heading-l text-primary-500">{subject.progress}%</span>
              </div>
              <div className="mt-1">
                <ProgressBar value={subject.progress} />
              </div>
            </div>
            <div className="mt-3 flex flex-col gap-1">
              <div className="flex items-center gap-2 text-body-m">
                <span className="text-gray-400">완수 과제</span>
                <span>
                  <span className="font-semibold text-primary-500">{subject.completed}</span>
                  <span className="text-gray-400"> / {subject.total}</span>
                </span>
              </div>
              <div className="flex items-center gap-2 text-body-m">
                <span className="text-gray-400">밀도 우수</span>
                <span className="text-gray-700">{subject.density}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
