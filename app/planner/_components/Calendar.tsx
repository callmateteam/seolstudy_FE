"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import WeeklyView from "./WeeklyView";
import MonthlyView from "./MonthlyView";

type ViewMode = "weekly" | "monthly";

export type CompletionStatus = "none" | "low" | "mid" | "high";

export type DayInfo = {
  date: Date;
  isToday: boolean;
  isCurrentMonth: boolean;
};

function getCompletionStatus(pct: number): CompletionStatus {
  if (pct === 0) return "none";
  if (pct <= 33) return "low";
  if (pct <= 66) return "mid";
  return "high";
}

/** 해당 날짜가 속한 주의 월요일 (00:00:00) */
function getMondayOf(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const dow = d.getDay();
  d.setDate(d.getDate() - (dow === 0 ? 6 : dow - 1));
  return d;
}

// ── Mock 완료율 데이터 (API 연결 시 교체) ──
const MOCK_COMPLETION: Record<string, number> = {
  "2026-01-26": 70,
  "2026-01-27": 25,
  "2026-01-28": 50,
  "2026-01-29": 45,
  "2026-01-30": 55,
  "2026-01-31": 60,
  "2026-02-01": 80,
  "2026-02-02": 40,
};

export default function Calendar() {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [viewMode, setViewMode] = useState<ViewMode>("weekly");
  const [currentDate, setCurrentDate] = useState<Date>(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  // ── 주간 데이터 ──
  const weekDays: DayInfo[] = useMemo(() => {
    const monday = getMondayOf(currentDate);
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      return {
        date,
        isToday: date.getTime() === today.getTime(),
        isCurrentMonth: true,
      };
    });
  }, [currentDate, today]);

  // ── 월간 데이터 ──
  const monthWeeks: DayInfo[][] = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const lastOfMonth = new Date(year, month + 1, 0);
    const start = getMondayOf(firstOfMonth);

    // 마지막 날이 속한 주의 일요일
    const lastDow = lastOfMonth.getDay();
    const end = new Date(lastOfMonth);
    if (lastDow !== 0) end.setDate(lastOfMonth.getDate() + (7 - lastDow));

    const weeks: DayInfo[][] = [];
    const cursor = new Date(start);
    while (cursor <= end) {
      const week: DayInfo[] = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(cursor);
        week.push({
          date,
          isToday: date.getTime() === today.getTime(),
          isCurrentMonth: date.getMonth() === month,
        });
        cursor.setDate(cursor.getDate() + 1);
      }
      weeks.push(week);
    }
    return weeks;
  }, [currentDate, today]);

  // ── 완료율 스테이터스 맵 ──
  const completionStatus = useMemo(() => {
    const result: Record<string, CompletionStatus> = {};
    for (const [key, pct] of Object.entries(MOCK_COMPLETION)) {
      result[key] = getCompletionStatus(pct);
    }
    return result;
  }, []);

  // ── 탐색 핸들러 ──
  const handlePrev = () => {
    const d = new Date(currentDate);
    if (viewMode === "weekly") d.setDate(d.getDate() - 7);
    else d.setMonth(d.getMonth() - 1);
    setCurrentDate(d);
  };

  const handleNext = () => {
    const d = new Date(currentDate);
    if (viewMode === "weekly") d.setDate(d.getDate() + 7);
    else d.setMonth(d.getMonth() + 1);
    setCurrentDate(d);
  };

  // 헤더 표시 연도·월
  const headerYear =
    viewMode === "weekly"
      ? weekDays[0].date.getFullYear()
      : currentDate.getFullYear();
  const headerMonth =
    viewMode === "weekly"
      ? weekDays[0].date.getMonth()
      : currentDate.getMonth();

  return (
    <div className="my-3 rounded-2xl bg-white p-4 shadow-[1px_1px_4px_2px_rgba(0,0,0,0.08)]">
      {/* 헤더: Today | < YYYY.MM > | 뷰 토글 */}
      <div className="flex items-center justify-between">
        {viewMode === "monthly" ? (
          <button
            type="button"
            onClick={() => setCurrentDate(today)}
            className="cursor-pointer text-label-l text-primary-500"
          >
            Today
          </button>
        ) : (
          <div className="w-12" />
        )}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            className="cursor-pointer text-gray-600"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-title-m text-gray-900">
            {headerYear}. {String(headerMonth + 1).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={handleNext}
            className="cursor-pointer text-gray-600"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <button
          type="button"
          onClick={() =>
            setViewMode((v) => (v === "weekly" ? "monthly" : "weekly"))
          }
          className="flex cursor-pointer items-center gap-1 rounded-lg bg-gray-100 px-2.5 py-1 text-label-m text-gray-700"
        >
          <SlidersHorizontal size={13} />
          {viewMode === "weekly" ? "월간" : "주간"}
        </button>
      </div>

      {/* 캘린더 본문 */}
      <div className="mt-4">
        {viewMode === "weekly" ? (
          <WeeklyView days={weekDays} />
        ) : (
          <MonthlyView
            weeks={monthWeeks}
            completionStatus={completionStatus}
          />
        )}
      </div>
    </div>
  );
}
