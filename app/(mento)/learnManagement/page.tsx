"use client";

import { useState, useEffect, useCallback } from "react";
import { useIsDesktop } from "@/_hooks/useMediaQuery";
import { mentorApi } from "@/lib/api/mentor";
import type { MenteeListItem } from "@/lib/api/mentorTypes";
import LearningForm from "./_components/LearningForm";
import RegisteredLearnings from "./_components/RegisteredLearnings";

export default function LearnManagement() {
  const isDesktop = useIsDesktop();
  const [activeTab, setActiveTab] = useState<"form" | "list">("form");
  const [mentees, setMentees] = useState<MenteeListItem[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    mentorApi.getMentees().then(setMentees).catch(() => {});
  }, []);

  const handleLearningCreated = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  const menteeOptions = mentees.map((m) => ({
    value: m.menteeId,
    label: `${m.name} (${m.grade ?? ""})`,
  }));

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <h1 className="text-heading-xl text-gray-900">학습관리</h1>

      {/* 모바일 탭 */}
      {!isDesktop && (
        <div className="mt-5 flex rounded-lg bg-gray-100 p-1">
          <button
            type="button"
            onClick={() => setActiveTab("form")}
            className={`flex-1 rounded-md py-2 text-label-m transition-colors ${
              activeTab === "form"
                ? "bg-white text-primary-500 shadow-sm"
                : "text-gray-500"
            }`}
          >
            학습등록
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("list")}
            className={`flex-1 rounded-md py-2 text-label-m transition-colors ${
              activeTab === "list"
                ? "bg-white text-primary-500 shadow-sm"
                : "text-gray-500"
            }`}
          >
            등록된 학습
          </button>
        </div>
      )}

      <div className="mt-10 flex flex-col gap-6 lg:flex-row">
        {(isDesktop || activeTab === "form") && (
          <LearningForm
            menteeOptions={menteeOptions}
            onCreated={handleLearningCreated}
          />
        )}
        {(isDesktop || activeTab === "list") && (
          <RegisteredLearnings
            menteeOptions={menteeOptions}
            refreshKey={refreshKey}
          />
        )}
      </div>
    </div>
  );
}
