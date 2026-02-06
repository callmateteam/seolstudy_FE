"use client";

import { useState } from "react";
import { mockPost } from "@/app/mock";

export function useCommentActions(date: string, onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addComment = async (content: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await mockPost("/api/planner/comments", {
        date,
        content,
      });

      if (response.success) {
        // 성공 시 콜백 호출 (페이지에서 데이터 refetch)
        onSuccess?.();
        return true;
      } else {
        setError(response.error.message);
        return false;
      }
    } catch (err) {
      setError("코멘트 등록 중 오류가 발생했습니다.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { addComment, loading, error };
}
