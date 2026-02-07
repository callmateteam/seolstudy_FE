"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { authApi } from "@/lib/api/auth";
import { setAccessToken, getAccessToken } from "@/lib/api/tokenStore";
import type { User, LoginRequest, SignupRequest } from "@/lib/api/types";

type AuthState = {
  user: User | null;
  profile: Record<string, unknown> | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};

type AuthContextValue = AuthState & {
  login: (data: LoginRequest) => Promise<User>;
  signup: (data: SignupRequest) => Promise<User>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    isLoading: true,
    isAuthenticated: false,
  });

  const checkSession = useCallback(async () => {
    const token = getAccessToken();
    if (!token) {
      setState({
        user: null,
        profile: null,
        isLoading: false,
        isAuthenticated: false,
      });
      return;
    }
    try {
      const data = await authApi.me();
      setState({
        user: data.user,
        profile: data.profile,
        isLoading: false,
        isAuthenticated: true,
      });
    } catch {
      setAccessToken(null);
      setState({
        user: null,
        profile: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const login = useCallback(async (data: LoginRequest): Promise<User> => {
    const result = await authApi.login(data);
    setAccessToken(result.accessToken);
    setState({
      user: result.user,
      profile: null,
      isLoading: false,
      isAuthenticated: true,
    });
    return result.user;
  }, []);

  const signup = useCallback(async (data: SignupRequest): Promise<User> => {
    const result = await authApi.signup(data);
    setAccessToken(result.accessToken);
    setState({
      user: result.user,
      profile: null,
      isLoading: false,
      isAuthenticated: true,
    });
    return result.user;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // Clear local state even if API fails
    }
    setAccessToken(null);
    setState({
      user: null,
      profile: null,
      isLoading: false,
      isAuthenticated: false,
    });
  }, []);

  const refreshUser = useCallback(async () => {
    await checkSession();
  }, [checkSession]);

  return (
    <AuthContext.Provider
      value={{ ...state, login, signup, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
