"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Pin, Plus } from "lucide-react";
import { useIsDesktop } from "@/_hooks/useMediaQuery";
import AddTaskModal, { TaskFormData } from "./AddTaskModal";
import { Task as APITask, TaskDisplayStatus } from "../_types";
import { mapTaskStatus, formatDuration } from "../_utils/transformers";
import { menteeApi } from "@/lib/api/mentee";
import { useSelectedDate } from "../_hooks/useSelectedDate";

type Task = {
  id: string;
  subject: string;
  title: string;
  duration: string;
  status: TaskDisplayStatus;
};

const STATUS_COLOR_MAP: Record<TaskDisplayStatus, string> = {
  분석실패: "text-error-500",
  분석중: "text-warning-500",
  제출완료: "text-success-500",
  미완료: "text-gray-500",
};

interface TodayLearningProps {
  tasks: APITask[];
  onTaskCreated?: () => void;
}

// API Task 타입을 컴포넌트 내부 Task 타입으로 변환
const transformAPITaskToDisplayTask = (apiTask: APITask): Task => {
  const subjectMap: Record<string, string> = {
    KOREAN: "국어",
    MATH: "수학",
    ENGLISH: "영어",
  };

  return {
    id: apiTask.id,
    subject: subjectMap[apiTask.subject] || apiTask.subject,
    title: apiTask.title,
    duration: formatDuration(apiTask.studyTimeMinutes),
    status: mapTaskStatus(apiTask.status),
  };
};

const SUBJECT_TO_API: Record<string, "KOREAN" | "ENGLISH" | "MATH"> = {
  "국어": "KOREAN",
  "영어": "ENGLISH",
  "수학": "MATH",
};

const DAY_TO_API: Record<string, string> = {
  "월": "MON", "화": "TUE", "수": "WED", "목": "THU",
  "금": "FRI", "토": "SAT", "일": "SUN",
};

export default function TodayLearning({ tasks: apiTasks, onTaskCreated }: TodayLearningProps) {
  const router = useRouter();
  const { selectedDate } = useSelectedDate();
  const displayTasks = apiTasks.map(transformAPITaskToDisplayTask);
  const isDesktop = useIsDesktop();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTaskClick = (task: Task, apiTask: APITask) => {
    if (task.status !== "미완료") return;
    router.push(`/solve/${apiTask.subject.toLowerCase()}/${apiTask.id}`);
  };

  const handleSaveTask = async (task: TaskFormData) => {
    if (!task.name.trim()) {
      alert("과제명을 입력해주세요.");
      return;
    }

    const subject = SUBJECT_TO_API[task.subject];
    if (!subject) return;

    const targetStudyMinutes = task.useTargetTime
      ? (parseInt(task.targetHours) || 0) * 60 + (parseInt(task.targetMinutes) || 0)
      : undefined;

    const repeatDays = task.repeat
      ? task.repeatDays.map((d) => DAY_TO_API[d]).filter(Boolean)
      : undefined;

    try {
      await menteeApi.createTask({
        date: selectedDate,
        title: task.name.trim(),
        subject,
        repeat: task.repeat,
        repeatDays,
        targetStudyMinutes,
        memo: task.memo || undefined,
      });
      onTaskCreated?.();
    } catch (e) {
      const message = e instanceof Error ? e.message : "과제 추가에 실패했습니다.";
      alert(message);
    }
  };

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setIsAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 1);
  }, []);

  const showOverlay = displayTasks.length > (isDesktop ? 10 : 3) && !isAtBottom;

  return (
    <section className="flex flex-col rounded-xl bg-white shadow-card">
      {/* 타이틀 */}
      <div className="flex items-center justify-between px-3 pt-3">
        <h4 className="text-title-l text-gray-900">오늘 학습</h4>
        <p className="text-label-m text-gray-900">
          남은 과제: <span className="text-primary-500">{displayTasks.length}</span>
        </p>
      </div>

      {/* 스크롤 영역 + 그래디언트 오버레이 */}
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex flex-col gap-5 overflow-y-auto px-3 pt-5 pb-5"
          style={{ maxHeight: isDesktop ? "500px" : "200px" }}
        >
          {displayTasks.map((task, index) => {
            const apiTask = apiTasks[index];
            const isClickable = task.status === "미완료";
            return (
              <div
                key={task.id}
                className={`flex items-center justify-between gap-2 ${isClickable ? "cursor-pointer rounded-lg transition-colors hover:bg-gray-50" : ""}`}
                onClick={() => handleTaskClick(task, apiTask)}
              >
                <div className="flex items-center gap-3">
                  <Pin />
                  <div>
                    <span className="text-label-s rounded-full border border-gray-300 px-1 py-0.5 text-gray-500">
                      {task.subject}
                    </span>
                    <p className="text-body-m text-gray-800">{task.title}</p>
                  </div>
                </div>
                <p className="text-label-m text-gray-500">{task.duration}</p>
                <p className={`text-label-m ${STATUS_COLOR_MAP[task.status]}`}>{task.status}</p>
              </div>
            );
          })}
        </div>

        {showOverlay && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-white to-transparent" />
        )}
      </div>

      {/* 할 일 추가 버튼 */}
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="text-label-m text-primary-500 border-primary-500 mx-3 mb-3 flex cursor-pointer items-center justify-center gap-1 rounded-lg border py-3"
      >
        <Plus size={20} />할 일 추가하기
      </button>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
      />
    </section>
  );
}
