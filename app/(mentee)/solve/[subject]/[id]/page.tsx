"use client";

import { useState } from "react";
import { ChevronLeft, Pin } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import SolveQuizModal from "./_components/SolveQuizModal";

export default function SolvePage() {
  const params = useParams();
  const subject = params.subject as string;
  const id = params.id as string;
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const router = useRouter();

  return (
    <article className="mt-7 px-5">
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => router.back()} className="cursor-pointer">
            <ChevronLeft width={28} height={28} />
          </button>
          <p className="text-heading-xl text-gray-900">비문학 독해 3회차 </p>
        </div>
        <Pin color="#FD7E14" />
      </section>
      <section className="mt-5 flex flex-col gap-5">
        <ul className="flex items-center gap-2">
          <li className="bg-primary-100 border-primary-500 text-label-l text-primary-500 rounded-full border px-2 py-0.5">
            국어
          </li>
          <li className="bg-primary-100 text-label-l text-primary-500 rounded-full px-2 py-0.5">
            문해력
          </li>
          <li className="bg-primary-100 text-label-l text-primary-500 rounded-full px-2 py-0.5">
            비문학
          </li>
        </ul>
        <article className="flex flex-col gap-2 rounded-4xl bg-gray-50 p-3">
          <h4 className="text-title-l text-gray-900">학습 목표</h4>
          <p className="text-body-m text-gray-700">
            과학 비문학 지문을 읽고 문단별 핵심 논지를 파악하세요. 지문 구조를 분석하고 선지 판단
            근거를 필기로 남기세요.
          </p>
        </article>
        <article className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <h4 className="text-title-l text-gray-900">Part 1. 핵심 개념 정리</h4>
            <div className="flex flex-col gap-3">
              <p className="text-body-m text-gray-700">
                지문을 읽기 전에 아래 핵심 개념들을 먼저 확인하세요
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h4 className="text-title-l text-gray-900">Part 2. 지문 읽기</h4>
              <button
                onClick={() => setIsQuizModalOpen(true)}
                className="text-label-l text-primary-500 cursor-pointer"
              >
                문제풀기
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-body-m text-gray-700">
                (1~4) 다음 글을 읽고 물음에 답하시오. [2024학년도 수능 국어 응용]
              </p>
            </div>
          </div>
        </article>
      </section>
      <SolveQuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
      />
    </article>
  );
}
