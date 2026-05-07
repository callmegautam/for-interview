"use client";

import Link from "next/link";
import { ChangeEvent, memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useProductsStore } from "@/store/productsStore";

const PAGE_SIZE = 10;

const ProductCard = memo(function ProductCard({
  product,
}: {
  product: {
    id: number;
    title: string;
    price: number;
    category: string;
    rating: number;
    images: string[];
  };
}) {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <Card component={Link} href={`/dashboard/products/${product.id}`} sx={{ textDecoration: "none", height: "100%" }}>
        <CardMedia component="img" image={product.images?.[0]} height="180" alt={product.title} />
        <CardContent>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }} noWrap>
            {product.title}
          </Typography>
          <Typography variant="body2">Price: ${product.price}</Typography>
          <Typography variant="body2">Category: {product.category}</Typography>
          <Typography variant="body2">Rating: {product.rating}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
});

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const { products, categories, total, loading, error, loadProducts, loadCategories } = useProductsStore();

  useEffect(() => {
    void loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    void loadProducts({ q: search.trim(), category, limit: PAGE_SIZE, skip: (page - 1) * PAGE_SIZE });
  }, [category, loadProducts, page, search]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / PAGE_SIZE)), [total]);

  const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  }, []);

  return (
    <Stack spacing={2}>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        Products
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <TextField
            label="Search products"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by product title..."
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
                setPage(1);
              }}
            >
              <MenuItem value="all">All</MenuItem>
              {categories.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={2}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
      {!loading && products.length === 0 && (
        <Typography sx={{ py: 2, textAlign: "center" }} color="text.secondary">
          No products found
        </Typography>
      )}
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="body2" color="text.secondary">
          {loading ? "Loading..." : `Showing ${products.length} of ${total} products`}
        </Typography>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Stack>
    </Stack>
  );
}
