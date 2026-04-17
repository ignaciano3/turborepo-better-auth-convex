import Link from "next/link";
import Title from "../../../components/Title";
import { SignInForm } from "@/components/SignInForm";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Title>Sign In</Title>
      <SignInForm />
      <Link href="/sign-up" className="mt-4 text-blue-500 hover:underline">
        Don&apos;t have an account? Sign Up
      </Link>
    </div>
  );
}
