"use client";

import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Lightbulb } from "lucide-react";
import FeedbackAnalysisView from "./_components/FeedbackAnalysisView";
import { feedbackApi } from "@/lib/api/feedbackApi";
import type { FeedbackBySubjectItem, FeedbackItemWithAnalysis } from "@/lib/api/parentTypes";
import { menteeApi } from "@/lib/api/mentee";
import type { AnalysisResponse } from "@/lib/api/menteeTypes";
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

  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);

  const handleShowAnalysis = async (item: FeedbackItemWithAnalysis) => {
    setSelectedItem(item);
    setAnalysis(null);

    if (item.submissionId) {
      setAnalysisLoading(true);
      try {
        const result = await menteeApi.getAnalysis(item.submissionId);
        setAnalysis(result);
      } catch {
        // 분석 데이터 없으면 null 유지
      } finally {
        setAnalysisLoading(false);
      }
    }

    setShowAnalysis(true);
  };

  function getScoreLabel(score: number): string {
    if (score >= 80) return "밀도 높은 학습!";
    if (score >= 60) return "양호한 학습";
    return "보완이 필요해요";
  }

  function getScoreDescription(score: number): string {
    if (score >= 80) return "풀이 과정이 충실합니다";
    if (score >= 60) return "조금 더 꼼꼼하게 풀어보세요";
    return "풀이 흔적을 더 남겨보세요";
  }

  const overallScore = analysis?.densityScore ?? selectedItem?.densityScore ?? 0;

  const analysisData = {
    taskTitle: selectedItem?.taskTitle ?? "",
    overallScore,
    scoreLabel: getScoreLabel(overallScore),
    scoreDescription: getScoreDescription(overallScore),
    writingRatio: analysis?.writingRatio != null ? Math.min(100, Math.max(0, Math.round(analysis.writingRatio * 100))) : 0,
    traceTypes: analysis?.traceTypes
      ? [
          { label: "밑줄/메모", value: Math.min(100, Math.max(0, Math.round(analysis.traceTypes.underlineRatio * 100))) },
          { label: "메모/요약", value: Math.min(100, Math.max(0, Math.round(analysis.traceTypes.memoRatio * 100))) },
          { label: "풀이 과정", value: Math.min(100, Math.max(0, Math.round(analysis.traceTypes.solutionRatio * 100))) },
        ]
      : [],
    partDensity: analysis?.partDensity
      ? analysis.partDensity.map((p) => ({ part: p.partTitle, score: p.density }))
      : [],
    mentorFeedback: analysis?.summary ?? selectedItem?.aiSummary ?? "",
  };

  // 분석 결과 뷰 표시
  if (showAnalysis) {
    if (analysisLoading) {
      return (
        <article className="mt-7 px-5">
          <div className="flex items-center justify-center py-20">
            <p className="text-body-m text-gray-500">분석 결과 불러오는 중...</p>
          </div>
        </article>
      );
    }
    return (
      <FeedbackAnalysisView
        onBack={() => setShowAnalysis(false)}
        data={analysisData}
      />
    );
  }

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
    </article>
  );
}
