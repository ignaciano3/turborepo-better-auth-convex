"use client";

import { authClient } from "@repo/backend/lib/auth-client";
import { useRouter } from "next/navigation";

export const SignInForm = () => {
  const router = useRouter();

  const signInWithUsernameAndPassword = async (
    username: string,
    password: string,
  ) => {
    try {
      await authClient.signIn.username({
        username,
        password,
        fetchOptions: {
          onSuccess: () => {
            router.replace("/dashboard");
          },
        },
      });
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        signInWithUsernameAndPassword(username, password);
      }}
    >
      <input
        name="username"
        autoComplete="username"
        placeholder="Email or Username"
        className="border p-2 rounded"
        required
      />
      <input
        type="password"
        name="password"
        autoComplete="current-password"
        placeholder="Password"
        className="border p-2 rounded"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Sign In
      </button>
    </form>
  );
};
