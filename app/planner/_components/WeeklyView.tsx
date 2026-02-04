import type { DayInfo } from "./Calendar";

const DAY_LABELS = ["월", "화", "수", "목", "금", "토", "일"];

export default function WeeklyView({ days }: { days: DayInfo[] }) {
  return (
    <div className="grid grid-cols-7">
      {days.map((day, i) => (
        <div key={i} className="flex flex-col items-center">
          <div
            className={`flex w-11 flex-col items-center justify-center py-1.5 rounded-full ${
              day.isToday ? "bg-primary-500" : ""
            }`}
          >
            <span
              className={`text-label-m ${
                day.isToday ? "text-white" : "text-gray-500"
              }`}
            >
              {DAY_LABELS[i]}
            </span>
            <span
              className={`text-title-m ${
                day.isToday ? "text-white" : "text-gray-900"
              }`}
            >
              {String(day.date.getDate()).padStart(2, "0")}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
