"use client";

import { MessageCircle } from "lucide-react";
import React, { useState } from "react";
import Calendar from "./_components/Calendar";
import TodayLearning from "./_components/TodayLearning";
import PlannerQnaCards from "./_components/PlannerQnaCards";
import { DateProvider, useSelectedDate } from "./_hooks/useSelectedDate";
import { usePlannerData } from "./_hooks/usePlannerData";
import { useCommentActions } from "./_hooks/useCommentActions";
import Card from "../../../components/ui/Card";

function PlannerContent() {
  const { selectedDate } = useSelectedDate();
  const { data, loading, error } = usePlannerData(selectedDate);
  const [commentText, setCommentText] = useState("");
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const { addComment, loading: submitting } = useCommentActions(selectedDate, () => {
    setRefetchTrigger((prev) => prev + 1);
  });

  const handleCommentSubmit = async () => {
    if (commentText.trim()) {
      const success = await addComment(commentText);
      if (success) {
        setCommentText("");
        window.location.reload();
      }
    }
  };

  if (loading) {
    return (
      <article className="mt-7 px-5 lg:px-10">
        <div className="flex items-center justify-center py-20">
          <p className="text-body-m text-gray-500">로딩중...</p>
        </div>
      </article>
    );
  }

  if (error || !data) {
    return (
      <article className="mt-7 px-5 lg:px-10">
        <div className="flex flex-col items-center justify-center gap-3 py-20">
          <p className="text-body-m text-error-500">
            에러 발생: {error || "데이터를 불러올 수 없습니다."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-label-m bg-primary-500 rounded-lg px-4 py-2 text-white"
          >
            다시 시도
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className="mt-7 px-5 lg:px-10">
      <h3 className="text-heading-xl text-gray-900">유진님의 플래너</h3>
      <div className="my-4 mb-8.5 flex flex-col gap-3 lg:flex-row lg:items-start lg:gap-6">
        {/* 왼쪽 섹션 */}
        <div className="flex flex-col gap-3 lg:w-[45%]">
          {/* 피드백 도착 */}
          {data.hasYesterdayFeedback && data.yesterdayFeedbackDate && (
            <div className="flex items-center justify-between gap-2 rounded-4xl bg-gray-50 p-2 shadow-[1px_1px_4px_2px_rgba(0,0,0,0.08)]">
              <MessageCircle />
              <div>
                <p className="text-label-s text-gray-500">{data.yesterdayFeedbackDate}</p>
                <p className="text-body-m text-gray-700">멘토님의 피드백이 도착했어요!</p>
              </div>
              <button className="bg-primary-500 text-label-m rounded-lg p-2 text-white">
                보러가기
              </button>
            </div>
          )}
          {/* 캘린더 */}
          <Calendar />
          {/* 질문 및 코멘트 */}
          <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2 shadow-[1px_1px_4px_2px_rgba(0,0,0,0.08)]">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCommentSubmit()}
              placeholder="멘토에게 할 질문이나 코멘트를 남겨보세요"
              className="text-label-m w-[90%] bg-transparent py-2 text-gray-600 outline-none"
            />

            <button
              onClick={handleCommentSubmit}
              disabled={!commentText.trim() || submitting}
              className="bg-primary-500 text-label-m cursor-pointer rounded-lg p-2 text-white disabled:opacity-50"
            >
              등록
            </button>
          </div>
          {/* 코멘트 & 피드백 섹션 - 데스크탑 */}
          <section className="hidden flex-col gap-3 lg:flex">
            <PlannerQnaCards comments={data.comments} feedback={data.todayFeedback} />
            {/* 피드백이 없을 때 */}
            {!data.todayFeedback && (
              <div className="flex flex-col gap-2 rounded-xl border-l-4 border-l-gray-400 bg-gray-100 p-3 shadow-[1px_1px_4px_2px_rgba(0,0,0,0.08)]">
                <p className="text-title-l text-gray-900">종합 피드백</p>
                <p className="text-body-m text-gray-700">멘토님의 피드백이 아직 오지 않았어요</p>
              </div>
            )}
          </section>
        </div>
        {/* 오른쪽 섹션 / 오늘의 학습 */}
        <div className="lg:flex-1">
          <TodayLearning tasks={data.tasks} />
        </div>
        {/* 코멘트 & 피드백 섹션 - 모바일 */}
        <section className="flex flex-col gap-3 lg:hidden">
          <PlannerQnaCards comments={data.comments} feedback={data.todayFeedback} />
          {/* 피드백이 없을 때 */}
          {!data.todayFeedback && (
            <Card title="종합 피드백" description="멘토님의 피드백이 아직 오지 않았어요" />
          )}
        </section>
      </div>
    </article>
  );
}

export default function Planner() {
  return (
    <DateProvider>
      <PlannerContent />
    </DateProvider>
  );
}
