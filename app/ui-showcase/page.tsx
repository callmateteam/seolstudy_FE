"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { ArrowLeftRight, MessageCircle, Plus } from "lucide-react";
import Dot from "@/components/ui/Dot";
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";
import MenuItem from "@/components/ui/MenuItem";
import Avatar from "@/components/ui/Avatar";
import Chip from "@/components/ui/Chip";
import Card from "@/components/ui/Card";
import Checkbox, { type CheckedState } from "@/components/ui/Checkbox";
import Select from "@/components/ui/Select";
import TimeSegment from "@/components/ui/TimeSegment";
import Spinner from "@/components/ui/Spinner";
import Toggle from "@/components/ui/Toggle";
import NotificationCard from "@/components/ui/NotificationCard";
import ProgressBar from "@/components/ui/ProgressBar";
import CircularProgress from "@/components/ui/CircularProgress";

function Section({ title, desc, children }: { title: string; desc: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-[1px_1px_4px_2px_rgba(0,0,0,0.08)]">
      <h2 className="text-heading-l mb-2 text-gray-900">{title}</h2>
      <p className="text-body-m mb-4 text-gray-500">{desc}</p>
      {children}
    </section>
  );
}

const TAG_VARIANTS = ["primary", "success", "warning", "error", "default"] as const;
const BUTTON_VARIANTS = ["primary", "secondary", "tertiary", "ghost"] as const;
const BUTTON_SIZES = ["lg", "md", "sm"] as const;
const SELECT_OPTIONS = [
  { value: "yujin", label: "유진" },
  { value: "jisu", label: "지수" },
  { value: "minsu", label: "민수" },
];
const PROGRESS_VALUES = [0, 20, 40, 60, 80, 100];

