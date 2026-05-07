"use client";

import Link from "next/link";
import { ChangeEvent, memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Card,
  CardContent,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useUsersStore } from "@/store/usersStore";

const PAGE_SIZE = 10;

const UserRow = memo(function UserRow({
  user,
}: {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    phone: string;
    company?: { name: string };
  };
}) {
  return (
    <TableRow hover>
      <TableCell>
        <Link href={`/dashboard/users/${user.id}`}>{`${user.firstName} ${user.lastName}`}</Link>
      </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.gender}</TableCell>
      <TableCell>{user.phone}</TableCell>
      <TableCell>{user.company?.name ?? "-"}</TableCell>
    </TableRow>
  );
});

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { users, total, loading, error, loadUsers } = useUsersStore();

  useEffect(() => {
    void loadUsers({ q: search.trim(), limit: PAGE_SIZE, skip: (page - 1) * PAGE_SIZE });
  }, [loadUsers, page, search]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / PAGE_SIZE)), [total]);

  const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  }, []);

  return (
    <Stack spacing={2}>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        Users
      </Typography>
      <TextField
        label="Search users"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search by name/email..."
        fullWidth
      />
      {error && <Alert severity="error">{error}</Alert>}
      <Card>
        <CardContent>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Company</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <UserRow key={user.id} user={user} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {!loading && users.length === 0 && (
            <Typography sx={{ py: 2, textAlign: "center" }} color="text.secondary">
              No users found
            </Typography>
          )}
        </CardContent>
      </Card>
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="body2" color="text.secondary">
          {loading ? "Loading..." : `Showing ${users.length} of ${total} users`}
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
