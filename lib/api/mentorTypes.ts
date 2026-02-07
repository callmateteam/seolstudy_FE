// ─── Dashboard ───

export interface MenteeListItem {
  menteeId: string;
  name: string;
  grade: string | null;
  subjects: string[];
  completionRate: number;
  recentDensity: number | null;
}

export interface ReviewQueueItem {
  submissionId: string;
  taskId: string;
  taskTitle: string;
  menteeName: string;
  menteeId: string;
  subject: string;
  abilityTag: string | null;
  submittedAt: string;
  elapsedMinutes: number;
  densityScore: number | null;
}

export interface CommentQueueItem {
  commentId: string;
  menteeId: string;
  menteeName: string;
  content: string;
  createdAt: string;
  elapsedMinutes: number;
  hasReply: boolean;
}

export interface DashboardResponse {
  mentees: MenteeListItem[];
  reviewQueue: ReviewQueueItem[];
  commentQueue: CommentQueueItem[];
}

// ─── Comment Reply ───

export interface CommentReplyRequest {
  reply: string;
}

export interface CommentReplyResponse {
  commentId: string;
  mentorReply: string;
  repliedAt: string;
}

// ─── Mentee Detail ───

export interface MenteeDetailResponse {
  menteeId: string;
  name: string;
  grade: string | null;
  subjects: string[];
  tasks: TaskResponse[];
  completionRate: number;
}

// ─── Tasks ───

export interface TaskResponse {
  id: string;
  menteeId: string;
  date: string;
  title: string;
  goal: string | null;
  subject: string;
  abilityTag: string | null;
  materialType: string | null;
  materialId: string | null;
  materialUrl: string | null;
  repeat: boolean;
  repeatDays: string[];
  targetStudyMinutes: number | null;
  memo: string | null;
  tags: string[];
  keyPoints: string | null;
  content: string | null;
  problems: TaskProblemResponse[];
  status: string;
  isLocked: boolean;
  isBookmarked: boolean;
  displayOrder: number;
  createdAt: string;
}

export interface TaskProblemResponse {
  id: string;
  number: number;
  title: string;
  content: string | null;
  options: Record<string, unknown>[] | null;
  displayOrder: number;
}

export interface TaskProblemWithAnswerResponse extends TaskProblemResponse {
  correctAnswer: string | null;
}

export interface TaskCreateRequest {
  date: string;
  title: string;
  goal?: string;
  subject: string;
  abilityTag?: string;
  materialType?: string;
  materialId?: string;
  materialUrl?: string;
  repeat?: boolean;
  repeatDays?: string[];
  targetStudyMinutes?: number;
  memo?: string;
  tags?: string[];
  keyPoints?: string;
  content?: string;
  problems?: TaskProblemCreateRequest[];
  displayOrder?: number;
}

export interface TaskUpdateRequest {
  date?: string;
  title?: string;
  goal?: string;
  subject?: string;
  abilityTag?: string;
  materialType?: string;
  materialId?: string;
  materialUrl?: string;
  repeat?: boolean;
  repeatDays?: string[];
  targetStudyMinutes?: number;
  memo?: string;
  tags?: string[];
  keyPoints?: string;
  content?: string;
  displayOrder?: number;
}

export interface TaskProblemCreateRequest {
  number: number;
  title: string;
  content?: string;
  options?: Record<string, unknown>[];
  correctAnswer?: string;
  displayOrder?: number;
}

export interface TaskProblemUpdateRequest {
  number?: number;
  title?: string;
  content?: string;
  options?: Record<string, unknown>[];
  correctAnswer?: string;
  displayOrder?: number;
}

// ─── Lessons ───

export interface LessonResponse {
  id: string;
  menteeId: string;
  date: string;
  subject: string;
  abilityTags: string[];
  title: string;
  goal: string | null;
  materialId: string | null;
  materialUrl: string | null;
  status: string;
  createdAt: string;
}

export interface LessonListResponse {
  lessons: LessonResponse[];
  total: number;
}

export interface LessonCreateRequest {
  menteeId: string;
  date: string;
  subject: string;
  abilityTags: string[];
  title: string;
  goal?: string;
  materialId?: string;
  materialUrl?: string;
}

export interface LessonUpdateRequest {
  subject?: string;
  abilityTags?: string[];
  title?: string;
  goal?: string;
  materialId?: string;
  materialUrl?: string;
}

export interface LessonUploadResponse {
  materialUrl: string;
  originalName: string;
  size: number;
  parsed: boolean;
  content: string | null;
  problems: ParsedProblem[] | null;
}

export interface ParsedProblem {
  number: number;
  title: string;
  content: string | null;
  options: Record<string, unknown>[] | null;
  correctAnswer: string | null;
}

export interface AbilityTagsResponse {
  subject: string;
  tags: string[];
}

// ─── Coaching ───

export interface MenteeBasicInfo {
  id: string;
  name: string;
  grade: string;
  school: string | null;
}

