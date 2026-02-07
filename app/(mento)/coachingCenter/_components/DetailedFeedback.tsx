import TextArea from "@/components/ui/TextArea";

interface DetailedFeedbackProps {
  value: string;
  onChange: (value: string) => void;
}

export default function DetailedFeedback({ value, onChange }: DetailedFeedbackProps) {
  return (
    <div>
      <h2 className="text-title-l text-gray-900">상세 피드백</h2>
      <div className="mt-3">
        <TextArea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="피드백을 작성해주세요."
          rows={4}
        />
      </div>
    </div>
  );
}
