"use client";

import { authClient } from "@repo/backend/lib/auth-client";
import Title from "../../../components/Title";

export default function SignInPage() {
  const signInWithEmailAndPassword = async (
    email: string,
    password: string,
  ) => {
    try {
      await authClient.signIn.email({
        email,
        password,
        callbackURL: "/dashboard",
      });
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Title>Sign In</Title>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const email = formData.get("email") as string;
          const password = formData.get("password") as string;
          signInWithEmailAndPassword(email, password);
        }}
      >
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Email"
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
    </div>
  );
}
