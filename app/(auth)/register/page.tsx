"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/components/ui/Toast";
import { ApiError } from "@/lib/api";
import type { UserRole } from "@/lib/api/types";
import RoleSelect from "../login/_components/RoleSelect";
import type { UserRole as UIRole } from "../login/_components/RoleSelect";
import CredentialsStep from "./_components/CredentialsStep";
import PersonalInfoStep from "./_components/PersonalInfoStep";
import CompleteStep from "./_components/CompleteStep";

type RegisterStep = "RoleSelect" | "Credentials" | "PersonalInfo" | "Complete";

const ROLE_MAP: Record<UIRole, UserRole> = {
  Mentee: "MENTEE",
  Mentor: "MENTOR",
  Parent: "PARENT",
};

export default function RegisterPage() {
  const [step, setStep] = useState<RegisterStep>("RoleSelect");
  const [role, setRole] = useState<UserRole | null>(null);
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleRoleNext = (uiRole: UIRole) => {
    setRole(ROLE_MAP[uiRole]);
    setStep("Credentials");
  };

  const handleCredentialsNext = (data: { username: string; password: string }) => {
    setLoginId(data.username);
    setPassword(data.password);
    setStep("PersonalInfo");
  };

  const handlePersonalInfoComplete = async (data: { name: string; phone: string }) => {
    if (!role) return;
    setIsLoading(true);
    try {
      await signup({
        loginId,
        password,
        name: data.name,
        phone: data.phone,
        role,
      });
      toast("회원가입이 완료되었습니다!", "success");
      setStep("Complete");
    } catch (err) {
      if (err instanceof ApiError) {
        toast(err.message, "error");
      } else {
        toast("네트워크 오류가 발생했습니다", "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-83.5 px-5">
      {step === "RoleSelect" && <RoleSelect onNext={handleRoleNext} />}
      {step === "Credentials" && (
        <CredentialsStep onNext={handleCredentialsNext} />
      )}
      {step === "PersonalInfo" && (
        <PersonalInfoStep onComplete={handlePersonalInfoComplete} isLoading={isLoading} />
      )}
      {step === "Complete" && <CompleteStep />}
    </div>
  );
}
