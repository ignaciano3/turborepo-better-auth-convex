"use client";

import { authClient } from "@repo/backend/lib/auth-client";
import { useRouter } from "next/navigation";

export function SignUpForm() {
  const signUpWithEmailAndPassword = async (
    email: string,
    password: string,
    name: string,
    username: string,
  ) => {
    const router = useRouter();

    try {
      await authClient.signUp.email({
        email,
        password,
        name,
        username,
        fetchOptions: {
          onSuccess: () => {
            router.replace("/dashboard");
          },
          onError: ({ error }) => {
            console.error("Error signing up:", error.message);
            alert(`Error signing up: ${error.message}`);
          },
        },
      });
    } catch (error) {
      alert("An unexpected error occurred during sign up.");
      console.error("Error signing up:", error);
    }
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password !== confirmPassword) {
          alert("Passwords do not match");
          return;
        }

        const email = formData.get("email") as string;
        const name = formData.get("name") as string;
        const username = formData.get("username") as string;

        signUpWithEmailAndPassword(email, password, name, username);
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
        placeholder="Password"
        className="border p-2 rounded"
        autoComplete="new-password"
        required
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        className="border p-2 rounded"
        required
      />
      <input
        name="name"
        placeholder="Name"
        className="border p-2 rounded"
        required
      />
      <input
        name="username"
        placeholder="Username"
        className="border p-2 rounded"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Sign Up
      </button>
    </form>
  );
}
