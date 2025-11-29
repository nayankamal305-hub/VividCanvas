import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@shared/schema";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user: User, token: string) =>
        set({ user, token, isAuthenticated: true }),
      logout: () =>
        set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: "placement-panic-auth",
    }
  )
);

export function getAuthHeader(): HeadersInit {
  const token = useAuth.getState().token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}
