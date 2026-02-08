import { Pin } from "lucide-react";
import Tag from "@/components/ui/Tag";

type LearningStatus = "검토 대기" | "검토 중" | "전송 완료";

export interface LearningItem {
  id: string;
  subject: string;
  title: string;
  status: LearningStatus;
}

interface LearningChipsProps {
  items: LearningItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

function getChipStyle(status: LearningStatus) {
  switch (status) {
    case "검토 대기":
      return "border-gray-300 bg-white";
    case "검토 중":
      return "border-primary-500 bg-primary-50";
    case "전송 완료":
      return "border-primary-500 bg-white";
  }
}

function getStatusColor(status: LearningStatus) {
  switch (status) {
    case "검토 대기":
      return "text-gray-500";
    case "검토 중":
    case "전송 완료":
      return "text-primary-500";
  }
}

export default function LearningChips({ items, selectedId, onSelect }: LearningChipsProps) {
  return (
    <div>
      <span className="text-label-m text-gray-700">학습 목록</span>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 transition-colors ${selectedId === item.id ? "border-primary-500 bg-primary-50" : getChipStyle(item.status)}`}
          >
            <Pin size={14} className="text-gray-400" />
            <Tag variant={item.status === "검토 대기" ? "default" : "primary"}>
              {item.subject}
            </Tag>
            <span className="text-body-m text-gray-900">{item.title}</span>
            <span className={`text-label-m ${getStatusColor(item.status)}`}>
              {item.status}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
