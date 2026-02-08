"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import { mentorApi } from "@/lib/api/mentor";
import type {
  MenteeListItem,
  CoachingSessionResponse,
  TaskCoachingItem,
} from "@/lib/api/mentorTypes";
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

const SUBJECT_DISPLAY: Record<string, string> = {
  KOREAN: "국어",
  ENGLISH: "영어",
  MATH: "수학",
};

const GRADE_DISPLAY: Record<string, string> = {
  HIGH1: "고1", HIGH2: "고2", HIGH3: "고3",
  MIDDLE1: "중1", MIDDLE2: "중2", MIDDLE3: "중3",
  high1: "고1", high2: "고2", high3: "고3",
  middle1: "중1", middle2: "중2", middle3: "중3",
};

function taskStatusToDisplay(
  status: string,
): "검토 대기" | "검토 중" | "전송 완료" {
  if (status === "SUBMITTED") return "검토 중";
  if (status === "COMPLETED") return "전송 완료";
  return "검토 대기";
}

function getScoreTitle(score: number | null) {
  if (score === null) return "분석 대기 중";
  if (score >= 80) return "밀도 높은 학습!";
  if (score >= 60) return "양호한 학습";
  return "밀도 개선 필요";
}

function getScoreDescription(score: number | null) {
  if (score === null) return "AI 분석이 진행 중입니다.";
  if (score >= 80) return "풀이 과정이 충실합니다";
  if (score >= 60) return "학습 흔적이 일부 확인됩니다";
  return "학습 밀도를 높여야 합니다";
}

