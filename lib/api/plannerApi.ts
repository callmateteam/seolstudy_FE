import { api } from "./client";
import type {
  PlannerData,
  MonthlyCompletion,
} from "@/app/(mentee)/planner/_types";

export interface CommentResponse {
  id: string;
  menteeId: string;
  date: string;
  content: string;
  mentorReply: string | null;
  repliedAt: string | null;
  createdAt: string;
}

export const plannerApi = {
  getPlanner: (date: string) =>
    api.get<PlannerData>("/api/planner", { date }),

  getMonthly: (year: number, month: number) =>
    api.get<MonthlyCompletion>("/api/planner/monthly", { year, month }),

  getWeekly: (weekOf: string) =>
    api.get<{ weekOf: string; days: { date: string; total: number; completed: number; rate: number }[] }>(
      "/api/planner/weekly",
      { weekOf },
    ),

  addComment: (date: string, content: string) =>
    api.post<CommentResponse>("/api/planner/comments", { date, content }),

  getYesterdayFeedback: () =>
    api.get<{
      id: string;
      date: string;
      summary: string | null;
      generalComment: string | null;
      isHighlighted: boolean;
    } | null>("/api/planner/yesterday-feedback"),
};
