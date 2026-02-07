"use client";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

interface GradingCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewResults: () => void;
}

export default function GradingCompleteModal({
  isOpen,
  onClose,
  onViewResults,
}: GradingCompleteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex w-[335px] flex-col items-center gap-4 rounded-xl border border-gray-300 bg-gray-50 p-6">
        <p className="text-title-m text-gray-500">채점이 완료되었어요!</p>
        <Button fullWidth onClick={onViewResults}>
          결과보기
        </Button>
      </div>
    </Modal>
  );
}
