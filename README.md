# 설스터디 (SeolStudy) Frontend

한국어 멘토링/과외 플랫폼 — 멘티, 멘토, 학부모 3가지 역할 기반의 학습 관리 서비스

## 기술 스택

| 분류 | 기술 |
|---|---|
| 프레임워크 | Next.js 16 (App Router) |
| 언어 | TypeScript 5 (strict mode) |
| UI 라이브러리 | React 19 |
| 스타일링 | Tailwind CSS v4 (`@theme` / `@utility` 디렉티브 방식) |
| UI 프리미티브 | Radix UI |
| 아이콘 | Lucide React |
| 폰트 | Pretendard (400, 500, 600, 700) |
| 코드 품질 | ESLint 9 (flat config) + Prettier (tailwindcss 플러그인) |

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 린트 검사
npm run lint
```

## 프로젝트 구조

```
fe/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # 인증 라우트 그룹
│   │   ├── login/                # 로그인 (역할 선택 → 로그인 폼)
│   │   └── register/             # 회원가입 (3단계 폼)
│   ├── (mentee)/                 # 멘티 라우트 그룹 (AuthGuard 보호)
│   │   ├── planner/              # 학습 플래너 (캘린더, 과제 관리)
│   │   ├── feedback/             # 멘토 피드백 분석
│   │   ├── me/                   # 프로필 / 대시보드
│   │   │   └── edit/             # 프로필 수정
│   │   └── solve/[subject]/[id]/ # 문제 풀이 (동적 라우트)
│   ├── (mento)/                  # 멘토 라우트 그룹 (AuthGuard 보호)
│   │   ├── dashboard/            # 멘토 대시보드
│   │   ├── learnManagement/      # 학습 자료 관리
│   │   ├── coachingCenter/       # AI 코칭 센터
│   │   └── mypage/               # 멘토 마이페이지
│   ├── (parent)/                 # 학부모 라우트 그룹 (AuthGuard 보호)
│   │   └── parent/               # 학부모 대시보드
│   ├── _components/              # 루트 레벨 공용 컴포넌트
│   ├── ui-showcase/              # 컴포넌트 쇼케이스 (개발용)
│   ├── layout.tsx                # 루트 레이아웃 (Auth + Toast 프로바이더)
│   ├── page.tsx                  # 랜딩 페이지
│   ├── fonts.ts                  # Pretendard 폰트 설정
│   ├── globals.css               # Tailwind 테마 및 디자인 토큰
│   └── mock.ts                   # 개발용 목 데이터
├── components/
│   ├── ui/                       # 공용 UI 컴포넌트 라이브러리
│   └── auth/                     # AuthGuard 컴포넌트
├── lib/
│   ├── api/                      # API 클라이언트 및 엔드포인트
│   └── auth/                     # AuthContext (인증 상태 관리)
├── _hooks/                       # 공용 커스텀 훅
└── assets/                       # 이미지 등 정적 에셋
```

## 라우트 구조

### 공개 라우트

| 경로 | 설명 |
|---|---|
| `/` | 랜딩 페이지 |
| `/login` | 로그인 (역할 선택 → 자격 증명 입력) |
| `/register` | 회원가입 (개인정보 → 자격 증명 → 완료) |

### 멘티 라우트 (`(mentee)`)

| 경로 | 설명 |
|---|---|
| `/planner` | 학습 플래너 — 주간/월간 캘린더, 일일 과제 관리 |
| `/feedback` | 멘토 피드백 분석 및 과목별 리포트 |
| `/me` | 프로필 및 대시보드 |
| `/me/edit` | 프로필 수정 |
| `/solve/[subject]/[id]` | 문제 풀이 (사진 업로드, 시간 기록) |

### 멘토 라우트 (`(mento)`)

| 경로 | 설명 |
|---|---|
| `/dashboard` | 멘티 관리, 리뷰 큐, 코멘트 |
| `/learnManagement` | 학습 자료 및 레슨 관리 |
| `/coachingCenter` | AI 기반 코칭 피드백 작성 |
| `/mypage` | 멘토 프로필 관리 |

### 학부모 라우트 (`(parent)`)

| 경로 | 설명 |
|---|---|
| `/parent` | 자녀 학습 현황 모니터링 |

## 아키텍처

### 레이아웃 및 네비게이션

각 역할 그룹(`(mentee)`, `(mento)`, `(parent)`)은 독립된 `layout.tsx`를 가지며, 데스크톱에서는 상단 헤더 네비게이션, 모바일에서는 하단 탭 네비게이션을 제공합니다. `AuthGuard`가 역할 기반 접근 제어를 수행하여 권한이 없는 사용자는 `/login`으로 리다이렉트됩니다.

### 상태 관리

외부 상태 관리 라이브러리 없이 **React Context API**를 사용합니다.

- **AuthContext** (`lib/auth/AuthContext.tsx`) — 사용자 인증 상태, 로그인/로그아웃/회원가입 메서드, 토큰 관리
- **ToastProvider** (`components/ui/Toast.tsx`) — 전역 토스트 알림 (success, error, info, warning)
- 기능별 커스텀 훅 (`usePlannerData`, `useSelectedDate`, `useMediaQuery` 등)

### API 클라이언트

`lib/api/client.ts`에 제네릭 API 클라이언트가 구현되어 있습니다.

```typescript
// 사용 예시
api.get<T>(path, query?)
api.post<T>(path, body?, query?)
api.put<T>(path, body?, query?)
api.patch<T>(path, body?, query?)
api.delete<T>(path, query?)
```

- Bearer 토큰 자동 첨부
- localStorage 기반 토큰 저장 (`lib/api/tokenStore.ts`)
- 통일된 응답 형식: `{ success: boolean, data: T, message?: string }`

### API 모듈

| 모듈 | 파일 | 주요 기능 |
|---|---|---|
| 인증 | `lib/api/auth.ts` | 로그인, 회원가입, 로그아웃, 세션 확인 |
| 멘티 | `lib/api/mentee.ts` | 프로필, 과제, 제출, 북마크, 사진 업로드 |
| 플래너 | `lib/api/plannerApi.ts` | 일간/주간/월간 플래너, 코멘트 |
| 피드백 | `lib/api/feedbackApi.ts` | 피드백 조회, 과목별 분석 |
| 멘토 | `lib/api/mentor.ts` | 대시보드, 과제 관리, 레슨, 코칭, 분석 |
| 학부모 | `lib/api/parent.ts` | 자녀 학습 현황 |

## 디자인 시스템

### 컬러 팔레트

Tailwind v4 `@theme` 디렉티브로 정의 (`globals.css`):

| 토큰 | 용도 | 대표 색상 |
|---|---|---|
| `primary-50` ~ `primary-900` | 브랜드 (오렌지) | `#fd7e14` |
| `success-100` ~ `success-700` | 성공 상태 | `#2fb344` |
| `warning-100` ~ `warning-700` | 경고 상태 | `#f5b301` |
| `error-100` ~ `error-700` | 에러 상태 | `#e03131` |
| `gray-50` ~ `gray-900` | 중립 색상 | `#adb5bd` |

