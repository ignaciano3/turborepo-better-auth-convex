import { getToken } from "@repo/backend/lib/auth-server";
import { ConvexClientProvider } from "../../providers/ConvexClientProvider";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getToken();
  
  return (
    <ConvexClientProvider initialToken={token}>{children}</ConvexClientProvider>
  );
}
