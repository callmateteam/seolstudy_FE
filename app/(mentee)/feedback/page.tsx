import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Card from "@/components/ui/Card";
import { ChevronUp, Lightbulb } from "lucide-react";
import React from "react";

export default function Feedback() {
  return (
    <article className="mt-7 px-5">
      <h3 className="text-heading-xl text-gray-900">피드백</h3>
      <ul className="mt-4 mb-5 flex items-center justify-between rounded-lg bg-gray-100 p-1">
        <li className="flex-1 cursor-pointer bg-white px-3 py-1 text-center">국어</li>
        <li className="flex-1 cursor-pointer px-3 py-1 text-center">영어</li>
        <li className="flex-1 cursor-pointer px-3 py-1 text-center">수학</li>
      </ul>
      <section>
        <Accordion
          type="single"
          collapsible
          className="flex flex-col gap-3 rounded-xl p-3 shadow-[1px_1px_4px_2px_rgba(0,0,0,0.08)]"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex w-full flex-col gap-3">
                {/* 타이틀 */}
                <div>
                  <p className="text-label-s text-gray-500">2월 1일 (일)</p>
                  <p className="text-title-m text-gray-700">비문학 독해 3회차</p>
                </div>
                {/* 한줄 피드백 */}
                <div className="bg-primary-50 flex w-full items-center gap-2 rounded-4xl p-3 shadow-[1px_1px_4px_2px_rgba(0,0,0,0.08)]">
                  <Lightbulb />
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
                    경우 ‘논점 비교' 유형에서 핵심 논점을 놓친 부분이 있었어요. 문단별로 핵심어를
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
              <hr className="my-3 border-gray-300" />
              <div className="flex items-center justify-between">
                <p className="text-label-m text-gray-700">
                  학습 밀도 <span className="text-success-500 ml-3">87</span>/100
                </p>
                <p className="text-label-m text-primary-500">분석 결과 보기</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </article>
  );
}
