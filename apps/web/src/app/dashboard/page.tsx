"use client";

import { useQuery } from "convex/react";
import { api } from "@repo/backend/api";
import { SignOutButton } from "@/components/SignOutButton";
import { CreateOrganization } from "@/components/CreateOrganization";
import { CreateOrganization as CreateOrganizationConvex } from "@/components/CreateOrganizationConvex";
import { ListOrganizations as ListOrganizationsConvex } from "@/components/ListOrganizationsConvex";
import { ListOrganizations } from "@/components/ListOrganizations";

export default function DashboardPage() {
  const user = useQuery(api.auth.getCurrentUser);

  console.log("User:", user);

  if (user === undefined) {
    return <div>Loading...</div>;
  }

  if (user === null) {
    return <div>Unauthorized</div>;
  }

  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <SignOutButton />
      <CreateOrganization />
      <CreateOrganizationConvex />
      <ListOrganizations />
      <ListOrganizationsConvex />
    </div>
  );
}
