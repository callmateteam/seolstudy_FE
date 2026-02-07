"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import MenteeSelector from "./_components/MenteeSelector";
import LearningChips from "./_components/LearningChips";
import type { LearningItem } from "./_components/LearningChips";
import CommentSection from "./_components/CommentSection";
import PhotoGallery from "./_components/PhotoGallery";
import AIDensityAnalysis from "./_components/AIDensityAnalysis";
import AIFeedbackDraft from "./_components/AIFeedbackDraft";
import DetailedFeedback from "./_components/DetailedFeedback";
import MaterialRecommend from "./_components/MaterialRecommend";
import type { MaterialItem } from "./_components/MaterialRecommend";
import LearningReview from "./_components/LearningReview";

const MENTEES = [
  { value: "yujin", label: "유진 (고2)" },
  { value: "minjun", label: "이민준 (고2)" },
];

const DATES = [
  { value: "2026-02-01", label: "2026. 02. 01" },
  { value: "2026-02-02", label: "2026. 02. 02" },
];

const LEARNING_ITEMS: LearningItem[] = [
  { id: "1", subject: "국어", title: "비문학 독해 3회차", status: "검토 대기" },
  { id: "2", subject: "국어", title: "비문학 독해 3회차", status: "검토 중" },
  { id: "3", subject: "국어", title: "비문학 독해 3회차", status: "전송 완료" },
];

const INITIAL_MATERIALS: MaterialItem[] = [
  { id: "1", subject: "국어", title: "국어 지문 학습", difficulty: "중", assigned: false },
  { id: "2", subject: "국어", title: "국어 지문 학습", difficulty: "중", assigned: true },
];

export default function CoachingCenter() {
  const [selectedMentee, setSelectedMentee] = useState<string | null>("yujin");
  const [selectedDate, setSelectedDate] = useState<string | null>("2026-02-01");
  const [selectedLearning, setSelectedLearning] = useState<string | null>("2");
  const [overallFeedback, setOverallFeedback] = useState("");
  const [detailedFeedback, setDetailedFeedback] = useState("");
  const [learningReview, setLearningReview] = useState("");
  const [materials, setMaterials] = useState(INITIAL_MATERIALS);

  const handleAssign = (id: string) => {
    setMaterials((prev) =>
      prev.map((m) => (m.id === id ? { ...m, assigned: !m.assigned } : m)),
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      {/* 상단: 제목 + 버튼 */}
      <div className="flex items-center justify-between">
        <h1 className="text-heading-xl text-gray-900">코칭센터</h1>
        <div className="flex gap-2">
          <Button variant="primary" outlined>
            임시저장
          </Button>
          <Button>피드백 전송하기</Button>
        </div>
      </div>

      {/* 멘티/날짜 선택 + 학습 목록 */}
      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
        <MenteeSelector
          mentees={MENTEES}
          dates={DATES}
          selectedMentee={selectedMentee}
          selectedDate={selectedDate}
          onMenteeChange={setSelectedMentee}
          onDateChange={setSelectedDate}
        />
        <div className="mt-5">
          <LearningChips
            items={LEARNING_ITEMS}
            selectedId={selectedLearning}
            onSelect={setSelectedLearning}
          />
        </div>
      </section>

      {/* 종합 피드백 */}
      <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-title-l text-gray-900">종합 피드백</h2>
        <div className="mt-4">
          <TextArea
            value={overallFeedback}
            onChange={(e) => setOverallFeedback(e.target.value)}
            placeholder="학습 총평에 대하여 작성해주세요."
            rows={4}
          />
        </div>
      </section>

      {/* 2컬럼: 좌측(코멘트/인증샷/AI분석) + 우측(피드백/추천/총평) */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* 좌측 */}
        <div className="flex flex-col gap-6">
          <CommentSection comment="영어 지문 31번 빈칸 문제 설명 다시 듣고 싶어요." />
          <PhotoGallery photos={[]} total={4} />
          <AIDensityAnalysis
            score={85}
            title="밀도 높은 학습!"
            description="풀이 과정이 충실합니다"
          />
        </div>

        {/* 우측 */}
        <div className="flex flex-col gap-6">
          <AIFeedbackDraft content="AI 피드백 초안입니다." />
          <DetailedFeedback value={detailedFeedback} onChange={setDetailedFeedback} />
          <MaterialRecommend materials={materials} onAssign={handleAssign} />
          <LearningReview value={learningReview} onChange={setLearningReview} />
        </div>
      </div>
    </div>
  );
}
