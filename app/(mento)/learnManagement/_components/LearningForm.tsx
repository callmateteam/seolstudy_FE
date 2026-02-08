"use client";

import { useState, useEffect, useRef } from "react";
import Select from "@/components/ui/Select";
import Chip from "@/components/ui/Chip";
import Button from "@/components/ui/Button";
import { mentorApi } from "@/lib/api/mentor";

const SUBJECTS = [
  { label: "국어", value: "KOREAN" },
  { label: "영어", value: "ENGLISH" },
  { label: "수학", value: "MATH" },
];

const MATERIAL_OPTIONS = [
  { value: "COLUMN", label: "설스터디 칼럼" },
  { value: "PDF", label: "PDF 업로드" },
];

interface LearningFormProps {
  menteeOptions: { value: string; label: string }[];
  onCreated?: () => void;
}

export default function LearningForm({
  menteeOptions,
  onCreated,
}: LearningFormProps) {
  const [selectedMentee, setSelectedMentee] = useState<string | null>(null);
  const [date, setDate] = useState(() => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  });
  const [selectedSubject, setSelectedSubject] = useState("KOREAN");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [studyName, setStudyName] = useState("");
  const [studyGoal, setStudyGoal] = useState("");
  const [materialType, setMaterialType] = useState<string | null>("COLUMN");
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // 과목 변경 시 역량 태그 로드
  useEffect(() => {
    setSelectedTags([]);
    mentorApi
      .getAbilityTags(selectedSubject)
      .then((res) => setAvailableTags(res.tags))
      .catch(() => setAvailableTags([]));
  }, [selectedSubject]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) return prev.filter((t) => t !== tag);
      if (prev.length >= 3) return prev;
      return [...prev, tag];
    });
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    try {
      const result = await mentorApi.uploadLessonPdf(file);
      setUploadedUrl(result.materialUrl);
      setUploadedFileName(result.originalName || file.name);
    } catch {
      setUploadError("업로드에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedMentee || !studyName.trim()) return;
    setSubmitting(true);
    try {
      await mentorApi.createLesson({
        menteeId: selectedMentee,
        date,
        subject: selectedSubject,
        abilityTags: selectedTags,
        title: studyName,
        goal: studyGoal || undefined,
        materialUrl: uploadedUrl ?? undefined,
      });
      // 초기화
      setStudyName("");
      setStudyGoal("");
      setSelectedTags([]);
      setUploadedUrl(null);
      setUploadedFileName(null);
      setUploadError(null);
      onCreated?.();
    } catch {
      // 실패
    } finally {
      setSubmitting(false);
    }
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
              options={menteeOptions}
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
                key={subject.value}
                type="button"
                onClick={() => setSelectedSubject(subject.value)}
                className="cursor-pointer"
              >
                <Chip
                  variant={
                    selectedSubject === subject.value ? "primary" : "default"
                  }
                  outlined={selectedSubject === subject.value}
                >
                  {subject.label}
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
            {availableTags.map((tag) => (
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
          {uploading && (
            <p className="mt-1 text-body-m text-gray-500">
              업로드 중...
            </p>
          )}
          {uploadedUrl && uploadedFileName && (
            <p className="mt-1 text-body-m text-success-500">
              {uploadedFileName} 업로드 완료
            </p>
          )}
          {uploadError && (
            <p className="mt-1 text-body-m text-red-500">
              {uploadError}
            </p>
          )}
          <div className="mt-3">
            <input
              ref={fileRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleUpload}
            />
            <Button
              size="sm"
              variant="primary"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? "업로드 중..." : uploadedUrl ? "다시 업로드" : "업로드"}
            </Button>
          </div>
        </div>

        {/* 등록하기 */}
        <Button
          size="lg"
          variant="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={!selectedMentee || !studyName.trim() || submitting}
        >
          {submitting ? "등록 중..." : "등록하기"}
        </Button>
      </div>
    </section>
  );
}
