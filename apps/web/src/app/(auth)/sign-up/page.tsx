
import Title from "@/components/Title";
import { SignUpForm } from "@/components/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Title>Sign Up</Title>
      <SignUpForm />
    </div>
  );
}