export default function UIShowcase() {
  const [checkboxState, setCheckboxState] = useState<CheckedState>("unchecked");
  const [selectValue, setSelectValue] = useState<string | null>(null);
  const [toggleChecked, setToggleChecked] = useState(false);
  const [timeActive, setTimeActive] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-heading-xl mb-8 text-center text-gray-900">UI 컴포넌트 라이브러리</h1>
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        {/* 1. Dot */}
        <Section
          title="1. Dot"
          desc="완료율 상태 표시 닷 — size (sm / md / lg) × color (primary / white / gray)"
        >
          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-label-s text-gray-500">primary</span>
              <div className="flex items-center gap-3">
                <Dot size="sm" />
                <Dot size="md" />
                <Dot size="lg" />
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-lg bg-gray-800 px-4 py-3">
              <span className="text-label-s text-gray-400">white</span>
              <div className="flex items-center gap-3">
                <Dot size="sm" color="white" />
                <Dot size="md" color="white" />
                <Dot size="lg" color="white" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-label-s text-gray-500">gray</span>
              <div className="flex items-center gap-3">
                <Dot size="sm" color="gray" />
                <Dot size="md" color="gray" />
                <Dot size="lg" color="gray" />
              </div>
            </div>
          </div>
        </Section>

        {/* 2. Tag */}
        <Section title="2. Tag" desc="태그 / 배지 — variant × filled / outlined + 아이콘 지원">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-label-s w-14 text-gray-500">filled</span>
              <Tag variant="primary" icon={<Plus size={12} />}>
                추가하기
              </Tag>
              {TAG_VARIANTS.map((v) => (
                <Tag key={v} variant={v}>
                  {v}
                </Tag>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-label-s w-14 text-gray-500">outlined</span>
              {TAG_VARIANTS.map((v) => (
                <Tag key={v} variant={v} outlined>
                  {v}
                </Tag>
              ))}
            </div>
          </div>
        </Section>

        {/* 3. Button */}
        <Section title="3. Button" desc="버튼 — size × variant × solid / outlined">
          <div className="flex flex-col gap-5">
            {BUTTON_SIZES.map((size) => (
              <div key={size}>
                <span className="text-label-m mb-2 block text-gray-600">{size.toUpperCase()}</span>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap gap-2">
                    {BUTTON_VARIANTS.map((v) => (
                      <Button key={v} size={size} variant={v}>
                        {v}
                      </Button>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {BUTTON_VARIANTS.map((v) => (
                      <Button key={`${v}-o`} size={size} variant={v} outlined>
                        {v}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <div className="flex gap-2">
              <Button disabled>disabled</Button>
              <Button outlined disabled>
                disabled outlined
              </Button>
            </div>
          </div>
        </Section>

        {/* 4. MenuItem */}
        <Section title="4. MenuItem" desc="메뉴 항목 — 기본 / 활성 상태">
          <div className="flex w-48 flex-col">
            <MenuItem>대시보드</MenuItem>
            <MenuItem isActive>플래너</MenuItem>
            <MenuItem>학습 현황</MenuItem>
            <MenuItem>설정</MenuItem>
          </div>
        </Section>

        {/* 5. Avatar */}
        <Section title="5. Avatar" desc="아바타 (이니셜) — variant × size">
          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-label-s text-gray-500">default</span>
              <div className="flex items-center gap-3">
                <Avatar initials="유진" size="sm" />
                <Avatar initials="유진" size="md" />
                <Avatar initials="유진" size="lg" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-label-s text-gray-500">primary</span>
              <div className="flex items-center gap-3">
                <Avatar initials="유진" variant="primary" size="sm" />
                <Avatar initials="유진" variant="primary" size="md" />
                <Avatar initials="유진" variant="primary" size="lg" />
              </div>
            </div>
          </div>
        </Section>

        {/* 6. Chip */}
        <Section title="6. Chip" desc="칩 — variant × outlined / filled + 아이콘">
          <div className="flex flex-wrap gap-3">
            <Chip icon={<ArrowLeftRight size={14} />}>기본 filled</Chip>
            <Chip variant="primary" icon={<ArrowLeftRight size={14} />}>
              주색 filled
            </Chip>
            <Chip outlined icon={<ArrowLeftRight size={14} />}>
              기본 outlined
            </Chip>
            <Chip variant="primary" outlined icon={<ArrowLeftRight size={14} />}>
              주색 outlined
            </Chip>
          </div>
        </Section>

        {/* 7. Card */}
        <Section title="7. Card" desc="콘텐츠 카드 — default / primary">
          <div className="flex gap-4">
            <Card title="기본 카드" description="기본 회색 배경의 콘텐츠 카드입니다." />
            <Card
              title="주색 카드"
              description="주색 연한 배경의 콘텐츠 카드입니다."
              variant="primary"
            />
          </div>
        </Section>

        {/* 8. Checkbox */}
        <Section
          title="8. Checkbox"
          desc="체크박스 — 클릭하여 상태 전이 (unchecked → checked → unchecked)"
        >
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Checkbox checked={checkboxState} onChange={setCheckboxState} />
              <span className="text-body-m text-gray-600">클릭 가능 ({checkboxState})</span>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox checked="unchecked" onChange={() => {}} />
              <Checkbox checked="indeterminate" onChange={() => {}} />
              <Checkbox checked="checked" onChange={() => {}} />
            </div>
          </div>
        </Section>

        {/* 9. Select */}
        <Section title="9. Select" desc="드롭다운 셀렉트 — 기본 / disabled">
          <div className="flex gap-4">
            <div className="w-48">
              <span className="text-label-s mb-1 block text-gray-500">기본</span>
              <Select
                options={SELECT_OPTIONS}
                value={selectValue}
                placeholder="멘티 선택"
                onChange={setSelectValue}
              />
            </div>
            <div className="w-48">
              <span className="text-label-s mb-1 block text-gray-500">disabled</span>
              <Select
                options={SELECT_OPTIONS}
                value={null}
                placeholder="멘티 선택"
                disabled
                onChange={() => {}}
              />
            </div>
          </div>
        </Section>

        {/* 10. TimeSegment */}
        <Section title="10. TimeSegment" desc="시간 세그먼트 — 클릭하여 활성 세그먼트 변경">
          <TimeSegment
            segments={["01", "30", "02", "45"]}
            activeIndex={timeActive}
            onSegmentClick={setTimeActive}
          />
        </Section>

        {/* 11. Spinner */}
        <Section title="11. Spinner" desc="로딩 스피너 — sm / md / lg">
          <div className="flex items-center gap-8">
            {(["sm", "md", "lg"] as const).map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <Spinner size={s} />
                <span className="text-label-s text-gray-500">{s}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* 12. Toggle */}
        <Section title="12. Toggle" desc="토글 스위치 — 클릭하여 on / off">
          <div className="flex items-center gap-3">
            <Toggle checked={toggleChecked} onChange={setToggleChecked} />
            <span className="text-body-m text-gray-600">{toggleChecked ? "ON" : "OFF"}</span>
          </div>
        </Section>

        {/* 13. NotificationCard */}
        <Section
          title="13. NotificationCard"
          desc="알림 카드 — 아이콘 + title + subtitle + 액션 버튼"
        >
          <NotificationCard
            icon={<MessageCircle size={24} />}
            title="멘토님의 피드백이 도착했어요!"
            subtitle="2월 1일 (일)"
            action={{ label: "보러가기", onClick: () => {} }}
          />
        </Section>

        {/* 14. ProgressBar */}
        <Section title="14. ProgressBar" desc="선형 진행 바 — rounded / square × 0~100%">
          <div className="flex gap-8">
            <div className="flex flex-1 flex-col gap-3">
              <span className="text-label-s text-gray-500">rounded</span>
              {PROGRESS_VALUES.map((v) => (
                <ProgressBar key={v} value={v} showLabel labelPosition="left" />
              ))}
            </div>
            <div className="flex flex-1 flex-col gap-3">
              <span className="text-label-s text-gray-500">square</span>
              {PROGRESS_VALUES.map((v) => (
                <ProgressBar key={v} value={v} variant="square" showLabel />
              ))}
            </div>
          </div>
        </Section>

        {/* 15. CircularProgress */}
        <Section
          title="15. CircularProgress"
          desc="원형 진행 표시 (점수 링) — 색상은 점수 기준 자동 결정"
        >
          <div className="flex gap-6">
            {[
              { value: 85, color: "초록" },
              { value: 55, color: "노랑" },
              { value: 30, color: "빨강" },
            ].map((item) => (
              <div key={item.value} className="flex flex-col items-center gap-2">
                <CircularProgress value={item.value} label="점수" />
                <span className="text-label-s text-gray-500">
                  {item.value}점 ({item.color})
                </span>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
