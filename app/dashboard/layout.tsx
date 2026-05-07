"use client";

import { PropsWithChildren } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

const links = [
  { href: "/dashboard/users", label: "Users" },
  { href: "/dashboard/products", label: "Products" },
];

export default function DashboardLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Stack direction="row" spacing={1}>
            {links.map((link) => (
              <Button
                key={link.href}
                component={Link}
                href={link.href}
                color={pathname?.startsWith(link.href) ? "secondary" : "inherit"}
                variant={pathname?.startsWith(link.href) ? "contained" : "text"}
              >
                {link.label}
              </Button>
            ))}
            <Button
              color="inherit"
              onClick={async () => {
                await signOut({ redirect: false });
                router.push("/login");
              }}
            >
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box sx={{ py: 4 }}>
        <Container>{children}</Container>
      </Box>
    </>
  );
}
