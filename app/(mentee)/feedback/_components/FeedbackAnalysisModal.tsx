"use client";

import Modal from "@/components/ui/Modal";
import CircularProgress from "@/components/ui/CircularProgress";
import ProgressBar from "@/components/ui/ProgressBar";
import Button from "@/components/ui/Button";

interface FeedbackAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    density: number;
    accuracy: number;
    focusTime: number;
    totalTime: number;
    weakPoints: string[];
  };
}

export default function FeedbackAnalysisModal({
  isOpen,
  onClose,
  data,
}: FeedbackAnalysisModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex w-full max-w-md flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-heading-l text-center text-gray-900">분석 결과</h2>

        {/* 밀도 & 정확도 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white py-4">
            <CircularProgress value={data.density} label="학습 밀도" />
          </div>
          <div className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white py-4">
            <CircularProgress value={data.accuracy} label="정확도" />
          </div>
        </div>

        {/* 집중시간 */}
        <div className="rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-label-m text-gray-500">집중시간</span>
            <span className="text-label-m text-gray-700">
              {data.focusTime}분 / {data.totalTime}분
            </span>
          </div>
          <div className="mt-2">
            <ProgressBar
              value={Math.round((data.focusTime / data.totalTime) * 100)}
            />
          </div>
        </div>

        {/* 약점 분석 */}
        <div className="rounded-xl border border-gray-200 p-4">
          <p className="text-title-m text-gray-900">약점 분석</p>
          <ul className="mt-3 flex flex-col gap-2">
            {data.weakPoints.map((point) => (
              <li
                key={point}
                className="text-body-m flex items-start gap-2 text-gray-700"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <Button fullWidth onClick={onClose}>
          확인
        </Button>
      </div>
    </Modal>
  );
}
