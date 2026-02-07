"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import Select from "@/components/ui/Select";
import Chip from "@/components/ui/Chip";
import Button from "@/components/ui/Button";

const MENTEE_OPTIONS = [
  { value: "yujin", label: "유진 (고2)" },
  { value: "minjun", label: "이민준 (고2)" },
];

const SUBJECTS = ["국어", "영어", "수학"];

const COMPETENCY_TAGS = [
  "문해력",
  "추론력",
  "어휘력",
  "비판적사고",
  "독해기술",
];

const MATERIAL_OPTIONS = [
  { value: "column", label: "설스터디 칼럼" },
  { value: "textbook", label: "교과서" },
  { value: "workbook", label: "문제집" },
];

export default function LearningForm() {
  const [selectedMentee, setSelectedMentee] = useState<string | null>(null);
  const [date, setDate] = useState("2026-02-01");
  const [selectedSubject, setSelectedSubject] = useState<string | null>("국어");
  const [selectedTags, setSelectedTags] = useState<string[]>(["문해력"]);
  const [studyName, setStudyName] = useState("");
  const [studyGoal, setStudyGoal] = useState("");
  const [materialType, setMaterialType] = useState<string | null>("column");

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) return prev.filter((t) => t !== tag);
      if (prev.length >= 3) return prev;
      return [...prev, tag];
    });
  };

  return (
    <section className="flex-1 rounded-2xl bg-white p-6 shadow-card">
      <h2 className="text-heading-l text-gray-900">학습등록</h2>

      <div className="mt-6 flex flex-col gap-7">
        {/* 멘티 + 날짜 */}
        <div className="flex gap-5">
          <div className="flex-1">
            <label className="mb-2 block text-label-l text-gray-900">
              멘티
            </label>
            <Select
              options={MENTEE_OPTIONS}
              value={selectedMentee}
              placeholder="멘티 선택"
              onChange={setSelectedMentee}
            />
          </div>
          <div className="flex-1">
            <label className="mb-2 block text-label-l text-gray-900">
              날짜
            </label>
            <div className="relative">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-body-m text-gray-700"
              />
            </div>
          </div>
        </div>

        {/* 과목 */}
        <div>
          <label className="mb-2 block text-label-l text-gray-900">과목</label>
          <div className="flex gap-2">
            {SUBJECTS.map((subject) => (
              <button
                key={subject}
                type="button"
                onClick={() => setSelectedSubject(subject)}
                className="cursor-pointer"
              >
                <Chip
                  variant={
                    selectedSubject === subject ? "primary" : "default"
                  }
                  outlined={selectedSubject === subject}
                >
                  {subject}
                </Chip>
              </button>
            ))}
          </div>
        </div>

        {/* 과목 역량태그 */}
        <div>
          <label className="mb-2 block text-label-l text-gray-900">
            과목 역량태그 (최대 3개)
          </label>
          <div className="flex flex-wrap gap-2">
            {COMPETENCY_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className="cursor-pointer"
              >
                <Chip
                  variant={selectedTags.includes(tag) ? "primary" : "default"}
                  outlined={selectedTags.includes(tag)}
                >
                  {tag}
                </Chip>
              </button>
            ))}
            <button type="button" className="cursor-pointer">
              <Chip variant="default" outlined>
                +직접추가
              </Chip>
            </button>
          </div>
        </div>

        {/* 학습명 */}
        <div>
          <label className="mb-2 block text-label-l text-gray-900">
            학습명
          </label>
          <input
            type="text"
            value={studyName}
            onChange={(e) => setStudyName(e.target.value)}
            placeholder="예: 비문학 독해 4회차"
            className="w-full rounded-lg border border-gray-300 px-3 py-3.5 text-body-m text-gray-700 placeholder:text-gray-400"
          />
        </div>

        {/* 학습 목표 */}
        <div>
          <label className="mb-2 block text-label-l text-gray-900">
            학습 목표
          </label>
          <textarea
            value={studyGoal}
            onChange={(e) => setStudyGoal(e.target.value)}
            placeholder="이 과제의 학습 목표를 작성해주세요"
            rows={2}
            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-3.5 text-body-m text-gray-700 placeholder:text-gray-400"
          />
        </div>

        {/* 학습지 등록 */}
        <div>
          <label className="mb-2 block text-label-l text-gray-900">
            학습지 등록
          </label>
          <Select
            options={MATERIAL_OPTIONS}
            value={materialType}
            placeholder="학습지 선택"
            onChange={setMaterialType}
          />
        </div>

        {/* PDF 업로드 */}
        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-title-m text-gray-900">
            등록된 학습지가 없다면?
          </p>
          <p className="mt-1 text-body-m text-gray-500">
            PDF 파일을 드래그하거나 클릭하여 업로드해주세요
          </p>
          <div className="mt-3">
            <Button size="sm" variant="primary">
              업로드
            </Button>
          </div>
        </div>

        {/* 등록하기 */}
        <Button size="lg" variant="primary" fullWidth>
          등록하기
        </Button>
      </div>
    </section>
  );
}
