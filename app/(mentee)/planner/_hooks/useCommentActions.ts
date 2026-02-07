"use client";

import { useState } from "react";
import { api } from "@/lib/api/client";

export function useCommentActions(date: string, onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addComment = async (content: string) => {
    setLoading(true);
    setError(null);

    try {
      await api.post("/api/planner/comments", { date, content });
      onSuccess?.();
      return true;
    } catch {
      setError("코멘트 등록 중 오류가 발생했습니다.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { addComment, loading, error };
}
