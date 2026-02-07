/* eslint-disable @typescript-eslint/no-explicit-any */

// === MOCK FILE (generated) ===

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type QueryValue = string | number | boolean | undefined | null;
export type Query = Record<string, QueryValue>;

export interface MockRequest {
  method: string;
  path: string;
  query?: Query;
  body?: any;
}

export type SuccessResponse<T> = {
  success: true;
  data: T;
  message?: string | null;
};

export type ErrorResponse = {
  success: false;
  error: { code: string; message: string };
};

const DEFAULT_DELAY_MS = 120;

const ok = <T>(data: T, message: string | null = null): SuccessResponse<T> => ({
  success: true,
  data,
  message,
});

const fail = (code: string, message: string): ErrorResponse => ({
  success: false,
  error: { code, message },
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const normalizePath = (path: string) => {
  if (!path) return "/";
  const clean = path.split("?")[0] ?? path;
  const trimmed = clean.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
};

const parseDate = (value: string) => new Date(`${value}T00:00:00Z`);
const formatDate = (value: Date) => value.toISOString().slice(0, 10);

const nextId = (() => {
  let counter = 1000;
  return (prefix: string) => `${prefix}-${counter++}`;
})();

const users = [
  {
    id: "user-mentee-1",
    loginId: "mentee01",
    role: "MENTEE",
    name: "박진",
    phone: "01011112222",
    profileImage: null,
    nickname: "진",
  },
  {
    id: "user-mentor-1",
    loginId: "mentor01",
    role: "MENTOR",
    name: "김서연",
    phone: "01033334444",
    profileImage: null,
    nickname: "서연",
  },
  {
    id: "user-parent-1",
    loginId: "parent01",
    role: "PARENT",
    name: "박미나",
    phone: "01055556666",
    profileImage: null,
    nickname: null,
  },
];

const menteeProfile = {
  id: "mentee-1",
  userId: "user-mentee-1",
  school: "서울고등학교",
  grade: "HIGH2",
  subjects: ["KOREAN", "MATH"],
  currentGrades: { KOREAN: 3, ENGLISH: 4, MATH: 2 },
  targetGrades: { KOREAN: 2, ENGLISH: 2, MATH: 1 },
  onboardingDone: true,
  inviteCode: "INVITE-1234",
};

const mentorProfile = {
  id: "mentor-1",
  userId: "user-mentor-1",
  university: "서울대학교",
  college: "사범대학",
  department: "교육학과",
  enrollmentStatus: "재학중",
  subjects: ["KOREAN", "ENGLISH", "MATH"],
  coachingExperience: true,
  onboardingDone: true,
  joinedAt: "2025-12-24T00:00:00Z",
};

const parentProfile = {
  id: "parent-1",
  userId: "user-parent-1",
  menteeId: menteeProfile.id,
};

let tasks: any[] = [
  {
    id: "task-1",
    menteeId: menteeProfile.id,
    createdByMentorId: mentorProfile.id,
    date: "2026-02-05",
    title: "수학 문제집 p.12-15",
    goal: "20문제 풀기",
    subject: "MATH",
    abilityTag: "함수",
    materialType: "PDF",
    materialId: "material-1",
    materialUrl: "https://example.com/material-1.pdf",
    isLocked: false,
    status: "PENDING",
    studyTimeMinutes: 30,
    repeat: false,
    repeatDays: [],
    targetStudyMinutes: 60,
    memo: "오답 위주 복습",
    tags: ["수학", "대수"],
    keyPoints: "이차함수",
    content: null,
    isBookmarked: false,
    problems: [],
    problemCount: 0,
    createdBy: "MENTEE",
    displayOrder: 0,
  },
  {
    id: "task-2",
    menteeId: menteeProfile.id,
    createdByMentorId: mentorProfile.id,
    date: "2026-02-05",
    title: "영어 지문 독해 Day 5",
    goal: "지문 2개 읽기",
    subject: "ENGLISH",
    abilityTag: "독해",
    materialType: "COLUMN",
    materialId: "material-2",
    materialUrl: "https://example.com/material-2",
    isLocked: false,
    status: "COMPLETED",
    studyTimeMinutes: 45,
    repeat: false,
    repeatDays: [],
    targetStudyMinutes: 40,
    memo: null,
    tags: ["영어", "독해"],
    keyPoints: null,
    content: null,
    isBookmarked: true,
    problems: [],
    problemCount: 0,
    createdBy: "MENTOR",
    displayOrder: 1,
  },
  {
    id: "task-3",
    menteeId: menteeProfile.id,
    createdByMentorId: null,
    date: "2026-02-06",
    title: "국어 에세이 초안",
    goal: "개요 + 서론 작성",
    subject: "KOREAN",
    abilityTag: "글쓰기",
    materialType: null,
    materialId: null,
    materialUrl: null,
    isLocked: false,
    status: "SUBMITTED",
    studyTimeMinutes: 50,
    repeat: false,
    repeatDays: [],
    targetStudyMinutes: 50,
    memo: "구조 피드백 부탁",
    tags: ["국어", "글쓰기"],
    keyPoints: "주장 + 근거",
    content: null,
    isBookmarked: false,
    problems: [],
    problemCount: 0,
    createdBy: "MENTEE",
    displayOrder: 0,
  },
  {
    id: "task-4",
    menteeId: menteeProfile.id,
    createdByMentorId: mentorProfile.id,
    date: "2026-02-07",
    title: "수학 퀴즈 오답정리",
    goal: "실수한 문제 복습",
    subject: "MATH",
    abilityTag: "대수",
    materialType: "PDF",
    materialId: "material-1",
    materialUrl: "https://example.com/material-1.pdf",
    isLocked: false,
    status: "FAILED",
    studyTimeMinutes: 10,
    repeat: false,
    repeatDays: [],
    targetStudyMinutes: 30,
    memo: "시간 부족",
    tags: ["수학"],
    keyPoints: null,
    content: null,
    isBookmarked: false,
    problems: [],
    problemCount: 0,
    createdBy: "MENTOR",
    displayOrder: 0,
  },
];

let taskProblems: any[] = [
  {
    id: "problem-1",
    taskId: "task-1",
    number: 1,
    title: "x + 2 = 5를 풀어라",
    content: null,
    options: null,
    correctAnswer: "3",
    displayOrder: 0,
  },
  {
    id: "problem-2",
    taskId: "task-1",
    number: 2,
    title: "x^2 - 9를 인수분해하라",
    content: null,
    options: null,
    correctAnswer: "(x-3)(x+3)",
    displayOrder: 1,
  },
];

let submissions: any[] = [
  {
    id: "submission-1",
    taskId: "task-2",
    menteeId: menteeProfile.id,
    submissionType: "TEXT",
    textContent: "지문 요약을 작성했습니다.",
    images: [],
    selfScoreCorrect: 8,
    selfScoreTotal: 10,
    wrongQuestions: [3, 7],
    comment: "7번이 이해가 안 돼요.",
    problemResponses: [],
    submittedAt: "2026-02-05T09:30:00Z",
  },
];

let analyses: any[] = [
  {
    id: "analysis-1",
    submissionId: "submission-1",
    status: "COMPLETED",
    signalLight: "YELLOW",
    densityScore: 65,
    writingRatio: 0.42,
    traceTypes: { underlineRatio: 20, memoRatio: 50, solutionRatio: 30 },
    partDensity: [
      { partNumber: 1, partTitle: "파트 A", density: 70 },
      { partNumber: 2, partTitle: "파트 B", density: 55 },
    ],
    pageHeatmap: null,
    summary: "전반적으로 양호하나 일부 빈칸이 보입니다.",
    mentorTip: "구조와 명확성을 강화해 보세요.",
    createdAt: "2026-02-05T10:00:00Z",
    updatedAt: "2026-02-05T10:10:00Z",
  },
];

let judgments: any[] = [
  {
    id: "judgment-1",
    analysisId: "analysis-1",
    mentorId: mentorProfile.id,
    originalSignalLight: "YELLOW",
    originalScore: 65,
    finalSignalLight: "YELLOW",
    finalScore: 65,
    reason: null,
    isModified: false,
  },
];

let plannerComments: any[] = [
  {
    id: "comment-1",
    menteeId: menteeProfile.id,
    date: "2026-02-05",
    content: "2번 문제 풀이가 이해가 안 돼요.",
    mentorReply: "인수분해 공식 복습해 보세요.",
    repliedAt: "2026-02-05T18:00:00Z",
    createdAt: "2026-02-05T08:00:00Z",
  },
  {
    id: "comment-2",
    menteeId: menteeProfile.id,
    date: "2026-02-06",
    content: "개요가 괜찮은지 봐주세요.",
    mentorReply: null,
    repliedAt: null,
    createdAt: "2026-02-06T08:10:00Z",
  },
];

let feedbacks: any[] = [
  {
    id: "feedback-1",
    menteeId: menteeProfile.id,
    mentorId: mentorProfile.id,
    date: "2026-02-04",
    summary: "이번 주 학습 페이스가 좋습니다.",
    isHighlighted: true,
    generalComment: "꾸준함을 유지하세요.",
    items: [
      { id: "feedback-item-1", taskId: "task-2", detail: "독해 속도가 좋습니다." },
    ],
    mentorName: users[1].name,
  },
];

let materials: any[] = [
  {
    id: "material-1",
    title: "대수 기본",
    type: "PDF",
    subject: "MATH",
    abilityTags: ["대수"],
    difficulty: 3,
    contentUrl: "https://example.com/material-1.pdf",
    createdAt: "2026-02-01T00:00:00Z",
  },
  {
    id: "material-2",
    title: "독해 훈련 A",
    type: "COLUMN",
    subject: "ENGLISH",
    abilityTags: ["독해"],
    difficulty: 2,
    contentUrl: "https://example.com/material-2",
    createdAt: "2026-02-01T00:00:00Z",
  },
];

let wrongAnswerSheets: any[] = [
  {
    id: "wrong-1",
    submissionId: "submission-1",
    problemId: "problem-2",
    problemNumber: 2,
    problemTitle: "x^2 - 9 인수분해",
    originalAnswer: "x^2 - 3^2",
    correctAnswer: "(x-3)(x+3)",
    explanation: "차의 제곱 공식 사용",
    relatedConcepts: ["인수분해"],
    practiceUrl: "https://example.com/practice-1",
    isCompleted: false,
    completedAt: null,
    createdAt: "2026-02-05T10:30:00Z",
  },
];

const reviewQueue: any[] = [
  {
    submissionId: "submission-1",
    taskId: "task-2",
    taskTitle: "영어 지문 독해 Day 5",
    menteeName: users[0].name,
    menteeId: menteeProfile.id,
    subject: "ENGLISH",
    abilityTag: "독해",
    submittedAt: "2026-02-05T09:30:00Z",
    elapsedMinutes: 90,
    densityScore: 65,
  },
];

const commentQueue: any[] = plannerComments
  .filter((c) => !c.mentorReply)
  .map((c) => ({
    commentId: c.id,
    menteeId: c.menteeId,
    menteeName: users[0].name,
    content: c.content,
    createdAt: c.createdAt,
    elapsedMinutes: 120,
    hasReply: !!c.mentorReply,
  }));

const menteeList: any[] = [
  {
    menteeId: menteeProfile.id,
    name: users[0].name,
    grade: menteeProfile.grade,
    subjects: menteeProfile.subjects,
    completionRate: 0.6,
    recentDensity: 0.65,
  },
];

const defaultTokens = {
  accessToken: "mock-access-token",
  refreshToken: "mock-refresh-token",
};

const state = {
  currentUserId: users[0].id,
};

const getCurrentUser = () => users.find((u) => u.id === state.currentUserId) ?? users[0];

const getProfileForUser = (user: any) => {
  if (user.role === "MENTEE") return menteeProfile;
  if (user.role === "MENTOR") return mentorProfile;
  if (user.role === "PARENT") return parentProfile;
  return null;
};

const attachProblems = (task: any) => {
  const problems = taskProblems
    .filter((p) => p.taskId === task.id)
    .map((p) => ({
      id: p.id,
      taskId: p.taskId,
      number: p.number,
      title: p.title,
      content: p.content,
      options: p.options ?? null,
      displayOrder: p.displayOrder,
    }));

  return {
    ...task,
    problems,
    problemCount: problems.length,
  };
};

const getTasksByDate = (date?: string) => {
  if (!date) return tasks.map(attachProblems);
  return tasks.filter((t) => t.date === date).map(attachProblems);
};

const calcCompletion = (date?: string) => {
  const list = getTasksByDate(date);
  const total = list.length;
  const completed = list.filter((t) => t.status === "COMPLETED").length;
  return { total, completed, rate: total === 0 ? 0 : completed / total };
};

const ensureArray = <T>(value: T[] | undefined | null) => value ?? [];

export const mockGet = (path: string, query?: Query) =>
  mockRequest({ method: "GET", path, query });

export const mockPost = (path: string, body?: any, query?: Query) =>
  mockRequest({ method: "POST", path, query, body });

export const mockPut = (path: string, body?: any, query?: Query) =>
  mockRequest({ method: "PUT", path, query, body });

export const mockPatch = (path: string, body?: any, query?: Query) =>
  mockRequest({ method: "PATCH", path, query, body });

export const mockDelete = (path: string, query?: Query) =>
  mockRequest({ method: "DELETE", path, query });

export async function mockRequest(req: MockRequest): Promise<SuccessResponse<any> | ErrorResponse> {
  const method = req.method.toUpperCase() as HttpMethod;
  const path = normalizePath(req.path);
  const query = req.query ?? {};
  const body = req.body ?? {};

  await delay(DEFAULT_DELAY_MS);

  // Auth
  if (method === "POST" && path === "/api/auth/signup") {
    const newUser = {
      id: nextId("user"),
      loginId: body.loginId ?? "newuser",
      role: body.role ?? "MENTEE",
      name: body.name ?? "새 사용자",
      phone: body.phone ?? "01000000000",
      profileImage: null,
      nickname: null,
    };
    users.push(newUser);
    state.currentUserId = newUser.id;
    return ok({ user: newUser, ...defaultTokens });
  }

  if (method === "POST" && path === "/api/auth/login") {
    const user = users.find((u) => u.loginId === body.loginId) ?? users[0];
    state.currentUserId = user.id;
    return ok({ user, ...defaultTokens });
  }

  if (method === "POST" && path === "/api/auth/logout") {
    return ok(null);
  }

  if (method === "GET" && path === "/api/auth/me") {
    const user = getCurrentUser();
    return ok({ user, profile: getProfileForUser(user) });
  }

  // Onboarding
  if (method === "PUT" && path === "/api/onboarding/mentee") {
    Object.assign(menteeProfile, body, { onboardingDone: true });
    return ok(menteeProfile);
  }

  if (method === "PUT" && path === "/api/onboarding/mentor") {
    Object.assign(mentorProfile, body, { onboardingDone: true });
    return ok(mentorProfile);
  }

  if (method === "PUT" && path === "/api/onboarding/parent") {
    Object.assign(parentProfile, body);
    return ok(parentProfile);
  }

  // Tasks - problem routes first
  const taskProblemMatch = path.match(/^\/api\/tasks\/([^/]+)\/problems$/);
  if (taskProblemMatch && method === "POST") {
    const taskId = taskProblemMatch[1];
    const problem = {
      id: nextId("problem"),
      taskId,
      number: body.number ?? 1,
      title: body.title ?? "새 문제",
      content: body.content ?? null,
      options: body.options ?? null,
      correctAnswer: body.correctAnswer ?? null,
      displayOrder: body.displayOrder ?? 0,
    };
    taskProblems.push(problem);
    return ok({
      id: problem.id,
      taskId: problem.taskId,
      number: problem.number,
      title: problem.title,
      content: problem.content,
      options: problem.options,
      displayOrder: problem.displayOrder,
      correctAnswer: problem.correctAnswer,
    });
  }

  const taskProblemDetailMatch = path.match(
    /^\/api\/tasks\/([^/]+)\/problems\/([^/]+)$/
  );
  if (taskProblemDetailMatch && method === "PUT") {
    const problemId = taskProblemDetailMatch[2];
    const problem = taskProblems.find((p) => p.id === problemId);
    if (!problem) return fail("PROBLEM_001", "문제를 찾을 수 없습니다.");
    Object.assign(problem, body);
    return ok({
      id: problem.id,
      taskId: problem.taskId,
      number: problem.number,
      title: problem.title,
      content: problem.content,
      options: problem.options,
      displayOrder: problem.displayOrder,
      correctAnswer: problem.correctAnswer,
    });
  }

  if (taskProblemDetailMatch && method === "DELETE") {
    const problemId = taskProblemDetailMatch[2];
    taskProblems = taskProblems.filter((p) => p.id !== problemId);
    return ok(null);
  }

  // Tasks - submissions
  const taskSubmissionsMatch = path.match(/^\/api\/tasks\/([^/]+)\/submissions$/);
  if (taskSubmissionsMatch && method === "POST") {
    const taskId = taskSubmissionsMatch[1];
    const submission = {
      id: nextId("submission"),
      taskId,
      menteeId: menteeProfile.id,
      submissionType: body.submissionType ?? "TEXT",
      textContent: body.textContent ?? null,
      images: ensureArray(body.images),
      selfScoreCorrect: body.selfScoreCorrect ?? null,
      selfScoreTotal: body.selfScoreTotal ?? null,
      wrongQuestions: ensureArray(body.wrongQuestions),
      comment: body.comment ?? null,
      problemResponses: ensureArray(body.problemResponses),
      submittedAt: "2026-02-05T12:00:00Z",
    };
    submissions.push(submission);
    return ok(submission);
  }

  if (taskSubmissionsMatch && method === "GET") {
    const taskId = taskSubmissionsMatch[1];
    return ok(submissions.filter((s) => s.taskId === taskId));
  }

  const submissionScoreMatch = path.match(/^\/api\/submissions\/([^/]+)\/self-score$/);
  if (submissionScoreMatch && method === "PUT") {
    const submissionId = submissionScoreMatch[1];
    const submission = submissions.find((s) => s.id === submissionId);
    if (!submission) return fail("SUBMIT_003", "제출 내역을 찾을 수 없습니다.");
    submission.selfScoreCorrect = body.selfScoreCorrect ?? submission.selfScoreCorrect;
    submission.selfScoreTotal = body.selfScoreTotal ?? submission.selfScoreTotal;
    submission.wrongQuestions = body.wrongQuestions ?? submission.wrongQuestions;
    return ok(submission);
  }

  // Tasks - main
  if (method === "GET" && path === "/api/tasks") {
    const date = typeof query.date === "string" ? query.date : undefined;
    return ok(getTasksByDate(date));
  }

  if (method === "POST" && path === "/api/tasks") {
    const newTask = {
      id: nextId("task"),
      menteeId: menteeProfile.id,
      createdByMentorId: body.menteeId ? mentorProfile.id : null,
      date: body.date ?? "2026-02-05",
      title: body.title ?? "새 과제",
      goal: body.goal ?? null,
      subject: body.subject ?? "MATH",
      abilityTag: body.abilityTag ?? null,
      materialType: body.materialType ?? null,
      materialId: body.materialId ?? null,
      materialUrl: body.materialUrl ?? null,
      isLocked: false,
      status: "PENDING",
      studyTimeMinutes: null,
      repeat: body.repeat ?? false,
      repeatDays: ensureArray(body.repeatDays),
      targetStudyMinutes: body.targetStudyMinutes ?? null,
      memo: body.memo ?? null,
      tags: ensureArray(body.tags),
      keyPoints: body.keyPoints ?? null,
      content: body.content ?? null,
      isBookmarked: false,
      problems: [],
      problemCount: 0,
      createdBy: body.menteeId ? "MENTOR" : "MENTEE",
      displayOrder: body.displayOrder ?? 0,
    };
    tasks.push(newTask);
    return ok(attachProblems(newTask));
  }

  const taskDetailMatch = path.match(/^\/api\/tasks\/([^/]+)$/);
  if (taskDetailMatch && method === "GET") {
    const taskId = taskDetailMatch[1];
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return fail("TASK_002", "과제를 찾을 수 없습니다.");
    return ok(attachProblems(task));
  }

  if (taskDetailMatch && method === "PUT") {
    const taskId = taskDetailMatch[1];
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return fail("TASK_002", "과제를 찾을 수 없습니다.");
    Object.assign(task, body);
    return ok(attachProblems(task));
  }

  if (taskDetailMatch && method === "DELETE") {
    const taskId = taskDetailMatch[1];
    tasks = tasks.filter((t) => t.id !== taskId);
    return ok(null);
  }

  const taskStudyMatch = path.match(/^\/api\/tasks\/([^/]+)\/study-time$/);
  if (taskStudyMatch && method === "PATCH") {
    const task = tasks.find((t) => t.id === taskStudyMatch[1]);
    if (!task) return fail("TASK_002", "과제를 찾을 수 없습니다.");
    task.studyTimeMinutes = body.minutes ?? task.studyTimeMinutes;
    return ok(attachProblems(task));
  }

  const taskBookmarkMatch = path.match(/^\/api\/tasks\/([^/]+)\/bookmark$/);
  if (taskBookmarkMatch && method === "PATCH") {
    const task = tasks.find((t) => t.id === taskBookmarkMatch[1]);
    if (!task) return fail("TASK_002", "과제를 찾을 수 없습니다.");
    task.isBookmarked = body.isBookmarked ?? !task.isBookmarked;
    return ok(attachProblems(task));
  }

  // Planner
  if (method === "GET" && path === "/api/planner") {
    const date = typeof query.date === "string" ? query.date : "2026-02-05";
    const dateTasks = getTasksByDate(date);
    const dateComments = plannerComments.filter((c) => c.date === date);
    const completion = calcCompletion(date);
    const yesterday = formatDate(new Date(parseDate(date).getTime() - 86400000));
    const yesterdayFeedback = feedbacks.find((f) => f.date === yesterday) ?? null;
    const todayFeedback = feedbacks.find((f) => f.date === date) ?? null;

    return ok({
      date,
      tasks: dateTasks,
      comments: dateComments,
      completionRate: completion.rate,
      totalCount: completion.total,
      completedCount: completion.completed,
      hasYesterdayFeedback: !!yesterdayFeedback,
      yesterdayFeedbackDate: yesterdayFeedback ? yesterday : null,
      todayFeedback: todayFeedback
        ? {
            id: todayFeedback.id,
            date: todayFeedback.date,
            summary: todayFeedback.summary,
            generalComment: todayFeedback.generalComment,
            isHighlighted: todayFeedback.isHighlighted,
            mentorName: todayFeedback.mentorName,
          }
        : null,
    });
  }

  if (method === "GET" && path === "/api/planner/completion-rate") {
    const date = typeof query.date === "string" ? query.date : "2026-02-05";
    const completion = calcCompletion(date);
    return ok({ date, total: completion.total, completed: completion.completed, rate: completion.rate });
  }

  if (method === "GET" && path === "/api/planner/weekly") {
    const weekOf = typeof query.weekOf === "string" ? query.weekOf : "2026-02-03";
    const start = parseDate(weekOf);
    const days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(start.getTime() + i * 86400000);
      const date = formatDate(d);
      const completion = calcCompletion(date);
      return { date, total: completion.total, completed: completion.completed, rate: completion.rate };
    });
    return ok({ weekOf, days });
  }

  if (method === "GET" && path === "/api/planner/monthly") {
    const year = Number(query.year ?? 2026);
    const month = Number(query.month ?? 2);
    const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
    const days = Array.from({ length: lastDay }).map((_, i) => {
      const date = formatDate(new Date(Date.UTC(year, month - 1, i + 1)));
      const completion = calcCompletion(date);
      return { date, total: completion.total, completed: completion.completed, rate: completion.rate };
    });
    return ok({ year, month, days });
  }

  if (method === "POST" && path === "/api/planner/comments") {
    const newComment = {
      id: nextId("comment"),
      menteeId: menteeProfile.id,
      date: body.date ?? "2026-02-05",
      content: body.content ?? "",
      mentorReply: null,
      repliedAt: null,
      createdAt: "2026-02-05T12:00:00Z",
    };
    plannerComments.push(newComment);
    return ok(newComment);
  }

  if (method === "GET" && path === "/api/planner/comments") {
    const date = typeof query.date === "string" ? query.date : undefined;
    const list = date ? plannerComments.filter((c) => c.date === date) : plannerComments;
    return ok(list);
  }

  const plannerReplyMatch = path.match(/^\/api\/planner\/comments\/([^/]+)\/reply$/);
  if (plannerReplyMatch && method === "PUT") {
    const comment = plannerComments.find((c) => c.id === plannerReplyMatch[1]);
    if (!comment) return fail("COMMENT_002", "코멘트를 찾을 수 없습니다.");
    comment.mentorReply = body.reply ?? comment.mentorReply;
    comment.repliedAt = "2026-02-05T18:00:00Z";
    return ok(comment);
  }

  if (method === "GET" && path === "/api/planner/yesterday-feedback") {
    const date = typeof query.date === "string" ? query.date : "2026-02-05";
    const yesterday = formatDate(new Date(parseDate(date).getTime() - 86400000));
    const feedback = feedbacks.find((f) => f.date === yesterday);
    if (!feedback) return ok(null);
    return ok({
      id: feedback.id,
      date: feedback.date,
      summary: feedback.summary,
      generalComment: feedback.generalComment,
      isHighlighted: feedback.isHighlighted,
    });
  }

  // Mentor
  if (method === "GET" && path === "/api/mentor/dashboard") {
    return ok({ mentees: menteeList, reviewQueue, commentQueue });
  }

  if (method === "GET" && path === "/api/mentor/mentees") {
    return ok(menteeList);
  }

  const mentorMenteeMatch = path.match(/^\/api\/mentor\/mentees\/([^/]+)$/);
  if (mentorMenteeMatch && method === "GET") {
    const menteeId = mentorMenteeMatch[1];
    const list = tasks.filter((t) => t.menteeId === menteeId).map(attachProblems);
    return ok({
      menteeId,
      name: users[0].name,
      grade: menteeProfile.grade,
      subjects: menteeProfile.subjects,
      tasks: list,
      completionRate: 0.6,
    });
  }

  if (method === "GET" && path === "/api/mentor/review-queue") {
    return ok(reviewQueue);
  }

  const judgmentMatch = path.match(/^\/api\/mentor\/judgments\/([^/]+)$/);
  if (judgmentMatch && method === "GET") {
    const analysisId = judgmentMatch[1];
    const judgment = judgments.find((j) => j.analysisId === analysisId);
    if (!judgment) return fail("JUDGE_003", "판정을 찾을 수 없습니다.");
    return ok(judgment);
  }

  const judgmentConfirmMatch = path.match(/^\/api\/mentor\/judgments\/([^/]+)\/confirm$/);
  if (judgmentConfirmMatch && method === "POST") {
    const analysisId = judgmentConfirmMatch[1];
    const analysis = analyses.find((a) => a.submissionId === analysisId || a.id === analysisId) ?? analyses[0];
    const judgment = {
      id: nextId("judgment"),
      analysisId: analysis.id,
      mentorId: mentorProfile.id,
      originalSignalLight: analysis.signalLight ?? "YELLOW",
      originalScore: analysis.densityScore ?? 60,
      finalSignalLight: analysis.signalLight ?? "YELLOW",
      finalScore: analysis.densityScore ?? 60,
      reason: null,
      isModified: false,
    };
    judgments.push(judgment);
    return ok(judgment);
  }

  const judgmentModifyMatch = path.match(/^\/api\/mentor\/judgments\/([^/]+)\/modify$/);
  if (judgmentModifyMatch && method === "POST") {
    const analysisId = judgmentModifyMatch[1];
    let judgment = judgments.find((j) => j.analysisId === analysisId);
    if (!judgment) {
      judgment = {
        id: nextId("judgment"),
        analysisId,
        mentorId: mentorProfile.id,
        originalSignalLight: "YELLOW",
        originalScore: 60,
        finalSignalLight: body.signalLight ?? "YELLOW",
        finalScore: body.score ?? 60,
        reason: body.reason ?? null,
        isModified: true,
      };
      judgments.push(judgment);
    } else {
      judgment.finalSignalLight = body.signalLight ?? judgment.finalSignalLight;
      judgment.finalScore = body.score ?? judgment.finalScore;
      judgment.reason = body.reason ?? judgment.reason;
      judgment.isModified = true;
    }
    return ok(judgment);
  }

  if (method === "POST" && path === "/api/mentor/feedback") {
    const feedback = {
      id: nextId("feedback"),
      menteeId: body.menteeId ?? menteeProfile.id,
      mentorId: mentorProfile.id,
      date: body.date ?? "2026-02-05",
      summary: body.summary ?? null,
      isHighlighted: body.isHighlighted ?? false,
      generalComment: body.generalComment ?? null,
      items: ensureArray(body.items).map((item: any) => ({
        id: nextId("feedback-item"),
        taskId: item.taskId,
        detail: item.detail,
      })),
    };
    feedbacks.push({ ...feedback, mentorName: users[1].name });
    return ok(feedback);
  }

  if (method === "GET" && path === "/api/mentor/comments") {
    return ok(commentQueue);
  }

  const mentorCommentReplyMatch = path.match(/^\/api\/mentor\/comments\/([^/]+)\/reply$/);
  if (mentorCommentReplyMatch && method === "POST") {
    const commentId = mentorCommentReplyMatch[1];
    const comment = plannerComments.find((c) => c.id === commentId);
    if (!comment) return fail("COMMENT_002", "코멘트를 찾을 수 없습니다.");
    comment.mentorReply = body.reply ?? comment.mentorReply;
    comment.repliedAt = "2026-02-05T18:00:00Z";
    return ok({ commentId: comment.id, mentorReply: comment.mentorReply, repliedAt: comment.repliedAt });
  }

  // Parent
  if (method === "GET" && path === "/api/parent/dashboard") {
    const completion = calcCompletion("2026-02-05");
    return ok({
      menteeName: users[0].name,
      menteeGrade: menteeProfile.grade,
      menteeSubjects: menteeProfile.subjects,
      todayTaskCount: completion.total,
      todayCompletedCount: completion.completed,
      todayCompletionRate: completion.rate,
      mentorName: users[1].name,
      recentFeedbackCount: feedbacks.length,
    });
  }

  if (method === "GET" && path === "/api/parent/mentee-status") {
    return ok({
      weeklyCompletionRates: [
        { date: "2026-02-01", rate: 0.4 },
        { date: "2026-02-02", rate: 0.6 },
        { date: "2026-02-03", rate: 0.5 },
      ],
      totalTasksThisWeek: 8,
      completedTasksThisWeek: 5,
    });
  }

  if (method === "GET" && path === "/api/parent/mentor-info") {
    return ok({
      mentorId: mentorProfile.id,
      mentorName: users[1].name,
      university: mentorProfile.university,
      department: mentorProfile.department,
      subjects: mentorProfile.subjects,
      recentFeedbackCount: feedbacks.length,
    });
  }

  // Uploads
  if (method === "POST" && path === "/api/uploads/image") {
    return ok({ url: "https://example.com/upload/image.jpg", originalName: "image.jpg", size: 123456 });
  }

  if (method === "POST" && path === "/api/uploads/pdf") {
    return ok({ url: "https://example.com/upload/file.pdf", originalName: "file.pdf", size: 234567 });
  }

  if (method === "POST" && path === "/api/uploads/study-photo") {
    return ok({
      url: "https://example.com/upload/study.jpg",
      presignedUrl: "https://example.com/presigned/study.jpg",
      originalName: "study.jpg",
      size: 345678,
      ocrReady: true,
      ocrMessage: "OK",
    });
  }

  if (method === "POST" && path === "/api/uploads/presigned-url") {
    return ok({ presignedUrl: `${body.url}?presigned=1`, expiresIn: 3600 });
  }

  if (method === "POST" && path === "/api/uploads/validate-image") {
    return ok({ valid: true, issues: [] });
  }

  // AI Analysis
  const analysisTriggerMatch = path.match(/^\/api\/analysis\/([^/]+)\/trigger$/);
  if (analysisTriggerMatch && method === "POST") {
    const submissionId = analysisTriggerMatch[1];
    let analysis = analyses.find((a) => a.submissionId === submissionId);
    if (!analysis) {
      analysis = {
        id: nextId("analysis"),
        submissionId,
        status: "PROCESSING",
        signalLight: null,
        densityScore: null,
        writingRatio: null,
        traceTypes: null,
        partDensity: null,
        pageHeatmap: null,
        summary: null,
        mentorTip: null,
        createdAt: "2026-02-05T12:00:00Z",
        updatedAt: "2026-02-05T12:00:00Z",
      };
      analyses.push(analysis);
    }
    return ok({ analysisId: analysis.id, status: analysis.status });
  }

  const analysisRetryMatch = path.match(/^\/api\/analysis\/([^/]+)\/retry$/);
  if (analysisRetryMatch && method === "POST") {
    const submissionId = analysisRetryMatch[1];
    const analysis = analyses.find((a) => a.submissionId === submissionId) ?? analyses[0];
    analysis.status = "PROCESSING";
    analysis.updatedAt = "2026-02-05T12:10:00Z";
    return ok({ analysisId: analysis.id, status: analysis.status });
  }

  const analysisStatusMatch = path.match(/^\/api\/analysis\/([^/]+)\/status$/);
  if (analysisStatusMatch && method === "GET") {
    const submissionId = analysisStatusMatch[1];
    const analysis = analyses.find((a) => a.submissionId === submissionId) ?? analyses[0];
    return ok({ id: analysis.id, submissionId: analysis.submissionId, status: analysis.status });
  }

  const analysisMatch = path.match(/^\/api\/analysis\/([^/]+)$/);
  if (analysisMatch && method === "GET") {
    const submissionId = analysisMatch[1];
    const analysis = analyses.find((a) => a.submissionId === submissionId) ?? analyses[0];
    return ok(analysis);
  }

  // Materials
  if (method === "GET" && path === "/api/materials") {
    const subject = typeof query.subject === "string" ? query.subject : null;
    const type = typeof query.type === "string" ? query.type : null;
    const list = materials.filter((m) =>
      (!subject || m.subject === subject) && (!type || m.type === type)
    );
    return ok(list);
  }

  if (method === "POST" && path === "/api/materials") {
    const material = {
      id: nextId("material"),
      title: body.title ?? "새 학습지",
      type: body.type ?? "PDF",
      subject: body.subject ?? "MATH",
      abilityTags: ensureArray(body.abilityTags),
      difficulty: body.difficulty ?? null,
      contentUrl: body.contentUrl ?? "https://example.com/material-new",
      createdAt: "2026-02-05T00:00:00Z",
    };
    materials.push(material);
    return ok(material);
  }

  const materialMatch = path.match(/^\/api\/materials\/([^/]+)$/);
  if (materialMatch && method === "GET") {
    const materialId = materialMatch[1];
    const material = materials.find((m) => m.id === materialId);
    if (!material) return fail("MATERIAL_001", "학습지를 찾을 수 없습니다.");
    return ok(material);
  }

  const materialDownloadMatch = path.match(/^\/api\/materials\/([^/]+)\/download$/);
  if (materialDownloadMatch && method === "GET") {
    const materialId = materialDownloadMatch[1];
    const material = materials.find((m) => m.id === materialId);
    if (!material) return fail("MATERIAL_001", "학습지를 찾을 수 없습니다.");
    return ok({ url: material.contentUrl });
  }

  // Coaching
  const coachingMatch = path.match(/^\/api\/coaching\/([^/]+)$/);
  if (coachingMatch && method === "GET") {
    const submissionId = coachingMatch[1];
    const submission = submissions.find((s) => s.id === submissionId) ?? submissions[0];
    const analysis = analyses.find((a) => a.submissionId === submission.id) ?? null;
    const task = tasks.find((t) => t.id === submission.taskId) ?? tasks[0];
    return ok({ submission, analysis, taskTitle: task.title, menteeName: users[0].name });
  }

  const coachingDraftMatch = path.match(/^\/api\/coaching\/([^/]+)\/ai-draft$/);
  if (coachingDraftMatch && method === "GET") {
    const submissionId = coachingDraftMatch[1];
    return ok({
      submissionId,
      draft: "AI가 구조와 명확성을 강화하라고 제안합니다.",
      suggestedSignalLight: "YELLOW",
      suggestedScore: 65,
    });
  }

  const coachingRecoMatch = path.match(/^\/api\/coaching\/([^/]+)\/recommendations$/);
  if (coachingRecoMatch && method === "GET") {
    const submissionId = coachingRecoMatch[1];
    return ok({
      submissionId,
      recommendations: materials.map((m) => ({
        materialId: m.id,
        title: m.title,
        subject: m.subject,
        abilityTags: m.abilityTags,
        difficulty: m.difficulty,
        reason: "최근 수행 결과에 기반한 추천입니다.",
      })),
    });
  }

  if (method === "POST" && path === "/api/coaching/assign-material") {
    const material = materials.find((m) => m.id === body.materialId) ?? materials[0];
    const newTask = {
      id: nextId("task"),
      menteeId: body.menteeId ?? menteeProfile.id,
      createdByMentorId: mentorProfile.id,
      date: body.date ?? "2026-02-06",
      title: body.title ?? material.title,
      goal: null,
      subject: material.subject,
      abilityTag: material.abilityTags[0] ?? null,
      materialType: material.type,
      materialId: material.id,
      materialUrl: material.contentUrl,
      isLocked: true,
      status: "PENDING",
      studyTimeMinutes: null,
      repeat: false,
      repeatDays: [],
      targetStudyMinutes: null,
      memo: null,
      tags: [],
      keyPoints: null,
      content: null,
      isBookmarked: false,
      problems: [],
      problemCount: 0,
      createdBy: "MENTOR",
      displayOrder: 0,
    };
    tasks.push(newTask);
    return ok(attachProblems(newTask));
  }

  // Feedback
  if (method === "GET" && path === "/api/feedback") {
    const menteeId = typeof query.menteeId === "string" ? query.menteeId : menteeProfile.id;
    const date = typeof query.date === "string" ? query.date : null;
    const list = feedbacks.filter((f) => f.menteeId === menteeId && (!date || f.date === date));
    return ok(
      list.map((f) => ({
        id: f.id,
        menteeId: f.menteeId,
        mentorId: f.mentorId,
        date: f.date,
        summary: f.summary,
        isHighlighted: f.isHighlighted,
        generalComment: f.generalComment,
        items: f.items,
        mentorName: f.mentorName,
      }))
    );
  }

  if (method === "GET" && path === "/api/feedback/by-subject") {
    const subject = typeof query.subject === "string" ? query.subject : "MATH";
    const list = tasks.filter((t) => t.subject === subject).map((t) => ({
      id: nextId("feedback-by-subject"),
      date: t.date,
      summary: "과목별 피드백 요약",
      isHighlighted: false,
      generalComment: null,
      mentorName: users[1].name,
      items: [
        {
          id: nextId("feedback-item"),
          taskId: t.id,
          detail: "정확도를 높여 보세요.",
          taskTitle: t.title,
          taskDate: t.date,
          aiSummary: "AI가 개선을 확인했습니다.",
          signalLight: "YELLOW",
          densityScore: 60,
          submissionId: submissions.find((s) => s.taskId === t.id)?.id ?? null,
        },
      ],
    }));
    return ok(list);
  }

  const feedbackDetailMatch = path.match(/^\/api\/feedback\/([^/]+)$/);
  if (feedbackDetailMatch && method === "GET") {
    const feedbackId = feedbackDetailMatch[1];
    const feedback = feedbacks.find((f) => f.id === feedbackId) ?? feedbacks[0];
    return ok({
      id: feedback.id,
      menteeId: feedback.menteeId,
      mentorId: feedback.mentorId,
      date: feedback.date,
      summary: feedback.summary,
      isHighlighted: feedback.isHighlighted,
      generalComment: feedback.generalComment,
      items: feedback.items,
      mentorName: feedback.mentorName,
    });
  }

  // Settings
  if (method === "GET" && path === "/api/settings/profile") {
    const user = getCurrentUser();
    return ok({
      id: user.id,
      loginId: user.loginId,
      name: user.name,
      phone: user.phone,
      profileImage: user.profileImage,
      nickname: user.nickname,
      role: user.role,
    });
  }

  if (method === "PUT" && path === "/api/settings/profile") {
    const user = getCurrentUser();
    Object.assign(user, body);
    return ok({
      id: user.id,
      loginId: user.loginId,
      name: user.name,
      phone: user.phone,
      profileImage: user.profileImage,
      nickname: user.nickname,
      role: user.role,
    });
  }

  if (method === "PUT" && path === "/api/settings/mentee") {
    Object.assign(menteeProfile, body);
    return ok({});
  }

  if (method === "PUT" && path === "/api/settings/mentor") {
    Object.assign(mentorProfile, body);
    return ok({});
  }

  // Wrong Answers
  if (method === "GET" && path === "/api/wrong-answers") {
    const submissionId = typeof query.submissionId === "string" ? query.submissionId : null;
    const list = submissionId
      ? wrongAnswerSheets.filter((w) => w.submissionId === submissionId)
      : wrongAnswerSheets;
    return ok(list);
  }

  const wrongAnswerMatch = path.match(/^\/api\/wrong-answers\/([^/]+)$/);
  if (wrongAnswerMatch && method === "GET") {
    const sheet = wrongAnswerSheets.find((w) => w.id === wrongAnswerMatch[1]);
    if (!sheet) return fail("WRONG_001", "오답 학습지를 찾을 수 없습니다.");
    return ok(sheet);
  }

  const wrongAnswerCompleteMatch = path.match(/^\/api\/wrong-answers\/([^/]+)\/complete$/);
  if (wrongAnswerCompleteMatch && method === "PATCH") {
    const sheet = wrongAnswerSheets.find((w) => w.id === wrongAnswerCompleteMatch[1]);
    if (!sheet) return fail("WRONG_001", "오답 학습지를 찾을 수 없습니다.");
    sheet.isCompleted = body.isCompleted ?? true;
    sheet.completedAt = sheet.isCompleted ? "2026-02-05T15:00:00Z" : null;
    return ok(sheet);
  }

  // Mentor My Page
  if (method === "GET" && path === "/api/my/mentor") {
    return ok({
      id: mentorProfile.id,
      role: "MENTOR",
      name: users[1].name,
      profileImage: users[1].profileImage,
      joinedAt: mentorProfile.joinedAt,
      university: mentorProfile.university,
      college: mentorProfile.college,
      department: mentorProfile.department,
      enrollmentStatus: mentorProfile.enrollmentStatus,
      subjects: mentorProfile.subjects,
      activitySummary: {
        totalFeedbacks: 98,
        consecutiveDays: 23,
      },
    });
  }

  // Mentee My Page
  if (method === "GET" && path === "/api/my") {
    return ok({
      id: menteeProfile.id,
      role: "MENTEE",
      name: users[0].name,
      profileImage: users[0].profileImage,
      joinedAt: "2025-12-01T00:00:00Z",
      school: menteeProfile.school,
      grade: menteeProfile.grade,
      subjects: menteeProfile.subjects,
      mentor: {
        id: mentorProfile.id,
        name: users[1].name,
        university: mentorProfile.university,
        department: mentorProfile.department,
      },
      subjectStats: [
        {
          subject: "MATH",
          abilityTags: ["대수"],
          totalTasks: 5,
          completedTasks: 3,
          completionRate: 0.6,
          avgDensityScore: 65,
        },
      ],
      activitySummary: {
        activeDays: 5,
        consecutiveDays: 2,
        totalCompletedTasks: 12,
        totalFeedbacks: 3,
        overallCompletionRate: 0.65,
      },
    });
  }

  if (method === "PATCH" && path === "/api/my") {
    if (body.name) users[0].name = body.name;
    if (body.school) menteeProfile.school = body.school;
    return ok({
      id: menteeProfile.id,
      role: "MENTEE",
      name: users[0].name,
      profileImage: users[0].profileImage,
      joinedAt: "2025-12-01T00:00:00Z",
      school: menteeProfile.school,
      grade: menteeProfile.grade,
      subjects: menteeProfile.subjects,
      mentor: {
        id: mentorProfile.id,
        name: users[1].name,
        university: mentorProfile.university,
        department: mentorProfile.department,
      },
      subjectStats: [
        {
          subject: "MATH",
          abilityTags: ["대수"],
          totalTasks: 5,
          completedTasks: 3,
          completionRate: 0.6,
          avgDensityScore: 65,
        },
      ],
      activitySummary: {
        activeDays: 5,
        consecutiveDays: 2,
        totalCompletedTasks: 12,
        totalFeedbacks: 3,
        overallCompletionRate: 0.65,
      },
    });
  }

  return fail("MOCK_404", `No mock for ${method} ${path}`);
}
