import TextArea from "@/components/ui/TextArea";

interface LearningReviewProps {
  value: string;
  onChange: (value: string) => void;
}

export default function LearningReview({ value, onChange }: LearningReviewProps) {
  return (
    <div>
      <h2 className="text-title-l text-gray-900">학습 총평</h2>
      <div className="mt-3">
        <TextArea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="학습 총평에 대하여 작성해주세요."
          rows={5}
        />
      </div>
    </div>
  );
}
