// ===== GET /api/my (멘티 응답) =====

export interface MentorInfo {
  id: string;
  name: string;
  university: string;
  department: string;
}

export interface SubjectStat {
  subject: string;
  abilityTags: string[];
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
  avgDensityScore: number | null;
}

export interface ActivitySummary {
  activeDays: number;
  consecutiveDays: number;
  totalCompletedTasks: number;
  totalFeedbacks: number;
  overallCompletionRate: number;
}

export interface MenteeMyPageResponse {
  id: string;
  role: string;
  name: string;
  avatar: number;
  profileImage: string | null;
  joinedAt: string;
  school: string | null;
  grade: string | null;
  subjects: string[];
  mentor: MentorInfo | null;
  subjectStats: SubjectStat[];
  activitySummary: ActivitySummary | null;
}

// ===== PATCH /api/my =====

export interface MyPageUpdateRequest {
  name?: string;
  avatar?: number;
  school?: string;
}

// ===== Task 관련 =====

export interface TaskProblemResponse {
  id: string;
  taskId: string;
  number: number;
  title: string;
  content: string | null;
  options: { label: string; text: string }[] | null;
  displayOrder: number;
}

export interface TaskResponse {
  id: string;
  menteeId: string;
  createdByMentorId: string | null;
  date: string;
  title: string;
  goal: string | null;
  subject: string;
  abilityTag: string | null;
  materialType: string | null;
  materialId: string | null;
  materialUrl: string | null;
  isLocked: boolean;
  status: string;
  studyTimeMinutes: number | null;
  repeat: boolean;
  repeatDays: string[];
  targetStudyMinutes: number | null;
  memo: string | null;
  tags: string[];
  keyPoints: string | null;
  content: string | null;
  isBookmarked: boolean;
  problems: TaskProblemResponse[];
  problemCount: number;
  createdBy: string;
  displayOrder: number;
}

// ===== POST /api/tasks =====

export interface TaskCreateRequest {
  date: string;
  title: string;
  subject: "KOREAN" | "ENGLISH" | "MATH";
  repeat?: boolean;
  repeatDays?: string[];
  targetStudyMinutes?: number;
  memo?: string;
}

// ===== Submission 관련 =====

export interface ProblemResponseCreate {
  problemId: string;
  answer: string | null;
  textNote?: string | null;
  highlightData?: Record<string, unknown> | null;
  drawingUrl?: string | null;
}

export interface SubmissionCreateRequest {
  submissionType: "TEXT" | "DRAWING";
  textContent?: string;
  images?: string[];
  studyTimeMinutes?: number;
  selfScoreCorrect?: number;
  selfScoreTotal?: number;
  wrongQuestions?: number[];
  comment?: string;
  problemResponses?: ProblemResponseCreate[];
}

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
  submittedAt: string;
}

// ===== Analysis 관련 =====

export interface TraceTypesData {
  underlineRatio: number;
  memoRatio: number;
  solutionRatio: number;
}

export interface PartDensityItem {
  partNumber: number;
  partTitle: string;
  density: number;
}

export interface AnalysisResponse {
  id: string;
  submissionId: string;
  status: string;
  signalLight: string | null;
  densityScore: number | null;
  writingRatio: number | null;
  traceTypes: TraceTypesData | null;
  partDensity: PartDensityItem[] | null;
  pageHeatmap: unknown | null;
  summary: string | null;
  detailedAnalysis: string | null;
  mentorTip: string | null;
  createdAt: string;
  updatedAt: string;
}

// ===== Upload 관련 =====

export interface StudyPhotoResponse {
  url: string;
  presignedUrl: string;
  originalName: string;
  size: number;
  ocrReady: boolean;
  ocrMessage: string;
}
