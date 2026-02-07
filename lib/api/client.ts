import type { ApiSuccessResponse, ApiErrorDetail } from "./types";
import { getAccessToken } from "./tokenStore";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    public override message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type RequestOptions = {
  method: string;
  path: string;
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined>;
};

async function request<T>(options: RequestOptions): Promise<T> {
  const { method, path, body, query } = options;

  const url = new URL(path, API_BASE_URL);
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  const headers: HeadersInit = {};
  const token = getAccessToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url.toString(), {
    method,
    headers,
    credentials: "include",
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const json = await response.json();

  if (!response.ok || json.success === false) {
    const error = json.error as ApiErrorDetail | undefined;
    const detail = json.detail as ApiErrorDetail | undefined;
    const errorInfo = error ?? detail;
    throw new ApiError(
      response.status,
      errorInfo?.code ?? "UNKNOWN",
      errorInfo?.message ?? "알 수 없는 오류가 발생했습니다",
    );
  }

  return (json as ApiSuccessResponse<T>).data;
}

export const api = {
  get: <T>(path: string, query?: RequestOptions["query"]) =>
    request<T>({ method: "GET", path, query }),

  post: <T>(path: string, body?: unknown, query?: RequestOptions["query"]) =>
    request<T>({ method: "POST", path, body, query }),

  put: <T>(path: string, body?: unknown, query?: RequestOptions["query"]) =>
    request<T>({ method: "PUT", path, body, query }),

  patch: <T>(path: string, body?: unknown, query?: RequestOptions["query"]) =>
    request<T>({ method: "PATCH", path, body, query }),

  delete: <T>(path: string, query?: RequestOptions["query"]) =>
    request<T>({ method: "DELETE", path, query }),
};
