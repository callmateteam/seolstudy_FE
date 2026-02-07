"use client";

import { useState, useRef, useCallback } from "react";
import { Camera, Loader2, CheckCircle, AlertCircle, X } from "lucide-react";

type UploadState = "idle" | "uploading" | "complete" | "error";

interface PhotoUploadProps {
  onUpload?: (file: File) => Promise<void>;
  accept?: string;
}

export default function PhotoUpload({
  onUpload,
  accept = "image/*",
}: PhotoUploadProps) {
  const [state, setState] = useState<UploadState>("idle");
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // 미리보기 생성
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target?.result as string);
      reader.readAsDataURL(file);

      setState("uploading");
      try {
        if (onUpload) {
          await onUpload(file);
        } else {
          // mock delay
          await new Promise((r) => setTimeout(r, 1500));
        }
        setState("complete");
      } catch {
        setState("error");
      }
    },
    [onUpload],
  );

  const handleReset = () => {
    setState("idle");
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* 미리보기 / 업로드 영역 */}
      <button
        type="button"
        onClick={() => state === "idle" && inputRef.current?.click()}
        className={`relative flex h-48 w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition-colors ${
          state === "complete"
            ? "border-success-500 bg-success-100"
            : state === "error"
              ? "border-error-500 bg-error-100"
              : "border-gray-300 bg-gray-50 hover:border-primary-500"
        }`}
      >
        {preview ? (
          <img
            src={preview}
            alt="미리보기"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Camera size={32} className="text-gray-400" />
            <p className="text-label-m text-gray-500">
              인증사진을 업로드해주세요
            </p>
          </div>
        )}

        {/* 상태 오버레이 */}
        {state === "uploading" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Loader2 size={32} className="animate-spin text-white" />
          </div>
        )}
        {state === "complete" && (
          <div className="absolute right-2 top-2">
            <CheckCircle size={24} className="text-success-500" />
          </div>
        )}
        {state === "error" && (
          <div className="absolute right-2 top-2">
            <AlertCircle size={24} className="text-error-500" />
          </div>
        )}
      </button>

      {/* 상태 메시지 + 초기화 */}
      <div className="flex items-center gap-2">
        {state === "uploading" && (
          <p className="text-label-m text-gray-500">업로드 중...</p>
        )}
        {state === "complete" && (
          <p className="text-label-m text-success-500">업로드 완료</p>
        )}
        {state === "error" && (
          <p className="text-label-m text-error-500">업로드 실패</p>
        )}
        {(state === "complete" || state === "error") && (
          <button
            type="button"
            onClick={handleReset}
            className="text-label-m cursor-pointer text-gray-500"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
