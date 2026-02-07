import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface CredentialsStepProps {
  onNext: (data: { username: string; password: string }) => void;
}

export default function CredentialsStep({ onNext }: CredentialsStepProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameChecked, setUsernameChecked] = useState(false);

  const handleCheckDuplicate = () => {
    // TODO: API 연결
    setUsernameChecked(true);
  };

  const handleNext = () => {
    if (!username || !password) return;
    onNext({ username, password });
  };

  return (
    <article className="mt-19.5">
      <section className="mb-12">
        <h1 className="text-heading-xl text-gray-900">
          로그인에 사용할
          <br />
          계정을 만들어주세요
        </h1>
      </section>

      <div className="flex flex-col gap-5">
        {/* 아이디 */}
        <div className="flex flex-col gap-2">
          <p className="text-title-m text-gray-900">아이디</p>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="아이디를 입력해주세요"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUsernameChecked(false);
                }}
              />
            </div>
            <Button
              variant="ghost"
              outlined
              onClick={handleCheckDuplicate}
            >
              중복확인
            </Button>
          </div>
        </div>

        {/* 비밀번호 */}
        <Input
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 다음 버튼 */}
        <Button
          fullWidth
          onClick={handleNext}
          disabled={!username || !password}
        >
          다음
        </Button>
      </div>
    </article>
  );
}
