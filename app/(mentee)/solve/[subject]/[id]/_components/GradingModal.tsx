"use client";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";

interface GradingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GradingModal({ isOpen, onClose }: GradingModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex w-[335px] flex-col items-center gap-6 rounded-2xl border border-gray-200 bg-white p-8">
        <p className="text-title-l text-gray-900">채점 중이에요</p>
        <Spinner size="lg" />
        <Button fullWidth variant="primary" outlined onClick={onClose}>
          닫기
        </Button>
      </div>
    </Modal>
  );
}
