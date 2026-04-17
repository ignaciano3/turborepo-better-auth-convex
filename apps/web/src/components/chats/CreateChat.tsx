"use client";

import { api } from "@repo/backend/api";
import { useMutation } from "convex/react";
import { useState } from "react";

export default function CreateChat() {
  const createChat = useMutation(api.chat.createChat);
  const [newChatName, setNewChatName] = useState("");

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={newChatName}
        onChange={(e) => setNewChatName(e.target.value)}
        placeholder="New chat name"
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm text-black"
      />
      <button
        onClick={() => {
          void (async () => {
            if (newChatName) {
              await createChat({ name: newChatName });
              setNewChatName("");
            }
          })();
        }}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors text-sm whitespace-nowrap"
      >
        Create Chat
      </button>
    </div>
  );
}
