import Link from "next/link";
import Button from "@/components/ui/Button";
import { ImageIcon } from "lucide-react";

const PAIN_POINTS = [
  "열심히 공부해도, 성적이 오르지 않는 이유를 모르겠어요.",
  "멘토마다 다른 조언 형식, 일관된 관리가 어려워요.",
  "학부모는 아이가 실제로 어떻게 공부하는지 알기 힘들어요.",
];

const STEPS = [
  {
    title: "정밀 진단",
    description: "AI가 학습 패턴과 약점을 정확하게 분석합니다",
  },
  {
    title: "맞춤 실행",
    description: "오늘 무엇을, 어떻게 공부할지 구체적으로 알려줍니다",
  },
  {
    title: "성장 확인",
    description: "성과와 변화를 데이터로 한눈에 확인할 수 있습니다",
  },
];

const TESTIMONIALS_ROW1 = [
  "제가 어떤 유형의 문제에 약한지 알게 되니까 복습 방향이 훨씬 쉬워졌어요.",
  "매번 뭐부터 해야 할지 몰랐는데, 설스터디 덕분에 하루 공부 계획이 훨씬 명확해졌어요.",
  "공부 시간은 비슷한데, 집중하는 시간이 늘어난 게 가장 큰 변화였어요.",
  "혼자 공부할 땐 그냥 문제만 풀었는데, 피드백을 받으면서 생각하는 방식이 바뀌었습니다.",
  "막연한 불안감이 줄고, 지금 하고 있는 공부를 믿을 수 있게 됐습니다.",
];

const TESTIMONIALS_ROW2 = [
  "학습 밀도 분석 덕분에 제대로 공부하는 법을 알게 됐어요. 멘토님의 피드백이 정말 도움이 됐습니다.",
  "피드백이 감정적이지 않고 데이터로 설명해줘서 신뢰가 갔어요.",
  "공부 기록이 쌓이다 보니, 제가 성장하고 있다는 게 눈에 보여서 동기부여가 됐어요.",
  "멘토가 제 학습 데이터를 기반으로 이야기해주니까 납득이 잘 됐어요.",
  "그동안 열심히 한다고 생각했는데, 제대로 공부하고 있지는 않았다는 걸 처음 느꼈어요.",
];

