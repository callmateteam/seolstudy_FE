import { api } from "./client";
import type { AuthResponse, LoginRequest, MeResponse, SignupRequest } from "./types";

export const authApi = {
  signup: (data: SignupRequest) =>
    api.post<AuthResponse>("/api/auth/signup", data),

  login: (data: LoginRequest) =>
    api.post<AuthResponse>("/api/auth/login", data),

  logout: () => api.post<void>("/api/auth/logout"),

  me: () => api.get<MeResponse>("/api/auth/me"),
};
