"use client";

import { api } from "@repo/backend/api";
import { useQuery } from "convex/react";

export function ListOrganizations() {
  const organizations = useQuery(api.organizations.listUserOrganizations);

  if (organizations === undefined) {
    return <div>Loading organizations...</div>;
  }

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-4">
        Your Organizations (Desde Convex)
      </h2>

      {organizations.length === 0 ? (
        <p>You are not a member of any organizations.</p>
      ) : (
        <ul className="p-2 mt-4">
          {organizations.map((org) => (
            <li key={org.id}>
              {org.name} - {org.slug}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
