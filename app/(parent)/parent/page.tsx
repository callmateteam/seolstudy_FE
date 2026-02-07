import ChildStatus from "../dashboard/_components/ChildStatus";
import WeeklyDensity from "../dashboard/_components/WeeklyDensity";
import MentorInfo from "../dashboard/_components/MentorInfo";

export default function ParentDashboard() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <h1 className="text-heading-xl text-gray-900">학부모</h1>

      <div className="mt-8 flex flex-col gap-6">
        <ChildStatus
          childName="유진"
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
      </div>
    </div>
  );
}
