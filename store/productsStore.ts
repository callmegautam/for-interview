"use client";

import { create } from "zustand";
import { fetchCategories, fetchProducts, type Product } from "@/lib/api";

type ProductsState = {
  products: Product[];
  categories: string[];
  total: number;
  loading: boolean;
  error: string | null;
  cache: Record<string, { products: Product[]; total: number; savedAt: number }>;
  loadProducts: (params: {
    q: string;
    category: string;
    limit: number;
    skip: number;
  }) => Promise<void>;
  loadCategories: () => Promise<void>;
};

const CACHE_TTL = 1000 * 60 * 5;

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  categories: [],
  total: 0,
  loading: false,
  error: null,
  cache: {},
  loadProducts: async ({ q, category, limit, skip }) => {
    const key = `${q}|${category}|${limit}|${skip}`;
    const hit = get().cache[key];
    const now = Date.now();

    // Cache strategy: key by search/category/page for fast back-and-forth navigation.
    if (hit && now - hit.savedAt < CACHE_TTL) {
      set({ products: hit.products, total: hit.total, loading: false, error: null });
      return;
    }

    set({ loading: true, error: null });
    try {
      const response = await fetchProducts({ q, category, limit, skip });
      set((state) => ({
        products: response.data,
        total: response.total,
        loading: false,
        cache: {
          ...state.cache,
          [key]: { products: response.data, total: response.total, savedAt: now },
        },
      }));
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "Failed to load products",
      });
    }
  },
  loadCategories: async () => {
    if (get().categories.length > 0) return;
    try {
      const categories = await fetchCategories();
      set({ categories });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to load categories",
      });
    }
  },
}));
