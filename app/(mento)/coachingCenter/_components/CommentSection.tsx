interface CommentSectionProps {
  comment: string;
}

export default function CommentSection({ comment }: CommentSectionProps) {
  return (
    <div>
      <h2 className="text-title-l text-gray-900">코멘트</h2>
      <div className="mt-3 rounded-xl bg-gray-50 px-4 py-3">
        <p className="text-body-m text-gray-700">Q. {comment}</p>
      </div>
    </div>
  );
}
