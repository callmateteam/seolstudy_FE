import Tag from "@/components/ui/Tag";
import Dot from "@/components/ui/Dot";
import type { ReviewQueueItem } from "@/lib/api/mentorTypes";

interface ReviewQueueProps {
  items: ReviewQueueItem[];
}

function getDotColor(densityScore: number | null) {
  if (densityScore === null) return "gray" as const;
  if (densityScore >= 80) return "success" as const;
  if (densityScore >= 60) return "warning" as const;
  return "error" as const;
}

function formatElapsed(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${String(m).padStart(2, "0")}m`;
}

function formatTime(dateStr: string) {
  try {
    const d = new Date(dateStr);
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  } catch {
    return dateStr;
  }
}

export default function ReviewQueue({ items }: ReviewQueueProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-2 py-2 text-left text-label-m text-gray-500">
              멘티 이름
            </th>
            <th className="px-2 py-2 text-left text-label-m text-gray-500">
              과목 · 역량
            </th>
            <th className="px-2 py-2 text-left text-label-m text-gray-500">
              학습명
            </th>
            <th className="hidden px-2 py-2 text-left text-label-m text-gray-500 lg:table-cell">
              제출시각
            </th>
            <th className="px-2 py-2 text-left text-label-m text-gray-500">
              경과시간
            </th>
            <th className="px-2 py-2 text-left text-label-m text-gray-500">
              AI 밀도
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.submissionId} className="border-t border-gray-100">
              <td className="px-2 py-3 text-label-m text-gray-900">
                {item.menteeName}
              </td>
              <td className="px-2 py-3">
                <div className="flex items-center gap-1">
                  <Tag variant="primary">{item.subject}</Tag>
                  {item.abilityTag && (
                    <Tag variant="primary">{item.abilityTag}</Tag>
                  )}
                </div>
              </td>
              <td className="px-2 py-3 text-label-m text-gray-700">
                {item.taskTitle}
              </td>
              <td className="hidden px-2 py-3 text-label-m text-gray-700 lg:table-cell">
                {formatTime(item.submittedAt)}
              </td>
              <td className="px-2 py-3 text-label-m text-gray-700">
                {formatElapsed(item.elapsedMinutes)}
              </td>
              <td className="px-2 py-3">
                <Dot size="lg" color={getDotColor(item.densityScore)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
