export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  company?: { name: string };
  image?: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  images: string[];
  brand?: string;
  sku?: string;
  stock?: number;
  warrantyInformation?: string;
  shippingInformation?: string;
};

type ListResponse<T> = {
  total: number;
  limit: number;
  skip: number;
  users?: T[];
  products?: T[];
};

export async function fetchUsers(params: { q?: string; limit: number; skip: number }) {
  const { q, limit, skip } = params;
  const endpoint = q
    ? `https://dummyjson.com/users/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`
    : `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;
  const response = await fetch(endpoint, { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to fetch users");
  const data = (await response.json()) as ListResponse<User>;
  return { data: data.users ?? [], total: data.total };
}

export async function fetchUserById(id: string) {
  const response = await fetch(`https://dummyjson.com/users/${id}`, { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to fetch user details");
  return (await response.json()) as User;
}

export async function fetchProducts(params: {
  q?: string;
  category?: string;
  limit: number;
  skip: number;
}) {
  const { q, category, limit, skip } = params;
  let endpoint = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
  if (q) {
    endpoint = `https://dummyjson.com/products/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`;
  } else if (category && category !== "all") {
    endpoint = `https://dummyjson.com/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;
  }

  const response = await fetch(endpoint, { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to fetch products");
  const data = (await response.json()) as ListResponse<Product>;
  return { data: data.products ?? [], total: data.total };
}

export async function fetchProductById(id: string) {
  const response = await fetch(`https://dummyjson.com/products/${id}`, { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to fetch product details");
  return (await response.json()) as Product;
}

export async function fetchCategories() {
  const response = await fetch("https://dummyjson.com/products/categories", { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to fetch categories");
  const data = (await response.json()) as Array<{ slug: string; name: string }>;
  return data.map((item) => item.slug);
}
