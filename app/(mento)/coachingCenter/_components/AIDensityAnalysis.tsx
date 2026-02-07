"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import CircularProgress from "@/components/ui/CircularProgress";
import Button from "@/components/ui/Button";

interface AIDensityAnalysisProps {
  score: number;
  title: string;
  description: string;
}

export default function AIDensityAnalysis({ score, title, description }: AIDensityAnalysisProps) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div>
      <h2 className="text-title-l text-gray-900">AI 밀도 분석</h2>
      <div className="mt-3 rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-6">
          <CircularProgress value={score} label={`${score}점`} />
          <div>
            <p className="text-title-l text-gray-900">{title}</p>
            <p className="text-body-m text-gray-500">{description}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowDetail(!showDetail)}
          className="mt-4 flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-body-m text-gray-700"
        >
          상세 분석
          <ChevronDown
            size={16}
            className={`transition-transform ${showDetail ? "rotate-180" : ""}`}
          />
        </button>

        {showDetail && (
          <div className="mt-3 rounded-lg bg-gray-50 p-4">
            <p className="text-body-m text-gray-700">
              상세 분석 결과가 여기에 표시됩니다.
            </p>
          </div>
        )}

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button variant="primary" outlined fullWidth>
            판정 수정
          </Button>
          <Button variant="primary" fullWidth>
            AI 판정 그대로 확정
          </Button>
        </div>
      </div>
    </div>
  );
}
