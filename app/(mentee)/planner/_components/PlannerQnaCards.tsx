"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { Comment, Feedback } from "../_types";
import { formatDateTime } from "../_utils/transformers";
import Card from "@/components/ui/Card";

interface PlannerQnaCardsProps {
  comments: Comment[];
  feedback: Feedback | null;
}

export default function PlannerQnaCards({ comments, feedback }: PlannerQnaCardsProps) {
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);

  const handleCommentClick = (comment: Comment) => {
    setSelectedComment(comment);
  };

  const handleCloseModal = () => {
    setSelectedComment(null);
  };

  return (
    <>
      {/* 내가 남긴 코멘트 섹션 */}
      {comments.length > 0 && (
        <section className="flex flex-col gap-2 rounded-xl bg-white p-3 shadow-card">
          <p className="text-title-l text-gray-900">내가 남긴 코멘트</p>
          <div className="flex max-h-40 flex-col gap-2 overflow-y-auto">
            {comments.map((comment) => (
              <button
                key={comment.id}
                type="button"
                onClick={() => handleCommentClick(comment)}
                className="flex cursor-pointer items-center justify-between gap-2 rounded-lg p-2 text-left transition-colors hover:bg-gray-50"
              >
                <p className="text-body-m flex-1 text-gray-700">Q. {comment.content}</p>
                {comment.mentorReply ? (
                  <span className="text-label-s shrink-0 rounded-full bg-success-100 px-2 py-0.5 text-success-700">
                    답변완료
                  </span>
                ) : (
                  <span className="text-label-s shrink-0 rounded-full bg-warning-100 px-2 py-0.5 text-warning-700">
                    답변 대기중
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* 종합 피드백 섹션 */}
      {feedback && (
        <Card
          title="종합 피드백"
          description={feedback.generalComment || feedback.summary}
          variant="primary"
        />
      )}

      {/* 코멘트 상세 모달 */}
      <Modal isOpen={!!selectedComment} onClose={handleCloseModal}>
        {selectedComment && (
          <div className="rounded-2xl bg-white p-5 shadow-lg">
            <div className="space-y-4">
              {/* 질문 */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <span className="text-title-m text-gray-900">Q.</span>
                  <p className="text-body-m text-gray-700">{selectedComment.content}</p>
                </div>
                <p className="text-label-s text-right text-gray-400">
                  {formatDateTime(selectedComment.createdAt)}
                </p>
              </div>

              {/* 답변 */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <span className="text-title-m text-gray-900">A.</span>
                  {selectedComment.mentorReply ? (
                    <p className="text-body-m text-gray-700">
                      {selectedComment.mentorReply}
                    </p>
                  ) : (
                    <div className="flex flex-1 items-center gap-2 rounded-lg bg-warning-100 p-3">
                      <p className="text-body-m text-warning-700">
                        답변 대기중 — 멘토님이 곧 답변할 예정입니다.
                      </p>
                    </div>
                  )}
                </div>
                {selectedComment.repliedAt && (
                  <p className="text-label-s text-right text-gray-400">
                    {formatDateTime(selectedComment.repliedAt)}
                  </p>
                )}
              </div>
            </div>

            {/* 닫기 버튼 */}
            <button
              type="button"
              onClick={handleCloseModal}
              className="text-label-m border-primary-500 text-primary-500 mt-4 w-full cursor-pointer rounded-xl border py-3"
            >
              닫기
            </button>
          </div>
        )}
      </Modal>
    </>
  );
}
