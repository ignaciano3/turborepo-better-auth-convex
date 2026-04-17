"use client";

import { authClient } from "@repo/backend/lib/auth-client";
import { useState } from "react";

export function CreateOrganization() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authClient.organization.create({
        name,
        slug,
        fetchOptions: {
          onSuccess: ({ data }) => {
            console.log("Organization created:", data);
          },
          onError: ({ error }) => {
            console.error("Error creating organization:", error.message);
          },
        },
      });
      setName("");
      setSlug("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="my-4 p-6 border">
      <h2 className="text-xl font-bold mb-4">
        Create New Organization (Desde BetterAuth)
      </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="block font-medium text-gray-700">
          Organization Name:
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded mb-4"
        />
        <label htmlFor="slug" className="block font-medium text-gray-700">
          Organization Slug:
        </label>
        <input
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="p-2 border rounded mb-4"
        />
        <button type="submit">Create Organization</button>
      </form>
    </div>
  );
}
