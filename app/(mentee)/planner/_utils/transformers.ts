import {
  TaskStatus,
  TaskDisplayStatus,
  CompletionStatus,
  DayCompletion,
  Comment,
  QnaItem,
} from "../_types";

/**
 * API 과제 상태를 화면 표시 문구로 변환
 */
export function mapTaskStatus(apiStatus: TaskStatus): TaskDisplayStatus {
  const mapping: Record<TaskStatus, TaskDisplayStatus> = {
    PENDING: "미완료",
    COMPLETED: "제출완료",
    SUBMITTED: "분석중",
    FAILED: "분석실패",
  };
  return mapping[apiStatus];
}

/**
 * 분 단위를 "Xh Ym" 형식으로 변환
 */
export function formatDuration(minutes: number | null): string {
  if (!minutes) return "0h 0m";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

/**
 * ISO 문자열을 "YYYY.MM.DD HH:MM" 형식으로 변환
 */
export function formatDateTime(isoString: string): string {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}.${month}.${day} ${hours}:${minutes}`;
}

/**
 * Comment 배열을 QnaItem 배열로 변환
 */
export function transformCommentsToQnA(comments: Comment[]): QnaItem[] {
  return comments.map((comment) => ({
    id: comment.id,
    title: comment.mentorReply ? "질문 답변 코멘트" : "답변 대기 중",
    questions: [comment.content],
    answer: comment.mentorReply || "멘토님이 곧 답변할 예정입니다.",
    questionAt: formatDateTime(comment.createdAt),
    answerAt: comment.repliedAt ? formatDateTime(comment.repliedAt) : "-",
    variant: comment.mentorReply ? "default" : "primary",
  }));
}

/**
 * 완료율(0~1)을 CompletionStatus로 변환
 */
export function getCompletionStatus(rate: number): CompletionStatus {
  if (rate === 0) return "none";
  if (rate <= 0.33) return "low";
  if (rate <= 0.66) return "mid";
  return "high";
}

/**
 * 월간 완료율 배열을 Record<날짜, 상태> 형식으로 변환
 */
export function transformMonthlyToRecord(
  days: DayCompletion[]
): Record<string, CompletionStatus> {
  const result: Record<string, CompletionStatus> = {};
  for (const day of days) {
    result[day.date] = getCompletionStatus(day.rate);
  }
  return result;
}
