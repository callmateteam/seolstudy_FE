"use client";

import { ChevronLeft } from "lucide-react";
import CircularProgress from "@/components/ui/CircularProgress";
import ProgressBar from "@/components/ui/ProgressBar";
import Button from "@/components/ui/Button";

interface PartDensity {
  part: string;
  score: number;
}

interface TraceType {
  label: string;
  value: number;
}

interface FeedbackAnalysisViewProps {
  onBack: () => void;
  data: {
    taskTitle: string;
    overallScore: number;
    scoreLabel: string;
    scoreDescription: string;
    writingRatio: number;
    traceTypes: TraceType[];
    partDensity: PartDensity[];
    mentorFeedback: string;
  };
}

function getChipColor(score: number): string {
  if (score >= 80) return "bg-success-100 text-success-700";
  if (score >= 40) return "bg-warning-100 text-warning-700";
  return "bg-error-100 text-error-700";
}

function getChipBorder(score: number): string {
  if (score >= 80) return "border-success-300";
  if (score >= 40) return "border-warning-300";
  return "border-error-300";
}

export default function FeedbackAnalysisView({
  onBack,
  data,
}: FeedbackAnalysisViewProps) {
  return (
    <article className="px-5 pb-10">
      {/* 헤더 */}
      <div className="flex items-center gap-2 py-4">
        <button type="button" onClick={onBack} className="cursor-pointer">
          <ChevronLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="text-heading-l text-gray-900">분석 결과</h1>
      </div>

      {/* 과제 타이틀 + 점수 */}
      <div className="rounded-2xl bg-white p-5 shadow-card">
        <h2 className="text-title-l text-gray-900">{data.taskTitle}</h2>
        <div className="mt-4 flex items-center gap-6">
          <CircularProgress value={data.overallScore} suffix="점" />
          <div className="flex flex-col gap-1">
            <span className="text-title-l font-bold text-gray-900">{data.scoreLabel}</span>
            <span className="text-body-m text-gray-500">{data.scoreDescription}</span>
          </div>
        </div>
      </div>

      {/* 상세 분석 */}
      <div className="mt-6 rounded-2xl bg-white p-5 shadow-card">
        <h3 className="text-title-l text-gray-900">상세 분석</h3>

        {/* 필기량 비율 */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="text-body-m text-gray-700">필기량 비율</span>
            <span className="text-body-m font-semibold text-gray-900">{data.writingRatio}%</span>
          </div>
          <div className="mt-2">
            <ProgressBar value={data.writingRatio} />
          </div>
        </div>

        <hr className="my-4 border-gray-100" />

        {/* 풀이 흔적 유형별 수치 */}
        <div>
          <p className="text-body-m font-medium text-gray-700">풀이 흔적 유형별 수치</p>
          <div className="mt-3 flex flex-col gap-3">
            {data.traceTypes.map((trace) => (
              <div key={trace.label} className="flex items-center gap-3">
                <span className="w-[72px] shrink-0 text-label-m text-gray-500">{trace.label}</span>
                <div className="flex-1">
                  <ProgressBar value={trace.value} />
                </div>
                <span className="w-10 text-right text-label-m text-gray-700">{trace.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-4 border-gray-100" />

        {/* 파트별 밀도 히트맵 */}
        <div>
          <p className="text-body-m font-medium text-gray-700">파트별 밀도 히트맵</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {data.partDensity.map((part, idx) => (
              <div
                key={`${part.part}-${idx}`}
                className={`flex flex-col items-center rounded-xl border px-4 py-2.5 ${getChipColor(part.score)} ${getChipBorder(part.score)}`}
              >
                <span className="text-label-s">{part.part}</span>
                <span className="text-title-l font-bold">{part.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 멘토 피드백 */}
      <div className="mt-6 rounded-2xl border-l-4 border-primary-500 bg-primary-50 p-5">
        <h3 className="text-title-m font-bold text-gray-900">멘토 피드백</h3>
        <p className="mt-2 text-body-m leading-relaxed text-gray-700">
          {data.mentorFeedback}
        </p>
      </div>

      {/* 하단 버튼 */}
      <div className="mt-6 flex gap-3">
        <div className="flex-1">
          <Button variant="primary" outlined fullWidth onClick={onBack}>
            다시 풀기
          </Button>
        </div>
        <div className="flex-1">
          <Button variant="primary" fullWidth>
            보완 학습지 받기
          </Button>
        </div>
      </div>
    </article>
  );
}
