"use client";

import { useState, useEffect } from "react";
import CircularProgress from "@/components/ui/CircularProgress";
import Button from "@/components/ui/Button";

interface PartDensityItem {
  partNumber: number;
  partTitle: string;
  density: number;
}

interface ModifyJudgmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (score: number, reason: string) => void;
  submitLoading?: boolean;
  score: number;
  title: string;
  description: string;
  detailedAnalysis?: string | null;
  partDensity?: PartDensityItem[] | null;
}

function getChipColor(score: number): string {
  if (score >= 80) return "bg-success-500 text-white";
  if (score >= 40) return "bg-warning-500 text-white";
  return "bg-error-500 text-white";
}

function getSliderColor(value: number): string {
  if (value >= 80) return "var(--color-success-500)";
  if (value >= 40) return "var(--color-warning-500)";
  return "var(--color-error-500)";
}

export default function ModifyJudgmentModal({
  isOpen,
  onClose,
  onSubmit,
  submitLoading,
  score,
  title,
  description,
  detailedAnalysis,
  partDensity,
}: ModifyJudgmentModalProps) {
  const [modifiedScore, setModifiedScore] = useState(score);
  const [reason, setReason] = useState("");

  // 모달 열릴 때 초기화
  useEffect(() => {
    if (isOpen) {
      setModifiedScore(score);
      setReason("");
    }
  }, [isOpen, score]);

  if (!isOpen) return null;

  const sliderPercent = modifiedScore;
  const sliderColor = getSliderColor(modifiedScore);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 백드롭 */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* 모달 */}
      <div className="relative z-10 mx-4 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        {/* 점수 + 타이틀 */}
        <div className="flex items-center gap-6">
          <CircularProgress value={score} />
          <div>
            <p className="text-title-l text-gray-900">{title}</p>
            <p className="text-body-m text-gray-500">{description}</p>
          </div>
        </div>

        {/* 상세 분석 */}
        <div className="mt-5">
          <h3 className="text-title-m font-bold text-gray-900">상세 분석</h3>
          <p className="mt-2 text-body-m leading-relaxed text-gray-700">
            {detailedAnalysis ?? "상세 분석 결과가 여기에 표시됩니다."}
          </p>
        </div>

        {/* 파트별 밀도 히트맵 */}
        {partDensity && partDensity.length > 0 && (
          <div className="mt-5">
            <h3 className="text-title-m font-bold text-gray-900">
              파트별 밀도 히트맵
            </h3>
            <div className="mt-3 flex flex-wrap gap-3">
              {partDensity.map((part, idx) => (
                <div
                  key={`${part.partNumber}-${idx}`}
                  className={`flex flex-col items-center rounded-xl px-4 py-2.5 ${getChipColor(part.density)}`}
                >
                  <span className="text-label-s">{part.partTitle}</span>
                  <span className="text-title-l font-bold">{part.density}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 점수 변경 */}
        <div className="mt-6">
          <h3 className="text-title-m font-bold text-gray-900">점수 변경</h3>
          <div className="mt-3 flex items-center justify-center rounded-xl bg-gray-50 py-4">
            <span className="text-heading-xl text-gray-900">
              {modifiedScore}점
            </span>
          </div>
          <div className="relative mt-3">
            <input
              type="range"
              min={0}
              max={100}
              value={modifiedScore}
              onChange={(e) => setModifiedScore(Number(e.target.value))}
              className="w-full cursor-pointer"
              style={{
                accentColor: sliderColor,
                background: `linear-gradient(to right, ${sliderColor} ${sliderPercent}%, var(--color-gray-200) ${sliderPercent}%)`,
                height: "6px",
                borderRadius: "3px",
                WebkitAppearance: "none",
              }}
            />
          </div>
        </div>

        {/* 상세 분석 수정 */}
        <div className="mt-6">
          <h3 className="text-title-m font-bold text-gray-900">
            상세 분석 수정
          </h3>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="수정한 점수에 대한 분석 내용을 작성해주세요."
            rows={4}
            className="mt-3 w-full resize-none rounded-xl border border-gray-200 p-4 text-body-m text-gray-700 outline-none placeholder:text-gray-400 focus:border-primary-500"
          />
        </div>

        {/* 하단 버튼 */}
        <div className="mt-6 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">
          <Button variant="primary" outlined fullWidth onClick={onClose}>
            취소
          </Button>
          <Button
            variant="primary"
            fullWidth
            onClick={() => onSubmit(modifiedScore, reason)}
            disabled={submitLoading}
          >
            {submitLoading ? "수정 중..." : "수정 완료"}
          </Button>
        </div>
      </div>
    </div>
  );
}
