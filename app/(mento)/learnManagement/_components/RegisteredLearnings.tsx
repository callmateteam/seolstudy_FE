"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import Select from "@/components/ui/Select";
import Tag from "@/components/ui/Tag";
import { mentorApi } from "@/lib/api/mentor";
import type { LessonResponse } from "@/lib/api/mentorTypes";

const SUBJECT_DISPLAY: Record<string, string> = {
  KOREAN: "국어",
  ENGLISH: "영어",
  MATH: "수학",
};

interface RegisteredLearningsProps {
  menteeOptions: { value: string; label: string }[];
  refreshKey?: number;
}

export default function RegisteredLearnings({
  menteeOptions,
  refreshKey,
}: RegisteredLearningsProps) {
  const [selectedMentee, setSelectedMentee] = useState<string | null>(null);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [items, setItems] = useState<LessonResponse[]>([]);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    id: string;
    item: LessonResponse;
    timer: ReturnType<typeof setTimeout>;
  } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // 첫 멘티 자동선택
  useEffect(() => {
    if (!selectedMentee && menteeOptions.length > 0) {
      setSelectedMentee(menteeOptions[0].value);
    }
  }, [menteeOptions, selectedMentee]);

  const fetchLessons = useCallback(async () => {
    if (!selectedMentee) return;
    try {
      const res = await mentorApi.getLessons(selectedMentee, date);
      setItems(res.lessons);
    } catch {
      setItems([]);
    }
  }, [selectedMentee, date]);

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons, refreshKey]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpenId(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleDelete = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    // 낙관적 삭제: UI에서 즉시 제거
    setItems((prev) => prev.filter((i) => i.id !== id));
    setMenuOpenId(null);

    // 이전 토스트 타이머 제거
    if (toast) clearTimeout(toast.timer);

    // 5초 후 실제 API 삭제
    const timer = setTimeout(async () => {
      try {
        await mentorApi.deleteLesson(id);
      } catch {
        // 삭제 실패 시 복원
        fetchLessons();
      }
      setToast(null);
    }, 5000);

    setToast({ id, item, timer });
  };

  const handleUndo = () => {
    if (!toast) return;
    clearTimeout(toast.timer);
    setItems((prev) => [...prev, toast.item]);
    setToast(null);
  };

  function formatDate(dateStr: string) {
    try {
      const d = new Date(dateStr);
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const days = ["일", "월", "화", "수", "목", "금", "토"];
      return `${month} . ${day} (${days[d.getDay()]})`;
    } catch {
      return dateStr;
    }
  }

  return (
    <section className="flex-1 rounded-2xl bg-white p-6 shadow-card">
      <h2 className="text-heading-l text-gray-900">등록된 학습</h2>

      <div className="mt-6 flex flex-col gap-7">
        {/* 멘티 + 날짜 필터 */}
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
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-body-m text-gray-700"
            />
          </div>
        </div>

        {/* 테이블 */}
        <div>
          <table className="w-full">
            <thead>
              <tr className="rounded-lg bg-gray-50">
                <th className="px-2 py-2 text-left text-label-m text-gray-500">
                  학습
                </th>
                <th className="w-[60px] px-2 py-2 text-left text-label-m text-gray-500">
                  과목
                </th>
                <th className="w-[100px] px-2 py-2 text-left text-label-m text-gray-500">
                  날짜
                </th>
                <th className="w-[140px] px-2 py-2 text-left text-label-m text-gray-500">
                  학습지
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="relative border-t border-gray-100">
                  <td className="px-2 py-2">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() =>
                          setMenuOpenId(
                            menuOpenId === item.id ? null : item.id,
                          )
                        }
                        className="cursor-pointer text-gray-400 hover:text-gray-600"
                      >
                        <MoreVertical size={16} />
                      </button>
                      <span className="text-label-m text-gray-700">
                        {item.title}
                      </span>
                    </div>
                    {menuOpenId === item.id && (
                      <div
                        ref={menuRef}
                        className="absolute left-0 z-10 mt-1 rounded-lg border border-gray-200 bg-white py-1 shadow-card"
                      >
                        <button
                          type="button"
                          className="flex w-full items-center gap-2 px-3 py-2 text-body-m text-gray-700 hover:bg-gray-50"
                        >
                          <Pencil size={16} />
                          수정
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="flex w-full items-center gap-2 px-3 py-2 text-body-m text-error-500 hover:bg-gray-50"
                        >
                          <Trash2 size={16} />
                          삭제
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="w-[60px] px-2 py-2">
                    <Tag variant="primary">
                      {SUBJECT_DISPLAY[item.subject] ?? item.subject}
                    </Tag>
                  </td>
                  <td className="w-[100px] px-2 py-2 text-label-m text-gray-700">
                    {formatDate(item.date)}
                  </td>
                  <td className="w-[140px] px-2 py-2 text-label-m text-gray-700">
                    {item.materialUrl ? "PDF" : item.materialId ? "칼럼" : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 토스트 */}
      {toast && (
        <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-card">
          <span className="text-body-m text-gray-700">삭제되었습니다.</span>
          <button
            type="button"
            onClick={handleUndo}
            className="cursor-pointer text-label-l text-primary-500"
          >
            되돌리기
          </button>
        </div>
      )}
    </section>
  );
}