export default function CoachingCenter() {
  const [mentees, setMentees] = useState<MenteeListItem[]>([]);
  const [selectedMentee, setSelectedMentee] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(
    () => new Date().toISOString().slice(0, 10),
  );
  const [session, setSession] = useState<CoachingSessionResponse | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [overallFeedback, setOverallFeedback] = useState("");
  const [detailedFeedback, setDetailedFeedback] = useState("");
  const [learningReview, setLearningReview] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [sendingFeedback, setSendingFeedback] = useState(false);
  const [assignedMaterialIds, setAssignedMaterialIds] = useState<Set<string>>(
    new Set(),
  );

  // 멘티 목록 로드
  useEffect(() => {
    mentorApi
      .getMentees()
      .then((list) => {
        setMentees(list);
        if (list.length > 0) setSelectedMentee(list[0].menteeId);
      })
      .catch(() => {});
  }, []);

  // 코칭 세션 로드
  const fetchSession = useCallback(async () => {
    if (!selectedMentee) return;
    try {
      const data = await mentorApi.getCoachingSession(
        selectedMentee,
        selectedDate,
      );
      setSession(data);
      setOverallFeedback(data.dailySummary ?? "");

      // 첫 번째 과제 자동 선택
      if (data.tasks.length > 0) {
        setSelectedTaskId(data.tasks[0].id);
        setDetailedFeedback(data.tasks[0].detailFeedback ?? "");
      } else {
        setSelectedTaskId(null);
        setDetailedFeedback("");
      }
      setAssignedMaterialIds(new Set());
    } catch {
      setSession(null);
      setSelectedTaskId(null);
    }
  }, [selectedMentee, selectedDate]);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  // 선택된 과제
  const selectedTask: TaskCoachingItem | null = useMemo(
    () => session?.tasks.find((t) => t.id === selectedTaskId) ?? null,
    [session, selectedTaskId],
  );

  // 과제 변경 시 상세 피드백 로드
  const handleSelectTask = (id: string) => {
    setSelectedTaskId(id);
    const task = session?.tasks.find((t) => t.id === id);
    setDetailedFeedback(task?.detailFeedback ?? "");
  };

  // 학습 목록 매핑
  const learningItems: LearningItem[] = useMemo(
    () =>
      (session?.tasks ?? []).map((t) => ({
        id: t.id,
        subject: SUBJECT_DISPLAY[t.subject] ?? t.subject,
        title: t.title,
        status: taskStatusToDisplay(t.status),
      })),
    [session],
  );

  // 추천 자료 매핑
  const materials: MaterialItem[] = useMemo(
    () =>
      (selectedTask?.recommendedMaterials ?? []).map((m) => ({
        id: m.id,
        subject: SUBJECT_DISPLAY[m.subject] ?? m.subject,
        title: m.title,
        difficulty:
          m.difficulty !== null
            ? ["하", "중하", "중", "중상", "상"][m.difficulty - 1] ?? "중"
            : "중",
        assigned: assignedMaterialIds.has(m.id),
      })),
    [selectedTask, assignedMaterialIds],
  );

  // 멘티 옵션
  const menteeOptions = mentees.map((m) => ({
    value: m.menteeId,
    label: `${m.name} (${GRADE_DISPLAY[m.grade ?? ""] ?? m.grade ?? ""})`,
  }));

  // 사진
  const photos = selectedTask?.submission?.images ?? [];

  // AI 분석
  const analysis = selectedTask?.analysis;
  const densityScore = analysis?.densityScore ?? 0;

  // 판정 확정
  const handleConfirmJudgment = async () => {
    if (!analysis?.id) return;
    setConfirmLoading(true);
    try {
      await mentorApi.confirmJudgment(analysis.id);
      fetchSession();
    } catch {
      // 실패
    } finally {
      setConfirmLoading(false);
    }
  };

  // 자료 배정
  const handleAssign = async (materialId: string) => {
    if (!selectedMentee || assignedMaterialIds.has(materialId)) return;
    try {
      await mentorApi.assignMaterial({
        menteeId: selectedMentee,
        materialId,
        date: selectedDate,
      });
      setAssignedMaterialIds((prev) => new Set([...prev, materialId]));
    } catch {
      // 실패
    }
  };

  // 상세 피드백 임시저장
  const handleSaveDraft = async () => {
    if (!selectedMentee || !selectedTaskId) return;
    try {
      const promises: Promise<unknown>[] = [];
      if (detailedFeedback.trim()) {
        promises.push(
          mentorApi.saveTaskFeedback({
            taskId: selectedTaskId,
            detail: detailedFeedback,
          }),
        );
      }
      if (overallFeedback.trim()) {
        promises.push(
          mentorApi.saveDailySummary({
            menteeId: selectedMentee,
            date: selectedDate,
            generalComment: overallFeedback,
          }),
        );
      }
      await Promise.all(promises);
    } catch {
      // 실패
    }
  };

  // 피드백 전송
  const handleSendFeedback = async () => {
    if (!selectedMentee || !session) return;
    setSendingFeedback(true);
    try {
      const items = session.tasks
        .filter(
          (t) =>
            t.detailFeedback ||
            (t.id === selectedTaskId && detailedFeedback.trim()),
        )
        .map((t) => ({
          taskId: t.id,
          detail:
            t.id === selectedTaskId
              ? detailedFeedback
              : (t.detailFeedback ?? ""),
        }));

      if (items.length === 0 && detailedFeedback.trim() && selectedTaskId) {
        items.push({ taskId: selectedTaskId, detail: detailedFeedback });
      }

      if (items.length > 0) {
        await mentorApi.createFeedback({
          menteeId: selectedMentee,
          date: selectedDate,
          items,
          generalComment: overallFeedback || undefined,
          summary: learningReview || undefined,
        });
      }
      fetchSession();
    } catch {
      // 실패
    } finally {
      setSendingFeedback(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      {/* 상단: 제목 + 버튼 */}
      <div className="flex items-center justify-between">
        <h1 className="text-heading-xl text-gray-900">코칭센터</h1>
        <div className="flex gap-2">
          <Button variant="primary" outlined onClick={handleSaveDraft}>
            임시저장
          </Button>
          <Button onClick={handleSendFeedback} disabled={sendingFeedback}>
            {sendingFeedback ? "전송 중..." : "피드백 전송하기"}
          </Button>
        </div>
      </div>

      {/* 멘티/날짜 선택 + 학습 목록 */}
      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
        <MenteeSelector
          mentees={menteeOptions}
          selectedMentee={selectedMentee}
          selectedDate={selectedDate}
          onMenteeChange={setSelectedMentee}
          onDateChange={setSelectedDate}
        />
        <div className="mt-5">
          <LearningChips
            items={learningItems}
            selectedId={selectedTaskId}
            onSelect={handleSelectTask}
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
          <CommentSection
            comment={
              selectedTask?.submission?.comment ?? "코멘트가 없습니다."
            }
          />
          <PhotoGallery photos={photos} total={photos.length || 1} />
          <AIDensityAnalysis
            score={densityScore}
            title={getScoreTitle(analysis?.densityScore ?? null)}
            description={getScoreDescription(analysis?.densityScore ?? null)}
            analysisId={analysis?.id}
            detailedAnalysis={analysis?.detailedAnalysis}
            onConfirmJudgment={handleConfirmJudgment}
            confirmLoading={confirmLoading}
          />
        </div>

        {/* 우측 */}
        <div className="flex flex-col gap-6">
          <AIFeedbackDraft
            content={selectedTask?.aiDraft ?? "AI 피드백 초안이 없습니다."}
          />
          <DetailedFeedback
            value={detailedFeedback}
            onChange={setDetailedFeedback}
          />
          <MaterialRecommend materials={materials} onAssign={handleAssign} />
          <LearningReview value={learningReview} onChange={setLearningReview} />
        </div>
      </div>
    </div>
  );
}
