import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { type Product } from "@/lib/api";
import { ProductCarousel } from "@/components/product-carousel";

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await fetch(`https://dummyjson.com/products/${id}`, { cache: "no-store" });
  if (!response.ok) {
    notFound();
  }
  const product = (await response.json()) as Product;

  return (
    <Stack spacing={2}>
      <Button component={Link} href="/dashboard/products" variant="outlined" sx={{ width: "fit-content" }}>
        Back to Products
      </Button>
      <Card>
        <ProductCarousel images={product.images ?? []} title={product.title} />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {product.description}
          </Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 1 }}>
            <Typography><strong>Price:</strong> ${product.price}</Typography>
            <Typography><strong>Category:</strong> {product.category}</Typography>
            <Typography><strong>Rating:</strong> {product.rating}</Typography>
            <Typography><strong>Brand:</strong> {product.brand ?? "-"}</Typography>
            <Typography><strong>SKU:</strong> {product.sku ?? "-"}</Typography>
            <Typography><strong>Stock:</strong> {product.stock ?? "-"}</Typography>
            <Typography><strong>Warranty:</strong> {product.warrantyInformation ?? "-"}</Typography>
            <Typography><strong>Shipping:</strong> {product.shippingInformation ?? "-"}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
}
