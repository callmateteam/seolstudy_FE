"use client";

import { useState, useEffect, useCallback } from "react";
import { mentorApi } from "@/lib/api/mentor";
import type {
  DashboardResponse,
  MenteeListItem,
  ReviewQueueItem,
  CommentQueueItem,
} from "@/lib/api/mentorTypes";
import MenteeCard from "./_components/MenteeCard";
import ReviewQueue from "./_components/ReviewQueue";
import CommentQueue from "./_components/CommentQueue";

export default function Dashboard() {
  const [mentees, setMentees] = useState<MenteeListItem[]>([]);
  const [reviewItems, setReviewItems] = useState<ReviewQueueItem[]>([]);
  const [commentItems, setCommentItems] = useState<CommentQueueItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = useCallback(async () => {
    try {
      const data: DashboardResponse = await mentorApi.getDashboard();
      setMentees(data.mentees);
      setReviewItems(data.reviewQueue);
      setCommentItems(data.commentQueue);
    } catch {
      // 에러 시 빈 상태 유지
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-10">
        <h1 className="text-heading-xl text-gray-900">대시보드</h1>
        <div className="mt-10 flex items-center justify-center py-20">
          <span className="text-body-m text-gray-400">불러오는 중...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <h1 className="text-heading-xl text-gray-900">대시보드</h1>

      <div className="mt-10 flex flex-col gap-10">
        {/* 담당 멘티 */}
        <section className="rounded-2xl bg-white p-6 shadow-card">
          <h2 className="text-title-l text-gray-900">담당 멘티</h2>
          <div className="mt-5 flex flex-col gap-4 lg:flex-row">
            {mentees.map((mentee) => (
              <MenteeCard
                key={mentee.menteeId}
                name={mentee.name}
                grade={mentee.grade ?? ""}
                subjects={mentee.subjects}
                completionRate={mentee.completionRate}
                recentDensity={mentee.recentDensity ?? 0}
              />
            ))}
          </div>
        </section>

        {/* 과제 검토 대기열 + 코멘트 답변 대기열 */}
        <div className="flex flex-col gap-6 lg:flex-row">
          <section className="flex-1 rounded-2xl bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="text-title-l text-gray-900">과제 검토 대기열</h2>
              <span className="text-label-m text-gray-500 lg:hidden">
                검토 과제: {reviewItems.length}건
              </span>
            </div>
            <div className="mt-5">
              <ReviewQueue items={reviewItems} />
            </div>
          </section>

          <section className="flex-1 rounded-2xl bg-white p-6 shadow-card">
            <h2 className="text-title-l text-gray-900">코멘트 답변 대기열</h2>
            <div className="mt-5">
              <CommentQueue
                items={commentItems}
                onRefresh={fetchDashboard}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
