"use client";

import { useQuery } from "convex/react";
import { api } from "@repo/backend/api";
import { SignOutButton } from "@/components/SignOutButton";
import { CreateOrganization } from "@/components/CreateOrganization";
import { CreateOrganization as CreateOrganizationConvex } from "@/components/CreateOrganizationConvex";
import { ListOrganizations as ListOrganizationsConvex } from "@/components/ListOrganizationsConvex";
import { ListOrganizations } from "@/components/ListOrganizations";
import Link from "next/link";

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
      <Link href="/dashboard/chats" className="text-blue-500 hover:underline block my-6">
        Go to Chats
      </Link>
      <CreateOrganization />
      <CreateOrganizationConvex />
      <ListOrganizations />
      <ListOrganizationsConvex />
    </div>
  );
}