function QuoteMark() {
  return (
    <svg
      width="28"
      height="24"
      viewBox="0 0 28 24"
      fill="none"
      className="shrink-0"
    >
      <path
        d="M0 24V15C0 12.72 .47 10.62 1.4 8.7 2.39 6.72 3.73 5.04 5.43 3.66 7.18 2.22 9.16 1.14 11.38.42L12.83 4.2C10.85 4.98 9.16 6.18 7.76 7.8 6.42 9.36 5.66 11.1 5.49 13.02H11.67V24H0Zm15.17 0V15C15.17 12.72 15.63 10.62 16.57 8.7 17.56 6.72 18.9 5.04 20.6 3.66 22.35 2.22 24.33 1.14 26.55.42L28 4.2C26.02 4.98 24.33 6.18 22.93 7.8 21.59 9.36 20.83 11.1 20.66 13.02H26.83V24H15.17Z"
        fill="#FD7E14"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── 헤더 ── */}
      <header className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-20">
          <Link
            href="/"
            className="text-[24px] leading-[24px] font-semibold tracking-[-0.48px] text-primary-500"
          >
            설스터디
          </Link>
          <nav className="hidden items-center gap-7 lg:flex">
            <span className="rounded-lg px-2 py-2 text-[16px] leading-6 font-normal text-gray-700">
              학습관리
            </span>
            <span className="rounded-lg px-2 py-2 text-[16px] leading-6 font-normal text-gray-700">
              코칭관리
            </span>
            <span className="rounded-lg px-2 py-2 text-[16px] leading-6 font-normal text-gray-700">
              성장분석
            </span>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-label-l text-gray-700 hover:text-gray-900"
            >
              로그인
            </Link>
            <Link href="/register">
              <Button size="sm">무료체험하기</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="bg-gray-50 px-5 py-10 lg:px-20 lg:py-20">
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="text-center lg:max-w-[600px] lg:text-left">
            <h1 className="text-[28px] leading-[40px] font-semibold text-gray-900 lg:text-[68px] lg:leading-[80px]">
              공부의 질을 눈에 보이게,
              <br />
              <span className="text-primary-500">서울대급 코칭</span>을 모두에게
            </h1>
            <p className="text-heading-l mt-3 text-gray-500 lg:mt-3">
              AI 진단과 데이터 기반 코칭으로
              <br />
              누구나 &apos;어떻게 공부해야 하는지&apos; 알 수 있습니다
            </p>
            <div className="mt-12 flex justify-center gap-2 lg:justify-start">
              <Link href="/login">
                <Button size="md" variant="primary" outlined>
                  상담 신청하기
                </Button>
              </Link>
              <Link href="/register">
                <Button size="md" variant="primary" outlined>
                  무료로 시작하기
                </Button>
              </Link>
            </div>
          </div>
          {/* 히어로 이미지 영역 (데스크탑만) - 두 개의 겹치는 카드 이미지 */}
          <div className="hidden lg:flex items-end gap-0">
            <div className="relative z-10 flex h-[386px] w-[257px] items-center justify-center overflow-hidden rounded-[20px] bg-gray-200">
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <ImageIcon size={32} />
                <span className="text-label-m">히어로 이미지 1</span>
              </div>
            </div>
            <div className="relative -ml-8 -mt-16 flex h-[386px] w-[257px] items-center justify-center overflow-hidden rounded-[20px] bg-gray-100">
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <ImageIcon size={32} />
                <span className="text-label-m">히어로 이미지 2</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 왜 설스터디가 필요한가요? ── */}
      <section className="px-5 py-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-heading-xl font-semibold text-gray-900 lg:text-[40px] lg:leading-[56px]">
            왜 설스터디가 필요한가요?
          </h2>
          <div className="relative mt-10 lg:mt-10">
            {/* 오렌지 장식 요소 */}
            <div className="absolute -top-6 left-1/2 hidden h-[100px] w-[105px] -translate-x-1/2 rotate-45 rounded-sm bg-primary-400/60 lg:block" />
            {/* 페인포인트 카드 */}
            <div className="relative mx-auto flex max-w-[634px] flex-col gap-6 rounded-xl bg-gray-50 px-6 py-10 shadow-card lg:px-[82px] lg:py-[93px]">
              <div className="flex flex-col gap-7">
                {PAIN_POINTS.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-primary-500">
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                      >
                        <path
                          d="M1 5L4.5 8.5L11 1.5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <p className="text-heading-l text-gray-700">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 진단부터 실행, 성장까지 ── */}
      <section className="px-5 py-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-heading-xl font-semibold text-gray-900 lg:text-[40px] lg:leading-[56px]">
              진단부터 실행, 성장까지
            </h2>
            <p className="text-heading-l mt-3 text-gray-500">
              체계적인 학습 관리로 목표를 달성하세요
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-5 lg:mt-16 lg:flex-row lg:gap-[45px]">
            {STEPS.map((step) => (
              <div
                key={step.title}
                className="flex flex-1 flex-col items-center gap-4 rounded-[20px] bg-white p-6 shadow-card lg:flex-row lg:items-start lg:gap-5"
              >
                {/* 아이콘 플레이스홀더 */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded text-gray-300">
                  <ImageIcon size={24} />
                </div>
                {/* 텍스트 */}
                <div className="flex flex-col items-center gap-2 lg:items-start">
                  <span className="inline-flex w-fit items-center rounded-full bg-primary-100 px-2 py-1 text-title-l text-primary-500">
                    {step.title}
                  </span>
                  <p className="text-heading-l text-center text-gray-700 lg:text-left">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 학생들의 성장 스토리 ── */}
      <section className="overflow-hidden px-5 py-10 lg:px-20 lg:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-heading-xl font-semibold text-gray-900 lg:text-[40px] lg:leading-[56px]">
              학생들의 성장 스토리
            </h2>
            <p className="text-heading-l mt-3 text-gray-500">
              설스터디와 함께 목표를 달성한 학생들의 변화
            </p>
          </div>

          {/* 데스크탑: 두 줄의 수평 카드 (화면 밖으로 확장, 엇갈림 효과) */}
          <div className="mt-10 hidden flex-col gap-4 lg:mt-12 lg:flex">
            {/* Row 1 - 왼쪽으로 오프셋 */}
            <div className="flex gap-4" style={{ marginLeft: "-200px" }}>
              {TESTIMONIALS_ROW1.map((text, i) => (
                <div
                  key={i}
                  className="w-[400px] shrink-0 rounded-[20px] border border-gray-200 bg-white p-6"
                >
                  <QuoteMark />
                  <p className="mt-5 text-title-l tracking-[-0.16px] text-gray-700">
                    {text}
                  </p>
                </div>
              ))}
            </div>
            {/* Row 2 - 더 왼쪽으로 오프셋 (엇갈림) */}
            <div className="flex gap-4" style={{ marginLeft: "-400px" }}>
              {TESTIMONIALS_ROW2.map((text, i) => (
                <div
                  key={i}
                  className="w-[400px] shrink-0 rounded-[20px] border border-gray-200 bg-white p-6"
                >
                  <QuoteMark />
                  <p className="mt-5 text-title-l tracking-[-0.16px] text-gray-700">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 모바일: 세로 그리드 */}
          <div className="mt-8 flex flex-col gap-4 lg:hidden">
            {[...TESTIMONIALS_ROW1.slice(0, 3), ...TESTIMONIALS_ROW2.slice(0, 3)].map(
              (text, i) => (
                <div
                  key={i}
                  className="rounded-[20px] border border-gray-200 bg-white p-6"
                >
                  <QuoteMark />
                  <p className="mt-5 text-title-l tracking-[-0.16px] text-gray-700">
                    {text}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── 투명한 성장 기록 (3-way 섹션) ── */}
      <section className="relative overflow-hidden px-5 py-10 lg:px-20 lg:py-10">
        {/* 오렌지 블러 배경 */}
        <div className="pointer-events-none absolute -left-[200px] top-1/2 h-[856px] w-[856px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(253,126,20,0.2)_0%,_transparent_70%)] blur-[76px] lg:-left-[100px]" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-[150px]">
          {/* 텍스트 */}
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary-100 px-2 py-1 text-title-l text-primary-500">
              3-way 성장리포트
            </span>
            <h2 className="mt-4 text-heading-xl font-semibold text-gray-900 lg:text-[40px] lg:leading-[56px]">
              학생 멘토 학부모가
              <br />
              함께 보는 투명한 성장 기록
            </h2>
            <p className="text-heading-l mt-3 text-gray-500">
              체계적인 학습 관리로 목표 달성까지 함께 갑니다
            </p>
          </div>
          {/* 이미지 플레이스홀더 (데스크탑) */}
          <div className="hidden w-full max-w-[400px] items-center justify-center overflow-hidden rounded-[20px] bg-gray-100 lg:flex lg:aspect-[3/4]">
            <div className="flex flex-col items-center gap-2 text-gray-300">
              <ImageIcon size={48} />
              <span className="text-label-m">성장리포트 이미지</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 하단 CTA ── */}
      <section className="bg-primary-600 px-5 py-10 lg:px-20">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-heading-xl font-semibold text-white lg:text-[40px] lg:leading-[56px]">
            설스터디와 함께
            <br />
            체계적인 학습 관리를 시작하세요
          </h2>
          <div className="mt-16 flex justify-center">
            <Link href="/register">
              <Button size="md" variant="primary" outlined>
                지금 바로 시작하기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 푸터 ── */}
      <footer className="bg-[#f9fafb] px-5 py-10 lg:px-20 lg:py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="text-center lg:text-left">
            <p className="text-[24px] leading-[24px] font-semibold tracking-[-0.48px] text-gray-600">
              설스터디
            </p>
            <p className="mt-3 text-[16px] leading-6 font-medium text-gray-400">
              공부의 질을 눈에 보이게,
              <br />
              서울대급 코칭을 눈에 보이게
            </p>
          </div>
          <p className="text-[16px] leading-6 font-medium text-gray-500">
            @ 2026 GGanbu. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
