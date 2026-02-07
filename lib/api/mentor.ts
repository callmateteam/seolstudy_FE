import { api } from "./client";
import type {
  DashboardResponse,
  MenteeListItem,
  MenteeDetailResponse,
  ReviewQueueItem,
  CommentQueueItem,
  CommentReplyResponse,
  TaskResponse,
  TaskCreateRequest,
  TaskUpdateRequest,
  TaskProblemCreateRequest,
  TaskProblemUpdateRequest,
  TaskProblemWithAnswerResponse,
  LessonResponse,
  LessonListResponse,
  LessonCreateRequest,
  LessonUpdateRequest,
  LessonUploadResponse,
  AbilityTagsResponse,
  CoachingSessionResponse,
  CoachingDetailResponse,
  AiDraftResponse,
  RecommendationsResponse,
  TaskFeedbackRequest,
  DailySummaryRequest,
  AssignMaterialRequest,
  JudgmentResponse,
  JudgmentModifyRequest,
  FeedbackCreateRequest,
  FeedbackResponse,
  FeedbackDetailResponse,
  AnalysisResponse,
  AnalysisStatusResponse,
  AnalysisTriggerResponse,
  MaterialResponse,
  MaterialCreateRequest,
  UploadResponse,
  PresignedUrlResponse,
  SubmissionResponse,
  MyPageResponse,
  MyPageUpdateRequest,
} from "./mentorTypes";

