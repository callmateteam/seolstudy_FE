import { api } from "./client";
import type {
  FeedbackBySubjectItem,
} from "./parentTypes";
import type { FeedbackDetailResponse } from "./mentorTypes";

export const feedbackApi = {
  getByDate: (menteeId: string, date: string) =>
    api.get<FeedbackDetailResponse[]>("/api/feedback", { menteeId, date }),

  getBySubject: (menteeId: string, subject: string) =>
    api.get<FeedbackBySubjectItem[]>("/api/feedback/by-subject", {
      menteeId,
      subject,
    }),

  getDetail: (feedbackId: string) =>
    api.get<FeedbackDetailResponse>(`/api/feedback/${feedbackId}`),
};
