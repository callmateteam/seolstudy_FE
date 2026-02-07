import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface PersonalInfoStepProps {
  onComplete: (data: { name: string; phone: string }) => void;
}

export default function PersonalInfoStep({ onComplete }: PersonalInfoStepProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleComplete = () => {
    if (!name || !phone) return;
    onComplete({ name, phone });
  };

  return (
    <article className="mt-19.5">
      <section className="mb-12">
        <h1 className="text-heading-xl text-gray-900">
          본인 확인을 진행해주세요
        </h1>
        <p className="text-label-m mt-1 text-gray-500">
          역할에 따라 필요한 정보만 안내해드릴게요.
        </p>
      </section>

      <div className="flex flex-col gap-5">
        <Input
          label="이름"
          type="text"
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          label="휴대폰 번호"
          type="tel"
          placeholder="휴대폰 번호를 입력해주세요"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <Button
          fullWidth
          onClick={handleComplete}
          disabled={!name || !phone}
        >
          완료
        </Button>
      </div>
    </article>
  );
}
