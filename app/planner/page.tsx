import { MessageCircle } from "lucide-react";
import React from "react";
import Calendar from "./_components/Calendar";
import TodayLearning from "./_components/TodayLearning";

export default function Planner() {
  return (
    <article className="mt-7 px-5">
      <h3 className="text-heading-xl text-gray-900">유진님의 플래너</h3>
      <div className="my-4 mb-8.5 flex flex-col gap-3">
        {/* 피드백 도착 */}
        <div className="flex items-center justify-between gap-2 rounded-[20px] bg-gray-50 p-2 shadow-[1px_1px_4px_2px_rgba(0,0,0,0.08)]">
          <MessageCircle />
          <div>
            <p className="text-label-s text-gray-500">2월 1일 (일)</p>
            <p className="text-body-m text-gray-700">멘토님의 피드백이 도착했어요!</p>
          </div>
          <button className="bg-primary-500 text-label-m rounded-lg p-2 text-white">
            보러가기
          </button>
        </div>
        {/* 캘린더 */}
        <Calendar />
        {/* 질문 및 코멘트 */}
        <div className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2 shadow-[1px_1px_4px_2px_rgba(0,0,0,0.08)]">
          <p className="text-label-m text-gray-600">멘토에게 할 질문이나 코멘트를 남겨보세요</p>
          <button className="bg-primary-500 text-label-m rounded-lg p-2 text-white">등록</button>
        </div>
        {/* 오늘 학습 */}
        <TodayLearning />
        {/* 종합 피드백 */}
        <section className="flex flex-col gap-2 rounded-xl border-l border-l-gray-500 bg-gray-100 p-3 shadow-[1px_1px_4px_2px_rgba(0,0,0,0.08)]">
          <p className="text-title-l text-gray-900">종합 피드백</p>
          <p className="text-body-m text-gray-700">멘토님의 피드백이 아직 오지 않았어요</p>
        </section>
      </div>
    </article>
  );
}
