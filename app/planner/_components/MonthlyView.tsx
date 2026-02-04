import type { DayInfo, CompletionStatus } from "./Calendar";

const DAY_LABELS = ["월", "화", "수", "목", "금", "토", "일"];

// 완료율 단계별 닷 크기
// none: 0%        → 미표시
// low:  1 ~ 33%   → 6px
// mid:  34 ~ 66%  → 8px
// high: 67 ~ 100% → 10px
const DOT_SIZE: Record<CompletionStatus, string> = {
  none: "",
  low: "w-1.5 h-1.5",
  mid: "w-2 h-2",
  high: "w-2.5 h-2.5",
};

function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function MonthlyView({
  weeks,
  completionStatus,
}: {
  weeks: DayInfo[][];
  completionStatus: Record<string, CompletionStatus>;
}) {
  return (
    <div>
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 mb-2">
        {DAY_LABELS.map((label) => (
          <div key={label} className="text-center text-label-m text-gray-600">
            {label}
          </div>
        ))}
      </div>

      {/* 주별 행 */}
      {weeks.map((week, wi) => (
        <div key={wi} className="grid grid-cols-7 py-1">
          {week.map((day, di) => {
            const key = toDateKey(day.date);
            const status: CompletionStatus =
              completionStatus[key] ?? "none";

            return (
              <div key={di} className="flex flex-col items-center">
                {/* 날짜 원 — 오늘이면 오렌지 배경 + 내부 흰색 닷 */}
                <div
                  className={`flex h-10 w-10 flex-col items-center justify-center rounded-full ${
                    day.isToday ? "bg-primary-500" : ""
                  }`}
                >
                  <span
                    className={`text-body-m ${
                      day.isToday
                        ? "text-white"
                        : day.isCurrentMonth
                          ? "text-gray-900"
                          : "text-gray-400"
                    }`}
                  >
                    {day.date.getDate()}
                  </span>
                  {day.isToday && status !== "none" && (
                    <div
                      className={`rounded-full bg-white ${DOT_SIZE[status]}`}
                    />
                  )}
                </div>

                {/* 완료율 닷 — 오늘이 아닌 날짜만 표시 */}
                <div className="flex h-2.5 items-center justify-center">
                  {!day.isToday && status !== "none" && (
                    <div
                      className={`rounded-full bg-primary-500 ${DOT_SIZE[status]}`}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
