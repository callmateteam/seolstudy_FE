import Link from "next/link";
import Button from "@/components/ui/Button";

export default function SubmissionComplete() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-5">
      <div className="text-center">
        <p className="text-heading-xl text-primary-500">제출 완료</p>
        <p className="text-title-m mt-2 text-gray-600">
          멘토님의 피드백이 오면 알려드릴게요!
        </p>
      </div>

      <div className="mt-12 w-full max-w-[335px]">
        <Link href="/planner">
          <Button fullWidth>홈으로</Button>
        </Link>
      </div>
    </div>
  );
}