### 타이포그래피

커스텀 `@utility` 클래스를 사용합니다. 원시 `font-size`/`font-weight` 대신 아래 클래스를 사용하세요.

| 클래스 | 크기 | 줄 높이 | 굵기 |
|---|---|---|---|
| `text-display-xl` | 68px | 80px | 600 |
| `text-display-l` | 40px | 56px | 600 |
| `text-heading-xl` | 24px | 32px | 700 |
| `text-heading-l` | 20px | 28px | 600 |
| `text-title-l` | 16px | 24px | 600 |
| `text-title-m` | 14px | 24px | 600 |
| `text-body-l` | 16px | 24px | 400 |
| `text-body-m` | 14px | 24px | 400 |
| `text-label-l` | 14px | 24px | 500 |
| `text-label-m` | 12px | 16px | 500 |
| `text-label-s` | 11px | 16px | 400 |

### UI 컴포넌트 라이브러리

`components/ui/` 디렉토리에 재사용 가능한 공용 컴포넌트가 있습니다.

| 컴포넌트 | 설명 |
|---|---|
| `Button` | 다형성 버튼 (sm/md/lg, primary/secondary/tertiary/ghost) |
| `Input` | 텍스트 입력 필드 |
| `TextArea` | 멀티라인 입력 |
| `Select` | 드롭다운 셀렉트 |
| `Card` | 카드 컨테이너 |
| `Modal` | 모달 다이얼로그 |
| `BottomSheet` | 모바일 바텀 시트 |
| `Toast` | 토스트 알림 시스템 |
| `Checkbox` | 체크박스 |
| `Toggle` | 토글 스위치 |
| `ProgressBar` | 수평 프로그레스 바 |
| `CircularProgress` | 원형 프로그레스 |
| `Avatar` | 사용자 아바타 |
| `Chip` | 칩/뱃지 |
| `Tag` | 태그 |
| `Accordion` | 아코디언 |
| `Spinner` | 로딩 스피너 |
| `PhotoUpload` | 이미지 업로드 |
| `NotificationCard` | 알림 카드 |

`/ui-showcase` 페이지에서 모든 컴포넌트를 시각적으로 확인할 수 있습니다.

## 컨벤션

### 디렉토리 및 파일

- 각 라우트는 `app/` 하위에 디렉토리 + `page.tsx`로 구성
- 라우트 전용 컴포넌트는 `_components/` 하위 디렉토리에 배치
- 라우트 전용 훅은 `_hooks/`, 타입은 `_types/`, 유틸은 `_utils/`에 배치
- `@/*` 경로 별칭으로 프로젝트 루트 기준 임포트 (`@/components/ui/Button`)
- 같은 라우트 내에서는 상대 경로 임포트 허용

### 클라이언트/서버 컴포넌트

- 라우트 트리에서 가장 바깥쪽 인터랙티브 컴포넌트에만 `"use client"` 선언
- props로 데이터를 전달받는 순수 표현 컴포넌트는 서버 컴포넌트 유지

### 스타일링

- Tailwind v4의 `@theme` / `@utility` 디렉티브 사용 (`tailwind.config` 파일 없음)
- Prettier의 `prettier-plugin-tailwindcss`가 Tailwind 클래스를 자동 정렬
- 커스텀 섀도우: `shadow-card` 유틸리티 클래스 사용
