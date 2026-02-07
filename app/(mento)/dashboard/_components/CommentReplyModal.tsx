"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import type { CommentItem } from "./CommentQueue";

interface CommentReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  comment: CommentItem | null;
  onSubmit: (commentId: string, reply: string) => void;
}

export default function CommentReplyModal({
  isOpen,
  onClose,
  comment,
  onSubmit,
}: CommentReplyModalProps) {
  const [reply, setReply] = useState("");

  const handleSubmit = () => {
    if (!comment || !reply.trim()) return;
    onSubmit(comment.id, reply);
    setReply("");
    onClose();
  };

  const handleClose = () => {
    setReply("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="rounded-2xl bg-white p-5 shadow-lg">
        {comment && (
          <div className="flex flex-col gap-4">
            {/* 멘티 코멘트 */}
            <div>
              <p className="text-label-m text-gray-500">
                {comment.menteeName}의 코멘트
              </p>
              <p className="text-body-m mt-1 text-gray-700">
                {comment.content}
              </p>
            </div>

            {/* 답변 입력 */}
            <TextArea
              label="답변"
              placeholder="답변을 입력해주세요"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              rows={4}
            />

            {/* 버튼 */}
            <div className="flex gap-2">
              <Button
                fullWidth
                variant="primary"
                outlined
                onClick={handleClose}
              >
                취소
              </Button>
              <Button
                fullWidth
                onClick={handleSubmit}
                disabled={!reply.trim()}
              >
                답변 등록
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
