import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/sign-in">Sign In</Link>
      <br />
      <Link href="/sign-up">Sign Up</Link>
      <br />
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}
