import Button from "@/components/ui/Button";
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
      <section className="mb-12 text-center">
        <h1 className="text-heading-l text-primary-500 mb-1">설스터디</h1>
        <p className="text-title-l text-black">
          <span className="text-primary-500">
            {role === "Mentee" ? "멘티님" : role === "Mentor" ? "멘토님" : "학부모님"}{" "}
          </span>
          반가워요!
        </p>
      </section>
      <figure className="flex flex-col gap-5">
        <label className="flex flex-col gap-5">
          <p className="text-title-m text-gray-900">이메일</p>
          <input type="email" placeholder="이메일을 입력해주세요" className={inputClassName} />
        </label>
        <label>
          <p className="text-title-m mb-2 text-gray-900">비밀번호</p>
          <input type="password" placeholder="비밀번호를 입력해주세요" className={inputClassName} />
        </label>
        <div className="flex flex-col gap-2">
          <Button onClick={onSubmit}>로그인</Button>
          <Button onClick={onSubmit} outlined>
            회원가입
          </Button>
        </div>
      </figure>
    </article>
  );
}
