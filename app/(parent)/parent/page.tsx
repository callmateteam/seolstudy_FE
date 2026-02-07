"use client";

import { useRouter } from "next/navigation";
import { Info, ChevronRight } from "lucide-react";
import { useIsDesktop } from "@/_hooks/useMediaQuery";
import Button from "@/components/ui/Button";
import ChildStatus from "../dashboard/_components/ChildStatus";
import WeeklyDensity from "../dashboard/_components/WeeklyDensity";
import MentorInfo from "../dashboard/_components/MentorInfo";

export default function ParentDashboard() {
  const router = useRouter();
  const isDesktop = useIsDesktop();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <h1 className="text-heading-xl text-gray-900">학부모</h1>

      {/* 안내 배너 */}
      <div className="mt-4 flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-3">
        <Info size={18} className="shrink-0 text-gray-500" />
        <p className="text-body-m text-gray-700">
          부모님이 자녀의 학습 현황을 확인하는 용도입니다.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        <ChildStatus
          completionRate={82}
          message="오늘 유진님은 계획한 공부의 82%를 마쳤어요! 꾸준한 학습 습관이 잡히고 있습니다."
        />
        <WeeklyDensity
          score={85}
          description="학습 밀도 85점은 풀이 흔적이 아주 상세하고 집중력이 높았다는 의미예요. 멘토가 직접 확인한 점수입니다."
        />
        <MentorInfo
          name="김서연 멘토"
          education="서울대학교 사범대학 교육학과 (재학중)"
        />

        {/* 로그아웃 행 */}
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white px-5 py-4"
        >
          <span className="text-body-m text-primary-500">로그아웃</span>
          <ChevronRight size={18} className="text-gray-400" />
        </button>
      </div>

      {/* 모바일: 상담 신청 고정 버튼 */}
      {!isDesktop && (
        <div className="fixed right-5 bottom-20 z-30">
          <Button variant="primary" size="sm">
            상담 신청
          </Button>
        </div>
      )}
    </div>
  );
}
