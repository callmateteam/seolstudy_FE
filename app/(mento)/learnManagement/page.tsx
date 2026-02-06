"use client";

import LearningForm from "./_components/LearningForm";
import RegisteredLearnings from "./_components/RegisteredLearnings";

export default function LearnManagement() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <h1 className="text-heading-xl text-gray-900">학습관리</h1>

      <div className="mt-10 flex gap-6">
        <LearningForm />
        <RegisteredLearnings />
      </div>
    </div>
  );
}
