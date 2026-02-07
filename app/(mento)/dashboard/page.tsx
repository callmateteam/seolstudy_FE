import MenteeCard from "./_components/MenteeCard";
import ReviewQueue, { type ReviewItem } from "./_components/ReviewQueue";
import CommentQueue, { type CommentItem } from "./_components/CommentQueue";

const MENTEES = [
  {
    name: "유진",
    grade: "고2",
    subjects: ["국어", "영어", "수학"],
    completionRate: 90,
    recentDensity: 85,
  },
  {
    name: "이민준",
    grade: "고2",
    subjects: ["국어", "수학"],
    completionRate: 70,
    recentDensity: 65,
  },
];

const REVIEW_ITEMS: ReviewItem[] = [
  {
    id: "1",
    menteeName: "유진",
    tags: ["국어", "문해력"],
    studyName: "비문학 독해 3회차",
    submittedAt: "10:32",
    elapsedTime: "4h 00m",
    aiDensityStatus: "success",
  },
  {
    id: "2",
    menteeName: "유진",
    tags: ["국어", "문해력"],
    studyName: "비문학 독해 3회차",
    submittedAt: "10:32",
    elapsedTime: "4h 00m",
    aiDensityStatus: "warning",
  },
  {
    id: "3",
    menteeName: "유진",
    tags: ["국어", "문해력"],
    studyName: "비문학 독해 3회차",
    submittedAt: "10:32",
    elapsedTime: "4h 00m",
    aiDensityStatus: "error",
  },
  {
    id: "4",
    menteeName: "유진",
    tags: ["국어", "문해력"],
    studyName: "비문학 독해 3회차",
    submittedAt: "10:32",
    elapsedTime: "4h 00m",
    aiDensityStatus: null,
  },
  {
    id: "5",
    menteeName: "유진",
    tags: ["국어", "문해력"],
    studyName: "비문학 독해 3회차",
    submittedAt: "10:32",
    elapsedTime: "4h 00m",
    aiDensityStatus: "success",
  },
  {
    id: "6",
    menteeName: "유진",
    tags: ["국어", "문해력"],
    studyName: "비문학 독해 3회차",
    submittedAt: "10:32",
    elapsedTime: "4h 00m",
    aiDensityStatus: "success",
  },
  {
    id: "7",
    menteeName: "유진",
    tags: ["국어", "문해력"],
    studyName: "비문학 독해 3회차",
    submittedAt: "10:32",
    elapsedTime: "4h 00m",
    aiDensityStatus: "success",
  },
];

const COMMENT_ITEMS: CommentItem[] = [
  {
    id: "1",
    menteeName: "유진",
    content: "영어 지문 21번 빈칸 문제 설명 다시 듣...",
    registeredAt: "10:32",
    elapsedTime: "4h 00m",
    replied: false,
  },
  {
    id: "2",
    menteeName: "유진",
    content: "영어 지문 21번 빈칸 문제 설명 다시 듣...",
    registeredAt: "10:32",
    elapsedTime: "4h 00m",
    replied: true,
  },
];

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <h1 className="text-heading-xl text-gray-900">대시보드</h1>

      <div className="mt-10 flex flex-col gap-10">
        {/* 담당 멘티 */}
        <section className="rounded-2xl bg-white p-6 shadow-card">
          <h2 className="text-title-l text-gray-900">담당 멘티</h2>
          <div className="mt-5 flex flex-col gap-4 lg:flex-row">
            {MENTEES.map((mentee) => (
              <MenteeCard key={mentee.name} {...mentee} />
            ))}
          </div>
        </section>

        {/* 과제 검토 대기열 + 코멘트 답변 대기열 */}
        <div className="flex flex-col gap-6 lg:flex-row">
          <section className="flex-1 rounded-2xl bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="text-title-l text-gray-900">과제 검토 대기열</h2>
              <span className="text-label-m text-gray-500 lg:hidden">검토 과제: {REVIEW_ITEMS.length}건</span>
            </div>
            <div className="mt-5">
              <ReviewQueue items={REVIEW_ITEMS} />
            </div>
          </section>

          <section className="flex-1 rounded-2xl bg-white p-6 shadow-card">
            <h2 className="text-title-l text-gray-900">코멘트 답변 대기열</h2>
            <div className="mt-5">
              <CommentQueue items={COMMENT_ITEMS} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
