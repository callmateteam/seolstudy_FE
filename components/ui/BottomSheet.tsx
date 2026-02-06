"use client";

import { ReactNode, useEffect } from "react";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function BottomSheet({
  isOpen,
  onClose,
  children,
}: BottomSheetProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="absolute bottom-0 left-0 right-0 z-10 transform transition-transform duration-300 ease-out">
        <div className="max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white">
          {children}
        </div>
      </div>
    </div>
  );
}
