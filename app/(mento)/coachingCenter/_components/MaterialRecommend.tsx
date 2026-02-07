import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";

export interface MaterialItem {
  id: string;
  subject: string;
  title: string;
  difficulty: string;
  assigned: boolean;
}

interface MaterialRecommendProps {
  materials: MaterialItem[];
  onAssign: (id: string) => void;
}

export default function MaterialRecommend({ materials, onAssign }: MaterialRecommendProps) {
  return (
    <div>
      <h2 className="text-title-l text-gray-900">보완 학습지 추천</h2>
      <div className="mt-3 flex flex-col gap-3">
        {materials.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <Tag variant="primary">{item.subject}</Tag>
              <div>
                <p className="text-body-m text-gray-900">{item.title}</p>
                <p className="text-label-s text-gray-500">난이도: {item.difficulty}</p>
              </div>
            </div>
            <Button
              size="sm"
              variant="primary"
              outlined={item.assigned}
              onClick={() => onAssign(item.id)}
            >
              {item.assigned ? "배정완료" : "배정하기"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
