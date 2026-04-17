import Title from "../../../components/Title";
import { SignInForm } from "@/components/SignInForm";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Title>Sign In</Title>
      <SignInForm />
    </div>
  );
}
