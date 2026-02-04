"use client";

import { useCallback, useRef, useState } from "react";
import { Pin, Plus } from "lucide-react";

type TaskStatus = "분석실패" | "분석중" | "제출완료" | "미완료";

type Task = {
  id: string;
  subject: string;
  title: string;
  duration: string;
  status: TaskStatus;
};

const STATUS_COLOR_MAP: Record<TaskStatus, string> = {
  분석실패: "text-error-500",
  분석중: "text-warning-500",
  제출완료: "text-success-500",
  미완료: "text-gray-500",
};

// ── Mock 학습 과제 데이터 (API 연결 시 교체) ──
const MOCK_TASKS: Task[] = [
  {
    id: "1",
    subject: "국어",
    title: "비문학 독해 3회차",
    duration: "1h 30m",
    status: "분석실패",
  },
  {
    id: "2",
    subject: "수학",
    title: "미적분 문제 기본풀이",
    duration: "2h 00m",
    status: "분석중",
  },
  {
    id: "3",
    subject: "영어",
    title: "어휘 테스트 Day 12",
    duration: "0h 45m",
    status: "제출완료",
  },
  {
    id: "4",
    subject: "국어",
    title: "문학 감상문 작성",
    duration: "0h 00m",
    status: "미완료",
  },
];

export default function TodayLearning() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setIsAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 1);
  }, []);

  const showOverlay = MOCK_TASKS.length > 3 && !isAtBottom;

  return (
    <section className="flex flex-col rounded-xl bg-white shadow-[1px_1px_4px_2px_rgba(0,0,0,0.08)]">
      {/* 타이틀 */}
      <div className="flex items-center justify-between px-3 pt-3">
        <h4 className="text-title-l text-gray-900">오늘 학습</h4>
        <p className="text-label-m text-gray-900">
          남은 과제: <span className="text-primary-500">{MOCK_TASKS.length}</span>
        </p>
      </div>

      {/* 스크롤 영역 + 그래디언트 오버레이 */}
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex flex-col gap-5 overflow-y-auto px-3 pt-5"
          style={{ maxHeight: "200px" }}
        >
          {MOCK_TASKS.map((task) => (
            <div key={task.id} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <Pin />
                <div>
                  <span className="text-label-s rounded-full border border-gray-300 px-1 py-0.5 text-gray-500">
                    {task.subject}
                  </span>
                  <p className="text-body-m text-gray-800">{task.title}</p>
                </div>
              </div>
              <p className="text-label-m text-gray-500">{task.duration}</p>
              <p className={`text-label-m ${STATUS_COLOR_MAP[task.status]}`}>{task.status}</p>
            </div>
          ))}
        </div>

        {showOverlay && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-white to-transparent" />
        )}
      </div>

      {/* 할 일 추가 버튼 */}
      <button
        type="button"
        className="text-label-m text-primary-500 flex cursor-pointer items-center justify-center gap-1 py-2"
      >
        <Plus size={20} />할 일 추가하기
      </button>
    </section>
  );
}
