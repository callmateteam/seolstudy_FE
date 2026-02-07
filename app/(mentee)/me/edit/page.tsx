"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import { menteeApi } from "@/lib/api/mentee";

export default function MenteeProfileEditPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    menteeApi
      .getMyPage()
      .then((data) => {
        setName(data.name ?? "");
        setSchool(data.school ?? "");
        setGrade(data.grade ?? "");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await menteeApi.updateMyPage({ name, school });
      router.back();
    } catch {
      alert("프로필 저장에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <article className="mt-7 px-5">
        <div className="flex items-center justify-center py-20">
          <p className="text-body-m text-gray-500">로딩중...</p>
        </div>
      </article>
    );
  }

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
        <Avatar initials={name.charAt(0) || "?"} size="lg" variant="primary" />
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
          disabled
        />
        <Input
          label="휴대폰 번호"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled
        />

        <Button fullWidth onClick={handleSave} disabled={saving}>
          {saving ? "저장 중..." : "저장하기"}
        </Button>
      </div>
    </article>
  );
}
