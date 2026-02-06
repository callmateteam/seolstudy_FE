"use client";

import { useState } from "react";
import BottomSheet from "@/components/ui/BottomSheet";
import Button from "@/components/ui/Button";

interface Problem {
  id: string;
  number: number;
  title: string;
  passage?: string;
  options: string[];
}

interface SolveQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  problems?: Problem[];
  onSubmit?: (answers: Record<string, number | null>) => void;
}

const mockProblems: Problem[] = [
  {
    id: "q1",
    number: 1,
    title: "윗글을 바탕으로 <보기>를 이해한 내용을 적절하지 않은 것은?",
    passage:
      "철수는 한겨울 야외에서 운동을 한 뒤 따뜻한 실내로 들어왔다. 야외에서는 몸이 떨리고 피부가 창백했으나, 실내에 들어온 후에는 떨림이 멈추고 얼굴이 붉어졌다.",
    options: [
      "야외에서 몸이 떨린 것은 골격근 수축으로 열을 발생시키기 위한 반응이다.",
      "야외에서 몸이 떨린 것은 골격근 수축으로 열을 발생시키기 위한 반응이다.",
      "야외에서 몸이 떨린 것은 골격근 수축으로 열을 발생시키기 위한 반응이다.",
      "야외에서 몸이 떨린 것은 골격근 수축으로 열을 발생시키기 위한 반응이다.",
      "야외에서 몸이 떨린 것은 골격근 수축으로 열을 발생",
    ],
  },
  {
    id: "q2",
    number: 2,
    title: "윗글을 바탕으로 <보기>를 이해한 내용을 적절하지 않은 것은?",
    passage:
      "철수는 한겨울 야외에서 운동을 한 뒤 따뜻한 실내로 들어왔다. 야외에서는 몸이 떨리고 피부가 창백했으나, 실내에 들어온 후에는 떨림이 멈추고 얼굴이 붉어졌다.",
    options: [
      "야외에서 몸이 떨린 것은 골격근 수축으로 열을 발생시키기 위한 반응이다.",
      "야외에서 몸이 떨린 것은 골격근 수축으로 열을 발생시키기 위한 반응이다.",
      "야외에서 몸이 떨린 것은 골격근 수축으로 열을 발생시키기 위한 반응이다.",
      "야외에서 몸이 떨린 것은 골격근 수축으로 열을 발생시키기 위한 반응이다.",
      "야외에서 몸이 떨린 것은 골격근 수축으로 열을 발생",
    ],
  },
  {
    id: "q3",
    number: 3,
    title: "윗글을 바탕으로 <보기>를 이해한 내용을 적절하지 않은 것은?",
    passage:
      "철수는 한겨울 야외에서 운동을 한 뒤 따뜻한 실내로 들어왔다. 야외에서는 몸이 떨리고 피부가 창백했으나, 실내에 들어온 후에는 떨림이 멈추고 얼굴이 붉어졌다.",
    options: [
      "야외에서 몸이 떨린 것은 골격근 수축으로 열을 발생시키기 위한 반응이다.",
      "야외에서 몸이 떨린 것은 골격근 수축으로 열을 발생시키기 위한 반응이다.",
      "야외에서 몸이 떨린 것은 골격근 수축으로 열을 발생시키기 위한 반응이다.",
      "야외에서 몸이 떨린 것은 골격근 수축으로 열을 발생시키기 위한 반응이다.",
      "야외에서 몸이 떨린 것은 골격근 수축으로 열을 발생",
    ],
  },
  {
    id: "q4",
    number: 4,
    title: "윗글을 바탕으로 <보기>를 이해한 내용을 적절하지 않은 것은?",
    passage:
      "철수는 한겨울 야외에서 운동을 한 뒤 따뜻한 실내로 들어왔다. 야외에서는 몸이 떨리고 피부가 창백했으나, 실내에 들어온 후에는 떨림이 멈추고 얼굴이 붉어졌다.",
    options: [
      "야외에서 몸이 떨린 것은 골격근 수축으로 열을 발생시키기 위한 반응이다.",
      "야외에서 몸이 떨린 것은 골격근 수축으로 열을 발생시키기 위한 반응이다.",
      "야외에서 몸이 떨린 것은 골격근 수축으로 열을 발생시키기 위한 반응이다.",
      "야외에서 몸이 떨린 것은 골격근 수축으로 열을 발생시키기 위한 반응이다.",
      "야외에서 몸이 떨린 것은 골격근 수축으로 열을 발생",
    ],
  },
];

export default function SolveQuizModal({
  isOpen,
  onClose,
  problems = mockProblems,
  onSubmit,
}: SolveQuizModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | null>>({});

  const currentProblem = problems[currentIndex];

  const handleSelectAnswer = (optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentProblem.id]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    onSubmit?.(answers);
    console.log("채점 결과:", answers);
  };

  const handleClose = () => {
    setCurrentIndex(0);
    setAnswers({});
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={handleClose}>
      <div className="p-5">
        {/* 문제 탭 */}
        <div className="mb-5 flex gap-2 overflow-x-auto">
          {problems.map((problem, index) => (
            <button
              key={problem.id}
              onClick={() => setCurrentIndex(index)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-label-l transition-colors ${
                index === currentIndex
                  ? "bg-primary-500 text-white"
                  : answers[problem.id] !== undefined
                    ? "border border-primary-500 bg-primary-100 text-primary-500"
                    : "bg-gray-100 text-gray-600"
              }`}
            >
              문제 {problem.number}
            </button>
          ))}
        </div>

        {/* 문제 내용 */}
        <div className="mb-5">
          <p className="text-title-l text-gray-900">{currentProblem.title}</p>
        </div>

        {/* 보기 */}
        {currentProblem.passage && (
          <div className="mb-5 rounded-xl bg-gray-50 p-4">
            <p className="text-label-l text-gray-700 mb-2">&lt;보기&gt;</p>
            <p className="text-body-m text-gray-700">
              {currentProblem.passage}
            </p>
          </div>
        )}

        {/* 선택지 */}
        <div className="mb-5 flex flex-col gap-3">
          {currentProblem.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectAnswer(index)}
              className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
                answers[currentProblem.id] === index
                  ? "border-primary-500 bg-primary-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              {/* 라디오 인디케이터 */}
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  answers[currentProblem.id] === index
                    ? "border-primary-500"
                    : "border-gray-300"
                }`}
              >
                {answers[currentProblem.id] === index && (
                  <span className="h-2.5 w-2.5 rounded-full bg-primary-500" />
                )}
              </span>
              <span className="text-body-m text-gray-700">
                {index + 1}) {option}
              </span>
            </button>
          ))}
        </div>

        {/* 채점하기 버튼 */}
        <Button variant="primary" size="lg" fullWidth onClick={handleSubmit}>
          채점하기
        </Button>
      </div>
    </BottomSheet>
  );
}
