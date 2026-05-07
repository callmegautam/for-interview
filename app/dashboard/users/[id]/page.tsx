import Link from "next/link";
import { notFound } from "next/navigation";
import { type User } from "@/lib/api";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  Button,
} from "@mui/material";

export default async function UserDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await fetch(`https://dummyjson.com/users/${id}`, { cache: "no-store" });
  if (!response.ok) {
    notFound();
  }
  const user = (await response.json()) as User;

  return (
    <Stack spacing={2}>
      <Button component={Link} href="/dashboard/users" variant="outlined" sx={{ width: "fit-content" }}>
        Back to Users
      </Button>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Stack spacing={1} sx={{ alignItems: { xs: "flex-start", md: "center" } }}>
                <Avatar src={user.image} sx={{ width: 120, height: 120 }} />
                <Typography variant="h6">{`${user.firstName} ${user.lastName}`}</Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Stack spacing={1}>
                <Typography><strong>Email:</strong> {user.email}</Typography>
                <Typography><strong>Phone:</strong> {user.phone}</Typography>
                <Typography><strong>Gender:</strong> {user.gender}</Typography>
                <Typography><strong>Company:</strong> {user.company?.name ?? "-"}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
}
