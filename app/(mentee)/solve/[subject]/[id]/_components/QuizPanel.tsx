"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

interface Problem {
  id: string;
  number: number;
  title: string;
  passage?: string;
  options: string[];
}

interface QuizPanelProps {
  problems: Problem[];
  onSubmit: (answers: Record<string, number | null>) => void;
}

export default function QuizPanel({ problems, onSubmit }: QuizPanelProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | null>>({});

  const current = problems[currentIndex];
  const isLast = currentIndex === problems.length - 1;

  const handleSelect = (optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [current.id]: optionIndex }));
  };

  const handleNext = () => {
    if (isLast) {
      onSubmit(answers);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div>
      {/* 문제 탭 */}
      <div className="flex gap-4 border-b border-gray-100 pb-3">
        {problems.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setCurrentIndex(i)}
            className={`cursor-pointer text-label-l ${
              i === currentIndex
                ? "font-semibold text-primary-500"
                : answers[p.id] !== undefined
                  ? "text-gray-500"
                  : "text-gray-400"
            }`}
          >
            문제 {p.number}
          </button>
        ))}
      </div>

      {/* 문제 내용 */}
      <div className="mt-4">
        <p className="text-title-l text-gray-900">{current.title}</p>
      </div>

      {/* 보기 */}
      {current.passage && (
        <div className="mt-4 rounded-xl bg-gray-50 p-4">
          <p className="text-label-l mb-2 text-gray-700">&lt;보기&gt;</p>
          <p className="text-body-m text-gray-700">{current.passage}</p>
        </div>
      )}

      {/* 선택지 */}
      <div className="mt-4 flex flex-col gap-3">
        {current.options.map((option, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleSelect(i)}
            className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
              answers[current.id] === i
                ? "border-primary-500 bg-primary-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-label-m ${
                answers[current.id] === i
                  ? "bg-primary-500 text-white"
                  : "border-2 border-gray-300 text-gray-500"
              }`}
            >
              {i + 1}
            </span>
            <span className="text-body-m text-gray-700">{option}</span>
          </button>
        ))}
      </div>

      {/* 다음문제 / 채점하기 버튼 */}
      <div className="mt-5">
        <Button variant="primary" size="lg" fullWidth onClick={handleNext}>
          {isLast ? "채점하기" : "다음문제"}
        </Button>
      </div>
    </div>
  );
}
