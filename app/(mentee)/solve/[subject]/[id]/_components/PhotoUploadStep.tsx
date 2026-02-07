"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import PhotoUpload from "@/components/ui/PhotoUpload";

interface PhotoUploadStepProps {
  onComplete: () => void;
}

export default function PhotoUploadStep({ onComplete }: PhotoUploadStepProps) {
  const [uploaded, setUploaded] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 px-5 py-10">
      <div className="mx-auto w-full max-w-md">
        <h1 className="text-heading-xl text-center text-gray-900">학습 인증</h1>
        <p className="text-body-m mt-2 text-center text-gray-500">
          학습 인증 사진을 업로드해주세요
        </p>

        <div className="mt-8">
          <PhotoUpload
            onUpload={async () => {
              setUploaded(true);
            }}
          />
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Button fullWidth onClick={onComplete} disabled={!uploaded}>
            제출하기
          </Button>
          <button
            type="button"
            onClick={onComplete}
            className="text-label-m cursor-pointer text-center text-gray-500"
          >
            건너뛰기
          </button>
        </div>
      </div>
    </div>
  );
}
