"use client";

import { useState, useEffect } from "react";
import { mockGet } from "@/app/mock";
import { PlannerData } from "../_types";

export function usePlannerData(date: string) {
  const [data, setData] = useState<PlannerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const response = await mockGet("/api/planner", { date });

        if (response.success) {
          setData(response.data);
        } else {
          setError(response.error.message);
        }
      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [date]);

  return { data, loading, error };
}
