"use client";

import Link from "next/link";
import { Card, CardContent, Grid, Typography } from "@mui/material";

const items = [
  {
    title: "Users Management",
    description: "Browse users, search, paginate, and open profile details.",
    href: "/dashboard/users",
  },
  {
    title: "Products Management",
    description: "Browse products with category filter, search, and detail pages.",
    href: "/dashboard/products",
  },
];

export default function DashboardHomePage() {
  return (
    <Grid container spacing={3}>
      {items.map((item) => (
        <Grid key={item.title} size={{ xs: 12, md: 6 }}>
          <Card component={Link} href={item.href} sx={{ textDecoration: "none" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
