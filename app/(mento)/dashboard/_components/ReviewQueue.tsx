import Tag from "@/components/ui/Tag";
import Dot from "@/components/ui/Dot";

type AiDensityStatus = "success" | "warning" | "error" | null;

export interface ReviewItem {
  id: string;
  menteeName: string;
  tags: string[];
  studyName: string;
  submittedAt: string;
  elapsedTime: string;
  aiDensityStatus: AiDensityStatus;
}

interface ReviewQueueProps {
  items: ReviewItem[];
}

function getDotColor(status: AiDensityStatus) {
  if (status === "success") return "success" as const;
  if (status === "warning") return "warning" as const;
  if (status === "error") return "error" as const;
  return "gray" as const;
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
            <tr key={item.id} className="border-t border-gray-100">
              <td className="px-2 py-3 text-label-m text-gray-900">
                {item.menteeName}
              </td>
              <td className="px-2 py-3">
                <div className="flex items-center gap-1">
                  {item.tags.map((tag) => (
                    <Tag key={tag} variant="primary">
                      {tag}
                    </Tag>
                  ))}
                </div>
              </td>
              <td className="px-2 py-3 text-label-m text-gray-700">
                {item.studyName}
              </td>
              <td className="hidden px-2 py-3 text-label-m text-gray-700 lg:table-cell">
                {item.submittedAt}
              </td>
              <td className="px-2 py-3 text-label-m text-gray-700">
                {item.elapsedTime}
              </td>
              <td className="px-2 py-3">
                <Dot size="lg" color={getDotColor(item.aiDensityStatus)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
