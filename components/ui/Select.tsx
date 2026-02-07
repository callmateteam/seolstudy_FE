"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string | null;
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

export default function Select({ options, value, placeholder = "선택해주세요", disabled = false, onChange }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value)?.label;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between rounded-lg border px-3 py-2.5 text-body-m transition-colors ${disabled ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400 opacity-60" : `cursor-pointer ${isOpen ? "border-primary-500 bg-primary-50 text-gray-700" : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"}`}`}
      >
        <span>{selected ?? placeholder}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && !disabled && (
        <div className="absolute inset-x-0 z-10 mt-1 rounded-lg border border-gray-200 bg-white shadow-card">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full px-3 py-2 text-left text-body-m cursor-pointer ${value === option.value ? "bg-primary-50 text-primary-500" : "text-gray-700 hover:bg-primary-50 hover:text-primary-500"}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