export const mentorApi = {
  // ─── Dashboard ───

  getDashboard: () => api.get<DashboardResponse>("/api/mentor/dashboard"),

  getMentees: () => api.get<MenteeListItem[]>("/api/mentor/mentees"),

  getMenteeDetail: (menteeId: string) =>
    api.get<MenteeDetailResponse>(`/api/mentor/mentees/${menteeId}`),

  getReviewQueue: () =>
    api.get<ReviewQueueItem[]>("/api/mentor/review-queue"),

  // ─── Comments ───

  getComments: () =>
    api.get<CommentQueueItem[]>("/api/mentor/comments"),

  replyComment: (commentId: string, reply: string) =>
    api.post<CommentReplyResponse>(`/api/mentor/comments/${commentId}/reply`, {
      reply,
    }),

  // ─── Tasks ───

  getTasks: (date: string, menteeId?: string) =>
    api.get<TaskResponse[]>("/api/tasks", { date, menteeId }),

  createTask: (data: TaskCreateRequest, menteeId?: string) =>
    api.post<TaskResponse>("/api/tasks", data, { menteeId }),

  getTask: (taskId: string) => api.get<TaskResponse>(`/api/tasks/${taskId}`),

  updateTask: (taskId: string, data: TaskUpdateRequest) =>
    api.put<TaskResponse>(`/api/tasks/${taskId}`, data),

  deleteTask: (taskId: string) => api.delete<void>(`/api/tasks/${taskId}`),

  createProblem: (taskId: string, data: TaskProblemCreateRequest) =>
    api.post<TaskProblemWithAnswerResponse>(
      `/api/tasks/${taskId}/problems`,
      data,
    ),

  updateProblem: (
    taskId: string,
    problemId: string,
    data: TaskProblemUpdateRequest,
  ) =>
    api.put<TaskProblemWithAnswerResponse>(
      `/api/tasks/${taskId}/problems/${problemId}`,
      data,
    ),

  deleteProblem: (taskId: string, problemId: string) =>
    api.delete<void>(`/api/tasks/${taskId}/problems/${problemId}`),

  // ─── Lessons ───

  getLessons: (menteeId: string, date: string) =>
    api.get<LessonListResponse>("/api/mentor/lessons", { menteeId, date }),

  createLesson: (data: LessonCreateRequest) =>
    api.post<LessonResponse>("/api/mentor/lessons", data),

  getLesson: (lessonId: string) =>
    api.get<LessonResponse>(`/api/mentor/lessons/${lessonId}`),

  updateLesson: (lessonId: string, data: LessonUpdateRequest) =>
    api.patch<LessonResponse>(`/api/mentor/lessons/${lessonId}`, data),

  deleteLesson: (lessonId: string) =>
    api.delete<void>(`/api/mentor/lessons/${lessonId}`),

  uploadLessonPdf: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const { getAccessToken } = await import("./tokenStore");
    const token = getAccessToken();
    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
    const res = await fetch(`${baseUrl}/api/mentor/lessons/upload`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });

    if (!res.ok) {
      const json = await res.json().catch(() => null);
      throw new Error(json?.error?.message ?? "파일 업로드에 실패했습니다.");
    }

    const json = await res.json();
    return json.data as LessonUploadResponse;
  },

  getAbilityTags: (subject: string) =>
    api.get<AbilityTagsResponse>("/api/mentor/lessons/ability-tags", {
      subject,
    }),

  getAllAbilityTags: () =>
    api.get<Record<string, string[]>>(
      "/api/mentor/lessons/ability-tags/all",
    ),

  // ─── Coaching ───

  getCoachingSession: (menteeId: string, date: string) =>
    api.get<CoachingSessionResponse>("/api/coaching/session", {
      menteeId,
      date,
    }),

  getCoachingDetail: (submissionId: string) =>
    api.get<CoachingDetailResponse>(`/api/coaching/${submissionId}`),

  getAiDraft: (submissionId: string) =>
    api.get<AiDraftResponse>(`/api/coaching/${submissionId}/ai-draft`),

  getRecommendations: (submissionId: string) =>
    api.get<RecommendationsResponse>(
      `/api/coaching/${submissionId}/recommendations`,
    ),

  saveTaskFeedback: (data: TaskFeedbackRequest) =>
    api.post<{ taskId: string }>("/api/coaching/task-feedback", data),

  saveDailySummary: (data: DailySummaryRequest) =>
    api.post<{ menteeId: string }>("/api/coaching/daily-summary", data),

  assignMaterial: (data: AssignMaterialRequest) =>
    api.post<TaskResponse>("/api/coaching/assign-material", data),

  // ─── Judgments ───

  confirmJudgment: (analysisId: string) =>
    api.post<JudgmentResponse>(
      `/api/mentor/judgments/${analysisId}/confirm`,
    ),

  modifyJudgment: (analysisId: string, data: JudgmentModifyRequest) =>
    api.post<JudgmentResponse>(
      `/api/mentor/judgments/${analysisId}/modify`,
      data,
    ),

  getJudgment: (analysisId: string) =>
    api.get<JudgmentResponse>(`/api/mentor/judgments/${analysisId}`),

  // ─── Feedback ───

  createFeedback: (data: FeedbackCreateRequest) =>
    api.post<FeedbackResponse>("/api/mentor/feedback", data),

  getFeedback: (menteeId: string, date: string) =>
    api.get<FeedbackDetailResponse[]>("/api/feedback", { menteeId, date }),

  getFeedbackDetail: (feedbackId: string) =>
    api.get<FeedbackDetailResponse>(`/api/feedback/${feedbackId}`),

  // ─── Analysis ───

  getAnalysis: (submissionId: string) =>
    api.get<AnalysisResponse>(`/api/analysis/${submissionId}`),

  getAnalysisStatus: (submissionId: string) =>
    api.get<AnalysisStatusResponse>(
      `/api/analysis/${submissionId}/status`,
    ),

  triggerAnalysis: (submissionId: string) =>
    api.post<AnalysisTriggerResponse>(
      `/api/analysis/${submissionId}/trigger`,
    ),

  retryAnalysis: (submissionId: string) =>
    api.post<AnalysisTriggerResponse>(
      `/api/analysis/${submissionId}/retry`,
    ),

  // ─── Submissions ───

  getSubmissions: (taskId: string) =>
    api.get<SubmissionResponse[]>(`/api/tasks/${taskId}/submissions`),

  // ─── Materials ───

  getMaterials: (subject?: string, type?: string) =>
    api.get<MaterialResponse[]>("/api/materials", { subject, type }),

  getMaterial: (materialId: string) =>
    api.get<MaterialResponse>(`/api/materials/${materialId}`),

  createMaterial: (data: MaterialCreateRequest) =>
    api.post<MaterialResponse>("/api/materials", data),

  // ─── Uploads ───

  uploadPdf: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const { getAccessToken } = await import("./tokenStore");
    const token = getAccessToken();
    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
    const res = await fetch(`${baseUrl}/api/uploads/pdf`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });

    if (!res.ok) {
      const json = await res.json().catch(() => null);
      throw new Error(json?.error?.message ?? "파일 업로드에 실패했습니다.");
    }

    const json = await res.json();
    return json.data as UploadResponse;
  },

  getPresignedUrl: (url: string) =>
    api.post<PresignedUrlResponse>("/api/uploads/presigned-url", { url }),

  // ─── MyPage ───

  getMyPage: () => api.get<MyPageResponse>("/api/my"),

  updateMyPage: (data: MyPageUpdateRequest) =>
    api.patch<MyPageResponse>("/api/my", data),
};
