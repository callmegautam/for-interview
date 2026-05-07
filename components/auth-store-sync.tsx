"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { hydrateAuthStore, useAuthStore } from "@/store/authStore";

export function AuthStoreSync() {
  const { data: session } = useSession();
  const setToken = useAuthStore((state) => state.setToken);

  useEffect(() => {
    hydrateAuthStore();
  }, []);

  useEffect(() => {
    setToken(session?.accessToken ?? null);
  }, [session?.accessToken, setToken]);

  return null;
}
