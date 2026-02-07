"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";

export default function MenteeProfileEditPage() {
  const router = useRouter();
  const [name, setName] = useState("이하은");
  const [school, setSchool] = useState("서울고등학교");
  const [grade, setGrade] = useState("고2");
  const [phone, setPhone] = useState("010-1234-5678");

  const handleSave = () => {
    // TODO: API 연결
    console.log("프로필 저장:", { name, school, grade, phone });
    router.back();
  };

  return (
    <article className="mt-7 px-5">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="cursor-pointer"
        >
          <ChevronLeft size={28} />
        </button>
        <h1 className="text-heading-xl text-gray-900">프로필 수정</h1>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <Avatar initials="이" size="lg" variant="primary" />
        <button
          type="button"
          className="text-label-m text-primary-500 mt-2 cursor-pointer"
        >
          사진 변경
        </button>
      </div>

      <div className="mt-8 flex flex-col gap-5">
        <Input
          label="이름"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="학교"
          type="text"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
        <Input
          label="학년"
          type="text"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
        <Input
          label="휴대폰 번호"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <Button fullWidth onClick={handleSave}>
          저장하기
        </Button>
      </div>
    </article>
  );
}
