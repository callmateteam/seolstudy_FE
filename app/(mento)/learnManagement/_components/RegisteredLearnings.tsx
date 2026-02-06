"use client";

import { useEffect, useRef, useState } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import Select from "@/components/ui/Select";
import Tag from "@/components/ui/Tag";

interface LearningItem {
  id: string;
  name: string;
  subject: string;
  date: string;
  material: string;
}

const MENTEE_OPTIONS = [
  { value: "yujin", label: "유진 (고2)" },
  { value: "minjun", label: "이민준 (고2)" },
];

const MOCK_ITEMS: LearningItem[] = [
  {
    id: "1",
    name: "비문학 독해 3회차",
    subject: "국어",
    date: "02 . 01 (일)",
    material: "칼럼",
  },
  {
    id: "2",
    name: "비문학 독해 3회차",
    subject: "국어",
    date: "02 . 01 (일)",
    material: "칼럼",
  },
  {
    id: "3",
    name: "비문학 독해 3회차",
    subject: "국어",
    date: "02 . 01 (일)",
    material: "칼럼",
  },
  {
    id: "4",
    name: "비문학 독해 3회차",
    subject: "국어",
    date: "02 . 01 (일)",
    material: "칼럼",
  },
  {
    id: "5",
    name: "비문학 독해 3회차",
    subject: "국어",
    date: "02 . 01 (일)",
    material: "칼럼",
  },
];

export default function RegisteredLearnings() {
  const [selectedMentee, setSelectedMentee] = useState<string | null>("minjun");
  const [date, setDate] = useState("2026-02-01");
  const [items, setItems] = useState(MOCK_ITEMS);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ id: string; item: LearningItem } | null>(
    null,
  );
  const menuRef = useRef<HTMLDivElement>(null);

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
    setItems((prev) => prev.filter((i) => i.id !== id));
    setMenuOpenId(null);
    setToast({ id, item });
    setTimeout(() => setToast(null), 5000);
  };

  const handleUndo = () => {
    if (!toast) return;
    setItems((prev) => [...prev, toast.item]);
    setToast(null);
  };

  return (
    <section className="flex-1 rounded-2xl bg-white p-6 shadow-[1px_1px_4px_2px_rgba(0,0,0,0.08)]">
      <h2 className="text-heading-l text-gray-900">등록된 학습</h2>

      <div className="mt-6 flex flex-col gap-7">
        {/* 멘티 + 날짜 필터 */}
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
                        {item.name}
                      </span>
                    </div>
                    {menuOpenId === item.id && (
                      <div
                        ref={menuRef}
                        className="absolute left-0 z-10 mt-1 rounded-lg border border-gray-200 bg-white py-1 shadow-[1px_1px_4px_2px_rgba(0,0,0,0.08)]"
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
                    <Tag variant="primary">{item.subject}</Tag>
                  </td>
                  <td className="w-[100px] px-2 py-2 text-label-m text-gray-700">
                    {item.date}
                  </td>
                  <td className="w-[140px] px-2 py-2 text-label-m text-gray-700">
                    {item.material}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 토스트 */}
      {toast && (
        <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-[1px_1px_4px_2px_rgba(0,0,0,0.08)]">
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
