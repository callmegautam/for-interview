"use client";

import { create } from "zustand";

type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  setToken: (token: string | null) => void;
  clear: () => void;
};

const TOKEN_KEY = "dummy_auth_token";

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  setToken: (token) => {
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem(TOKEN_KEY, token);
      } else {
        localStorage.removeItem(TOKEN_KEY);
      }
    }
    set({ token, isAuthenticated: Boolean(token) });
  },
  clear: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
    }
    set({ token: null, isAuthenticated: false });
  },
}));

export const hydrateAuthStore = () => {
  if (typeof window === "undefined") return;
  const token = localStorage.getItem(TOKEN_KEY);
  useAuthStore.getState().setToken(token);
};
