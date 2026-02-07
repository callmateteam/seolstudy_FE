"use client";

import { useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { ImageIcon, Check, X } from "lucide-react";
import { menteeApi } from "@/lib/api/mentee";

type UploadState = "idle" | "uploading" | "complete" | "error";

interface PhotoUploadStepProps {
  onComplete?: (urls: string[]) => void;
}

export default function PhotoUploadStep({ onComplete }: PhotoUploadStepProps) {
  const [state, setState] = useState<UploadState>("idle");
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setState("uploading");
    const urls: string[] = [];

    try {
      for (const file of Array.from(files)) {
        const result = await menteeApi.uploadStudyPhoto(file);
        urls.push(result.url);
      }
      setUploadedUrls(urls);
      setState("complete");
      onComplete?.(urls);
    } catch {
      setState("error");
    }
  };

  if (state === "complete") {
    return (
      <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-5">
        <p className="text-title-m font-semibold text-gray-900">
          인증이 완료되었어요
        </p>
        <div className="mt-3 flex gap-3">
          {uploadedUrls.map((_, i) => (
            <div
              key={i}
              className="relative flex h-14 w-14 items-center justify-center rounded-lg bg-gray-200"
            >
              <ImageIcon size={20} className="text-gray-400" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-success-500">
                <Check size={12} className="text-white" />
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-5">
        <p className="text-title-m font-semibold text-gray-900">
          사진이 선명하지 않아 인증이 어려워요
        </p>
        <p className="text-body-m mt-1 text-gray-500">
          글자와 풀이 과정이 잘 보이도록 밝은 곳에서 다시 촬영해 주세요.
        </p>
        <div className="mt-3 flex gap-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="relative flex h-14 w-14 items-center justify-center rounded-lg bg-gray-200"
            >
              <ImageIcon size={20} className="text-gray-400" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-error-500">
                <X size={12} className="text-white" />
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-3">
          <Button size="sm" variant="primary" outlined onClick={() => {
            setState("idle");
            onComplete?.([]);
          }}>
            이대로 제출
          </Button>
          <Button size="sm" variant="primary" onClick={() => {
            setState("idle");
            setUploadedUrls([]);
          }}>
            다시 업로드
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-5">
      <p className="text-title-m font-semibold text-gray-900">
        학습 인증 사진 업로드
      </p>
      <p className="text-body-m mt-1 text-gray-500">
        파일을 드래그하거나 클릭하여 업로드해주세요
      </p>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleUpload(e.target.files)}
      />
      <div className="mt-3">
        <Button
          size="sm"
          variant="primary"
          outlined
          onClick={() => fileInputRef.current?.click()}
          disabled={state === "uploading"}
        >
          {state === "uploading" ? "업로드 중..." : "업로드"}
        </Button>
      </div>
    </div>
  );
}
