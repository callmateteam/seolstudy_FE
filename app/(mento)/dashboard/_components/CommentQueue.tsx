"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import CommentReplyModal from "./CommentReplyModal";

export interface CommentItem {
  id: string;
  menteeName: string;
  content: string;
  registeredAt: string;
  elapsedTime: string;
  replied: boolean;
}

interface CommentQueueProps {
  items: CommentItem[];
}

export default function CommentQueue({ items }: CommentQueueProps) {
  const [selectedComment, setSelectedComment] = useState<CommentItem | null>(
    null,
  );

  const handleReplySubmit = (commentId: string, reply: string) => {
    // TODO: API 연결
    console.log("답변 등록:", commentId, reply);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-2 py-2 text-left text-label-m text-gray-500">
                멘티 이름
              </th>
              <th className="px-2 py-2 text-left text-label-m text-gray-500">
                내용
              </th>
              <th className="hidden px-2 py-2 text-left text-label-m text-gray-500 lg:table-cell">
                등록시각
              </th>
              <th className="px-2 py-2 text-left text-label-m text-gray-500">
                경과시간
              </th>
              <th className="px-2 py-2 text-left text-label-m text-gray-500">
                답변 상태
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-gray-100">
                <td className="px-2 py-3 text-label-m text-gray-900">
                  {item.menteeName}
                </td>
                <td className="max-w-50 truncate px-2 py-3 text-label-m text-gray-700">
                  {item.content}
                </td>
                <td className="hidden px-2 py-3 text-label-m text-gray-700 lg:table-cell">
                  {item.registeredAt}
                </td>
                <td className="px-2 py-3 text-label-m text-gray-700">
                  {item.elapsedTime}
                </td>
                <td className="px-2 py-3">
                  {item.replied ? (
                    <Button size="sm" variant="ghost" outlined>
                      답변완료
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => setSelectedComment(item)}
                    >
                      답변하기
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CommentReplyModal
        isOpen={!!selectedComment}
        onClose={() => setSelectedComment(null)}
        comment={selectedComment}
        onSubmit={handleReplySubmit}
      />
    </>
  );
}
