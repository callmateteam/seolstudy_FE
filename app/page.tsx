import Link from "next/link";
import Button from "@/components/ui/Button";
import { Check, ImageIcon } from "lucide-react";

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

const TESTIMONIALS = [
  "매번 뭐부터 해야 할지 몰랐는데, 설스터디 덕분에 하루 공부 계획이 훨씬 명확해졌어요.",
  "공부 기록이 쌓이다 보니, 제가 성장하고 있다는 게 눈에 보여서 동기부여가 됐어요.",
  "공부 시간은 비슷한데, 집중하는 시간이 늘어난 게 가장 큰 변화였어요.",
  "그동안 열심히 한다고 생각했는데, 제대로 공부하고 있지는 않았다는 걸 처음 느꼈어요.",
  "피드백이 감정적이지 않고 데이터로 설명해줘서 신뢰가 갔어요.",
  "막연한 불안감이 줄고, 지금 하고 있는 공부를 믿을 수 있게 됐습니다.",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── 헤더 ── */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5">
          <Link href="/" className="text-heading-l text-primary-500">
            설스터디
          </Link>
          <nav className="hidden items-center gap-8 lg:flex">
            <span className="text-label-l text-gray-500 hover:text-gray-700">학습관리</span>
            <span className="text-label-l text-gray-500 hover:text-gray-700">코칭관리</span>
            <span className="text-label-l text-gray-500 hover:text-gray-700">성장분석</span>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-label-l text-gray-700 hover:text-gray-900">
              로그인
            </Link>
            <Link href="/register">
              <Button size="sm">무료체험하기</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="bg-white px-5 pt-16 pb-12 lg:pt-24 lg:pb-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 lg:flex-row lg:justify-between">
          <div className="text-center lg:max-w-[520px] lg:text-left">
            <h1 className="text-[28px] leading-[40px] font-bold tracking-tight text-gray-900 lg:text-[40px] lg:leading-[56px]">
              공부의 질을 눈에 보이게,
              <br />
              <span className="text-primary-500">서울대급 코칭</span>을 모두에게
            </h1>
            <p className="text-body-l mt-4 text-gray-500">
              AI 진단과 데이터 기반 코칭으로
              <br className="lg:hidden" /> 누구나 &apos;어떻게 공부해야 하는지&apos; 알 수 있습니다
            </p>
            <div className="mt-8 flex justify-center gap-3 lg:justify-start">
              <Link href="/register">
                <Button size="lg">무료 체험하기</Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="primary" outlined>
                  상담 신청하기
                </Button>
              </Link>
            </div>
          </div>
          {/* 히어로 이미지 영역 (데스크탑만) */}
          <div className="hidden w-full max-w-[480px] items-center justify-center overflow-hidden rounded-2xl bg-gray-100 lg:flex lg:aspect-[4/3]">
            <div className="flex flex-col items-center gap-2 text-gray-300">
              <ImageIcon size={48} />
              <span className="text-label-m">히어로 이미지</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 왜 설스터디가 필요한가요? ── */}
      <section className="border-t border-gray-100 px-5 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-heading-xl text-center text-gray-900">
            왜 설스터디가 필요한가요?
          </h2>
          <div className="mt-10 flex flex-col gap-8 lg:mt-12 lg:flex-row lg:gap-10">
            {PAIN_POINTS.map((point) => (
              <p key={point} className="flex-1 text-center text-body-l text-gray-600">
                {point}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── 진단부터 실행, 성장까지 ── */}
      <section className="bg-gray-50 px-5 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-heading-xl text-gray-900">
              진단부터 실행, 성장까지
            </h2>
            <p className="text-body-l mt-3 text-gray-500">
              체계적인 학습 관리를 경험하세요
            </p>
          </div>

          <div className="mt-12 flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-16">
            {/* 3단계 */}
            <div className="flex w-full flex-col gap-5 lg:flex-1 lg:flex-row lg:gap-8">
              {STEPS.map((step) => (
                <div
                  key={step.title}
                  className="flex flex-1 flex-col items-start gap-3 rounded-2xl bg-white p-5 lg:bg-transparent lg:p-0"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500">
                    <Check size={16} className="text-white" />
                  </span>
                  <p className="text-title-l text-gray-900">{step.title}</p>
                  <p className="text-body-m text-gray-500">{step.description}</p>
                </div>
              ))}
            </div>

            {/* 앱 목업 (데스크탑만) */}
            <div className="hidden w-full max-w-[420px] items-center justify-center overflow-hidden rounded-2xl bg-gray-200 lg:flex lg:aspect-[4/3]">
              <div className="flex flex-col items-center gap-2 text-gray-300">
                <ImageIcon size={48} />
                <span className="text-label-m">대시보드 목업</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 학생들의 성장 스토리 ── */}
      <section className="px-5 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-heading-xl text-center text-gray-900">
            학생들의 성장 스토리
          </h2>
          <p className="text-body-l mt-3 text-center text-gray-500">
            설스터디와 함께 목표를 달성한 학생들의 변화
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-12">
            {TESTIMONIALS.map((text, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-200 bg-white px-6 pt-5 pb-6"
              >
                <svg width="24" height="20" viewBox="0 0 24 20" fill="none" className="text-primary-300">
                  <path
                    d="M0 20V12.5C0 10.6 .4 8.85 1.2 7.25 2.05 5.6 3.2 4.2 4.65 3.05 6.15 1.85 7.85.95 9.75.35L11 3.5C9.3 4.15 7.85 5.15 6.65 6.5 5.5 7.8 4.85 9.25 4.7 10.85H10V20H0Zm13 0V12.5C13 10.6 13.4 8.85 14.2 7.25 15.05 5.6 16.2 4.2 17.65 3.05 19.15 1.85 20.85.95 22.75.35L24 3.5C22.3 4.15 20.85 5.15 19.65 6.5 18.5 7.8 17.85 9.25 17.7 10.85H23V20H13Z"
                    fill="currentColor"
                  />
                </svg>
                <p className="text-body-m mt-3 text-gray-700">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 투명한 성장 기록 ── */}
      <section className="bg-gradient-to-br from-orange-100 via-primary-50 to-white px-5 py-16 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-heading-xl text-gray-900">
            학생 멘토 학부모가
            <br />
            함께 보는 투명한 성장 기록
          </h2>
          <p className="text-body-l mt-4 text-gray-600">
            학습자의 성장 과정을 데이터로 투명하게 공유합니다
          </p>
        </div>
      </section>

      {/* ── 하단 CTA ── */}
      <section className="bg-primary-500 px-5 py-16">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-[24px] leading-[34px] font-bold text-white lg:text-heading-xl">
            설스터디와 함께
            <br />
            체계적인 학습 관리를 시작하세요
          </h2>
          <div className="mx-auto mt-8 flex max-w-sm overflow-hidden rounded-xl bg-white">
            <input
              type="email"
              placeholder="이메일을 입력하세요"
              className="flex-1 px-4 py-3 text-body-m text-gray-900 outline-none placeholder:text-gray-400"
            />
            <Link
              href="/register"
              className="flex shrink-0 items-center bg-gray-900 px-5 text-label-l text-white"
            >
              시작하기
            </Link>
          </div>
        </div>
      </section>

      {/* ── 푸터 ── */}
      <footer className="bg-gray-900 px-5 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 lg:flex-row">
          <span className="text-label-l text-white">설스터디</span>
          <p className="text-label-s text-gray-400">
            &copy; 2025 설스터디. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
