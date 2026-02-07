"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Toggle from "@/components/ui/Toggle";

type Subject = "국어" | "영어" | "수학";
type DayOfWeek = "월" | "화" | "수" | "목" | "금" | "토" | "일";

const SUBJECTS: Subject[] = ["국어", "영어", "수학"];
const DAYS: DayOfWeek[] = ["월", "화", "수", "목", "금", "토", "일"];

export interface TaskFormData {
  name: string;
  subject: Subject;
  repeat: boolean;
  repeatDays: DayOfWeek[];
  useTargetTime: boolean;
  targetHours: string;
  targetMinutes: string;
  memo: string;
}

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: TaskFormData) => void;
}

export default function AddTaskModal({ isOpen, onClose, onSave }: AddTaskModalProps) {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState<Subject>("국어");
  const [repeat, setRepeat] = useState(false);
  const [repeatDays, setRepeatDays] = useState<DayOfWeek[]>(["월", "수", "금"]);
  const [useTargetTime, setUseTargetTime] = useState(false);
  const [targetHours, setTargetHours] = useState("00");
  const [targetMinutes, setTargetMinutes] = useState("00");
  const [memo, setMemo] = useState("");

  const toggleDay = (day: DayOfWeek) => {
    setRepeatDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));
  };

  const handleSave = () => {
    onSave({
      name,
      subject,
      repeat,
      repeatDays,
      useTargetTime,
      targetHours,
      targetMinutes,
      memo,
    });
    handleClose();
  };

  const handleClose = () => {
    setName("");
    setSubject("국어");
    setRepeat(false);
    setRepeatDays(["월", "수", "금"]);
    setUseTargetTime(false);
    setTargetHours("00");
    setTargetMinutes("00");
    setMemo("");
    onClose();
  };

  const repeatText =
    repeatDays.length > 0 ? `매주 ${repeatDays.join(", ")} 반복됨` : "요일을 선택하세요";

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="rounded-2xl bg-white p-5 shadow-lg">
        {/* 과제명 */}
        <input
          type="text"
          placeholder="과제명"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-body-m focus:border-primary-500 w-full border-b border-gray-200 pb-3 text-gray-900 placeholder:text-gray-400 focus:outline-none"
        />

        {/* 과목 */}
        <div className="mt-5">
          <p className="text-label-l text-gray-900">과목</p>
          <div className="mt-2 flex gap-2">
            {SUBJECTS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSubject(s)}
                className={`text-label-m cursor-pointer rounded-full border px-3 py-1 transition-colors ${
                  subject === s
                    ? "border-primary-500 bg-primary-50 text-primary-500"
                    : "border-gray-300 text-gray-500"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* 반복 */}
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <p className="text-label-l text-gray-900">반복</p>
            <Toggle checked={repeat} onChange={setRepeat} />
          </div>

          {repeat && (
            <div className="mt-3">
              <div className="flex justify-between">
                {DAYS.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`text-label-m flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors ${
                      repeatDays.includes(day)
                        ? "bg-primary-500 text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
              <p className="text-label-s text-primary-500 mt-2 text-center">{repeatText}</p>
            </div>
          )}
        </div>

        {/* 목표 공부 시간 */}
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <p className="text-label-l text-gray-900">목표 공부 시간</p>
            <Toggle checked={useTargetTime} onChange={setUseTargetTime} />
          </div>

          {useTargetTime && (
            <div className="mt-3 flex items-center gap-2">
              <input
                type="text"
                value={targetHours}
                onChange={(e) => setTargetHours(e.target.value.replace(/\D/g, "").slice(0, 2))}
                className="text-body-m focus:border-primary-500 w-12 rounded-lg border border-gray-200 px-2 py-1.5 text-center text-gray-700 focus:outline-none"
              />
              <span className="text-label-m text-gray-500">시간</span>
              <input
                type="text"
                value={targetMinutes}
                onChange={(e) => setTargetMinutes(e.target.value.replace(/\D/g, "").slice(0, 2))}
                className="text-body-m focus:border-primary-500 w-12 rounded-lg border border-gray-200 px-2 py-1.5 text-center text-gray-700 focus:outline-none"
              />
              <span className="text-label-m text-gray-500">분</span>
            </div>
          )}
        </div>

        {/* 메모 */}
        <div className="mt-5">
          <p className="text-label-l text-gray-900">메모</p>
          <textarea
            placeholder="메모를 작성하세요"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            rows={3}
            className="text-body-m focus:border-primary-500 mt-2 w-full resize-none rounded-xl border border-gray-200 p-3 text-gray-700 placeholder:text-gray-400 focus:outline-none"
          />
        </div>

        {/* 버튼 */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="text-label-m flex-1 cursor-pointer rounded-xl border border-gray-300 py-3 text-gray-700"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!name.trim()}
            className="text-label-m bg-primary-500 flex-1 cursor-pointer rounded-xl py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            저장
          </button>
        </div>
      </div>
    </Modal>
  );
}
