import Link from "next/link";
import Button from "@/components/ui/Button";

export default function CompleteStep() {
  return (
    <article className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-heading-l text-primary-500 mb-4">설스터디</h1>
        <p className="text-heading-xl text-gray-900">
          회원가입이 완료되었습니다.
        </p>
      </div>

      <div className="mt-12 w-full">
        <Link href="/login">
          <Button fullWidth>홈으로</Button>
        </Link>
      </div>
    </article>
  );
}
