"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { api } from "@/lib/api/client";
import { PlannerData } from "../_types";

export function usePlannerData(date: string) {
  const [data, setData] = useState<PlannerData | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  const fetchData = useCallback(async () => {
    if (hasFetched.current) {
      setIsFetching(true);
    }
    setError(null);

    try {
      const result = await api.get<PlannerData>("/api/planner", { date });
      setData(result);
    } catch {
      setError("데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      hasFetched.current = true;
      setIsInitialLoad(false);
      setIsFetching(false);
    }
  }, [date]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isInitialLoad, isFetching, error, refetch: fetchData };
}
