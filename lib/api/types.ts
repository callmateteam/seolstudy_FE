export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
  message?: string | null;
};

export type ApiErrorDetail = {
  code: string;
  message: string;
};

export type ApiErrorResponse = {
  success: false;
  error: ApiErrorDetail;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export type UserRole = "MENTEE" | "MENTOR" | "PARENT";

export type User = {
  id: string;
  loginId: string;
  role: UserRole;
  name: string;
  phone: string | null;
  profileImage: string | null;
  nickname: string | null;
};

export type AuthResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type MeResponse = {
  user: User;
  profile: Record<string, unknown> | null;
};

export type SignupRequest = {
  loginId: string;
  password: string;
  name: string;
  phone: string;
  role: UserRole;
};

export type LoginRequest = {
  loginId: string;
  password: string;
};
