"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/components/ui/Toast";
import { ApiError } from "@/lib/api";
import LoginForm from "./_components/Login";
import RoleSelect, { type UserRole } from "./_components/RoleSelect";

type AuthStep = "RoleSelect" | "Login";

export default function LoginPage() {
  const [step, setStep] = useState<AuthStep>("RoleSelect");
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleRoleNext = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep("Login");
  };

  const handleLogin = async (loginId: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await login({ loginId, password });
      toast("로그인에 성공했습니다!", "success");
      switch (user.role) {
        case "MENTEE":
          router.push("/planner");
          break;
        case "MENTOR":
          router.push("/dashboard");
          break;
        case "PARENT":
          router.push("/parent");
          break;
      }
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
    <div className="max-w-83.5 min-h-screen h-full w-full mx-auto">
      {step === "RoleSelect" && <RoleSelect onNext={handleRoleNext} />}
      {step === "Login" && role && (
        <LoginForm role={role} onSubmit={handleLogin} isLoading={isLoading} />
      )}
    </div>
  );
}
