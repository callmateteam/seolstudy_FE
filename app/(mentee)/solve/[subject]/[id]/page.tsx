"use client";

import { useState, useCallback, useEffect, use } from "react";
import { ChevronLeft, Pin, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { useIsDesktop } from "@/_hooks/useMediaQuery";
import SolveQuizModal from "./_components/SolveQuizModal";
import QuizPanel from "./_components/QuizPanel";
import ConfirmGradingModal from "./_components/ConfirmGradingModal";
import GradingModal from "./_components/GradingModal";
import GradingCompleteModal from "./_components/GradingCompleteModal";
import AnswerReviewView from "./_components/AnswerReviewView";
import PhotoUploadStep from "./_components/PhotoUploadStep";
import TimeRecordModal from "./_components/TimeRecordModal";
import SubmissionComplete from "./_components/SubmissionComplete";
import Button from "@/components/ui/Button";
import { menteeApi } from "@/lib/api/mentee";
import type { TaskResponse, TaskProblemResponse } from "@/lib/api/menteeTypes";

type SolvePhase =
  | "study"
  | "confirmGrading"
  | "grading"
  | "gradingComplete"
  | "review"
  | "postGrading"
  | "timeRecord"
  | "submitted";

const SUBJECT_MAP: Record<string, string> = {
  KOREAN: "국어",
  ENGLISH: "영어",
  MATH: "수학",
};

interface QuizProblem {
  id: string;
  number: number;
  title: string;
  passage?: string;
  options: string[];
}

interface ReviewProblem extends QuizProblem {
  correctIndex: number;
  selectedIndex: number;
}

function mapProblemsToQuiz(problems: TaskProblemResponse[]): QuizProblem[] {
  return problems
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((p) => ({
      id: p.id,
      number: p.number,
      title: p.title,
      passage: p.content ?? undefined,
      options: p.options?.map((o) => (typeof o === "string" ? o : o.text)) ?? [],
    }));
}

function tryParseJSON<T>(str: string | null): T | null {
  if (!str) return null;
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

export default function SolvePage({
  params,
}: {
  params: Promise<{ subject: string; id: string }>;
}) {
  const { id: taskId } = use(params);
  const router = useRouter();
  const isDesktop = useIsDesktop();

  const [task, setTask] = useState<TaskResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [phase, setPhase] = useState<SolvePhase>("study");
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [studyTimeMinutes, setStudyTimeMinutes] = useState(0);

  useEffect(() => {
    menteeApi
      .getTask(taskId)
      .then(setTask)
      .catch(() => setTask(null))
      .finally(() => setLoading(false));
  }, [taskId]);

  const quizProblems = task ? mapProblemsToQuiz(task.problems) : [];

  // 답안 기반 리뷰 문제 생성 (정답 정보 없으므로 선택한 답을 그대로 표시)
  const reviewProblems: ReviewProblem[] = quizProblems.map((p) => ({
    ...p,
    correctIndex: answers[p.id] ?? -1,
    selectedIndex: answers[p.id] ?? -1,
  }));

  const answeredCount = Object.values(answers).filter((v) => v !== null).length;

  const handleSubmitAnswers = useCallback((submitted: Record<string, number | null>) => {
    setAnswers(submitted);
    setIsQuizModalOpen(false);
    setPhase("confirmGrading");
  }, []);

  const handleStartGrading = () => {
    setPhase("grading");
    setTimeout(() => setPhase("gradingComplete"), 2000);
  };

  const handleReviewComplete = () => {
    setPhase("postGrading");
  };

  const handleSubmitClick = () => {
    setPhase("timeRecord");
  };

  const handlePhotoComplete = (urls: string[]) => {
    setUploadedImageUrls(urls);
  };

  const handleFinalSubmit = async (minutes: number) => {
    setStudyTimeMinutes(minutes);

    if (!task) return;

    try {
      const problemResponses = quizProblems.map((p) => ({
        problemId: p.id,
        answer: answers[p.id] != null ? String(answers[p.id]! + 1) : null,
      }));

      await menteeApi.submitTask(task.id, {
        submissionType: "TEXT",
        images: uploadedImageUrls.length > 0 ? uploadedImageUrls : undefined,
        studyTimeMinutes: minutes,
        selfScoreCorrect: answeredCount,
        selfScoreTotal: quizProblems.length || undefined,
        problemResponses: problemResponses.length > 0 ? problemResponses : undefined,
      });

      setPhase("submitted");
    } catch {
      alert("제출에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (loading) {
    return (
      <article className="mt-7 px-5">
        <div className="flex items-center justify-center py-20">
          <p className="text-body-m text-gray-500">로딩중...</p>
        </div>
      </article>
    );
  }

  if (!task) {
    return (
      <article className="mt-7 px-5">
        <div className="flex flex-col items-center justify-center gap-3 py-20">
          <p className="text-body-m text-gray-500">과제를 불러올 수 없습니다.</p>
          <button
            onClick={() => router.back()}
            className="text-label-m text-primary-500 cursor-pointer"
          >
            돌아가기
          </button>
        </div>
      </article>
    );
  }

  // 제출 완료 화면
  if (phase === "submitted") {
    return <SubmissionComplete />;
  }

  const showPostGrading = phase === "postGrading" || phase === "timeRecord";

  // 태그 구성
  const subjectLabel = SUBJECT_MAP[task.subject] ?? task.subject;
  const tags = [subjectLabel, ...(task.tags ?? [])];
  if (task.abilityTag && !tags.includes(task.abilityTag)) {
    tags.push(task.abilityTag);
  }

  // keyPoints 파싱 시도 (JSON 배열 또는 텍스트)
  const keyPointsData = tryParseJSON<{ concept: string; description: string }[]>(task.keyPoints);

  // content 파싱 시도 (JSON 배열 또는 텍스트)
  const contentParagraphs = tryParseJSON<string[]>(task.content) ?? (task.content ? [task.content] : []);

  // 학습 자료 콘텐츠
  const studyContent = (
    <div className="flex flex-col gap-5">
      {/* 태그 */}
      <ul className="flex items-center gap-2">
        {tags.map((tag, i) => (
          <li
            key={tag}
            className={`rounded-full px-2 py-0.5 text-label-l text-primary-500 ${
              i === 0 ? "border border-primary-500 bg-primary-100" : "bg-primary-100"
            }`}
          >
            {tag}
          </li>
        ))}
      </ul>

      {/* 학습목표 */}
      {task.goal && (
        <div className="rounded-2xl bg-gray-50 p-4">
          <h4 className="text-title-l text-gray-900">학습목표</h4>
          <p className="mt-1 text-body-m text-gray-700">{task.goal}</p>
        </div>
      )}

      {/* Part 1. 핵심 개념 정리 */}
      {keyPointsData && keyPointsData.length > 0 ? (
        <div>
          <h4 className="text-title-l text-gray-900">Part 1. 핵심 개념 정리</h4>
          <p className="mt-3 text-body-m text-gray-700">
            지문을 읽기 전에 아래 핵심 개념들을 먼저 확인하세요.
          </p>
          <table className="mt-3 w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2 pr-4 text-left text-label-m text-gray-500">개념</th>
                <th className="py-2 text-left text-label-m text-gray-500">설명</th>
              </tr>
            </thead>
            <tbody>
              {keyPointsData.map((row) => (
                <tr key={row.concept} className="border-b border-gray-100">
                  <td className="py-3 pr-4 text-body-m font-medium text-gray-900 whitespace-nowrap">
                    {row.concept}
                  </td>
                  <td className="py-3 text-body-m text-gray-700">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : task.keyPoints ? (
        <div>
          <h4 className="text-title-l text-gray-900">핵심 정리</h4>
          <p className="mt-3 text-body-m text-gray-700 whitespace-pre-wrap">{task.keyPoints}</p>
        </div>
      ) : null}

      {/* Part 2. 지문 읽기 */}
      {contentParagraphs.length > 0 && (
        <div>
          <div className="flex items-center justify-between">
            <h4 className="text-title-l text-gray-900">
              {keyPointsData ? "Part 2. 지문 읽기" : "지문 읽기"}
            </h4>
            {!isDesktop && phase === "study" && quizProblems.length > 0 && (
              <button
                type="button"
                onClick={() => setIsQuizModalOpen(true)}
                className="cursor-pointer text-label-l text-primary-500"
              >
                문제풀기
              </button>
            )}
          </div>
          <div className="mt-3 flex flex-col gap-3">
            {contentParagraphs.map((para, i) => (
              <p key={i} className="text-body-m leading-relaxed text-gray-700">
                {para}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* 문제가 없고 지문도 없을 때 문제풀기 버튼 표시 안함 */}
      {contentParagraphs.length === 0 && !isDesktop && phase === "study" && quizProblems.length > 0 && (
        <button
          type="button"
          onClick={() => setIsQuizModalOpen(true)}
          className="cursor-pointer text-label-l text-primary-500"
        >
          문제풀기
        </button>
      )}

      {/* 채점 완료 후: 인라인 결과 + 사진 업로드 */}
      {showPostGrading && (
        <>
          <div className="border-t border-gray-200 pt-5">
            <div className="flex items-center justify-between">
              <h4 className="text-title-l text-gray-900">채점 결과</h4>
              {quizProblems.length > 0 && (
                <button
                  type="button"
                  onClick={() => setPhase("review")}
                  className="cursor-pointer text-label-l text-primary-500"
                >
                  결과보기
                </button>
              )}
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-heading-l text-primary-500">{answeredCount}</span>
              <span className="text-title-l text-gray-400"> / </span>
              <span className="text-heading-l text-gray-400">{quizProblems.length}</span>
            </div>
          </div>

          <PhotoUploadStep onComplete={handlePhotoComplete} />
        </>
      )}
    </div>
  );

  return (
    <article className={showPostGrading && !isDesktop ? "pb-20" : ""}>
      {/* 헤더 */}
      <section className="mt-7 flex items-center justify-between px-5 lg:mx-auto lg:max-w-7xl">
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => router.back()} className="cursor-pointer">
            <ChevronLeft width={28} height={28} />
          </button>
          <p className="text-heading-xl text-gray-900">{task.title}</p>
        </div>
        <Pin color={task.isBookmarked ? "#FD7E14" : "#9CA3AF"} />
      </section>

      {/* 콘텐츠 */}
      {isDesktop ? (
        <div className="mt-5 flex gap-6 px-5 lg:mx-auto lg:max-w-7xl">
          {/* 좌측: 학습 자료 */}
          <div className="flex-1">
            {studyContent}
            {/* 코멘트 입력바 */}
            <div className="mt-5 flex items-center gap-2 border-t border-gray-200 pt-4">
              <input
                type="text"
                placeholder="멘토에게 할 질문이나 코멘트를 남겨보세요"
                className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-body-m text-gray-700 outline-none placeholder:text-gray-400 focus:border-primary-500"
              />
              <button
                type="button"
                className="shrink-0 rounded-lg bg-primary-500 px-4 py-2 text-label-l text-white"
              >
                등록
              </button>
            </div>
          </div>

          {/* 우측: 퀴즈 패널 */}
          {quizProblems.length > 0 && (
            <div className="flex-1 self-start rounded-2xl border border-gray-200 bg-white p-5">
              {phase === "review" ? (
                <AnswerReviewView
                  problems={reviewProblems}
                  onComplete={handleReviewComplete}
                />
              ) : (
                <QuizPanel
                  problems={quizProblems}
                  onSubmit={handleSubmitAnswers}
                />
              )}
            </div>
          )}
        </div>
      ) : (
        <section className="mt-5 px-5">
          {studyContent}
          {/* 모바일 코멘트 입력바 */}
          <div className="mt-5 flex items-center gap-2 border-t border-gray-200 pt-4">
            <input
              type="text"
              placeholder="멘토에게 할 질문이나 코멘트를 남겨보세요"
              className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-body-m text-gray-700 outline-none placeholder:text-gray-400 focus:border-primary-500"
            />
            <button
              type="button"
              className="shrink-0 rounded-lg bg-primary-500 px-4 py-2 text-label-l text-white"
            >
              등록
            </button>
          </div>
        </section>
      )}

      {/* 하단 고정 바 (채점 완료 후) */}
      {showPostGrading && (
        <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between border-t border-gray-200 bg-white px-5 py-3">
          {task.materialUrl ? (
            <a href={task.materialUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-label-l text-gray-700">
              <Download size={18} />
              PDF 학습자료
            </a>
          ) : (
            <div />
          )}
          <Button onClick={handleSubmitClick}>제출하기</Button>
        </div>
      )}

      {/* 모달들 */}
      {!isDesktop && quizProblems.length > 0 && (
        <SolveQuizModal
          isOpen={isQuizModalOpen}
          onClose={() => setIsQuizModalOpen(false)}
          problems={quizProblems}
          onSubmit={handleSubmitAnswers}
        />
      )}
      <ConfirmGradingModal
        isOpen={phase === "confirmGrading"}
        onClose={() => setPhase("study")}
        onConfirm={handleStartGrading}
      />
      <GradingModal
        isOpen={phase === "grading"}
        onClose={() => setPhase("study")}
      />
      <GradingCompleteModal
        isOpen={phase === "gradingComplete"}
        onClose={() => setPhase("study")}
        onViewResults={() => setPhase("review")}
      />
      <TimeRecordModal
        isOpen={phase === "timeRecord"}
        onRetry={() => setPhase("study")}
        onSubmit={handleFinalSubmit}
      />

      {/* 모바일: 답안 리뷰 오버레이 */}
      {phase === "review" && !isDesktop && quizProblems.length > 0 && (
        <div className="fixed inset-0 z-50 bg-gray-50">
          <AnswerReviewView
            problems={reviewProblems}
            onComplete={handleReviewComplete}
          />
        </div>
      )}
    </article>
  );
}
