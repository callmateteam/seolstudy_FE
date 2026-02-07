"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

interface TimeRecordModalProps {
  isOpen: boolean;
  onRetry: () => void;
  onSubmit: (minutes: number) => void;
}

export default function TimeRecordModal({
  isOpen,
  onRetry,
  onSubmit,
}: TimeRecordModalProps) {
  const [hours, setHours] = useState("01");
  const [minutes, setMinutes] = useState("30");

  const handleSubmit = () => {
    const totalMinutes = (parseInt(hours) || 0) * 60 + (parseInt(minutes) || 0);
    onSubmit(totalMinutes);
  };

  return (
    <Modal isOpen={isOpen} onClose={onRetry}>
      <div className="w-[335px] rounded-2xl bg-white p-6">
        <p className="text-title-l text-gray-900">고생하셨어요!</p>
        <p className="text-body-m mt-1 text-gray-500">
          제출하기 전 집중한 시간을 기록해주세요.
        </p>
        <div className="mt-4 flex items-center gap-2">
          <input
            type="text"
            value={hours}
            onChange={(e) => setHours(e.target.value.replace(/\D/g, "").slice(0, 2))}
            className="w-12 rounded-lg border border-gray-300 px-2 py-1.5 text-center text-body-m outline-none focus:border-primary-500"
          />
          <span className="text-body-m text-gray-500">시간</span>
          <input
            type="text"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value.replace(/\D/g, "").slice(0, 2))}
            className="w-12 rounded-lg border border-gray-300 px-2 py-1.5 text-center text-body-m outline-none focus:border-primary-500"
          />
          <span className="text-body-m text-gray-500">분</span>
        </div>
        <div className="mt-6 flex gap-3">
          <div className="flex-1">
            <Button fullWidth variant="primary" outlined onClick={onRetry}>
              다시풀기
            </Button>
          </div>
          <div className="flex-1">
            <Button fullWidth onClick={handleSubmit}>
              제출하기
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
