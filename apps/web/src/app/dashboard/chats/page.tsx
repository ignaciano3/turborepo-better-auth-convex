import { Chats } from "@/components/chats/Chats";
import { SignOutButton } from "@/components/SignOutButton";
import { AppProvider } from "@/providers/AppProvider";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h1 className="text-4xl font-bold text-gray-900">Convex Chat</h1>
          <SignOutButton />
        </div>
        <AppProvider>
          <Chats />
        </AppProvider>
      </div>
    </div>
  );
}
