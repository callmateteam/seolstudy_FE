import Avatar from "@/components/ui/Avatar";
import ProgressBar from "@/components/ui/ProgressBar";

interface MenteeCardProps {
  name: string;
  grade: string;
  subjects: string[];
  completionRate: number;
  recentDensity: number;
}

function getDensityColor(value: number) {
  if (value >= 80) return "bg-success-500";
  if (value >= 60) return "bg-warning-500";
  return "bg-error-500";
}

export default function MenteeCard({
  name,
  grade,
  subjects,
  completionRate,
  recentDensity,
}: MenteeCardProps) {
  const clampedDensity = Math.min(100, Math.max(0, recentDensity));

  return (
    <div className="flex w-68.25 flex-col gap-5 rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex items-center gap-4">
        <Avatar initials={name.charAt(0)} variant="default" size="lg" />
        <div className="flex flex-col">
          <span className="text-title-l text-gray-900">
            {name} ({grade})
          </span>
          <span className="text-body-m text-gray-500">{subjects.join(" · ")}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-label-m w-15 shrink-0 text-gray-500">완수율</span>
          <div className="flex-1">
            <ProgressBar value={completionRate} showLabel labelPosition="right" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-label-m w-15 shrink-0 text-gray-500">최근 밀도</span>
          <div className="flex flex-1 items-center gap-2">
            <div className="h-2.5 flex-1 rounded-full bg-gray-200">
              <div
                className={`h-full rounded-full transition-all ${getDensityColor(recentDensity)}`}
                style={{ width: `${clampedDensity}%` }}
              />
            </div>
            <span className="text-label-s w-8 text-gray-500">{recentDensity}점</span>
          </div>
        </div>
      </div>
    </div>
  );
}
