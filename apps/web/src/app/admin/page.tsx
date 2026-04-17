"use client";

import { api } from "@repo/backend/api";
import { useQuery } from "convex/react";

export default function AdminPage() {
  const user = useQuery(api.auth.getCurrentUser);

  if (user === undefined) {
    return <div>Loading...</div>;
  }

  if (user === null || user.role !== "admin") {
    return <div>Unauthorized</div>;
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <p>This page is only accessible to admin users.</p>
    </div>
  );
}
