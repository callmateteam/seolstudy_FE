"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";

interface PhotoGalleryProps {
  photos: string[];
  total?: number;
}

export default function PhotoGallery({ photos, total }: PhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const count = photos.length || total || 4;

  return (
    <div>
      <h2 className="text-title-l text-gray-900">인증샷</h2>
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          className="shrink-0 cursor-pointer text-gray-400 hover:text-gray-600"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex h-48 flex-1 flex-col items-center justify-center rounded-xl bg-gray-200">
          {photos.length > 0 && photos[currentIndex] ? (
            <img
              src={photos[currentIndex]}
              alt={`인증샷 ${currentIndex + 1}`}
              className="h-full w-full rounded-xl object-cover"
            />
          ) : (
            <>
              <ImageIcon size={24} className="text-gray-400" />
              <p className="mt-2 text-body-m text-gray-500">멘티 업로드 이미지</p>
              <p className="text-label-s text-gray-400">클릭하여 확대 가능</p>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setCurrentIndex((prev) => Math.min(count - 1, prev + 1))}
          className="shrink-0 cursor-pointer text-gray-400 hover:text-gray-600"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <p className="mt-2 text-center text-label-m">
        <span className="text-primary-500">{currentIndex + 1}</span>
        <span className="text-gray-500"> / {count}</span>
      </p>
    </div>
  );
}
