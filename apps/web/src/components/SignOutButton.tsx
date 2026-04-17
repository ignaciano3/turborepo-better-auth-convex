"use client";

import { authClient } from "@repo/backend/lib/auth-client";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  return (
    <button
      onClick={signOut}
      className="px-4 py-2 bg-red-500 text-white rounded"
    >
      Sign Out
    </button>
  );
}
