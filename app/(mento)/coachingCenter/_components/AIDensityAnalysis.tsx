"use client";

import { useState } from "react";
import CircularProgress from "@/components/ui/CircularProgress";
import Button from "@/components/ui/Button";
import ModifyJudgmentModal from "./ModifyJudgmentModal";

interface PartDensityItem {
  partNumber: number;
  partTitle: string;
  density: number;
}

interface AIDensityAnalysisProps {
  score: number;
  title: string;
  description: string;
  analysisId?: string | null;
  detailedAnalysis?: string | null;
  partDensity?: PartDensityItem[] | null;
  onConfirmJudgment?: () => void;
  onModifyJudgment?: (score: number, reason: string) => Promise<void>;
  confirmLoading?: boolean;
  onTriggerAnalysis?: () => void;
  triggerLoading?: boolean;
  modifyLoading?: boolean;
}

function getChipColor(score: number): string {
  if (score >= 80) return "bg-success-500 text-white";
  if (score >= 40) return "bg-warning-500 text-white";
  return "bg-error-500 text-white";
}

export default function AIDensityAnalysis({
  score,
  title,
  description,
  detailedAnalysis,
  partDensity,
  onConfirmJudgment,
  onModifyJudgment,
  confirmLoading,
  onTriggerAnalysis,
  triggerLoading,
  modifyLoading,
}: AIDensityAnalysisProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModifySubmit = async (modifiedScore: number, reason: string) => {
    await onModifyJudgment?.(modifiedScore, reason);
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2 className="text-title-l text-gray-900">AI 밀도 분석</h2>
      <div className="mt-3 rounded-2xl border border-gray-200 bg-white p-6">
        {/* 점수 + 타이틀 */}
        <div className="flex items-center gap-6">
          <CircularProgress value={score} />
          <div>
            <p className="text-title-l text-gray-900">{title}</p>
            <p className="text-body-m text-gray-500">{description}</p>
          </div>
        </div>

        {/* 상세 분석 (항상 표시) */}
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

        {/* 버튼 영역 */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          {score === 0 && onTriggerAnalysis ? (
            <Button
              variant="primary"
              fullWidth
              onClick={onTriggerAnalysis}
              disabled={triggerLoading}
            >
              {triggerLoading ? "분석 실행 중..." : "AI 분석 실행"}
            </Button>
          ) : (
            <>
              <Button
                variant="primary"
                outlined
                fullWidth
                onClick={() => setIsModalOpen(true)}
              >
                판정 수정
              </Button>
              <Button
                variant="primary"
                fullWidth
                onClick={onConfirmJudgment}
                disabled={confirmLoading}
              >
                {confirmLoading ? "확정 중..." : "AI 판정 그대로 확정"}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* 판정 수정 모달 */}
      <ModifyJudgmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModifySubmit}
        submitLoading={modifyLoading}
        score={score}
        title={title}
        description={description}
        detailedAnalysis={detailedAnalysis}
        partDensity={partDensity}
      />
    </div>
  );
}
