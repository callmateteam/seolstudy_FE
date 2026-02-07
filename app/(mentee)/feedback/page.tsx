"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Lightbulb } from "lucide-react";
import FeedbackAnalysisModal from "./_components/FeedbackAnalysisModal";

const mockAnalysis = {
  density: 87,
  accuracy: 75,
  focusTime: 42,
  totalTime: 50,
  weakPoints: [
    "논점 비교 유형에서 핵심 논점 파악 미흡",
    "문단 간 관계 파악 연습 필요",
    "선지 판단 근거 기록 부족",
  ],
};

export default function Feedback() {
  const [showAnalysis, setShowAnalysis] = useState(false);

  return (
    <article className="mt-7 px-5">
      <h3 className="text-heading-xl text-gray-900">피드백</h3>
      <ul className="mt-4 mb-5 flex items-center justify-between rounded-lg bg-gray-100 p-1">
        <li className="flex-1 cursor-pointer rounded-md bg-white px-3 py-1 text-center text-label-m text-primary-500 shadow-sm">
          국어
        </li>
        <li className="flex-1 cursor-pointer px-3 py-1 text-center text-label-m text-gray-500">
          영어
        </li>
        <li className="flex-1 cursor-pointer px-3 py-1 text-center text-label-m text-gray-500">
          수학
        </li>
      </ul>
      <section>
        <Accordion
          type="single"
          collapsible
          className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex w-full flex-col gap-3">
                <div>
                  <p className="text-label-s text-gray-500">2월 1일 (일)</p>
                  <p className="text-title-m text-gray-700">비문학 독해 3회차</p>
                </div>
                <div className="flex w-full items-center gap-2 rounded-xl bg-primary-50 p-3">
                  <Lightbulb size={18} className="shrink-0 text-primary-500" />
                  <p className="text-label-m text-gray-700">
                    글의 구조를 파악하는 연습이 필요합니다. 문단별 핵심어를 밑줄치는 습관을
                    기르세요.
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <p className="text-label-m text-gray-500">피드백</p>
                  <p className="text-body-m text-gray-700">
                    비문학 지문 3편을 풀었는데, 1번과 2번 지문은 정확도가 높았습니다. 3번 지문의
                    경우 &apos;논점 비교&apos; 유형에서 핵심 논점을 놓친 부분이 있었어요. 문단별로 핵심어를
                    체크하면서 읽는 연습을 해보세요.
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-label-m text-gray-500">총평</p>
                  <p className="text-body-m text-gray-700">
                    전반적으로 독해 속도와 정확도가 향상되고 있어요. 이 페이스를 유지하면
                    좋겠습니다. 특히 비교/대조 구조의 지문은 표로 정리하는 연습도 추천합니다.
                  </p>
                </div>
              </div>
              <hr className="my-3 border-gray-200" />
              <div className="flex items-center justify-between">
                <p className="text-label-m text-gray-700">
                  학습 밀도 <span className="ml-3 text-success-500">87</span>/100
                </p>
                <button
                  type="button"
                  onClick={() => setShowAnalysis(true)}
                  className="text-label-m cursor-pointer text-primary-500"
                >
                  분석 결과 보기
                </button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <FeedbackAnalysisModal
        isOpen={showAnalysis}
        onClose={() => setShowAnalysis(false)}
        data={mockAnalysis}
      />
    </article>
  );
}