export interface SubmissionDetail {
  id: string;
  taskId: string;
  menteeId: string;
  submissionType: string;
  textContent: string | null;
  images: string[];
  selfScoreCorrect: number | null;
  selfScoreTotal: number | null;
  wrongQuestions: number[];
  comment: string | null;
  submittedAt: string;
}

export interface AnalysisDetail {
  id: string;
  submissionId: string;
  status: string;
  signalLight: string | null;
  densityScore: number | null;
  writingRatio: number | null;
  traceTypes: {
    underlineRatio: number;
    memoRatio: number;
    solutionRatio: number;
  } | null;
  partDensity:
    | {
        partNumber: number;
        partTitle: string;
        density: number;
      }[]
    | null;
  pageHeatmap: Record<string, unknown> | null;
  summary: string | null;
  detailedAnalysis: string | null;
  mentorTip: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RecommendedMaterial {
  id: string;
  title: string;
  subject: string;
  abilityTags: string[];
  difficulty: number | null;
  reason?: string;
}

export interface TaskCoachingItem {
  id: string;
  title: string;
  subject: string;
  abilityTag: string | null;
  tags: string[];
  status: string;
  submission: SubmissionDetail | null;
  analysis: AnalysisDetail | null;
  aiDraft: string | null;
  recommendedMaterials: RecommendedMaterial[];
  detailFeedback: string | null;
}

export interface CoachingSessionResponse {
  mentee: MenteeBasicInfo;
  date: string;
  tasks: TaskCoachingItem[];
  dailySummary: string | null;
}

export interface CoachingDetailResponse {
  submission: SubmissionDetail;
  analysis: AnalysisDetail | null;
  taskTitle: string;
  menteeName: string;
}

export interface AiDraftResponse {
  submissionId: string;
  draft: string;
  suggestedSignalLight: string | null;
  suggestedScore: number | null;
}

export interface RecommendationsResponse {
  submissionId: string;
  recommendations: RecommendedMaterial[];
}

export interface TaskFeedbackRequest {
  taskId: string;
  detail: string;
}

export interface DailySummaryRequest {
  menteeId: string;
  date: string;
  generalComment: string;
}

export interface AssignMaterialRequest {
  menteeId: string;
  materialId: string;
  date: string;
  title?: string;
}

// ─── Judgment ───

export interface JudgmentResponse {
  id: string;
  analysisId: string;
  mentorId: string;
  originalSignalLight: string;
  originalScore: number;
  finalSignalLight: string;
  finalScore: number;
  reason: string | null;
  isModified: boolean;
}

export interface JudgmentModifyRequest {
  signalLight: string;
  score: number;
  reason: string;
}

// ─── Feedback ───

export interface FeedbackItemRequest {
  taskId: string;
  detail: string;
}

export interface FeedbackCreateRequest {
  menteeId: string;
  date: string;
  items: FeedbackItemRequest[];
  summary?: string;
  isHighlighted?: boolean;
  generalComment?: string;
}

export interface FeedbackItemResponse {
  id: string;
  taskId: string;
  detail: string;
}

export interface FeedbackResponse {
  id: string;
  menteeId: string;
  mentorId: string;
  date: string;
  summary: string | null;
  isHighlighted: boolean;
  generalComment: string | null;
  items: FeedbackItemResponse[];
}

export interface FeedbackDetailResponse extends FeedbackResponse {
  mentorName: string | null;
}

// ─── Analysis ───

export type AnalysisResponse = AnalysisDetail;

export interface AnalysisStatusResponse {
  id: string;
  submissionId: string;
  status: string;
}

export interface AnalysisTriggerResponse {
  analysisId: string;
  status: string;
}

// ─── Materials ───

export interface MaterialResponse {
  id: string;
  title: string;
  type: string;
  subject: string;
  abilityTags: string[];
  difficulty: number | null;
  contentUrl: string;
  createdAt: string;
}

export interface MaterialCreateRequest {
  title: string;
  type: string;
  subject: string;
  abilityTags?: string[];
  difficulty?: number;
  contentUrl: string;
}

// ─── Uploads ───

export interface UploadResponse {
  url: string;
  originalName: string;
  size: number;
}

export interface PresignedUrlResponse {
  presignedUrl: string;
  expiresIn: number;
}

// ─── MyPage ───

export interface MyPageResponse {
  id: string;
  role: string;
  name: string;
  profileImage: string | null;
  joinedAt: string;
  university: string;
  college: string;
  department: string;
  enrollmentStatus: string;
  subjects: string[];
  activitySummary: {
    totalFeedbacks: number;
    consecutiveDays: number;
  };
}

export interface MyPageUpdateRequest {
  name?: string;
}

// ─── Submissions ───

export interface SubmissionResponse {
  id: string;
  taskId: string;
  menteeId: string;
  submissionType: string;
  textContent: string | null;
  images: string[];
  selfScoreCorrect: number | null;
  selfScoreTotal: number | null;
  wrongQuestions: number[];
  comment: string | null;
  problemResponses: ProblemResponseData[];
  submittedAt: string;
}

export interface ProblemResponseData {
  problemId: string;
  answer: string | null;
  textNote: string | null;
  highlightData: Record<string, unknown> | null;
  drawingUrl: string | null;
}
