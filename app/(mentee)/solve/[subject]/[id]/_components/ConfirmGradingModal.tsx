"use client";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

interface ConfirmGradingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmGradingModal({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmGradingModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-[335px] rounded-2xl bg-white p-6">
        <p className="text-title-l text-gray-900">고생하셨어요!</p>
        <p className="text-body-m mt-1 text-gray-500">
          이제 채점을 시작할까요?
        </p>
        <div className="mt-6 flex gap-3">
          <div className="flex-1">
            <Button fullWidth variant="primary" outlined onClick={onClose}>
              닫기
            </Button>
          </div>
          <div className="flex-1">
            <Button fullWidth onClick={onConfirm}>
              채점하기
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
