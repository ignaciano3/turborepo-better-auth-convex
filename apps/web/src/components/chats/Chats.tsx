"use client";

import { useAppContext } from "@/providers/useAppContext";
import Messages from "./Messages";
import ChatsSelector from "./ChatSelector";

export function Chats() {
  const { chatId } = useAppContext();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ChatsSelector />

      <div className="md:col-span-2">
        {chatId && <Messages selectedChat={chatId} />}
        {!chatId && (
          <div className="bg-white rounded-lg shadow-lg p-12 flex items-center justify-center h-96">
            <p className="text-gray-500 text-lg">
              Select a chat to start messaging
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
