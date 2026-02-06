"use client";

import { useState, useEffect } from "react";
import { mockGet } from "@/app/mock";
import { MonthlyCompletion } from "../_types";

export function useCalendarCompletion(year: number, month: number) {
  const [data, setData] = useState<MonthlyCompletion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const response = await mockGet("/api/planner/monthly", { year, month });

        if (response.success) {
          setData(response.data);
        } else {
          setError(response.error.message);
        }
      } catch (err) {
        setError("캘린더 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [year, month]);

  return { data, loading, error };
}
