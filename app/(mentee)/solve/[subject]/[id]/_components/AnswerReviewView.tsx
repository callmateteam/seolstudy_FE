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
      {/* 문제 탭 */}
      <div className="flex gap-2 overflow-x-auto px-5 pt-5">
        {problems.map((p, i) => {
          const correct = p.correctIndex === p.selectedIndex;
          const isActive = i === currentIndex;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-label-l ${
                isActive
                  ? correct
                    ? "bg-success-500 text-white"
                    : "bg-error-500 text-white"
                  : correct
                    ? "text-success-500 border border-success-500 bg-white"
                    : "text-error-500 border border-error-500 bg-white"
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
            <p className="text-label-l text-gray-700 mb-2">&lt;보기&gt;</p>
            <p className="text-body-m text-gray-700">{current.passage}</p>
          </div>
        )}

        {/* 선택지 */}
        <div className="mt-4 flex flex-col gap-3">
          {current.options.map((option, i) => {
            const isSelected = i === current.selectedIndex;
            const isAnswer = i === current.correctIndex;
            let borderColor = "border-gray-200";
            let bgColor = "bg-white";

            if (isAnswer) {
              borderColor = "border-success-500";
              bgColor = "bg-success-100";
            } else if (isSelected && !isCorrect) {
              borderColor = "border-error-500";
              bgColor = "bg-error-100";
            }

            return (
              <div
                key={i}
                className={`flex items-start gap-3 rounded-xl border p-4 ${borderColor} ${bgColor}`}
              >
                <span className="text-body-m text-gray-700">
                  {i + 1}) {option}
                </span>
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
          className="text-label-l cursor-pointer text-gray-500 disabled:opacity-30"
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
            className="text-label-l cursor-pointer rounded-lg bg-primary-500 px-4 py-2 text-white"
          >
            완료
          </button>
        ) : (
          <button
            type="button"
            onClick={() =>
              setCurrentIndex((prev) => Math.min(problems.length - 1, prev + 1))
            }
            className="text-label-l cursor-pointer text-primary-500"
          >
            다음 문제
          </button>
        )}
      </div>
    </div>
  );
}
