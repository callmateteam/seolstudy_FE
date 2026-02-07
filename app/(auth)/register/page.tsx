"use client";

import { useState } from "react";
import CredentialsStep from "./_components/CredentialsStep";
import PersonalInfoStep from "./_components/PersonalInfoStep";
import CompleteStep from "./_components/CompleteStep";

type RegisterStep = "Credentials" | "PersonalInfo" | "Complete";

export default function RegisterPage() {
  const [step, setStep] = useState<RegisterStep>("Credentials");

  const handleCredentialsNext = (data: { username: string; password: string }) => {
    // TODO: API 연결
    console.log("Credentials:", data);
    setStep("PersonalInfo");
  };

  const handlePersonalInfoComplete = (data: { name: string; phone: string }) => {
    // TODO: API 연결
    console.log("PersonalInfo:", data);
    setStep("Complete");
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-83.5 px-5">
      {step === "Credentials" && (
        <CredentialsStep onNext={handleCredentialsNext} />
      )}
      {step === "PersonalInfo" && (
        <PersonalInfoStep onComplete={handlePersonalInfoComplete} />
      )}
      {step === "Complete" && <CompleteStep />}
    </div>
  );
}
