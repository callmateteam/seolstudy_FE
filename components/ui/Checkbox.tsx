"use client";

import { Check } from "lucide-react";

export type CheckedState = "checked" | "unchecked" | "indeterminate";

interface CheckboxProps {
  checked: CheckedState;
  onChange: (next: CheckedState) => void;
}

const NEXT: Record<CheckedState, CheckedState> = {
  unchecked: "checked",
  checked: "unchecked",
  indeterminate: "checked",
};

export default function Checkbox({ checked, onChange }: CheckboxProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(NEXT[checked])}
      className={`flex h-5 w-5 items-center justify-center rounded-md cursor-pointer ${checked === "checked" ? "border-2 border-primary-500 bg-primary-500" : "border-2 border-gray-300 bg-white"}`}
    >
      {checked === "checked" && <Check size={14} strokeWidth={3} color="white" />}
      {checked === "indeterminate" && <div className="h-2 w-2 rounded-full bg-gray-400" />}
    </button>
  );
}
