"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api/client";
import { PlannerData } from "../_types";

export function usePlannerData(date: string) {
  const [data, setData] = useState<PlannerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await api.get<PlannerData>("/api/planner", { date });
      setData(result);
    } catch {
      setError("데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
