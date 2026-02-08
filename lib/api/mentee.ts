import { api } from "./client";
import { getAccessToken } from "./tokenStore";
import type {
  MenteeMyPageResponse,
  MyPageUpdateRequest,
  TaskResponse,
  TaskCreateRequest,
  SubmissionCreateRequest,
  SubmissionResponse,
  StudyPhotoResponse,
  AnalysisResponse,
} from "./menteeTypes";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export const menteeApi = {
  /** GET /api/my — 마이페이지 */
  getMyPage: () => api.get<MenteeMyPageResponse>("/api/my"),

  /** PATCH /api/my — 프로필 수정 */
  updateMyPage: (data: MyPageUpdateRequest) =>
    api.patch<MenteeMyPageResponse>("/api/my", data),

  /** GET /api/tasks/{taskId} — 태스크 상세 */
  getTask: (taskId: string) => api.get<TaskResponse>(`/api/tasks/${taskId}`),

  /** POST /api/tasks — 태스크 생성 */
  createTask: (data: TaskCreateRequest) =>
    api.post<TaskResponse>("/api/tasks", data),

  /** POST /api/tasks/{taskId}/submissions — 제출 */
  submitTask: (taskId: string, data: SubmissionCreateRequest) =>
    api.post<SubmissionResponse>(`/api/tasks/${taskId}/submissions`, data),

  /** PATCH /api/tasks/{taskId}/study-time — 학습 시간 기록 */
  recordStudyTime: (taskId: string, minutes: number) =>
    api.patch(`/api/tasks/${taskId}/study-time`, { minutes }),

  /** GET /api/analysis/{submissionId} — 분석 결과 조회 */
  getAnalysis: (submissionId: string) =>
    api.get<AnalysisResponse>(`/api/analysis/${submissionId}`),

  /** PATCH /api/tasks/{taskId}/bookmark — 북마크 토글 */
  toggleBookmark: (taskId: string, isBookmarked: boolean) =>
    api.patch(`/api/tasks/${taskId}/bookmark`, { isBookmarked }),

  /** POST /api/uploads/study-photo — 학습 사진 업로드 (FormData) */
  uploadStudyPhoto: async (file: File): Promise<StudyPhotoResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    const token = getAccessToken();
    const headers: HeadersInit = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/api/uploads/study-photo`, {
      method: "POST",
      headers,
      credentials: "include",
      body: formData,
    });

    const json = await response.json();
    if (!response.ok || json.success === false) {
      throw new Error(json.error?.message ?? "업로드 실패");
    }
    return json.data;
  },
};
