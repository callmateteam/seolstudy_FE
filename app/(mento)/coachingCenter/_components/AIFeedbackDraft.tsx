import Card from "@/components/ui/Card";

interface AIFeedbackDraftProps {
  content: string;
}

export default function AIFeedbackDraft({ content }: AIFeedbackDraftProps) {
  return (
    <div>
      <h2 className="text-title-l text-gray-900">피드백</h2>
      <div className="mt-3">
        <Card title="AI 피드백 초안" description={content} />
      </div>
    </div>
  );
}
