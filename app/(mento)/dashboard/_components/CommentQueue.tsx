"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { mentorApi } from "@/lib/api/mentor";
import type { CommentQueueItem } from "@/lib/api/mentorTypes";
import CommentReplyModal from "./CommentReplyModal";

interface CommentQueueProps {
  items: CommentQueueItem[];
  onRefresh?: () => void;
}

export default function CommentQueue({ items, onRefresh }: CommentQueueProps) {
  const [selectedComment, setSelectedComment] =
    useState<CommentQueueItem | null>(null);
  const [replying, setReplying] = useState(false);

  const handleReplySubmit = async (commentId: string, reply: string) => {
    setReplying(true);
    try {
      await mentorApi.replyComment(commentId, reply);
      onRefresh?.();
    } catch {
      // 실패 시 조용히 무시 (모달은 이미 닫힘)
    } finally {
      setReplying(false);
    }
  };

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
              <tr key={item.commentId} className="border-t border-gray-100">
                <td className="px-2 py-3 text-label-m text-gray-900">
                  {item.menteeName}
                </td>
                <td className="max-w-50 truncate px-2 py-3 text-label-m text-gray-700">
                  {item.content}
                </td>
                <td className="hidden px-2 py-3 text-label-m text-gray-700 lg:table-cell">
                  {formatTime(item.createdAt)}
                </td>
                <td className="px-2 py-3 text-label-m text-gray-700">
                  {formatElapsed(item.elapsedMinutes)}
                </td>
                <td className="px-2 py-3">
                  {item.hasReply ? (
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
        loading={replying}
      />
    </>
  );
}
