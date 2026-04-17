"use client";

import { useQuery } from "convex/react";
import { api } from "@repo/backend/api";
import { SignOutButton } from "@/components/SignOutButton";

const Page = () => {
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
    </div>
  );
};

export default Page;