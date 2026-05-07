"use client";

import { create } from "zustand";
import { fetchUsers, type User } from "@/lib/api";

type UsersState = {
  users: User[];
  total: number;
  loading: boolean;
  error: string | null;
  cache: Record<string, { users: User[]; total: number; savedAt: number }>;
  loadUsers: (params: { q: string; limit: number; skip: number }) => Promise<void>;
};

const CACHE_TTL = 1000 * 60 * 5;

export const useUsersStore = create<UsersState>((set, get) => ({
  users: [],
  total: 0,
  loading: false,
  error: null,
  cache: {},
  loadUsers: async ({ q, limit, skip }) => {
    const key = `${q}|${limit}|${skip}`;
    const hit = get().cache[key];
    const now = Date.now();

    // Small in-memory cache avoids repeated list calls while browsing pages/search.
    if (hit && now - hit.savedAt < CACHE_TTL) {
      set({ users: hit.users, total: hit.total, loading: false, error: null });
      return;
    }

    set({ loading: true, error: null });
    try {
      const response = await fetchUsers({ q, limit, skip });
      set((state) => ({
        users: response.data,
        total: response.total,
        loading: false,
        cache: {
          ...state.cache,
          [key]: { users: response.data, total: response.total, savedAt: now },
        },
      }));
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "Failed to load users",
      });
    }
  },
}));
