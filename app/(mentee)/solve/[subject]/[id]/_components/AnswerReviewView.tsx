"use client";

import { useState } from "react";

interface ReviewProblem {
  id: string;
  number: number;
  title: string;
  passage?: string;
  options: string[];
  correctIndex: number;
  selectedIndex: number;
}

interface AnswerReviewViewProps {
  problems: ReviewProblem[];
  onComplete: () => void;
}

export default function AnswerReviewView({
  problems,
  onComplete,
}: AnswerReviewViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = problems[currentIndex];
  const isCorrect = current.correctIndex === current.selectedIndex;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* 문제 탭 - 텍스트 링크 스타일 */}
      <div className="flex gap-4 overflow-x-auto px-5 pt-5">
        {problems.map((p, i) => {
          const correct = p.correctIndex === p.selectedIndex;
          const isActive = i === currentIndex;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={`shrink-0 cursor-pointer text-label-l ${
                isActive
                  ? correct
                    ? "font-bold text-success-500"
                    : "font-bold text-error-500"
                  : correct
                    ? "text-success-500"
                    : "text-error-500"
              }`}
            >
              문제 {p.number}
            </button>
          );
        })}
      </div>

      {/* 문제 내용 */}
      <div className="flex-1 px-5 pt-5">
        <p className="text-title-l text-gray-700">{current.title}</p>

        {current.passage && (
          <div className="mt-4 rounded-xl bg-gray-100 p-4">
            <p className="mb-2 text-label-l text-gray-700">&lt;보기&gt;</p>
            <p className="text-body-m text-gray-700">{current.passage}</p>
          </div>
        )}

        {/* 선택지 - 원형 번호 인디케이터 */}
        <div className="mt-4 flex flex-col gap-3">
          {current.options.map((option, i) => {
            const isSelected = i === current.selectedIndex;
            const isAnswer = i === current.correctIndex;

            let borderColor = "border-gray-200";
            let bgColor = "bg-white";
            let circleCls = "border-2 border-gray-300 text-gray-500";

            if (isAnswer) {
              borderColor = "border-success-500";
              bgColor = "bg-success-50";
              circleCls = "bg-success-500 text-white";
            } else if (isSelected && !isCorrect) {
              borderColor = "border-error-500";
              bgColor = "bg-error-50";
              circleCls = "bg-error-500 text-white";
            }

            return (
              <div
                key={i}
                className={`flex items-start gap-3 rounded-xl border p-4 ${borderColor} ${bgColor}`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-label-m ${circleCls}`}
                >
                  {i + 1}
                </span>
                <span className="text-body-m text-gray-700">{option}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-5 py-4">
        <button
          type="button"
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="cursor-pointer text-label-l text-gray-500 disabled:opacity-30"
        >
          이전 문제
        </button>
        <span className="text-label-m text-gray-400">
          {currentIndex + 1} / {problems.length}
        </span>
        {currentIndex === problems.length - 1 ? (
          <button
            type="button"
            onClick={onComplete}
            className="cursor-pointer rounded-lg bg-primary-500 px-4 py-2 text-label-l text-white"
          >
            완료
          </button>
        ) : (
          <button
            type="button"
            onClick={() =>
              setCurrentIndex((prev) =>
                Math.min(problems.length - 1, prev + 1),
              )
            }
            className="cursor-pointer text-label-l text-primary-500"
          >
            다음 문제
          </button>
        )}
      </div>
    </div>
  );
}
