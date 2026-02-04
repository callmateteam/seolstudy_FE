import type { UserRole } from "./RoleSelect";

interface LoginProps {
  role: UserRole;
  onSubmit: () => void;
}

export default function Login({ role, onSubmit }: LoginProps) {
  const inputClassName =
    "w-full rounded-xl border border-gray-50 bg-white p-3 outline-none shadow-[inset_1px_1px_4px_0_rgba(33,37,41,0.08)]";

  return (
    <article className="mt-19.5">
      <figure className="text-center">
        <h1 className="text-heading-l text-primary-500 mb-1">설스터디</h1>
        <p className="text-title-l text-black">
          <span className="text-primary-500">
            {role === "Mentee" ? "멘티님" : role === "Mentor" ? "멘토님" : "학부모님"}{" "}
          </span>
          반가워요!
        </p>
      </figure>
      <figure className="flex flex-col gap-5">
        <label className="flex flex-col gap-5">
          <p className="text-title-m text-gray-900">아이디</p>
          <input type="text" placeholder="아이디를 입력해주세요" className={inputClassName} />
        </label>
        <label>
          <p className="text-title-m mb-2 text-gray-900">비밀번호</p>
          <input type="password" placeholder="비밀번호를 입력해주세요" className={inputClassName} />
        </label>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={onSubmit}
            className="bg-primary-500 text-title-m w-full cursor-pointer rounded-lg py-3 text-white"
          >
            로그인
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="text-primary-500 text-title-m w-full cursor-pointer rounded-lg border bg-gray-50 py-3"
          >
            회원가입
          </button>
        </div>
      </figure>
    </article>
  );
}
