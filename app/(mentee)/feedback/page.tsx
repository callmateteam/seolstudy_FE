"use client";

import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Lightbulb } from "lucide-react";
import FeedbackAnalysisModal from "./_components/FeedbackAnalysisModal";
import { feedbackApi } from "@/lib/api/feedbackApi";
import type { FeedbackBySubjectItem, FeedbackItemWithAnalysis } from "@/lib/api/parentTypes";
import { useAuth } from "@/lib/auth";

const SUBJECTS = [
  { key: "KOREAN", label: "국어" },
  { key: "ENGLISH", label: "영어" },
  { key: "MATH", label: "수학" },
] as const;

function formatFeedbackDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const dayName = dayNames[d.getDay()];
  return `${month}월 ${day}일 (${dayName})`;
}

export default function Feedback() {
  const { profile } = useAuth();
  const menteeId = (profile as { id?: string })?.id ?? "";

  const [selectedSubject, setSelectedSubject] = useState("KOREAN");
  const [feedbacks, setFeedbacks] = useState<FeedbackBySubjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FeedbackItemWithAnalysis | null>(null);

  useEffect(() => {
    if (!menteeId) return;
    setLoading(true);
    feedbackApi
      .getBySubject(menteeId, selectedSubject)
      .then(setFeedbacks)
      .catch(() => setFeedbacks([]))
      .finally(() => setLoading(false));
  }, [menteeId, selectedSubject]);

  const handleShowAnalysis = (item: FeedbackItemWithAnalysis) => {
    setSelectedItem(item);
    setShowAnalysis(true);
  };

  const analysisData = {
    density: selectedItem?.densityScore ?? 0,
    accuracy: 0,
    focusTime: 0,
    totalTime: 0,
    weakPoints: selectedItem?.aiSummary ? [selectedItem.aiSummary] : [],
  };

  return (
    <article className="mt-7 px-5">
      <h3 className="text-heading-xl text-gray-900">피드백</h3>
      <ul className="mt-4 mb-5 flex items-center justify-between rounded-lg bg-gray-100 p-1">
        {SUBJECTS.map((s) => (
          <li
            key={s.key}
            onClick={() => setSelectedSubject(s.key)}
            className={`flex-1 cursor-pointer rounded-md px-3 py-1 text-center text-label-m ${
              selectedSubject === s.key
                ? "bg-white text-primary-500 shadow-sm"
                : "text-gray-500"
            }`}
          >
            {s.label}
          </li>
        ))}
      </ul>

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <p className="text-body-m text-gray-500">불러오는 중...</p>
        </div>
      ) : feedbacks.length === 0 ? (
        <div className="flex items-center justify-center py-10">
          <p className="text-body-m text-gray-500">피드백이 없습니다.</p>
        </div>
      ) : (
        <section>
          <Accordion
            type="single"
            collapsible
            className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3"
            defaultValue="item-0"
          >
            {feedbacks.map((feedback, fi) =>
              feedback.items.map((item, ii) => {
                const itemKey = `item-${fi}-${ii}`;
                return (
                  <AccordionItem key={itemKey} value={itemKey}>
                    <AccordionTrigger>
                      <div className="flex w-full flex-col gap-3">
                        <div>
                          <p className="text-label-s text-gray-500">
                            {formatFeedbackDate(item.taskDate)}
                          </p>
                          <p className="text-title-m text-gray-700">
                            {item.taskTitle}
                          </p>
                        </div>
                        {feedback.summary && (
                          <div className="flex w-full items-center gap-2 rounded-xl bg-primary-50 p-3">
                            <Lightbulb
                              size={18}
                              className="shrink-0 text-primary-500"
                            />
                            <p className="text-label-m text-gray-700">
                              {feedback.summary}
                            </p>
                          </div>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1">
                          <p className="text-label-m text-gray-500">피드백</p>
                          <p className="text-body-m text-gray-700">
                            {item.detail}
                          </p>
                        </div>
                        {feedback.generalComment && (
                          <div className="flex flex-col gap-1">
                            <p className="text-label-m text-gray-500">총평</p>
                            <p className="text-body-m text-gray-700">
                              {feedback.generalComment}
                            </p>
                          </div>
                        )}
                      </div>
                      {item.densityScore !== null && (
                        <>
                          <hr className="my-3 border-gray-200" />
                          <div className="flex items-center justify-between">
                            <p className="text-label-m text-gray-700">
                              학습 밀도{" "}
                              <span className="ml-3 text-success-500">
                                {item.densityScore}
                              </span>
                              /100
                            </p>
                            <button
                              type="button"
                              onClick={() => handleShowAnalysis(item)}
                              className="text-label-m cursor-pointer text-primary-500"
                            >
                              분석 결과 보기
                            </button>
                          </div>
                        </>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                );
              }),
            )}
          </Accordion>
        </section>
      )}

      <FeedbackAnalysisModal
        isOpen={showAnalysis}
        onClose={() => setShowAnalysis(false)}
        data={analysisData}
      />
    </article>
  );
}
