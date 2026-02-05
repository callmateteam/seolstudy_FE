"use client";

import { useState } from "react";
import LoginForm from "./_components/Login";
import RoleSelect, { type UserRole } from "./_components/RoleSelect";

type AuthStep = "RoleSelect" | "Login";

type AuthDraft = {
  role: UserRole | null;
};

export default function LoginPage() {
  const [step, setStep] = useState<AuthStep>("RoleSelect");
  const [draft, setDraft] = useState<AuthDraft>({ role: null });

  const handleRoleNext = (role: UserRole) => {
    setDraft({ role });
    setStep("Login");
  };

  const handleLogin = () => {
    // TODO: connect real login submit flow
  };

  return (
    <div className="max-w-83.5 min-h-screen h-full w-full mx-auto">
      {step === "RoleSelect" && <RoleSelect onNext={handleRoleNext} />}
      {step === "Login" && draft.role && (
        <LoginForm role={draft.role} onSubmit={handleLogin} />
      )}
    </div>
  );
}
