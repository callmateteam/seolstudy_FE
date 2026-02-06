"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import WeeklyView from "./WeeklyView";
import MonthlyView from "./MonthlyView";
import { useIsDesktop } from "@/_hooks/useMediaQuery";
import { useSelectedDate } from "../_hooks/useSelectedDate";
import { useCalendarCompletion } from "../_hooks/useCalendarCompletion";
import { transformMonthlyToRecord } from "../_utils/transformers";

type ViewMode = "weekly" | "monthly";

export type CompletionStatus = "none" | "low" | "mid" | "high";

export type DayInfo = {
  date: Date;
  isToday: boolean;
  isCurrentMonth: boolean;
};

/** 해당 날짜가 속한 주의 월요일 (00:00:00) */
function getMondayOf(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const dow = d.getDay();
  d.setDate(d.getDate() - (dow === 0 ? 6 : dow - 1));
  return d;
}

export default function Calendar() {
  const { selectedDate, setSelectedDate } = useSelectedDate();
  const isDesktop = useIsDesktop();
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [viewMode, setViewMode] = useState<ViewMode>("monthly");
  const [currentDate, setCurrentDate] = useState<Date>(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  // API에서 월간 완료율 데이터 가져오기
  const { data: completionData, loading } = useCalendarCompletion(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
  );

  // 데스크탑: 항상 monthly, 모바일: 토글 가능
  const effectiveViewMode = isDesktop ? "monthly" : viewMode;

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
    if (!completionData) return {};
    return transformMonthlyToRecord(completionData.days);
  }, [completionData]);

  // ── 날짜 클릭 핸들러 ──
  const handleDateClick = (dateKey: string) => {
    setSelectedDate(dateKey);
  };

  // ── 탐색 핸들러 ──
  const handlePrev = () => {
    const d = new Date(currentDate);
    if (effectiveViewMode === "weekly") d.setDate(d.getDate() - 7);
    else d.setMonth(d.getMonth() - 1);
    setCurrentDate(d);
  };

  const handleNext = () => {
    const d = new Date(currentDate);
    if (effectiveViewMode === "weekly") d.setDate(d.getDate() + 7);
    else d.setMonth(d.getMonth() + 1);
    setCurrentDate(d);
  };

  // 헤더 표시 연도·월
  const headerYear =
    effectiveViewMode === "weekly" ? weekDays[0].date.getFullYear() : currentDate.getFullYear();
  const headerMonth =
    effectiveViewMode === "weekly" ? weekDays[0].date.getMonth() : currentDate.getMonth();

  return (
    <div className="my-3 rounded-2xl bg-white p-4 shadow-[1px_1px_4px_2px_rgba(0,0,0,0.08)]">
      {/* 헤더: Today | < YYYY.MM > | 뷰 토글 */}
      <div className="flex items-center justify-between">
        {effectiveViewMode === "monthly" ? (
          <button
            type="button"
            onClick={() => {
              const year = today.getFullYear();
              const month = String(today.getMonth() + 1).padStart(2, "0");
              const day = String(today.getDate()).padStart(2, "0");
              const todayString = `${year}-${month}-${day}`;
              setSelectedDate(todayString);
              setCurrentDate(today);
            }}
            className="text-label-l text-primary-500 cursor-pointer"
          >
            Today
          </button>
        ) : (
          <div className="w-12" />
        )}

        <div className="flex items-center gap-2">
          <button type="button" onClick={handlePrev} className="cursor-pointer text-gray-600">
            <ChevronLeft size={20} />
          </button>
          <span className="text-title-m text-gray-900">
            {headerYear}. {String(headerMonth + 1).padStart(2, "0")}
          </span>
          <button type="button" onClick={handleNext} className="cursor-pointer text-gray-600">
            <ChevronRight size={20} />
          </button>
        </div>

        {!isDesktop ? (
          <button
            type="button"
            onClick={() => setViewMode((v) => (v === "weekly" ? "monthly" : "weekly"))}
            className="text-label-m flex cursor-pointer items-center gap-1 rounded-lg bg-gray-100 px-2.5 py-1 text-gray-700"
          >
            <SlidersHorizontal size={13} />
            {viewMode === "weekly" ? "월간" : "주간"}
          </button>
        ) : (
          <div className="w-16" />
        )}
      </div>

      {/* 캘린더 본문 */}
      <div className="mt-4">
        {effectiveViewMode === "weekly" ? (
          <WeeklyView days={weekDays} />
        ) : (
          <MonthlyView
            weeks={monthWeeks}
            completionStatus={completionStatus}
            onDateClick={handleDateClick}
            selectedDate={selectedDate}
          />
        )}
      </div>
    </div>
  );
}
