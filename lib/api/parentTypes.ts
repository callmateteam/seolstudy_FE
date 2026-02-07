// ─── Parent Dashboard ───

export interface MentorBasicInfo {
  id: string;
  name: string;
  avatar: number;
  university: string;
  department: string;
}

export interface ParentDashboardResponse {
  menteeName: string;
  menteeGrade: string | null;
  menteeSubjects: string[];
  todayTaskCount: number;
  todayCompletedCount: number;
  todayCompletionRate: number;
  weeklyDensityScore: number | null;
  mentor: MentorBasicInfo | null;
  recentFeedbackCount: number;
}

// ─── Mentee Status ───

export interface DailyCompletionRate {
  date: string;
  total: number;
  completed: number;
  rate: number;
}

export interface MenteeStatusResponse {
  weeklyCompletionRates: DailyCompletionRate[];
  totalTasksThisWeek: number;
  completedTasksThisWeek: number;
  weeklyDensityScore: number | null;
}

// ─── Mentor Info ───

export interface MentorInfoResponse {
  mentorId: string | null;
  mentorName: string | null;
  avatar: number;
  university: string | null;
  department: string | null;
  subjects: string[];
  recentFeedbackCount: number;
}

// ─── Feedback By Subject ───

export interface FeedbackItemWithAnalysis {
  id: string;
  taskId: string;
  detail: string;
  taskTitle: string;
  taskDate: string;
  aiSummary: string | null;
  signalLight: string | null;
  densityScore: number | null;
  submissionId: string | null;
}

export interface FeedbackBySubjectItem {
  id: string;
  date: string;
  summary: string | null;
  isHighlighted: boolean;
  generalComment: string | null;
  mentorName: string | null;
  items: FeedbackItemWithAnalysis[];
}
