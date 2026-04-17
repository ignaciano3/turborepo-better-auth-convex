
import Title from "@/components/Title";
import { SignUpForm } from "@/components/SignUpForm";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Title>Sign Up</Title>
      <SignUpForm />
      <Link href="/sign-in" className="mt-4 text-blue-500 hover:underline">
        Already have an account? Sign In
      </Link>
    </div>
  );
}
