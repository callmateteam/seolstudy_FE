// Task Types
export type TaskStatus = "PENDING" | "COMPLETED" | "SUBMITTED" | "FAILED";
export type TaskSubject = "KOREAN" | "MATH" | "ENGLISH";
export type TaskDisplayStatus = "미완료" | "제출완료" | "분석중" | "분석실패";

export interface Task {
  id: string;
  menteeId: string;
  createdByMentorId: string | null;
  date: string;
  title: string;
  goal: string | null;
  subject: TaskSubject;
  abilityTag: string | null;
  materialType: string | null;
  materialId: string | null;
  materialUrl: string | null;
  isLocked: boolean;
  status: TaskStatus;
  studyTimeMinutes: number | null;
  repeat: boolean;
  repeatDays: string[];
  targetStudyMinutes: number | null;
  memo: string | null;
  tags: string[];
  keyPoints: string | null;
  content: string | null;
  isBookmarked: boolean;
  problems: any[];
  problemCount: number;
  createdBy: string;
  displayOrder: number;
}

// Comment Types
export interface Comment {
  id: string;
  menteeId: string;
  date: string;
  content: string;
  mentorReply: string | null;
  repliedAt: string | null;
  createdAt: string;
}

// Feedback Types
export interface Feedback {
  id: string;
  date: string;
  summary: string;
  generalComment: string | null;
  isHighlighted: boolean;
  mentorName: string;
}

// Planner API Response
export interface PlannerData {
  date: string;
  tasks: Task[];
  comments: Comment[];
  completionRate: number;
  totalCount: number;
  completedCount: number;
  hasYesterdayFeedback: boolean;
  yesterdayFeedbackDate: string | null;
  todayFeedback: Feedback | null;
}

// Calendar Types
export type CompletionStatus = "none" | "low" | "mid" | "high";

export interface DayCompletion {
  date: string;
  total: number;
  completed: number;
  rate: number;
}

export interface WeeklyCompletion {
  weekOf: string;
  days: DayCompletion[];
}

export interface MonthlyCompletion {
  year: number;
  month: number;
  days: DayCompletion[];
}

// QnA Types (for PlannerQnaCards component)
export interface QnaItem {
  id: string;
  title: string;
  questions: string[];
  answer: string;
  questionAt: string;
  answerAt: string;
  variant: "default" | "primary";
}
